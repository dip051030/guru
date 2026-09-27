import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 300; // Fresh rates every 5 minutes

export interface ForexCurrency {
  iso3: string;
  name: string;
  unit: number;
  buy: string;
  sell: string;
}

export interface ForexApiResponse {
  success: boolean;
  date: string;
  published_on?: string;
  source: string;
  rates: ForexCurrency[];
}

// Fallback rates if NRB API is unreachable
const FALLBACK_RATES: ForexCurrency[] = [
  { iso3: "USD", name: "U.S. Dollar", unit: 1, buy: "153.01", sell: "153.61" },
  { iso3: "EUR", name: "European Euro", unit: 1, buy: "174.32", sell: "175.00" },
  { iso3: "GBP", name: "UK Pound Sterling", unit: 1, buy: "202.64", sell: "203.43" },
  { iso3: "AUD", name: "Australian Dollar", unit: 1, buy: "107.55", sell: "107.97" },
  { iso3: "CAD", name: "Canadian Dollar", unit: 1, buy: "108.18", sell: "108.60" },
  { iso3: "QAR", name: "Qatari Riyal", unit: 1, buy: "42.00", sell: "42.16" },
  { iso3: "AED", name: "UAE Dirham", unit: 1, buy: "41.66", sell: "41.82" },
  { iso3: "INR", name: "Indian Rupee", unit: 100, buy: "160.00", sell: "160.15" },
];

export async function GET() {
  const today = new Date();
  const toDateStr = today.toISOString().split("T")[0];
  
  // Previous 7 days window to ensure getting the latest published rate
  const pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() - 7);
  const fromDateStr = pastDate.toISOString().split("T")[0];

  try {
    const url = `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=10&from=${fromDateStr}&to=${toDateStr}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Astraea-Ephemeris-Portal/1.0",
      },
    });

    if (res.ok) {
      const json = await res.json();
      const payloads = json?.data?.payload;
      if (Array.isArray(payloads) && payloads.length > 0) {
        // Sort descending to ensure the most recent published date is first
        const sorted = [...payloads].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        const latestPayload = sorted[0];

        if (Array.isArray(latestPayload.rates) && latestPayload.rates.length > 0) {
          const rates: ForexCurrency[] = latestPayload.rates.map((r: any) => ({
            iso3: r.currency.iso3,
            name: r.currency.name,
            unit: r.currency.unit,
            buy: r.buy,
            sell: r.sell,
          }));

          return NextResponse.json({
            success: true,
            date: latestPayload.date || toDateStr,
            published_on: latestPayload.published_on,
            source: "Nepal Rastra Bank (Live Official API)",
            rates,
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch live NRB forex rates:", err);
  }

  // Graceful fallback
  return NextResponse.json({
    success: true,
    date: toDateStr,
    source: "Nepal Rastra Bank (Reference Snapshot)",
    rates: FALLBACK_RATES,
  });
}
