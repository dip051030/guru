"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconAward,
} from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import PageHero from "@/components/PageHero";
import CompanyLeadership from "@/components/CompanyLeadership";
import AntiSlopManifesto from "@/components/AntiSlopManifesto";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, language } = useLanguage();
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
        titleNe="गुरु निलहरि"
        titleEn="About Guru Nilhari"
        descNe="वैदिक सनातन केन्द्र युकेका संस्थापक तथा मुख्य परामर्शदाता।"
        descEn="Founder and chief consultant of Vedic Sanatan Kendra UK."
        ctaNe="गुरुज्यूसँग परामर्श"
        ctaEn="Consult Guruji"
        onCta={() => handleOpenInquiry("गुरु निलहरिसँग परामर्श")}
      />

      {/* Leadership Bio Section */}
      <CompanyLeadership onOpenInquiry={handleOpenInquiry} />

      {/* Vedic Philosophy & Anti-Slop Manifesto */}
      <AntiSlopManifesto />


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

      {/* Fixed Mobile Bottom Nav */}
      <MobileBottomNav onOpenInquiry={handleOpenInquiry} />
    </main>
  );
}
