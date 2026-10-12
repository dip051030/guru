"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface UserLocation {
  lat: number;
  lon: number;
  timeZone: string;
  /** City name derived from the time zone, e.g. "London". */
  label: string;
  source: "default" | "device";
}

export type LocationStatus = "idle" | "pending" | "granted" | "denied" | "unsupported";

const KATHMANDU: UserLocation = {
  lat: 27.7172,
  lon: 85.324,
  timeZone: "Asia/Kathmandu",
  label: "Kathmandu",
  source: "default",
};

const STORAGE_KEY = "nh_location";
const DECISION_KEY = "nh_location_decision";

interface LocationContextValue {
  location: UserLocation;
  status: LocationStatus;
  /** True once the visitor has either shared or declined their location. */
  decided: boolean;
  requestLocation: () => void;
  declineLocation: () => void;
  resetToDefault: () => void;
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

function deviceTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || KATHMANDU.timeZone;
  } catch {
    return KATHMANDU.timeZone;
  }
}

function labelFromTimeZone(tz: string): string {
  const city = tz.split("/").pop() || tz;
  return city.replace(/_/g, " ");
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode etc.) — location just won't persist.
  }
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<UserLocation>(KATHMANDU);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [decided, setDecided] = useState(true); // assume decided until storage is read, to avoid a prompt flash

  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("unsupported");
    }
    const saved = safeGet(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserLocation;
        if (typeof parsed.lat === "number" && typeof parsed.lon === "number" && parsed.timeZone) {
          setLocation(parsed);
          setStatus("granted");
        }
      } catch {
        safeSet(STORAGE_KEY, null);
      }
    }
    setDecided(safeGet(DECISION_KEY) !== null);
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tz = deviceTimeZone();
        const next: UserLocation = {
          lat: Number(pos.coords.latitude.toFixed(4)),
          lon: Number(pos.coords.longitude.toFixed(4)),
          timeZone: tz,
          label: labelFromTimeZone(tz),
          source: "device",
        };
        setLocation(next);
        setStatus("granted");
        setDecided(true);
        safeSet(STORAGE_KEY, JSON.stringify(next));
        safeSet(DECISION_KEY, "granted");
      },
      () => {
        setStatus("denied");
        setDecided(true);
        safeSet(DECISION_KEY, "denied");
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 6 * 60 * 60 * 1000 }
    );
  }, []);

  const declineLocation = useCallback(() => {
    setDecided(true);
    safeSet(DECISION_KEY, "declined");
  }, []);

  const resetToDefault = useCallback(() => {
    setLocation(KATHMANDU);
    setStatus("idle");
    safeSet(STORAGE_KEY, null);
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, status, decided, requestLocation, declineLocation, resetToDefault }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within a LocationProvider");
  return ctx;
}
