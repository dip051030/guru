"use client";

import React, { useState } from "react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import HamroPatroHero from "@/components/HamroPatroHero";
import UnifiedEphemerisSuite from "@/components/UnifiedEphemerisSuite";
import CompanySolutions from "@/components/CompanySolutions";
import PortfolioWorks from "@/components/PortfolioWorks";
import CaseStudyModal, { CaseStudy } from "@/components/CaseStudyModal";
import AntiSlopManifesto from "@/components/AntiSlopManifesto";
import CompanyLeadership from "@/components/CompanyLeadership";
import TestimonialsSection from "@/components/TestimonialsSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );
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

      {/* 5. Applied Research & Consultations 6-Card Grid */}
      <PortfolioWorks onSelectStudy={(study) => setSelectedCaseStudy(study)} />

      {/* 6. Contrast Deep Navy Section: Vedic Dignity, 4 Pillars & Golden Quote */}
      <AntiSlopManifesto />

      {/* 7. Jyotishacharya Guru Neel Hari Profile */}
      <CompanyLeadership onOpenInquiry={handleOpenInquiry} />

      {/* 8. Client Testimonials & Trust Metrics */}
      <TestimonialsSection />

      {/* 9. Pre-Footer Scenic CTA Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* 10. Deep Midnight Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Modals & Booking Drawer */}
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenInquiry={handleOpenInquiry}
      />

      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />
    </main>
  );
}
