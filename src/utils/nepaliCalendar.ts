/**
 * Nepali patro month data: Bikram Sambat dates (nepali-date-converter),
 * tithi at Kathmandu sunrise, and festivals/holidays from ./festivals.
 */

import NepaliDate from "nepali-date-converter";
import { toNepaliNumber } from "./astronomy";
import { festivalsOn, type FestivalRule } from "./festivals";
import { tithiAt } from "./panchang";
import { julianDay, localMidnight, riseSet } from "./ephemeris";

export interface CalendarDay {
  bsDay: number;
  bsMonth: number; // 1 = Baisakh
  bsYear: number;
  adDay: number;
  adMonth: number; // 0-based
  adYear: number;
  dayOfWeek: number; // 0 = Sunday
  /** Tithi 1-30 at Kathmandu sunrise. */
  tithi: number;
  festivals: FestivalRule[];
  isHoliday: boolean;
  isCurrentMonth: boolean;
}

export interface MonthData {
  yearBs: number;
  monthIndex: number; // 1 = Baisakh … 12 = Chaitra
  totalDays: number;
  /** AD months the BS month spans, e.g. "Sep/Oct 2026". */
  adSpan: string;
  days: CalendarDay[];
}

export const NEPALI_NUMERALS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliNum(n: number): string {
  return n
    .toString()
    .split("")
    .map((d) => NEPALI_NUMERALS[parseInt(d, 10)] || d)
    .join("");
}

export function toNepaliDigits(str: string | number): string {
  return toNepaliNumber(str);
}

export const MONTH_NAMES_BS = [
  { ne: "बैशाख", en: "Baisakh", span: "Apr/May" },
  { ne: "जेठ", en: "Jestha", span: "May/Jun" },
  { ne: "असार", en: "Ashadh", span: "Jun/Jul" },
  { ne: "श्रावण", en: "Shrawan", span: "Jul/Aug" },
  { ne: "भाद्र", en: "Bhadra", span: "Aug/Sep" },
  { ne: "असोज", en: "Ashwin", span: "Sep/Oct" },
  { ne: "कार्तिक", en: "Kartik", span: "Oct/Nov" },
  { ne: "मंसिर", en: "Mangsir", span: "Nov/Dec" },
  { ne: "पौष", en: "Poush", span: "Dec/Jan" },
  { ne: "माघ", en: "Magh", span: "Jan/Feb" },
  { ne: "फागुन", en: "Falgun", span: "Feb/Mar" },
  { ne: "चैत", en: "Chaitra", span: "Mar/Apr" },
];

export const WEEKDAYS = [
  { ne: "आइतवार", en: "Sunday", shortNe: "आइत", shortEn: "Sun", isWeekend: false },
  { ne: "सोमवार", en: "Monday", shortNe: "सोम", shortEn: "Mon", isWeekend: false },
  { ne: "मङ्गलवार", en: "Tuesday", shortNe: "मङ्गल", shortEn: "Tue", isWeekend: false },
  { ne: "बुधवार", en: "Wednesday", shortNe: "बुध", shortEn: "Wed", isWeekend: false },
  { ne: "बिहिवार", en: "Thursday", shortNe: "बिहि", shortEn: "Thu", isWeekend: false },
  { ne: "शुक्रवार", en: "Friday", shortNe: "शुक्र", shortEn: "Fri", isWeekend: false },
  { ne: "शनिवार", en: "Saturday", shortNe: "शनि", shortEn: "Sat", isWeekend: true },
];

/** Days in a Bikram Sambat month (month 1-12). */
export function getDaysInBsMonth(yearBs: number, monthIndex: number): number {
  let maxDay = 28;
  while (maxDay <= 32) {
    try {
      const testD = new NepaliDate(yearBs, monthIndex - 1, maxDay + 1);
      if (testD.getMonth() !== monthIndex - 1) break;
      maxDay++;
    } catch {
      break;
    }
  }
  return maxDay;
}

function tithiAtKathmanduSunrise(y: number, m: number, d: number) {
  const start = localMidnight(y, m, d, "Asia/Kathmandu");
  const { rise } = riseSet("sun", start, 27.7172, 85.324);
  return tithiAt(julianDay(rise ?? new Date(start + 6 * 3600000)));
}

