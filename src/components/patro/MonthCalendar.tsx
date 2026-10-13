"use client";

import React from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/icons/CustomIcons";
import { MONTH_NAMES_BS, WEEKDAYS, type CalendarDay, type MonthData } from "@/utils/nepaliCalendar";
import { tithiName } from "@/utils/panchang";
import { nums } from "@/lib/format";

export interface BsDate {
  y: number;
  m: number;
  d: number;
}

interface Props {
  data: MonthData;
  selected: BsDate;
  today: BsDate;
  isNe: boolean;
  years: number[];
  onSelect: (day: CalendarDay) => void;
  onNavigate: (year: number, month: number) => void;
}

const same = (a: BsDate, day: CalendarDay) => a.y === day.bsYear && a.m === day.bsMonth && a.d === day.bsDay;

export default function MonthCalendar({ data, selected, today, isNe, years, onSelect, onNavigate }: Props) {
  const { yearBs, monthIndex } = data;
  const prev = () => (monthIndex === 1 ? onNavigate(yearBs - 1, 12) : onNavigate(yearBs, monthIndex - 1));
  const next = () => (monthIndex === 12 ? onNavigate(yearBs + 1, 1) : onNavigate(yearBs, monthIndex + 1));
  const month = MONTH_NAMES_BS[monthIndex - 1];

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <button onClick={prev} aria-label={isNe ? "अघिल्लो महिना" : "Previous month"} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600">
            <IconChevronLeft size={18} />
          </button>
          <div className="min-w-[150px] text-center">
            <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
              {isNe ? month.ne : month.en} {nums(yearBs, isNe)}
            </h2>
            <p className="text-xs text-stone-500">{data.adSpan}</p>
          </div>
          <button onClick={next} aria-label={isNe ? "अर्को महिना" : "Next month"} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600">
            <IconChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={monthIndex}
            onChange={(e) => onNavigate(yearBs, Number(e.target.value))}
            aria-label={isNe ? "महिना" : "Month"}
            className="h-9 px-2 rounded-lg border border-stone-200 bg-white text-sm"
          >
            {MONTH_NAMES_BS.map((mm, i) => (
              <option key={mm.en} value={i + 1}>{isNe ? mm.ne : mm.en}</option>
            ))}
          </select>
          <select
            value={yearBs}
            onChange={(e) => onNavigate(Number(e.target.value), monthIndex)}
            aria-label={isNe ? "वर्ष" : "Year"}
            className="h-9 px-2 rounded-lg border border-stone-200 bg-white text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>{nums(y, isNe)}</option>
            ))}
          </select>
          <button
            onClick={() => onNavigate(today.y, today.m)}
            className="h-9 px-3 rounded-lg bg-[#D95B16] hover:bg-[#B8480C] text-white text-sm font-semibold"
          >
            {isNe ? "आज" : "Today"}
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-100">
        {WEEKDAYS.map((w, i) => (
          <div key={w.en} className={`py-2 text-center text-xs font-semibold ${i === 6 ? "text-red-600" : "text-stone-600"}`}>
            {isNe ? w.shortNe : w.shortEn}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7">
        {data.days.map((day) => {
          const isToday = same(today, day);
          const isSelected = same(selected, day);
          const event = day.festivals[0];
          const red = day.isHoliday;
          return (
            <button
              key={`${day.bsYear}-${day.bsMonth}-${day.bsDay}`}
              onClick={() => onSelect(day)}
              aria-pressed={isSelected}
              aria-label={`${day.bsDay} ${isNe ? MONTH_NAMES_BS[day.bsMonth - 1].ne : MONTH_NAMES_BS[day.bsMonth - 1].en}${event ? `, ${isNe ? event.ne : event.en}` : ""}`}
              className={`relative min-h-[64px] sm:min-h-[92px] p-1.5 sm:p-2 text-left border-b border-r border-stone-100 transition-colors flex flex-col ${
                isSelected ? "bg-orange-50 ring-2 ring-inset ring-[#D95B16]" : "hover:bg-stone-50"
              } ${day.isCurrentMonth ? "" : "opacity-40"}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-lg sm:text-2xl font-bold leading-none ${red ? "text-red-600" : "text-stone-900"} ${
                    isToday ? "rounded-full bg-[#D95B16] text-white w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-base sm:text-xl" : ""
                  }`}
                >
                  {nums(day.bsDay, isNe)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-400 tabular-nums">{day.adDay}</span>
              </div>
              <span className="mt-auto hidden sm:block text-[11px] text-stone-500 truncate">{tithiName(day.tithi, isNe ? "ne" : "en")}</span>
              {event && (
                <>
                  <span className={`hidden sm:block text-[11px] leading-tight truncate font-medium ${red ? "text-red-600" : "text-[#B8480C]"}`}>
                    {isNe ? event.ne : event.en}
                  </span>
                  <span className={`sm:hidden absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${red ? "bg-red-500" : "bg-[#D95B16]"}`} />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
