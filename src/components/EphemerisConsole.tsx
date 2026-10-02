"use client";

import React, { useState, useMemo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import {
  evaluatePanchanga,
  PanchangaResult,
  toNepaliNumber,
} from "@/utils/astronomy";
import {
  IconCalendar as Calendar,
  IconCompass as Compass,
  IconRefresh as RefreshCw,
  IconArrowRight as Download,
  IconExternalLink as Share2,
  IconBookOpen as Table,
  IconLayers as Grid,
  IconAward as Printer,
} from "@/components/icons/CustomIcons";

const PRESET_LOCATIONS = [
  { name: "काठमाडौँ (Kathmandu, Nepal)", lat: 27.7172, lng: 85.324 },
  { name: "पोखरा (Pokhara, Nepal)", lat: 28.2096, lng: 83.9856 },
  { name: "विराटनगर (Biratnagar, Nepal)", lat: 26.4525, lng: 87.2718 },
  { name: "लन्डन (London, UK)", lat: 51.5074, lng: -0.1278 },
  { name: "न्युयोर्क (New York, USA)", lat: 40.7128, lng: -74.006 },
  { name: "सिड्नी (Sydney, Australia)", lat: -33.8688, lng: 151.2093 },
];

export default function EphemerisConsole() {
  const [selectedDate, setSelectedDate] = useState<string>("2024-04-14");
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [latitude, setLatitude] = useState<number>(27.7172);
  const [longitude, setLongitude] = useState<number>(85.324);
  const [activeTab, setActiveTab] = useState<string>("vedic");
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
    const text = `गुरु निलहरि | वैदिक सनातन केन्द्र युके - कुण्डली तथा पञ्चाङ्ग विवरण (www.gurunilhari.com):
नेपाली मिति: ${result.bikramSambat.formattedNepali} (${result.bikramSambat.formatted})
अंग्रेजी मिति: ${result.gregorianDate}
तिथि: ${result.tithi.sanskritName}
नक्षत्र: ${result.nakshatra.name} (चरण ${result.nakshatra.pada}, स्वामी: ${result.nakshatra.ruler})
योग: ${result.yoga.name}
करण: ${result.karana.name}
लग्न (Ascendant): ${result.ascendant.sign} (${result.ascendant.degreeInSign}°)
सूर्य राशि: ${result.solarSign.name} (${result.solarSign.degree}°)
चन्द्र राशि: ${result.lunarSign.name} (${result.lunarSign.degree}°)
स्थान: ${latitude}° N, ${longitude}° E`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const setPreset = (preset: (typeof PRESET_LOCATIONS)[0]) => {
    setLatitude(preset.lat);
    setLongitude(preset.lng);
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
    <section id="kundali" className="w-full py-16 md:py-20 border-b border-border bg-surface scroll-mt-20 relative">
      <div id="ephemeris" className="absolute -top-20 left-0" />
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-primary uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>KUNDALI & PANCHANGA GENERATOR</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-textHeading font-normal tracking-tight">
              जन्म कुण्डली तथा शुद्ध पञ्चाङ्ग गणना
            </h2>
            <p className="mt-2 text-textBody text-sm max-w-2xl font-light">
              जन्म मिति, समय र स्थान प्रविष्ट गरी शुद्ध वैदिक कुण्डली, तिथि, नक्षत्र,
              योग, करण र ग्रह स्थिति तुरुन्तै हेर्नुहोस्।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const now = new Date();
                setSelectedDate(now.toISOString().split("T")[0]);
                setSelectedTime(
                  `${String(now.getUTCHours()).padStart(2, "0")}:${String(
                    now.getUTCMinutes()
                  ).padStart(2, "0")}`
                );
              }}
              className="px-4 py-2 border border-border bg-background text-xs font-mono uppercase tracking-wider text-foreground hover:border-secondary transition-colors flex items-center gap-2 shadow-soft"
            >
              <RefreshCw className="w-3 h-3 text-secondary" />
              <span>अहिलेको समय (Current Time)</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 bg-primary text-textInverted text-xs font-mono uppercase tracking-wider hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-soft"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedNotice ? "कपी भयो!" : "विवरण कपी गर्नुहोस्"}</span>
            </button>
          </div>
        </div>

        {/* Clean Parameter Controls */}
        <div className="mt-6 p-6 border border-border bg-background grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
              जन्म / घटना मिति (Date A.D.)
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
              जन्म समय (Time UTC/Local)
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
              स्थान चयन (Preset Location)
            </label>
            <select
              onChange={(e) => {
                const idx = Number(e.target.value);
                setPreset(PRESET_LOCATIONS[idx]);
              }}
              defaultValue="0"
              className="w-full px-3 py-2 border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
            >
              {PRESET_LOCATIONS.map((loc, idx) => (
                <option key={loc.name} value={idx}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
              अक्षांश / देशान्तर (Lat / Long)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                placeholder="Lat"
                className="px-2 py-2 border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
              />
              <input
                type="number"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                placeholder="Long"
                className="px-2 py-2 border border-border bg-surface text-foreground font-mono text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Results */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Nepali Patra & Panchang Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Nepali Patra Highlight Card */}
            <div className="border border-secondary/50 bg-surface-elevated p-6 relative shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono">
                <span className="text-secondary font-medium tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  नेपाली मिति (BIKRAM SAMBAT)
                </span>
                <span className="text-textCaption uppercase">संवत् २०८१</span>
              </div>

              <div className="mt-4">
                <div className="font-serif text-3xl md:text-4xl text-foreground font-semibold">
                  {result.bikramSambat.formattedNepali}
                </div>
                <div className="font-mono text-xs text-primary mt-1">
                  अंग्रेजी रूपान्तरण: {result.bikramSambat.formatted}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-textMuted uppercase text-[10px] block">
                    सूर्य राशि (Solar Sign)
                  </span>
                  <span className="text-foreground font-medium text-sm mt-0.5 block">
                    {result.solarSign.sanskrit} ({result.solarSign.name})
                  </span>
                  <span className="text-textCaption text-[11px]">
                    {result.solarSign.degree}° अंश
                  </span>
                </div>
                <div>
                  <span className="text-textMuted uppercase text-[10px] block">
                    चन्द्र राशि (Moon Sign)
                  </span>
                  <span className="text-foreground font-medium text-sm mt-0.5 block">
                    {result.lunarSign.sanskrit} ({result.lunarSign.name})
                  </span>
                  <span className="text-textCaption text-[11px]">
                    {result.lunarSign.degree}° अंश
                  </span>
                </div>
              </div>
            </div>

            {/* Five Pillars of Panchanga */}
            <div className="border border-border bg-background p-6 flex flex-col gap-4 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono">
                <span className="text-primary font-medium tracking-wider">
                  पञ्चाङ्गका पाँच अङ्ग (FIVE PILLARS)
                </span>
                <span className="text-textCaption">दैनिक गणना</span>
              </div>

              {/* Tithi */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-textMuted uppercase">१. तिथि (Tithi):</span>
                  <span className="text-foreground font-semibold">
                    {result.tithi.sanskritName}
                  </span>
                </div>
                <div className="w-full bg-border h-1.5 relative overflow-hidden">
                  <motion.div
                    className="bg-primary h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.tithi.progressPercentage}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-textCaption">
                  {result.tithi.progressPercentage}% भुक्त • {result.tithi.paksha} पक्ष
                </span>
              </div>

              {/* Nakshatra */}
              <div className="pt-2.5 border-t border-border/60 flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-textMuted uppercase">२. नक्षत्र (Nakshatra):</span>
                  <span className="text-foreground font-semibold">
                    {result.nakshatra.name}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-textMuted">
                  <span>चरण: {toNepaliNumber(result.nakshatra.pada)} / ४</span>
                  <span>स्वामी: {result.nakshatra.ruler} • देवता: {result.nakshatra.deity}</span>
                </div>
              </div>

              {/* Yoga */}
              <div className="pt-2.5 border-t border-border/60 flex justify-between items-center text-xs font-mono">
                <span className="text-textMuted uppercase">३. योग (Yoga):</span>
                <div className="text-right">
                  <span className="text-foreground font-semibold block">{result.yoga.name}</span>
                  <span
                    className={`text-[10px] ${
                      result.yoga.nature === "Auspicious"
                        ? "text-[#2F855A]"
                        : "text-primary"
                    }`}
                  >
                    {result.yoga.nature === "Auspicious" ? "शुभ फलदायी" : "मध्यम"}
                  </span>
                </div>
              </div>

              {/* Karana */}
              <div className="pt-2.5 border-t border-border/60 flex justify-between items-center text-xs font-mono">
                <span className="text-textMuted uppercase">४. करण (Karana):</span>
                <div className="text-right">
                  <span className="text-foreground font-semibold block">{result.karana.name}</span>
                  <span className="text-[10px] text-textCaption">
                    प्रकृति: {result.karana.type === "Movable" ? "चर" : "स्थिर"}
                  </span>
                </div>
              </div>

              {/* Ascendant */}
              <div className="pt-2.5 border-t border-border/60 flex justify-between items-center text-xs font-mono">
                <span className="text-textMuted uppercase">५. लग्न (Lagna):</span>
                <div className="text-right">
                  <span className="text-foreground font-semibold block">
                    {result.ascendant.sanskritSign} लग्न ({result.ascendant.degreeInSign}°)
                  </span>
                  <span className="text-[10px] text-textCaption">
                    कुल अंश: {result.ascendant.degree.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Radix UI Tabs for Vedic Diamond & Table (7 cols) */}
          <div className="lg:col-span-7 border border-border bg-surface p-6 flex flex-col gap-6 shadow-soft">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground">
                  <span className="w-2 h-2 bg-primary" />
                  <span>वैदिक लग्न कुण्डली (BIRTH CHART)</span>
                </div>

                <Tabs.List className="flex items-center border border-border text-xs font-mono">
                  <Tabs.Trigger
                    value="vedic"
                    className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                      activeTab === "vedic"
                        ? "bg-primary text-textInverted font-medium"
                        : "bg-surface text-textMuted hover:text-foreground"
                    }`}
                  >
                    <Grid className="w-3 h-3" />
                    <span>कुण्डली चक्र (Diamond)</span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="table"
                    className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                      activeTab === "table"
                        ? "bg-primary text-textInverted font-medium"
                        : "bg-surface text-textMuted hover:text-foreground"
                    }`}
                  >
                    <Table className="w-3 h-3" />
                    <span>ग्रह स्पष्ट (Degrees)</span>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>

              {/* Tab 1: Vedic Diamond Chart */}
              <Tabs.Content value="vedic" className="outline-none focus:ring-0">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-full max-w-[440px] aspect-square border border-secondary/60 bg-surface-elevated p-2 shadow-soft">
                    <div className="absolute inset-0 border border-border" />
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full stroke-secondary/50 stroke-[1.2]">
                        <line x1="0" y1="0" x2="100%" y2="100%" />
                        <line x1="100%" y1="0" x2="0" y2="100%" />
                        <polygon
                          points="50%,0% 100%,50% 50%,100% 0%,50%"
                          fill="none"
                          className="stroke-primary/70 stroke-[1.5]"
                        />
                      </svg>
                    </div>

                    {/* House 1: Lagna */}
                    <div className="absolute top-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                      <span className="font-serif text-[11px] text-primary font-bold">
                        १ (लग्न / H1)
                      </span>
                      <span className="font-serif text-xs font-semibold text-textHeading">
                        {result.ascendant.sanskritSign}
                      </span>
                      <div className="text-[10px] font-mono text-secondary font-medium">
                        {planetsByHouse[1]?.join(" ") || "—"}
                      </div>
                    </div>

                    {/* House 2 */}
                    <div className="absolute top-[8%] left-[8%] w-[24%] h-[16%] flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-[9px] text-textCaption">२</span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[2]?.join(" ") || "—"}
                      </span>
                    </div>

                    {/* House 12 */}
                    <div className="absolute top-[8%] right-[8%] w-[24%] h-[16%] flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-[9px] text-textCaption">१२</span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[12]?.join(" ") || "—"}
                      </span>
                    </div>

                    {/* House 4 */}
                    <div className="absolute top-[38%] left-[6%] w-[28%] h-[24%] flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-[10px] text-primary font-bold">४ (सुख)</span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[4]?.join(" ") || "—"}
                      </span>
                    </div>

                    {/* House 7 */}
                    <div className="absolute bottom-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-[10px] text-primary font-bold">
                        ७ (जाया)
                      </span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[7]?.join(" ") || "—"}
                      </span>
                    </div>

                    {/* House 10 */}
                    <div className="absolute top-[38%] right-[6%] w-[28%] h-[24%] flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-[10px] text-primary font-bold">१० (कर्म)</span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[10]?.join(" ") || "—"}
                      </span>
                    </div>

                    {/* H5 and H9 */}
                    <div className="absolute bottom-[8%] left-[8%] text-center">
                      <span className="font-mono text-[9px] text-textCaption">५: </span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[5]?.join(" ") || "—"}
                      </span>
                    </div>

                    <div className="absolute bottom-[8%] right-[8%] text-center">
                      <span className="font-mono text-[9px] text-textCaption">९: </span>
                      <span className="text-[10px] font-mono text-foreground">
                        {planetsByHouse[9]?.join(" ") || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-center font-mono text-[11px] text-textMuted">
                    उत्तर-भारतीय परम्परागत कुण्डली चक्र • प्रथम भावमा लग्न
                  </div>
                </div>
              </Tabs.Content>

              {/* Tab 2: Graha Coordinates Table */}
              <Tabs.Content value="table" className="outline-none focus:ring-0">
                <div className="overflow-x-auto py-2">
                  <table className="w-full text-left text-xs font-mono border border-border">
                    <thead className="bg-surface-elevated border-b border-border text-textMuted uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">ग्रह (Planet)</th>
                        <th className="py-2.5 px-3">राशि (Rashi)</th>
                        <th className="py-2.5 px-3 text-right">अंश / कला (Degree)</th>
                        <th className="py-2.5 px-3 text-center">गति (Motion)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {result.planets.map((p) => (
                        <tr key={p.name} className="hover:bg-surface-elevated/60 transition-colors">
                          <td className="py-2 px-3 flex items-center gap-2">
                            <span className="text-secondary text-sm">{p.symbol}</span>
                            <span className="font-semibold text-foreground">{p.sanskrit}</span>
                            <span className="text-textCaption text-[10px]">({p.name})</span>
                          </td>
                          <td className="py-2 px-3 text-textBody">{p.sign}</td>
                          <td className="py-2 px-3 text-right font-tabular text-foreground">
                            {p.degreeInSign}° {String(p.minuteInSign).padStart(2, "0")}&apos;
                          </td>
                          <td className="py-2 px-3 text-center">
                            {p.isRetrograde ? (
                              <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold">
                                वक्री (R)
                              </span>
                            ) : (
                              <span className="text-textMuted text-[10px]">मार्गी</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tabs.Content>
            </Tabs.Root>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-textMuted">
              <span>गणना: नेपाली पञ्चाङ्ग तथा शुद्ध अयनांश</span>
              <span>अयनांश: चित्रापक्षीय (लाहिरी)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
