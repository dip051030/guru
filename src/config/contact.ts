// Single source of truth for the office's direct contact channels.
export const CONTACT_PHONE_DISPLAY = "+44 7838 820518";
export const CONTACT_PHONE_E164 = "+447838820518";

export const TEL_LINK = `tel:${CONTACT_PHONE_E164}`;

/** Builds a wa.me click-to-chat link, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_GREETING = {
  ne: "नमस्कार गुरुजी, म परामर्शको बारेमा जानकारी लिन चाहन्छु।",
  en: "Namaste Guruji, I would like to enquire about a consultation.",
};

/** Formats booking form fields into a WhatsApp message, skipping blank values. */
export function bookingMessage(heading: string, fields: [string, string | undefined][]): string {
  const lines = fields
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`);
  return [heading, "", ...lines].join("\n");
}

