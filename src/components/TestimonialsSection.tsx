"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

export default function TestimonialsSection() {
  const { t, language } = useLanguage();

  const TESTIMONIALS: Testimonial[] = [
    {
      id: "sushma",
      name: language === "ne" ? "सुष्मा अधिकारी" : "Sushma Adhikari",
      role: language === "ne" ? "शिक्षिका तथा अभिभावक" : "Educator & Parent",
      location: language === "ne" ? "काठमाडौँ" : "Kathmandu",
      rating: 5,
      text:
        language === "ne"
          ? "विवाह कुण्डली मिलान र नवमांश विश्लेषणका लागि हामी गुरु नील हरिकहाँ पुगेका थियौं। उहाँले कुनै डर-त्रास नदेखाई दुवैको स्वभाव, गुण र ग्रह स्थितिको यथार्थ विश्लेषण गरिदिनुभयो। आज हाम्रो वैवाहिक जीवन अत्यन्त सुखमय छ।"
          : "We consulted Guru Neel Hari for our marriage kundali matching and Navamsha analysis. Without instilling any artificial fear, he accurately decoded both horoscopes and temperaments. Our married life has been deeply harmonious.",
      service: language === "ne" ? "विवाह कुण्डली मिलान" : "Matrimonial Matching",
    },
    {
      id: "ramesh",
      name: language === "ne" ? "रमेश श्रेष्ठ" : "Ramesh Shrestha",
      role: language === "ne" ? "उद्योगी तथा व्यवसायी" : "Industrialist & Founder",
      location: language === "ne" ? "काठमाडौँ / वीरगञ्ज" : "Kathmandu / Birgunj",
      rating: 5,
      text:
        language === "ne"
          ? "नयाँ उद्योगको शिलान्यास र मेसिन स्थापनाको शुभ साइत गुरुबाट गराएका हौं। समयको सही चयन र वास्तु शोधनले हाम्रो उद्योग प्रारम्भदेखि नै निर्विघ्न र सफल रूपमा अघि बढिरहेको छ। उहाँको वैज्ञानिक दृष्टि प्रशंसनीय छ।"
          : "Guru provided the electional muhurta and Vastu alignment for groundbreaking and machinery commissioning of our enterprise. The precision in timing gave our operations immense stability and prosperity.",
      service: language === "ne" ? "व्यावसायिक साइत तथा वास्तु" : "Enterprise Muhurta & Vastu",
    },
    {
      id: "pradip",
      name: language === "ne" ? "प्रदिप लामिछाने" : "Pradip Lamichhane",
      role: language === "ne" ? "सफ्टवेयर इन्जिनियर" : "Software Engineer",
      location: language === "ne" ? "सिड्नी, अष्ट्रेलिया" : "Sydney, Australia",
      rating: 5,
      text:
        language === "ne"
          ? "विदेशमा रहँदा करियरको अन्योलमा अनलाइन भिडियो परामर्श लिएको थिएँ। गुरुले विंशोत्तरी दशाको समय-सीमा ठ्याक्कै केलाइदिनुभयो। कुनै महँगो रत्न थोपर्ने काम नगरी सात्विक ध्यान र सत्कर्मको मार्ग देखाउनुभयो।"
          : "While navigating career cross-roads abroad, I booked an online video session. Guru pinpointed the transition timeline using Vimshottari dasha with stunning accuracy, advocating sattvic meditation over expensive gemstones.",
      service: language === "ne" ? "जन्म कुण्डली तथा दशा फल" : "Natal Kundali & Dasha",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 border-b border-border bg-[#F5EFEB] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy font-bold tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="mt-3 text-textMuted text-sm md:text-base leading-relaxed font-light">
            {t.testimonials.desc}
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 lg:p-8 border border-[#E8DFD1] shadow-card flex flex-col justify-between relative hover:border-terracotta/40 transition-all duration-300"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-terracotta/30" />
                </div>

                {/* Body Text */}
                <blockquote className="mt-5 text-sm md:text-base text-textBody leading-relaxed font-light italic">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
              </div>

              {/* Footer: User Details */}
              <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-navy text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-textMuted">
                    {item.role} • {item.location}
                  </p>
                </div>
                <div className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta font-medium">
                  {item.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-textMuted text-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.testimonials.verifiedReviews}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span>{t.testimonials.avgRating}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>{t.testimonials.consultationsDelivered}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
