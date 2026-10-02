"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome as Home,
  IconSparkles as Sparkles,
  IconShoppingBag as ShoppingBag,
  IconCalendar as Calendar,
  IconPhone as Phone,
} from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface MobileBottomNavProps {
  onOpenInquiry: (topic?: string) => void;
}

export default function MobileBottomNav({ onOpenInquiry }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isNe = language === "ne";

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1A2E]/95 backdrop-blur-md border-t border-stone-800 text-stone-300 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/" ? "text-amber-400 font-bold" : "text-stone-300 hover:text-white"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-sans leading-tight">
            {isNe ? "गृह" : "Home"}
          </span>
        </Link>

        {/* 2. Services */}
        <Link
          href="/services"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/services" ? "text-amber-400 font-bold" : "text-stone-300 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-sans leading-tight">
            {isNe ? "सेवाहरू" : "Services"}
          </span>
        </Link>

        {/* 3. Store */}
        <Link
          href="/store"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/store" ? "text-amber-400 font-bold" : "text-stone-300 hover:text-white"
          }`}
        >
          <ShoppingBag className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-sans leading-tight">
            {isNe ? "स्टोर" : "Store"}
          </span>
        </Link>

        {/* 4. Book (Special Highlight) */}
        <button
          onClick={() => onOpenInquiry(isNe ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation")}
          className="flex flex-col items-center justify-center py-1 text-white hover:text-amber-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#D95B16] flex items-center justify-center -mt-3 shadow-md border-2 border-[#0E1A2E]">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] font-sans font-bold leading-tight mt-0.5 text-amber-400">
            {isNe ? "बुक" : "Book"}
          </span>
        </button>

        {/* 5. Contact */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/contact" ? "text-amber-400 font-bold" : "text-stone-300 hover:text-white"
          }`}
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-sans leading-tight">
            {isNe ? "सम्पर्क" : "Contact"}
          </span>
        </Link>
      </div>
    </div>
  );
}
