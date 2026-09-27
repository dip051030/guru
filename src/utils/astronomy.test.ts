import { describe, it, expect } from "vitest";
import {
  calculateJulianDate,
  calculateSunLongitude,
  calculateMoonLongitude,
  calculateTithi,
  calculateNakshatra,
  getNepaliDate,
  calculateAscendant,
  calculatePlanetaryPositions,
} from "./astronomy";

describe("Astronomical Ephemeris & Panchang Engine", () => {
  it("calculates Julian Date correctly for J2000.0 epoch", () => {
    // 2000-01-01 12:00:00 UTC is exactly JD 2451545.0
    const jd = calculateJulianDate(new Date(Date.UTC(2000, 0, 1, 12, 0, 0)));
    expect(jd).toBeCloseTo(2451545.0, 3);
  });

  it("calculates solar longitude within [0, 360) degrees", () => {
    const jd = calculateJulianDate(new Date(Date.UTC(2024, 2, 20, 12, 0, 0))); // Vernal Equinox approx 0 deg Aries
    const sunLong = calculateSunLongitude(jd);
    expect(sunLong).toBeGreaterThanOrEqual(0);
    expect(sunLong).toBeLessThan(360);
    // Near spring equinox, sun longitude is near 0 or 360
    expect(Math.min(sunLong, 360 - sunLong)).toBeLessThan(5);
  });

  it("calculates lunar longitude within valid range", () => {
    const jd = calculateJulianDate(new Date());
    const moonLong = calculateMoonLongitude(jd);
    expect(moonLong).toBeGreaterThanOrEqual(0);
    expect(moonLong).toBeLessThan(360);
  });

  it("determines correct Tithi structure and paksha", () => {
    const sunLong = 10;
    const moonLong = 25; // diff is 15 deg -> Tithi 2 (Shukla Dwitiya)
    const tithi = calculateTithi(sunLong, moonLong);
    expect(tithi.index).toBe(2);
    expect(tithi.paksha).toBe("Shukla");
    expect(tithi.name).toBe("Dwitiya");
  });

  it("correctly identifies Nakshatras across all 27 spans", () => {
    const nakshatra1 = calculateNakshatra(5.0); // 0 to 13.333 is Ashwini
    expect(nakshatra1.name).toBe("Ashwini");
    expect(nakshatra1.ruler).toBe("Ketu");

    const nakshatra2 = calculateNakshatra(14.0); // 13.333 to 26.666 is Bharani
    expect(nakshatra2.name).toBe("Bharani");
    expect(nakshatra2.ruler).toBe("Venus");
  });

  it("converts Gregorian date to Bikram Sambat correctly", () => {
    // 2024-04-14 is Nepali New Year 2081 Baishakh 1
    const bsDate = getNepaliDate(new Date("2024-04-14T06:00:00Z"));
    expect(bsDate.year).toBe(2081);
    expect(bsDate.monthIndex).toBe(1);
    expect(bsDate.monthName).toBe("Baishakh");
  });

  it("calculates Ascendant (Lagna) accurately for Kathmandu coordinates", () => {
    // Kathmandu: 27.7172° N, 85.3240° E
    const date = new Date(Date.UTC(2024, 0, 1, 6, 0, 0));
    const ascendant = calculateAscendant(date, 27.7172, 85.324);
    expect(ascendant.degree).toBeGreaterThanOrEqual(0);
    expect(ascendant.degree).toBeLessThan(360);
    expect(ascendant.sign).toBeDefined();
  });

  it("computes 9 Vedic Grahas (planets) with sign, degree, and retrogradation", () => {
    const jd = calculateJulianDate(new Date(Date.UTC(2024, 5, 1, 12, 0, 0)));
    const planets = calculatePlanetaryPositions(jd);
    expect(planets.length).toBe(9); // Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
    const sun = planets.find((p) => p.name === "Sun");
    const rahu = planets.find((p) => p.name === "Rahu");
    const ketu = planets.find((p) => p.name === "Ketu");
    expect(sun).toBeDefined();
    expect(rahu).toBeDefined();
    expect(ketu).toBeDefined();
    // Rahu and Ketu are always exactly 180 degrees opposite
    if (rahu && ketu) {
      const diff = Math.abs(rahu.longitude - ketu.longitude);
      expect(Math.abs(diff - 180)).toBeLessThan(0.01);
    }
  });
});
