"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Compass, Sparkles, Orbit, Clock } from "lucide-react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import UnifiedEphemerisSuite from "@/components/UnifiedEphemerisSuite";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function EphemerisPage() {
  const { t, language } = useLanguage();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative">
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* Breadcrumb & Subpage Hero Banner */}
      <section className="w-full bg-[#131B2E] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C85A17_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {language === "ne" ? "पञ्चाङ्ग तथा कुण्डली गणित" : "Vedic Ephemeris & Kundali Suite"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
                <Orbit className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === "ne" ? "दृक्-सिद्ध पञ्चाङ्ग इन्जिन" : "Drik-Ganita Ephemeris Engine"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {language === "ne"
                  ? "पञ्चाङ्ग, जन्म कुण्डली तथा ग्रह स्थिति गणित"
                  : "Vedic Ephemeris, Natal Chart & Planetary Transits"}
              </h1>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm md:text-base font-light leading-relaxed">
                {language === "ne"
                  ? "लाहिडी अयनांश र खगोलीय गणितमा आधारित ६-मोड्युल वैदिक गणना प्रणाली। तिथि, नक्षत्र, योग, करण, विंशोत्तरी दशा र विवाह कुण्डली मिलान।"
                  : "Six dedicated modules powered by high-precision Swiss Ephemeris principles and Lahiri Ayanamsha: Panchanga, Kundali, Muhurta, Matchmaking, Graha Spashta, and Sky Map."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpenInquiry(t.header.bookConsultation)}
                className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-bold text-sm flex items-center gap-2 border border-[#C85A17] transition-all shadow-md shrink-0"
              >
                <Calendar className="w-4 h-4 text-orange-200" />
                <span>{language === "ne" ? "कुण्डली परामर्श लिनुहोस्" : "Book Chart Consultation"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Unified Calculation Suite */}
      <UnifiedEphemerisSuite onOpenInquiry={handleOpenInquiry} />

      {/* Pre-Footer Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* Footer */}
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
