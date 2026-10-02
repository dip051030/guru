"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconSparkles,
  IconGem,
  IconShoppingBag,
  IconArrowRight,
  IconCheckCircle,
} from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import HamroPatroHero from "@/components/HamroPatroHero";
import QuickServiceCards from "@/components/QuickServiceCards";
import AboutGuruSection from "@/components/AboutGuruSection";
import MainServicesSection from "@/components/MainServicesSection";
import HoroscopeExplorer from "@/components/HoroscopeExplorer";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
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
      {/* 1. Observatory Header */}
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* 2. Hero: Authentic Daily Nepali Calendar, Panchanga, Live Rates & Observatory */}
      <div id="calendar">
        <HamroPatroHero
          onScrollToConsole={() => scrollToSection("horoscope-section")}
          onOpenInquiry={handleOpenInquiry}
        />
      </div>

      {/* 3. Quick Service Gateways (linking to subpages) */}
      <QuickServiceCards onOpenInquiry={handleOpenInquiry} />

      {/* 4. Main Services Section (with CTA to /services) */}
      <MainServicesSection onOpenInquiry={handleOpenInquiry} />

      {/* 5. Dedicated Horoscope Portal Section */}
      <div id="horoscope-section" className="w-full">
        <div className="w-full bg-[#FAF7F2] border-y border-stone-200 py-3.5 px-6 lg:px-12 flex items-center justify-between text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-[#D95B16] text-white font-bold tracking-wider rounded-md">
              {isNe ? "राशिफल खण्ड" : "HOROSCOPE"}
            </span>
            <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] md:text-xs">
              {isNe
                ? "१२ राशिको दैनिक, साप्ताहिक तथा वार्षिक राशिफल"
                : "12 ZODIAC SIGNS: DAILY, WEEKLY & YEARLY FORECAST"}
            </span>
          </div>
          <Link
            href="/horoscope"
            className="text-[#D95B16] hover:text-[#B8480C] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>{isNe ? "पूर्ण राशिफल पृष्ठ" : "Full Horoscope Page"}</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D95B16] font-bold">
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

            <div className="mt-8 text-center">
              <Link
                href="/horoscope"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF7F2] border border-stone-200/90 hover:border-[#D95B16] text-stone-900 hover:text-[#D95B16] rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs"
              >
                <span>{isNe ? "सबै १२ राशिको विस्तृत राशिफल पृष्ठ खोल्नुहोस्" : "Explore Complete 12 Signs Horoscope Hub"}</span>
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 6. About Guru Nilhari & Sanatan Heritage */}
      <AboutGuruSection onOpenInquiry={handleOpenInquiry} />

      {/* 7. Spiritual Store & Consecrated Gemstones Spotlight */}
      <section className="w-full py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 text-[#D95B16] text-xs font-mono font-bold tracking-widest uppercase mb-3 rounded-full">
              <IconSparkles className="w-3.5 h-3.5" />
              <span>{isNe ? "आध्यात्मिक पसल तथा रत्न भण्डार" : "STORE & GEMSTONES"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 font-bold tracking-tight">
              {isNe ? "प्रामाणिक पूजा सामग्री तथा नवरत्न सङ्ग्रह" : "Spiritual Store & Consecrated Gemstones"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 font-light">
              {isNe
                ? "१००% शुद्ध, प्राण-प्रतिष्ठित वैदिक सामग्रीहरू तथा बेलायतभरि सुरक्षित डेलिभरी।"
                : "100% genuine consecrated Vedic samagri, natural gemstones, and reliable UK-wide delivery."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Store Preview Card */}
            <div className="bg-white rounded-2xl p-7 lg:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#D95B16] flex items-center justify-center mb-5">
                  <IconShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                  {isNe ? "धार्मिक तथा पूजा सामग्री" : "Spiritual Samagri & Puja Store"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-6">
                  {isNe
                    ? "स्फटिक माला, रुद्राक्ष, पञ्चधातु मूर्ति, पूजा थाली सेट, धूप, अगरबत्ती, कलावा र प्राण-प्रतिष्ठित यन्त्रहरू।"
                    : "Sacred Sphatik malas, genuine Rudraksha beads, brass puja thali sets, incense, and consecrated Vedic yantras."}
                </p>
                <div className="space-y-2 mb-6 text-xs text-stone-700 font-mono">
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "८ प्रमुख धार्मिक श्रेणीहरू" : "8 Essential Spiritual Categories"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "प्राण-प्रतिष्ठा संस्कार सम्पन्न" : "Consecrated with Vedic Mantras"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "बेलायतभरि २-३ दिनमा डेलिभरी" : "Tracked UK Delivery in 2-3 Days"}</span>
                  </div>
                </div>
              </div>
              <Link
                href="/store"
                className="w-full py-3 bg-[#D95B16] hover:bg-[#B8480C] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>{isNe ? "सामग्री सूची हेर्नुहोस्" : "Browse Spiritual Store"}</span>
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Gemstone Preview Card */}
            <div className="bg-white rounded-2xl p-7 lg:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#D95B16] flex items-center justify-center mb-5">
                  <IconGem className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                  {isNe ? "प्रामाणिक नवरत्न परामर्श तथा पहिचान" : "Authentic 9 Gemstone Consultation"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-6">
                  {isNe
                    ? "माणिक्य, मोती, मूँगा, पन्ना, पुखराज, हीरा, नीलम, गोमेद, लहसुनिया — कुण्डली अनुकूलता र ल्याब प्रमाणीकरण।"
                    : "Ruby, Pearl, Red Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat's Eye with lab certification."}
                </p>
                <div className="space-y-2 mb-6 text-xs text-stone-700 font-mono">
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "कुण्डली आधारित ग्रह रत्न चयन" : "Natal Chart Astrological Suitability"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "अन्तर्राष्ट्रिय ल्याब परीक्षण प्रमाणपत्र" : "Certified Natural Gemstones"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{isNe ? "शुभ साइतमा रत्न धारण विधि" : "Consecration & Wearing Protocol"}</span>
                  </div>
                </div>
              </div>
              <Link
                href="/store"
                className="w-full py-3 bg-[#0E1A2E] hover:bg-[#131B2E] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>{isNe ? "नवरत्न सूची तथा परामर्श" : "View 9 Gemstones & Consult"}</span>
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us Trust Factors */}
      <WhyChooseUsSection />

      {/* 9. Reviews & Client Testimonials */}
      <div id="testimonials-section" className="w-full">
        <TestimonialsSection />
      </div>

      {/* 10. Pre-Footer Scenic CTA Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* 11. Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* 12. Fixed Mobile Bottom Navigation */}
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
