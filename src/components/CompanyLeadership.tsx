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
    <section id="about-guru" className="w-full py-20 md:py-28 border-b border-stone-200 bg-[#FDFBF7] relative">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-orange-50 border border-orange-200 text-[#C85A17] text-xs font-mono tracking-widest uppercase mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#181411] font-bold tracking-tight">
            {t.about.title}
          </h2>
          <p className="mt-2 text-[#D97706] font-mono text-sm md:text-base font-bold">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Card with Sharp Frame & Bio */}
        <div className="bg-white rounded-none p-8 md:p-12 lg:p-14 border border-stone-300 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Classical Sharp Geometric Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative">
                {/* Sharp Geometric Frame */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-none bg-stone-50 border-2 border-stone-300 p-2 shadow-2xs flex items-center justify-center relative">
                  <div className="w-full h-full rounded-none bg-white border border-stone-200 flex flex-col items-center justify-center p-4">
                    <BrandLogo showText={false} size="lg" variant="dark" />
                    <span className="font-serif text-base font-bold text-[#181411] mt-3">
                      {t.about.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#C85A17] tracking-widest uppercase mt-1 font-bold">
                      {language === "ne" ? "मुख्य ज्योतिषाचार्य" : "Chief Jyotishacharya"}
                    </span>
                  </div>
                </div>

                {/* Floating Auspicious Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-none bg-[#C85A17] text-white text-xs font-mono font-bold shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3.5 h-3.5" />
                  <span>{language === "ne" ? "वैदिक महर्षि परम्परा" : "Vedic Maharshi Lineage"}</span>
                </div>
              </div>

              <div className="mt-8 text-xs font-mono text-stone-500">
                <span>{language === "ne" ? "काठमाडौँ उपत्यका • नेपाल" : "Kathmandu Valley • Nepal"}</span>
              </div>
            </div>

            {/* Right: Biography & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl text-[#181411] font-bold">
                  {t.about.headline}
                </h3>

                <p className="mt-4 text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  {t.about.p1}
                </p>

                <p className="mt-3 text-sm md:text-base text-stone-600 leading-relaxed font-light">
                  {t.about.p2}
                </p>
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 border-t border-stone-200">
                {HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-none bg-stone-50 border border-stone-200 text-center">
                    <div className="font-serif text-base lg:text-lg font-bold text-[#C85A17]">
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-[#181411] mt-0.5">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenInquiry(t.about.bookWithGuru)}
                  className="px-7 py-3 rounded-none bg-[#C85A17] hover:bg-[#A6440C] text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2 border border-[#C85A17]"
                >
                  <Calendar className="w-4 h-4 text-orange-200" />
                  <span>{t.about.bookWithGuru}</span>
                </button>

                <div className="text-xs font-mono text-stone-500">
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
