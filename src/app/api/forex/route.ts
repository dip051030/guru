import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

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
  source: string;
  rates: ForexCurrency[];
}

// Fallback rates if NRB API is unreachable
const FALLBACK_RATES: ForexCurrency[] = [
  { iso3: "USD", name: "U.S. Dollar", unit: 1, buy: "136.69", sell: "137.29" },
  { iso3: "EUR", name: "European Euro", unit: 1, buy: "148.20", sell: "148.85" },
  { iso3: "GBP", name: "UK Pound Sterling", unit: 1, buy: "177.10", sell: "177.90" },
  { iso3: "AUD", name: "Australian Dollar", unit: 1, buy: "91.10", sell: "91.55" },
  { iso3: "CAD", name: "Canadian Dollar", unit: 1, buy: "98.40", sell: "98.85" },
  { iso3: "QAR", name: "Qatari Riyal", unit: 1, buy: "37.50", sell: "37.66" },
  { iso3: "AED", name: "UAE Dirham", unit: 1, buy: "37.21", sell: "37.38" },
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
    const url = `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=1&from=${fromDateStr}&to=${toDateStr}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "Accept": "application/json",
        "User-Agent": "Astraea-Ephemeris-Portal/1.0",
      },
    });

    if (res.ok) {
      const json = await res.json();
      const payload = json?.data?.payload?.[0];
      if (payload && Array.isArray(payload.rates) && payload.rates.length > 0) {
        const rates: ForexCurrency[] = payload.rates.map((r: any) => ({
          iso3: r.currency.iso3,
          name: r.currency.name,
          unit: r.currency.unit,
          buy: r.buy,
          sell: r.sell,
        }));

        return NextResponse.json({
          success: true,
          date: payload.date || toDateStr,
          source: "Nepal Rastra Bank (Live Official API)",
          rates,
        });
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
