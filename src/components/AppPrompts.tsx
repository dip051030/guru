"use client";

import React, { useEffect, useState } from "react";
import { IconClose, IconDownload, IconLocate, IconShare } from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";

// Chrome/Edge/Android fire this before showing their own install UI.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const INSTALL_SNOOZE_KEY = "nh_install_snooze_until";
const INSTALL_SNOOZE_DAYS = 14;
const PROMPT_DELAY_MS = 4000;

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
}

function installSnoozed() {
  try {
    return Number(localStorage.getItem(INSTALL_SNOOZE_KEY) || 0) > Date.now();
  } catch {
    return false;
  }
}

function snoozeInstall() {
  try {
    localStorage.setItem(INSTALL_SNOOZE_KEY, String(Date.now() + INSTALL_SNOOZE_DAYS * 86400000));
  } catch {
    // ignore
  }
}

/**
 * Shows at most one small card at a time: first asks for location (for local
 * sunrise/sunset), then offers to install the site as an app.
 */
export default function AppPrompts() {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const { decided, status, requestLocation, declineLocation } = useLocation();

  const [ready, setReady] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [installDismissed, setInstallDismissed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstallEvent(null);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari has no install event; show manual instructions instead.
    if (isIos() && !isStandalone()) setShowIosHint(true);

    const t = setTimeout(() => setReady(true), PROMPT_DELAY_MS);
    return () => {
      clearTimeout(t);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!ready) return null;

  const askLocation = !decided && status !== "unsupported";
  const canOfferInstall =
    !installDismissed && (installEvent || showIosHint) && !isStandalone() && !installSnoozed();

  const dismissInstall = () => {
    snoozeInstall();
    setInstallDismissed(true);
  };

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice.catch(() => null);
    setInstallEvent(null);
    setInstallDismissed(true);
  };

  let card: React.ReactNode = null;

  if (askLocation) {
    card = (
      <PromptCard
        icon={<IconLocate size={20} weight="fill" className="text-[#D95B16]" />}
        title={isNe ? "तपाईंको स्थान अनुसार समय हेर्ने?" : "Show times for your location?"}
        body={
          isNe
            ? "सूर्योदय, सूर्यास्त र स्थानीय समय तपाईं बसेको ठाउँ अनुसार देखाउन स्थान अनुमति दिनुहोस्।"
            : "Allow location so sunrise, sunset and the clock match where you are, instead of Kathmandu."
        }
        primaryLabel={status === "pending" ? (isNe ? "खोज्दै..." : "Locating...") : isNe ? "स्थान दिनुहोस्" : "Use my location"}
        onPrimary={requestLocation}
        primaryDisabled={status === "pending"}
        secondaryLabel={isNe ? "पछि" : "Not now"}
        onSecondary={declineLocation}
      />
    );
  } else if (canOfferInstall) {
    card = installEvent ? (
      <PromptCard
        icon={<IconDownload size={20} weight="bold" className="text-[#D95B16]" />}
        title={isNe ? "एपको रूपमा राख्नुहोस्" : "Add Guru Nilhari as an app"}
        body={
          isNe
            ? "पात्रो, राशिफल र परामर्श एक ट्यापमा — होम स्क्रिनबाट सिधै खोल्नुहोस्।"
            : "Open the Patro, horoscope and booking in one tap from your home screen."
        }
        primaryLabel={isNe ? "इन्स्टल गर्नुहोस्" : "Install app"}
        onPrimary={handleInstall}
        secondaryLabel={isNe ? "पछि" : "Not now"}
        onSecondary={dismissInstall}
      />
    ) : (
      <PromptCard
        icon={<IconDownload size={20} weight="bold" className="text-[#D95B16]" />}
        title={isNe ? "होम स्क्रिनमा थप्नुहोस्" : "Add to your Home Screen"}
        body={
          <span className="inline-flex flex-wrap items-center gap-1">
            {isNe ? "Safari मा" : "In Safari, tap"}
            <IconShare size={16} className="text-[#0A84FF]" />
            {isNe ? "थिच्नुहोस्, अनि \"Add to Home Screen\" छान्नुहोस्।" : "then choose \"Add to Home Screen\"."}
          </span>
        }
        secondaryLabel={isNe ? "बुझेँ" : "Got it"}
        onSecondary={dismissInstall}
      />
    );
  }

  if (!card) return null;

  return (
    // Left-aligned so it doesn't cover the floating WhatsApp/Call buttons on the right.
    <div className="fixed left-3 right-[5.25rem] bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:left-6 lg:right-auto lg:bottom-6 lg:w-[380px] z-40 animate-slide-up">
      {card}
    </div>
  );
}

function PromptCard({
  icon,
  title,
  body,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  secondaryLabel: string;
  onSecondary: () => void;
}) {
  return (
    <div role="dialog" aria-live="polite" className="relative bg-white border border-stone-200 rounded-xl shadow-xl p-4 pr-9">
      <button
        onClick={onSecondary}
        aria-label="Close"
        className="absolute top-2.5 right-2.5 p-1 text-stone-400 hover:text-stone-700"
      >
        <IconClose size={16} />
      </button>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-stone-900 leading-snug">{title}</h3>
          <div className="mt-1 text-xs text-stone-600 leading-relaxed">{body}</div>
          <div className="mt-3 flex items-center gap-2">
            {primaryLabel && onPrimary && (
              <button
                onClick={onPrimary}
                disabled={primaryDisabled}
                className="px-3.5 py-2 rounded-md bg-[#D95B16] hover:bg-[#B8480C] text-white text-xs font-semibold transition-colors disabled:opacity-60"
              >
                {primaryLabel}
              </button>
            )}
            <button
              onClick={onSecondary}
              className="px-3 py-2 rounded-md text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
