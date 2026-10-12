import { describe, it, expect } from "vitest";
import { getChandraGochar } from "./rashifal";

describe("Chandra gochar daily rashifal", () => {
  it("counts the Moon's house from the rashi", () => {
    expect(getChandraGochar(0, 0).house).toBe(1); // Moon in Mesha, for Mesha
    expect(getChandraGochar(0, 6).house).toBe(7); // Moon in Tula, for Mesha
    expect(getChandraGochar(11, 0).house).toBe(2); // Moon in Mesha, for Meena
  });

  it("marks the classical favourable houses 1, 3, 6, 7, 10, 11", () => {
    const good = Array.from({ length: 12 }, (_, i) => getChandraGochar(0, i))
      .filter((g) => g.favourable)
      .map((g) => g.house);
    expect(good).toEqual([1, 3, 6, 7, 10, 11]);
  });
});
