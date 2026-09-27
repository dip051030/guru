"use client";

import React from "react";
import { Mail, Compass, Sparkles, Award, Users, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";

interface LeadershipProps {
  onOpenInquiry: (subject: string) => void;
}

export default function CompanyLeadership({ onOpenInquiry }: LeadershipProps) {
  const { t, language } = useLanguage();

  const HIGHLIGHTS = [
    {
      value: language === "ne" ? "३०+ वर्ष" : "30+ Years",
      label: language === "ne" ? "शास्त्रीय साधना" : "Classical Mastery",
      sub: language === "ne" ? "गुरुकुल परम्परामा दीक्षित" : "Trained in Gurukul Lineage",
    },
    {
      value: "२५,०००+",
      label: language === "ne" ? "परामर्श सेवाग्राही" : "Clients Advised",
      sub: language === "ne" ? "स्वदेश तथा विदेशमा" : "Nepal & Global Diaspora",
    },
    {
      value: "१००%",
      label: language === "ne" ? "सात्विक मार्गदर्शन" : "Sattvic Guidance",
      sub: language === "ne" ? "व्यापारिक विकृति रहित" : "Zero Commercial Rackets",
    },
    {
      value: language === "ne" ? "बालुवाटार" : "Baluwatar",
      label: language === "ne" ? "काठमाडौँ केन्द्र" : "Kathmandu Sanctum",
      sub: language === "ne" ? "प्रत्यक्ष र अनलाइन सेवा" : "In-Person & Encrypted Video",
    },
  ];

  return (
    <section id="about-guru" className="w-full py-20 md:py-28 border-b border-border bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy font-bold tracking-tight">
            {t.about.title}
          </h2>
          <p className="mt-2 text-gold font-mono text-sm md:text-base font-medium">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Card with Portrait & Bio */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 border border-[#EBE3D5] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Classical Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative">
                {/* Concentric Golden & Terracotta Rings */}
                <div className="absolute -inset-4 rounded-full border border-gold/30 animate-pulse pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-dashed border-gold/20 pointer-events-none" />

                {/* Circular Portrait Canvas */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#FFF5E6] to-[#F3E5D0] border-4 border-gold/60 p-2 shadow-xl flex items-center justify-center relative overflow-hidden">
                  {/* Atmospheric Glow */}
                  <div className="absolute inset-0 bg-radial from-gold/15 to-transparent pointer-events-none" />

                  {/* Auspicious Classical Emblem */}
                  <div className="w-full h-full rounded-full bg-[#FAF7F2] border-2 border-gold/40 flex flex-col items-center justify-center p-3 shadow-inner">
                    <BrandLogo showText={false} size="lg" variant="dark" />
                    <span className="font-serif text-base font-bold text-navy mt-2">
                      {t.about.title}
                    </span>
                    <span className="font-mono text-[10px] text-terracotta tracking-widest uppercase mt-0.5 font-semibold">
                      {language === "ne" ? "मुख्य ज्योतिषाचार्य" : "Chief Jyotishacharya"}
                    </span>
                  </div>
                </div>

                {/* Floating Auspicious Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-terracotta text-white text-xs font-mono font-medium shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3.5 h-3.5" />
                  <span>{language === "ne" ? "वैदिक महर्षि परम्परा" : "Vedic Maharshi Lineage"}</span>
                </div>
              </div>

              <div className="mt-8 text-xs font-mono text-textMuted">
                <span>{language === "ne" ? "काठमाडौँ उपत्यका • नेपाल" : "Kathmandu Valley • Nepal"}</span>
              </div>
            </div>

            {/* Right: Biography & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl text-navy font-bold">
                  {t.about.headline}
                </h3>

                <p className="mt-4 text-sm md:text-base text-textBody leading-relaxed font-light">
                  {t.about.p1}
                </p>

                <p className="mt-3 text-sm md:text-base text-textBody leading-relaxed font-light">
                  {t.about.p2}
                </p>
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#F0EBE1]">
                {HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5] text-center">
                    <div className="font-serif text-base lg:text-lg font-bold text-terracotta">
                      {item.value}
                    </div>
                    <div className="text-xs font-medium text-navy mt-0.5">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-textMuted mt-0.5 font-mono">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenInquiry(t.about.bookWithGuru)}
                  className="px-8 py-3.5 rounded-full bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.about.bookWithGuru}</span>
                </button>

                <div className="text-xs font-mono text-textMuted">
                  {t.about.inPersonOrOnline}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
