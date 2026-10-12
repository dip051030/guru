"use client";

import React from "react";
import { IconPhone, IconWhatsApp } from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";
import { TEL_LINK, WHATSAPP_GREETING, whatsappLink } from "@/config/contact";

export default function FloatingContactButtons() {
  const { language } = useLanguage();
  const isNe = language === "ne";

  return (
    // Sits above the mobile bottom nav (h-16) on small screens.
    <div className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:bottom-6 lg:right-6 z-40 flex flex-col items-end gap-3">
      <a
        href={TEL_LINK}
        aria-label={isNe ? "फोन गर्नुहोस्" : "Call now"}
        className="group flex items-center gap-2 h-12 pl-3.5 pr-3.5 lg:pr-4 rounded-full bg-[#0E1A2E] text-white shadow-lg ring-1 ring-white/10 hover:bg-[#1A2740] active:scale-95 transition-all"
      >
        <IconPhone size={20} weight="fill" className="text-amber-400" />
        <span className="hidden lg:inline text-sm font-semibold">{isNe ? "फोन गर्नुहोस्" : "Call now"}</span>
      </a>
      <a
        href={whatsappLink(isNe ? WHATSAPP_GREETING.ne : WHATSAPP_GREETING.en)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isNe ? "ह्वाट्सएपमा कुरा गर्नुहोस्" : "Chat on WhatsApp"}
        className="relative flex items-center gap-2 h-14 pl-4 pr-4 lg:pr-5 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1EBE5D] active:scale-95 transition-all"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping [animation-iteration-count:3] motion-reduce:hidden pointer-events-none" />
        <IconWhatsApp size={26} weight="fill" className="relative" />
        <span className="relative hidden lg:inline text-sm font-semibold">{isNe ? "ह्वाट्सएप" : "WhatsApp"}</span>
      </a>
    </div>
  );
}
