"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconShield,
  IconSparkles,
  IconPhone,
  IconCompass,
  IconBookOpen,
  IconGem,
  IconCheckCircle,
} from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import CompanySolutions from "@/components/CompanySolutions";
import MuhurtaSection from "@/components/MuhurtaSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
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
              {language === "ne" ? "चार सेवा स्तम्भहरू" : "4 Service Pillars"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-mono text-xs uppercase tracking-widest mb-3">
                <IconSparkles size={14} className="text-amber-400" />
                <span>{language === "ne" ? "वैदिक सनातन केन्द्र युके" : "Vedic Sanatan Kendra UK"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {language === "ne"
                  ? "परामर्श तथा चार प्रमुख सेवा स्तम्भहरू"
                  : "Consultation & 4 Core Service Pillars"}
              </h1>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm md:text-base font-light leading-relaxed">
                {language === "ne"
                  ? "गुरु निलहरि (CEO | Chief Consultant) द्वारा प्रत्यक्ष सञ्चालित: ज्योतिष, रत्न पहिचान, वास्तु शास्त्र र वैदिक कर्मकाण्ड।"
                  : "Personally conducted by Guru Nilhari (CEO | Chief Consultant): Astrology, Gemstone Identification, Vastu Shastra, and Vedic Karmakanda."}
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

      {/* 4 Pillars Deep Overview Strip */}
      <section className="w-full bg-[#FAF7F2] border-b border-stone-200 py-8 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-200/90 rounded-lg shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <IconBookOpen size={20} className="text-[#D95B16]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">PILLAR 01</span>
              <h4 className="text-xs md:text-sm font-bold text-stone-900 font-serif">
                {language === "ne" ? "ज्योतिष तथा कुण्डली" : "Astrology & Horoscope"}
              </h4>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200/90 rounded-lg shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <IconGem size={20} className="text-[#D95B16]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">PILLAR 02</span>
              <h4 className="text-xs md:text-sm font-bold text-stone-900 font-serif">
                {language === "ne" ? "रत्न पहिचान तथा परामर्श" : "Gemstone Identification"}
              </h4>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200/90 rounded-lg shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <IconCompass size={20} className="text-[#D95B16]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">PILLAR 03</span>
              <h4 className="text-xs md:text-sm font-bold text-stone-900 font-serif">
                {language === "ne" ? "वास्तु शास्त्र: घर र कार्यालय" : "Vastu Shastra: Home & Office"}
              </h4>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200/90 rounded-lg shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <IconSparkles size={20} className="text-[#D95B16]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold tracking-wider">PILLAR 04</span>
              <h4 className="text-xs md:text-sm font-bold text-stone-900 font-serif">
                {language === "ne" ? "कर्मकाण्ड: वैदिक पूजा" : "Karmakanda: Vedic Puja"}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Full Solutions Grid */}
      <CompanySolutions onOpenInquiry={handleOpenInquiry} />

      {/* Auspicious Muhurta Consultation Section */}
      <MuhurtaSection onOpenInquiry={handleOpenInquiry} />

      {/* Quality Guarantees & Consultation Standards */}
      <section className="w-full py-16 bg-white border-b border-stone-200 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D95B16] font-bold">
              {language === "ne" ? "परामर्शको मर्यादा तथा मापदण्ड" : "CONSULTATION PROTOCOL"}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-2">
              {language === "ne"
                ? "व्यावसायिक, गोप्य र प्रामाणिक वैदिक पद्धति"
                : "Professional, Confidential, & Rigorous Vedic Methodology"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-stone-200/90 rounded-lg bg-[#FAF7F2] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md bg-white border border-stone-200 flex items-center justify-center mb-5 text-[#D95B16] shadow-xs">
                <IconShield size={24} />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                {language === "ne" ? "१००% पूर्ण गोपनीयता" : "Strict Confidentiality"}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                {language === "ne"
                  ? "तपाईंको जन्म समय, पारिवारिक विवरण र व्यक्तिगत कुराहरू गुरु निलहरिसँग मात्र प्रत्यक्ष र गोप्य रहनेछन्।"
                  : "All birth records, family consultations, and personal matters remain strictly confidential with Guru Nilhari."}
              </p>
            </div>

            <div className="p-8 border border-stone-200/90 rounded-lg bg-[#FAF7F2] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md bg-white border border-stone-200 flex items-center justify-center mb-5 text-[#D95B16] shadow-xs">
                <IconCheckCircle size={24} />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                {language === "ne" ? "गणितीय शुद्धता" : "Mathematical Precision"}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                {language === "ne"
                  ? "प्रत्येक कुण्डली सूर्यसिद्धान्त, दृक्-गणित र लाहिडी अयनांशका आधारमा शुद्ध गणित निकालेर मात्र विश्लेषण गरिन्छ।"
                  : "Charts are computed using rigorous Drik-Ganita algorithms and Lahiri Ayanamsha for pinpoint temporal accuracy."}
              </p>
            </div>

            <div className="p-8 border border-stone-200/90 rounded-lg bg-[#FAF7F2] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-md bg-white border border-stone-200 flex items-center justify-center mb-5 text-[#D95B16] shadow-xs">
                <IconPhone size={24} />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                {language === "ne" ? "प्रत्यक्ष बेलायत तथा विश्वव्यापी" : "UK Centre & Global Access"}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                {language === "ne"
                  ? "बेलायतस्थित केन्द्रमा प्रत्यक्ष भेटघाट वा विश्वभरका लागि उच्च गतिको अनलाइन भिडियो परामर्श उपलब्ध छ।"
                  : "In-person sessions at Vedic Sanatan Kendra UK, or encrypted high-definition video consultations worldwide."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Booking Drawer */}
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
