import { describe, it, expect } from "vitest";
import { dailyReading } from "./dailyRashifal";

describe("daily rashifal", () => {
  const day = new Date(2026, 9, 14);
  it("is stable for the same day and sign", () => {
    expect(dailyReading(0, day)).toEqual(dailyReading(0, day));
  });
  it("gives every sign a full reading with 1-5 stars", () => {
    for (let r = 0; r < 12; r++) {
      const d = dailyReading(r, day);
      expect(d.overall.ne.length).toBeGreaterThan(10);
      for (const k of ["career", "money", "love", "health"] as const) expect(d[k].ne.length).toBeGreaterThan(5);
      expect(d.stars).toBeGreaterThanOrEqual(1);
      expect(d.stars).toBeLessThanOrEqual(5);
    }
  });
  it("all signs share today's Moon sign but get different houses", () => {
    const houses = new Set(Array.from({ length: 12 }, (_, r) => dailyReading(r, day).moonHouse));
    expect(houses.size).toBe(12);
    expect(new Set(Array.from({ length: 12 }, (_, r) => dailyReading(r, day).moonSign)).size).toBe(1);
  });
  it("changes from one day to the next", () => {
    const a = Array.from({ length: 12 }, (_, r) => dailyReading(r, day).career.ne + dailyReading(r, day).love.ne).join();
    const next = new Date(2026, 9, 15);
    const b = Array.from({ length: 12 }, (_, r) => dailyReading(r, next).career.ne + dailyReading(r, next).love.ne).join();
    expect(a).not.toBe(b);
  });
});
