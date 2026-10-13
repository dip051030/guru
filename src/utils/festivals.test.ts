import { describe, it, expect } from "vitest";
import { festivalsBetween } from "./festivals";

// Observed dates in Nepal (BS 2081-2082).
const KNOWN: [string, string][] = [
  ["janai-purnima", "2024-08-19"], ["gai-jatra", "2024-08-20"], ["janmashtami", "2024-08-26"],
  ["teej", "2024-09-06"], ["ghatasthapana", "2024-10-03"], ["vijaya-dashami", "2024-10-12"],
  ["laxmi-puja", "2024-11-01"], ["govardhan", "2024-11-02"], ["bhai-tika", "2024-11-03"],
  ["chhath", "2024-11-07"], ["sonam-lhosar", "2025-01-30"], ["shivaratri", "2025-02-26"],
  ["gyalpo-lhosar", "2025-02-28"], ["holi", "2025-03-13"], ["holi-terai", "2025-03-14"],
  ["ram-navami", "2025-04-06"], ["buddha-jayanti", "2025-05-12"], ["ghatasthapana", "2025-09-22"],
  ["vijaya-dashami", "2025-10-02"], ["laxmi-puja", "2025-10-21"], ["bhai-tika", "2025-10-23"],
  ["maghe-sankranti", "2025-01-14"], ["new-year", "2025-04-14"],
];

describe("computed festivals match observed dates", () => {
  const all = festivalsBetween(new Date(2024, 7, 1), 450);
  const dateOf = (id: string, year: string) => all.filter((o) => o.rule.id === id && o.date.startsWith(year)).map((o) => o.date);
  for (const [id, date] of KNOWN) {
    it(`${id} on ${date}`, () => {
      expect(dateOf(id, date.slice(0, 4))).toContain(date);
    });
  }
});
