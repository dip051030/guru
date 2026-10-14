"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconArrowRight, IconClose, IconStar } from "@/components/icons/CustomIcons";
import ZodiacIcon from "@/components/icons/ZodiacIcon";
import { useLanguage } from "@/context/LanguageContext";
import { RASHIS } from "@/data/rashi";
import { dailyReading, type DailyReading } from "@/utils/dailyRashifal";
import { getChandraGochar } from "@/utils/rashifal";
import { getSiderealMoonSign } from "@/utils/astronomy";
import {
  JUPITER_TEXT, RAHU_TEXT, SATURN_TEXT, SUN_TEXT, houseFrom, isFavourable, nextSignChange,
} from "@/utils/gochar";
import { julianDay, siderealGraha, type Graha } from "@/utils/ephemeris";
import { fmtAdDate, fmtBsDate, nums, weekdayName } from "@/lib/format";
import NepaliDate from "nepali-date-converter";

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

function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={label} title={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} size={14} weight={i < n ? "fill" : "regular"} className={i < n ? "text-amber-500" : "text-stone-300"} />
      ))}
    </span>
  );
}

const TONE_DOT = { good: "bg-emerald-500", mixed: "bg-amber-400", caution: "bg-rose-400" };

/** Shared, sign-independent transit data for a moment. */
function useSky(now: Date | null) {
  return useMemo(() => {
    if (!now) return null;
    const jd = julianDay(now);
    const sign = (g: Graha) => Math.floor(siderealGraha(g, jd).lon / 30);
    const retro = (g: Graha) => siderealGraha(g, jd).retrograde;
    const weekMoons = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 7);
      return { date: d, sign: getSiderealMoonSign(d).index };
    });
    const slow: Graha[] = ["Jupiter", "Saturn", "Rahu", "Ketu"];
    return {
      sun: sign("Sun"),
      mars: sign("Mars"),
      weekMoons,
      slow: slow.map((g) => ({ graha: g, sign: sign(g), retrograde: retro(g) })),
      changes: Object.fromEntries(
        (["Jupiter", "Saturn", "Rahu"] as Graha[]).map((g) => [g, nextSignChange(g, now, g === "Jupiter" ? 500 : 1000)])
      ) as Record<string, { date: Date; sign: number } | null>,
    };
  }, [now?.toDateString()]); // eslint-disable-line react-hooks/exhaustive-deps
}

