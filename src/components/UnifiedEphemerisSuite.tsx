"use client";

import React, { useState, useMemo } from "react";
import {
  evaluatePanchanga,
  PanchangaResult,
  toNepaliNumber,
} from "@/utils/astronomy";
import {
  Calendar,
  Compass,
  Sparkles,
  Clock,
  ArrowRight,
  Share2,
  RefreshCw,
  PhoneCall,
  Grid,
  Table,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UnifiedEphemerisProps {
  onOpenInquiry: (subject?: string) => void;
}

const PRESET_LOCATIONS = [
  { name: "काठमाडौँ (Kathmandu)", lat: 27.7172, lng: 85.324 },
  { name: "पोखरा (Pokhara)", lat: 28.2096, lng: 83.9856 },
  { name: "विराटनगर (Biratnagar)", lat: 26.4525, lng: 87.2718 },
  { name: "बुटवल (Butwal)", lat: 27.7006, lng: 83.4483 },
  { name: "चितवन (Chitwan)", lat: 27.5291, lng: 84.3542 },
  { name: "लन्डन (London, UK)", lat: 51.5074, lng: -0.1278 },
  { name: "न्युयोर्क (New York, USA)", lat: 40.7128, lng: -74.006 },
  { name: "सिड्नी (Sydney, Australia)", lat: -33.8688, lng: 151.2093 },
];

export default function UnifiedEphemerisSuite({ onOpenInquiry }: UnifiedEphemerisProps) {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  });
  const [latitude, setLatitude] = useState<number>(27.7172);
  const [longitude, setLongitude] = useState<number>(85.324);
  const [showInputDrawer, setShowInputDrawer] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const handleResetToNow = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    setSelectedDate(`${y}-${m}-${d}`);
    setSelectedTime(`${h}:${min}`);
    setLatitude(27.7172);
    setLongitude(85.324);
  };

  // Compute live result
  const result: PanchangaResult = useMemo(() => {
    try {
      const [year, month, day] = selectedDate.split("-").map(Number);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
      return evaluatePanchanga(dateObj, latitude, longitude);
    } catch {
      return evaluatePanchanga(new Date(), 27.7172, 85.324);
    }
  }, [selectedDate, selectedTime, latitude, longitude]);

  const handleCopySummary = () => {
    const text =
      language === "ne"
        ? `नील हरि वैदिक ज्योतिष केन्द्र - कुण्डली तथा पञ्चाङ्ग विवरण:
नेपाली मिति: ${result.bikramSambat.formattedNepali} (${result.bikramSambat.formatted})
अंग्रेजी मिति: ${result.gregorianDate}
जन्म लग्न: ${result.ascendant.sanskritSign} (${result.ascendant.degreeInSign}°)
सूर्य राशि: ${result.solarSign.sanskrit} (${result.solarSign.degree}°)
चन्द्र राशि: ${result.lunarSign.sanskrit} (${result.lunarSign.degree}°)
नक्षत्र: ${result.nakshatra.name} (चरण ${result.nakshatra.pada}, स्वामी: ${result.nakshatra.ruler})
तिथि: ${result.tithi.sanskritName}
योग: ${result.yoga.name}
करण: ${result.karana.name}`
        : `Neel Hari Vedic Jyotish Kendra - Natal & Ephemeris Summary:
Bikram Sambat: ${result.bikramSambat.formatted}
Gregorian Date: ${result.gregorianDate}
Ascendant (Lagna): ${result.ascendant.sanskritSign} (${result.ascendant.degreeInSign}°)
Solar Sign: ${result.solarSign.sanskrit} (${result.solarSign.degree}°)
Lunar Sign: ${result.lunarSign.sanskrit} (${result.lunarSign.degree}°)
Nakshatra: ${result.nakshatra.name} (Pada ${result.nakshatra.pada}, Ruler: ${result.nakshatra.ruler})
Tithi: ${result.tithi.sanskritName}
Yoga: ${result.yoga.name}
Karana: ${result.karana.name}`;

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  // Group planets by house for the Vedic chart
  const planetsByHouse = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (let i = 1; i <= 12; i++) map[i] = [];
    result.planets.forEach((p) => {
      if (map[p.house]) {
        map[p.house].push(`${p.symbol} ${language === "ne" ? p.sanskrit : p.name}`);
      }
    });
    return map;
  }, [result.planets, language]);

  return (
    <section id="kundali" className="w-full py-16 md:py-24 border-b border-border bg-white scroll-mt-20">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Section matching user reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Description & Action */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C85A17] uppercase font-bold mb-3">
              <span className="text-[#D97706]">—</span>
              <span>{t.calculator.badge}</span>
              <span className="text-[#D97706]">—</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#181411] font-bold tracking-tight leading-tight">
              {t.calculator.title}
            </h2>

            <p className="mt-4 text-sm text-textBody leading-relaxed font-light">
              {t.calculator.desc}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowInputDrawer(!showInputDrawer)}
                className="px-6 py-3 rounded-none bg-[#C85A17] text-white text-xs lg:text-sm font-bold hover:bg-[#A6440C] transition-all duration-200 flex items-center gap-2 shadow-sm border border-[#C85A17]"
              >
                <span>
                  {showInputDrawer
                    ? language === "ne"
                      ? "विवरण बन्द गर्नुहोस्"
                      : "Close Input Form"
                    : language === "ne"
                    ? "गणना गर्नुहोस्"
                    : "Enter Coordinates"}
                </span>
                <ArrowRight className="w-4 h-4 text-orange-200" />
              </button>

              <button
                onClick={handleCopySummary}
                className="px-4 py-3 rounded-none border border-stone-300 bg-stone-50 text-[#181411] hover:text-[#C85A17] hover:border-[#C85A17] text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>
                  {copiedNotice
                    ? language === "ne"
                      ? "कपी भयो!"
                      : "Copied!"
                    : language === "ne"
                    ? "कपी गर्नुहोस्"
                    : "Copy Summary"}
                </span>
              </button>
            </div>
          </div>

          {/* Center Column: Traditional North-Indian Diamond Kundali Chart */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[340px] aspect-square bg-[#FDFBF7] border border-stone-200/80 rounded-none p-3 shadow-2xs relative hover:border-[#C85A17]/60 transition-all duration-300">
              <div className="absolute inset-3 pointer-events-none">
                <svg className="w-full h-full stroke-gold/60 stroke-[1.2]">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                  <polygon
                    points="50%,0% 100%,50% 50%,100% 0%,50%"
                    fill="#FBF7EE"
                    className="stroke-terracotta/60 stroke-[1.5]"
                  />
                </svg>
              </div>

              {/* House 1: Lagna */}
              <div className="absolute top-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[11px] text-terracotta font-bold">
                  {language === "ne" ? "१ (लग्न)" : "1 (Asc)"}
                </span>
                <span className="font-serif text-[11px] font-bold text-navy">
                  {result.ascendant.sanskritSign}
                </span>
                <div className="text-[9px] font-mono text-gold font-medium">
                  {planetsByHouse[1]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 2 */}
              <div className="absolute top-[4%] left-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">२</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[2]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 3 */}
              <div className="absolute top-[16%] left-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">३</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[3]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 4 */}
              <div className="absolute top-[38%] left-[15%] w-[25%] h-[25%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-terracotta font-bold">
                  {language === "ne" ? "४ सुख" : "4 Sukha"}
                </span>
                <div className="text-[8px] font-mono text-gold font-medium">
                  {planetsByHouse[4]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 5 */}
              <div className="absolute bottom-[16%] left-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">५</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[5]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 6 */}
              <div className="absolute bottom-[4%] left-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">६</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[6]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 7: Vivaha */}
              <div className="absolute bottom-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[11px] text-terracotta font-bold">
                  {language === "ne" ? "७ विवाह" : "7 Spouse"}
                </span>
                <div className="text-[9px] font-mono text-gold font-medium">
                  {planetsByHouse[7]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 8 */}
              <div className="absolute bottom-[4%] right-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">८</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[8]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 9 */}
              <div className="absolute bottom-[16%] right-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">९</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[9]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 10 */}
              <div className="absolute top-[38%] right-[15%] w-[25%] h-[25%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-terracotta font-bold">
                  {language === "ne" ? "१० कर्म" : "10 Karma"}
                </span>
                <div className="text-[8px] font-mono text-gold font-medium">
                  {planetsByHouse[10]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 11 */}
              <div className="absolute top-[16%] right-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">११</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[11]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 12 */}
              <div className="absolute top-[4%] right-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">१२</span>
                <div className="text-[8px] font-mono text-navy font-medium">
                  {planetsByHouse[12]?.join(" ") || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Items */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="p-3.5 rounded-none border border-stone-200/70 bg-white flex items-center gap-3.5 hover:border-[#C85A17]/70 hover:translate-x-1 transition-all duration-200 shadow-2xs group">
              <div className="w-10 h-10 rounded-none border border-orange-200/60 bg-orange-50 flex items-center justify-center text-[#C85A17] shrink-0 group-hover:bg-[#C85A17] group-hover:text-white transition-colors duration-200">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#181411]">
                  {language === "ne" ? "जन्म कुण्डली निर्माण" : "Natal Cartography"}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === "ne" ? "सूक्ष्म लग्न तथा षोडशवर्ग गणना" : "Ascendant & 16 Varga Matrices"}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-none border border-stone-200/70 bg-white flex items-center gap-3.5 hover:border-[#C85A17]/70 hover:translate-x-1 transition-all duration-200 shadow-2xs group">
              <div className="w-10 h-10 rounded-none border border-orange-200/60 bg-orange-50 flex items-center justify-center text-[#C85A17] shrink-0 group-hover:bg-[#C85A17] group-hover:text-white transition-colors duration-200">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#181411]">
                  {language === "ne" ? "दैनिक पञ्चाङ्ग गणना" : "Ephemeris & Panchanga"}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === "ne" ? "तिथि, नक्षत्र, योग र करण" : "Tithi, Nakshatra, Yoga & Karana"}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-none border border-stone-200/70 bg-white flex items-center gap-3.5 hover:border-[#C85A17]/70 hover:translate-x-1 transition-all duration-200 shadow-2xs group">
              <div className="w-10 h-10 rounded-none border border-orange-200/60 bg-orange-50 flex items-center justify-center text-[#C85A17] shrink-0 group-hover:bg-[#C85A17] group-hover:text-white transition-colors duration-200">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#181411]">
                  {language === "ne" ? "शुभ मुहूर्त निर्धारण" : "Muhurta & Electional Timing"}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === "ne" ? "विवाह, व्यापार र गृह प्रवेश साइत" : "Weddings, Commercial & Groundbreaking"}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-none border border-stone-200/70 bg-white flex items-center gap-3.5 hover:border-[#C85A17]/70 hover:translate-x-1 transition-all duration-200 shadow-2xs group">
              <div className="w-10 h-10 rounded-none border border-orange-200/60 bg-orange-50 flex items-center justify-center text-[#C85A17] shrink-0 group-hover:bg-[#C85A17] group-hover:text-white transition-colors duration-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#181411]">
                  {language === "ne" ? "ग्रह दशा विश्लेषण" : "Dasha Trajectory"}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === "ne" ? "विंशोत्तरी महादशा र गोचर फल" : "Vimshottari Dasha & Transit Forecasts"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Clean Form Drawer for Instant Recalculation */}
        {showInputDrawer && (
          <div className="mt-8 p-6 rounded-none border border-[#C85A17]/70 bg-white shadow-xs animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="font-serif text-base font-bold text-[#181411]">
                  {t.calculator.formTitle}
                </span>
                <button
                  type="button"
                  onClick={handleResetToNow}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold text-[#C85A17] bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors rounded-none"
                >
                  ⚡ {language === "ne" ? "अहिलेको लाइभ समय" : "Reset to Live Now"}
                </button>
              </div>
              <button
                onClick={() => setShowInputDrawer(false)}
                className="text-xs font-mono text-stone-500 hover:text-[#C85A17]"
              >
                ✕ {language === "ne" ? "बन्द गर्नुहोस्" : "Close"}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1.5 font-bold">
                  {t.calculator.dateLabel}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-none border border-stone-300 bg-white text-[#181411] font-mono text-xs focus:outline-none focus:border-[#C85A17]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1.5 font-bold">
                  {t.calculator.timeLabel}
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-none border border-stone-300 bg-white text-[#181411] font-mono text-xs focus:outline-none focus:border-[#C85A17]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1.5 font-bold">
                  {t.calculator.locationLabel}
                </label>
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    const preset = PRESET_LOCATIONS[idx];
                    setLatitude(preset.lat);
                    setLongitude(preset.lng);
                  }}
                  defaultValue="0"
                  className="w-full px-3 py-2 rounded-none border border-stone-300 bg-white text-[#181411] font-mono text-xs focus:outline-none focus:border-[#C85A17]"
                >
                  {PRESET_LOCATIONS.map((loc, idx) => (
                    <option key={loc.name} value={idx}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => onOpenInquiry(`कुण्डली अध्ययन: ${result.bikramSambat.formattedNepali} जन्म विवरण`)}
                  className="w-full py-2.5 rounded-none bg-[#C85A17] text-white text-xs font-bold hover:bg-[#A6440C] transition-colors shadow-sm border border-[#C85A17]"
                >
                  {t.calculator.bookPersonalAnalysis}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
