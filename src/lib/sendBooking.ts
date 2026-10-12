export interface BookingRequest {
  /** Which form it came from, e.g. "Contact page". */
  source: string;
  fields: [string, string | undefined][];
  /** Customer's email, so replies go straight to them. */
  replyTo?: string;
  /** Honeypot value from the hidden "website" input. */
  website?: string;
}

/** Sends a booking to the office inbox. Resolves true on success. */
export async function sendBookingEmail(req: BookingRequest): Promise<boolean> {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...req,
        fields: req.fields.filter(([, v]) => v && v.trim()),
      }),
    });
    const data = await res.json().catch(() => null);
    return res.ok && data?.ok === true;
  } catch {
    return false;
  }
}

/** Visible text of the <option> with this value inside the form, for readable emails. */
export function optionLabel(form: HTMLFormElement, value: string): string {
  const opt = Array.from(form.querySelectorAll("option")).find((o) => o.value === value);
  return opt?.textContent?.trim() || value;
}
