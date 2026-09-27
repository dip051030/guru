import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 300; // Fresh rates every 5 minutes

export interface BullionRateItem {
  id: number;
  rateType: string;
  name: string;
  nameEn: string;
  unit: string;
  rate: number;
  rateFormatted: string;
  rateFormattedNe: string;
}

function formatNepaliNumber(n: number | string): string {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return n
    .toString()
    .split("")
    .map((c) => {
      const idx = parseInt(c, 10);
      return isNaN(idx) ? c : nepaliDigits[idx];
    })
    .join("");
}

function formatNprCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export async function GET() {
  const today = new Date();
  
  // Try today first, and fallback to past 5 days if today's rate isn't published yet
  for (let offset = 0; offset <= 5; offset++) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    const dateStr = d.toISOString().split("T")[0];

    try {
      const url = `https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory?date=${dateStr}`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": "Astraea-Portal/1.0",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const rates: BullionRateItem[] = data.map((item: any) => {
            const rawRate = Number(item.baseRatePerGram) || 0;
            const formatted = formatNprCurrency(rawRate);
            const formattedNe = formatNepaliNumber(formatted);
            const isGold = item.rateType.includes("सुन");

            return {
              id: item.id,
              rateType: item.rateType,
              name: item.rateType,
              nameEn: isGold
                ? item.rateType.includes("१०")
                  ? "Fine Gold (10 Grams)"
                  : "Fine Gold (Per Tola)"
                : item.rateType.includes("१०")
                ? "Silver (10 Grams)"
                : "Silver (Per Tola)",
              unit: item.rateType.includes("१०") ? "१० ग्राम" : "१ तोला",
              rate: rawRate,
              rateFormatted: `Rs. ${formatted}`,
              rateFormattedNe: `रु ${formattedNe}`,
            };
          });

          return NextResponse.json({
            success: true,
            date: dateStr,
            source: "नेपाल सुनचाँदी व्यवसायी महासंघ (Live FENEGOSIDA API)",
            rates,
          });
        }
      }
    } catch (err) {
      console.error(`Bullion fetch error for date ${dateStr}:`, err);
    }
  }

  // Fallback
  return NextResponse.json({
    success: true,
    date: today.toISOString().split("T")[0],
    source: "नेपाल सुनचाँदी व्यवसायी महासंघ (Reference Snapshot)",
    rates: [
      {
        id: 306,
        rateType: "छापावाल सुन (१ तोला)",
        name: "छापावाल सुन (१ तोला)",
        nameEn: "Fine Gold (Per Tola)",
        unit: "१ तोला",
        rate: 299300,
        rateFormatted: "Rs. 2,99,300",
        rateFormattedNe: "रु २,९९,३००",
      },
      {
        id: 307,
        rateType: "छापावाल सुन (१० ग्राम)",
        name: "छापावाल सुन (१० ग्राम)",
        nameEn: "Fine Gold (10 Grams)",
        unit: "१० ग्राम",
        rate: 256600,
        rateFormatted: "Rs. 2,56,600",
        rateFormattedNe: "रु २,५६,६००",
      },
      {
        id: 304,
        rateType: "असली चाँदी दर (१ तोला)",
        name: "असली चाँदी दर (१ तोला)",
        nameEn: "Silver (Per Tola)",
        unit: "१ तोला",
        rate: 4655,
        rateFormatted: "Rs. 4,655",
        rateFormattedNe: "रु ४,६५५",
      },
    ],
  });
}
