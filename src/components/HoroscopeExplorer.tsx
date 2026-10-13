"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IconArrowRight, IconShield, IconSparkles, IconSun } from "@/components/icons/CustomIcons";
import ZodiacIcon from "@/components/icons/ZodiacIcon";
import { useLanguage } from "@/context/LanguageContext";
import { RASHIS } from "@/data/rashi";
import { getSiderealMoonSign } from "@/utils/astronomy";
import { getChandraGochar } from "@/utils/rashifal";
import {
  JUPITER_TEXT, RAHU_TEXT, SATURN_TEXT, SUN_TEXT, houseFrom, isFavourable, nextSignChange, transitsFor,
} from "@/utils/gochar";
import type { Graha } from "@/utils/ephemeris";
import { fmtAdDate, nums, weekdayName } from "@/lib/format";

interface HoroscopeExplorerProps {
  onOpenInquiry?: (topic?: string) => void;
  className?: string;
  defaultRashiIndex?: number;
}

type Period = "daily" | "weekly" | "yearly";

const GRAHA_NE: Record<string, string> = {
  Sun: "सूर्य", Moon: "चन्द्र", Mars: "मङ्गल", Mercury: "बुध", Jupiter: "गुरु", Venus: "शुक्र", Saturn: "शनि", Rahu: "राहु", Ketu: "केतु",
};
const ordinal = (n: number) => `${n}${["st", "nd", "rd"][n - 1] ?? "th"}`;
const houseLabel = (n: number, isNe: boolean) => (isNe ? `${nums(n, true)}औं भाव` : `${ordinal(n)} house`);
const firstColour = (s: string) => s.split(/\s+(?:र|&|and)\s+/)[0];

