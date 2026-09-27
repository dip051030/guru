"use client";

import React from "react";
import { Calendar, Phone, Sparkles, Shield, HeartHandshake, CheckCircle } from "lucide-react";

interface PreFooterBannerProps {
  onOpenInquiry: (subject?: string) => void;
}

export default function PreFooterBanner({ onOpenInquiry }: PreFooterBannerProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#12213A] to-[#0D1829] text-white relative overflow-hidden">
      {/* Decorative Sky Stars / Circles */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>सत्य • निष्पक्षता • शास्त्रीय मर्यादा</span>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
          अब नै आफ्नो जन्म कुण्डली तथा शुभ साइत परामर्श लिनुहोस्
        </h2>

        <p className="mt-4 text-[#BAC7D8] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          काठमाडौँ बालुवाटारस्थित केन्द्रमा प्रत्यक्ष उपस्थित भएर वा संसारको जुनसुकै कुनाबाट अनलाइन भिडियो परामर्श मार्फत गुरु नील हरिसँग संवाद गर्नुहोस्।
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenInquiry("अग्रिम परामर्श बुकिङ")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta text-white font-medium text-sm md:text-base hover:bg-terracotta-dark shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>परामर्श बुक गर्नुहोस्</span>
          </button>

          <a
            href="tel:+97714412345"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm md:text-base transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span className="font-mono">+९७७ १ ४४१२३४५ / ९८५१०१२३४५</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#8F9FB5]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" />
            <span>गोपनीयताको पूर्ण प्रत्याभूति</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>शास्त्रीय दृक-सिद्ध शुद्धता</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-terracotta" />
            <span>सात्विक र निष्पक्ष मार्गदर्शन</span>
          </div>
        </div>
      </div>
    </section>
  );
}
