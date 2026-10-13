"use client";

import React, { useEffect, useState } from "react";
import { IconCoins, IconTrendingUp } from "@/components/icons/CustomIcons";
import { nums } from "@/lib/format";

interface Forex { iso3: string; name: string; unit: number; buy: string; sell: string }
interface Bullion { id: number; name: string; nameEn: string; rate: number }
type Load<T> = { state: "loading" } | { state: "error" } | { state: "ok"; date: string; rows: T[] };

const SHOW = ["USD", "GBP", "EUR", "AUD", "CAD", "AED", "QAR", "SAR", "MYR", "KRW", "JPY", "INR"];

function useRates<T>(url: string): Load<T> {
  const [data, setData] = useState<Load<T>>({ state: "loading" });
  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        if (j?.success && Array.isArray(j.rates) && j.rates.length) setData({ state: "ok", date: j.date, rows: j.rates });
        else setData({ state: "error" });
      })
      .catch(() => alive && setData({ state: "error" }));
    return () => {
      alive = false;
    };
  }, [url]);
  return data;
}

export default function RatesPanel({ isNe }: { isNe: boolean }) {
  const forex = useRates<Forex>("/api/forex");
  const bullion = useRates<Bullion>("/api/bullion");
  const money = (v: string | number) => nums(Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 }), isNe);

  const Unavailable = () => (
    <p className="px-5 py-6 text-sm text-stone-500">{isNe ? "अहिले दर उपलब्ध छैन। केही समयपछि फेरि हेर्नुहोस्।" : "Rates are unavailable right now. Please check again later."}</p>
  );
  const Loading = () => <div className="m-5 h-24 rounded-lg bg-stone-100 animate-pulse" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <IconCoins size={18} className="text-amber-600" /> {isNe ? "सुनचाँदी दर" : "Gold & silver"}
          </h3>
          {bullion.state === "ok" && <span className="text-xs text-stone-500">{nums(bullion.date, isNe)}</span>}
        </div>
        {bullion.state === "loading" && <Loading />}
        {bullion.state === "error" && <Unavailable />}
        {bullion.state === "ok" && (
          <ul className="divide-y divide-stone-100">
            {bullion.rows.map((r) => (
              <li key={r.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <span className="text-stone-700">{isNe ? r.name : r.nameEn}</span>
                <span className="font-semibold text-stone-900 tabular-nums">{isNe ? "रु " : "Rs. "}{money(r.rate)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="px-5 py-2.5 text-[11px] text-stone-400 border-t border-stone-100">
          {isNe ? "स्रोत: नेपाल सुनचाँदी व्यवसायी महासंघ" : "Source: Federation of Nepal Gold & Silver Dealers' Association"}
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <IconTrendingUp size={18} className="text-emerald-600" /> {isNe ? "विदेशी विनिमय दर" : "Exchange rates"}
          </h3>
          {forex.state === "ok" && <span className="text-xs text-stone-500">{nums(forex.date, isNe)}</span>}
        </div>
        {forex.state === "loading" && <Loading />}
        {forex.state === "error" && <Unavailable />}
        {forex.state === "ok" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-stone-500">
                <th className="px-5 py-2 text-left font-medium">{isNe ? "मुद्रा" : "Currency"}</th>
                <th className="px-2 py-2 text-right font-medium">{isNe ? "खरिद" : "Buy"}</th>
                <th className="px-5 py-2 text-right font-medium">{isNe ? "बिक्री" : "Sell"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {forex.rows
                .filter((r) => SHOW.includes(r.iso3))
                .sort((a, b) => SHOW.indexOf(a.iso3) - SHOW.indexOf(b.iso3))
                .map((r) => (
                  <tr key={r.iso3}>
                    <td className="px-5 py-2.5 text-stone-700">
                      <span className="font-semibold text-stone-900">{r.iso3}</span>
                      {r.unit !== 1 && <span className="text-xs text-stone-500"> ×{nums(r.unit, isNe)}</span>}
                    </td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{money(r.buy)}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{money(r.sell)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <p className="px-5 py-2.5 text-[11px] text-stone-400 border-t border-stone-100">
          {isNe ? "स्रोत: नेपाल राष्ट्र बैंक" : "Source: Nepal Rastra Bank"}
        </p>
      </div>
    </div>
  );
}
