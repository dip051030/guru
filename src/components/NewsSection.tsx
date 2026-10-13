"use client";

import React, { useEffect, useState } from "react";
import { IconExternalLink } from "@/components/icons/CustomIcons";
import { nums } from "@/lib/format";
import type { NewsItem } from "@/lib/rss";

type State = { state: "loading" } | { state: "error" } | { state: "ok"; items: NewsItem[] };

function ago(iso: string | null, isNe: boolean) {
  if (!iso) return "";
  const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (mins < 60) return isNe ? `${nums(mins, true)} मिनेट अघि` : `${mins} min ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return isNe ? `${nums(h, true)} घण्टा अघि` : `${h} h ago`;
  const d = Math.round(h / 24);
  return isNe ? `${nums(d, true)} दिन अघि` : `${d} d ago`;
}

export default function NewsSection({ isNe }: { isNe: boolean }) {
  const [data, setData] = useState<State>({ state: "loading" });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/news")
      .then((r) => r.json())
      .then((j) => alive && setData(j?.success && j.items?.length ? { state: "ok", items: j.items } : { state: "error" }))
      .catch(() => alive && setData({ state: "error" }));
    return () => {
      alive = false;
    };
  }, []);

  const items = data.state === "ok" ? (showAll ? data.items : data.items.slice(0, 6)) : [];

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-stone-900">{isNe ? "ताजा समाचार" : "Latest news"}</h3>
        <span className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {isNe ? "नेपाली समाचार स्रोतहरूबाट" : "From Nepali news sites"}
        </span>
      </div>

      {data.state === "loading" && (
        <ul className="divide-y divide-stone-100">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i} className="px-5 py-4">
              <div className="h-4 w-11/12 rounded bg-stone-100 animate-pulse" />
              <div className="mt-2 h-3 w-1/3 rounded bg-stone-100 animate-pulse" />
            </li>
          ))}
        </ul>
      )}

      {data.state === "error" && (
        <p className="px-5 py-8 text-sm text-stone-500">
          {isNe ? "अहिले समाचार लोड हुन सकेन। केही समयपछि फेरि हेर्नुहोस्।" : "News couldn't be loaded right now. Please check again later."}
        </p>
      )}

      {data.state === "ok" && (
        <>
          <ul className="divide-y divide-stone-100">
            {items.map((n) => (
              <li key={n.link}>
                <a href={n.link} target="_blank" rel="noopener noreferrer" className="group block px-5 py-3.5 hover:bg-stone-50">
                  <span className="block text-[15px] leading-snug font-medium text-stone-900 group-hover:text-[#B8480C]">{n.title}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                    <span className="font-medium text-stone-600">{n.source}</span>
                    {n.publishedAt && <>· {ago(n.publishedAt, isNe)}</>}
                    <IconExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {data.items.length > 6 && (
            <button onClick={() => setShowAll((v) => !v)} className="w-full py-3 text-sm font-semibold text-[#D95B16] hover:bg-orange-50 border-t border-stone-100">
              {showAll ? (isNe ? "कम देखाउनुहोस्" : "Show less") : isNe ? "थप समाचार" : "More headlines"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
