"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconCalendar as CalendarIcon,
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
  IconSparkles as Sparkles,
  IconSun as Sun,
  IconMoon as Moon,
  IconCoins as Coins,
  IconTrendingUp as TrendingUp,
  IconMapPin as MapPin,
  IconCalendar as CalendarDays,
  IconClose as X,
  IconArrowRight as ArrowRight,
  IconRefresh as RefreshCw,
  IconGlobe as Globe,
  IconLeaf as Leaf,
  IconClock as Clock,
  IconCompass as Compass,
  IconFlame as Flame,
  IconStar as Star,
  IconLayers as Layers,
  IconChevronRight as ChevronRightIcon,
} from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";
import {
  getMonthCalendarData,
  WEEKDAYS,
  toNepaliNum,
  toNepaliDigits,
  CalendarDay,
  MONTH_NAMES_BS,
  FESTIVALS_BY_MONTH,
  convertBsToAd,
  getLiveTodayNepaliDate,
} from "@/utils/nepaliCalendar";
import HoroscopeExplorer from "./HoroscopeExplorer";

interface HamroPatroHeroProps {
  onScrollToConsole?: () => void;
  onOpenInquiry: (topic?: string) => void;
}

type ActiveTool = "converter" | "rashifal" | "bullion" | "forex" | null;

interface ForexRate {
  iso3: string;
  name: string;
  unit: number;
  buy: string;
  sell: string;
}

interface BullionRate {
  id: number;
  rateType: string;
  name: string;
  nameEn: string;
  unit: string;
  rate: number;
  rateFormatted: string;
  rateFormattedNe: string;
}

