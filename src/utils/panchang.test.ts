import { describe, it, expect } from "vitest";
import { getDayPanchang, tithiName, karanaName, NAKSHATRA_EN, LUNAR_MONTH_EN } from "./panchang";

const KTM = [27.7172, 85.324, "Asia/Kathmandu"] as const;
const t = (d: Date | null) => d && new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Kathmandu", day: "numeric", month: "short" }).format(d);

describe("day panchang", () => {
  it("Ghatasthapana 2083 (11 Oct 2026): Ashwin Shukla Pratipada at sunrise", () => {
    const p = getDayPanchang(2026, 9, 11, ...KTM);
    console.log("11 Oct 2026", tithiName(p.tithi, "en"), "ends", t(p.tithiEnd), NAKSHATRA_EN[p.nakshatra], "ends", t(p.nakshatraEnd),
      LUNAR_MONTH_EN[p.lunarMonth.amanta], p.lunarMonth.adhik, "rise", t(p.sunrise), "set", t(p.sunset), "moon", t(p.moonrise), t(p.moonset),
      p.karanas.map(k => karanaName(k.index, "en") + "→" + t(k.end)).join(", "), p.choghadiya.day.map(c => c.name).join(","));
    expect(p.tithi).toBe(1);
    expect(p.lunarMonth.amanta).toBe(6);
    expect(p.lunarMonth.adhik).toBe(false);
    expect(p.weekday).toBe(0); // Sunday
    expect(p.choghadiya.day[0].name).toBe("Udveg"); // Sunday day starts with Udveg
    expect(p.choghadiya.night[0].name).toBe("Shubh");
  });

  it("Lakshmi Puja 2081 (1 Nov 2024) has Amavasya by evening, Kartik Krishna (purnimanta)", () => {
    const p = getDayPanchang(2024, 10, 1, ...KTM);
    console.log("1 Nov 2024", p.tithi, tithiName(p.tithi, "en"), "ends", t(p.tithiEnd));
    expect([29, 30]).toContain(p.tithi);
    expect(p.lunarMonth.purnimanta).toBe(7); // Kartik
  });
});
