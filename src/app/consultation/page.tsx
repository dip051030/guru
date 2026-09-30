"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ShieldCheck, Sparkles, Phone } from "lucide-react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import OnlineConsultationSection from "@/components/OnlineConsultationSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

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

      {/* Hero Banner */}
      <section className="w-full bg-[#131B2E] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C85A17_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isNe ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {isNe ? "परामर्श बुकिङ" : "Consultation Booking"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{isNe ? "वैदिक सनातन केन्द्र युके" : "Vedic Sanatan Kendra UK"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {isNe ? "व्यक्तिगत परामर्श बुकिङ" : "Book a Vedic Consultation"}
              </h1>
              <span className="block text-xs sm:text-sm font-mono text-amber-400 font-bold tracking-widest uppercase mt-2">
                Online Video Sessions & In-Person UK Appointments
              </span>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm md:text-base font-light leading-relaxed">
                {isNe
                  ? "गुरु नीलहरीसँग प्रत्यक्ष वा भिडियो कल मार्फत आफ्नो जन्म कुण्डली, वास्तु, शुभ साइत, रत्न वा कर्मकाण्ड सम्बन्धी परामर्श लिनुहोस्।"
                  : "Direct consultation with Guru Nilhari (CEO & Chief Consultant) via high-definition video call or in-person UK appointment."}
              </p>
            </div>

            <a
              href="https://wa.me/447838820518"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-bold text-sm flex items-center gap-2 border border-[#C85A17] transition-all shadow-md shrink-0 self-start md:self-auto font-mono uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-orange-200" />
              <span>+44 7838 820518 (WhatsApp)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Interactive Booking Engine */}
      <OnlineConsultationSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

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
