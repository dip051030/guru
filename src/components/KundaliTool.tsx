"use client";

import React, { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import { localMidnight, julianDay, yogaAngle } from "@/utils/ephemeris";
import { birthChart, vimshottari } from "@/utils/kundali";
import { NAKSHATRA_EN, NAKSHATRA_NE, RASHI_EN, RASHI_NE, YOGA_EN, YOGA_NE, karanaName, tithiAt, tithiName } from "@/utils/panchang";
import { fmtAdDate, fmtBsDate, nums, weekdayName } from "@/lib/format";

const PLACES = [
  { ne: "काठमाडौं", en: "Kathmandu", lat: 27.7172, lon: 85.324, tz: "Asia/Kathmandu" },
  { ne: "पोखरा", en: "Pokhara", lat: 28.2096, lon: 83.9856, tz: "Asia/Kathmandu" },
  { ne: "विराटनगर", en: "Biratnagar", lat: 26.4525, lon: 87.2718, tz: "Asia/Kathmandu" },
  { ne: "बुटवल", en: "Butwal", lat: 27.7006, lon: 83.4483, tz: "Asia/Kathmandu" },
  { ne: "भरतपुर", en: "Bharatpur", lat: 27.6766, lon: 84.4324, tz: "Asia/Kathmandu" },
  { ne: "धनगढी", en: "Dhangadhi", lat: 28.6852, lon: 80.6216, tz: "Asia/Kathmandu" },
  { ne: "जनकपुर", en: "Janakpur", lat: 26.7288, lon: 85.9263, tz: "Asia/Kathmandu" },
  { ne: "लन्डन", en: "London", lat: 51.5074, lon: -0.1278, tz: "Europe/London" },
  { ne: "दिल्ली", en: "Delhi", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  { ne: "दोहा", en: "Doha", lat: 25.2854, lon: 51.531, tz: "Asia/Qatar" },
  { ne: "दुबई", en: "Dubai", lat: 25.2048, lon: 55.2708, tz: "Asia/Dubai" },
  { ne: "सिड्नी", en: "Sydney", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
  { ne: "न्युयोर्क", en: "New York", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
];

const GRAHA_SHORT: Record<string, { ne: string; en: string }> = {
  Sun: { ne: "सू", en: "Su" }, Moon: { ne: "च", en: "Mo" }, Mars: { ne: "मं", en: "Ma" }, Mercury: { ne: "बु", en: "Me" },
  Jupiter: { ne: "गु", en: "Ju" }, Venus: { ne: "शु", en: "Ve" }, Saturn: { ne: "श", en: "Sa" }, Rahu: { ne: "रा", en: "Ra" }, Ketu: { ne: "के", en: "Ke" },
};
const GRAHA_NE: Record<string, string> = {
  Sun: "सूर्य", Moon: "चन्द्र", Mars: "मङ्गल", Mercury: "बुध", Jupiter: "गुरु", Venus: "शुक्र", Saturn: "शनि", Rahu: "राहु", Ketu: "केतु",
};

// Centre of each house in the North Indian chart (0-100 box), and where its sign number goes.
const HOUSE_POS: { x: number; y: number; sx: number; sy: number }[] = [
  { x: 50, y: 28, sx: 50, sy: 44 }, { x: 25, y: 12, sx: 25, sy: 22 }, { x: 12, y: 25, sx: 22, sy: 25 },
  { x: 28, y: 50, sx: 44, sy: 50 }, { x: 12, y: 75, sx: 22, sy: 75 }, { x: 25, y: 88, sx: 25, sy: 78 },
  { x: 50, y: 72, sx: 50, sy: 56 }, { x: 75, y: 88, sx: 75, sy: 78 }, { x: 88, y: 75, sx: 78, sy: 75 },
  { x: 72, y: 50, sx: 56, sy: 50 }, { x: 88, y: 25, sx: 78, sy: 25 }, { x: 75, y: 12, sx: 75, sy: 22 },
];

export default function KundaliTool({ onOpenInquiry }: { onOpenInquiry?: (topic?: string) => void }) {
  const { language } = useLanguage();
  const { location } = useLocation();
  const isNe = language === "ne";
  const lang = isNe ? "ne" : "en";
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState("1990-01-01");
  const [time, setTime] = useState("06:00");
  const [placeIdx, setPlaceIdx] = useState(0); // -1 = current location

  useEffect(() => {
    const n = new Date();
    const pad = (v: number) => String(v).padStart(2, "0");
    setDate(`${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`);
    setTime(`${pad(n.getHours())}:${pad(n.getMinutes())}`);
    setReady(true);
  }, []);

  const place =
    placeIdx === -1
      ? { ne: location.label, en: location.label, lat: location.lat, lon: location.lon, tz: location.timeZone }
      : PLACES[placeIdx];

  const result = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null;
    // Birth time is local to the birthplace (Intl knows historical offsets, e.g. Nepal's +5:30 before 1986).
    const instant = new Date(localMidnight(y, m - 1, d, place.tz) + (hh * 60 + mm) * 60000);
    const chart = birthChart(instant, place.lat, place.lon);
    const moon = chart.grahas.find((g) => g.graha === "Moon")!;
    const jd = julianDay(instant);
    const tithi = tithiAt(jd);
    const yoga = Math.floor(yogaAngle(jd) / (360 / 27));
    const elong = (((moon.lon - chart.grahas.find((g) => g.graha === "Sun")!.lon) % 360) + 360) % 360;
    const k = Math.floor(elong / 6);
    const karana = k === 0 ? 0 : k >= 57 ? k - 57 + 8 : ((k - 1) % 7) + 1;
    let bs: { y: number; m: number; d: number } | null = null;
    try {
      const b = new NepaliDate(new Date(y, m - 1, d, 12));
      bs = { y: b.getYear(), m: b.getMonth() + 1, d: b.getDate() };
    } catch { /* outside BS range */ }
    const dashas = vimshottari(instant, moon.lon);
    return { instant, chart, moon, tithi, yoga, karana, bs, dashas, weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
  }, [date, time, place.lat, place.lon, place.tz]);

  const now = Date.now();
  const inputCls = "h-10 w-full px-3 rounded-lg border border-stone-200 bg-white text-sm";
  const deg = (v: number) => `${nums(Math.floor(v), isNe)}°${nums(String(Math.floor((v % 1) * 60)).padStart(2, "0"), isNe)}′`;
  const rashi = (i: number) => (isNe ? RASHI_NE[i] : RASHI_EN[i]);

  return (
    <section id="kundali" className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-10 bg-[#FAF7F2] scroll-mt-24">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Inputs */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-5 space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">{isNe ? "जन्म विवरण" : "Birth details"}</h2>
          <label className="block text-sm text-stone-600">
            {isNe ? "जन्म मिति (ई.सं.)" : "Date of birth (AD)"}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${inputCls} mt-1`} />
          </label>
          <label className="block text-sm text-stone-600">
            {isNe ? "जन्म समय (स्थानीय)" : "Time of birth (local)"}
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${inputCls} mt-1`} />
          </label>
          <label className="block text-sm text-stone-600">
            {isNe ? "जन्म स्थान" : "Place of birth"}
            <select value={placeIdx} onChange={(e) => setPlaceIdx(Number(e.target.value))} className={`${inputCls} mt-1`}>
              {PLACES.map((p, i) => <option key={p.en} value={i}>{isNe ? p.ne : p.en}</option>)}
              {location.source === "device" && <option value={-1}>{isNe ? `मेरो स्थान (${location.label})` : `My location (${location.label})`}</option>}
            </select>
          </label>
          {result?.bs && (
            <p className="text-sm text-stone-600">
              {isNe ? "वि.सं." : "BS"}: <strong className="text-stone-900">{fmtBsDate(result.bs.y, result.bs.m, result.bs.d, isNe)}</strong>, {weekdayName(result.weekday, isNe)}
            </p>
          )}
          {onOpenInquiry && result && (
            <button
              onClick={() => onOpenInquiry(isNe ? `कुण्डली विश्लेषण: ${date} ${time}, ${place.ne}` : `Birth chart reading: ${date} ${time}, ${place.en}`)}
              className="w-full py-3 rounded-lg bg-[#D95B16] hover:bg-[#B8480C] text-white text-sm font-semibold"
            >
              {isNe ? "गुरुज्यूबाट कुण्डली विश्लेषण" : "Get a full reading from Guruji"}
            </button>
          )}
        </div>

        {ready && result ? (
          <div className="lg:col-span-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Chart */}
              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-stone-900 mb-2">{isNe ? "लग्न कुण्डली" : "Lagna chart"}</h3>
                <svg viewBox="0 0 100 100" className="w-full max-w-[360px] mx-auto aspect-square" role="img" aria-label={isNe ? "जन्म कुण्डली" : "Birth chart"}>
                  <rect x="0.5" y="0.5" width="99" height="99" fill="#FFFBF5" stroke="#D95B16" strokeWidth="0.6" />
                  <line x1="0" y1="0" x2="100" y2="100" stroke="#D95B16" strokeWidth="0.4" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="#D95B16" strokeWidth="0.4" />
                  <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#D95B16" strokeWidth="0.4" />
                  {HOUSE_POS.map((p, i) => {
                    const sign = (result.chart.lagna.sign + i) % 12;
                    const planets = result.chart.grahas.filter((g) => g.house === i + 1);
                    return (
                      <g key={i}>
                        <text x={p.sx} y={p.sy} fontSize="3.4" textAnchor="middle" dominantBaseline="middle" fill="#A8A29E">{nums(sign + 1, isNe)}</text>
                        {i === 0 && <text x={p.x} y={p.y - 7} fontSize="3.2" textAnchor="middle" fill="#D95B16" fontWeight="700">{isNe ? "लग्न" : "Asc"}</text>}
                        {planets.map((g, j) => (
                          <text key={g.graha} x={p.x} y={p.y - (planets.length - 1) * 2.4 + j * 4.8} fontSize="3.8" textAnchor="middle" dominantBaseline="middle" fill="#1C1917" fontWeight="600">
                            {GRAHA_SHORT[g.graha][lang]}{g.retrograde && g.graha !== "Rahu" && g.graha !== "Ketu" ? "*" : ""}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>
                <p className="mt-2 text-[11px] text-stone-500 text-center">{isNe ? "* वक्री ग्रह · अंकले राशि जनाउँछ" : "* retrograde · numbers are signs"}</p>
              </div>

              {/* Birth panchang */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 text-sm">
                <h3 className="font-semibold text-stone-900 mb-2">{isNe ? "जन्म पञ्चाङ्ग" : "Birth panchang"}</h3>
                {[
                  [isNe ? "लग्न" : "Lagna", `${rashi(result.chart.lagna.sign)} ${deg(result.chart.lagna.degree)}`],
                  [isNe ? "चन्द्र राशि" : "Moon sign", rashi(result.moon.sign)],
                  [isNe ? "जन्म नक्षत्र" : "Nakshatra", `${isNe ? NAKSHATRA_NE[result.moon.nakshatra] : NAKSHATRA_EN[result.moon.nakshatra]} (${isNe ? "चरण" : "pada"} ${nums(result.moon.pada, isNe)})`],
                  [isNe ? "तिथि" : "Tithi", `${result.tithi <= 15 ? (isNe ? "शुक्ल" : "Shukla") : isNe ? "कृष्ण" : "Krishna"} ${tithiName(result.tithi, lang)}`],
                  [isNe ? "योग" : "Yoga", isNe ? YOGA_NE[result.yoga] : YOGA_EN[result.yoga]],
                  [isNe ? "करण" : "Karana", karanaName(result.karana, lang)],
                  [isNe ? "वार" : "Weekday", weekdayName(result.weekday, isNe)],
                ].map(([k, v]) => (
                  <div key={k} className="py-2 flex justify-between gap-3 border-b border-stone-100 last:border-0">
                    <span className="text-stone-500">{k}</span>
                    <span className="font-semibold text-stone-900 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Planets */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead className="bg-stone-50 text-xs text-stone-500">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-medium">{isNe ? "ग्रह" : "Graha"}</th>
                    <th className="px-3 py-2.5 text-left font-medium">{isNe ? "राशि" : "Sign"}</th>
                    <th className="px-3 py-2.5 text-left font-medium">{isNe ? "अंश" : "Degree"}</th>
                    <th className="px-3 py-2.5 text-left font-medium">{isNe ? "नक्षत्र" : "Nakshatra"}</th>
                    <th className="px-4 py-2.5 text-right font-medium">{isNe ? "भाव" : "House"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {result.chart.grahas.map((g) => (
                    <tr key={g.graha}>
                      <td className="px-4 py-2.5 font-semibold text-stone-900">
                        {isNe ? GRAHA_NE[g.graha] : g.graha}
                        {g.retrograde && g.graha !== "Rahu" && g.graha !== "Ketu" && <span className="ml-1 text-xs font-normal text-stone-500">{isNe ? "(वक्री)" : "(R)"}</span>}
                      </td>
                      <td className="px-3 py-2.5">{rashi(g.sign)}</td>
                      <td className="px-3 py-2.5 tabular-nums">{deg(g.degree)}</td>
                      <td className="px-3 py-2.5">{isNe ? NAKSHATRA_NE[g.nakshatra] : NAKSHATRA_EN[g.nakshatra]} {nums(g.pada, isNe)}</td>
                      <td className="px-4 py-2.5 text-right">{nums(g.house, isNe)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dasha */}
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900">{isNe ? "विंशोत्तरी महादशा" : "Vimshottari mahadasha"}</h3>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {result.dashas.map((d) => {
                  const current = now >= d.start.getTime() && now < d.end.getTime();
                  return (
                    <li key={d.lord + d.start.getTime()} className={`px-3 py-2 rounded-lg border text-sm ${current ? "bg-orange-50 border-[#D95B16]" : "border-stone-200"}`}>
                      <div className="font-semibold text-stone-900">
                        {isNe ? GRAHA_NE[d.lord] : d.lord}
                        {current && <span className="ml-1.5 text-xs font-medium text-[#D95B16]">{isNe ? "चालु" : "current"}</span>}
                      </div>
                      <div className="text-xs text-stone-500">{fmtAdDate(d.start, isNe)} – {fmtAdDate(d.end, isNe)}</div>
                    </li>
                  );
                })}
              </ul>
              {(() => {
                const cur = result.dashas.find((d) => now >= d.start.getTime() && now < d.end.getTime());
                if (!cur) return null;
                return (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-stone-900">
                      {isNe ? `${GRAHA_NE[cur.lord]} महादशाका अन्तर्दशा` : `Antardashas in ${cur.lord} mahadasha`}
                    </h4>
                    <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                      {cur.sub.map((s) => {
                        const on = now >= s.start.getTime() && now < s.end.getTime();
                        return (
                          <li key={s.lord + s.start.getTime()} className={`px-2.5 py-1.5 rounded-md border ${on ? "bg-orange-50 border-[#D95B16]" : "border-stone-200"}`}>
                            <span className="font-semibold text-stone-800">{isNe ? GRAHA_NE[s.lord] : s.lord}</span>
                            <span className="block text-stone-500">{fmtAdDate(s.start, isNe)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })()}
              <p className="mt-4 text-[11px] text-stone-400">
                {isNe
                  ? "ग्रह स्थिति दृक् गणित र लाहिडी अयनांशबाट गणना गरिएको। भाव पूर्ण-राशि पद्धतिमा लग्नबाट गनिएको।"
                  : "Positions computed with Drik Ganita and Lahiri ayanamsha. Houses are whole-sign from the lagna."}
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 h-[480px] rounded-xl bg-white border border-stone-200 animate-pulse" />
        )}
      </div>
    </section>
  );
}
