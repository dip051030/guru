"use client";

import React, { useMemo, useState } from "react";
import { IconLeaf, IconLocate, IconMapPin, IconMoon, IconSun, IconWarning } from "@/components/icons/CustomIcons";
import { useLocation } from "@/context/LocationContext";
import type { CalendarDay } from "@/utils/nepaliCalendar";
import {
  CHOGHADIYA_NE, CHOGHADIYA_QUALITY, LUNAR_MONTH_NE, LUNAR_MONTH_EN, NAKSHATRA_EN, NAKSHATRA_NE, RASHI_EN, RASHI_NE,
  YOGA_EN, YOGA_NE, getDayPanchang, karanaName, tithiName, type Period,
} from "@/utils/panchang";
import { dayKey, fmtAdDate, fmtBsDate, fmtTime, fmtTimeRel, weekdayName } from "@/lib/format";

interface Props {
  day: CalendarDay;
  isNe: boolean;
  isToday: boolean;
  onBook?: (topic: string) => void;
}

const QUALITY_STYLE = {
  good: "bg-emerald-50 text-emerald-800 border-emerald-200",
  neutral: "bg-stone-50 text-stone-700 border-stone-200",
  bad: "bg-red-50 text-red-800 border-red-200",
};

export default function DayPanel({ day, isNe, isToday, onBook }: Props) {
  const { location, status, requestLocation } = useLocation();
  const [tab, setTab] = useState<"day" | "night">("day");
  const lang = isNe ? "ne" : "en";
  const tz = location.timeZone;

  const p = useMemo(
    () => getDayPanchang(day.adYear, day.adMonth, day.adDay, location.lat, location.lon, tz),
    [day.adYear, day.adMonth, day.adDay, location.lat, location.lon, tz]
  );
  const ref = dayKey(p.sunrise, tz);
  const t = (d: Date | null) => fmtTimeRel(d, ref, tz, isNe);
  const range = (r: Period) => `${fmtTime(r.start, tz, isNe)} – ${fmtTime(r.end, tz, isNe)}`;
  const now = Date.now();

  const monthName = isNe ? LUNAR_MONTH_NE[p.lunarMonth.purnimanta] : LUNAR_MONTH_EN[p.lunarMonth.purnimanta];
  const paksha = p.paksha === "shukla" ? (isNe ? "शुक्ल पक्ष" : "Shukla Paksha") : isNe ? "कृष्ण पक्ष" : "Krishna Paksha";
  const adhik = p.lunarMonth.adhik ? (isNe ? "अधिक " : "Adhik ") : "";
  const ad = new Date(day.adYear, day.adMonth, day.adDay);

  const Row = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
    <div className="py-2.5 flex items-start justify-between gap-3 border-b border-stone-100 last:border-0">
      <span className="text-sm text-stone-500 shrink-0">{label}</span>
      <span className="text-sm text-right">
        <span className="font-semibold text-stone-900">{value}</span>
        {sub && <span className="block text-xs text-stone-500">{sub}</span>}
      </span>
    </div>
  );

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      {/* Date header */}
      <div className="px-5 py-4 bg-[#0E1A2E] text-white">
        <div className="flex items-center justify-between text-xs text-stone-300">
          <span>{weekdayName(p.weekday, isNe)}</span>
          {isToday && <span className="px-2 py-0.5 rounded-full bg-[#D95B16] text-white font-semibold">{isNe ? "आज" : "Today"}</span>}
        </div>
        <h3 className="mt-1 font-serif text-2xl font-bold">{fmtBsDate(day.bsYear, day.bsMonth, day.bsDay, isNe)}</h3>
        <p className="text-sm text-stone-300">{fmtAdDate(ad, isNe)}</p>
        <p className="mt-2 text-sm text-amber-300 font-medium">
          {adhik}{monthName} {paksha} · {tithiName(p.tithi, lang)}
        </p>
      </div>

      {day.festivals.length > 0 && (
        <div className="px-5 py-3 border-b border-stone-100 flex flex-wrap gap-2">
          {day.festivals.map((f) => (
            <span
              key={f.id}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                f.holiday === "national" ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-[#B8480C] border-orange-200"
              }`}
              title={isNe ? f.noteNe : f.noteEn}
            >
              {isNe ? f.ne : f.en}
              {f.holiday === "national" && <span className="font-normal"> · {isNe ? "सार्वजनिक बिदा" : "Public holiday"}</span>}
              {f.holiday && f.holiday !== "national" && (isNe ? f.noteNe : f.noteEn) && (
                <span className="font-normal"> · {isNe ? f.noteNe : f.noteEn}</span>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="px-5 py-2">
        <Row label={isNe ? "तिथि" : "Tithi"} value={tithiName(p.tithi, lang)} sub={`${isNe ? "समाप्ति" : "until"} ${t(p.tithiEnd)}`} />
        <Row
          label={isNe ? "नक्षत्र" : "Nakshatra"}
          value={isNe ? NAKSHATRA_NE[p.nakshatra] : NAKSHATRA_EN[p.nakshatra]}
          sub={`${isNe ? "समाप्ति" : "until"} ${t(p.nakshatraEnd)}`}
        />
        <Row label={isNe ? "योग" : "Yoga"} value={isNe ? YOGA_NE[p.yoga] : YOGA_EN[p.yoga]} sub={`${isNe ? "समाप्ति" : "until"} ${t(p.yogaEnd)}`} />
        <Row
          label={isNe ? "करण" : "Karana"}
          value={p.karanas.slice(0, 2).map((k) => karanaName(k.index, lang)).join(", ")}
          sub={`${karanaName(p.karanas[0].index, lang)} ${isNe ? "समाप्ति" : "until"} ${t(p.karanas[0].end)}`}
        />
        <Row
          label={isNe ? "चन्द्र / सूर्य राशि" : "Moon / Sun sign"}
          value={`${isNe ? RASHI_NE[p.moonRashi] : RASHI_EN[p.moonRashi]} / ${isNe ? RASHI_NE[p.sunRashi] : RASHI_EN[p.sunRashi]}`}
        />
      </div>

      {/* Sun & Moon */}
      <div className="grid grid-cols-2 gap-px bg-stone-100 border-y border-stone-100">
        {[
          { icon: <IconSun size={16} className="text-amber-500" />, label: isNe ? "सूर्योदय" : "Sunrise", value: fmtTime(p.sunrise, tz, isNe) },
          { icon: <IconSun size={16} className="text-orange-600" />, label: isNe ? "सूर्यास्त" : "Sunset", value: fmtTime(p.sunset, tz, isNe) },
          { icon: <IconMoon size={16} className="text-indigo-500" />, label: isNe ? "चन्द्रोदय" : "Moonrise", value: fmtTime(p.moonrise, tz, isNe) },
          { icon: <IconMoon size={16} className="text-indigo-300" />, label: isNe ? "चन्द्रास्त" : "Moonset", value: fmtTime(p.moonset, tz, isNe) },
        ].map((c) => (
          <div key={c.label} className="bg-white px-5 py-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">{c.icon}{c.label}</div>
            <div className="mt-0.5 font-semibold text-stone-900 tabular-nums">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Muhurta windows */}
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm">
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <IconLeaf size={14} /> {isNe ? "शुभ मुहूर्त" : "Auspicious"}
          </div>
          <div className="mt-1"><span className="text-emerald-700">{isNe ? "अभिजित" : "Abhijit"}:</span> {range(p.abhijit)}</div>
          <div><span className="text-emerald-700">{isNe ? "ब्रह्म मुहूर्त" : "Brahma"}:</span> {range(p.brahmaMuhurta)}</div>
        </div>
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
            <IconWarning size={14} weight="fill" /> {isNe ? "अशुभ समय" : "Avoid"}
          </div>
          <div className="mt-1"><span className="text-red-700">{isNe ? "राहु काल" : "Rahu Kaal"}:</span> {range(p.rahuKaal)}</div>
          <div><span className="text-red-700">{isNe ? "यमगण्ड" : "Yamaganda"}:</span> {range(p.yamaganda)}</div>
          <div><span className="text-red-700">{isNe ? "गुलिक" : "Gulika"}:</span> {range(p.gulika)}</div>
        </div>
      </div>

      {/* Choghadiya */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-stone-900 text-sm">{isNe ? "चौघडिया" : "Choghadiya"}</h4>
          <div className="inline-flex p-0.5 rounded-lg bg-stone-100 text-xs">
            {(["day", "night"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 py-1 rounded-md ${tab === k ? "bg-white shadow-sm font-semibold text-stone-900" : "text-stone-600"}`}
              >
                {k === "day" ? (isNe ? "दिन" : "Day") : isNe ? "रात" : "Night"}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-1.5">
          {p.choghadiya[tab].map((c) => {
            const q = CHOGHADIYA_QUALITY[c.name];
            const current = isToday && now >= c.period.start.getTime() && now < c.period.end.getTime();
            return (
              <li key={c.period.start.getTime()} className={`px-2.5 py-1.5 rounded-md border text-xs ${QUALITY_STYLE[q]} ${current ? "ring-2 ring-[#D95B16]" : ""}`}>
                <span className="font-semibold">{isNe ? CHOGHADIYA_NE[c.name] : c.name}</span>
                <span className="block tabular-nums opacity-80">{range(c.period)}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Location */}
      <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs text-stone-500">
        <span className="flex items-center gap-1 min-w-0">
          <IconMapPin size={14} className="text-[#D95B16] shrink-0" />
          <span className="truncate">{isNe ? `${location.label} को समय अनुसार` : `Times for ${location.label}`}</span>
        </span>
        {location.source !== "device" && status !== "unsupported" && (
          <button onClick={requestLocation} disabled={status === "pending"} className="shrink-0 inline-flex items-center gap-1 font-semibold text-[#D95B16] hover:underline disabled:opacity-60">
            <IconLocate size={12} weight="fill" />
            {status === "pending" ? (isNe ? "खोज्दै..." : "Locating...") : isNe ? "मेरो स्थान" : "Use my location"}
          </button>
        )}
      </div>

      {onBook && (
        <div className="px-5 pb-5">
          <button
            onClick={() => onBook(`${isNe ? "साइत परामर्श" : "Muhurta consultation"}: ${fmtBsDate(day.bsYear, day.bsMonth, day.bsDay, isNe)}`)}
            className="w-full py-3 rounded-lg bg-[#D95B16] hover:bg-[#B8480C] text-white text-sm font-semibold"
          >
            {isNe ? "यो दिनको साइत परामर्श लिनुहोस्" : "Ask Guruji about this day"}
          </button>
        </div>
      )}
    </div>
  );
}