export default function HoroscopeExplorer({ onOpenInquiry, className = "", defaultRashiIndex = 0 }: HoroscopeExplorerProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [idx, setIdx] = useState(defaultRashiIndex);
  const [period, setPeriod] = useState<Period>("daily");
  const rashi = RASHIS[idx];

  // All readings depend on "now", so they're computed on the client.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  const nowMs = now?.getTime();

  const moonSign = useMemo(() => (nowMs ? getSiderealMoonSign(new Date(nowMs)).index : null), [nowMs]);
  const gochar = moonSign === null ? null : getChandraGochar(idx, moonSign);

  // Weekly: Moon sign around sunrise for the next 7 days, plus Sun and Mars.
  const week = useMemo(() => {
    if (!nowMs) return null;
    const base = new Date(nowMs);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i, 7);
      const sign = getSiderealMoonSign(d).index;
      const g = getChandraGochar(idx, sign);
      return { date: d, sign, house: g.house, favourable: g.favourable };
    });
    const [sun, mars] = transitsFor(idx, base, ["Sun", "Mars"]);
    return { days, sun, mars };
  }, [nowMs, idx]);

  // Yearly: slow planets, their next sign change, and Sade Sati.
  const year = useMemo(() => {
    if (!nowMs) return null;
    const base = new Date(nowMs);
    const slow: Graha[] = ["Jupiter", "Saturn", "Rahu", "Ketu"];
    const transits = transitsFor(idx, base, slow);
    const changes = Object.fromEntries(
      (["Jupiter", "Saturn", "Rahu"] as Graha[]).map((g) => [g, nextSignChange(g, base, g === "Jupiter" ? 500 : 1000)])
    );
    return { transits, changes };
  }, [nowMs, idx]);

  const saturnHouse = year?.transits.find((t) => t.graha === "Saturn")?.house;
  const sadeSati = saturnHouse === 12 || saturnHouse === 1 || saturnHouse === 2;
  const scoreText = gochar ? `${nums(gochar.score, isNe)}%` : "—";
  const rashiName = (i: number) => (isNe ? RASHIS[i].neName : RASHIS[i].enName);

  const Badge = ({ good }: { good: boolean }) => (
    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${good ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-stone-100 text-stone-700 border-stone-200"}`}>
      {good ? (isNe ? "शुभ" : "Favourable") : isNe ? "सावधानी" : "Caution"}
    </span>
  );

  return (
    <div className={`w-full bg-white border border-stone-200 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="px-4 sm:px-6 py-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">{isNe ? "राशिफल" : "Rashifal"}</h3>
          <p className="text-xs text-stone-500">
            {isNe ? "ग्रह गोचरबाट गणना (लाहिडी अयनांश), चन्द्र राशि अनुसार" : "Computed from planetary transits (Lahiri), by Moon sign"}
          </p>
        </div>
        <div className="inline-flex p-1 bg-stone-100 rounded-lg self-start sm:self-auto">
          {(["daily", "weekly", "yearly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-1.5 text-sm rounded-md transition-colors ${period === p ? "bg-[#D95B16] text-white font-semibold" : "text-stone-700 hover:text-stone-900"}`}
            >
              {p === "daily" ? (isNe ? "दैनिक" : "Daily") : p === "weekly" ? (isNe ? "साप्ताहिक" : "Weekly") : isNe ? "वार्षिक" : "Yearly"}
            </button>
          ))}
        </div>
      </div>

      {/* Sign strip */}
      <div className="p-3 sm:p-4 bg-stone-50/70 border-b border-stone-100">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">
          {RASHIS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setIdx(i)}
              aria-pressed={i === idx}
              className={`py-2.5 flex flex-col items-center gap-1 rounded-lg border transition-colors ${
                i === idx ? "bg-[#0E1A2E] text-white border-[#0E1A2E]" : "bg-white text-stone-700 border-stone-200 hover:border-[#D95B16]"
              }`}
            >
              <ZodiacIcon sign={r.id} size={20} className={i === idx ? "text-amber-400" : "text-[#D95B16]"} />
              <span className="text-xs font-semibold">{isNe ? r.neName : r.enName}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* Sign header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 border border-orange-100 rounded-xl text-[#D95B16] flex items-center justify-center shrink-0">
              <ZodiacIcon sign={rashi.id} size={32} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {isNe ? `${rashi.neName} राशि` : rashi.enName}
              </h2>
              <p className="text-sm text-stone-500">
                {isNe ? `स्वामी: ${rashi.lordNe} · तत्व: ${rashi.elementNe}` : `Lord: ${rashi.lordEn} · Element: ${rashi.elementEn}`}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-4 gap-2 sm:gap-4 bg-stone-50 border border-stone-200 rounded-lg p-3 text-center">
            {[
              { k: isNe ? "शुभ अंक" : "Number", v: nums(rashi.luckyNumber, isNe) },
              { k: isNe ? "शुभ रङ्ग" : "Colour", v: firstColour(isNe ? rashi.luckyColorNe : rashi.luckyColorEn) },
              { k: isNe ? "शुभ दिशा" : "Direction", v: isNe ? rashi.luckyDirNe : rashi.luckyDirEn },
              { k: isNe ? "आज" : "Today", v: scoreText },
            ].map((x) => (
              <div key={x.k} className="px-1">
                <dt className="text-[11px] text-stone-500">{x.k}</dt>
                <dd className="text-sm font-semibold text-stone-900">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6">
          {!now && <div className="h-40 rounded-lg bg-stone-100 animate-pulse" />}

          {/* Daily */}
          {now && period === "daily" && gochar && moonSign !== null && (
            <div className="space-y-5">
              <div className="bg-stone-50 p-5 sm:p-6 border border-stone-200 rounded-lg">
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-stone-600">
                  <IconSun className="w-4 h-4 text-[#D95B16]" />
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-stone-200 rounded-md">
                    <ZodiacIcon sign={RASHIS[moonSign].id} size={14} className="text-[#D95B16]" />
                    {isNe ? `चन्द्रमा ${RASHIS[moonSign].neName} राशिमा` : `Moon in ${RASHIS[moonSign].enName}`}
                  </span>
                  <span className="px-2 py-1 bg-white border border-stone-200 rounded-md">{houseLabel(gochar.house, isNe)}</span>
                  <Badge good={gochar.favourable} />
                </div>
                <p className="text-base sm:text-lg font-serif text-stone-900 leading-relaxed">{isNe ? gochar.ne : gochar.en}</p>
                <div className="mt-4 pt-4 border-t border-stone-200 flex items-center gap-3">
                  <span className="text-xs text-stone-500 shrink-0">
                    {isNe ? "उर्जा" : "Energy"}: <strong className="text-stone-800">{isNe ? gochar.energyNe : gochar.energyEn}</strong>
                  </span>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${gochar.favourable ? "bg-[#D95B16]" : "bg-stone-400"}`} style={{ width: `${gochar.score}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-stone-700 shrink-0">{scoreText}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-3">
                <IconSparkles className="w-5 h-5 text-[#D95B16] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#B8480C]">{isNe ? "उपाय" : "Remedy"}</h4>
                  <p className="text-sm text-stone-800 mt-0.5">{isNe ? rashi.remedyNe : rashi.remedyEn}</p>
                </div>
              </div>
            </div>
          )}

          {/* Weekly */}
          {now && period === "weekly" && week && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-stone-900 mb-2">{isNe ? "यो हप्ताका दिन (चन्द्र गोचर)" : "This week, day by day (Moon transit)"}</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {week.days.map((d) => (
                    <li
                      key={d.date.getTime()}
                      className={`p-2.5 rounded-lg border text-center ${d.favourable ? "bg-emerald-50 border-emerald-200" : "bg-stone-50 border-stone-200"}`}
                    >
                      <div className="text-xs font-semibold text-stone-800">{weekdayName(d.date.getDay(), isNe)}</div>
                      <div className="text-[11px] text-stone-500">{fmtAdDate(d.date, isNe)}</div>
                      <div className="mt-1 text-xs">{isNe ? `चन्द्र ${rashiName(d.sign)}` : `Moon ${rashiName(d.sign)}`}</div>
                      <div className={`text-xs font-semibold ${d.favourable ? "text-emerald-700" : "text-stone-600"}`}>
                        {d.favourable ? (isNe ? "शुभ" : "Good") : isNe ? "सावधानी" : "Caution"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[week.sun, week.mars].map((t) => (
                  <div key={t.graha} className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-stone-900 text-sm">
                        {isNe ? `${GRAHA_NE[t.graha]} ${rashiName(t.sign)}मा` : `${t.graha} in ${rashiName(t.sign)}`} · {houseLabel(t.house, isNe)}
                      </span>
                      <Badge good={t.favourable} />
                    </div>
                    <p className="text-sm text-stone-700 mt-1">
                      {t.graha === "Sun"
                        ? isNe ? `सूर्य गोचरले ${SUN_TEXT[t.house - 1].ne} देखाउँछ।` : `The Sun's transit points to ${SUN_TEXT[t.house - 1].en}.`
                        : t.favourable
                          ? isNe ? "मङ्गलले ऊर्जा, साहस र प्रतिस्पर्धामा सफलता दिन्छ।" : "Mars lends energy, courage and success in competition."
                          : isNe ? "मङ्गलका कारण झगडा, चोटपटक र हतारमा सावधानी।" : "Mars warns against quarrels, injuries and haste."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yearly */}
          {now && period === "yearly" && year && (
            <div className="space-y-5">
              {sadeSati && (
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                  <strong>{isNe ? "साढेसाती चलिरहेको छ।" : "Sade Sati is running."}</strong>{" "}
                  {isNe ? "शनि तपाईंको चन्द्र राशिबाट १२, १ वा २ भावमा छन्।" : "Saturn is in the 12th, 1st or 2nd house from your Moon sign."}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {year.transits.map((t) => {
                  const text =
                    t.graha === "Jupiter" ? JUPITER_TEXT : t.graha === "Saturn" ? SATURN_TEXT : RAHU_TEXT;
                  const change = year.changes[t.graha];
                  return (
                    <div key={t.graha} className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-stone-900 text-sm">
                          {isNe ? `${GRAHA_NE[t.graha]} ${rashiName(t.sign)}मा` : `${t.graha} in ${rashiName(t.sign)}`}
                          {t.retrograde && t.graha !== "Rahu" && t.graha !== "Ketu" && (isNe ? " (वक्री)" : " (retrograde)")}
                        </span>
                        <Badge good={t.favourable} />
                      </div>
                      <div className="text-xs text-stone-500">{houseLabel(t.house, isNe)}</div>
                      <p className="text-sm text-stone-700 mt-1.5">{isNe ? text[t.house - 1].ne : text[t.house - 1].en}</p>
                      {change && (
                        <p className="text-xs text-stone-500 mt-2">
                          {isNe
                            ? `${fmtAdDate(change.date, true)} बाट ${rashiName(change.sign)}मा (${houseLabel(houseFrom(idx, change.sign), true)}, ${isFavourable(t.graha, houseFrom(idx, change.sign)) ? "शुभ" : "सावधानी"})`
                            : `Moves to ${rashiName(change.sign)} on ${fmtAdDate(change.date, false)} (${houseLabel(houseFrom(idx, change.sign), false)}, ${isFavourable(t.graha, houseFrom(idx, change.sign)) ? "favourable" : "caution"})`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg">
                <h4 className="text-sm font-semibold text-[#B8480C]">{isNe ? "वार्षिक उपाय" : "Remedy for the year"}</h4>
                <p className="text-sm text-stone-800 mt-0.5">{isNe ? rashi.annualRemedyNe : rashi.annualRemedyEn}</p>
              </div>
            </div>
          )}

          <div className="mt-7 pt-5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="flex items-start gap-2 text-xs text-stone-500">
              <IconShield className="w-4 h-4 text-[#D95B16] shrink-0" />
              {isNe
                ? "राशिफल चन्द्र राशिमा आधारित सामान्य गोचर फल हो। व्यक्तिगत फलका लागि जन्म कुण्डली र दशा हेर्नुपर्छ।"
                : "Rashifal gives general transit results by Moon sign. Personal results need your birth chart and dasha."}
            </p>
            {onOpenInquiry && (
              <button
                onClick={() => onOpenInquiry(isNe ? `${rashi.neName} राशि: कुण्डली परामर्श` : `${rashi.enName}: birth chart consultation`)}
                className="px-5 py-2.5 bg-[#D95B16] hover:bg-[#B8480C] text-white text-sm font-semibold rounded-lg flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                {isNe ? "कुण्डली परामर्श" : "Book a reading"}
                <IconArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
