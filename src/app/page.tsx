"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Compass, Orbit, BookOpen, User, Star, Phone } from "lucide-react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import HamroPatroHero from "@/components/HamroPatroHero";
import UnifiedEphemerisSuite from "@/components/UnifiedEphemerisSuite";
import CompanySolutions from "@/components/CompanySolutions";
import AntiSlopManifesto from "@/components/AntiSlopManifesto";
import CompanyLeadership from "@/components/CompanyLeadership";
import TestimonialsSection from "@/components/TestimonialsSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* 1. Classical Sticky Header */}
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* 2. Hero Section: Authentic Daily Nepali Calendar & Live Rates */}
      <div id="calendar">
        <HamroPatroHero
          onScrollToConsole={() => scrollToSection("ephemeris-section")}
          onOpenInquiry={handleOpenInquiry}
        />
      </div>

      {/* Quick Jump & Page Division Bar */}
      <nav aria-label="Page Sections" className="w-full bg-[#FAF7F2] border-y border-stone-200/90 py-2.5 px-6 lg:px-12 sticky top-20 z-30 shadow-2xs backdrop-blur-md bg-[#FAF7F2]/95">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs font-mono">
          <div className="flex items-center gap-1.5 text-stone-500 font-bold shrink-0">
            <span className="w-2 h-2 bg-[#C85A17] rounded-none" />
            <span className="uppercase tracking-wider">{language === "ne" ? "द्रुत खण्डहरू" : "DIVISIONS"}:</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => scrollToSection("calendar")}
              className="px-2.5 py-1 bg-white border border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17] transition-colors flex items-center gap-1.5 text-stone-700 font-sans"
            >
              <Calendar className="w-3 h-3 text-[#C85A17]" />
              <span>{language === "ne" ? "०१. दैनिक पात्रो" : "01. Daily Patro"}</span>
            </button>

            <button
              onClick={() => scrollToSection("ephemeris-section")}
              className="px-2.5 py-1 bg-white border border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17] transition-colors flex items-center gap-1.5 text-stone-700 font-sans"
            >
              <Orbit className="w-3 h-3 text-[#C85A17]" />
              <span>{language === "ne" ? "०२. कुण्डली गणित" : "02. Ephemeris"}</span>
            </button>

            <button
              onClick={() => scrollToSection("services-section")}
              className="px-2.5 py-1 bg-white border border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17] transition-colors flex items-center gap-1.5 text-stone-700 font-sans"
            >
              <BookOpen className="w-3 h-3 text-[#C85A17]" />
              <span>{language === "ne" ? "०३. चार सेवा स्तम्भ" : "03. 4 Pillars"}</span>
            </button>

            <button
              onClick={() => scrollToSection("leadership-section")}
              className="px-2.5 py-1 bg-white border border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17] transition-colors flex items-center gap-1.5 text-stone-700 font-sans"
            >
              <User className="w-3 h-3 text-[#C85A17]" />
              <span>{language === "ne" ? "०४. गुरु निलहरि" : "04. Guru Nilhari"}</span>
            </button>

            <button
              onClick={() => scrollToSection("testimonials-section")}
              className="px-2.5 py-1 bg-white border border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17] transition-colors flex items-center gap-1.5 text-stone-700 font-sans hidden sm:flex"
            >
              <Star className="w-3 h-3 text-[#C85A17]" />
              <span>{language === "ne" ? "०५. समीक्षा" : "05. Reviews"}</span>
            </button>
          </div>

          <Link
            href="/services"
            className="hidden lg:flex items-center gap-1 text-[#C85A17] hover:text-[#A6440C] font-bold shrink-0 transition-colors"
          >
            <span>{language === "ne" ? "सबै पृष्ठहरू हेर्नुहोस्" : "Explore All Pages"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* SECTION DIVISION 02: Core Interactive Ephemeris Suite */}
      <div id="ephemeris-section" className="w-full">
        <div className="w-full bg-stone-100/90 border-y border-stone-200 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#C85A17] text-white font-bold tracking-wider">
              {language === "ne" ? "खण्ड ०२" : "ZONE 02"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {language === "ne"
                ? "वैदिक खगोलीय गणित तथा कुण्डली गणना केन्द्र"
                : "VEDIC EPHEMERIS & HOROSCOPE CALCULATION ENGINE"}
            </span>
          </div>
          <Link
            href="/ephemeris"
            className="text-[#C85A17] hover:text-[#A6440C] flex items-center gap-1 font-bold transition-colors"
          >
            <span className="hidden sm:inline">
              {language === "ne" ? "छुट्टै पूर्ण पृष्ठमा खोल्नुहोस्" : "Open Dedicated Page"}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <UnifiedEphemerisSuite onOpenInquiry={handleOpenInquiry} />
      </div>

      {/* SECTION DIVISION 03: Classical Vedic 4-Pillar Services Grid */}
      <div id="services-section" className="w-full">
        <div className="w-full bg-stone-100/90 border-y border-stone-200 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#C85A17] text-white font-bold tracking-wider">
              {language === "ne" ? "खण्ड ०३" : "ZONE 03"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {language === "ne"
                ? "गुरु निलहरिका चार प्रमुख परामर्श स्तम्भहरू"
                : "GURU NILHARI'S 4 CORE SERVICE PILLARS"}
            </span>
          </div>
          <Link
            href="/services"
            className="text-[#C85A17] hover:text-[#A6440C] flex items-center gap-1 font-bold transition-colors"
          >
            <span className="hidden sm:inline">
              {language === "ne" ? "सेवाहरूको पूर्ण विवरण" : "View Complete Services"}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <CompanySolutions onOpenInquiry={handleOpenInquiry} />
      </div>

      {/* SECTION DIVISION 04: Vedic Philosophy & Manifesto */}
      <div id="philosophy-section" className="w-full">
        <div className="w-full bg-[#0E1524] border-y border-stone-800 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-400">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-amber-600 text-white font-bold tracking-wider">
              {language === "ne" ? "खण्ड ०४" : "ZONE 04"}
            </span>
            <span className="font-bold text-amber-300 uppercase tracking-widest text-[11px] md:text-xs">
              {language === "ne"
                ? "वैदिक सिद्धान्त, गरिमा तथा आचारसंहिता"
                : "VEDIC ETHICS & PHILOSOPHICAL MANIFESTO"}
            </span>
          </div>
        </div>

        <AntiSlopManifesto />
      </div>

      {/* SECTION DIVISION 05: Guru Nilhari Profile */}
      <div id="leadership-section" className="w-full">
        <div className="w-full bg-stone-100/90 border-y border-stone-200 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#C85A17] text-white font-bold tracking-wider">
              {language === "ne" ? "खण्ड ०५" : "ZONE 05"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {language === "ne"
                ? "संस्थापक तथा प्रमुख परामर्शदाता: गुरु निलहरि"
                : "FOUNDER & CHIEF CONSULTANT: GURU NILHARI"}
            </span>
          </div>
          <Link
            href="/about"
            className="text-[#C85A17] hover:text-[#A6440C] flex items-center gap-1 font-bold transition-colors"
          >
            <span className="hidden sm:inline">
              {language === "ne" ? "पूर्ण जीवनी तथा केन्द्र" : "Full Biography & Centre"}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <CompanyLeadership onOpenInquiry={handleOpenInquiry} />
      </div>

      {/* SECTION DIVISION 06: Testimonials & Client Trust */}
      <div id="testimonials-section" className="w-full">
        <div className="w-full bg-stone-100/90 border-y border-stone-200 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#C85A17] text-white font-bold tracking-wider">
              {language === "ne" ? "खण्ड ०६" : "ZONE 06"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {language === "ne"
                ? "परामर्शदाता समीक्षा तथा विश्वव्यापी विश्वास"
                : "TESTIMONIALS & GLOBAL CLIENT FEEDBACK"}
            </span>
          </div>
        </div>

        <TestimonialsSection />
      </div>

      {/* SECTION DIVISION 07: Pre-Footer Scenic CTA Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* Deep Midnight Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Consultation Booking Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />
    </main>
  );
}
