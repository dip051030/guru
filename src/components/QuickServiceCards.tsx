"use client";

import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

interface QuickServiceCardsProps {
  onOpenInquiry: (topic?: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export default function QuickServiceCards({ onOpenInquiry }: QuickServiceCardsProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const services = [
    {
      num: "01",
      titleNe: "वैदिक ज्योतिष शास्त्र",
      titleEn: "VEDIC ASTROLOGY",
      descNe: "जन्म विवरण तथा परम्परागत ज्योतिषीय सिद्धान्तका आधारमा जीवनका विभिन्न पक्षबारे मार्गदर्शन।",
      descEn: "Life guidance across various dimensions based on birth details and traditional Vedic astrological principles.",
      anchor: "#service-astrology",
    },
    {
      num: "02",
      titleNe: "वास्तु शास्त्र",
      titleEn: "VASTU SHASTRA",
      descNe: "घर, कार्यालय तथा भवनको स्थान, दिशा र संरचनालाई परम्परागत वास्तु सिद्धान्तअनुसार अध्ययन।",
      descEn: "Traditional spatial, directional, and architectural harmonization for residences and offices.",
      anchor: "#service-vastu",
    },
    {
      num: "03",
      titleNe: "कर्मकाण्ड तथा पूजा",
      titleEn: "KARMAKANDA & PUJA SERVICES",
      descNe: "सनातन वैदिक परम्पराअनुसार विभिन्न धार्मिक संस्कार, पूजा, हवन तथा अनुष्ठान।",
      descEn: "Authentic Vedic sacraments, devotional pujas, holy havans, and spiritual rituals.",
      anchor: "#service-karmakanda",
    },
    {
      num: "04",
      titleNe: "शुभ मुहूर्त",
      titleEn: "AUSPICIOUS MUHURTA",
      descNe: "विवाह, गृह प्रवेश, व्यापार शुभारम्भ तथा धार्मिक कार्यका लागि शुद्ध समय निर्धारण।",
      descEn: "Precision calculation of propitious times for weddings, housewarmings, business inaugurations, and ceremonies.",
      anchor: "#service-muhurta",
    },
    {
      num: "05",
      titleNe: "रत्न तथा जेमस्टोन",
      titleEn: "GEMSTONE CONSULTATION",
      descNe: "कुण्डली अध्ययनका आधारमा प्राकृतिक रत्न पहिचान, परीक्षण तथा प्रमाणित जेमस्टोन परामर्श।",
      descEn: "Natural gemstone identification, planetary suitability testing, and certified gemstone consultation.",
      anchor: "#service-gemstone",
    },
    {
      num: "06",
      titleNe: "रङ थेरापी",
      titleEn: "COLOUR THERAPY & WELLNESS",
      descNe: "परम्परागत रङ्ग तथा wellness-based अवधारणाका आधारमा दैनिक जीवनमा सन्तुलन।",
      descEn: "Harmonizing daily life and energy based on traditional planetary color principles and wellness concepts.",
      anchor: "#service-colour",
    },
  ];

  return (
    <section id="core-services" className="w-full py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200/80 px-6 sm:px-10 lg:px-16 xl:px-20 relative overflow-hidden select-none">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Subtitle & Editorial Description */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-1 relative">
            <div>
              {/* Category Overline with Dash */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-4 h-[1.5px] bg-[#E06D2B]" />
                <span className="text-xs font-serif font-bold text-[#E06D2B] tracking-wide">
                  {isNe ? "हाम्रा सेवाहरू" : "OUR SERVICES"}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-black text-stone-900 leading-[1.18] tracking-tight">
                {isNe ? (
                  <>
                    आध्यात्मिक
                    <br />
                    मार्गका सेवाहरू
                  </>
                ) : (
                  <>
                    Services for
                    <br />
                    Spiritual Path
                  </>
                )}
              </h2>

              {/* English Sub-Headline */}
              <div className="mt-3">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] text-[#E06D2B] uppercase">
                  OUR CORE SERVICES & GUIDANCE
                </span>
                <div className="w-10 h-[2px] bg-[#E06D2B] mt-2.5 mb-6" />
              </div>

              {/* Editorial Summary Paragraph */}
              <p className="text-sm sm:text-[15px] font-sans text-stone-600 leading-[1.7] max-w-sm">
                {isNe
                  ? "वैदिक तथा सनातन परम्परामा आधारित जीवनयात्राका लागि ज्योतिष, वास्तु, कर्मकाण्ड, पूजा, मुहूर्त, रत्न तथा रङ सम्बन्धी मार्गदर्शन प्रदान गर्दछौं।"
                  : "We provide authentic guidance in Vedic astrology, Vastu, karmakanda, auspicious muhurta, gemstones, and colour wellness grounded in the timeless Sanatan tradition."}
              </p>
            </div>

            {/* Subtle Sacred Lotus Line Artwork (Bottom Left Corner) */}
            <div className="hidden lg:block pt-16 relative">
              <svg
                viewBox="0 0 200 200"
                className="w-44 h-44 text-[#E2D5C3]/70 stroke-current fill-none stroke-[0.85] pointer-events-none"
              >
                {/* Central Bud & Vertical Axis */}
                <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="3 3" opacity="0.6" />
                <path d="M100 30 C90 60 90 120 100 150 C110 120 110 60 100 30 Z" />
                {/* Inner Petals */}
                <path d="M100 50 C80 80 75 130 100 155 C125 130 120 80 100 50 Z" />
                {/* Mid Petals Left & Right */}
                <path d="M100 70 C60 90 55 140 100 160" />
                <path d="M100 70 C140 90 145 140 100 160" />
                {/* Outer Petals */}
                <path d="M100 90 C40 110 40 150 100 165" />
                <path d="M100 90 C160 110 160 150 100 165" />
                {/* Outer Calyx Base */}
                <path d="M100 110 C20 130 30 165 100 170" />
                <path d="M100 110 C180 130 170 165 100 170" />
                {/* Decorative Diamond Accent */}
                <polygon points="100,10 104,14 100,18 96,14" fill="currentColor" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Right Column: 6 Services Arranged in a 2-Column Clean Editorial Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
              {services.map((item) => (
                <div
                  key={item.num}
                  className="flex flex-col justify-between pt-1 border-t border-[#E8DFD2]/90 group transition-all"
                >
                  <div>
                    {/* Editorial Accent Number */}
                    <span className="block font-mono text-sm sm:text-base font-bold text-[#E06D2B] mb-2 tracking-wide">
                      {item.num}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-xl sm:text-[22px] font-serif font-black text-stone-900 tracking-tight leading-snug">
                      {item.titleNe}
                    </h3>

                    {/* English Sub-Heading */}
                    <span className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.18em] text-[#E06D2B] uppercase mt-1 mb-3">
                      {item.titleEn}
                    </span>

                    {/* Service Description */}
                    <p className="text-xs sm:text-[13.5px] font-sans text-stone-600 leading-[1.65] font-light">
                      {isNe ? item.descNe : item.descEn}
                    </p>
                  </div>

                  {/* Underlined 'विस्तृत विवरण →' Action Link */}
                  <div className="mt-5">
                    <button
                      onClick={() => onOpenInquiry(`${item.titleNe} (${item.titleEn})`)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-serif font-bold text-stone-900 hover:text-[#E06D2B] transition-colors group/link pb-0.5 border-b border-stone-900 hover:border-[#E06D2B]"
                    >
                      <span>{isNe ? "विस्तृत विवरण" : "Learn More"}</span>
                      <ArrowRight
                        size={13}
                        weight="bold"
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </button>
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

