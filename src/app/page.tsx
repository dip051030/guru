"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Compass,
  Clock,
  Gem,
  ShoppingBag,
  User,
  Star,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import HamroPatroHero from "@/components/HamroPatroHero";
import QuickServiceCards from "@/components/QuickServiceCards";
import AboutGuruSection from "@/components/AboutGuruSection";
import MainServicesSection from "@/components/MainServicesSection";
import MuhurtaSection from "@/components/MuhurtaSection";
import GemstoneSection from "@/components/GemstoneSection";
import SpiritualStoreSection from "@/components/SpiritualStoreSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import OnlineConsultationSection from "@/components/OnlineConsultationSection";
import HoroscopeExplorer from "@/components/HoroscopeExplorer";
import TestimonialsSection from "@/components/TestimonialsSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const isNe = language === "ne";
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
    <main className="min-h-screen flex flex-col bg-background text-foreground relative pb-16 md:pb-0">
      {/* 1. HEADER (Section 18) */}
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* 2. HERO: Authentic Daily Nepali Calendar, Panchanga, Live Rates & Observatory */}
      <div id="calendar">
        <HamroPatroHero
          onScrollToConsole={() => scrollToSection("horoscope-section")}
          onOpenInquiry={handleOpenInquiry}
        />
      </div>

      {/* 3. QUICK SERVICE CARDS (Section 18) */}
      <QuickServiceCards onOpenInquiry={handleOpenInquiry} />

      {/* 4. ABOUT GURU NILHARI (Section 18) */}
      <AboutGuruSection onOpenInquiry={handleOpenInquiry} />

      {/* 5. MAIN SERVICES (Section 18: Vedic Astrology, Vastu, Karmakanda, Colour Therapy) */}
      <MainServicesSection onOpenInquiry={handleOpenInquiry} />

      {/* 6. MUHURTA (Section 18) */}
      <MuhurtaSection onOpenInquiry={handleOpenInquiry} />

      {/* 7. GEMSTONE CONSULTATION (Section 18: Consultation + 9 Gemstones Catalogue) */}
      <GemstoneSection onOpenInquiry={handleOpenInquiry} />

      {/* 8. SPIRITUAL STORE (Section 18: 8 Categories & Product Selection) */}
      <SpiritualStoreSection onOpenInquiry={handleOpenInquiry} />

      {/* 9. WHY CHOOSE US (Section 18: 6 Simple Reasons) */}
      <WhyChooseUsSection />

      {/* 10. ONLINE CONSULTATION (Section 18: Step-by-Step Direct Scheduling) */}
      <OnlineConsultationSection />

      {/* DEDICATED HOROSCOPE ZONE (Section Division & Planetary Guidance) */}
      <div id="horoscope-section" className="w-full">
        <div className="w-full bg-stone-100/90 border-y border-stone-200 py-3 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#C85A17] text-white font-bold tracking-wider">
              {isNe ? "राशिफल खण्ड" : "HOROSCOPE"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {isNe
                ? "१२ राशिको दैनिक, साप्ताहिक तथा वार्षिक राशिफल"
                : "12 ZODIAC SIGNS: DAILY, WEEKLY & YEARLY FORECAST"}
            </span>
          </div>
          <span className="text-stone-500 font-mono hidden sm:inline text-xs">
            {isNe ? "लाहिडी अयनांश तथा दृक्-पद्धति" : "Lahiri Ayanamsha & Drik-Ganita"}
          </span>
        </div>

        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C85A17] font-bold">
                {isNe ? "ग्रह गोचर तथा भविष्यफल" : "PLANETARY TRANSITS & FORECAST"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1 font-bold">
                {isNe
                  ? "दैनिक, साप्ताहिक तथा वार्षिक राशिफल"
                  : "Daily, Weekly & Annual Horoscope"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-2">
                {isNe
                  ? "तपाईंको राशिको ग्रह गोचर, भाग्य प्रतिशत, शुभ रङ्ग, शुभ अंक र दैनिक सात्विक उपाय हेर्नुहोस्।"
                  : "Explore your sign's celestial energy, luck meter, lucky attributes, and auspicious daily Vedic remedies."}
              </p>
            </div>

            <HoroscopeExplorer onOpenInquiry={handleOpenInquiry} />
          </div>
        </section>
      </div>

      {/* 11. REVIEWS & TESTIMONIALS (Section 18) */}
      <div id="testimonials-section" className="w-full">
        <TestimonialsSection />
      </div>

      {/* Pre-Footer Scenic CTA Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* 12. FOOTER (Section 18: Brand, UK Disclaimer, Services vs Store) */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* 13. FIXED MOBILE BOTTOM NAVIGATION (Section 16: Home | Services | Store | Book | Contact) */}
      <MobileBottomNav onOpenInquiry={handleOpenInquiry} />

      {/* Consultation Booking Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />
    </main>
  );
}
