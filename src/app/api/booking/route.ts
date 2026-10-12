import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Configure in the hosting dashboard (or .env.local for local dev).
// RESEND_API_KEY      – from resend.com → API Keys
// BOOKING_EMAIL_TO    – inbox(es) that receive bookings, comma-separated
// BOOKING_EMAIL_FROM  – must be on the verified Resend domain (mail.gurunilhari.com)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TO = (process.env.BOOKING_EMAIL_TO || "contact@gurunilhari.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const EMAIL_FROM = process.env.BOOKING_EMAIL_FROM || "Guru Nilhari Website <bookings@mail.gurunilhari.com>";

const MAX_FIELDS = 20;
const MAX_LABEL = 60;
const MAX_VALUE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface BookingPayload {
  source?: unknown;
  fields?: unknown;
  replyTo?: unknown;
  /** Honeypot: real visitors never fill this hidden field. */
  website?: unknown;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots that fill the honeypot get a fake success so they don't retry.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const source = clean(body.source, 60) || "Website";
  const fields: [string, string][] = Array.isArray(body.fields)
    ? body.fields
        .slice(0, MAX_FIELDS)
        .filter((f): f is [unknown, unknown] => Array.isArray(f) && f.length === 2)
        .map(([label, value]) => [clean(label, MAX_LABEL), clean(value, MAX_VALUE)] as [string, string])
        .filter(([label, value]) => label && value)
    : [];

  const name = fields.find(([l]) => l === "Name")?.[1];
  const phone = fields.find(([l]) => l === "Phone")?.[1];
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "missing_name_or_phone" }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    console.error("[booking] RESEND_API_KEY is not set; booking email not sent.");
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }

  const replyTo = clean(body.replyTo, 200);
  const service = fields.find(([l]) => l === "Service")?.[1];
  const subject = `New booking: ${name}${service ? ` — ${service}` : ""}`.slice(0, 200);

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#78716c;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#1c1917;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px">
<h2 style="margin:0 0 4px;color:#D95B16">New consultation request</h2>
<p style="margin:0 0 16px;color:#78716c">From the ${escapeHtml(source)} form on gurunilhari.com</p>
<table style="border-collapse:collapse">${rows}</table>
</div>`;
  const text = [`New consultation request (${source})`, "", ...fields.map(([l, v]) => `${l}: ${v}`)].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject,
        html,
        text,
        ...(EMAIL_RE.test(replyTo) ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[booking] Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[booking] Resend request failed", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
