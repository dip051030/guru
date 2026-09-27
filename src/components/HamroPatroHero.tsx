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
  CalendarDay,
  MONTH_NAMES_BS,
  FESTIVALS_BY_MONTH,
  convertBsToAd,
} from "@/utils/nepaliCalendar";

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

  // Dynamic Year & Month State (Default: Ashwin 2083)
  const [selectedYear, setSelectedYear] = useState<number>(2083);
  const [selectedMonth, setSelectedMonth] = useState<number>(6); // 1 = Baisakh, 6 = Ashwin
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [sidebarTab, setSidebarTab] = useState<"festivals" | "muhurta" | "holidays">("festivals");

  // Get real dynamically computed month data
  const calendarData = getMonthCalendarData(selectedYear, selectedMonth);

  // Active selected day (default: today or 1st day of month)
  const [selectedDay, setSelectedDay] = useState<CalendarDay>(() => {
    return (
      calendarData.days.find((d) => d.isToday) ||
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
  const [convBsYear, setConvBsYear] = useState("2083");
  const [convBsMonth, setConvBsMonth] = useState("6");
  const [convBsDay, setConvBsDay] = useState("11");
  const [convertedResult, setConvertedResult] = useState<string>("Sunday, September 27, 2026 (A.D.)");

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
    return () => {
      isMounted = false;
    };
  }, []);

  // 12 Rashi Horoscope Data
  const [selectedRashi, setSelectedRashi] = useState<number>(0);
  const RASHIS = [
    { ne: "मेष (Aries)", luck: "८५%", prediction: "कार्यक्षेत्रमा नयाँ अवसर प्राप्त हुनेछ। पारिवारिक सुख र आर्थिक लाभको योग छ।", advice: "सूर्यलाई जल चढाउनुहोस्।" },
    { ne: "वृष (Taurus)", luck: "७८%", prediction: "धन आगमन र व्यापारिक साझेदारीमा प्रगति हुनेछ। बोलीमा मधुरता राख्नुहोला।", advice: "सेतो वस्तु दान गर्नुहोस्।" },
    { ne: "मिथुन (Gemini)", luck: "९०%", prediction: "अधुरा काम बन्नेछन्, बौद्धिक क्षेत्रमा सफलता मिल्नेछ। यात्राको योग बन्नेछ।", advice: "गायलाई हरियो घाँस दिनुहोस्।" },
    { ne: "कर्कट (Cancer)", luck: "७२%", prediction: "पारिवारिक जिम्मेवारी बढ्नेछ। स्वास्थ्यमा सामान्य ध्यान दिनु आवश्यक छ।", advice: "शिवजीको पूजा गर्नुहोस्।" },
    { ne: "सिंह (Leo)", luck: "९२%", prediction: "मान-प्रतिष्ठा र पदोन्नतिको शुभ योग छ। महत्वपूर्ण निर्णय लिन उपयुक्त समय।", advice: "पहेलो वा सुनौलो वस्तु धारण गर्नुहोस्।" },
    { ne: "कन्या (Virgo)", luck: "८८%", prediction: "आर्थिक स्थिरता र पराक्रममा वृद्धि। रोकिएका कामहरू द्रुत गतिमा अघि बढ्नेछन्।", advice: "विष्णु सहस्रनाम पाठ गर्नुहोस्।" },
    { ne: "तुला (Libra)", luck: "८०%", prediction: "प्रेम सम्बन्ध सुदृढ हुनेछ र कला, सिर्जनात्मक कार्यमा सफलता प्राप्त हुनेछ।", advice: "लक्ष्मीजीको स्तोत्र पढ्नुहोस्।" },
    { ne: "वृश्चिक (Scorpio)", luck: "७६%", prediction: "सावधानीपूर्वक गरिएको लगानीबाट भविष्यमा राम्रो प्रतिफल प्राप्त हुनेछ।", advice: "हनुमान चालिसा पाठ गर्नुहोस्।" },
    { ne: "धनु (Sagittarius)", luck: "८४%", prediction: "गुरुको कृपाले आध्यात्मिक प्रगति र विद्या क्षेत्रमा विशेष उपलब्धि मिल्नेछ।", advice: "पहेलो चन्दन लगाउनुहोस्।" },
    { ne: "मकर (Capricorn)", luck: "७५%", prediction: "कर्मक्षेत्रमा निरन्तर मिहिनेतले उच्च प्रशंसा पाउनेछ। धैर्य कायम राख्नुहोस्।", advice: "शनि मन्त्र जप गर्नुहोस्।" },
    { ne: "कुम्भ (Aquarius)", luck: "८२%", prediction: "नयाँ मित्रको साथ र सामाजिक सम्मान प्राप्त हुनेछ। आयका नयाँ स्रोत खुल्नेछन्।", advice: "असाहयलाई भोजन गराउनुहोस्।" },
    { ne: "मीन (Pisces)", luck: "८९%", prediction: "शुभ समाचार सुन्न पाइनेछ। वैदेशिक कार्य र दीर्घकालीन योजना सफल हुनेछ।", advice: "केसरको तिलक लगाउनुहोस्।" },
  ];

  // Dynamic Festivals for currently selected month
  const currentMonthFestivals = FESTIVALS_BY_MONTH[selectedMonth] || {};
  const festivalEntries = Object.entries(currentMonthFestivals).map(([dayStr, ev]) => ({
    day: parseInt(dayStr, 10),
    ...ev,
  }));

  // Public Holidays in currently selected month
  const holidayEntries = festivalEntries.filter((ev) => ev.isHoliday);

  return (
    <section className="relative w-full bg-[#FDFBF7] text-[#181411] pt-4 pb-12 border-b border-[#E7DFD5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP LIVE DATE BANNER & HORIZONTALLY SCROLLABLE TOOLS (Mobile-First)   */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#E7DFD5] p-3.5 sm:p-5 shadow-2xs mb-5 sm:mb-6 rounded-none">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            
            {/* Left: Prominent Live Nepali Date in Saffron & Amber */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-50 text-[#C85A17] text-[10px] sm:text-[11px] font-bold tracking-wide border border-orange-200 rounded-none uppercase">
                  <span className="w-1.5 h-1.5 bg-[#C85A17] rounded-none animate-pulse" />
                  {isNe ? "आजको पञ्चाङ्ग" : "Live Panchanga"}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  {isNe ? "नेपाल संवत् ११४६ अनलागा पञ्च" : "Nepal Samvat 1146 Analaga Pancha"}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3 gap-y-0.5">
                <h1 className="text-xl sm:text-3xl font-black text-[#181411] tracking-tight">
                  {isNe ? "११ असोज २०८३, आइतवार" : "11 Ashwin 2083, Sunday"}
                </h1>
                <span className="text-sm sm:text-lg font-semibold text-stone-400">
                  / Sep 27, 2026
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#D97706] hidden sm:inline">
                  • {isNe ? "असोज कृष्ण प्रतिपदा" : "Ashwin Krishna Pratipada"}
                </span>
              </div>
            </div>

            {/* Right: Quick Action Buttons - Horizontally Scrollable on Mobile, Wrap on Desktop */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
              <button
                onClick={() => setActiveTool(activeTool === "converter" ? null : "converter")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-colors rounded-none ${
                  activeTool === "converter"
                    ? "bg-[#C85A17] text-white border-[#C85A17]"
                    : "bg-white text-stone-700 border-[#E7DFD5] hover:border-[#C85A17] hover:text-[#C85A17]"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "मिति परिवर्तन" : "Date Converter"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "rashifal" ? null : "rashifal")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-colors rounded-none ${
                  activeTool === "rashifal"
                    ? "bg-[#C85A17] text-white border-[#C85A17]"
                    : "bg-white text-stone-700 border-[#E7DFD5] hover:border-[#C85A17] hover:text-[#C85A17]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "राशिफल" : "Horoscope"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "bullion" ? null : "bullion")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-colors rounded-none ${
                  activeTool === "bullion"
                    ? "bg-[#C85A17] text-white border-[#C85A17]"
                    : "bg-white text-stone-700 border-[#E7DFD5] hover:border-[#C85A17] hover:text-[#C85A17]"
                }`}
              >
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "मूल्य सूची" : "Bullion"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "forex" ? null : "forex")}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold border transition-colors rounded-none ${
                  activeTool === "forex"
                    ? "bg-[#C85A17] text-white border-[#C85A17]"
                    : "bg-white text-stone-700 border-[#E7DFD5] hover:border-[#C85A17] hover:text-[#C85A17]"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D97706]" />
                <span>{isNe ? "विनिमय दर" : "Forex"}</span>
              </button>
            </div>
          </div>

          {/* Sub-strip: Today's Festival Alert Banner */}
          <div className="mt-3 pt-2.5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-900">
              <span className="px-2 py-0.5 bg-orange-50 text-[#C85A17] font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-orange-200 rounded-none">
                {isNe ? "पर्व / उत्सव" : "Festival"}
              </span>
              <span className="font-bold text-[#181411] text-xs sm:text-sm">
                {isNe
                  ? "सोह्रश्राद्ध प्रारम्भ (प्रतिपदा श्राद्ध) / विश्व पर्यटन दिवस"
                  : "Sohrashraddha Pratipada / World Tourism Day"}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                {isNe ? "सूर्योदय: ०६:०१" : "Sunrise: 06:01 AM"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                {isNe ? "सूर्यास्त: १७:५८" : "Sunset: 05:58 PM"}
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
          <div className="mb-6 bg-white border-2 border-[#C85A17] p-4 sm:p-5 shadow-sm relative rounded-none animate-in fade-in duration-150">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-[#C85A17] p-1 rounded-none hover:bg-orange-50 transition-colors"
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

            {/* Tool 2: Rashifal (Daily Horoscope) */}
            {activeTool === "rashifal" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#C5994E]" />
                  <h3 className="font-black text-sm sm:text-base text-[#12213A]">
                    {isNe ? "आजको दैनिक राशिफल (१२ राशि)" : "Today's Daily Horoscope (12 Signs)"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1 mb-3 sm:mb-4">
                  {RASHIS.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRashi(i)}
                      className={`px-1.5 py-1 text-xs font-bold transition-all text-center rounded-none border ${
                        selectedRashi === i
                          ? "bg-[#12213A] text-white border-[#12213A]"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {r.ne.split(" ")[0]}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-base sm:text-lg font-black text-[#12213A]">{RASHIS[selectedRashi].ne}</span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-none">
                        {isNe ? `भाग्यशाली: ${RASHIS[selectedRashi].luck}` : `Luck: ${RASHIS[selectedRashi].luck}`}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {RASHIS[selectedRashi].prediction}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600 font-semibold">
                      💡 {isNe ? `आजको उपाय: ${RASHIS[selectedRashi].advice}` : `Remedy: ${RASHIS[selectedRashi].advice}`}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenInquiry(`राशिफल तथा कुण्डली परामर्श: ${RASHIS[selectedRashi].ne}`)}
                    className="shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#12213A] text-white text-xs font-bold rounded-none hover:bg-[#0B1526] transition-colors"
                  >
                    {isNe ? "विस्तृत कुण्डली परामर्श" : "Detailed Consultation"}
                  </button>
                </div>
              </div>
            )}

            {/* Tool 3: Bullion Rates */}
            {activeTool === "bullion" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="w-5 h-5 text-[#C5994E]" />
                  <h3 className="font-black text-sm sm:text-base text-[#12213A]">
                    {isNe ? "नेपाल सुनचाँदी व्यवसायी महासंघ मूल्य सूची" : "Federation of Nepal Gold & Silver Rates"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-300 rounded-none">
                    <span className="text-xs text-slate-700 font-bold">{isNe ? "छापावाल सुन (प्रति तोला)" : "Fine Gold (Per Tola)"}</span>
                    <div className="text-lg font-black text-[#12213A] mt-0.5">रु १,५२,३००</div>
                    <span className="text-[11px] text-emerald-700 font-bold">▲ रु ५०० वृद्धि</span>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-300 rounded-none">
                    <span className="text-xs text-slate-700 font-bold">{isNe ? "तेजाबी सुन (प्रति तोला)" : "Tejabi Gold (Per Tola)"}</span>
                    <div className="text-lg font-black text-[#12213A] mt-0.5">रु १,५१,६००</div>
                    <span className="text-[11px] text-emerald-700 font-bold">▲ रु ५०० वृद्धि</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-300 rounded-none">
                    <span className="text-xs text-slate-700 font-bold">{isNe ? "चाँदी (प्रति तोला)" : "Silver (Per Tola)"}</span>
                    <div className="text-lg font-black text-slate-900 mt-0.5">रु १,८५०</div>
                    <span className="text-[11px] text-slate-500 font-bold">स्थिर (No Change)</span>
                  </div>
                </div>
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
                      { iso3: "USD", name: "U.S. Dollar", unit: 1, buy: "136.69", sell: "137.29" },
                      { iso3: "EUR", name: "European Euro", unit: 1, buy: "148.20", sell: "148.85" },
                      { iso3: "GBP", name: "UK Pound", unit: 1, buy: "177.10", sell: "177.90" },
                      { iso3: "AUD", name: "Australian Dollar", unit: 1, buy: "91.10", sell: "91.55" },
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
          <div className="lg:col-span-8 bg-white border border-stone-300 shadow-2xs rounded-none overflow-hidden">
            
            {/* Calendar Controls Bar - Fully Responsive */}
            <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 sm:p-1.5 border border-stone-300 bg-white hover:bg-orange-50 hover:border-[#C85A17] text-stone-800 transition-colors rounded-none"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h2 className="text-lg sm:text-2xl font-black text-[#181411] tracking-tight">
                    {isNe ? calendarData.monthName : calendarData.monthNameEn} {isNe ? toNepaliNum(selectedYear) : selectedYear}
                  </h2>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-600 bg-white border border-stone-300 px-1.5 py-0.5 sm:px-2 rounded-none">
                    {calendarData.adMonthsSpan} {calendarData.yearEn}
                  </span>
                </div>

                <button
                  onClick={handleNextMonth}
                  className="p-1 sm:p-1.5 border border-stone-300 bg-white hover:bg-orange-50 hover:border-[#C85A17] text-stone-800 transition-colors rounded-none"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Quick Jump Buttons & Selectors */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleMonthChange(6, 2083)}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold border transition-colors rounded-none ${
                    selectedMonth === 6 && selectedYear === 2083
                      ? "bg-[#C85A17] text-white border-[#C85A17]"
                      : "bg-white text-stone-700 border-stone-300 hover:bg-orange-50"
                  }`}
                >
                  {isNe ? "आज" : "Today"}
                </button>

                {/* Dropdown for Month Selection */}
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-bold border border-stone-300 bg-white text-stone-900 rounded-none focus:outline-none focus:border-[#C85A17]"
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
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-bold border border-stone-300 bg-white text-stone-900 rounded-none focus:outline-none focus:border-[#C85A17]"
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
            <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-100 text-center text-xs font-bold py-1.5 sm:py-2">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center ${
                    idx === 0 || idx === 6 ? "text-[#C2410C] font-extrabold" : "text-stone-800"
                  }`}
                >
                  <span className="sm:hidden text-[11px]">{isNe ? wd.shortNe : wd.shortEn}</span>
                  <span className="hidden sm:inline">{isNe ? wd.ne : wd.en}</span>
                </div>
              ))}
            </div>

            {/* 7-Column Calendar Grid Cells - Fully Responsive min-height and typography */}
            <div className="grid grid-cols-7 divide-x divide-y divide-stone-200 bg-stone-200 border-b border-stone-200">
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
                    className={`relative min-h-[64px] sm:min-h-[96px] md:min-h-[110px] p-1 sm:p-2 text-left flex flex-col justify-between transition-colors focus:outline-none rounded-none ${
                      // Today cell: Warm Saffron Orange Accent
                      day.isToday
                        ? "bg-[#C85A17] text-white font-bold z-10 hover:bg-[#A6440C] shadow-sm"
                        : isSelected
                        ? "bg-orange-50 ring-2 ring-[#C85A17] z-10"
                        : day.isCurrentMonth
                        ? day.isHoliday || isSat
                          ? "bg-amber-50/60 hover:bg-amber-100/70 text-stone-900"
                          : "bg-white hover:bg-orange-50/40 text-stone-900"
                        : "bg-stone-100 text-stone-400 opacity-60"
                    }`}
                  >
                    {/* Top Row: English Day (top-right) & Indicator */}
                    <div className="flex items-start justify-between w-full">
                      {day.isHoliday && day.isCurrentMonth && !day.isToday ? (
                        <span className="w-1.5 h-1.5 bg-[#C2410C] rounded-none" title="Holiday" />
                      ) : (
                        <span />
                      )}
                      
                      <span
                        className={`text-[9px] sm:text-xs font-bold tabular-nums ${
                          day.isToday
                            ? "text-orange-100"
                            : isSat || isSun || day.isHoliday
                            ? "text-[#C2410C] font-extrabold"
                            : "text-stone-400"
                        }`}
                      >
                        {day.adDay}
                      </span>
                    </div>

                    {/* Middle: Prominent Nepali Day Numeral */}
                    <div className="my-0.5 text-center">
                      <span
                        className={`text-lg sm:text-2xl md:text-3xl font-black block leading-tight ${
                          day.isToday
                            ? "text-white"
                            : isSat || day.isHoliday
                            ? "text-[#C2410C]"
                            : "text-[#181411]"
                        }`}
                      >
                        {isNe ? day.bsDayNepali : day.bsDay}
                      </span>

                      {/* Event / Festival Tag Snippet (Responsive dot on tiny screens, badge on sm+) */}
                      {day.event && day.isCurrentMonth && (
                        <>
                          <span
                            className="hidden sm:block text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-1 mt-1 px-1 py-0.5 rounded-none border bg-orange-50/80 text-stone-800 border-orange-200"
                            title={isNe ? day.event : day.eventEn || day.event}
                          >
                            {isNe ? day.event : day.eventEn || day.event}
                          </span>
                          <span className="sm:hidden block w-1.5 h-1.5 rounded-none bg-[#C2410C] mx-auto mt-0.5" />
                        </>
                      )}
                    </div>

                    {/* Bottom: Tithi Name */}
                    <div className="w-full text-center">
                      <span
                        className={`block text-[8px] sm:text-[10.5px] font-semibold tracking-tight truncate ${
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
            <div className="bg-white border border-stone-300 p-4 sm:p-5 shadow-2xs rounded-none">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#C85A17] rounded-none" />
                  <h3 className="font-black text-xs text-[#181411] uppercase tracking-wider">
                    {isNe ? "छानिएको दिनको पञ्चाङ्ग" : "Selected Day Panchanga"}
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-stone-100 text-stone-800 border border-stone-300 rounded-none">
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

              {/* Event alert if present (Warm Amber / Saffron, No Red) */}
              {selectedDay.event && (
                <div className="mt-3 p-2 bg-orange-50 border border-orange-200 text-xs font-bold text-stone-900 flex items-center gap-2 rounded-none">
                  <Sparkles className="w-4 h-4 text-[#C85A17] shrink-0" />
                  <span>{isNe ? selectedDay.event : selectedDay.eventEn || selectedDay.event}</span>
                </div>
              )}

              {/* Sharp Panchanga Matrix */}
              <div className="mt-4 grid grid-cols-2 gap-1.5 text-xs">
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "तिथि" : "Tithi"}</span>
                  <span className="font-bold text-[#181411]">{isNe ? selectedDay.tithi : selectedDay.tithiEn}</span>
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "नक्षत्र" : "Nakshatra"}</span>
                  <span className="font-bold text-[#181411]">{selectedDay.nakshatra}</span>
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "योग" : "Yoga"}</span>
                  <span className="font-bold text-[#181411]">{selectedDay.yoga}</span>
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "चन्द्र राशि" : "Moon Sign"}</span>
                  <span className="font-bold text-[#181411]">{selectedDay.moonSign}</span>
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "सूर्योदय" : "Sunrise"}</span>
                  <span className="font-bold text-[#181411]">{selectedDay.sunrise}</span>
                </div>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-none">
                  <span className="text-stone-500 font-semibold block text-[11px]">{isNe ? "सूर्यास्त" : "Sunset"}</span>
                  <span className="font-bold text-[#181411]">{selectedDay.sunset}</span>
                </div>
              </div>

              {/* Muhurta info if any */}
              {selectedDay.muhurta && (
                <div className="mt-3 p-2 bg-orange-50 border border-orange-200 text-xs text-stone-900 rounded-none">
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
            <div className="bg-white border border-stone-300 rounded-none shadow-2xs overflow-hidden">
              <div className="flex border-b border-stone-200 bg-stone-50">
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

              {/* Tab 1: Festivals List for Current Month */}
              {sidebarTab === "festivals" && (
                <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
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
                        className="p-2.5 border border-stone-200 hover:border-[#C85A17] hover:bg-orange-50/50 transition-colors cursor-pointer flex items-start gap-3 rounded-none"
                      >
                        <div className="shrink-0 w-8 h-8 bg-stone-100 flex flex-col items-center justify-center border border-stone-300 rounded-none">
                          <span className="text-[9px] text-stone-500 leading-none font-bold">
                            {isNe ? calendarData.monthName.slice(0, 3) : calendarData.monthNameEn.slice(0, 3)}
                          </span>
                          <span className="text-xs font-black text-[#181411] leading-none mt-0.5">
                            {isNe ? toNepaliNum(ev.day) : ev.day}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#181411] line-clamp-1">
                            {isNe ? ev.event : ev.eventEn}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {ev.isHoliday ? (
                              <span className="text-[#C2410C] font-bold">{isNe ? "सार्वजनिक बिदा" : "Public Holiday"}</span>
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

            {/* Guru Neel Hari Authority Card - Warm Saffron & Dark Charcoal */}
            <div className="bg-[#181411] text-white p-4 sm:p-5 border border-stone-700 rounded-none shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C85A17] flex items-center justify-center font-black text-sm rounded-none text-white shadow-sm">
                  गुरू
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isNe ? "ज्योतिषाचार्य गुरु नील हरि" : "Jyotishacharya Guru Neel Hari"}
                  </h4>
                  <p className="text-[11px] text-[#D97706] font-medium">
                    {isNe ? "३४+ वर्ष वैदिक पञ्चाङ्ग तथा साइत अनुसन्धान" : "34+ Years Vedic Ephemeris & Muhurta Research"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-300 mt-3 leading-relaxed">
                {isNe
                  ? "विवाह, व्रतबन्ध, गृहप्रवेश वा नयाँ व्यवसायको लागि तपाईंको व्यक्तिगत चिना अनुसारको निर्दोष साइत प्राप्त गर्नुहोस्।"
                  : "Receive infallible auspicious timings (Muhurtas) for weddings, housewarming, or commercial ventures calibrated to your natal Kundali."}
              </p>

              <button
                onClick={() => onOpenInquiry("गुरु नील हरिसँग व्यक्तिगत साइत तथा कुण्डली परामर्श")}
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
