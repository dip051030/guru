"use client";

import React, { useState } from "react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import PageHero from "@/components/PageHero";
import KundaliTool from "@/components/KundaliTool";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function KundaliPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);
  const openInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground pb-16 lg:pb-0">
      <ObservatoryHeader onOpenInquiry={openInquiry} />
      <PageHero
        titleNe="जन्म कुण्डली"
        titleEn="Birth chart (Kundali)"
        descNe="जन्म मिति, समय र स्थान राख्नुहोस्: लग्न, ग्रह स्थिति, जन्म नक्षत्र र विंशोत्तरी दशा तुरुन्तै।"
        descEn="Enter date, time and place of birth to see your lagna, planetary positions, birth nakshatra and Vimshottari dasha."
        ctaNe="कुण्डली परामर्श"
        ctaEn="Book a reading"
        onCta={() => openInquiry("कुण्डली परामर्श (Kundali consultation)")}
      />
      <KundaliTool onOpenInquiry={openInquiry} />
      <PreFooterBanner onOpenInquiry={openInquiry} />
      <Footer onOpenInquiry={openInquiry} />
      <MobileBottomNav onOpenInquiry={openInquiry} />
      <InquiryDrawer isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} initialTopic={inquiryTopic} />
    </main>
  );
}
