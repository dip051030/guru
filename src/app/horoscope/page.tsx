"use client";

import React, { useState } from "react";
import Link from "next/link";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import HoroscopeExplorer from "@/components/HoroscopeExplorer";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  IconArrowRight as ArrowRight,
  IconSparkles as Sparkles,
  IconSun as Sun,
  IconMoon as Moon,
  IconStar as Star,
  IconCalendar as Calendar,
  IconPhone as Phone,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function HoroscopePage() {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] relative pb-16 md:pb-0">
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* Subpage Hero Header Banner */}
      <section className="w-full bg-[#0D1524] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D95B16_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <span>{isNe ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {isNe ? "दैनिक तथा वार्षिक राशिफल" : "Horoscope & Planetary Transits"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isNe ? "१२ राशिको ग्रह गोचर फल" : "12 Zodiac Signs Astrological Forecast"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight font-bold">
                {isNe
                  ? "दैनिक, साप्ताहिक तथा वार्षिक राशिफल"
                  : "Daily, Weekly & Annual Horoscope"}
              </h1>
              <span className="block text-xs sm:text-sm font-mono text-amber-400 font-bold tracking-widest uppercase mt-2">
                Lahiri Ayanamsha • Drik-Ganita Calculations • Astrological Guidance
              </span>
              <p className="mt-3 text-stone-300 text-sm md:text-base font-light leading-relaxed">
                {isNe
                  ? "सूर्य सिद्धान्त र चित्रापक्षीय अयनांशमा आधारित बाह्र राशिको विस्तृत फलादेश। ग्रह गोचर, भाग्य प्रतिशत, शुभ रङ्ग, शुभ अंक र सात्विक वैदिक उपायहरू।"
                  : "Comprehensive celestial transits and guidance for all 12 signs based on high-precision Chitrapaksha ayanamsha. Explore luck meters, favorable colors, numbers, and remedies."}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => handleOpenInquiry("व्यक्तिगत कुण्डली तथा ग्रह गोचर विश्लेषण")}
                className="px-5 py-2.5 rounded-xl bg-[#D95B16] hover:bg-[#B8470B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{isNe ? "व्यक्तिगत कुण्डली परामर्श" : "Personal Kundali Consultation"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Interactive Horoscope Explorer */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <HoroscopeExplorer onOpenInquiry={handleOpenInquiry} />
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenInquiry={handleOpenInquiry} />

      {/* Consultation Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />
    </main>
  );
}
