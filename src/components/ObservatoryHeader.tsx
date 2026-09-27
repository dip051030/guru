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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E8DFD1] shadow-soft">
      {/* Top Authentic Date Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 border-b border-[#F0EAE1] text-xs font-mono text-textMuted bg-[#FAF7F2]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span className="text-navy font-medium">{t.header.patro}</span>
            <span className="text-terracotta font-semibold">{nepaliDateStr || t.header.loading}</span>
          </div>
          <span className="text-[#E0D5C1]">|</span>
          <div className="flex items-center gap-2 text-textBody">
            <span>{t.header.sunrise}</span>
            <span className="text-navy font-medium">{muhurtaInfo?.sunrise || "06:02 AM"}</span>
            <span>• {t.header.sunset}</span>
            <span className="text-navy font-medium">{muhurtaInfo?.sunset || "05:58 PM"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-textBody">
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>{t.header.contact}</span>
          </div>
          <span className="text-[#E0D5C1]">|</span>
          <span className="text-gold font-medium">{t.header.location}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo with luxury vector lockup */}
        <a href="#" className="flex items-center group">
          <BrandLogo variant="dark" size="md" />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-sans text-navy">
          <a href="#" className="text-terracotta font-semibold hover:text-terracotta transition-colors py-1 relative">
            {t.header.home}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta rounded-full" />
          </a>
          <a href="#services" className="hover:text-terracotta transition-colors py-1">
            {t.header.services}
          </a>
          <a href="#kundali" className="hover:text-terracotta transition-colors py-1">
            {t.header.kundali}
          </a>
          <a href="#about-guru" className="hover:text-terracotta transition-colors py-1">
            {t.header.aboutGuru}
          </a>
          <a href="#works" className="hover:text-terracotta transition-colors py-1">
            {t.header.research}
          </a>
          <a href="#contact" className="hover:text-terracotta transition-colors py-1">
            {t.header.contactNav}
          </a>
        </nav>

        {/* Right Action Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle variant="header" />

          <button
            onClick={() => onOpenInquiry(t.header.bookConsultation)}
            className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs lg:text-sm font-medium hover:bg-terracotta-dark transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-hover"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.header.bookConsultation}</span>
          </button>
        </div>

        {/* Mobile Hamburger & Language Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle variant="header" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy rounded-lg border border-[#E0D5C1]"
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
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-terracotta"
          >
            {t.header.research}
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
            className="mt-2 w-full py-3 rounded-full bg-terracotta text-white text-center font-medium shadow-soft"
          >
            {t.header.bookConsultation}
          </button>
        </div>
      )}
    </header>
  );
}
