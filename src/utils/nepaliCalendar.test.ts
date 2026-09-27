import { describe, it, expect } from "vitest";
import {
  getMonthCalendarData,
  convertBsToAd,
  convertAdToBs,
  getKathmanduSunTimes,
  getDaysInBsMonth,
} from "./nepaliCalendar";

describe("Authentic Nepali Calendar Engine & Conversions", () => {
  it("accurately computes total days for Ashwin 2083 BS", () => {
    const days = getDaysInBsMonth(2083, 6);
    expect(days).toBe(31);
  });

  it("accurately generates Ashwin 2083 monthly calendar data", () => {
    const data = getMonthCalendarData(2083, 6);
    expect(data.monthName).toBe("असोज");
    expect(data.monthNameEn).toBe("Ashwin");
    expect(data.totalDays).toBe(31);

    // Day 11 should be Sunday Sep 27, 2026
    const day11 = data.days.find((d) => d.bsDay === 11 && d.isCurrentMonth);
    expect(day11).toBeDefined();
    expect(day11?.dayOfWeek).toBe(0); // Sunday
    expect(day11?.adDay).toBe(27);
    expect(day11?.adMonth).toBe("Sep");
    expect(day11?.adYear).toBe(2026);
  });

  it("converts 11 Ashwin 2083 BS to Gregorian Sep 27 2026 AD", () => {
    const res = convertBsToAd(2083, 6, 11);
    expect(res.adDate.getFullYear()).toBe(2026);
    expect(res.adDate.getMonth()).toBe(8); // September (0-based)
    expect(res.adDate.getDate()).toBe(27);
  });

  it("converts Sep 27 2026 AD back to 11 Ashwin 2083 BS", () => {
    const testDate = new Date(2026, 8, 27);
    const res = convertAdToBs(testDate);
    expect(res.yearBs).toBe(2083);
    expect(res.monthBs).toBe(6);
    expect(res.dayBs).toBe(11);
  });

  it("calculates accurate solar sunrise and sunset for Kathmandu", () => {
    const testDate = new Date(2026, 8, 27);
    const times = getKathmanduSunTimes(testDate);
    expect(times.sunrise).toMatch(/\d{2}:\d{2}\s+(AM|PM)/);
    expect(times.sunset).toMatch(/\d{2}:\d{2}\s+(AM|PM)/);
  });
});
