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
import PageHero from "@/components/PageHero";
import SpiritualStoreSection from "@/components/SpiritualStoreSection";
import GemstoneSection from "@/components/GemstoneSection";
import PreFooterBanner from "@/components/PreFooterBanner";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/config/contact";

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

      <PageHero
        titleNe="पूजा सामग्री तथा रत्न"
        titleEn="Puja items & gemstones"
        descNe="पूजा, हवन र संस्कारका लागि सामग्री, रुद्राक्ष, यन्त्र र कुण्डली अनुसार रत्न। मूल्य र उपलब्धताका लागि सोध्नुहोस्।"
        descEn="Items for puja, havan and rituals, rudraksha, yantras, and gemstones chosen for your chart. Ask for price and availability."
        ctaNe="सोधपुछ गर्नुहोस्"
        ctaEn="Send an enquiry"
        onCta={() => handleOpenInquiry("स्टोर सोधपुछ")}
      />

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
