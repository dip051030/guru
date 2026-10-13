"use client";

import React, { useState } from "react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import PageHero from "@/components/PageHero";
import HoroscopeExplorer from "@/components/HoroscopeExplorer";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function HoroscopePage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);
  const openInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 pb-16 lg:pb-0">
      <ObservatoryHeader onOpenInquiry={openInquiry} />
      <PageHero
        titleNe="दैनिक, साप्ताहिक तथा वार्षिक राशिफल"
        titleEn="Daily, weekly & yearly rashifal"
        descNe="आजको चन्द्र गोचर, यो हप्ताका शुभ दिन, र गुरु, शनि तथा राहु-केतुको वार्षिक गोचर: सबै लाहिडी अयनांशमा गणना गरिएको।"
        descEn="Today's Moon transit, this week's favourable days, and the year's Jupiter, Saturn and Rahu-Ketu transits, all computed with the Lahiri ayanamsha."
        ctaNe="व्यक्तिगत कुण्डली परामर्श"
        ctaEn="Personal reading"
        onCta={() => openInquiry("व्यक्तिगत कुण्डली तथा ग्रह गोचर विश्लेषण")}
      />
      <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1300px] mx-auto">
          <HoroscopeExplorer onOpenInquiry={openInquiry} />
        </div>
      </section>
      <PreFooterBanner onOpenInquiry={openInquiry} />
      <Footer onOpenInquiry={openInquiry} />
      <MobileBottomNav onOpenInquiry={openInquiry} />
      <InquiryDrawer isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} initialTopic={inquiryTopic} />
    </main>
  );
}
