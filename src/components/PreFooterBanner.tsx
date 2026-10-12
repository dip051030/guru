"use client";

import React from "react";
import {
  IconCalendar as Calendar,
  IconPhone as Phone,
  IconWhatsApp as WhatsApp,
  IconSparkles as Sparkles,
  IconShield as Shield,
  IconHeartHandshake as HeartHandshake,
  IconCheckCircle as CheckCircle,
} from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";
import { whatsappLink, TEL_LINK, WHATSAPP_GREETING } from "@/config/contact";

interface PreFooterBannerProps {
  onOpenInquiry: (subject?: string) => void;
}

export default function PreFooterBanner({ onOpenInquiry }: PreFooterBannerProps) {
  const { t, language } = useLanguage();

  return (
    <section className="w-full py-16 md:py-24 bg-[#131B2E] text-white relative">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center relative z-10 flex flex-col items-center">
        <div className="mb-4">
          <BrandLogo showText={false} size="lg" variant="gold" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-orange-500/10 text-[#F59E0B] border border-orange-500/30 text-xs font-mono tracking-widest uppercase mb-4 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>{t.preFooter.badge}</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
          {t.preFooter.title}
        </h2>

        <p className="mt-4 text-stone-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {t.preFooter.desc}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenInquiry(t.preFooter.bookNow)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-[#C85A17] text-white font-bold text-sm md:text-base hover:bg-[#A6440C] shadow-sm transition-all flex items-center justify-center gap-2.5 border border-[#C85A17]"
          >
            <Calendar className="w-4 h-4 text-orange-200" />
            <span>{t.preFooter.bookNow}</span>
          </button>

          <a
            href={whatsappLink(language === "ne" ? WHATSAPP_GREETING.ne : WHATSAPP_GREETING.en)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-[#25D366] hover:bg-[#1EBE5D] border border-[#25D366] text-white font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2.5"
          >
            <WhatsApp className="w-5 h-5" weight="fill" />
            <span>WhatsApp</span>
          </a>

          <a
            href={TEL_LINK}
            className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2.5"
          >
            <Phone className="w-4 h-4 text-[#F59E0B]" weight="fill" />
            <span className="font-mono">{t.preFooter.phoneText}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F59E0B]" />
            <span>{t.preFooter.privacy}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{t.preFooter.accuracy}</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#C85A17]" />
            <span>{t.preFooter.remedy}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
