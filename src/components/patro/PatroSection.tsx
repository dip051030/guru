"use client";

import React, { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { useLanguage } from "@/context/LanguageContext";
import { getMonthCalendarData, type CalendarDay } from "@/utils/nepaliCalendar";
import { tithiName } from "@/utils/panchang";
import { fmtAdDate, fmtBsDate, nums, weekdayName } from "@/lib/format";
import { festivalsBetween } from "@/utils/festivals";
import MonthCalendar, { type BsDate } from "./MonthCalendar";
import DayPanel from "./DayPanel";
import UpcomingEvents from "./UpcomingEvents";

const YEARS = Array.from({ length: 2090 - 2000 + 1 }, (_, i) => 2000 + i);

function todayBs(): { bs: BsDate; ad: Date } {
  const n = new Date();
  const ad = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  const b = new NepaliDate(ad);
  return { bs: { y: b.getYear(), m: b.getMonth() + 1, d: b.getDate() }, ad };
}

export default function PatroSection({ onOpenInquiry }: { onOpenInquiry?: (topic?: string) => void }) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  // "Today" depends on the visitor's clock, so everything renders after mount.
  const [today, setToday] = useState<{ bs: BsDate; ad: Date } | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<BsDate | null>(null);

  useEffect(() => {
    const t = todayBs();
    setToday(t);
    setView({ y: t.bs.y, m: t.bs.m });
    setSelected(t.bs);
  }, []);

  const data = useMemo(() => (view ? getMonthCalendarData(view.y, view.m) : null), [view]);
  const selectedDay = useMemo(
    () => data?.days.find((d) => selected && d.bsYear === selected.y && d.bsMonth === selected.m && d.bsDay === selected.d) ?? null,
    [data, selected]
  );

  const pick = (day: CalendarDay) => {
    setSelected({ y: day.bsYear, m: day.bsMonth, d: day.bsDay });
    if (day.bsMonth !== view?.m || day.bsYear !== view?.y) setView({ y: day.bsYear, m: day.bsMonth });
    // On phones the details sit below the grid; bring them into view.
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => document.getElementById("day-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };
  const navigate = (y: number, m: number) => {
    const clampedY = Math.min(2090, Math.max(2000, y));
    setView({ y: clampedY, m });
    if (today && today.bs.y === clampedY && today.bs.m === m) setSelected(today.bs);
    else setSelected({ y: clampedY, m, d: 1 });
  };
  const pickAd = (ad: Date) => {
    const b = new NepaliDate(new Date(ad.getFullYear(), ad.getMonth(), ad.getDate(), 12));
    const bs = { y: b.getYear(), m: b.getMonth() + 1, d: b.getDate() };
    setView({ y: bs.y, m: bs.m });
    setSelected(bs);
    document.getElementById("patro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextFestival = useMemo(() => {
    if (!today) return null;
    const from = today.ad;
    const next = festivalsBetween(from, 60).find((o) => !o.rule.minor);
    if (!next) return null;
    const [y, m, d] = next.date.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return { rule: next.rule, date, days: Math.round((date.getTime() - from.getTime()) / 86400000) };
  }, [today]);
  const todayCell = today && data?.days.find((d) => d.bsYear === today.bs.y && d.bsMonth === today.bs.m && d.bsDay === today.bs.d);
  const isTodaySelected = !!(today && selected && today.bs.y === selected.y && today.bs.m === selected.m && today.bs.d === selected.d);

  return (
    <section id="patro" className="relative w-full bg-[#FAF7F2] pb-8 sm:pb-12 scroll-mt-24 overflow-hidden">
      {/* Himalayan sunrise backdrop, fading into the page */}
      <div className="absolute inset-x-0 top-0 h-[300px] sm:h-[380px] lg:h-[440px] pointer-events-none select-none" aria-hidden="true">
        <picture>
          <source media="(max-width: 640px)" srcSet="/himalayan-bg-sm.webp" />
          <img src="/himalayan-bg.webp" alt="" className="w-full h-full object-cover object-[65%_center] sm:object-center" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/10 via-[#FAF7F2]/35 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/70 via-[#FAF7F2]/20 to-transparent sm:from-[#FAF7F2]/60" />
      </div>

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">
        <header className="pt-8 sm:pt-14 lg:pt-16 pb-6 sm:pb-10">
          <p className="text-sm font-semibold text-[#B8480C]">{isNe ? "नेपाली पात्रो तथा पञ्चाङ्ग" : "Nepali Patro & Panchang"}</p>
          {today ? (
            <>
              <h1 className="mt-1 font-serif text-[32px] leading-tight sm:text-5xl font-bold text-stone-900">
                <span className="block text-lg sm:text-2xl font-semibold text-stone-700">{weekdayName(today.ad.getDay(), isNe)}</span>
                {fmtBsDate(today.bs.y, today.bs.m, today.bs.d, isNe)}
              </h1>
              <p className="mt-2 text-stone-700 sm:text-lg">
                {fmtAdDate(today.ad, isNe)}
                {todayCell && <> · {tithiName(todayCell.tithi, isNe ? "ne" : "en")}</>}
                {todayCell?.festivals[0] && <> · <span className="text-[#B8480C] font-semibold">{isNe ? todayCell.festivals[0].ne : todayCell.festivals[0].en}</span></>}
              </p>
              {nextFestival && (
                <button
                  onClick={() => pickAd(nextFestival.date)}
                  className="mt-4 inline-flex items-center gap-2 max-w-full px-3.5 py-2 rounded-full bg-white/85 backdrop-blur border border-white text-sm text-stone-800 shadow-sm hover:bg-white"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D95B16] shrink-0" />
                  <span className="truncate">
                    {isNe ? "अर्को चाड" : "Next"}: <strong>{isNe ? nextFestival.rule.ne : nextFestival.rule.en}</strong>
                  </span>
                  <span className="text-stone-500 shrink-0">· {nextFestival.days === 0 ? (isNe ? "आज" : "today") : nextFestival.days === 1 ? (isNe ? "भोलि" : "tomorrow") : isNe ? `${nums(nextFestival.days, true)} दिनमा` : `in ${nextFestival.days} days`}</span>
                </button>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#horoscope-section" className="px-4 py-2.5 rounded-lg bg-[#0E1A2E] text-white text-sm font-semibold hover:bg-[#1A2740]">
                  {isNe ? "आजको राशिफल" : "Today's rashifal"}
                </a>
                <a href="/ephemeris" className="px-4 py-2.5 rounded-lg bg-white/90 border border-stone-200 text-stone-900 text-sm font-semibold hover:bg-white">
                  {isNe ? "कुण्डली हेर्नुहोस्" : "Birth chart"}
                </a>
                {onOpenInquiry && (
                  <button onClick={() => onOpenInquiry()} className="px-4 py-2.5 rounded-lg bg-[#D95B16] text-white text-sm font-semibold hover:bg-[#B8480C]">
                    {isNe ? "परामर्श बुक गर्नुहोस्" : "Book a consultation"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="h-12 w-72 max-w-full rounded-lg bg-white/60 animate-pulse" />
              <div className="h-5 w-56 max-w-full rounded bg-white/60 animate-pulse" />
            </div>
          )}
        </header>

        {data && today && selected && selectedDay ? (
          // Phones: calendar, then the selected day, then upcoming events.
          // Desktop: day panel pinned in the right column beside both.
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8">
              <MonthCalendar data={data} selected={selected} today={today.bs} isNe={isNe} years={YEARS} onSelect={pick} onNavigate={navigate} />
            </div>
            <div id="day-panel" className="lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 scroll-mt-24">
              <DayPanel day={selectedDay} isNe={isNe} isToday={isTodaySelected} onBook={onOpenInquiry} />
            </div>
            <div className="lg:col-span-8">
              <UpcomingEvents isNe={isNe} from={today.ad} onPick={pickAd} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 h-[520px] rounded-xl bg-white border border-stone-200 animate-pulse" />
            <div className="lg:col-span-4 h-[520px] rounded-xl bg-white border border-stone-200 animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}
