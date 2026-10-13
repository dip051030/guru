"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconCalendar, IconPhone, IconWhatsApp } from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import PageHero from "@/components/PageHero";
import OnlineConsultationSection from "@/components/OnlineConsultationSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink, TEL_LINK, CONTACT_PHONE_DISPLAY } from "@/config/contact";

export default function ConsultationPage() {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative pb-16 md:pb-0">
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      <PageHero
        titleNe="परामर्श बुक गर्नुहोस्"
        titleEn="Book a consultation"
        descNe="सेवा, मिति र माध्यम छान्नुहोस्। गुरुज्यूको कार्यालयले समय पक्का गर्न सम्पर्क गर्नेछ।"
        descEn="Choose the service, date and mode. Guruji's office will contact you to confirm the time."
      />

      {/* Main Interactive Booking Engine */}
      <OnlineConsultationSection />


      {/* Pre-footer */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav onOpenInquiry={handleOpenInquiry} />
    </main>
  );
}
