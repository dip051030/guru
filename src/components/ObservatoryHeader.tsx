"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Phone, Menu, X, ArrowRight } from "lucide-react";
import { getNepaliDate, getDailyMuhurtaTimings } from "@/utils/astronomy";

interface HeaderProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export default function ObservatoryHeader({ onOpenInquiry }: HeaderProps) {
  const [nepaliDateStr, setNepaliDateStr] = useState<string>("");
  const [muhurtaInfo, setMuhurtaInfo] = useState<{ sunrise: string; sunset: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const bs = getNepaliDate(now);
    setNepaliDateStr(`${bs.formattedNepali} (${bs.formatted})`);
    setMuhurtaInfo(getDailyMuhurtaTimings(now));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* Top Authentic Date Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 border-b border-border/60 text-xs font-mono text-textMuted bg-surface-cream/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-foreground font-medium">नेपाली पात्रो:</span>
            <span className="text-primary font-semibold">{nepaliDateStr || "लोड हुँदैछ..."}</span>
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2 text-textBody">
            <span>काठमाडौँ सूर्योदय:</span>
            <span className="text-foreground font-medium">{muhurtaInfo?.sunrise || "०६:०२ बिहान"}</span>
            <span>• सूर्यास्त:</span>
            <span className="text-foreground font-medium">{muhurtaInfo?.sunset || "०५:५८ साँझ"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-textBody">
            <Phone className="w-3.5 h-3.5 text-secondary" />
            <span>सम्पर्क: +९७७ १ ४४१२३४५ / ९८५१०१२३४५</span>
          </div>
          <span className="text-border">|</span>
          <span className="text-secondary font-medium">बालुवाटार, काठमाडौँ</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo matching reference */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border border-secondary/40 flex items-center justify-center bg-surface-cream shadow-soft group-hover:border-primary transition-colors">
            {/* Elegant Mandala Sun SVG */}
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground leading-none">
              ज्योतिष दर्शन
            </span>
            <span className="text-[11px] text-textMuted font-sans mt-1">
              गुरु नील हरि • परम्परा • मार्गदर्शन
            </span>
          </div>
        </a>

        {/* Center Nav Links matching reference */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans text-textBody">
          <a href="#" className="text-primary font-medium hover:text-primary transition-colors py-1 relative">
            गृह
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
          </a>
          <a href="#services" className="hover:text-primary transition-colors py-1">
            सेवाहरू
          </a>
          <a href="#kundali" className="hover:text-primary transition-colors py-1">
            कुण्डली गणना
          </a>
          <a href="#about-guru" className="hover:text-primary transition-colors py-1">
            गुरु परिचय
          </a>
          <a href="#works" className="hover:text-primary transition-colors py-1">
            अनुसन्धान
          </a>
          <a href="#contact" className="hover:text-primary transition-colors py-1">
            सम्पर्क
          </a>
        </nav>

        {/* Right Action Button matching reference */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenInquiry("परामर्श बुक गर्नुहोस्")}
            className="px-6 py-2.5 rounded-lg bg-primary text-textInverted text-sm font-sans font-medium hover:bg-primary-dark transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-hover"
          >
            <Calendar className="w-4 h-4" />
            <span>परामर्श बुक गर्नुहोस्</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground rounded-lg border border-border"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-6 flex flex-col gap-4 font-sans text-sm text-foreground">
          <div className="pb-3 border-b border-border text-xs text-textMuted font-mono">
            {nepaliDateStr}
          </div>
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-primary font-medium py-1"
          >
            गृह
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-primary"
          >
            सेवाहरू
          </a>
          <a
            href="#kundali"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-primary"
          >
            कुण्डली गणना
          </a>
          <a
            href="#about-guru"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-primary"
          >
            गुरु परिचय
          </a>
          <a
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-primary"
          >
            अनुसन्धान
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-primary"
          >
            सम्पर्क
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry("परामर्श बुक गर्नुहोस्");
            }}
            className="mt-2 w-full py-3 rounded-lg bg-primary text-textInverted text-center font-medium shadow-soft"
          >
            परामर्श बुक गर्नुहोस्
          </button>
        </div>
      )}
    </header>
  );
}
