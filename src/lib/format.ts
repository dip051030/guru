import { toNepaliNumber } from "@/utils/astronomy";
import { MONTH_NAMES_BS, WEEKDAYS } from "@/utils/nepaliCalendar";

export const nums = (v: number | string, isNe: boolean) => (isNe ? toNepaliNumber(v) : String(v));

/** "06:02 AM" in the given time zone, in Nepali digits when isNe. */
export function fmtTime(date: Date | null | undefined, timeZone: string, isNe: boolean): string {
  if (!date) return "—";
  if (!isNe) {
    return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone }).format(date);
  }
  const parts = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value);
  const min = parts.find((p) => p.type === "minute")?.value ?? "00";
  const period = h >= 4 && h < 12 ? "बिहान" : h >= 12 && h < 16 ? "दिउँसो" : h >= 16 && h < 20 ? "बेलुका" : "राति";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${toNepaliNumber(h12)}:${toNepaliNumber(min)}`;
}

/** Calendar date key (yyyy-mm-dd) of an instant in a time zone. */
export function dayKey(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

/** Time plus a "next day" marker when the instant falls after the reference day. */
export function fmtTimeRel(date: Date | null | undefined, refDay: string, timeZone: string, isNe: boolean) {
  if (!date) return "—";
  const t = fmtTime(date, timeZone, isNe);
  const k = dayKey(date, timeZone);
  if (k === refDay) return t;
  return k > refDay ? `${t} (${isNe ? "भोलि" : "next day"})` : `${t} (${isNe ? "हिजो" : "prev. day"})`;
}

export const bsMonthName = (m: number, isNe: boolean) => (isNe ? MONTH_NAMES_BS[m - 1].ne : MONTH_NAMES_BS[m - 1].en);
export const weekdayName = (w: number, isNe: boolean) => (isNe ? WEEKDAYS[w].ne : WEEKDAYS[w].en);

export function fmtBsDate(y: number, m: number, d: number, isNe: boolean) {
  return isNe ? `${toNepaliNumber(d)} ${bsMonthName(m, true)} ${toNepaliNumber(y)}` : `${d} ${bsMonthName(m, false)} ${y}`;
}

export function fmtAdDate(date: Date, isNe: boolean) {
  const s = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return isNe ? toNepaliNumber(s) : s;
}
