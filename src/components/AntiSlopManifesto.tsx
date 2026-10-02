"use client";

import React from "react";
import {
  IconShield as ShieldCheck,
  IconCompass as Compass,
  IconHeartHandshake as HeartHandshake,
  IconFlame as Flame,
  IconSparkles as Sparkles,
} from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";

export default function AntiSlopManifesto() {
  const { t, language } = useLanguage();

  const PILLARS = [
    {
      num: language === "ne" ? "०१" : "01",
      icon: Compass,
      title:
        language === "ne"
          ? "प्रामाणिक सूर्य सिद्धान्त र दृक-गणित"
          : "Surya Siddhanta & Astronomical Rigor",
      desc:
        language === "ne"
          ? "काल्पनिक वा मनगढन्ते आधारमा होइन, चित्रापक्षीय अयनांश र खगोलीय दृक-सिद्ध गणितीय आधारमा कुण्डली तथा गोचरको विश्लेषण गरिन्छ।"
          : "No fabricated claims. Every natal chart and transit is computed using Chitrapaksha ayanamsha and high-precision celestial ephemeris.",
    },
    {
      num: language === "ne" ? "०२" : "02",
      icon: HeartHandshake,
      title:
        language === "ne"
          ? "व्यापारिक शोषण र कमिसनको अन्त्य"
          : "Zero Commercial Gemstone Exploitation",
      desc:
        language === "ne"
          ? "महँगा रत्न, उपरत्न वा औंठी बेच्ने व्यापारिक नियत राखिंदैन। सात्विक मन्त्र, ध्यान, दान र कर्मसुधार नै वास्तविक वैदिक उपाय हुन्।"
          : "We strictly prohibit selling costly gemstones or taking supplier commissions. Authentic Vedic remedies focus on sacred mantras, meditation, and charity.",
    },
    {
      num: language === "ne" ? "०३" : "03",
      icon: ShieldCheck,
      title:
        language === "ne"
          ? "मानसिक शान्ति र अभयदान"
          : "Freedom from Fear & Artificial Panic",
      desc:
        language === "ne"
          ? "कालसर्प वा मांगलिक योगको हौवा देखाएर कसैलाई मानसिक त्रास दिइँदैन। ज्योतिषको मूल ध्येय मानिसलाई भयमुक्त र सकारात्मक बनाउनु हो।"
          : "No anxiety-inducing traps leveraging Kaal Sarp or Manglik doshas. The true purpose of Jyotish is psychological peace and grounded reassurance.",
    },
    {
      num: language === "ne" ? "०४" : "04",
      icon: Flame,
      title:
        language === "ne"
          ? "कर्मप्रधान पुरुषार्थको जागरण"
          : "Awakening Moral Fortitude (Purushartha)",
      desc:
        language === "ne"
          ? "सबै भाग्यमै छ भनेर अल्छी बनाउने सोच वैदिक दर्शन विपरित हो। कुण्डलीले समयको मौसम देखाउँछ, सत्कर्म र पुरुषार्थ व्यक्तिले नै गर्नुपर्छ।"
          : "Fatalistic passivity violates Vedic philosophy. Natal charts map the weather of time; righteous effort and discernment remain in your hands.",
    },
  ];

  return (
    <section id="philosophy" className="w-full py-20 md:py-28 bg-[#131B2E] text-white relative">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#F59E0B] border border-orange-500/30 text-xs font-mono tracking-widest uppercase mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t.manifesto.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            {t.manifesto.title}
          </h2>
          <p className="mt-3 text-stone-300 text-sm md:text-base leading-relaxed font-light">
            {t.manifesto.desc}
          </p>
        </div>

        {/* 2-Column Content: Left Pillars, Right Featured Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 4 Rounded Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="flex items-start gap-4 p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D95B16]/80 hover:translate-x-1 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-md bg-[#D95B16]/15 border border-[#D95B16]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#F59E0B]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#F59E0B] font-bold">
                        {pillar.num}.
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs md:text-sm text-stone-300 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Quote with Rounded Border */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-lg p-8 md:p-10 bg-white/[0.03] border border-orange-500/20 flex-1 flex flex-col justify-between hover:border-orange-500/40 transition-colors duration-300">
              <div className="text-orange-500/20 font-serif text-7xl leading-none select-none pointer-events-none mb-2">
                “
              </div>

              <div>
                <blockquote className="font-serif text-xl md:text-2xl text-[#FFF8EB] leading-relaxed font-normal italic">
                  &ldquo;{t.manifesto.quote}&rdquo;
                </blockquote>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                  <BrandLogo showText={false} size="lg" variant="gold" />
                  <div>
                    <h4 className="font-serif text-lg text-white font-bold">
                      {t.manifesto.author}
                    </h4>
                    <p className="text-xs font-mono text-[#F59E0B] mt-0.5 font-bold">
                      {t.manifesto.role}
                    </p>
                    <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                      {t.manifesto.org}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4 Badges */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {[
                {
                  title: "१००%",
                  sub: language === "ne" ? "शास्त्रसम्मत" : "Shastra Compliant",
                },
                {
                  title: "०%",
                  sub: language === "ne" ? "व्यापारिक शोषण" : "Zero Commercialism",
                },
                {
                  title: language === "ne" ? "चित्रापक्षीय" : "Drik-Ganita",
                  sub: language === "ne" ? "अयनांश मानक" : "Ephemeris Standard",
                },
                {
                  title: language === "ne" ? "निःशर्त" : "Absolute",
                  sub: language === "ne" ? "गोपनीयता" : "Privacy Shield",
                },
              ].map((badge, idx) => (
                <div key={idx} className="p-3 rounded-md bg-white/[0.03] border border-white/10 hover:border-[#D95B16]/40 transition-colors">
                  <div className="font-mono text-xs md:text-sm font-bold text-[#F59E0B]">
                    {badge.title}
                  </div>
                  <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                    {badge.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
