"use client";

import React from "react";
import { BookOpen, UserCheck, MapPin, Layers, Lightbulb, Shield, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUsSection() {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const reasons = [
    {
      icon: BookOpen,
      titleNe: "परम्परागत ज्ञान",
      titleEn: "Traditional Vedic Knowledge",
      descNe: "प्राचीन सूर्यसिद्धान्त, दृक्-गणित र प्रामाणिक शास्त्रहरूमा आधारित शुद्ध गणना तथा विश्लेषण।",
      descEn: "Grounded strictly in authentic Shastras, Surya Siddhanta, and rigorous astronomical mathematics.",
    },
    {
      icon: UserCheck,
      titleNe: "व्यक्तिगत परामर्श",
      titleEn: "Personalised Consultation",
      descNe: "काल्पनिक डर वा व्यापारिक दबाबबिना, तपाईंको व्यक्तिगत कुण्डली अनुसार सात्विक र गोप्य मार्गदर्शन।",
      descEn: "100% confidential, tailor-made guidance free from commercial fear-mongering.",
    },
    {
      icon: MapPin,
      titleNe: "UK Based Service",
      titleEn: "UK-Based Service for Families",
      descNe: "बेलायतमा बसोबास गर्ने नेपाली तथा सनातन धर्मावलम्बीहरूका लागि स्थानीय समय र सुविधामा समर्पित।",
      descEn: "Direct in-person sessions in the United Kingdom alongside global remote video consultations.",
    },
    {
      icon: Layers,
      titleNe: "सेवा र सामग्री एउटै स्थानमा",
      titleEn: "Services & Products in One Place",
      descNe: "परामर्शदेखि पूजाका लागि आवश्यक सम्पूर्ण प्रामाणिक हवन, रुद्राक्ष तथा रत्न सामग्री एकै ठाउँबाट।",
      descEn: "From personalized consultation to certified puja kits, gemstones, and yantras under one roof.",
    },
    {
      icon: Lightbulb,
      titleNe: "सरल र स्पष्ट मार्गदर्शन",
      titleEn: "Simple & Clear Guidance",
      descNe: "जटिल ज्योतिषीय शब्दहरूलाई आधुनिक जीवनशैलीमा सजिलै बुझिने र व्यवहारमा उतार्न सकिने भाषामा प्रस्तुत।",
      descEn: "Vedic wisdom translated into clear, actionable, and pragmatic solutions for modern lifestyles.",
    },
    {
      icon: Heart,
      titleNe: "सनातन परम्पराप्रति सम्मान",
      titleEn: "Respect for Sanatan Traditions",
      descNe: "धर्म, संस्कृति, कुलपरम्परा र आध्यात्मिक मर्यादाको पूर्ण संरक्षण गर्दै सात्विक सेवा प्रवाह।",
      descEn: "Dedicated preservation of sacred rituals, cultural decorum, and ancestral values.",
    },
  ];

  return (
    <section id="why-choose-us" className="w-full py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header conforming to Rule */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            हामीलाई किन रोज्ने?
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#C85A17] font-bold tracking-widest uppercase mt-1">
            Why Choose Vedic Sanatan Kendra UK & Guru Nilhari?
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            वैदिक मर्यादा, निष्पक्ष सल्लाह, प्रमाणित सामग्री र बेलायतबाट विश्वस्तरीय सेवा।
          </p>
        </div>

        {/* 6 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#C85A17] transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="w-11 h-11 bg-amber-50 border border-amber-200 text-[#C85A17] flex items-center justify-center mb-4 group-hover:bg-[#C85A17] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {r.titleNe}
                  </h3>
                  <span className="text-xs font-mono text-[#C85A17] font-bold block mb-2.5">
                    {r.titleEn}
                  </span>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {isNe ? r.descNe : r.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
