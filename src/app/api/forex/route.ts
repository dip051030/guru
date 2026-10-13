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

  // Don't show made-up rates when NRB can't be reached.
  return NextResponse.json(
    { success: false, date: null, source: "Nepal Rastra Bank", rates: [] },
    { status: 503 }
  );
}
