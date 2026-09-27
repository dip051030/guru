"use client";

import React from "react";
import { ShieldCheck, Compass, HeartHandshake, Flame, Sparkles } from "lucide-react";
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
    <section id="philosophy" className="w-full py-20 md:py-28 bg-[#12213A] text-white relative overflow-hidden">
      {/* Background Mandala & Sacred Orbital Pattern */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none" />
      <div className="absolute top-1/2 right-24 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-gold/15 pointer-events-none" />
      <div className="absolute top-1/2 right-40 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-dashed border-gold/20 pointer-events-none animate-spin-very-slow" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.manifesto.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            {t.manifesto.title}
          </h2>
          <p className="mt-3 text-[#A8B6C8] text-sm md:text-base leading-relaxed font-light">
            {t.manifesto.desc}
          </p>
        </div>

        {/* 2-Column Content: Left Pillars, Right Featured Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 4 Circular Pillars */}
          <div className="lg:col-span-6 space-y-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/[0.08] transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-full bg-terracotta/20 border border-terracotta/40 flex items-center justify-center shrink-0 mt-0.5 text-terracotta">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gold font-bold">
                        {pillar.num}.
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs md:text-sm text-[#B4C2D4] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Quote with Golden Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#182946] to-[#0F1D33] border border-gold/30 shadow-2xl overflow-hidden">
              {/* Decorative Accent */}
              <div className="text-gold/20 font-serif text-8xl md:text-9xl leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                “
              </div>

              <div className="relative z-10">
                <blockquote className="font-serif text-xl md:text-2xl text-[#FFF8EB] leading-relaxed font-normal italic">
                  &ldquo;{t.manifesto.quote}&rdquo;
                </blockquote>

                <div className="mt-8 pt-6 border-t border-gold/20 flex items-center gap-4">
                  <BrandLogo showText={false} size="lg" variant="gold" />
                  <div>
                    <h4 className="font-serif text-lg text-white font-bold">
                      {t.manifesto.author}
                    </h4>
                    <p className="text-xs font-mono text-gold mt-0.5">
                      {t.manifesto.role}
                    </p>
                    <p className="text-[11px] font-mono text-[#8C9EB6] mt-0.5">
                      {t.manifesto.org}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4 Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
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
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-mono text-xs md:text-sm font-bold text-gold">
                    {badge.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#8C9EB6] mt-0.5">
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
