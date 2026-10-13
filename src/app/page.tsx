"use client";

import React, { useState } from "react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import PatroSection from "@/components/patro/PatroSection";
import DateTools from "@/components/patro/DateTools";
import RatesPanel from "@/components/patro/RatesPanel";
import HoroscopeExplorer from "@/components/HoroscopeExplorer";
import MainServicesSection from "@/components/MainServicesSection";
import AboutGuruSection from "@/components/AboutGuruSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-[#D95B16]">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-stone-900">{title}</h2>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  const openInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground pb-16 lg:pb-0">
      <ObservatoryHeader onOpenInquiry={openInquiry} />

      <PatroSection onOpenInquiry={openInquiry} />

      <section id="tools" className="w-full bg-[#FAF7F2] pb-12 px-4 sm:px-6 lg:px-10 scroll-mt-24">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow={isNe ? "उपयोगी साधन" : "Tools"} title={isNe ? "मिति तथा उमेर" : "Dates & age"} />
            <DateTools isNe={isNe} />
          </div>
          <div className="lg:col-span-7">
            <SectionTitle eyebrow={isNe ? "आजको बजार" : "Today's rates"} title={isNe ? "सुनचाँदी र विनिमय दर" : "Gold, silver & currency"} />
            <RatesPanel isNe={isNe} />
          </div>
        </div>
      </section>

      <section id="horoscope-section" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-10 bg-white border-y border-stone-200 scroll-mt-24">
        <div className="max-w-[1300px] mx-auto">
          <SectionTitle eyebrow={isNe ? "ग्रह गोचर" : "Planetary transits"} title={isNe ? "दैनिक, साप्ताहिक तथा वार्षिक राशिफल" : "Daily, weekly & yearly rashifal"} />
          <HoroscopeExplorer onOpenInquiry={openInquiry} />
        </div>
      </section>

      <MainServicesSection onOpenInquiry={openInquiry} />
      <AboutGuruSection onOpenInquiry={openInquiry} />
      <PreFooterBanner onOpenInquiry={openInquiry} />
      <Footer onOpenInquiry={openInquiry} />
      <MobileBottomNav onOpenInquiry={openInquiry} />

      <InquiryDrawer isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} initialTopic={inquiryTopic} />
    </main>
  );
}
