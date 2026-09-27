"use client";

import React from "react";
import { ShieldCheck, Compass, HeartHandshake, Flame, Sparkles } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function AntiSlopManifesto() {
  const PILLARS = [
    {
      num: "०१",
      icon: Compass,
      title: "प्रामाणिक सूर्य सिद्धान्त र दृक-गणित",
      desc: "काल्पनिक वा मनगढन्ते आधारमा होइन, चित्रापक्षीय अयनांश र खगोलीय दृक-सिद्ध गणितीय आधारमा कुण्डली तथा गोचरको विश्लेषण गरिन्छ।"
    },
    {
      num: "०२",
      icon: HeartHandshake,
      title: "व्यापारिक शोषण र कमिसनको अन्त्य",
      desc: "महँगा रत्न, उपरत्न वा औंठी बेच्ने व्यापारिक नियत राखिंदैन। सात्विक मन्त्र, ध्यान, दान र कर्मसुधार नै वास्तविक वैदिक उपाय हुन्।"
    },
    {
      num: "०३",
      icon: ShieldCheck,
      title: "मानसिक शान्ति र अभयदान",
      desc: "कालसर्प वा मांगलिक योगको हौवा देखाएर कसैलाई मानसिक त्रास दिइँदैन। ज्योतिषको मूल ध्येय मानिसलाई भयमुक्त र सकारात्मक बनाउनु हो।"
    },
    {
      num: "०४",
      icon: Flame,
      title: "कर्मप्रधान पुरुषार्थको जागरण",
      desc: "सबै भाग्यमै छ भनेर अल्छी बनाउने सोच वैदिक दर्शन विपरित हो। कुण्डलीले समयको मौसम देखाउँछ, सत्कर्म र पुरुषार्थ व्यक्तिले नै गर्नुपर्छ।"
    }
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>वैदिक मर्यादा र निष्ठा</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            वैदिक ज्योतिषको गरिमा र मूल्याङ्कन
          </h2>
          <p className="mt-3 text-[#A8B6C8] text-sm md:text-base leading-relaxed font-light">
            ज्योतिष भनेको अन्धविश्वास फैलाउने वा त्रासमा पारेर व्यापार गर्ने माध्यम होइन। यो जीवनको लय बुझ्ने गहन आध्यात्मिक विज्ञान हो।
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
                  &ldquo;ज्योतिष मानिसलाई डराउन वा भाग्यवादी बनाउन होइन, उसको अन्तर्निहित शक्ति, विवेक र उचित समय पहिचान गरी जीवनलाई सार्थक बनाउने दिव्य प्रकाश हो।&rdquo;
                </blockquote>

                <div className="mt-8 pt-6 border-t border-gold/20 flex items-center gap-4">
                  <BrandLogo showText={false} size="lg" variant="gold" />
                  <div>
                    <h4 className="font-serif text-lg text-white font-bold">
                      गुरु नील हरि
                    </h4>
                    <p className="text-xs font-mono text-gold mt-0.5">
                      संस्थापक तथा मुख्य ज्योतिषाचार्य
                    </p>
                    <p className="text-[11px] font-mono text-[#8C9EB6] mt-0.5">
                      नील हरि वैदिक ज्योतिष केन्द्र, बालुवाटार, काठमाडौँ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4 Badges */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { title: "१००%", sub: "शास्त्रसम्मत" },
                { title: "०%", sub: "व्यापारिक शोषण" },
                { title: "चित्रापक्षीय", sub: "अयनांश मानक" },
                { title: "निःशर्त", sub: "गोपनीयता" },
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
