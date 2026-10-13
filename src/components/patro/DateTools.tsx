"use client";

import React, { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { MONTH_NAMES_BS, getDaysInBsMonth } from "@/utils/nepaliCalendar";
import { festivalsOn } from "@/utils/festivals";
import { tithiAt, tithiName, pakshaOf } from "@/utils/panchang";
import { julianDay, localMidnight, riseSet } from "@/utils/ephemeris";
import { fmtAdDate, fmtBsDate, nums, weekdayName } from "@/lib/format";

type Tool = "convert" | "age" | "between";

const pad = (n: number) => String(n).padStart(2, "0");
const isoOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseIso = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};

function tithiOn(ad: Date) {
  const start = localMidnight(ad.getFullYear(), ad.getMonth(), ad.getDate(), "Asia/Kathmandu");
  const { rise } = riseSet("sun", start, 27.7172, 85.324);
  return tithiAt(julianDay(rise ?? new Date(start + 6 * 3600000)));
}

/** Calendar difference a → b as years, months, days (AD). */
function diffYmd(a: Date, b: Date) {
  let y = b.getFullYear() - a.getFullYear();
  let m = b.getMonth() - a.getMonth();
  let d = b.getDate() - a.getDate();
  if (d < 0) {
    m -= 1;
    d += new Date(b.getFullYear(), b.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  return { y, m, d };
}

function BsPicker({ value, onChange, isNe }: { value: { y: number; m: number; d: number }; onChange: (v: { y: number; m: number; d: number }) => void; isNe: boolean }) {
  const days = getDaysInBsMonth(value.y, value.m);
  const cls = "h-10 px-2 rounded-lg border border-stone-200 bg-white text-sm";
  return (
    <div className="grid grid-cols-3 gap-2">
      <select className={cls} value={value.y} onChange={(e) => onChange({ ...value, y: Number(e.target.value), d: Math.min(value.d, getDaysInBsMonth(Number(e.target.value), value.m)) })} aria-label={isNe ? "वर्ष" : "Year"}>
        {Array.from({ length: 2090 - 2000 + 1 }, (_, i) => 2000 + i).map((y) => <option key={y} value={y}>{nums(y, isNe)}</option>)}
      </select>
      <select className={cls} value={value.m} onChange={(e) => onChange({ ...value, m: Number(e.target.value), d: Math.min(value.d, getDaysInBsMonth(value.y, Number(e.target.value))) })} aria-label={isNe ? "महिना" : "Month"}>
        {MONTH_NAMES_BS.map((mm, i) => <option key={mm.en} value={i + 1}>{isNe ? mm.ne : mm.en}</option>)}
      </select>
      <select className={cls} value={value.d} onChange={(e) => onChange({ ...value, d: Number(e.target.value) })} aria-label={isNe ? "गते" : "Day"}>
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{nums(d, isNe)}</option>)}
      </select>
    </div>
  );
}

