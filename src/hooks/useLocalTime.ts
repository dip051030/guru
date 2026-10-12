"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "@/context/LocationContext";
import { getDailyMuhurtaTimings, getSunTimes } from "@/utils/astronomy";

/** Live "hh:mm AM" clock in the visitor's chosen location. Empty until mounted. */
export function useLocalClock(): string {
  const { location } = useLocation();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: location.timeZone,
    }).format(now);
  } catch {
    return "";
  }
}

/** Sunrise/sunset for the given day at the visitor's chosen location. */
export function useSunTimes(date: Date | null) {
  const { location } = useLocation();
  const time = date?.getTime();
  return useMemo(() => {
    if (time === undefined) return null;
    try {
      return getSunTimes(new Date(time), location.lat, location.lon, location.timeZone);
    } catch {
      return null;
    }
  }, [time, location.lat, location.lon, location.timeZone]);
}

/** Rahu Kaal, Yamaganda, Gulika, Abhijit and Brahma Muhurta at the visitor's location. */
export function useMuhurtaTimings(date: Date | null) {
  const { location } = useLocation();
  const time = date?.getTime();
  return useMemo(() => {
    if (time === undefined) return null;
    try {
      return getDailyMuhurtaTimings(new Date(time), location.lat, location.lon, location.timeZone);
    } catch {
      return null;
    }
  }, [time, location.lat, location.lon, location.timeZone]);
}
