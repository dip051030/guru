"use client";

import React from "react";
import {
  IconClock,
  IconHeart,
  IconHome,
  IconBriefcase,
  IconBuilding,
  IconSparkles,
  IconFlame,
  IconArrowRight,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface MuhurtaSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export default function MuhurtaSection({ onOpenInquiry }: MuhurtaSectionProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const occasions = [
    {
      icon: IconHeart,
      titleNe: "विवाह संस्कार",
      titleEn: "Vivah / Marriage",
      descNe: "वर-वधुको कुण्डली तथा त्रिबल शुद्धि अनुसार वैवाहिक जीवनको सुखद शुभारम्भका लागि शुभ लग्न।",
      descEn: "Tribala Shuddhi and lagna calculations for lasting matrimonial peace and harmony.",
    },
    {
      icon: IconHome,
      titleNe: "गृह प्रवेश",
      titleEn: "Griha Pravesh",
      descNe: "नयाँ घर वा अपार्टमेन्टमा प्रवेश गर्दा सूर्य-चन्द्रमाको अनुकूल स्थिति र वास्तु शान्ति साइत।",
      descEn: "Celestial alignment of the Sun and Moon for auspicious dwelling entry and peace.",
    },
    {
      icon: IconBriefcase,
      titleNe: "व्यवसाय तथा कम्पनी शुभारम्भ",
      titleEn: "Business & Company Launch",
      descNe: "व्यापारिक स्थायित्व, धन वृद्धि र नयाँ उद्यम सुरु गर्न लाभदायक लाभ/अमृत चौघडिया साइत।",
      descEn: "Commercial stability, venture founding, and wealth-attracting Choghadiya windows.",
    },
    {
      icon: IconBuilding,
      titleNe: "कार्यालय उद्घाटन तथा निर्माण",
      titleEn: "Office Opening & Construction",
      descNe: "जग्गा खन्ने, शिलान्यास गर्ने, नयाँ कार्यालय सञ्चालन गर्ने विशेष शुभ मुहूर्तावली।",
      descEn: "Foundation stone-laying, ground-breaking, and formal corporate inaugurations.",
    },
    {
      icon: IconSparkles,
      titleNe: "नामकरण तथा अन्नप्राशन",
      titleEn: "Namakaran & Pasni",
      descNe: "नवजात शिशुको नक्षत्र अनुसार नामकरण, अन्नप्राशन र पहिलो चूडाकर्म संस्कार।",
      descEn: "Nakshatra-based naming sacraments, weaning ceremonies, and tonsure rites.",
    },
    {
      icon: IconFlame,
      titleNe: "विशेष धार्मिक अनुष्ठान",
      titleEn: "Sacred Rituals & Homams",
      descNe: "महायज्ञ, नवग्रह शान्ति, रुद्राभिषेक र कुलपूजाका लागि पवित्र तिथि-नक्षत्र संयोग।",
      descEn: "Navagraha Shanti, Rudrabhishek, and ancestral family pujas.",
    },
  ];

  return (
    <section id="service-muhurta" className="w-full py-16 md:py-24 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header conforming to Rule */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-[#D95B16] rounded-full font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <IconClock size={14} />
            <span>VEDIC TIME ALIGNMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            शुभ मुहूर्त
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#D95B16] font-bold tracking-widest uppercase mt-1">
            Auspicious Muhurta Consultation
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            परम्परागत ज्योतिषीय सिद्धान्तअनुसार महत्वपूर्ण कार्य तथा धार्मिक संस्कारका लागि उपयुक्त समय सम्बन्धी परामर्श।
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {occasions.map((o, idx) => {
            const Icon = o.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#FAF7F2] border border-stone-200/90 rounded-2xl flex flex-col justify-between hover:border-[#D95B16] transition-all hover:bg-white hover:shadow-lg shadow-sm group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/90 text-[#D95B16] flex items-center justify-center mb-4 shadow-xs group-hover:bg-[#D95B16] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug">
                    {o.titleNe}
                  </h3>
                  <span className="text-xs font-mono text-[#D95B16] font-bold block mb-2">
                    {o.titleEn}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {isNe ? o.descNe : o.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60">
                  <button
                    onClick={() => onOpenInquiry(`शुभ मुहूर्त परामर्श: ${o.titleNe} (${o.titleEn})`)}
                    className="text-xs font-mono font-bold text-[#D95B16] hover:text-[#B8480C] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isNe ? "साइत निर्धारण बुक गर्नुहोस्" : "Determine Muhurta"}</span>
                    <IconArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0E1A2E] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-stone-800 shadow-md">
          <div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              {isNe ? "कुनै विशेष कार्यका लागि शुभ साइत आवश्यक छ?" : "Need an Auspicious Muhurta for an Upcoming Milestone?"}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
              {isNe
                ? "गुरु नीलहरीद्वारा दृक्-गणित, सूर्यसिद्धान्त र पञ्चाङ्ग शुद्धि अनुसार शुद्ध मुहूर्त निकालिन्छ।"
                : "Computed precisely using Drik-Ganita, Surya Siddhanta, and Panchanga Shuddhi."}
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry("शुभ मुहूर्त परामर्श (Auspicious Muhurta)")}
            className="px-6 py-3.5 bg-[#D95B16] hover:bg-[#B8480C] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 active:scale-95"
          >
            {isNe ? "मुहूर्त परामर्श लिनुहोस्" : "Book Muhurta Consultation"}
          </button>
        </div>

      </div>
    </section>
  );
}