export default function HamroPatroHero({
  onScrollToConsole,
  onOpenInquiry,
}: HamroPatroHeroProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  // Dynamic Live Today Date in Bikram Sambat
  const liveToday = getLiveTodayNepaliDate();

  // Dynamic Year & Month State (Initializes to live date)
  const [selectedYear, setSelectedYear] = useState<number>(() => liveToday.yearBs);
  const [selectedMonth, setSelectedMonth] = useState<number>(() => liveToday.monthBs);
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [sidebarTab, setSidebarTab] = useState<"festivals" | "muhurta" | "holidays">("festivals");

  // Get real dynamically computed month data
  const calendarData = getMonthCalendarData(selectedYear, selectedMonth);

  // Active selected day (default: today or 1st day of month)
  const [selectedDay, setSelectedDay] = useState<CalendarDay>(() => {
    return (
      calendarData.days.find((d) => d.isToday) ||
      calendarData.days.find((d) => d.isCurrentMonth && d.bsDay === liveToday.dayBs) ||
      calendarData.days.find((d) => d.isCurrentMonth && d.bsDay === 1) ||
      calendarData.days[10]
    );
  });

  // Keep selectedDay synced when month/year changes
  const handleMonthChange = (newMonth: number, newYear?: number) => {
    const yr = newYear !== undefined ? newYear : selectedYear;
    setSelectedMonth(newMonth);
    if (newYear !== undefined) setSelectedYear(yr);
    const newData = getMonthCalendarData(yr, newMonth);
    const todayMatch = newData.days.find((d) => d.isToday);
    const firstCurrent = newData.days.find((d) => d.isCurrentMonth && d.bsDay === 1);
    setSelectedDay(todayMatch || firstCurrent || newData.days[0]);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      handleMonthChange(12, selectedYear - 1);
    } else {
      handleMonthChange(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      handleMonthChange(1, selectedYear + 1);
    } else {
      handleMonthChange(selectedMonth + 1);
    }
  };

  // Date Converter State
  const [convBsYear, setConvBsYear] = useState(() => liveToday.yearBs.toString());
  const [convBsMonth, setConvBsMonth] = useState(() => liveToday.monthBs.toString());
  const [convBsDay, setConvBsDay] = useState(() => liveToday.dayBs.toString());
  const [convertedResult, setConvertedResult] = useState<string>(
    () => `${liveToday.formattedEn} (A.D.)`
  );

  const handleRunConversion = () => {
    try {
      const y = parseInt(convBsYear, 10);
      const m = parseInt(convBsMonth, 10);
      const d = parseInt(convBsDay, 10);
      const res = convertBsToAd(y, m, d);
      setConvertedResult(isNe ? `${res.formattedNe} (ई.सं.)` : `${res.formattedEn} (A.D.)`);
    } catch {
      setConvertedResult(isNe ? "अमान्य मिति प्रविष्ट गरियो" : "Invalid Date Entered");
    }
  };

  // Live NRB Forex Data
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);
  const [forexSource, setForexSource] = useState<string>("नेपाल राष्ट्र बैंक (Live NRB API)");
  const [forexDate, setForexDate] = useState<string>("");
  const [forexLoading, setForexLoading] = useState<boolean>(false);

  // Live FENEGOSIDA Bullion Data
  const [bullionRates, setBullionRates] = useState<BullionRate[]>([]);
  const [bullionSource, setBullionSource] = useState<string>(
    "नेपाल सुनचाँदी व्यवसायी महासंघ (Live FENEGOSIDA API)"
  );
  const [bullionDate, setBullionDate] = useState<string>("");
  const [bullionLoading, setBullionLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchForex() {
      setForexLoading(true);
      try {
        const res = await fetch("/api/forex");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.rates && Array.isArray(json.rates)) {
            setForexRates(json.rates);
            setForexSource(json.source || "Nepal Rastra Bank");
            setForexDate(json.date || "");
          }
        }
      } catch (err) {
        console.error("Forex fetch error:", err);
      } finally {
        if (isMounted) setForexLoading(false);
      }
    }
    fetchForex();

    async function fetchBullion() {
      setBullionLoading(true);
      try {
        const res = await fetch("/api/bullion");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.rates && Array.isArray(json.rates)) {
            setBullionRates(json.rates);
            setBullionSource(json.source || "FENEGOSIDA");
            setBullionDate(json.date || "");
          }
        }
      } catch (err) {
        console.error("Bullion fetch error:", err);
      } finally {
        if (isMounted) setBullionLoading(false);
      }
    }
    fetchBullion();

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic Festivals for currently selected month
  const currentMonthFestivals = FESTIVALS_BY_MONTH[selectedMonth] || {};
  const festivalEntries = Object.entries(currentMonthFestivals).map(([dayStr, ev]) => ({
    day: parseInt(dayStr, 10),
    ...ev,
  }));

  // Public Holidays in currently selected month
  const holidayEntries = festivalEntries.filter((ev) => ev.isHoliday);

  // Month Highlights for bottom card
  const monthHighlights = festivalEntries.slice(0, 3);

  return (
    <section className="relative w-full bg-[#FAF7F2] text-[#1C1917] pt-6 sm:pt-8 pb-16 overflow-hidden">
      {/* Scenic Authentic Himalayan Sunrise & Pagoda Panoramic Background */}
      <div
        className="absolute top-0 left-0 right-0 h-[360px] sm:h-[440px] pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <img
          src="/himalayan-bg.png"
          alt="Himalayan Sunrise and Vedic Pagodas"
          className="w-full h-full object-cover object-top opacity-85"
        />
        {/* Soft bottom gradient fade into warm background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/25 to-[#FAF7F2]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* ========================================================================= */}
        {/* HERO TITLE & SPIRITUAL GURU QUOTE WITH QUICK TOOL PILLS                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7">
          
          {/* Left Title Lockup */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
              {isNe ? "नेपाली पात्रो (पञ्चाङ्ग)" : "Nepali Patro (Panchanga)"}
            </h1>
            <div className="mt-2 text-base sm:text-xl font-bold text-stone-800">
              <span>{isNe ? calendarData.monthName : calendarData.monthNameEn} {isNe ? toNepaliNum(selectedYear) : selectedYear} B.S.</span>{" "}
              <span className="text-stone-500 font-normal">
                ({calendarData.adMonthsSpan} {selectedYear - 57} A.D.)
              </span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              {isNe
                ? "तिथि, नक्षत्र, योग, करण, वार, चाडपर्व र शुभ मुहूर्त सहितको विस्तृत नेपाली पञ्चाङ्ग ।"
                : "Comprehensive daily Nepali calendar with Tithi, Nakshatra, Yoga, festivals, and auspicious Muhurtas."}
            </p>
          </div>

          {/* Right Side: Guru Quote + 4 Quick Action Tools */}
          <div className="flex flex-col items-start lg:items-end gap-3.5">
            {/* Elegant Guru Quote Card */}
            <div className="w-full lg:max-w-md bg-white/90 backdrop-blur-sm border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-start gap-2.5">
                <span className="text-2xl text-[#D95B16] font-serif leading-none select-none">“</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-[13px] font-medium text-stone-800 leading-snug">
                    {isNe
                      ? "समयको ज्ञानले जीवनलाई सही दिशामा अग्रसर गराउँदछ ।"
                      : "Knowledge of divine timing guides life in the most auspicious direction."}
                  </p>
                  <div className="text-right mt-1">
                    <span className="text-[11px] font-bold text-[#D95B16]">
                      — {isNe ? "गुरु नीलहरी" : "Guru Nilhari"}
                    </span>
                  </div>
                </div>
                <span className="text-2xl text-[#D95B16] font-serif leading-none select-none self-end">”</span>
              </div>
            </div>

            {/* 4 Quick Tools: 2x2 grid on mobile, flex pill wrap on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setActiveTool(activeTool === "converter" ? null : "converter")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs ${
                  activeTool === "converter"
                    ? "bg-[#D95B16] text-white border-[#D95B16]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16] hover:text-[#D95B16]"
                }`}
              >
                <CalendarDays className="w-4 h-4 text-[#D95B16]" />
                <span className="truncate">{isNe ? "मिति परिवर्तन" : "Date Converter"}</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("horoscope-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    setActiveTool(activeTool === "rashifal" ? null : "rashifal");
                  }
                }}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs ${
                  activeTool === "rashifal"
                    ? "bg-[#D95B16] text-white border-[#D95B16]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16] hover:text-[#D95B16]"
                }`}
              >
                <Moon className="w-4 h-4 text-[#D95B16]" />
                <span className="truncate">{isNe ? "राशिफल" : "Horoscope"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "bullion" ? null : "bullion")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs ${
                  activeTool === "bullion"
                    ? "bg-[#D95B16] text-white border-[#D95B16]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16] hover:text-[#D95B16]"
                }`}
              >
                <Coins className="w-4 h-4 text-[#D95B16]" />
                <span className="truncate">{isNe ? "सुनचाँदी दर" : "Gold & Silver"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "forex" ? null : "forex")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all shadow-xs ${
                  activeTool === "forex"
                    ? "bg-[#D95B16] text-white border-[#D95B16]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16] hover:text-[#D95B16]"
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#D95B16]" />
                <span className="truncate">{isNe ? "विनिमय दर" : "Forex"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXPANDABLE QUICK TOOL MODAL / DRAWER                                     */}
        {/* ========================================================================= */}
        {activeTool && (
          <div className="mb-6 bg-white border border-[#D95B16]/50 p-5 rounded-2xl shadow-sm relative animate-fade-in">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#D95B16] p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Date Converter */}
            {activeTool === "converter" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-5 h-5 text-[#D95B16]" />
                  <h3 className="font-bold text-sm sm:text-base text-stone-900">
                    {isNe ? "नेपाली मिति रूपान्तरण (B.S. ↔ A.D.)" : "Official Nepali Date Converter (B.S. ↔ A.D.)"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {isNe ? "वर्ष (B.S.)" : "Year (B.S.)"}
                    </label>
                    <select
                      value={convBsYear}
                      onChange={(e) => setConvBsYear(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#D95B16]"
                    >
                      {Array.from({ length: 15 }, (_, i) => 2075 + i).map((yr) => (
                        <option key={yr} value={yr}>
                          {isNe ? toNepaliNum(yr) : yr} ({yr - 57})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {isNe ? "महिना" : "Month"}
                    </label>
                    <select
                      value={convBsMonth}
                      onChange={(e) => setConvBsMonth(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#D95B16]"
                    >
                      {MONTH_NAMES_BS.map((m, idx) => (
                        <option key={idx} value={idx + 1}>
                          {isNe ? m.ne : m.en} ({m.span})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {isNe ? "गते (दिन)" : "Day (Gate)"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={convBsDay}
                      onChange={(e) => setConvBsDay(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#D95B16]"
                    />
                  </div>

                  <button
                    onClick={handleRunConversion}
                    className="w-full py-2.5 bg-[#D95B16] hover:bg-[#B8470B] text-white text-sm font-semibold rounded-xl transition-all shadow-xs"
                  >
                    {isNe ? "रूपान्तरण गर्नुहोस्" : "Convert Date"}
                  </button>
                </div>

                <div className="mt-3 p-3 bg-orange-50/70 border border-orange-200/70 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-stone-700">
                    {isNe ? "प्रमाणित नतिजा (इस्वी सन्):" : "Verified Gregorian Result (A.D.):"}
                  </span>
                  <span className="font-bold text-[#D95B16]">{convertedResult}</span>
                </div>
              </div>
            )}

            {/* Bullion Rates */}
            {activeTool === "bullion" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#D95B16]" />
                    <h3 className="font-bold text-sm sm:text-base text-stone-900">
                      {isNe ? "नेपाल सुनचाँदी व्यवसायी महासंघ मूल्य सूची (Live)" : "Federation of Nepal Gold & Silver Rates (Live)"}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span>{bullionSource}</span>
                    {bullionDate && <span className="font-bold text-stone-700">({bullionDate})</span>}
                  </div>
                </div>

                {bullionLoading ? (
                  <div className="py-6 text-center text-xs text-stone-500 animate-pulse">
                    {isNe ? "महासंघबाट दर प्राप्त हुँदैछ..." : "Fetching live bullion rates from FENEGOSIDA..."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(bullionRates.length > 0 ? bullionRates : [
                      { id: 306, name: "छापावाल सुन (१ तोला)", nameEn: "Fine Gold (Per Tola)", rateFormattedNe: "रु २,९९,३००", rateFormatted: "Rs. 2,99,300" },
                      { id: 307, name: "छापावाल सुन (१० ग्राम)", nameEn: "Fine Gold (10 Grams)", rateFormattedNe: "रु २,५६,६००", rateFormatted: "Rs. 2,56,600" },
                      { id: 304, name: "असली चाँदी दर (१ तोला)", nameEn: "Silver (Per Tola)", rateFormattedNe: "रु ४,६५५", rateFormatted: "Rs. 4,655" },
                      { id: 305, name: "असली चाँदी दर (१० ग्राम)", nameEn: "Silver (10 Grams)", rateFormattedNe: "रु ३,९९१", rateFormatted: "Rs. 3,991" },
                    ]).map((item, idx) => (
                      <div key={idx} className="p-3 bg-stone-50/70 border border-stone-200/80 rounded-xl">
                        <span className="text-xs text-stone-600 font-semibold block truncate">
                          {isNe ? item.name : item.nameEn || item.name}
                        </span>
                        <div className="text-lg font-bold text-stone-900 mt-0.5">
                          {isNe ? item.rateFormattedNe : item.rateFormatted}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Forex Rates */}
            {activeTool === "forex" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#D95B16]" />
                    <h3 className="font-bold text-sm sm:text-base text-stone-900">
                      {isNe ? "नेपाल राष्ट्र बैंक विदेशी विनिमय दर (Live Official NRB)" : "Nepal Rastra Bank Foreign Exchange Rates (Live)"}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span>{forexSource}</span>
                    {forexDate && <span className="font-bold text-stone-700">({forexDate})</span>}
                  </div>
                </div>

                {forexLoading ? (
                  <div className="py-6 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D95B16]" />
                    <span>राष्ट्र बैंकबाट लाइभ दर प्राप्त गर्दै...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    {(forexRates.length > 0 ? forexRates.slice(0, 8) : [
                      { iso3: "USD", name: "U.S. Dollar", unit: 1, buy: "153.01", sell: "153.61" },
                      { iso3: "EUR", name: "European Euro", unit: 1, buy: "174.32", sell: "175.00" },
                      { iso3: "GBP", name: "UK Pound", unit: 1, buy: "202.64", sell: "203.43" },
                      { iso3: "AUD", name: "Australian Dollar", unit: 1, buy: "107.55", sell: "107.97" },
                    ]).map((r) => (
                      <div key={r.iso3} className="p-2.5 bg-stone-50/70 border border-stone-200/80 rounded-xl">
                        <div className="font-bold text-stone-900 flex items-center justify-between">
                          <span>{r.iso3} ({r.unit})</span>
                          <span className="text-[10px] text-stone-500 font-normal">{r.name}</span>
                        </div>
                        <div className="text-stone-600 mt-1">खरिद: रु {r.buy}</div>
                        <div className="text-[#D95B16] font-bold">बिक्री: रु {r.sell}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN GRID: 8 COLS CALENDAR + 4 COLS TODAY'S PANCHANGA SIDEBAR             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT 8 COLS: 7-COLUMN MONTHLY CALENDAR CARD                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl shadow-xs overflow-hidden">
            
            {/* Calendar Controls Bar */}
            <div className="p-4 sm:p-5 border-b border-stone-200/60 bg-white flex flex-wrap items-center justify-between gap-3">
              {/* Previous / Next Month Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-orange-50 hover:border-[#D95B16] text-stone-700 transition-colors"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {isNe ? calendarData.monthName : calendarData.monthNameEn} {isNe ? toNepaliNum(selectedYear) : selectedYear}
                  </h2>
                  <span className="text-xs font-semibold text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-lg">
                    {calendarData.adMonthsSpan} {calendarData.yearEn || selectedYear - 57}
                  </span>
                </div>

                <button
                  onClick={handleNextMonth}
                  className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-orange-50 hover:border-[#D95B16] text-stone-700 transition-colors"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Jump Buttons & Dropdowns */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleMonthChange(liveToday.monthBs, liveToday.yearBs);
                    const newData = getMonthCalendarData(liveToday.yearBs, liveToday.monthBs);
                    const todayMatch = newData.days.find((d) => d.isToday);
                    if (todayMatch) setSelectedDay(todayMatch);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedMonth === liveToday.monthBs && selectedYear === liveToday.yearBs && selectedDay.isToday
                      ? "bg-[#D95B16] text-white border-[#D95B16] shadow-xs"
                      : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16]"
                  }`}
                >
                  {isNe ? "आज" : "Today"}
                </button>

                {/* Dropdown for Month Selection */}
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
                  className="px-2.5 py-1.5 text-xs font-semibold border border-stone-200 bg-white text-stone-800 rounded-lg focus:outline-none focus:border-[#D95B16]"
                >
                  {MONTH_NAMES_BS.map((m, i) => (
                    <option key={i} value={i + 1}>
                      {isNe ? m.ne : m.en}
                    </option>
                  ))}
                </select>

                {/* Dropdown for Year Selection */}
                <select
                  value={selectedYear}
                  onChange={(e) => handleMonthChange(selectedMonth, parseInt(e.target.value, 10))}
                  className="px-2.5 py-1.5 text-xs font-semibold border border-stone-200 bg-white text-stone-800 rounded-lg focus:outline-none focus:border-[#D95B16]"
                >
                  {[2080, 2081, 2082, 2083, 2084, 2085, 2086].map((yr) => (
                    <option key={yr} value={yr}>
                      {isNe ? toNepaliNum(yr) : yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weekday Column Headers (Sun to Sat) */}
            <div className="grid grid-cols-7 border-b border-stone-200/60 bg-stone-50/60 text-center py-2 text-xs font-bold">
              {WEEKDAYS.map((wd, idx) => {
                const isHolidayDay = idx === 0 || idx === 6;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center ${
                      isHolidayDay ? "text-[#DC2626]" : "text-stone-700"
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-semibold">
                      {isNe ? wd.ne : wd.en}
                    </span>
                    <span className="text-[10px] font-normal text-stone-400 capitalize">
                      {wd.en}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 7-Column Calendar Grid Cells */}
            <div className="grid grid-cols-7 divide-x divide-y divide-stone-100 bg-stone-50/20">
              {calendarData.days.map((day, idx) => {
                const isSelected =
                  selectedDay.bsDay === day.bsDay &&
                  selectedDay.bsMonth === day.bsMonth &&
                  selectedDay.isCurrentMonth === day.isCurrentMonth;
                const isSat = day.dayOfWeek === 6;
                const isSun = day.dayOfWeek === 0;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`relative min-h-[64px] sm:min-h-[96px] md:min-h-[110px] p-1 sm:p-2.5 text-left flex flex-col justify-between transition-all duration-150 focus:outline-none ${
                      day.isToday && isSelected
                        ? "bg-[#D95B16] text-white font-bold z-10 rounded-lg shadow-md ring-2 ring-offset-2 ring-[#D95B16]"
                        : day.isToday
                        ? "bg-[#D95B16] text-white font-bold z-10 rounded-lg shadow-sm"
                        : isSelected
                        ? "bg-orange-100/90 border border-[#D95B16] ring-2 ring-[#D95B16] text-stone-900 font-bold z-10 rounded-lg shadow-xs"
                        : day.isCurrentMonth
                        ? day.isHoliday || isSat
                          ? "bg-white hover:bg-orange-50/50 text-stone-900"
                          : "bg-white hover:bg-orange-50/40 text-stone-900"
                        : "bg-stone-50/40 text-stone-400 opacity-40"
                    }`}
                  >
                    {/* Top Row: English Day or "Today" Pill */}
                    <div className="flex items-center justify-between w-full">
                      {day.isToday ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white px-1.5 py-0.5 rounded">
                          Today
                        </span>
                      ) : <span />}

                      <span
                        className={`text-[9px] sm:text-xs font-medium tabular-nums ${
                          day.isToday
                            ? "text-orange-100"
                            : isSat || isSun || day.isHoliday
                            ? "text-[#DC2626]"
                            : "text-stone-400"
                        }`}
                      >
                        {day.adDay}
                      </span>
                    </div>

                    {/* Middle: BS Day Numeral + Event Tag */}
                    <div className="my-0.5 text-center w-full">
                      <span
                        className={`text-xl sm:text-2xl font-bold block leading-tight ${
                          day.isToday
                            ? "text-white font-black"
                            : isSat || day.isHoliday
                            ? "text-[#DC2626]"
                            : "text-stone-900"
                        }`}
                      >
                        {isNe ? day.bsDayNepali : day.bsDay}
                      </span>

                      {/* Event with bullet marker */}
                      {day.event && day.isCurrentMonth && (
                        <div className="mt-1 flex items-center justify-center gap-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              day.isToday
                                ? "bg-white"
                                : day.isHoliday || isSat
                                ? "bg-[#DC2626]"
                                : "bg-[#D95B16]"
                            }`}
                          />
                          <span
                            className={`hidden sm:inline-block text-[10px] leading-tight truncate max-w-[80px] ${
                              day.isToday
                                ? "text-orange-100 font-medium"
                                : day.isHoliday || isSat
                                ? "text-[#DC2626] font-semibold"
                                : "text-stone-700 font-medium"
                            }`}
                            title={isNe ? day.event : day.eventEn || day.event}
                          >
                            {isNe ? day.event : day.eventEn || day.event}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom: Tithi Name */}
                    <div className="w-full text-center">
                      <span
                        className={`block text-[8.5px] sm:text-[10px] font-normal truncate ${
                          day.isToday ? "text-orange-100" : "text-stone-500"
                        }`}
                      >
                        {isNe ? day.tithi : day.tithiEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Legend Bar matching mockup */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200/60 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D95B16]" />
                  <span>Today</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                  <span>Festival</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#B91C1C] rotate-45" />
                  <span>Public Holiday</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  <span>Auspicious Day</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span>Other Day</span>
                </span>
              </div>

              <div className="text-stone-500 text-[11px] flex items-center gap-1">
                <span>ⓘ Dates and timings are based on Kathmandu, Nepal time.</span>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT 4 COLS: TODAY'S PANCHANGA CARD & TABBED EVENTS CARD               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Card 1: TODAY'S PANCHANGA */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
              {/* Header with red bar & Today tag */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#D95B16] rounded-full" />
                  <h3 className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    {selectedDay.isToday
                      ? (isNe ? "आजको पञ्चाङ्ग" : "TODAY'S PANCHANGA")
                      : (isNe ? "पञ्चाङ्ग विवरण" : "PANCHANGA DETAILS")}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-orange-50 text-[#D95B16] border border-orange-200/70 rounded-md">
                  {selectedDay.isToday ? "Today" : `${selectedDay.adMonth} ${selectedDay.adDay}`}
                </span>
              </div>

              {/* Big Date Display */}
              <div className="mt-3.5">
                <h4 className="text-2xl font-black text-stone-900 tracking-tight">
                  {isNe
                    ? `${selectedDay.bsDayNepali} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.ne || ""} ${toNepaliNum(selectedDay.bsYear)}`
                    : `${selectedDay.bsDay} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.en || ""} ${selectedDay.bsYear}`}
                </h4>
                <div className="text-xs text-stone-500 font-medium mt-0.5">
                  {WEEKDAYS[selectedDay.dayOfWeek][isNe ? "ne" : "en"]} • {selectedDay.adDay} {selectedDay.adMonth} {selectedDay.adYear}
                </div>
              </div>

              {/* Festival / Occasion Strip */}
              <div className="mt-3 p-3 bg-orange-50/50 border border-orange-200/60 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D95B16]" />
                  <span className="font-bold text-stone-900">
                    {selectedDay.event
                      ? (isNe ? selectedDay.event : selectedDay.eventEn || selectedDay.event)
                      : (isNe ? "दैनिक नियमित पूजा अर्चना" : "Daily Sacred Observance")}
                  </span>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-stone-400" />
              </div>

              {/* 2x2 Grid of Panchang Parameters */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#D95B16]" />
                    <span>Tithi</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5 truncate">
                    {isNe ? selectedDay.tithi : selectedDay.tithiEn}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>Nakshatra</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5 truncate">
                    {selectedDay.nakshatra}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <Globe className="w-3 h-3 text-indigo-500" />
                    <span>Yoga</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5 truncate">
                    {selectedDay.yoga}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <Moon className="w-3 h-3 text-indigo-400" />
                    <span>Moon Sign</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5 truncate">
                    {selectedDay.moonSign}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <span>☼</span>
                    <span>Sunrise</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {selectedDay.sunrise}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-500 font-medium text-[11px]">
                    <span>☽</span>
                    <span>Sunset</span>
                  </div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {selectedDay.sunset}
                  </div>
                </div>
              </div>

              {/* Auspicious Muhurta Strip */}
              <div className="mt-3.5 p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold block text-[11px] text-emerald-700">Auspicious Muhurta</span>
                    <span className="font-bold text-emerald-900">
                      {selectedDay.muhurta || "अभिजित मुहूर्त (१२:१४ - १२:५४)"}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-emerald-500" />
              </div>

              {/* Primary Consultation CTA Button */}
              <button
                onClick={() =>
                  onOpenInquiry(
                    `पञ्चाङ्ग तथा मुहूर्त परामर्श: ${selectedDay.bsDayNepali} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.ne} (${isNe ? selectedDay.tithi : selectedDay.tithiEn})`
                  )
                }
                className="mt-4 w-full py-2.5 bg-[#D95B16] hover:bg-[#B8470B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>{isNe ? "यस दिनको विशेष साइत परामर्श" : "Book Muhurta Consultation for This Day"}</span>
              </button>
            </div>

            {/* Card 2: Tabbed Events (Festivals | Muhurtas | Holidays) */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setSidebarTab("festivals")}
                    className={`transition-colors pb-1 relative ${
                      sidebarTab === "festivals"
                        ? "text-[#D95B16] font-bold"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Festivals
                    {sidebarTab === "festivals" && (
                      <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setSidebarTab("muhurta")}
                    className={`transition-colors pb-1 relative ${
                      sidebarTab === "muhurta"
                        ? "text-[#D95B16] font-bold"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Muhurtas
                    {sidebarTab === "muhurta" && (
                      <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
                    )}
                  </button>

                  <button
                    onClick={() => setSidebarTab("holidays")}
                    className={`transition-colors pb-1 relative ${
                      sidebarTab === "holidays"
                        ? "text-[#D95B16] font-bold"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Holidays
                    {sidebarTab === "holidays" && (
                      <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
                    )}
                  </button>
                </div>

                <Link
                  href="/ephemeris"
                  className="text-xs font-semibold text-[#D95B16] hover:underline flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tab Contents */}
              <div className="mt-3 divide-y divide-stone-100">
                {sidebarTab === "festivals" && (
                  festivalEntries.slice(0, 4).map((ev) => (
                    <div
                      key={ev.day}
                      onClick={() => {
                        const target = calendarData.days.find(
                          (d) => d.bsDay === ev.day && d.isCurrentMonth
                        );
                        if (target) setSelectedDay(target);
                      }}
                      className="py-2.5 flex items-center justify-between hover:bg-orange-50/40 px-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-bold text-stone-500 shrink-0 w-11">
                          Ash {ev.day}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-stone-900 block truncate">
                            {isNe ? ev.event : ev.eventEn}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {ev.isHoliday ? "Public Holiday" : "Cultural Festival"}
                          </span>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))
                )}

                {sidebarTab === "muhurta" && (
                  <div className="space-y-2 py-2">
                    <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                      <div className="font-bold text-stone-900 text-xs">गृहप्रवेश उत्तम साइत (Griha Pravesh)</div>
                      <div className="text-[11px] text-stone-600 mt-0.5">Ashwin 11 • बिहान ०७:३० देखि ०९:१५</div>
                    </div>
                    <div className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl">
                      <div className="font-bold text-stone-900 text-xs">विवाह / लग्न साइत (Vivah Muhurta)</div>
                      <div className="text-[11px] text-stone-600 mt-0.5">Ashwin 26 • बिहान ०८:२५ उत्तम योग</div>
                    </div>
                  </div>
                )}

                {sidebarTab === "holidays" && (
                  holidayEntries.slice(0, 4).map((ev) => (
                    <div
                      key={ev.day}
                      className="py-2.5 flex items-center justify-between px-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-bold text-[#DC2626] shrink-0 w-11">
                          Ash {ev.day}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-stone-900 block truncate">
                            {isNe ? ev.event : ev.eventEn}
                          </span>
                          <span className="text-[11px] text-[#DC2626] block">
                            Official Public Holiday
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 BOTTOM FEATURE CARDS (Monthly Highlights | Useful Tools | Related Services) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          
          {/* Card 1: Monthly Highlights */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/60 text-xs font-bold text-stone-900">
              <CalendarIcon className="w-4 h-4 text-[#D95B16]" />
              <span>{isNe ? "महिनाका मुख्य आकर्षण" : "Monthly Highlights"}</span>
            </div>
            <div className="mt-3.5 space-y-2.5 text-xs">
              {monthHighlights.length > 0 ? (
                monthHighlights.map((ev) => (
                  <div key={ev.day} className="flex items-start gap-2.5">
                    <span className="text-[#D95B16] font-bold shrink-0">Ash {ev.day}</span>
                    <span className="text-stone-700 font-medium leading-snug">
                      {isNe ? ev.event : ev.eventEn}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#D95B16] font-bold shrink-0">Ash 3</span>
                    <span className="text-stone-700 font-medium">Constitution Day (Public Holiday)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#D95B16] font-bold shrink-0">Ash 26</span>
                    <span className="text-stone-700 font-medium">Ghatasthapana (Navaratri Begins)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#D95B16] font-bold shrink-0">Ash 31</span>
                    <span className="text-stone-700 font-medium">Fulpati / Dashain</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Useful Tools */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/60 text-xs font-bold text-stone-900">
              <Layers className="w-4 h-4 text-[#D95B16]" />
              <span>{isNe ? "उपयोगी औजारहरू" : "Useful Tools"}</span>
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTool("converter")}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <CalendarDays className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "मिति परिवर्तन" : "Date Converter"}
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("horoscope-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <Moon className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "आजको राशिफल" : "Today's Horoscope"}
                </span>
              </button>

              <button
                onClick={() => setActiveTool("bullion")}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <Coins className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "सुनचाँदी मूल्य" : "Gold & Silver Price"}
                </span>
              </button>

              <button
                onClick={() => setActiveTool("forex")}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <TrendingUp className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "विदेशी विनिमय" : "Forex Rates"}
                </span>
              </button>
            </div>
          </div>

          {/* Card 3: Related Services */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/60 text-xs font-bold text-stone-900">
              <Sparkles className="w-4 h-4 text-[#D95B16]" />
              <span>{isNe ? "सम्बन्धित सेवाहरू" : "Related Services"}</span>
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/ephemeris"
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all block"
              >
                <Star className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "कुण्डली विश्लेषण" : "Birth Chart"}
                </span>
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById("service-muhurta");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <Clock className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "शुभ मुहूर्त" : "Auspicious Timing"}
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("service-karmakanda");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <Flame className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "पूजा तथा कर्मकाण्ड" : "Puja & Rituals"}
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("service-vastu");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-2.5 bg-stone-50/70 border border-stone-200/60 rounded-xl hover:border-[#D95B16] hover:bg-orange-50/50 text-left transition-all"
              >
                <Compass className="w-4 h-4 text-[#D95B16] mb-1" />
                <span className="font-semibold text-stone-800 block text-[11px]">
                  {isNe ? "वास्तु परामर्श" : "Vastu Consultation"}
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
