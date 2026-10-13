"use client";

import React, { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { useLanguage } from "@/context/LanguageContext";
import { getMonthCalendarData, type CalendarDay } from "@/utils/nepaliCalendar";
import { tithiName } from "@/utils/panchang";
import { fmtAdDate, fmtBsDate, weekdayName } from "@/lib/format";
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

  const todayCell = today && data?.days.find((d) => d.bsYear === today.bs.y && d.bsMonth === today.bs.m && d.bsDay === today.bs.d);
  const isTodaySelected = !!(today && selected && today.bs.y === selected.y && today.bs.m === selected.m && today.bs.d === selected.d);

  return (
    <section id="patro" className="w-full bg-[#FAF7F2] py-8 sm:py-12 px-4 sm:px-6 lg:px-10 scroll-mt-24">
      <div className="max-w-[1300px] mx-auto">
        <header className="mb-6">
          <p className="text-sm font-semibold text-[#D95B16]">{isNe ? "नेपाली पात्रो तथा पञ्चाङ्ग" : "Nepali Patro & Panchang"}</p>
          {today ? (
            <>
              <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                {weekdayName(today.ad.getDay(), isNe)}, {fmtBsDate(today.bs.y, today.bs.m, today.bs.d, isNe)}
              </h1>
              <p className="mt-1 text-stone-600">
                {fmtAdDate(today.ad, isNe)}
                {todayCell && <> · {tithiName(todayCell.tithi, isNe ? "ne" : "en")}</>}
                {todayCell?.festivals[0] && <> · <span className="text-[#B8480C] font-medium">{isNe ? todayCell.festivals[0].ne : todayCell.festivals[0].en}</span></>}
              </p>
            </>
          ) : (
            <div className="mt-2 h-10 w-72 max-w-full rounded-lg bg-stone-200/70 animate-pulse" />
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
