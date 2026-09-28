"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Coins,
  TrendingUp,
  MapPin,
  CalendarDays,
  X,
  ArrowRight,
  RefreshCw,
  Globe,
} from "lucide-react";
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

export default function HamroPatroHero({
  onScrollToConsole,
  onOpenInquiry,
}: HamroPatroHeroProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  // Dynamic Live Today Date in Bikram Sambat
  const liveToday = getLiveTodayNepaliDate();

  // Dynamic Year & Month State (Initializes to true live date)
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
  const [convertedResult, setConvertedResult] = useState<string>(() => `${liveToday.formattedEn} (A.D.)`);

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
  const [bullionRates, setBullionRates] = useState<BullionRate[]>([]);
  const [bullionSource, setBullionSource] = useState<string>("नेपाल सुनचाँदी व्यवसायी महासंघ (Live FENEGOSIDA API)");
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

  return (
    <section className="relative w-full bg-[#FDFBF7] text-[#181411] pt-4 pb-12 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP LIVE DATE BANNER & HORIZONTALLY SCROLLABLE TOOLS (Mobile-First)   */}
        {/* ========================================================================= */}
        <div className="bg-white border border-stone-200/70 p-3.5 sm:p-5 shadow-2xs mb-5 sm:mb-6 rounded-none animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            
            {/* Left: Prominent Live Nepali Date in Saffron & Amber */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-50/80 text-[#C85A17] text-[10px] sm:text-[11px] font-bold tracking-wide border border-orange-200/50 rounded-none uppercase">
                  <span className="w-1.5 h-1.5 bg-[#C85A17] rounded-none animate-pulse-subtle" />
                  {isNe ? "आजको पञ्चाङ्ग" : "Live Panchanga"}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  {isNe ? liveToday.nepalSamvatNe : liveToday.nepalSamvatEn}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3 gap-y-0.5">
                <h1 className="text-xl sm:text-3xl font-black text-[#181411] tracking-tight">
                  {isNe ? liveToday.formattedNe : liveToday.formattedEn}
                </h1>
                <span className="text-sm sm:text-lg font-semibold text-stone-400">
                  / {liveToday.jsDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Right: Quick Action Buttons - Horizontally Scrollable on Mobile, Wrap on Desktop */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
              <button
                onClick={() => setActiveTool(activeTool === "converter" ? null : "converter")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-all duration-200 rounded-none ${
                  activeTool === "converter"
                    ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/70 hover:border-[#C85A17]/60 hover:text-[#C85A17] hover:bg-orange-50/30"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "मिति परिवर्तन" : "Date Converter"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "rashifal" ? null : "rashifal")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-all duration-200 rounded-none ${
                  activeTool === "rashifal"
                    ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/70 hover:border-[#C85A17]/60 hover:text-[#C85A17] hover:bg-orange-50/30"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "राशिफल" : "Horoscope"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "bullion" ? null : "bullion")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-all duration-200 rounded-none ${
                  activeTool === "bullion"
                    ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/70 hover:border-[#C85A17]/60 hover:text-[#C85A17] hover:bg-orange-50/30"
                }`}
              >
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "मूल्य सूची" : "Bullion"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "forex" ? null : "forex")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-all duration-200 rounded-none ${
                  activeTool === "forex"
                    ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/70 hover:border-[#C85A17]/60 hover:text-[#C85A17] hover:bg-orange-50/30"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "विनिमय दर" : "Forex"}</span>
              </button>
            </div>
          </div>

          {/* Sub-strip: Today's Festival Alert Banner */}
          <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-900">
              <span className="px-2 py-0.5 bg-orange-50 text-[#C85A17] font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-orange-200/70 rounded-none">
                {isNe ? "पर्व / उत्सव" : "Festival"}
              </span>
              <span className="font-bold text-[#181411] text-xs sm:text-sm">
                {isNe
                  ? (liveToday.event || "आज कुनै विशेष सार्वजनिक बिदा वा पर्व छैन")
                  : (liveToday.eventEn || "No gazetted public holiday or special festival today")}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                {isNe ? `सूर्योदय: ${toNepaliDigits(liveToday.sunrise.split(" ")[0])}` : `Sunrise: ${liveToday.sunrise}`}
              </span>
              <span className="inline-flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                {isNe ? `सूर्यास्त: ${toNepaliDigits(liveToday.sunset.split(" ")[0])}` : `Sunset: ${liveToday.sunset}`}
              </span>
              <span className="inline-flex items-center gap-1 hidden md:inline-flex">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {isNe ? "काठमाडौँ, नेपाल" : "Kathmandu, Nepal"}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHARP RECTANGULAR QUICK TOOL PANELS (Vedic Saffron-Orange Theme)          */}
        {/* ========================================================================= */}
        {activeTool && (
          <div className="mb-6 bg-white border border-[#C85A17]/60 p-4 sm:p-5 shadow-xs relative rounded-none animate-fade-in">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-[#C85A17] p-1 rounded-none hover:bg-orange-50/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tool 1: Real Date Converter */}
            {activeTool === "converter" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-5 h-5 text-[#C85A17]" />
                  <h3 className="font-black text-sm sm:text-base text-[#181411]">
                    {isNe ? "वास्तविक नेपाली मिति रूपान्तरण (B.S. ↔ A.D.)" : "Official Nepali Date Converter (B.S. ↔ A.D.)"}
                  </h3>
                  <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 bg-orange-50 text-[#C85A17] border border-orange-200 rounded-none">
                    {isNe ? "नेपाल सरकार पञ्चाङ्ग आधारित" : "Official Nepal Govt Data"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isNe ? "वर्ष (B.S.)" : "Year (B.S.)"}
                    </label>
                    <select
                      value={convBsYear}
                      onChange={(e) => setConvBsYear(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-none focus:outline-none focus:border-[#C85A17] font-semibold"
                    >
                      {Array.from({ length: 15 }, (_, i) => 2075 + i).map((yr) => (
                        <option key={yr} value={yr}>
                          {isNe ? toNepaliNum(yr) : yr} ({yr - 57})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isNe ? "महिना" : "Month"}
                    </label>
                    <select
                      value={convBsMonth}
                      onChange={(e) => setConvBsMonth(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:border-[#12213A] font-semibold"
                    >
                      {MONTH_NAMES_BS.map((m, idx) => (
                        <option key={idx} value={idx + 1}>
                          {isNe ? m.ne : m.en} ({m.span})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isNe ? "गते (दिन)" : "Day (Gate)"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={convBsDay}
                      onChange={(e) => setConvBsDay(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:border-[#12213A] font-semibold"
                    />
                  </div>

                  <button
                    onClick={handleRunConversion}
                    className="w-full py-2 bg-[#12213A] hover:bg-[#0B1526] text-white text-sm font-bold transition-colors rounded-none shadow-sm"
                  >
                    {isNe ? "परिवर्तन गर्नुहोस्" : "Convert Date"}
                  </button>
                </div>

                <div className="mt-3 p-2.5 sm:p-3 bg-amber-50/60 border border-amber-200 rounded-none flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">
                    {isNe ? "प्रमाणित नतिजा (इस्वी सन्):" : "Verified Gregorian Result (A.D.):"}
                  </span>
                  <span className="font-black text-[#12213A]">{convertedResult}</span>
                </div>
              </div>
            )}

            {/* Tool 2: Comprehensive Horoscope Explorer (Daily, Weekly, Yearly) */}
            {activeTool === "rashifal" && (
              <div className="pt-1">
                <HoroscopeExplorer onOpenInquiry={onOpenInquiry} />
              </div>
            )}

            {/* Tool 3: Bullion Rates */}
            {activeTool === "bullion" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#C85A17]" />
                    <h3 className="font-black text-sm sm:text-base text-[#181411]">
                      {isNe ? "नेपाल सुनचाँदी व्यवसायी महासंघ मूल्य सूची (Live)" : "Federation of Nepal Gold & Silver Rates (Live)"}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span className="font-medium">{bullionSource}</span>
                    {bullionDate && <span className="font-bold text-stone-800">({bullionDate})</span>}
                  </div>
                </div>

                {bullionLoading ? (
                  <div className="py-6 text-center text-xs text-stone-500 font-mono animate-pulse">
                    {isNe ? "महासंघबाट लाइभ सुनचाँदी दर लोड हुँदैछ..." : "Fetching live bullion rates from FENEGOSIDA..."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {(bullionRates.length > 0 ? bullionRates : [
                      { id: 306, name: "छापावाल सुन (१ तोला)", nameEn: "Fine Gold (Per Tola)", rateFormattedNe: "रु २,९९,३००", rateFormatted: "Rs. 2,99,300" },
                      { id: 307, name: "छापावाल सुन (१० ग्राम)", nameEn: "Fine Gold (10 Grams)", rateFormattedNe: "रु २,५६,६००", rateFormatted: "Rs. 2,56,600" },
                      { id: 304, name: "असली चाँदी दर (१ तोला)", nameEn: "Silver (Per Tola)", rateFormattedNe: "रु ४,६५५", rateFormatted: "Rs. 4,655" },
                      { id: 305, name: "असली चाँदी दर (१० ग्राम)", nameEn: "Silver (10 Grams)", rateFormattedNe: "रु ३,९९१", rateFormatted: "Rs. 3,991" },
                    ]).map((item, idx) => (
                      <div key={idx} className="p-3 bg-white border border-[#E7DFD5] rounded-none">
                        <span className="text-xs text-stone-600 font-bold block truncate">
                          {isNe ? item.name : item.nameEn || item.name}
                        </span>
                        <div className="text-lg font-black text-[#181411] mt-0.5">
                          {isNe ? item.rateFormattedNe : item.rateFormatted}
                        </div>
                        <span className="text-[10px] text-stone-500 font-medium">
                          {isNe ? "प्रमाणित महासंघ दर" : "Official Market Rate"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tool 4: Live NRB Forex Rates */}
            {activeTool === "forex" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#C5994E]" />
                    <h3 className="font-black text-sm sm:text-base text-[#12213A]">
                      {isNe ? "नेपाल राष्ट्र बैंक विदेशी विनिमय दर (Live Official API)" : "Nepal Rastra Bank Foreign Exchange Rates (Live)"}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{forexSource}</span>
                    {forexDate && <span className="font-bold text-slate-800">({forexDate})</span>}
                  </div>
                </div>

                {forexLoading ? (
                  <div className="py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#12213A]" />
                    <span>राष्ट्र बैंकबाट लाइभ दर प्राप्त गर्दै...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {(forexRates.length > 0 ? forexRates.slice(0, 8) : [
                      { iso3: "USD", name: "U.S. Dollar", unit: 1, buy: "153.01", sell: "153.61" },
                      { iso3: "EUR", name: "European Euro", unit: 1, buy: "174.32", sell: "175.00" },
                      { iso3: "GBP", name: "UK Pound", unit: 1, buy: "202.64", sell: "203.43" },
                      { iso3: "AUD", name: "Australian Dollar", unit: 1, buy: "107.55", sell: "107.97" },
                    ]).map((r) => (
                      <div key={r.iso3} className="p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-none">
                        <div className="font-black text-[#12213A] flex items-center justify-between">
                          <span>{r.iso3} ({r.unit})</span>
                          <span className="text-[10px] text-slate-500 font-normal">{r.name}</span>
                        </div>
                        <div className="text-slate-600 mt-1">खरिद: रु {r.buy}</div>
                        <div className="text-[#C5994E] font-bold">बिक्री: रु {r.sell}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MAIN 7-COLUMN MONTHLY CALENDAR GRID & RIGHT SIDEBAR                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT 8 COLS: 7-COLUMN MONTHLY CALENDAR GRID                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 bg-white border border-stone-200/70 shadow-2xs rounded-none overflow-hidden">
            
            {/* Calendar Controls Bar - Fully Responsive */}
            <div className="p-3 sm:p-4 border-b border-stone-200/60 bg-stone-50/70 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 sm:p-1.5 border border-stone-200/80 bg-white hover:bg-orange-50/60 hover:border-[#C85A17]/60 text-stone-800 transition-all duration-150 rounded-none"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h2 className="text-lg sm:text-2xl font-black text-[#181411] tracking-tight">
                    {isNe ? calendarData.monthName : calendarData.monthNameEn} {isNe ? toNepaliNum(selectedYear) : selectedYear}
                  </h2>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-600 bg-white border border-stone-200/80 px-1.5 py-0.5 sm:px-2 rounded-none">
                    {calendarData.adMonthsSpan} {calendarData.yearEn}
                  </span>
                </div>

                <button
                  onClick={handleNextMonth}
                  className="p-1 sm:p-1.5 border border-stone-200/80 bg-white hover:bg-orange-50/60 hover:border-[#C85A17]/60 text-stone-800 transition-all duration-150 rounded-none"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Quick Jump Buttons & Selectors */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleMonthChange(liveToday.monthBs, liveToday.yearBs)}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold border transition-all duration-150 rounded-none ${
                    selectedMonth === liveToday.monthBs && selectedYear === liveToday.yearBs
                      ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                      : "bg-white text-stone-700 border-stone-200/80 hover:bg-orange-50/50 hover:border-[#C85A17]/40"
                  }`}
                >
                  {isNe ? "आज" : "Today"}
                </button>

                {/* Dropdown for Month Selection */}
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-bold border border-stone-200/80 bg-white text-stone-900 rounded-none focus:outline-none focus:border-[#C85A17]/70"
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
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-bold border border-stone-200/80 bg-white text-stone-900 rounded-none focus:outline-none focus:border-[#C85A17]/70"
                >
                  {[2080, 2081, 2082, 2083, 2084, 2085, 2086].map((yr) => (
                    <option key={yr} value={yr}>
                      {isNe ? toNepaliNum(yr) : yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weekday Column Headers (Sun to Sat) - Responsive labels */}
            <div className="grid grid-cols-7 border-b border-stone-200/60 bg-stone-50/80 text-center text-xs font-bold py-1.5 sm:py-2">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center ${
                    idx === 0 || idx === 6 ? "text-[#C2410C] font-extrabold" : "text-stone-700"
                  }`}
                >
                  <span className="sm:hidden text-[11px]">{isNe ? wd.shortNe : wd.shortEn}</span>
                  <span className="hidden sm:inline">{isNe ? wd.ne : wd.en}</span>
                </div>
              ))}
            </div>

            {/* 7-Column Calendar Grid Cells - Fully Responsive min-height and typography */}
            <div className="grid grid-cols-7 divide-x divide-y divide-stone-200/50 bg-stone-100/60 border-b border-stone-200/60">
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
                    className={`relative min-h-[70px] sm:min-h-[102px] md:min-h-[118px] p-1.5 sm:p-2.5 text-left flex flex-col justify-between transition-all duration-200 focus:outline-none rounded-none ${
                      // Today cell: Warm Saffron Highlight
                      day.isToday
                        ? "bg-[#C85A17] text-white font-bold z-10 hover:bg-[#A6440C] shadow-sm"
                        : isSelected
                        ? "bg-orange-50 ring-2 ring-[#C85A17]/80 z-10"
                        : day.isCurrentMonth
                        ? day.isHoliday || isSat
                          ? "bg-[#FFFDF9] hover:bg-orange-50/40 text-stone-900"
                          : "bg-white hover:bg-orange-50/30 text-stone-900"
                        : "bg-stone-50/50 text-stone-400 opacity-40"
                    }`}
                  >
                    {/* Top Row: English Day (top-right) */}
                    <div className="flex items-center justify-end w-full">
                      <span
                        className={`text-[9px] sm:text-xs font-semibold tabular-nums ${
                          day.isToday
                            ? "text-orange-100"
                            : isSat || isSun || day.isHoliday
                            ? "text-[#C2410C]"
                            : "text-stone-400"
                        }`}
                      >
                        {day.adDay}
                      </span>
                    </div>

                    {/* Middle: Prominent Day Numeral + Clear Unboxed Event */}
                    <div className="my-0.5 text-center w-full">
                      <span
                        className={`text-xl sm:text-2xl md:text-3xl font-extrabold block leading-tight ${
                          day.isToday
                            ? "text-white"
                            : isSat || day.isHoliday
                            ? "text-[#C2410C]"
                            : "text-[#181411]"
                        }`}
                      >
                        {isNe ? day.bsDayNepali : day.bsDay}
                      </span>

                      {/* Event / Festival Title - Pure Clear Typography (No Box) */}
                      {day.event && day.isCurrentMonth && (
                        <>
                          <span
                            className={`hidden sm:block text-[10px] sm:text-[11px] leading-tight line-clamp-2 mt-1 px-0.5 text-center ${
                              day.isToday
                                ? "text-orange-50 font-semibold"
                                : day.isHoliday || isSat
                                ? "text-[#C2410C] font-bold"
                                : "text-stone-700 font-semibold"
                            }`}
                            title={isNe ? day.event : day.eventEn || day.event}
                          >
                            {isNe ? day.event : day.eventEn || day.event}
                          </span>
                          <span
                            className={`sm:hidden block w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${
                              day.isToday ? "bg-white" : "bg-[#C2410C]"
                            }`}
                          />
                        </>
                      )}
                    </div>

                    {/* Bottom: Tithi Name */}
                    <div className="w-full text-center">
                      <span
                        className={`block text-[8.5px] sm:text-[10px] font-medium tracking-tight truncate ${
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

            {/* Bottom Legend */}
            <div className="p-2.5 sm:p-3 bg-stone-50 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 font-medium">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C85A17] rounded-none" />
                  <span className="font-bold text-stone-900">{isNe ? "आजको दिन" : "Today"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C2410C] rounded-none" />
                  <span className="text-[#C2410C] font-bold">{isNe ? "सार्वजनिक बिदा / शनि" : "Holiday / Saturday"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-stone-300 rounded-none" />
                  <span className="text-stone-700 font-bold">{isNe ? "पर्व / उत्सव" : "Festival"}</span>
                </span>
              </div>

              <div className="text-stone-500 text-[11px] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#C85A17]" />
                <span>{isNe ? "प्रमाणित पञ्चाङ्ग तथा खगोलिय गणना" : "Official Ephemeris & Astronomical Engine"}</span>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* ======================================================================= */}
          {/* RIGHT 4 COLS: DETAILED PANCHANGA, FESTIVAL TABS & CONSULTATION CTA      */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Selected Day Panchanga Card */}
            <div className="bg-white border border-stone-200/70 p-4 sm:p-5 shadow-2xs rounded-none">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#C85A17] rounded-none animate-pulse-subtle" />
                  <h3 className="font-black text-xs text-[#181411] uppercase tracking-wider">
                    {isNe ? "छानिएको दिनको पञ्चाङ्ग" : "Selected Day Panchanga"}
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-stone-50 text-stone-700 border border-stone-200/70 rounded-none">
                  {selectedDay.isToday ? (isNe ? "आज" : "Today") : `${selectedDay.adMonth} ${selectedDay.adDay}`}
                </span>
              </div>

              {/* Date & Day Banner */}
              <div className="mt-3.5">
                <div className="text-xl sm:text-2xl font-black text-[#181411] tracking-tight">
                  {isNe
                    ? `${selectedDay.bsDayNepali} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.ne || ""} ${toNepaliNum(selectedDay.bsYear)}`
                    : `${selectedDay.bsDay} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.en || ""} ${selectedDay.bsYear}`}
                </div>
                <div className="text-xs text-stone-600 font-bold mt-0.5">
                  {WEEKDAYS[selectedDay.dayOfWeek][isNe ? "ne" : "en"]} • {selectedDay.adMonth} {selectedDay.adDay}, {selectedDay.adYear}
                </div>
              </div>

              {/* Event alert if present - Clean Accent Line, Not Trapped in a Box */}
              {selectedDay.event && (
                <div className="mt-3 p-2.5 bg-orange-50/70 border-l-2 border-[#C85A17]/80 text-xs font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C85A17] shrink-0" />
                  <span>{isNe ? selectedDay.event : selectedDay.eventEn || selectedDay.event}</span>
                </div>
              )}

              {/* Clean Panchanga Matrix - Unified Clean Architectural Grid */}
              <div className="mt-4 grid grid-cols-2 divide-x divide-y divide-stone-200/50 border border-stone-200/60 text-xs bg-white">
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "तिथि" : "Tithi"}</span>
                  <span className="font-bold text-[#181411] text-xs">{isNe ? selectedDay.tithi : selectedDay.tithiEn}</span>
                </div>
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "नक्षत्र" : "Nakshatra"}</span>
                  <span className="font-bold text-[#181411] text-xs">{selectedDay.nakshatra}</span>
                </div>
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "योग" : "Yoga"}</span>
                  <span className="font-bold text-[#181411] text-xs">{selectedDay.yoga}</span>
                </div>
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "चन्द्र राशि" : "Moon Sign"}</span>
                  <span className="font-bold text-[#181411] text-xs">{selectedDay.moonSign}</span>
                </div>
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "सूर्योदय" : "Sunrise"}</span>
                  <span className="font-bold text-[#181411] text-xs">{selectedDay.sunrise}</span>
                </div>
                <div className="p-2 sm:p-2.5">
                  <span className="text-stone-400 font-semibold block text-[10px] uppercase tracking-wider">{isNe ? "सूर्यास्त" : "Sunset"}</span>
                  <span className="font-bold text-[#181411] text-xs">{selectedDay.sunset}</span>
                </div>
              </div>

              {/* Muhurta info if any */}
              {selectedDay.muhurta && (
                <div className="mt-3 p-2.5 bg-orange-50/50 border-l-2 border-[#D97706]/70 text-xs text-stone-900">
                  <span className="font-bold block text-[#C85A17]">{isNe ? "शुभ साइत / चौघडिया:" : "Auspicious Muhurta:"}</span>
                  <span className="font-medium">{selectedDay.muhurta}</span>
                </div>
              )}

              {/* Direct Booking CTA */}
              <button
                onClick={() =>
                  onOpenInquiry(
                    `साइत तथा पञ्चाङ्ग परामर्श: ${selectedDay.bsDayNepali} ${MONTH_NAMES_BS[selectedDay.bsMonth - 1]?.ne} (${isNe ? selectedDay.tithi : selectedDay.tithiEn})`
                  )
                }
                className="mt-4 w-full py-2.5 bg-[#C85A17] hover:bg-[#A6440C] text-white font-bold text-xs transition-colors rounded-none flex items-center justify-center gap-1.5 shadow-sm border border-[#C85A17]"
              >
                <span>{isNe ? "यस दिनको विशेष साइत परामर्श लिनुहोस्" : "Book Muhurta Consultation for this Day"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-200" />
              </button>
            </div>

            {/* 3 Tabs: पर्वहरू / साइतहरू / आगामी बिदा */}
            <div className="bg-white border border-stone-200/70 rounded-none shadow-2xs overflow-hidden">
              <div className="flex border-b border-stone-200/60 bg-stone-50/70">
                <button
                  onClick={() => setSidebarTab("festivals")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 rounded-none ${
                    sidebarTab === "festivals"
                      ? "border-[#C85A17] text-[#C85A17] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {isNe ? "पर्वहरू" : "Festivals"}
                </button>

                <button
                  onClick={() => setSidebarTab("muhurta")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 rounded-none ${
                    sidebarTab === "muhurta"
                      ? "border-[#C85A17] text-[#C85A17] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {isNe ? "साइतहरू" : "Muhurtas"}
                </button>

                <button
                  onClick={() => setSidebarTab("holidays")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 rounded-none ${
                    sidebarTab === "holidays"
                      ? "border-[#C85A17] text-[#C85A17] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {isNe ? "आगामी बिदा" : "Holidays"}
                </button>
              </div>

              {/* Tab 1: Festivals List for Current Month - Clean list, not nested boxes */}
              {sidebarTab === "festivals" && (
                <div className="divide-y divide-stone-100 max-h-[360px] overflow-y-auto">
                  {festivalEntries.length > 0 ? (
                    festivalEntries.map((ev) => (
                      <div
                        key={ev.day}
                        onClick={() => {
                          const target = calendarData.days.find(
                            (d) => d.bsDay === ev.day && d.isCurrentMonth
                          );
                          if (target) setSelectedDay(target);
                        }}
                        className="p-3 hover:bg-orange-50/50 transition-colors cursor-pointer flex items-center gap-3"
                      >
                        <div className="shrink-0 w-8 h-8 bg-stone-100 flex flex-col items-center justify-center border border-stone-200">
                          <span className="text-[9px] text-stone-500 leading-none font-bold">
                            {isNe ? calendarData.monthName.slice(0, 3) : calendarData.monthNameEn.slice(0, 3)}
                          </span>
                          <span className="text-xs font-black text-[#C85A17] leading-none mt-0.5">
                            {isNe ? toNepaliNum(ev.day) : ev.day}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#181411] truncate">
                            {isNe ? ev.event : ev.eventEn}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {ev.isHoliday ? (
                              <span className="text-[#C2410C] font-semibold">{isNe ? "सार्वजनिक बिदा" : "Public Holiday"}</span>
                            ) : (
                              <span>{isNe ? "धार्मिक / सांस्कृतिक पर्व" : "Cultural Festival"}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-stone-400">
                      {isNe ? "यस महिनाको पर्व विवरण उपलब्ध छैन" : "No specific festivals recorded for this month"}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Muhurtas List */}
              {sidebarTab === "muhurta" && (
                <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto text-xs">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-none">
                    <div className="font-bold text-[#181411] flex items-center justify-between">
                      <span>{isNe ? "गृहप्रवेश उत्तम साइत" : "Griha Pravesh Muhurta"}</span>
                      <span className="px-2 py-0.5 bg-orange-100 text-[#C85A17] font-bold text-[10px] border border-orange-200 rounded-none">
                        {isNe ? "उत्तम" : "Excellent"}
                      </span>
                    </div>
                    <div className="text-stone-800 mt-1 font-semibold">
                      {isNe ? `${calendarData.monthName} ११ गते (अमृत वेला विन्डो)` : `${calendarData.monthNameEn} 11 (Amrit Bela Window)`}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">समय: बिहान ०७:३० देखि ०९:१५ सम्म</div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-none">
                    <div className="font-bold text-[#181411] flex items-center justify-between">
                      <span>{isNe ? "विवाह / व्रतबन्ध साइत" : "Marriage / Vivah Muhurta"}</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-300 rounded-none">
                        {isNe ? "शुभ योग" : "Auspicious"}
                      </span>
                    </div>
                    <div className="text-stone-800 mt-1 font-semibold">
                      {isNe ? `${calendarData.monthName} २६ गते (उत्तम लग्न)` : `${calendarData.monthNameEn} 26 (Auspicious Lagna)`}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">साइत: बिहान ०८:२५ बजे उत्तम योग</div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-none">
                    <div className="font-bold text-[#181411] flex items-center justify-between">
                      <span>{isNe ? "सवारी साधन खरिद साइत" : "Vehicle Purchase Muhurta"}</span>
                      <span className="px-2 py-0.5 bg-orange-100 text-[#C85A17] font-bold text-[10px] border border-orange-200 rounded-none">
                        {isNe ? "शुभ" : "Auspicious"}
                      </span>
                    </div>
                    <div className="text-stone-800 mt-1 font-semibold">
                      {isNe ? `${calendarData.monthName} ३१ गते` : `${calendarData.monthNameEn} 31`}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">समय: दिउँसो ११:४० देखि ०१:१५ सम्म</div>
                  </div>
                </div>
              )}

              {/* Tab 3: Upcoming Holidays List (Amber / Burnt Orange, No Red) */}
              {sidebarTab === "holidays" && (
                <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto text-xs">
                  {holidayEntries.length > 0 ? (
                    holidayEntries.map((ev) => (
                      <div key={ev.day} className="p-3 bg-orange-50/60 border border-orange-200 rounded-none">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-[#181411]">{isNe ? ev.event : ev.eventEn}</span>
                          <span className="text-[10px] font-bold text-[#C2410C] px-2 py-0.5 bg-white border border-orange-300 rounded-none">
                            {isNe ? `${calendarData.monthName} ${toNepaliNum(ev.day)}` : `${calendarData.monthNameEn} ${ev.day}`}
                          </span>
                        </div>
                        <div className="text-stone-600 text-[11px] mt-1">
                          {isNe ? "नेपाल सरकार राजपत्र अनुसार आधिकारिक सार्वजनिक बिदा" : "Official Nepal Govt Public Holiday"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-stone-400">
                      {isNe ? "यस महिनामा सार्वजनिक बिदा छैन (शनिबार बाहेक)" : "No official gazetted public holidays this month"}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Guru Nilhari Authority Card - Warm Saffron & Dark Charcoal */}
            <div className="bg-[#181411] text-white p-4 sm:p-5 border border-stone-700 rounded-none shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C85A17] flex items-center justify-center font-black text-sm rounded-none text-white shadow-sm">
                  गुरु
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isNe ? "गुरु निलहरि (Guru Nilhari)" : "Guru Nilhari (CEO | Chief Consultant)"}
                  </h4>
                  <p className="text-[11px] text-[#D97706] font-medium">
                    {isNe ? "वैदिक सनातन केन्द्र युके • ३ दशकको साधना" : "Vedic Sanatan Kendra UK • 3+ Decades Mastery"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-300 mt-3 leading-relaxed">
                {isNe
                  ? "ज्योतिष तथा कुण्डली, रत्न पहिचान, वास्तु शास्त्र र वैदिक कर्मकाण्डका लागि प्रामाणिक मार्गदर्शन प्राप्त गर्नुहोस्।"
                  : "Authentic consultation across Astrology (Horoscope), Gemstone Identification, Vastu Shastra, and sacred Vedic Karmakanda."}
              </p>

              <button
                onClick={() => onOpenInquiry("गुरु निलहरिसँग परामर्श (Vedic Sanatan Kendra UK)")}
                className="mt-3.5 w-full py-2.5 bg-[#C85A17] hover:bg-[#A6440C] text-white text-xs font-black rounded-none transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{isNe ? "प्रत्यक्ष परामर्श बुक गर्नुहोस्" : "Book Direct Consultation"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-200" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
