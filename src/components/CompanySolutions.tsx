"use client";

import React from "react";
import {
  Compass,
  Calendar,
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  Activity,
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
      title: language === "ne" ? "जन्म कुण्डली विश्लेषण" : "Natal Kundali Analysis",
      desc:
        language === "ne"
          ? "व्यक्तिगत जीवन, करियर, विवाह, स्वास्थ्य आदिका लागि विस्तृत विश्लेषण।"
          : "Comprehensive analysis of personal destiny, career trajectories, matrimonial prospects, and vitality.",
    },
    {
      icon: Calendar,
      title: language === "ne" ? "पञ्चाङ्ग गणना" : "Ephemeris & Panchanga",
      desc:
        language === "ne"
          ? "दैनिक, मासिक र वार्षिक पञ्चाङ्ग, तिथि, नक्षत्र, योग र करण।"
          : "Daily, monthly, and seasonal ephemeris, lunar tithi, nakshatras, yogas, and karanas.",
    },
    {
      icon: ShieldCheck,
      title: language === "ne" ? "ग्रह शान्ति तथा दोष निवारण" : "Graha Shanti & Remedial Rituals",
      desc:
        language === "ne"
          ? "कालसर्प, मङ्गल दोष, साढेसाती आदिका लागि शास्त्रीय वैदिक उपायहरू।"
          : "Authentic Vedic remedies, mantra recitation, and havan for Manglik, Kaal Sarp, and Sade Sati.",
    },
    {
      icon: HeartHandshake,
      title: language === "ne" ? "विवाह मिलान" : "Matrimonial Compatibility",
      desc:
        language === "ne"
          ? "गुण मिलान, भकूट मिलान र वैवाहिक जीवनको सुखद भविष्य।"
          : "In-depth Ashtakoota and Navamsha compatibility for enduring marital happiness.",
    },
    {
      icon: TrendingUp,
      title: language === "ne" ? "करियर तथा व्यवसाय" : "Enterprise & Career Strategy",
      desc:
        language === "ne"
          ? "उचित क्षेत्र छनोट र दीर्घकालीन व्यापार सफलताको मार्गदर्शन।"
          : "Auspicious venture timing (Muhurta), executive counsel, and business expansion.",
    },
    {
      icon: Activity,
      title: language === "ne" ? "स्वास्थ्य तथा जीवनशैली" : "Vitality & Spiritual Wellbeing",
      desc:
        language === "ne"
          ? "ग्रह प्रभाव अनुसार स्वास्थ्य, मानसिक शान्ति र सन्तुलित जीवनशैली।"
          : "Ayurvedic planetary constitution analysis and lifestyle harmony.",
    },
  ];

  return (
    <section id="services" className="w-full py-16 md:py-24 border-b border-border bg-[#FAF7F2]">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Section Header with Lotus emblem */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          {/* Subtle Lotus / Mandala icon */}
          <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta mb-3">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C13 4.5 15.5 7 19 8C16 10 14 13.5 14 17C13 15 11 15 10 17C10 13.5 8 10 5 8C8.5 7 11 4.5 12 2Z" opacity="0.8" />
            </svg>
          </div>

          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold">
            {t.solutions.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold tracking-tight mt-2">
            {t.solutions.title}
          </h2>
          <p className="mt-3 text-textMuted text-sm md:text-base font-light">
            {t.solutions.desc}
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-[#EBE3D5] shadow-card hover:border-terracotta/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Circular Terracotta Icon Badge */}
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-terracotta transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-textBody leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-terracotta group-hover:translate-x-1 transition-transform"
                  >
                    <span>{t.solutions.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-textMuted">
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