export default function HoroscopeExplorer({ onOpenInquiry, className = "" }: HoroscopeExplorerProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [period, setPeriod] = useState<Period>("daily");
  const [open, setOpen] = useState<number | null>(null);

  // Readings depend on today's date in the visitor's clock, so compute after mount.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const sky = useSky(now);
  const daily = useMemo<DailyReading[] | null>(
    () => (now ? RASHIS.map((_, i) => dailyReading(i, now)) : null),
    [now?.toDateString()] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const rashiName = (i: number) => (isNe ? RASHIS[i].neName : RASHIS[i].enName);
  const starsLabel = (n: number) => (isNe ? `५ मध्ये ${nums(n, true)} तारा` : `${n} of 5 stars`);

  const weekFor = (i: number) =>
    sky!.weekMoons.map((d) => ({ ...d, ...getChandraGochar(i, d.sign) }));
  const yearFor = (i: number) =>
    sky!.slow.map((s) => {
      const house = houseFrom(i, s.sign);
      return { ...s, house, favourable: isFavourable(s.graha, house) };
    });
  const sadeSati = (i: number) => [12, 1, 2].includes(houseFrom(i, sky!.slow[1].sign));

  const dateLine = (() => {
    if (!now) return "";
    const b = new NepaliDate(now);
    return `${weekdayName(now.getDay(), isNe)}, ${fmtBsDate(b.getYear(), b.getMonth() + 1, b.getDate(), isNe)}`;
  })();

  const TABS: { id: Period; ne: string; en: string }[] = [
    { id: "daily", ne: "आजको", en: "Today" },
    { id: "weekly", ne: "यो हप्ता", en: "This week" },
    { id: "yearly", ne: "यो वर्ष", en: "This year" },
  ];

  /** Short text for the grid card. */
  const summary = (i: number) => {
    if (period === "daily") return isNe ? daily![i].overall.ne : daily![i].overall.en;
    if (period === "weekly") {
      const good = weekFor(i).filter((d) => d.favourable).map((d) => weekdayName(d.date.getDay(), isNe));
      return isNe ? `शुभ दिन: ${good.join(", ") || "कम"}। ${SUN_TEXT[houseFrom(i, sky!.sun) - 1].ne}को योग।` : `Good days: ${good.join(", ") || "few"}. The Sun brings ${SUN_TEXT[houseFrom(i, sky!.sun) - 1].en}.`;
    }
    const jup = yearFor(i)[0];
    return isNe ? JUPITER_TEXT[jup.house - 1].ne : JUPITER_TEXT[jup.house - 1].en;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Period switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="inline-flex p-1 bg-stone-100 rounded-full self-start">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setPeriod(t.id)}
              className={`px-4 sm:px-5 py-2 text-[15px] rounded-full transition-colors ${
                period === t.id ? "bg-white text-stone-900 font-semibold shadow-sm" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {isNe ? t.ne : t.en}
            </button>
          ))}
        </div>
        {dateLine && <p className="text-sm text-stone-500">{dateLine}</p>}
      </div>

      {/* 12 sign cards */}
      {!daily || !sky ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-48 rounded-2xl bg-stone-100 animate-pulse" />)}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RASHIS.map((r, i) => (
            <li key={r.id}>
              <button
                onClick={() => setOpen(i)}
                className="group w-full h-full text-left bg-white border border-stone-200 rounded-2xl p-5 hover:border-[#D95B16]/50 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D95B16]"
              >
                <div className="flex items-start gap-3">
                  <span className="w-12 h-12 rounded-full bg-orange-50 text-[#D95B16] flex items-center justify-center shrink-0">
                    <ZodiacIcon sign={r.id} size={26} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-stone-900">{isNe ? r.neName : r.enName}</h3>
                      {period === "daily" && <Stars n={daily[i].stars} label={starsLabel(daily[i].stars)} />}
                      {period === "yearly" && sadeSati(i) && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{isNe ? "साढेसाती" : "Sade Sati"}</span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 truncate">{r.namakshar}</p>
                  </div>
                </div>
                <p className="mt-3 text-[15px] leading-7 text-stone-700 line-clamp-3">{summary(i)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#B8480C] group-hover:gap-2 transition-all">
                  {isNe ? "पूरा पढ्नुहोस्" : "Read more"} <IconArrowRight size={14} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-xs text-stone-500">
        {isNe
          ? "राशिफल चन्द्र राशि अनुसार दिनको ग्रह गोचर (लाहिडी अयनांश) बाट गणना गरिएको सामान्य फल हो। व्यक्तिगत फलका लागि जन्म कुण्डली हेर्नुपर्छ।"
          : "Rashifal is a general reading by Moon sign, computed from the day's planetary transits (Lahiri). Personal results need your birth chart."}
      </p>

      {/* Full reading */}
      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-stone-900/40" />
          <Dialog.Content className="fixed z-50 inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-xl max-h-[88vh] overflow-y-auto bg-[#FFFDF9] rounded-t-3xl sm:rounded-2xl shadow-xl focus:outline-none">
            {open !== null && daily && sky && (
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="w-14 h-14 rounded-full bg-orange-50 text-[#D95B16] flex items-center justify-center shrink-0">
                    <ZodiacIcon sign={RASHIS[open].id} size={30} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <Dialog.Title className="font-serif text-2xl font-bold text-stone-900">
                      {isNe ? `${RASHIS[open].neName} राशि` : RASHIS[open].enName}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-stone-500">{RASHIS[open].namakshar}</Dialog.Description>
                  </div>
                  <Dialog.Close className="p-2 -mr-2 rounded-full text-stone-500 hover:bg-stone-100" aria-label={isNe ? "बन्द" : "Close"}>
                    <IconClose size={20} />
                  </Dialog.Close>
                </div>

                <div className="mt-5 inline-flex p-1 bg-stone-100 rounded-full">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPeriod(t.id)}
                      className={`px-4 py-1.5 text-sm rounded-full ${period === t.id ? "bg-white font-semibold text-stone-900 shadow-sm" : "text-stone-600"}`}
                    >
                      {isNe ? t.ne : t.en}
                    </button>
                  ))}
                </div>

                <div className="mt-5 text-[16px] leading-8 text-stone-700">
                  {period === "daily" && (() => {
                    const d = daily[open];
                    return (
                      <>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <Stars n={d.stars} label={starsLabel(d.stars)} />
                          <span>· {isNe ? `चन्द्रमा ${rashiName(d.moonSign)}मा, ${houseLabel(d.moonHouse, true)}` : `Moon in ${rashiName(d.moonSign)}, ${houseLabel(d.moonHouse, false)}`}</span>
                        </div>
                        <p className="mt-3 text-stone-800">{isNe ? d.overall.ne : d.overall.en}</p>
                        <dl className="mt-5 space-y-3">
                          {([
                            ["career", isNe ? "काम" : "Work"],
                            ["money", isNe ? "आर्थिक" : "Money"],
                            ["love", isNe ? "परिवार र प्रेम" : "Love & family"],
                            ["health", isNe ? "स्वास्थ्य" : "Health"],
                          ] as const).map(([k, label]) => (
                            <div key={k} className="flex gap-3">
                              <span className={`mt-3 w-2 h-2 rounded-full shrink-0 ${TONE_DOT[d[k].tone]}`} aria-hidden />
                              <div>
                                <dt className="text-sm font-semibold text-stone-900">{label}</dt>
                                <dd>{isNe ? d[k].ne : d[k].en}</dd>
                              </div>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                          {[
                            [isNe ? "शुभ रङ्ग" : "Colour", isNe ? d.luckyColour.ne : d.luckyColour.en],
                            [isNe ? "शुभ अंक" : "Number", nums(RASHIS[open].luckyNumber, isNe)],
                            [isNe ? "शुभ दिशा" : "Direction", isNe ? RASHIS[open].luckyDirNe : RASHIS[open].luckyDirEn],
                          ].map(([k, v]) => (
                            <div key={k} className="rounded-xl bg-stone-50 border border-stone-100 py-2.5">
                              <div className="text-xs text-stone-500">{k}</div>
                              <div className="font-semibold text-stone-900">{v}</div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-5 rounded-xl bg-amber-50/70 border border-amber-100 px-4 py-3 text-[15px]">
                          <span className="font-semibold text-[#B8480C]">{isNe ? "उपाय: " : "Remedy: "}</span>
                          {isNe ? RASHIS[open].remedyNe : RASHIS[open].remedyEn}
                        </p>
                      </>
                    );
                  })()}

                  {period === "weekly" && (
                    <>
                      <ul className="space-y-2">
                        {weekFor(open).map((d) => (
                          <li key={d.date.getTime()} className="flex items-center justify-between gap-3 rounded-xl border border-stone-100 bg-white px-4 py-2.5 text-[15px]">
                            <span>
                              <span className="font-semibold text-stone-900">{weekdayName(d.date.getDay(), isNe)}</span>
                              <span className="text-stone-500"> · {fmtAdDate(d.date, isNe)}</span>
                            </span>
                            <span className={`text-sm font-medium ${d.favourable ? "text-emerald-700" : "text-stone-500"}`}>
                              {d.favourable ? (isNe ? "शुभ" : "Good") : isNe ? "सामान्य" : "Ordinary"}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4">
                        {isNe
                          ? `यस हप्ता सूर्य तपाईंको ${houseLabel(houseFrom(open, sky.sun), true)}मा छन्, जसले ${SUN_TEXT[houseFrom(open, sky.sun) - 1].ne} देखाउँछ।`
                          : `The Sun is in your ${houseLabel(houseFrom(open, sky.sun), false)} this week, pointing to ${SUN_TEXT[houseFrom(open, sky.sun) - 1].en}.`}{" "}
                        {isFavourable("Mars", houseFrom(open, sky.mars))
                          ? isNe ? "मङ्गलले साहस र ऊर्जा दिनेछन्।" : "Mars lends courage and energy."
                          : isNe ? "मङ्गलका कारण हतार र झगडाबाट टाढा रहनुहोस्।" : "Mars advises against haste and quarrels."}
                      </p>
                    </>
                  )}

                  {period === "yearly" && (
                    <>
                      {sadeSati(open) && (
                        <p className="mb-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-[15px] text-amber-900">
                          {isNe ? "साढेसाती चलिरहेको छ: शनि तपाईंको चन्द्र राशिबाट १२, १ वा २ भावमा छन्।" : "Sade Sati is running: Saturn is in the 12th, 1st or 2nd house from your Moon sign."}
                        </p>
                      )}
                      <div className="space-y-4">
                        {yearFor(open).map((t) => {
                          const text = t.graha === "Jupiter" ? JUPITER_TEXT : t.graha === "Saturn" ? SATURN_TEXT : RAHU_TEXT;
                          const change = sky.changes[t.graha];
                          return (
                            <div key={t.graha}>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${t.favourable ? "bg-emerald-500" : "bg-rose-400"}`} aria-hidden />
                                <span className="text-sm font-semibold text-stone-900">
                                  {isNe ? `${GRAHA_NE[t.graha]} ${rashiName(t.sign)}मा` : `${t.graha} in ${rashiName(t.sign)}`} · {houseLabel(t.house, isNe)}
                                  {t.retrograde && t.graha !== "Rahu" && t.graha !== "Ketu" && (isNe ? " (वक्री)" : " (retrograde)")}
                                </span>
                              </div>
                              <p className="ml-4">{isNe ? text[t.house - 1].ne : text[t.house - 1].en}</p>
                              {change && (
                                <p className="ml-4 text-sm text-stone-500">
                                  {isNe
                                    ? `${fmtAdDate(change.date, true)} बाट ${rashiName(change.sign)}मा (${houseLabel(houseFrom(open, change.sign), true)})`
                                    : `Moves to ${rashiName(change.sign)} on ${fmtAdDate(change.date, false)} (${houseLabel(houseFrom(open, change.sign), false)})`}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-5 rounded-xl bg-amber-50/70 border border-amber-100 px-4 py-3 text-[15px]">
                        <span className="font-semibold text-[#B8480C]">{isNe ? "वार्षिक उपाय: " : "Remedy for the year: "}</span>
                        {isNe ? RASHIS[open].annualRemedyNe : RASHIS[open].annualRemedyEn}
                      </p>
                    </>
                  )}
                </div>

                {onOpenInquiry && (
                  <button
                    onClick={() => {
                      const i = open;
                      setOpen(null);
                      onOpenInquiry(isNe ? `${RASHIS[i].neName} राशि: कुण्डली परामर्श` : `${RASHIS[i].enName}: birth chart reading`);
                    }}
                    className="mt-6 w-full py-3 rounded-xl bg-[#D95B16] hover:bg-[#B8480C] text-white text-[15px] font-semibold"
                  >
                    {isNe ? "व्यक्तिगत कुण्डली परामर्श" : "Get a personal reading"}
                  </button>
                )}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
