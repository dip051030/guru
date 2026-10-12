import { describe, it, expect } from "vitest";
import { renderBookingEmail, whatsappNumber } from "./bookingEmail";

const fields: [string, string][] = [
  ["Booking ref", "VSK-4821"],
  ["Name", "Sita Sharma"],
  ["Phone", "+44 7700 900123"],
  ["Email", "sita@example.com"],
  ["Service", "Vastu Shastra (Home & Office Harmony)"],
  ["Mode", "Online video"],
  ["Date of birth", "1990-04-14"],
  ["Question", "We are moving house next month."],
  ["Referral", "Instagram"],
];

describe("booking email template", () => {
  it("builds subject, actions and grouped sections", () => {
    const { subject, html, text } = renderBookingEmail({ source: "Contact page", fields });
    expect(subject).toBe("New booking: Sita Sharma — Vastu Shastra (Home & Office Harmony)");
    expect(html).toContain("mailto:sita@example.com");
    expect(html).toContain("https://wa.me/447700900123");
    expect(html).toContain("tel:+447700900123");
    expect(html).toContain("Birth details");
    expect(html).toContain("Their message");
    expect(html).toContain("Other details"); // unknown "Referral" field
    expect(text).toContain("Phone: +44 7700 900123");
  });

  it("escapes visitor input", () => {
    const { html } = renderBookingEmail({
      source: "Test",
      fields: [["Name", "<script>alert(1)</script>"], ["Phone", "+977 9800000000"]],
    });
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
  });

  it("only offers WhatsApp for international numbers", () => {
    expect(whatsappNumber("+977 980-000-0000")).toBe("9779800000000");
    expect(whatsappNumber("0044 7700 900123")).toBe("447700900123");
    expect(whatsappNumber("07700 900123")).toBeNull();
  });
});
