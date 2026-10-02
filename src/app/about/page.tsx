"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconAward,
} from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import CompanyLeadership from "@/components/CompanyLeadership";
import AntiSlopManifesto from "@/components/AntiSlopManifesto";
import TestimonialsSection from "@/components/TestimonialsSection";
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

      {/* Breadcrumb & Subpage Hero Banner */}
      <section className="w-full bg-[#131B2E] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D95B16_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
              <IconArrowLeft size={14} />
              <span>{language === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {language === "ne" ? "गुरु निलहरिको परिचय" : "About Guru Nilhari"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-mono text-xs uppercase tracking-widest mb-3">
                <IconAward size={14} className="text-amber-400" />
                <span>CEO | CHIEF CONSULTANT</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {language === "ne"
                  ? "गुरु निलहरि तथा वैदिक सनातन केन्द्र युके"
                  : "Guru Nilhari & Vedic Sanatan Kendra UK"}
              </h1>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm md:text-base font-light leading-relaxed">
                {language === "ne"
                  ? "परम्परागत गुरुकुलीय वैदिक संस्कार, शुद्ध खगोलीय गणित र बेलायतबाट विश्वव्यापी सेवा प्रदान गर्दै आउनुभएका प्रमुख परामर्शदाता।"
                  : "Pioneering authentic Vedic Jyotish, genuine gemstone certification, classical Vastu alignment, and sacred karmakanda rites from the UK to the global diaspora."}
              </p>
            </div>

            <button
              onClick={() => handleOpenInquiry(t.header.bookConsultation)}
              className="px-6 py-3.5 bg-[#D95B16] hover:bg-[#B8480C] text-white font-bold text-sm flex items-center gap-2.5 rounded-xl border border-[#D95B16] transition-all shadow-md shrink-0 self-start md:self-auto active:scale-95"
            >
              <IconCalendar size={18} className="text-orange-200" />
              <span>{t.header.bookConsultation}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Leadership Bio Section */}
      <CompanyLeadership onOpenInquiry={handleOpenInquiry} />

      {/* Vedic Philosophy & Anti-Slop Manifesto */}
      <AntiSlopManifesto />

      {/* Client Testimonials */}
      <TestimonialsSection />

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
