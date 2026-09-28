"use client";

import React from "react";
import {
  Compass,
  Calendar,
  Sparkles,
  HeartHandshake,
  Home,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SolutionsProps {
  onOpenInquiry: (subject: string) => void;
}

export default function CompanySolutions({ onOpenInquiry }: SolutionsProps) {
  const { t, language } = useLanguage();

  const SERVICES = [
    {
      icon: Compass,
      tag: "PILLAR 01",
      tagNe: "स्तम्भ ०१",
      title: language === "ne" ? "ज्योतिष तथा कुण्डली (Astrology)" : "Astrology (Jyotish & Horoscope)",
      sub: "Jyotish & Horoscope",
      desc:
        language === "ne"
          ? "जन्म कुण्डली विश्लेषण, विंशोत्तरी दशा, करियर, विवाह तथा जीवनका महत्वपूर्ण निर्णयहरूको प्रामाणिक शास्त्रसम्मत मार्गदर्शन।"
          : "Comprehensive natal chart mapping, planetary dashas, career pathways, and matrimonial life guidance.",
    },
    {
      icon: Sparkles,
      tag: "PILLAR 02",
      tagNe: "स्तम्भ ०२",
      title: language === "ne" ? "रत्न पहिचान (Gemstone Identification)" : "Gemstone Identification",
      sub: "Ratna Consultation",
      desc:
        language === "ne"
          ? "ग्रह अनुकूलताका लागि प्रामाणिक प्राकृतिक रत्न पहिचान, परीक्षण र निष्पक्ष शास्त्रीय परामर्श (रत्न बिक्री होइन, सत्य परीक्षण)।"
          : "Certified gemological identification, testing, and impartial astrological compatibility analysis.",
    },
    {
      icon: Home,
      tag: "PILLAR 03",
      tagNe: "स्तम्भ ०३",
      title: language === "ne" ? "वास्तु शास्त्र (Vastu Shastra)" : "Vastu Shastra",
      sub: "Home & Office Harmony",
      desc:
        language === "ne"
          ? "घर, आवास, व्यापारिक प्रतिष्ठान तथा कार्यालयका लागि पञ्चतत्व सन्तुलन, दिशा शोधन र समृद्धिदायक वास्तु परामर्श।"
          : "Spatial 5-element harmonization, architectural alignment, and energetic optimization for residences & workspaces.",
    },
    {
      icon: Flame,
      tag: "PILLAR 04",
      tagNe: "स्तम्भ ०४",
      title: language === "ne" ? "कर्मकाण्ड (Karmakanda)" : "Karmakanda",
      sub: "Vedic Rituals & Puja",
      desc:
        language === "ne"
          ? "रुद्राभिषेक, ग्रह शान्ति, वास्तु पूजा, सत्यनारायण कथा तथा शास्त्रीय वैदिक विधि अनुसार यज्ञ-अनुष्ठान।"
          : "Authentic Vedic rituals, Graha Shanti havans, Rudrabhishek, and consecrated spiritual ceremonies.",
    },
    {
      icon: Calendar,
      tag: "COMPLEMENTARY",
      tagNe: "पूरक सेवा",
      title: language === "ne" ? "नेपाली पात्रो तथा पञ्चाङ्ग" : "Nepali Patro & Panchanga",
      sub: "Ephemeris & Timings",
      desc:
        language === "ne"
          ? "दैनिक, मासिक र वार्षिक पञ्चाङ्ग, तिथि, नक्षत्र, योग, करण र चाडपर्व निर्णयको प्रामाणिक दृक-गणित।"
          : "High-precision solar & lunar ephemeris, tithis, nakshatras, yogas, and authentic festival dates.",
    },
    {
      icon: HeartHandshake,
      tag: "COMPLEMENTARY",
      tagNe: "पूरक सेवा",
      title: language === "ne" ? "विवाह मिलान तथा शुभ साइत" : "Matrimonial Muhurta",
      sub: "Compatibility & Auspicious Timing",
      desc:
        language === "ne"
          ? "अष्टकूट गुण मिलान, नाडी तथा मांगलिक विचार र विवाह, गृहप्रवेश, व्यापारको शुभ लग्न साइत।"
          : "In-depth Ashtakoota compatibility, Navamsha synastry, and consecrated Muhurta timing for life milestones.",
    },
  ];

  return (
    <section id="services" className="w-full py-16 md:py-24 border-b border-stone-200 bg-[#FDFBF7]">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Section Header with Lotus emblem */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          {/* Sharp Saffron Emblem Box */}
          <div className="w-10 h-10 rounded-none bg-orange-50 border border-orange-200 flex items-center justify-center text-[#C85A17] mb-3">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C13 4.5 15.5 7 19 8C16 10 14 13.5 14 17C13 15 11 15 10 17C10 13.5 8 10 5 8C8.5 7 11 4.5 12 2Z" opacity="0.8" />
            </svg>
          </div>

          <span className="text-xs font-mono tracking-widest text-[#D97706] uppercase font-bold">
            {t.solutions.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#181411] font-bold tracking-tight mt-2">
            {t.solutions.title}
          </h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base font-light">
            {t.solutions.desc}
          </p>
        </div>

        {/* 6-Card Services Grid - Sharp Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-none p-7 border border-stone-200/70 shadow-2xs hover:border-[#C85A17]/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Square Saffron Icon Badge */}
                    <div className="w-12 h-12 rounded-none bg-orange-50/80 text-[#C85A17] border border-orange-200/60 flex items-center justify-center group-hover:bg-[#C85A17] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200/60">
                      {language === "ne" ? service.tagNe : service.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#181411] group-hover:text-[#C85A17] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <div className="text-xs font-mono text-[#D97706] font-bold mt-1">
                    {service.sub}
                  </div>
                  <p className="mt-2.5 text-sm text-stone-600 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85A17] group-hover:translate-x-1.5 transition-transform duration-200"
                  >
                    <span>{t.solutions.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-stone-400 font-bold">
                    {index + 1 < 10 ? `०${index + 1}` : index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
