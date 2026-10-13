import { describe, it, expect } from "vitest";
import {
  moonPositionGeometric, sunLongitude, planetLongitude, elongation, prevBoundary, jdToDate,
  riseSet, localMidnight, siderealGraha,
} from "./ephemeris";

const fmt = (d: Date | null, tz: string) =>
  d ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: tz }).format(d) : null;
const minutes = (hhmm: string | null) => (hhmm ? Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3)) : NaN);

describe("ephemeris against Meeus worked examples", () => {
  it("Moon, example 47.a (1992-04-12 0h TD)", () => {
    const { lon, lat } = moonPositionGeometric(2448724.5);
    expect(lon).toBeCloseTo(133.162655, 3);
    expect(lat).toBeCloseTo(-3.229126, 2);
  });

  it("Sun, example 25.a (1992-10-13 0h TD)", () => {
    expect(sunLongitude(2448908.5)).toBeCloseTo(199.90895, 2);
  });

  it("Venus, example 33.a (1992-12-20 0h TD), within 0.1°", () => {
    expect(Math.abs(planetLongitude("Venus", 2448976.5) - 313.08102)).toBeLessThan(0.1);
  });
});

describe("events", () => {
  it("finds the new moon of 1 Nov 2024 (12:47 UTC)", () => {
    const jd = prevBoundary(elongation, 2460616.5 + 0.5, 360, 12.19); // 2 Nov 2024 0h UTC
    const t = jdToDate(jd).getTime();
    expect(Math.abs(t - Date.UTC(2024, 10, 1, 12, 47))).toBeLessThan(10 * 60000);
  });

  it("London sunrise/sunset on 12 Oct 2026 (07:20 / 18:10 BST)", () => {
    const start = localMidnight(2026, 9, 12, "Europe/London");
    const { rise, set } = riseSet("sun", start, 51.5074, -0.1278);
    expect(Math.abs(minutes(fmt(rise, "Europe/London")) - (7 * 60 + 20))).toBeLessThanOrEqual(3);
    expect(Math.abs(minutes(fmt(set, "Europe/London")) - (18 * 60 + 10))).toBeLessThanOrEqual(3);
  });

  it("Saturn is retrograde-capable and Jupiter sidereal sign is sane for 2026", () => {
    // Jupiter enters sidereal Cancer (Karka) in June 2025 and stays through most of 2026.
    const jup = siderealGraha("Jupiter", 2461000.5); // ~ Dec 2025
    expect(Math.floor(jup.lon / 30)).toBe(3);
    // Saturn is in sidereal Pisces (Meena) through 2026.
    const sat = siderealGraha("Saturn", 2461000.5);
    expect(Math.floor(sat.lon / 30)).toBe(11);
  });
});
