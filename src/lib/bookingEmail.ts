// HTML email sent to the office for each booking request.
// Email clients ignore <style> blocks and modern CSS, so this uses
// table layout and inline styles only, at a 600px max width.

const SITE_URL = "https://www.gurunilhari.com";
const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;

const C = {
  saffron: "#D95B16",
  navy: "#0E1A2E",
  cream: "#FAF7F2",
  border: "#E7E2DA",
  text: "#1C1917",
  muted: "#78716C",
  green: "#25D366",
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

// Known form labels, grouped into sections. Anything else lands in "Other details".
const SECTIONS: { title: string; labels: string[] }[] = [
  { title: "Contact", labels: ["Name", "Phone", "Email"] },
  {
    title: "Consultation",
    labels: ["Service", "Mode", "Preferred date", "Preferred time", "Topic", "Booking ref"],
  },
  { title: "Birth details", labels: ["Date of birth", "Time of birth", "Place of birth"] },
];
const MESSAGE_LABELS = ["Question", "Notes"];

export interface BookingEmailInput {
  source: string;
  fields: [string, string][];
  receivedAt?: Date;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** wa.me needs the full international number; skip local numbers we can't be sure of. */
export function whatsappNumber(phone: string): string | null {
  const trimmed = phone.trim();
  if (!/^(\+|00)/.test(trimmed)) return null;
  const digits = trimmed.replace(/^00/, "").replace(/\D/g, "");
  return digits.length >= 8 ? digits : null;
}

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

function button(href: string, label: string, bg: string, color = "#FFFFFF") {
  return `<td style="padding:4px">
  <a href="${escapeHtml(href)}" style="display:inline-block;padding:11px 18px;background:${bg};color:${color};font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;white-space:nowrap">${label}</a>
</td>`;
}

function section(title: string, rows: [string, string][]) {
  if (!rows.length) return "";
  const body = rows
    .map(
      ([label, value]) => `<tr>
  <td style="padding:7px 12px 7px 0;width:120px;vertical-align:top;font-family:${FONT};font-size:13px;color:${C.muted}">${escapeHtml(label)}</td>
  <td style="padding:7px 0;vertical-align:top;font-family:${FONT};font-size:14px;color:${C.text};font-weight:600;word-break:break-word">${escapeHtml(value)}</td>
</tr>`
    )
    .join("");
  return `<tr><td style="padding:22px 32px 0">
  <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.saffron};padding-bottom:6px;border-bottom:1px solid ${C.border}">${escapeHtml(title)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px">${body}</table>
</td></tr>`;
}

export function renderBookingEmail({ source, fields, receivedAt = new Date() }: BookingEmailInput) {
  const get = (label: string) => fields.find(([l]) => l === label)?.[1] || "";
  const name = get("Name");
  const phone = get("Phone");
  const email = get("Email");
  const service = get("Service");
  const mode = get("Mode");

  const used = new Set<string>();
  const pick = (labels: string[]) =>
    fields.filter(([l]) => labels.includes(l) && !used.has(l)).map((f) => (used.add(f[0]), f));

  // Name/phone/email/service already appear in the hero card; keep them in the table too
  // so the email still reads well when forwarded or printed.
  const sectionsHtml = SECTIONS.map((s) => section(s.title, pick(s.labels))).join("");
  const message = fields.filter(([l]) => MESSAGE_LABELS.includes(l)).map(([, v]) => v).join("\n\n");
  MESSAGE_LABELS.forEach((l) => used.add(l));
  const other = fields.filter(([l]) => !used.has(l));
  const otherHtml = section("Other details", other);

  const wa = phone ? whatsappNumber(phone) : null;
  const firstName = name.split(/\s+/)[0] || "there";
  const waText = encodeURIComponent(
    `Namaste ${firstName}, thank you for your consultation request with Guru Nilhari.`
  );
  const buttons = [
    email &&
      button(
        `mailto:${email}?subject=${encodeURIComponent("Your consultation with Guru Nilhari")}`,
        "Reply",
        C.saffron
      ),
    wa && button(`https://wa.me/${wa}?text=${waText}`, "WhatsApp", C.green),
    phone && button(`tel:${phone.replace(/[^\d+]/g, "")}`, "Call", C.navy),
  ]
    .filter(Boolean)
    .join("");

  const subject = `New booking: ${name}${service ? ` — ${service}` : ""}`.slice(0, 200);
  const preheader = [service, mode, phone].filter(Boolean).join(" · ");
  const ukTime = formatTime(receivedAt, "Europe/London");
  const nepalTime = formatTime(receivedAt, "Asia/Kathmandu");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.cream}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${C.border};border-radius:12px;overflow:hidden">

  <!-- Header -->
  <tr><td style="background:${C.navy};padding:20px 32px;border-bottom:3px solid ${C.saffron}">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="padding-right:14px;vertical-align:middle">
        <img src="${LOGO_URL}" width="44" height="44" alt="Guru Nilhari" style="display:block;border-radius:8px;border:0">
      </td>
      <td style="vertical-align:middle">
        <div style="font-family:${SERIF};font-size:20px;font-weight:bold;color:#FFFFFF">Guru Nilhari</div>
        <div style="font-family:${FONT};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F59E0B">Vedic Sanatan Kendra UK</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Hero -->
  <tr><td style="padding:28px 32px 4px">
    <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.saffron}">New consultation request</div>
    <div style="font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:bold;color:${C.text};padding-top:6px">${escapeHtml(name)}</div>
    ${service ? `<div style="font-family:${FONT};font-size:15px;color:${C.text};padding-top:6px">${escapeHtml(service)}</div>` : ""}
    ${
      mode
        ? `<div style="padding-top:10px"><span style="display:inline-block;padding:4px 10px;background:#FFF4EC;border:1px solid #F8D3BC;border-radius:999px;font-family:${FONT};font-size:12px;font-weight:600;color:${C.saffron}">${escapeHtml(mode)}</span></div>`
        : ""
    }
  </td></tr>

  <!-- Actions -->
  ${
    buttons
      ? `<tr><td style="padding:18px 28px 6px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${buttons}</tr></table></td></tr>`
      : ""
  }

  ${sectionsHtml}

  <!-- Message -->
  ${
    message
      ? `<tr><td style="padding:22px 32px 0">
    <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.saffron};padding-bottom:8px">Their message</div>
    <div style="background:${C.cream};border-left:3px solid ${C.saffron};border-radius:4px;padding:14px 16px;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.text};white-space:pre-wrap">${escapeHtml(message)}</div>
  </td></tr>`
      : ""
  }

  ${otherHtml}

  <!-- Footer -->
  <tr><td style="padding:28px 32px 26px">
    <div style="border-top:1px solid ${C.border};padding-top:16px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted}">
      Received ${escapeHtml(ukTime)} UK time · ${escapeHtml(nepalTime)} Nepal time<br>
      Sent from the <strong style="color:${C.text}">${escapeHtml(source)}</strong> form on
      <a href="${SITE_URL}" style="color:${C.saffron};text-decoration:none">gurunilhari.com</a>.
      ${email ? `Replying to this email goes straight to ${escapeHtml(firstName)}.` : "No email given — please reply by phone or WhatsApp."}
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `NEW CONSULTATION REQUEST — ${name}`,
    service && `Service: ${service}`,
    "",
    ...fields.map(([l, v]) => `${l}: ${v}`),
    "",
    `Received ${ukTime} UK time (${nepalTime} Nepal time)`,
    `Source: ${source} form, gurunilhari.com`,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");

  return { subject, html, text };
}
