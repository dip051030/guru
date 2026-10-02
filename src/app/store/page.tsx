"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconShoppingBag,
  IconPhone,
  IconCheckCircle,
  IconArrowRight,
} from "@/components/icons/CustomIcons";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import SpiritualStoreSection from "@/components/SpiritualStoreSection";
import GemstoneSection from "@/components/GemstoneSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";

export default function StorePage() {
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

      {/* Store Header Banner */}
      <section className="w-full bg-[#131B2E] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D95B16_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
              <IconArrowLeft size={14} />
              <span>{isNe ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {isNe ? "धार्मिक सामग्री स्टोर" : "Spiritual Store"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-mono text-xs uppercase tracking-widest mb-3">
                <IconShoppingBag size={14} className="text-amber-400" />
                <span>{isNe ? "वैदिक सनातन केन्द्र युके" : "Vedic Sanatan Kendra UK"}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                {isNe ? "धार्मिक तथा पूजा सामग्री स्टोर" : "Authentic Spiritual & Puja Store"}
              </h1>
              <span className="block text-xs sm:text-sm font-mono text-amber-400 font-bold tracking-widest uppercase mt-2">
                Pure Puja Samagri, Certified Gemstones & Vedic Items
              </span>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm md:text-base font-light leading-relaxed">
                {isNe
                  ? "पूजा सामग्री, हवन सामग्री, रुद्राक्ष, जपमाला, प्राणप्रतिष्ठित यन्त्र, प्रमाणित नौ रत्न र ज्योतिषीय सामग्रीहरू एकै ठाउँमा।"
                  : "Authentic puja materials, havan samagri, natural rudraksha, energized yantras, laboratory-certified gemstones, and spiritual gifts delivered with reverence across the UK."}
              </p>
            </div>

            <a
              href="https://wa.me/447838820518?text=नमस्ते%20गुरु%20नीलहरी,%20मलाई%20सामग्री%20अर्डर%20गर्नु%20थियो।"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#D95B16] hover:bg-[#B8480C] text-white font-bold text-sm flex items-center gap-2 rounded-xl border border-[#D95B16] transition-all shadow-md shrink-0 self-start md:self-auto font-mono uppercase tracking-wider active:scale-95"
            >
              <IconPhone size={16} className="text-orange-200" />
              <span>{isNe ? "अर्डर तथा सोधपुछ (+44 7838 820518)" : "WhatsApp Order (+44 7838 820518)"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service-to-Product Connection Notice Banner */}
      <section className="w-full bg-amber-50/80 border-b border-amber-200/80 py-4 px-6 lg:px-12 text-stone-800 text-xs sm:text-sm">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <IconCheckCircle size={16} className="text-[#D95B16] shrink-0" />
            <p className="font-sans">
              <strong className="font-semibold text-stone-900">
                {isNe ? "पूजा तथा संस्कार सेवाग्राहीका लागि:" : "For Ritual & Puja Clients:"}
              </strong>{" "}
              {isNe
                ? "हाम्रा पूजा, हवन तथा संस्कार सेवाहरू बुक गर्दा आवश्यक सम्पूर्ण पूजा सामग्रीहरू पनि सँगै अर्डर गर्न सक्नुहुन्छ।"
                : "When booking Griha Pravesh, Vivah, or Graha Shanti rituals, all required consecrated materials can be packaged and supplied directly."}
            </p>
          </div>
          <Link
            href="/services"
            className="text-[#D95B16] font-bold hover:underline shrink-0 text-xs font-mono uppercase flex items-center gap-1"
          >
            <span>{isNe ? "पूजा सेवाहरू हेर्नुहोस्" : "View Puja Services"}</span>
            <IconArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Main Spiritual Store Section */}
      <SpiritualStoreSection onOpenInquiry={handleOpenInquiry} />

      {/* Certified Gemstones Catalog */}
      <GemstoneSection onOpenInquiry={handleOpenInquiry} />

      {/* Pre-footer Banner */}
      <PreFooterBanner onOpenInquiry={handleOpenInquiry} />

      {/* Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Inquiry Drawer */}
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
