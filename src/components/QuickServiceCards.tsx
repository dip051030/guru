"use client";

import React from "react";
import {
  IconSparkles as Sparkles,
  IconCompass as Compass,
  IconFlame as Flame,
  IconClock as Clock,
  IconGem as Gem,
  IconSparkles as Palette,
  IconArrowRight as ArrowRight,
} from "./icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface QuickServiceCardsProps {
  onOpenInquiry: (topic?: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export default function QuickServiceCards({ onOpenInquiry, onSelectService }: QuickServiceCardsProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const services = [
    {
      id: "astrology",
      icon: Sparkles,
      titleNe: "वैदिक ज्योतिष शास्त्र",
      titleEn: "Vedic Astrology",
      descNe: "जन्म विवरण तथा परम्परागत ज्योतिषीय सिद्धान्तका आधारमा जीवनका विभिन्न पक्षबारे परामर्श।",
      descEn: "In-depth life and destiny guidance based on natal birth charts and traditional Vedic principles.",
      anchor: "#service-astrology",
    },
    {
      id: "vastu",
      icon: Compass,
      titleNe: "वास्तु शास्त्र",
      titleEn: "Vastu Shastra",
      descNe: "घर, कार्यालय तथा भवनको स्थान, दिशा र संरचनालाई परम्परागत वास्तु सिद्धान्तअनुसार अध्ययन।",
      descEn: "Residential & commercial architectural harmonization and directional spatial assessments.",
      anchor: "#service-vastu",
    },
    {
      id: "karmakanda",
      icon: Flame,
      titleNe: "कर्मकाण्ड तथा पूजा",
      titleEn: "Karmakanda & Puja Services",
      descNe: "सनातन वैदिक परम्पराअनुसार विभिन्न धार्मिक संस्कार, पूजा, हवन तथा अनुष्ठान।",
      descEn: "Sacred Vedic rituals, Griha Pravesh, peace homams, and life milestones conducted with traditional sanctity.",
      anchor: "#service-karmakanda",
    },
    {
      id: "muhurta",
      icon: Clock,
      titleNe: "शुभ मुहूर्त",
      titleEn: "Auspicious Muhurta",
      descNe: "विवाह, गृह प्रवेश, व्यापार शुभारम्भ तथा धार्मिक कार्यका लागि शुद्ध समय निर्धारण।",
      descEn: "Calculated auspicious timing for marriages, enterprise launches, property acquisition, and sacraments.",
      anchor: "#service-muhurta",
    },
    {
      id: "gemstones",
      icon: Gem,
      titleNe: "रत्न तथा जेमस्टोन",
      titleEn: "Gemstone Consultation",
      descNe: "कुण्डली अध्ययनका आधारमा प्राकृतिक रत्न पहिचान, परीक्षण तथा प्रमाणित जेमस्टोन परामर्श।",
      descEn: "Certified gemstone identification, natal chart alignment, and natural astrological gemstones.",
      anchor: "#service-gemstone",
    },
    {
      id: "colour",
      icon: Palette,
      titleNe: "रङ्ग थेरापी",
      titleEn: "Colour Therapy & Wellness",
      descNe: "परम्परागत रङ्ग तथा wellness-based अवधारणाका आधारमा दैनिक जीवनमा रङ्गको सन्तुलन।",
      descEn: "Traditional and complementary planetary color guidance for daily lifestyle harmony.",
      anchor: "#service-colour",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-[#FAF7F2] border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header conforming to Rule: Nepali Headline + English Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            हाम्रा प्रमुख सेवाहरू
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#C85A17] font-bold tracking-widest uppercase mt-1">
            Our Core Services & Guidance
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            वैदिक तथा सनातन परम्परासँग सम्बन्धित ज्योतिष, वास्तु, कर्मकाण्ड, शुभ मुहूर्त, रत्न तथा रङ्ग सम्बन्धी व्यक्तिगत परामर्श।
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#D95B16] transition-all hover:shadow-sm group"
              >
                <div>
                  <div className="w-12 h-12 bg-orange-50/80 border border-orange-200/60 text-[#D95B16] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D95B16] group-hover:text-white transition-all shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
                    {s.titleNe}
                  </h3>
                  <span className="text-[11px] font-mono text-[#D95B16] font-semibold block mb-2.5">
                    {s.titleEn}
                  </span>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {isNe ? s.descNe : s.descEn}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={s.anchor}
                    className="text-xs font-semibold text-stone-700 hover:text-[#D95B16] flex items-center gap-1 transition-colors"
                  >
                    <span>{isNe ? "विस्तृत विवरण" : "Learn More"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenInquiry(`${s.titleNe} (${s.titleEn})`)}
                    className="px-3.5 py-1.5 bg-orange-50 text-[#D95B16] border border-orange-200/70 hover:bg-[#D95B16] hover:text-white rounded-lg transition-all text-xs font-semibold shadow-2xs"
                  >
                    {isNe ? "परामर्श लिनुहोस्" : "Book"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
