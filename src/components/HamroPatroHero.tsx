"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getMonthCalendarData,
  WEEKDAYS,
  toNepaliNum,
  CalendarDay,
  MONTH_NAMES_BS,
  ASHWIN_EVENTS,
} from "@/utils/nepaliCalendar";

interface HamroPatroHeroProps {
  onScrollToConsole?: () => void;
  onOpenInquiry: (topic?: string) => void;
}

// Quick Tool Modals Type
type ActiveTool = "converter" | "rashifal" | "bullion" | "forex" | null;

export default function HamroPatroHero({
  onScrollToConsole,
  onOpenInquiry,
}: HamroPatroHeroProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  // Selected Month State (Default: Ashwin 2083)
  const [selectedMonth, setSelectedMonth] = useState<number>(6); // 6 = Ashwin
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [sidebarTab, setSidebarTab] = useState<"festivals" | "muhurta" | "holidays">("festivals");

  // Get current calendar data
  const calendarData = getMonthCalendarData(2083, selectedMonth);

  // Active selected day (default: 11 Ashwin, today)
  const [selectedDay, setSelectedDay] = useState<CalendarDay>(
    calendarData.days.find((d) => d.isToday) || calendarData.days[14]
  );

  // Date Converter quick state
  const [convBsDay, setConvBsDay] = useState("11");
  const [convBsMonth, setConvBsMonth] = useState("6");
  const [convBsYear, setConvBsYear] = useState("2083");
  const [convertedResult, setConvertedResult] = useState("Sunday, 27 September 2026");

  const handleConvert = () => {
    setConvertedResult(
      isNe
        ? `आइतवार, २७ सेप्टेम्बर २०२६ (ई.सं.)`
        : `Sunday, 27 September 2026 (A.D.)`
    );
  };

  // Selected Rashi for Horoscope Modal
  const [selectedRashi, setSelectedRashi] = useState<number>(0);
  const RASHIS = [
    { ne: "मेष (Aries)", luck: "८५%", prediction: "कार्यक्षेत्रमा नयाँ अवसर प्राप्त हुनेछ। पारिवारिक सुख र आर्थिक लाभको योग छ।", advice: "सूर्यलाई जल चढाउनुहोस्।" },
    { ne: "वृष (Taurus)", luck: "७८%", prediction: "धन आगमन र व्यापारिक साझेदारीमा प्रगति हुनेछ। बोलीमा मधुरता राख्नुहोला।", advice: "सेतो वस्तु दान गर्नुहोस्।" },
    { ne: "मिथुन (Gemini)", luck: "९०%", prediction: "अधुरा काम बन्नेछन्, बौद्धिक क्षेत्रमा सफलता मिल्नेछ। यात्राको योग बन्नेछ।", advice: "गायलाई हरियो घाँस दिनुहोस्।" },
    { ne: "कर्कट (Cancer)", luck: "७२%", prediction: "पारिवारिक जिम्मेवारी बढ्नेछ। स्वास्थ्यमा सामान्य ध्यान दिनु आवश्यक छ।", advice: "शिवजीको पूजा गर्नुहोस्।" },
    { ne: "सिंह (Leo)", luck: "९२%", prediction: "मान-प्रतिष्ठा र पदोन्नतिको शुभ योग छ। महत्वपूर्ण निर्णय लिन उपयुक्त समय।", advice: "रातो फूल चढाउनुहोस्।" },
    { ne: "कन्या (Virgo)", luck: "८८%", prediction: "आर्थिक स्थिरता र पराक्रममा वृद्धि। रोकिएका कामहरू द्रुत गतिमा अघि बढ्नेछन्।", advice: "विष्णु सहस्रनाम पाठ गर्नुहोस्।" },
    { ne: "तुला (Libra)", luck: "८०%", prediction: "प्रेम सम्बन्ध सुदृढ हुनेछ र कला, सिर्जनात्मक कार्यमा सफलता प्राप्त हुनेछ।", advice: "लक्ष्मीजीको स्तोत्र पढ्नुहोस्।" },
    { ne: "वृश्चिक (Scorpio)", luck: "७६%", prediction: "सावधानीपूर्वक गरिएको लगानीबाट भविष्यमा राम्रो प्रतिफल प्राप्त हुनेछ।", advice: "हनुमान चालिसा पाठ गर्नुहोस्।" },
    { ne: "धनु (Sagittarius)", luck: "८४%", prediction: "गुरुको कृपाले आध्यात्मिक प्रगति र विद्या क्षेत्रमा विशेष उपलब्धि मिल्नेछ।", advice: "पहेलो चन्दन लगाउनुहोस्।" },
    { ne: "मकर (Capricorn)", luck: "७५%", prediction: "कर्मक्षेत्रमा निरन्तर मिहिनेतले उच्च प्रशंसा पाउनेछ। धैर्य कायम राख्नुहोस्।", advice: "शनिदेवलाई तिलको तेल चढाउनुहोस्।" },
    { ne: "कुम्भ (Aquarius)", luck: "८२%", prediction: "नयाँ मित्रको साथ र सामाजिक सम्मान प्राप्त हुनेछ। आयका नयाँ स्रोत खुल्नेछन्।", advice: "असाहयलाई भोजन गराउनुहोस्।" },
    { ne: "मीन (Pisces)", luck: "८९%", prediction: "शुभ समाचार सुन्न पाइनेछ। वैदेशिक कार्य र दीर्घकालीन योजना सफल हुनेछ।", advice: "केसरको तिलक लगाउनुहोस्।" },
  ];

  return (
    <section className="relative w-full bg-[#FAF7F2] text-[#2B231D] pt-4 pb-12 border-b border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP DATE BANNER & QUICK TOOLS (Exact HamroPatro Layout)              */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#EADFCF] rounded-2xl p-4 sm:p-5 shadow-sm mb-6 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Left: Prominent Live Nepali Date */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isNe ? "आजको पञ्चाङ्ग" : "Today's Panchanga"}
                </span>
                <span className="text-xs sm:text-sm text-stone-500 font-medium">
                  {isNe ? "नेपाल संवत् ११४६ अनलागा पञ्च" : "Nepal Samvat 1146 Analaga Pancha"}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#B34A26] tracking-tight">
                  {isNe ? "११ असोज २०८३, आइतवार" : "11 Ashwin 2083, Sunday"}
                </h1>
                <span className="text-base sm:text-lg font-medium text-stone-600">
                  / Sep 27, 2026
                </span>
                <span className="text-sm font-medium text-[#C5994E] hidden sm:inline">
                  • {isNe ? "असोज कृष्ण प्रतिपदा" : "Ashwin Krishna Pratipada"}
                </span>
              </div>
            </div>

            {/* Right: Quick Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                onClick={() => setActiveTool(activeTool === "converter" ? null : "converter")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeTool === "converter"
                    ? "bg-[#B34A26] text-white border-[#B34A26] shadow-sm"
                    : "bg-[#FAF7F2] text-stone-700 border-[#EADFCF] hover:bg-white hover:border-[#B34A26]"
                }`}
              >
                <CalendarIcon className="w-4 h-4 text-[#B34A26]" />
                <span>{isNe ? "मिति परिवर्तन" : "Date Converter"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "rashifal" ? null : "rashifal")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeTool === "rashifal"
                    ? "bg-[#B34A26] text-white border-[#B34A26] shadow-sm"
                    : "bg-[#FAF7F2] text-stone-700 border-[#EADFCF] hover:bg-white hover:border-[#B34A26]"
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C5994E]" />
                <span>{isNe ? "राशिफल" : "Horoscope"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "bullion" ? null : "bullion")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeTool === "bullion"
                    ? "bg-[#B34A26] text-white border-[#B34A26] shadow-sm"
                    : "bg-[#FAF7F2] text-stone-700 border-[#EADFCF] hover:bg-white hover:border-[#B34A26]"
                }`}
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>{isNe ? "मूल्य सूची" : "Bullion Rates"}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "forex" ? null : "forex")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  activeTool === "forex"
                    ? "bg-[#B34A26] text-white border-[#B34A26] shadow-sm"
                    : "bg-[#FAF7F2] text-stone-700 border-[#EADFCF] hover:bg-white hover:border-[#B34A26]"
                }`}
              >
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>{isNe ? "विनिमय दर" : "Forex Rate"}</span>
              </button>
            </div>
          </div>

          {/* Sub-strip: Today's Festival Alert Banner */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-stone-800">
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold text-xs uppercase tracking-wider border border-red-200">
                {isNe ? "पर्व / दिवस" : "Festival / Day"}
              </span>
              <span className="font-semibold text-[#B34A26]">
                {isNe
                  ? "सोह्रश्राद्ध प्रारम्भ (प्रतिपदा श्राद्ध) / विश्व पर्यटन दिवस"
                  : "Sohrashraddha Pratipada / World Tourism Day"}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
              <span className="inline-flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                {isNe ? "सूर्योदय: ०६:०१" : "Sunrise: 06:01 AM"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                {isNe ? "सूर्यास्त: १७:५८" : "Sunset: 05:58 PM"}
              </span>
              <span className="inline-flex items-center gap-1 hidden md:inline-flex">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {isNe ? "काठमाडौँ, नेपाल" : "Kathmandu, Nepal"}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* QUICK TOOL POPOVERS (Date Converter, Horoscope, Bullion, Forex)           */}
        {/* ========================================================================= */}
        {activeTool && (
          <div className="mb-6 bg-white border-2 border-[#B34A26]/30 rounded-2xl p-5 shadow-lg relative animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tool 1: Date Converter */}
            {activeTool === "converter" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="w-5 h-5 text-[#B34A26]" />
                  <h3 className="font-bold text-base text-stone-900">
                    {isNe ? "नेपाली मिति रूपान्तरण (B.S. ↔ A.D.)" : "Nepali Date Converter (B.S. ↔ A.D.)"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      {isNe ? "वर्ष (B.S.)" : "Year (B.S.)"}
                    </label>
                    <select
                      value={convBsYear}
                      onChange={(e) => setConvBsYear(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B34A26]"
                    >
                      <option value="2083">२०८३ (2026)</option>
                      <option value="2082">२०८२ (2025)</option>
                      <option value="2081">२०८१ (2024)</option>
                      <option value="2080">२०८० (2023)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      {isNe ? "महिना" : "Month"}
                    </label>
                    <select
                      value={convBsMonth}
                      onChange={(e) => setConvBsMonth(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B34A26]"
                    >
                      {MONTH_NAMES_BS.map((m, idx) => (
                        <option key={idx} value={idx + 1}>
                          {isNe ? m.ne : m.en} ({m.span})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      {isNe ? "गते (दिन)" : "Day (Gate)"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={convBsDay}
                      onChange={(e) => setConvBsDay(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B34A26]"
                    />
                  </div>

                  <button
                    onClick={handleConvert}
                    className="w-full py-2 bg-[#B34A26] hover:bg-[#963B1C] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    {isNe ? "परिवर्तन गर्नुहोस्" : "Convert Date"}
                  </button>
                </div>

                <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-900">
                    {isNe ? "नतिजा (अंग्रेजी मिति):" : "Converted Result (A.D.):"}
                  </span>
                  <span className="text-sm font-bold text-[#B34A26]">{convertedResult}</span>
                </div>
              </div>
            )}

            {/* Tool 2: Rashifal (Daily Horoscope) */}
            {activeTool === "rashifal" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#C5994E]" />
                  <h3 className="font-bold text-base text-stone-900">
                    {isNe ? "आजको दैनिक राशिफल (१२ राशि)" : "Today's Daily Horoscope (12 Signs)"}
                  </h3>
                </div>
                
                {/* 12 Rashi Tabs */}
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 mb-4">
                  {RASHIS.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRashi(i)}
                      className={`px-2 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                        selectedRashi === i
                          ? "bg-[#B34A26] text-white shadow-sm"
                          : "bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200"
                      }`}
                    >
                      {r.ne.split(" ")[0]}
                    </button>
                  ))}
                </div>

                {/* Selected Rashi Detail Card */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADFCF] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#B34A26]">{RASHIS[selectedRashi].ne}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {isNe ? `भाग्यशाली प्रतिशत: ${RASHIS[selectedRashi].luck}` : `Luck Factor: ${RASHIS[selectedRashi].luck}`}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                      {RASHIS[selectedRashi].prediction}
                    </p>
                    <p className="mt-1 text-xs text-stone-500 font-medium">
                      💡 {isNe ? `आजको उपाय: ${RASHIS[selectedRashi].advice}` : `Remedy: ${RASHIS[selectedRashi].advice}`}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenInquiry(`राशिफल तथा कुण्डली परामर्श: ${RASHIS[selectedRashi].ne}`)}
                    className="shrink-0 px-4 py-2 bg-[#B34A26] text-white text-xs font-semibold rounded-lg hover:bg-[#963B1C] transition-colors"
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
                  <Coins className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-base text-stone-900">
                    {isNe ? "नेपाल सुनचाँदी व्यवसायी महासंघ मूल्य सूची" : "Federation of Nepal Gold & Silver Rates"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                    <span className="text-xs text-stone-600 font-medium">{isNe ? "छापावाल सुन (प्रति तोला)" : "Fine Gold (Per Tola)"}</span>
                    <div className="text-lg font-extrabold text-amber-900 mt-0.5">रु १,५२,३००</div>
                    <span className="text-[11px] text-emerald-600 font-semibold">▲ रु ५०० वृद्धि</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                    <span className="text-xs text-stone-600 font-medium">{isNe ? "तेजाबी सुन (प्रति तोला)" : "Tejabi Gold (Per Tola)"}</span>
                    <div className="text-lg font-extrabold text-amber-900 mt-0.5">रु १,५१,६००</div>
                    <span className="text-[11px] text-emerald-600 font-semibold">▲ रु ५०० वृद्धि</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-100/70 border border-stone-200">
                    <span className="text-xs text-stone-600 font-medium">{isNe ? "चाँदी (प्रति तोला)" : "Silver (Per Tola)"}</span>
                    <div className="text-lg font-extrabold text-stone-800 mt-0.5">रु १,८५०</div>
                    <span className="text-[11px] text-stone-500 font-semibold">स्थिर (No Change)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tool 4: Forex Rates */}
            {activeTool === "forex" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-base text-stone-900">
                    {isNe ? "नेपाल राष्ट्र बैंक विदेशी विनिमय दर" : "Nepal Rastra Bank Foreign Exchange Rates"}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                    <div className="font-bold text-blue-900">USD $ 1</div>
                    <div className="text-stone-600 mt-0.5">खरिद: रु १३३.४०</div>
                    <div className="text-blue-700 font-bold">बिक्री: रु १३४.००</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                    <div className="font-bold text-blue-900">EUR € 1</div>
                    <div className="text-stone-600 mt-0.5">खरिद: रु १४८.२०</div>
                    <div className="text-blue-700 font-bold">बिक्री: रु १४८.८५</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                    <div className="font-bold text-blue-900">GBP £ 1</div>
                    <div className="text-stone-600 mt-0.5">खरिद: रु १७७.१०</div>
                    <div className="text-blue-700 font-bold">बिक्री: रु १७७.९०</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                    <div className="font-bold text-blue-900">AUD A$ 1</div>
                    <div className="text-stone-600 mt-0.5">खरिद: रु ९१.१०</div>
                    <div className="text-blue-700 font-bold">बिक्री: रु ९१.५५</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MAIN CALENDAR GRID & RIGHT SIDEBAR SPLIT                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT 8 COLS: 7-COLUMN MONTHLY CALENDAR GRID                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 bg-white border border-[#EADFCF] rounded-2xl shadow-sm overflow-hidden">
            
            {/* Calendar Controls Bar */}
            <div className="p-4 sm:p-5 border-b border-[#EADFCF] bg-gradient-to-r from-white via-[#FAF7F2] to-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedMonth((m) => (m === 1 ? 12 : m - 1))}
                  className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-[#B34A26] text-stone-700 transition-all"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {isNe ? calendarData.monthName : calendarData.monthNameEn} {isNe ? "२०८३" : "2083"}
                  </h2>
                  <span className="text-xs sm:text-sm font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {calendarData.adMonthsSpan} 2026
                  </span>
                </div>

                <button
                  onClick={() => setSelectedMonth((m) => (m === 12 ? 1 : m + 1))}
                  className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-[#B34A26] text-stone-700 transition-all"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMonth(6)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedMonth === 6
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {isNe ? "आज (Today)" : "Today"}
                </button>

                {/* Dropdown for Month Selection */}
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#B34A26]"
                >
                  {MONTH_NAMES_BS.map((m, i) => (
                    <option key={i} value={i + 1}>
                      {isNe ? m.ne : m.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weekday Column Headers (Sun to Sat) */}
            <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50/70 text-center text-xs font-bold py-2.5">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center ${
                    idx === 0 || idx === 6 ? "text-red-600" : "text-stone-700"
                  }`}
                >
                  <span className="sm:hidden">{isNe ? wd.shortNe : wd.shortEn}</span>
                  <span className="hidden sm:inline">{isNe ? wd.ne : wd.en}</span>
                </div>
              ))}
            </div>

            {/* 7-Column Calendar Grid Cells */}
            <div className="grid grid-cols-7 divide-x divide-y divide-stone-200 bg-stone-100">
              {calendarData.days.map((day, idx) => {
                const isSelected =
                  selectedDay.bsDay === day.bsDay && selectedDay.isCurrentMonth === day.isCurrentMonth;
                const isSat = day.dayOfWeek === 6;
                const isSun = day.dayOfWeek === 0;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`relative min-h-[92px] sm:min-h-[115px] p-1.5 sm:p-2.5 text-left flex flex-col justify-between transition-all focus:outline-none ${
                      // Today cell styling matching HamroPatro
                      day.isToday
                        ? "bg-emerald-600 text-white font-bold shadow-md z-10 hover:bg-emerald-700"
                        : isSelected
                        ? "bg-amber-50/90 ring-2 ring-[#B34A26] z-10"
                        : day.isCurrentMonth
                        ? day.isHoliday || isSat
                          ? "bg-red-50/30 hover:bg-red-50/60 text-stone-900"
                          : "bg-white hover:bg-stone-50/90 text-stone-900"
                        : "bg-stone-100/70 text-stone-400 opacity-60 hover:opacity-80"
                    }`}
                  >
                    {/* Top Row: English Day (top-right) & Indicator */}
                    <div className="flex items-start justify-between w-full">
                      {/* Holiday / Event dot */}
                      {day.isHoliday && day.isCurrentMonth && !day.isToday ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="Holiday" />
                      ) : (
                        <span />
                      )}
                      
                      {/* English AD Day */}
                      <span
                        className={`text-[10px] sm:text-xs font-semibold tabular-nums ${
                          day.isToday
                            ? "text-emerald-100"
                            : isSat || isSun || day.isHoliday
                            ? "text-red-500"
                            : "text-stone-400"
                        }`}
                      >
                        {day.adDay}
                      </span>
                    </div>

                    {/* Middle: Prominent Nepali Day Numeral */}
                    <div className="my-0.5 text-center">
                      <span
                        className={`text-xl sm:text-3xl font-black block leading-tight ${
                          day.isToday
                            ? "text-white"
                            : isSat || day.isHoliday
                            ? "text-red-600"
                            : "text-stone-800"
                        }`}
                      >
                        {isNe ? day.bsDayNepali : day.bsDay}
                      </span>

                      {/* Event / Festival Tag Snippet */}
                      {day.event && day.isCurrentMonth && (
                        <span
                          className={`block text-[9px] sm:text-[10.5px] font-semibold leading-tight line-clamp-1 mt-1 px-1 py-0.5 rounded ${
                            day.isToday
                              ? "bg-white/20 text-white"
                              : day.isHoliday
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100/70 text-amber-900"
                          }`}
                          title={isNe ? day.event : day.eventEn || day.event}
                        >
                          {isNe ? day.event : day.eventEn || day.event}
                        </span>
                      )}
                    </div>

                    {/* Bottom: Tithi Name */}
                    <div className="w-full text-center">
                      <span
                        className={`block text-[9px] sm:text-[10.5px] font-medium tracking-tight truncate ${
                          day.isToday
                            ? "text-emerald-100"
                            : "text-stone-500"
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
            <div className="p-3 bg-stone-50/80 border-t border-stone-200 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span>{isNe ? "आजको दिन" : "Today"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />
                  <span className="text-red-700 font-medium">{isNe ? "सार्वजनिक बिदा / शनि" : "Holiday / Saturday"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" />
                  <span className="text-amber-800 font-medium">{isNe ? "पर्व / उत्सव" : "Festival"}</span>
                </span>
              </div>

              <div className="text-stone-400 text-[11px]">
                {isNe ? "हाम्रोपात्रो ढाँचामा आधारित प्रामाणिक पञ्चाङ्ग" : "Authentic Panchanga in HamroPatro Format"}
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT 4 COLS: DETAILED PANCHANGA, FESTIVAL TABS & CONSULTATION CTA      */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Selected Day Panchanga Card */}
            <div className="bg-white border border-[#EADFCF] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B34A26]" />
                  <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                    {isNe ? "छानिएको दिनको पञ्चाङ्ग" : "Selected Day Panchanga"}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {selectedDay.isToday ? (isNe ? "आज (Today)" : "Today") : `${selectedDay.adMonth} ${selectedDay.adDay}`}
                </span>
              </div>

              {/* Date & Day Banner */}
              <div className="mt-3.5">
                <div className="text-2xl font-black text-[#B34A26]">
                  {isNe ? `${selectedDay.bsDayNepali} ${calendarData.monthName} २०८३` : `${selectedDay.bsDay} ${calendarData.monthNameEn} 2083`}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">
                  {WEEKDAYS[selectedDay.dayOfWeek][isNe ? "ne" : "en"]} • {selectedDay.adMonth} {selectedDay.adDay}, {selectedDay.adYear}
                </div>
              </div>

              {/* Event alert if present */}
              {selectedDay.event && (
                <div className="mt-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{isNe ? selectedDay.event : selectedDay.eventEn || selectedDay.event}</span>
                </div>
              )}

              {/* Panchanga Specifics Matrix */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "तिथि" : "Tithi"}</span>
                  <span className="font-bold text-stone-800">{isNe ? selectedDay.tithi : selectedDay.tithiEn}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "नक्षत्र" : "Nakshatra"}</span>
                  <span className="font-bold text-stone-800">{selectedDay.nakshatra}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "योग" : "Yoga"}</span>
                  <span className="font-bold text-stone-800">{selectedDay.yoga}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "चन्द्र राशि" : "Moon Sign"}</span>
                  <span className="font-bold text-stone-800">{selectedDay.moonSign}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "सूर्योदय" : "Sunrise"}</span>
                  <span className="font-bold text-stone-800">{selectedDay.sunrise}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-stone-500 font-medium block">{isNe ? "सूर्यास्त" : "Sunset"}</span>
                  <span className="font-bold text-stone-800">{selectedDay.sunset}</span>
                </div>
              </div>

              {/* Muhurta info if any */}
              {selectedDay.muhurta && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <span className="font-bold block">{isNe ? "शुभ साइत / चौघडिया:" : "Auspicious Muhurta:"}</span>
                  <span>{selectedDay.muhurta}</span>
                </div>
              )}

              {/* Direct Booking CTA */}
              <button
                onClick={() =>
                  onOpenInquiry(
                    `साइत तथा पञ्चाङ्ग परामर्श: ${selectedDay.bsDayNepali} ${calendarData.monthName} (${isNe ? selectedDay.tithi : selectedDay.tithiEn})`
                  )
                }
                className="mt-4 w-full py-2.5 bg-[#B34A26] hover:bg-[#963B1C] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>{isNe ? "यस दिनको विशेष साइत परामर्श लिनुहोस्" : "Book Muhurta Consultation for this Day"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Tabs: पर्वहरू / साइतहरू / आगामी बिदा */}
            <div className="bg-white border border-[#EADFCF] rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b border-stone-200 bg-stone-50">
                <button
                  onClick={() => setSidebarTab("festivals")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "festivals"
                      ? "border-[#B34A26] text-[#B34A26] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {isNe ? "पर्वहरू" : "Festivals"}
                </button>

                <button
                  onClick={() => setSidebarTab("muhurta")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "muhurta"
                      ? "border-[#B34A26] text-[#B34A26] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {isNe ? "साइतहरू" : "Muhurtas"}
                </button>

                <button
                  onClick={() => setSidebarTab("holidays")}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${
                    sidebarTab === "holidays"
                      ? "border-[#B34A26] text-[#B34A26] bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {isNe ? "आगामी बिदा" : "Holidays"}
                </button>
              </div>

              {/* Tab 1: Festivals List */}
              {sidebarTab === "festivals" && (
                <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
                  {Object.entries(ASHWIN_EVENTS)
                    .filter(([day]) => [1, 3, 9, 10, 11, 26, 31].includes(parseInt(day, 10)))
                    .map(([day, ev]) => (
                      <div
                        key={day}
                        onClick={() => {
                          const target = calendarData.days.find(
                            (d) => d.bsDay === parseInt(day, 10) && d.isCurrentMonth
                          );
                          if (target) setSelectedDay(target);
                        }}
                        className="p-2.5 rounded-xl border border-stone-200/80 hover:border-[#B34A26] hover:bg-[#FAF7F2] transition-all cursor-pointer flex items-start gap-3"
                      >
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-stone-100 flex flex-col items-center justify-center border border-stone-200">
                          <span className="text-[10px] text-stone-500 leading-none">{isNe ? "असोज" : "Ash"}</span>
                          <span className="text-xs font-bold text-[#B34A26] leading-none mt-0.5">
                            {isNe ? toNepaliNum(parseInt(day, 10)) : day}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 line-clamp-1">
                            {isNe ? ev.event : ev.eventEn}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {ev.isHoliday ? (
                              <span className="text-red-600 font-semibold">{isNe ? "सार्वजनिक बिदा" : "Public Holiday"}</span>
                            ) : (
                              <span>{isNe ? "धार्मिक / सांस्कृतिक पर्व" : "Cultural Festival"}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Tab 2: Muhurtas List */}
              {sidebarTab === "muhurta" && (
                <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADFCF]">
                    <div className="font-bold text-[#B34A26] flex items-center justify-between">
                      <span>{isNe ? "गृहप्रवेश साइत" : "Griha Pravesh Muhurta"}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {isNe ? "उत्तम" : "Excellent"}
                      </span>
                    </div>
                    <div className="text-stone-700 mt-1">
                      {isNe ? "असोज ११ गते (सोह्रश्राद्ध प्रारम्भ पूर्व अमृत वेला)" : "Ashwin 11 (Amrit Bela morning window)"}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">समय: बिहान ०७:३० देखि ०९:१५ सम्म</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADFCF]">
                    <div className="font-bold text-[#B34A26] flex items-center justify-between">
                      <span>{isNe ? "घटस्थापना शुभ साइत" : "Ghatasthapana Muhurta"}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                        {isNe ? "महापर्व" : "Grand"}
                      </span>
                    </div>
                    <div className="text-stone-700 mt-1">
                      {isNe ? "असोज २६ गते, आइतवार (नवरात्र आरम्भ)" : "Ashwin 26, Sunday (Navaratri begins)"}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">साइत: बिहान ०८:२५ बजे उत्तम योग</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADFCF]">
                    <div className="font-bold text-[#B34A26] flex items-center justify-between">
                      <span>{isNe ? "सवारी साधन खरिद साइत" : "Vehicle Purchase Muhurta"}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {isNe ? "शुभ" : "Auspicious"}
                      </span>
                    </div>
                    <div className="text-stone-700 mt-1">
                      {isNe ? "असोज ३१ गते (फूलपाती दिन)" : "Ashwin 31 (Fulpati day)"}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">समय: दिउँसो ११:४० देखि ०१:१५ सम्म</div>
                  </div>
                </div>
              )}

              {/* Tab 3: Upcoming Holidays List */}
              {sidebarTab === "holidays" && (
                <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto text-xs">
                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900">{isNe ? "संविधान दिवस" : "Constitution Day"}</span>
                      <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded bg-white">
                        {isNe ? "असोज ३" : "Ashwin 3"}
                      </span>
                    </div>
                    <div className="text-stone-600 text-[11px] mt-1">
                      {isNe ? "राष्ट्रिय दिवस • देशभर सार्वजनिक बिदा" : "National Holiday • Nepal Nationwide"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900">{isNe ? "इन्द्रजात्रा" : "Indra Jatra"}</span>
                      <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded bg-white">
                        {isNe ? "असोज ९" : "Ashwin 9"}
                      </span>
                    </div>
                    <div className="text-stone-600 text-[11px] mt-1">
                      {isNe ? "काठमाडौं उपत्यकामा सार्वजनिक बिदा" : "Public Holiday in Kathmandu Valley"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900">{isNe ? "घटस्थापना (दशैं बिदा)" : "Ghatasthapana (Dashain)"}</span>
                      <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded bg-white">
                        {isNe ? "असोज २६" : "Ashwin 26"}
                      </span>
                    </div>
                    <div className="text-stone-600 text-[11px] mt-1">
                      {isNe ? "नवरात्र आरम्भ • सार्वजनिक बिदा" : "Navaratri Begins • Public Holiday"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-900">{isNe ? "फूलपाती / वडा दशैं" : "Fulpati / Bada Dashain"}</span>
                      <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded bg-white">
                        {isNe ? "असोज ३१" : "Ashwin 31"}
                      </span>
                    </div>
                    <div className="text-stone-600 text-[11px] mt-1">
                      {isNe ? "दशैं सार्वजनिक बिदा सुरु" : "Dashain Official Holidays begin"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guru Neel Hari Authority Card */}
            <div className="bg-gradient-to-br from-[#2B231D] to-[#1C1612] text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B34A26] flex items-center justify-center font-bold text-sm border-2 border-[#C5994E]">
                  गुरू
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-100">
                    {isNe ? "ज्योतिषाचार्य गुरु नील हरि" : "Jyotishacharya Guru Neel Hari"}
                  </h4>
                  <p className="text-[11px] text-[#C5994E] font-medium">
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
                className="mt-3.5 w-full py-2 bg-[#C5994E] hover:bg-[#b0853f] text-[#2B231D] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{isNe ? "प्रत्यक्ष परामर्श बुक गर्नुहोस्" : "Book Direct Consultation"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
