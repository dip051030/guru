import { describe, it, expect } from "vitest";
import { birthChart, vimshottari } from "./kundali";

describe("birth chart", () => {
  it("matches Nehru's published chart (14 Nov 1889, 23:30 LMT Allahabad)", () => {
    // LMT at 81.85°E is UTC+5:27:24, so 23:30 LMT = 18:02:36 UTC.
    const birth = new Date(Date.UTC(1889, 10, 14, 18, 2, 36));
    const c = birthChart(birth, 25.4358, 81.8463);
    const sign = (g: string) => c.grahas.find((x) => x.graha === g)!.sign;
    expect(c.lagna.sign).toBe(3); // Karka
    expect(sign("Moon")).toBe(3); // Karka
    // The Sun (≈ Tula 30° / Vrischika 0°) sits on the sankranti that day, so it isn't asserted.
    expect(sign("Mercury")).toBe(6);
    expect(sign("Venus")).toBe(6);
    expect(sign("Mars")).toBe(5); // Kanya
    expect(sign("Jupiter")).toBe(8); // Dhanu
    expect(sign("Saturn")).toBe(4); // Simha
    expect(sign("Rahu")).toBe(2); // Mithuna
    expect(c.grahas.find((x) => x.graha === "Moon")!.house).toBe(1);
  });

  it("runs Vimshottari for 120 years from the Moon's nakshatra", () => {
    const birth = new Date(Date.UTC(2000, 0, 1));
    const d = vimshottari(birth, 0.5); // Moon at 0.5° Mesha = Ashwini (Ketu)
    expect(d[0].lord).toBe("Ketu");
    expect(d.map((x) => x.lord)).toEqual(["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]);
    const totalYears = (d[8].end.getTime() - d[0].start.getTime()) / (365.25 * 86400000);
    expect(totalYears).toBeGreaterThan(119);
  });
});
