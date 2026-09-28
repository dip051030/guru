"use client";

import React, { useState } from "react";
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

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(
    undefined
  );

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  const scrollToEphemeris = () => {
    const el = document.getElementById("ephemeris");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* 1. Classical Sticky Header */}
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* 2. Hero Section: Authentic HamroPatro-style Nepali Calendar */}
      <HamroPatroHero
        onScrollToConsole={scrollToEphemeris}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 3. Core Interactive Ephemeris & Panchanga Calculation Suite */}
      <UnifiedEphemerisSuite onOpenInquiry={handleOpenInquiry} />

      {/* 4. Classical Vedic Services 6-Card Grid */}
      <CompanySolutions onOpenInquiry={handleOpenInquiry} />

      {/* 5. Contrast Deep Navy Section: Vedic Dignity, 4 Pillars & Golden Quote */}
      <AntiSlopManifesto />

      {/* 6. Guru Nilhari (CEO | Chief Consultant) Profile */}
      <CompanyLeadership onOpenInquiry={handleOpenInquiry} />

      {/* 7. Client Testimonials & Trust Metrics */}
      <TestimonialsSection />

      {/* 8. Pre-Footer Scenic CTA Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* 9. Deep Midnight Footer */}
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
