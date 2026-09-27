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
  const [selectedDate, setSelectedDate] = useState<string>("2024-04-14");
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [latitude, setLatitude] = useState<number>(27.7172);
  const [longitude, setLongitude] = useState<number>(85.324);
  const [showInputDrawer, setShowInputDrawer] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

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
    const text = `नील हरि वैदिक ज्योतिष केन्द्र - कुण्डली तथा पञ्चाङ्ग विवरण:
नेपाली मिति: ${result.bikramSambat.formattedNepali} (${result.bikramSambat.formatted})
अंग्रेजी मिति: ${result.gregorianDate}
जन्म लग्न: ${result.ascendant.sanskritSign} (${result.ascendant.degreeInSign}°)
सूर्य राशि: ${result.solarSign.sanskrit} (${result.solarSign.degree}°)
चन्द्र राशि: ${result.lunarSign.sanskrit} (${result.lunarSign.degree}°)
नक्षत्र: ${result.nakshatra.name} (चरण ${result.nakshatra.pada}, स्वामी: ${result.nakshatra.ruler})
तिथि: ${result.tithi.sanskritName}
योग: ${result.yoga.name}
करण: ${result.karana.name}`;
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
        map[p.house].push(`${p.symbol} ${p.sanskrit}`);
      }
    });
    return map;
  }, [result.planets]);

  return (
    <section id="kundali" className="w-full py-16 md:py-24 border-b border-border bg-surface scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section matching user reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Description & Action */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-primary font-medium mb-3">
              <span className="text-secondary">—</span>
              <span>मुख्य सेवा</span>
              <span className="text-secondary">—</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-textHeading font-normal tracking-tight leading-tight">
              जन्म कुण्डली तथा पञ्चाङ्ग गणना
            </h2>

            <p className="mt-4 text-sm text-textBody leading-relaxed font-light">
              तपाईंको जन्म समय, स्थान र ग्रह-नक्षत्रको आधारमा तयार हुने जन्म कुण्डलीले
              जीवनका प्रमुख क्षेत्रहरूमा मार्गदर्शन प्रदान गर्दछ। कुण्डली, पञ्चाङ्ग गणनाबाट
              शुभ-अशुभ समय, तिथि, बार, नक्षत्र, योग र करणको जानकारी प्राप्त गर्न सकिन्छ।
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowInputDrawer(!showInputDrawer)}
                className="px-6 py-3 rounded-lg bg-navy text-textInverted text-sm font-sans font-medium hover:bg-navy-dark transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-hover"
              >
                <span>{showInputDrawer ? "विवरण बन्द गर्नुहोस्" : "गणना गर्नुहोस्"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopySummary}
                className="px-4 py-3 rounded-lg border border-border bg-surface text-textBody hover:text-foreground text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-secondary" />
                <span>{copiedNotice ? "कपी भयो!" : "कपी गर्नुहोस्"}</span>
              </button>
            </div>
          </div>

          {/* Center Column: Beautiful Traditional North-Indian Diamond Kundali Chart matching reference */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[340px] aspect-square bg-[#FFFDF8] border-2 border-secondary/70 rounded-xl p-3 shadow-card relative">
              <div className="absolute inset-3 pointer-events-none">
                <svg className="w-full h-full stroke-secondary/70 stroke-[1.2]">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                  <polygon
                    points="50%,0% 100%,50% 50%,100% 0%,50%"
                    fill="#FBF7EE"
                    className="stroke-primary/70 stroke-[1.5]"
                  />
                </svg>
              </div>

              {/* House 1: Lagna */}
              <div className="absolute top-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[11px] text-primary font-bold">१ (लग्न)</span>
                <span className="font-serif text-[11px] font-semibold text-textHeading">
                  {result.ascendant.sanskritSign}
                </span>
                <div className="text-[9px] font-mono text-secondary font-medium">
                  {planetsByHouse[1]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 2 */}
              <div className="absolute top-[4%] left-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">२</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[2]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 3 */}
              <div className="absolute top-[16%] left-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">३</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[3]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 4 */}
              <div className="absolute top-[38%] left-[15%] w-[25%] h-[25%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-primary font-bold">४ सुख</span>
                <div className="text-[8px] font-mono text-secondary font-medium">
                  {planetsByHouse[4]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 5 */}
              <div className="absolute bottom-[16%] left-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">५</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[5]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 6 */}
              <div className="absolute bottom-[4%] left-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">६</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[6]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 7: Vivaha */}
              <div className="absolute bottom-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[11px] text-primary font-bold">७ विवाह</span>
                <div className="text-[9px] font-mono text-secondary font-medium">
                  {planetsByHouse[7]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 8 */}
              <div className="absolute bottom-[4%] right-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">८</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[8]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 9 */}
              <div className="absolute bottom-[16%] right-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">९</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[9]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 10 */}
              <div className="absolute top-[38%] right-[15%] w-[25%] h-[25%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-primary font-bold">१० कर्म</span>
                <div className="text-[8px] font-mono text-secondary font-medium">
                  {planetsByHouse[10]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 11 */}
              <div className="absolute top-[16%] right-[4%] w-[20%] h-[20%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">११</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[11]?.join(" ") || "—"}
                </div>
              </div>

              {/* House 12 */}
              <div className="absolute top-[4%] right-[16%] w-[22%] h-[18%] flex flex-col items-center justify-center text-center">
                <span className="font-serif text-[10px] text-textMuted">१२</span>
                <div className="text-[8px] font-mono text-foreground font-medium">
                  {planetsByHouse[12]?.join(" ") || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Items matching reference */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center gap-3.5 hover:border-secondary transition-colors shadow-soft">
              <div className="w-10 h-10 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-textHeading">
                  जन्म कुण्डली निर्माण
                </h4>
                <p className="text-xs text-textMuted">सूक्ष्म लग्न तथा षोडशवर्ग गणना</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center gap-3.5 hover:border-secondary transition-colors shadow-soft">
              <div className="w-10 h-10 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-textHeading">
                  दैनिक पञ्चाङ्ग गणना
                </h4>
                <p className="text-xs text-textMuted">तिथि, नक्षत्र, योग र करण</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center gap-3.5 hover:border-secondary transition-colors shadow-soft">
              <div className="w-10 h-10 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-textHeading">
                  शुभ मुहूर्त निर्धारण
                </h4>
                <p className="text-xs text-textMuted">विवाह, व्यापार र गृह प्रवेश साइत</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center gap-3.5 hover:border-secondary transition-colors shadow-soft">
              <div className="w-10 h-10 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-textHeading">
                  ग्रह दशा विश्लेषण
                </h4>
                <p className="text-xs text-textMuted">विंशोत्तरी महादशा र गोचर फल</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Clean Form Drawer for Instant Recalculation */}
        {showInputDrawer && (
          <div className="mt-8 p-6 rounded-2xl border border-secondary/50 bg-surface-cream shadow-card animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="font-serif text-base font-semibold text-textHeading">
                जन्म विवरण प्रविष्ट गर्नुहोस् (Enter Birth Details)
              </span>
              <button
                onClick={() => setShowInputDrawer(false)}
                className="text-xs font-mono text-textMuted hover:text-foreground"
              >
                ✕ बन्द गर्नुहोस्
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono text-textMuted mb-1.5">
                  जन्म मिति (Date A.D.)
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1.5">
                  जन्म समय (Time Local)
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1.5">
                  जन्म स्थान (City)
                </label>
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    const preset = PRESET_LOCATIONS[idx];
                    setLatitude(preset.lat);
                    setLongitude(preset.lng);
                  }}
                  defaultValue="0"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
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
                  className="w-full py-2.5 rounded-lg bg-primary text-textInverted text-xs font-sans font-medium hover:bg-primary-dark transition-colors shadow-soft"
                >
                  गुरुसँग कुण्डली परामर्श लिनुहोस्
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