function buildDay(yearBs: number, monthBs: number, dayBs: number, isCurrentMonth: boolean): CalendarDay {
  const ad = new NepaliDate(yearBs, monthBs - 1, dayBs).toJsDate();
  const y = ad.getFullYear(), m = ad.getMonth(), d = ad.getDate();
  const festivals = festivalsOn(y, m, d);
  const dayOfWeek = ad.getDay();
  return {
    bsDay: dayBs,
    bsMonth: monthBs,
    bsYear: yearBs,
    adDay: d,
    adMonth: m,
    adYear: y,
    dayOfWeek,
    tithi: tithiAtKathmanduSunrise(y, m, d),
    festivals,
    isHoliday: dayOfWeek === 6 || festivals.some((f) => f.holiday === "national"),
    isCurrentMonth,
  };
}

/** Month grid (whole weeks, Sunday first) for a BS month. */
export function getMonthCalendarData(yearBs: number, monthIndex: number): MonthData {
  const totalDays = getDaysInBsMonth(yearBs, monthIndex);
  const first = new NepaliDate(yearBs, monthIndex - 1, 1);
  const lead = first.getDay();
  const prevMonth = monthIndex === 1 ? 12 : monthIndex - 1;
  const prevYear = monthIndex === 1 ? yearBs - 1 : yearBs;
  const prevDays = getDaysInBsMonth(prevYear, prevMonth);
  const nextMonth = monthIndex === 12 ? 1 : monthIndex + 1;
  const nextYear = monthIndex === 12 ? yearBs + 1 : yearBs;

  const days: CalendarDay[] = [];
  for (let i = lead - 1; i >= 0; i--) days.push(buildDay(prevYear, prevMonth, prevDays - i, false));
  for (let d = 1; d <= totalDays; d++) days.push(buildDay(yearBs, monthIndex, d, true));
  for (let d = 1; days.length % 7 !== 0; d++) days.push(buildDay(nextYear, nextMonth, d, false));

  const firstAd = first.toJsDate();
  const lastAd = new NepaliDate(yearBs, monthIndex - 1, totalDays).toJsDate();
  const fmt = (dt: Date) => dt.toLocaleString("en-US", { month: "short" });
  const adSpan =
    firstAd.getFullYear() === lastAd.getFullYear()
      ? `${fmt(firstAd)}/${fmt(lastAd)} ${firstAd.getFullYear()}`
      : `${fmt(firstAd)} ${firstAd.getFullYear()}/${fmt(lastAd)} ${lastAd.getFullYear()}`;

  return { yearBs, monthIndex, totalDays, adSpan, days };
}

/**
 * 100% Genuine Date Conversion API
 */
export function convertBsToAd(yearBs: number, monthIndex: number, dayBs: number): {
  adDate: Date;
  formattedEn: string;
  formattedNe: string;
} {
  const nepaliDate = new NepaliDate(yearBs, monthIndex - 1, dayBs);
  const adDate = nepaliDate.toJsDate();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedEn = adDate.toLocaleDateString("en-US", options);
  const formattedNe = `${WEEKDAYS[adDate.getDay()].ne}, ${toNepaliNum(adDate.getDate())} ${adDate.toLocaleString("ne-NP", { month: "long" })} ${toNepaliNum(adDate.getFullYear())}`;

  return { adDate, formattedEn, formattedNe };
}

export function convertAdToBs(adDate: Date): {
  yearBs: number;
  monthBs: number;
  dayBs: number;
  formattedEn: string;
  formattedNe: string;
} {
  const nepaliDate = new NepaliDate(adDate);
  const yearBs = nepaliDate.getYear();
  const monthBs = nepaliDate.getMonth() + 1;
  const dayBs = nepaliDate.getDate();

  const monthMeta = MONTH_NAMES_BS[monthBs - 1];
  const dayName = WEEKDAYS[nepaliDate.getDay()];

  return {
    yearBs,
    monthBs,
    dayBs,
    formattedEn: `${dayName.en}, ${dayBs} ${monthMeta.en} ${yearBs} B.S.`,
    formattedNe: `${dayName.ne}, ${toNepaliNum(dayBs)} ${monthMeta.ne} ${toNepaliNum(yearBs)} वि.सं.`,
  };
}

