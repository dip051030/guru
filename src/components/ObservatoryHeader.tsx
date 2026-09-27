"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Phone, Menu, X, ArrowRight } from "lucide-react";
import { getNepaliDate, getDailyMuhurtaTimings } from "@/utils/astronomy";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";

interface HeaderProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export default function ObservatoryHeader({ onOpenInquiry }: HeaderProps) {
  const { t, language } = useLanguage();
  const [nepaliDateStr, setNepaliDateStr] = useState<string>("");
  const [muhurtaInfo, setMuhurtaInfo] = useState<{ sunrise: string; sunset: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const bs = getNepaliDate(now);
    setNepaliDateStr(
      language === "ne"
        ? `${bs.formattedNepali} (${bs.formatted})`
        : `${bs.formatted} (B.S.)`
    );
    setMuhurtaInfo(getDailyMuhurtaTimings(now));
  }, [language]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200 shadow-2xs">
      {/* Top Authentic Date Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 border-b border-stone-200 text-xs font-mono text-stone-500 bg-stone-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C85A17] rounded-none" />
            <span className="text-[#181411] font-bold">{t.header.patro}</span>
            <span className="text-[#D97706] font-bold">{nepaliDateStr || t.header.loading}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-2 text-stone-600">
            <span>{t.header.sunrise}</span>
            <span className="text-[#181411] font-bold">{muhurtaInfo?.sunrise || "06:02 AM"}</span>
            <span>• {t.header.sunset}</span>
            <span className="text-[#181411] font-bold">{muhurtaInfo?.sunset || "05:58 PM"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-stone-600">
            <Phone className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{t.header.contact}</span>
          </div>
          <span className="text-stone-300">|</span>
          <span className="text-[#D97706] font-bold">{t.header.location}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo with luxury vector lockup */}
        <a href="#" className="flex items-center group">
          <BrandLogo variant="dark" size="md" />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-sans text-stone-800 font-medium">
          <a href="#" className="text-[#C85A17] font-bold hover:text-[#A6440C] transition-colors py-1 relative">
            {t.header.home}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C85A17] rounded-none" />
          </a>
          <a href="#services" className="hover:text-[#C85A17] transition-colors py-1">
            {t.header.services}
          </a>
          <a href="#kundali" className="hover:text-[#C85A17] transition-colors py-1">
            {t.header.kundali}
          </a>
          <a href="#about-guru" className="hover:text-[#C85A17] transition-colors py-1">
            {t.header.aboutGuru}
          </a>
          <a href="#contact" className="hover:text-[#C85A17] transition-colors py-1">
            {t.header.contactNav}
          </a>
        </nav>

        {/* Right Action Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle variant="header" />

          <button
            onClick={() => onOpenInquiry(t.header.bookConsultation)}
            className="px-5 py-2.5 rounded-none bg-[#C85A17] hover:bg-[#A6440C] text-white text-xs lg:text-sm font-bold transition-colors flex items-center gap-2 shadow-sm border border-[#C85A17]"
          >
            <Calendar className="w-4 h-4 text-orange-200" />
            <span>{t.header.bookConsultation}</span>
          </button>
        </div>

        {/* Mobile Hamburger & Language Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle variant="header" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-900 rounded-none border border-stone-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white px-6 py-6 flex flex-col gap-4 font-sans text-sm text-foreground">
          <LanguageToggle variant="mobile" />

          <div className="pb-3 border-b border-border text-xs text-textMuted font-mono">
            {nepaliDateStr}
          </div>
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-terracotta font-semibold py-1"
          >
            {t.header.home}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-terracotta"
          >
            {t.header.services}
          </a>
          <a
            href="#kundali"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-terracotta"
          >
            {t.header.kundali}
          </a>
          <a
            href="#about-guru"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-terracotta"
          >
            {t.header.aboutGuru}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-terracotta"
          >
            {t.header.contactNav}
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry(t.header.bookConsultation);
            }}
            className="mt-2 w-full py-3.5 rounded-none bg-[#C85A17] text-white text-center font-mono text-xs uppercase tracking-widest font-bold border border-[#C85A17] hover:bg-[#A6440C] transition-colors"
          >
            {t.header.bookConsultation}
          </button>
        </div>
      )}
    </header>
  );
}
