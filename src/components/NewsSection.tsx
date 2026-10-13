"use client";

import React, { useEffect, useMemo, useState } from "react";
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

/** Publisher photo, hot-linked; falls back to a plain tile if it fails to load. */
function NewsImage({ item, className = "" }: { item: NewsItem; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!item.image || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 text-[#B8480C] ${className}`}>
        <span className="font-serif font-bold text-sm px-2 text-center">{item.source}</span>
      </div>
    );
  }
  return (
    // Images come from many publisher CDNs, so a plain <img> avoids per-domain config.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover bg-stone-100 ${className}`}
    />
  );
}

const Meta = ({ item, isNe, light = false }: { item: NewsItem; isNe: boolean; light?: boolean }) => (
  <span className={`flex items-center gap-1.5 text-xs ${light ? "text-white/80" : "text-stone-500"}`}>
    <span className={`font-semibold ${light ? "text-white" : "text-[#B8480C]"}`}>{item.source}</span>
    {item.publishedAt && <span>· {ago(item.publishedAt, isNe)}</span>}
  </span>
);

export default function NewsSection({ isNe }: { isNe: boolean }) {
  const [data, setData] = useState<State>({ state: "loading" });
  const [source, setSource] = useState<string>("all");

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

  const all = data.state === "ok" ? data.items : [];
  const sources = useMemo(() => Array.from(new Set(all.map((i) => i.source))), [all]);
  // Lead with the newest story that has a photo, like a front page.
  const items = useMemo(() => {
    const list = source === "all" ? all : all.filter((i) => i.source === source);
    const leadIdx = list.findIndex((i) => i.image);
    if (leadIdx <= 0) return list;
    return [list[leadIdx], ...list.slice(0, leadIdx), ...list.slice(leadIdx + 1)];
  }, [all, source]);
  const [lead, ...rest] = items;
  const side = rest.slice(0, 4);
  const grid = rest.slice(4, 12);

  if (data.state === "loading") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 aspect-[16/9] rounded-xl bg-stone-200/70 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-28 h-20 rounded-lg bg-stone-200/70 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3.5 rounded bg-stone-200/70 animate-pulse" />
                <div className="h-3.5 w-2/3 rounded bg-stone-200/70 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.state === "error" || !lead) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl px-5 py-10 text-center text-sm text-stone-500">
        {isNe ? "अहिले समाचार लोड हुन सकेन। केही समयपछि फेरि हेर्नुहोस्।" : "News couldn't be loaded right now. Please check again later."}
      </div>
    );
  }

  return (
    <div>
      {/* Source filter */}
      {sources.length > 1 && (
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-4 flex gap-2 overflow-x-auto pb-1">
          {["all", ...sources].map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                source === s ? "bg-[#0E1A2E] text-white border-[#0E1A2E]" : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
              }`}
            >
              {s === "all" ? (isNe ? "सबै" : "All") : s}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Lead story */}
        <a href={lead.link} target="_blank" rel="noopener noreferrer" className="group lg:col-span-2 relative block overflow-hidden rounded-xl bg-stone-900">
          <NewsImage item={lead} className="w-full aspect-[16/10] sm:aspect-[16/9] group-hover:scale-[1.02] transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <Meta item={lead} isNe={isNe} light />
            <h3 className="mt-1.5 font-serif text-xl sm:text-3xl font-bold leading-snug text-white group-hover:underline decoration-2 underline-offset-4">
              {lead.title}
            </h3>
            {lead.excerpt && <p className="mt-2 hidden sm:block text-sm text-white/85 line-clamp-2">{lead.excerpt}</p>}
          </div>
        </a>

        {/* Side list with thumbnails */}
        <ul className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
          {side.map((n) => (
            <li key={n.link}>
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="group flex gap-3 p-3 hover:bg-stone-50">
                <NewsImage item={n} className="w-28 h-20 sm:w-32 sm:h-[84px] rounded-lg shrink-0" />
                <span className="min-w-0 flex flex-col">
                  <span className="text-[15px] leading-snug font-semibold text-stone-900 line-clamp-3 group-hover:text-[#B8480C]">{n.title}</span>
                  <span className="mt-auto pt-1"><Meta item={n} isNe={isNe} /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* More stories */}
      {grid.length > 0 && (
        <ul className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {grid.map((n) => (
            <li key={n.link}>
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="group block h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <NewsImage item={n} className="w-full aspect-[16/10]" />
                <span className="block p-3">
                  <span className="block text-sm leading-snug font-semibold text-stone-900 line-clamp-3 group-hover:text-[#B8480C]">{n.title}</span>
                  <span className="mt-2 block"><Meta item={n} isNe={isNe} /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