function DateToolsInner({ isNe }: { isNe: boolean }) {
  const today = useMemo(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);
  const todayBs = useMemo(() => new NepaliDate(today), [today]);
  const [tool, setTool] = useState<Tool>("convert");
  const [dir, setDir] = useState<"bs2ad" | "ad2bs">("bs2ad");
  const [bs, setBs] = useState({ y: todayBs.getYear(), m: todayBs.getMonth() + 1, d: todayBs.getDate() });
  const [adStr, setAdStr] = useState(isoOf(today));
  const [dobMode, setDobMode] = useState<"bs" | "ad">("bs");
  const [dobBs, setDobBs] = useState({ y: 2050, m: 1, d: 1 });
  const [dobAd, setDobAd] = useState("1993-04-14");
  const [fromStr, setFromStr] = useState(isoOf(today));
  const [toStr, setToStr] = useState(isoOf(new Date(today.getFullYear(), 11, 31)));

  const conversion = useMemo(() => {
    try {
      const ad = dir === "bs2ad" ? new NepaliDate(bs.y, bs.m - 1, bs.d).toJsDate() : parseIso(adStr);
      if (!ad) return null;
      const b = new NepaliDate(ad);
      const tithi = tithiOn(ad);
      return {
        ad,
        bs: { y: b.getYear(), m: b.getMonth() + 1, d: b.getDate() },
        tithi,
        festivals: festivalsOn(ad.getFullYear(), ad.getMonth(), ad.getDate()).filter((f) => !f.minor),
      };
    } catch {
      return null;
    }
  }, [dir, bs, adStr]);

  const age = useMemo(() => {
    try {
      const dob = dobMode === "bs" ? new NepaliDate(dobBs.y, dobBs.m - 1, dobBs.d).toJsDate() : parseIso(dobAd);
      if (!dob || dob > today) return null;
      const bsDob = new NepaliDate(dob);
      const ymd = diffYmd(dob, today);
      const totalDays = Math.round((today.getTime() - dob.getTime()) / 86400000);
      // Next birthday by BS date.
      let next: Date | null = null;
      for (const y of [todayBs.getYear(), todayBs.getYear() + 1]) {
        try {
          const cand = new NepaliDate(y, bsDob.getMonth(), Math.min(bsDob.getDate(), getDaysInBsMonth(y, bsDob.getMonth() + 1))).toJsDate();
          if (cand >= today) { next = cand; break; }
        } catch { /* out of range */ }
      }
      return { ymd, totalDays, dob, next };
    } catch {
      return null;
    }
  }, [dobMode, dobBs, dobAd, today, todayBs]);

  const between = useMemo(() => {
    const a = parseIso(fromStr);
    const b = parseIso(toStr);
    if (!a || !b) return null;
    const [s, e] = a <= b ? [a, b] : [b, a];
    const days = Math.round((e.getTime() - s.getTime()) / 86400000);
    let saturdays = 0;
    for (let i = 0; i <= days; i++) if (new Date(s.getFullYear(), s.getMonth(), s.getDate() + i).getDay() === 6) saturdays++;
    return { days, weeks: Math.floor(days / 7), rem: days % 7, saturdays, ymd: diffYmd(s, e) };
  }, [fromStr, toStr]);

  const tabs: { id: Tool; ne: string; en: string }[] = [
    { id: "convert", ne: "मिति रूपान्तरण", en: "Date converter" },
    { id: "age", ne: "उमेर गणना", en: "Age calculator" },
    { id: "between", ne: "दिन गणना", en: "Days between" },
  ];
  const inputCls = "h-10 w-full px-3 rounded-lg border border-stone-200 bg-white text-sm";
  const Ymd = ({ v }: { v: { y: number; m: number; d: number } }) => (
    <span>
      {nums(v.y, isNe)} {isNe ? "वर्ष" : "years"}, {nums(v.m, isNe)} {isNe ? "महिना" : "months"}, {nums(v.d, isNe)} {isNe ? "दिन" : "days"}
    </span>
  );

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      <div className="flex border-b border-stone-100 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`px-4 sm:px-5 py-3.5 text-sm whitespace-nowrap border-b-2 -mb-px ${
              tool === t.id ? "border-[#D95B16] text-[#D95B16] font-semibold" : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            {isNe ? t.ne : t.en}
          </button>
        ))}
      </div>

      <div className="p-5">
        {tool === "convert" && (
          <div className="space-y-4">
            <div className="inline-flex p-0.5 rounded-lg bg-stone-100 text-sm">
              {(["bs2ad", "ad2bs"] as const).map((k) => (
                <button key={k} onClick={() => setDir(k)} className={`px-3 py-1.5 rounded-md ${dir === k ? "bg-white shadow-sm font-semibold" : "text-stone-600"}`}>
                  {k === "bs2ad" ? (isNe ? "वि.सं. → ई.सं." : "BS → AD") : isNe ? "ई.सं. → वि.सं." : "AD → BS"}
                </button>
              ))}
            </div>
            {dir === "bs2ad" ? (
              <BsPicker value={bs} onChange={setBs} isNe={isNe} />
            ) : (
              <input type="date" value={adStr} onChange={(e) => setAdStr(e.target.value)} className={inputCls} aria-label="AD date" />
            )}
            {conversion ? (
              <div className="rounded-lg bg-stone-50 border border-stone-200 p-4">
                <div className="text-lg font-bold text-stone-900">
                  {dir === "bs2ad" ? fmtAdDate(conversion.ad, isNe) : fmtBsDate(conversion.bs.y, conversion.bs.m, conversion.bs.d, isNe)}
                </div>
                <div className="text-sm text-stone-600 mt-0.5">
                  {weekdayName(conversion.ad.getDay(), isNe)} · {pakshaOf(conversion.tithi) === "shukla" ? (isNe ? "शुक्ल" : "Shukla") : isNe ? "कृष्ण" : "Krishna"}{" "}
                  {tithiName(conversion.tithi, isNe ? "ne" : "en")}
                </div>
                {conversion.festivals.length > 0 && (
                  <div className="mt-2 text-sm font-medium text-[#B8480C]">{conversion.festivals.map((f) => (isNe ? f.ne : f.en)).join(", ")}</div>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-600">{isNe ? "यो मिति रूपान्तरण गर्न सकिएन।" : "This date is outside the supported range."}</p>
            )}
          </div>
        )}

        {tool === "age" && (
          <div className="space-y-4">
            <div className="inline-flex p-0.5 rounded-lg bg-stone-100 text-sm">
              {(["bs", "ad"] as const).map((k) => (
                <button key={k} onClick={() => setDobMode(k)} className={`px-3 py-1.5 rounded-md ${dobMode === k ? "bg-white shadow-sm font-semibold" : "text-stone-600"}`}>
                  {k === "bs" ? (isNe ? "जन्म मिति (वि.सं.)" : "Birth date (BS)") : isNe ? "जन्म मिति (ई.सं.)" : "Birth date (AD)"}
                </button>
              ))}
            </div>
            {dobMode === "bs" ? (
              <BsPicker value={dobBs} onChange={setDobBs} isNe={isNe} />
            ) : (
              <input type="date" value={dobAd} max={isoOf(today)} onChange={(e) => setDobAd(e.target.value)} className={inputCls} aria-label="Birth date" />
            )}
            {age ? (
              <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 space-y-1 text-sm text-stone-700">
                <div className="text-lg font-bold text-stone-900"><Ymd v={age.ymd} /></div>
                <div>{isNe ? `कुल ${nums(age.totalDays.toLocaleString("en-IN"), true)} दिन` : `${age.totalDays.toLocaleString("en-IN")} days in total`}</div>
                <div>
                  {isNe ? "जन्म" : "Born"}: {fmtAdDate(age.dob, isNe)} · {weekdayName(age.dob.getDay(), isNe)}
                </div>
                {age.next && (
                  <div>
                    {isNe ? "अर्को जन्मदिन (वि.सं. अनुसार)" : "Next birthday (BS)"}: {fmtAdDate(age.next, isNe)} ·{" "}
                    {isNe
                      ? `${nums(Math.round((age.next.getTime() - today.getTime()) / 86400000), true)} दिन बाँकी`
                      : `${Math.round((age.next.getTime() - today.getTime()) / 86400000)} days to go`}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-600">{isNe ? "मान्य जन्म मिति छान्नुहोस्।" : "Choose a valid birth date."}</p>
            )}
          </div>
        )}

        {tool === "between" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm text-stone-600">
                {isNe ? "देखि" : "From"}
                <input type="date" value={fromStr} onChange={(e) => setFromStr(e.target.value)} className={`${inputCls} mt-1`} />
              </label>
              <label className="text-sm text-stone-600">
                {isNe ? "सम्म" : "To"}
                <input type="date" value={toStr} onChange={(e) => setToStr(e.target.value)} className={`${inputCls} mt-1`} />
              </label>
            </div>
            {between && (
              <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 space-y-1 text-sm text-stone-700">
                <div className="text-lg font-bold text-stone-900">{isNe ? `${nums(between.days, true)} दिन` : `${between.days} days`}</div>
                <div>{isNe ? `${nums(between.weeks, true)} हप्ता ${nums(between.rem, true)} दिन` : `${between.weeks} weeks ${between.rem} days`}</div>
                <div><Ymd v={between.ymd} /></div>
                <div>{isNe ? `बीचमा ${nums(between.saturdays, true)} वटा शनिबार` : `${between.saturdays} Saturdays in between`}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * "Today" depends on the visitor's clock and time zone, which the server can't
 * know, so the tools mount in the browser to avoid a hydration mismatch.
 */
export default function DateTools({ isNe }: { isNe: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[340px] rounded-xl bg-white border border-stone-200 animate-pulse" />;
  return <DateToolsInner isNe={isNe} />;
}
