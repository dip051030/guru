"use client";

import React, { useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { festivalsBetween } from "@/utils/festivals";
import { fmtAdDate, fmtBsDate, nums, weekdayName } from "@/lib/format";

interface Props {
  isNe: boolean;
  /** Today's AD date at local midnight. */
  from: Date;
  onPick?: (date: Date) => void;
}

const DAYS_AHEAD = 120;

export default function UpcomingEvents({ isNe, from, onPick }: Props) {
  const [showAll, setShowAll] = useState(false);
  const fromKey = from.getTime();
  const events = useMemo(
    () => festivalsBetween(new Date(fromKey), DAYS_AHEAD).filter((o) => !o.rule.minor),
    [fromKey]
  );
  const list = showAll ? events : events.slice(0, 8);

  const when = (days: number) => {
    if (days === 0) return isNe ? "आज" : "Today";
    if (days === 1) return isNe ? "भोलि" : "Tomorrow";
    return isNe ? `${nums(days, true)} दिन पछि` : `in ${days} days`;
  };

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-stone-900">{isNe ? "आउँदा चाडपर्व तथा बिदा" : "Upcoming festivals & holidays"}</h3>
        <span className="text-xs text-stone-500">{isNe ? `${nums(DAYS_AHEAD, true)} दिनभित्र` : `Next ${DAYS_AHEAD} days`}</span>
      </div>
      <ul className="divide-y divide-stone-100">
        {list.map((o) => {
          const [y, m, d] = o.date.split("-").map(Number);
          const ad = new Date(y, m - 1, d);
          const bs = new NepaliDate(new Date(y, m - 1, d, 12));
          const days = Math.round((ad.getTime() - fromKey) / 86400000);
          const national = o.rule.holiday === "national";
          return (
            <li key={`${o.rule.id}-${o.date}`}>
              <button onClick={() => onPick?.(ad)} className="w-full px-5 py-3 flex items-center gap-4 text-left hover:bg-stone-50">
                <div className={`w-12 shrink-0 text-center rounded-lg py-1 ${national ? "bg-red-50 text-red-700" : "bg-orange-50 text-[#B8480C]"}`}>
                  <div className="text-lg font-bold leading-tight">{nums(bs.getDate(), isNe)}</div>
                  <div className="text-[10px] leading-tight">{fmtBsDate(bs.getYear(), bs.getMonth() + 1, bs.getDate(), isNe).split(" ")[1]}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-stone-900 text-sm truncate">{isNe ? o.rule.ne : o.rule.en}</div>
                  <div className="text-xs text-stone-500">
                    {weekdayName(ad.getDay(), isNe)} · {fmtAdDate(ad, isNe)}
                    {national && <span className="text-red-600 font-medium"> · {isNe ? "बिदा" : "Holiday"}</span>}
                    {o.rule.holiday && !national && (isNe ? o.rule.noteNe : o.rule.noteEn) && (
                      <span className="text-stone-500"> · {isNe ? o.rule.noteNe : o.rule.noteEn}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-stone-600 shrink-0">{when(days)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {events.length > 8 && (
        <button onClick={() => setShowAll((v) => !v)} className="w-full py-3 text-sm font-semibold text-[#D95B16] hover:bg-orange-50 border-t border-stone-100">
          {showAll ? (isNe ? "कम देखाउनुहोस्" : "Show less") : isNe ? `सबै ${nums(events.length, true)} हेर्नुहोस्` : `Show all ${events.length}`}
        </button>
      )}
      <p className="px-5 py-3 text-[11px] text-stone-400 border-t border-stone-100">
        {isNe
          ? "चाडपर्व पञ्चाङ्ग गणनाबाट निकालिएको। आधिकारिक बिदा नेपाल सरकारको वार्षिक सूचना अनुसार फरक पर्न सक्छ; इद लगायतका बिदा सरकारले छुट्टै घोषणा गर्छ।"
          : "Festivals are computed from the panchang. Official holidays follow the Government of Nepal's yearly notice and may differ; Eid and some others are announced separately."}
      </p>
    </div>
  );
}
