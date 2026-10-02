"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCalendar as Calendar, IconPhone as Phone, IconMenu as Menu, IconClose as X, IconArrowRight as ArrowRight } from "./icons/CustomIcons";
import { getNepaliDate, getDailyMuhurtaTimings, toNepaliNumber } from "@/utils/astronomy";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";
import LanguageToggle from "./LanguageToggle";

interface HeaderProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export default function ObservatoryHeader({ onOpenInquiry }: HeaderProps) {
  const pathname = usePathname();
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-stone-200/60 shadow-2xs transition-all duration-300">
      {/* Top Authentic Date Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 border-b border-stone-200/60 text-xs font-sans text-stone-600 bg-[#FAF8F5]">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D95B16]" />
            <span className="text-stone-700 font-medium">{t.header.patro}:</span>
            <span className="text-[#D95B16] font-bold">{nepaliDateStr || t.header.loading}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span className="text-amber-500">☼</span>
            <span>{t.header.sunrise}:</span>
            <span className="text-stone-800 font-semibold">
              {muhurtaInfo?.sunrise
                ? language === "ne"
                  ? toNepaliNumber(muhurtaInfo.sunrise)
                  : muhurtaInfo.sunrise
                : "06:09 AM"}
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span className="text-amber-600">☽</span>
            <span>{t.header.sunset}:</span>
            <span className="text-stone-800 font-semibold">
              {muhurtaInfo?.sunset
                ? language === "ne"
                  ? toNepaliNumber(muhurtaInfo.sunset)
                  : muhurtaInfo.sunset
                : "05:57 PM"}
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1 text-stone-600">
            <span className="text-[#D95B16] font-bold">◉</span>
            <span>{t.header.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <a
            href="https://wa.me/447838820518"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-stone-700 hover:text-[#D95B16] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D95B16]" />
            <span>Contact / WhatsApp: <strong className="font-semibold">+44 7838 820518</strong></span>
          </a>
          <span className="text-stone-300">|</span>
          <span className="text-stone-700 font-semibold">Vedic Sanatan Kendra UK</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo with luxury vector lockup */}
        <Link href="/" className="flex items-center group">
          <BrandLogo variant="dark" size="md" />
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-sans text-stone-700 font-medium">
          <Link
            href="/"
            className={`transition-colors py-1 relative ${
              pathname === "/"
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.home}
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/#calendar"
            className="text-stone-700 hover:text-[#D95B16] transition-colors py-1 relative"
          >
            {language === "ne" ? "पञ्चाङ्ग" : "Panchanga"}
          </Link>
          <Link
            href="/horoscope"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/horoscope")
                ? "text-[#D95B16] font-bold"
                : "text-stone-700 hover:text-[#D95B16]"
            }`}
          >
            {t.header.horoscope}
            {pathname?.startsWith("/horoscope") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/ephemeris"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/ephemeris")
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.kundali}
            {pathname?.startsWith("/ephemeris") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/services"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/services")
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.services}
            {pathname?.startsWith("/services") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/store"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/store")
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.store}
            {pathname?.startsWith("/store") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/about"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/about")
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.aboutGuru}
            {pathname?.startsWith("/about") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
          <Link
            href="/contact"
            className={`transition-colors py-1 relative ${
              pathname?.startsWith("/contact")
                ? "text-[#D95B16] font-bold"
                : "hover:text-[#D95B16]"
            }`}
          >
            {t.header.contactNav}
            {pathname?.startsWith("/contact") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95B16] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right Action Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle variant="header" />

          <button
            onClick={() => onOpenInquiry(t.header.bookConsultation)}
            className="px-5 py-2.5 rounded-xl bg-[#D95B16] hover:bg-[#B8470B] text-white text-xs lg:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs hover:shadow-sm"
          >
            <Calendar className="w-4 h-4 text-orange-100" />
            <span>{t.header.bookConsultation}</span>
          </button>
        </div>

        {/* Mobile Hamburger & Language Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle variant="header" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-stone-800 rounded-xl border border-stone-200/90 hover:bg-stone-50 active:scale-95 transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D95B16]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200/80 bg-white/98 backdrop-blur-md px-5 py-5 flex flex-col gap-3 font-sans text-sm text-stone-800 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-xs font-mono text-[#D95B16] font-bold">
              {nepaliDateStr}
            </span>
            <LanguageToggle variant="header" />
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname === "/" ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.home}
          </Link>
          <Link
            href="/#calendar"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-stone-50 transition-colors"
          >
            {language === "ne" ? "नेपाली पात्रो (पञ्चाङ्ग)" : "Nepali Patro (Panchanga)"}
          </Link>
          <Link
            href="/horoscope"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/horoscope") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.horoscope}
          </Link>
          <Link
            href="/ephemeris"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/ephemeris") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.kundali}
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/services") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.services}
          </Link>
          <Link
            href="/store"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/store") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.store}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/about") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.aboutGuru}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors ${pathname?.startsWith("/contact") ? "bg-orange-50 text-[#D95B16] font-bold" : "hover:bg-stone-50"}`}
          >
            {t.header.contactNav}
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry(t.header.bookConsultation);
            }}
            className="mt-2 w-full py-3 rounded-xl bg-[#D95B16] text-white text-center font-semibold text-sm hover:bg-[#B8470B] transition-colors shadow-xs"
          >
            {t.header.bookConsultation}
          </button>
        </div>
      )}
    </header>
  );
}
