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

interface SolutionsProps {
  onOpenInquiry: (subject: string) => void;
}

const SERVICES = [
  {
    icon: Compass,
    title: "जन्म कुण्डली विश्लेषण",
    desc: "व्यक्तिगत जीवन, करियर, विवाह, स्वास्थ्य आदिका लागि विस्तृत विश्लेषण।",
  },
  {
    icon: Calendar,
    title: "पञ्चाङ्ग गणना",
    desc: "दैनिक, मासिक र वार्षिक पञ्चाङ्ग, तिथि, नक्षत्र, योग र करण।",
  },
  {
    icon: ShieldCheck,
    title: "ग्रह शान्ति तथा दोष निवारण",
    desc: "कालसर्प, मङ्गल दोष, साढेसाती आदिका लागि शास्त्रीय वैदिक उपायहरू।",
  },
  {
    icon: HeartHandshake,
    title: "विवाह मिलान",
    desc: "गुण मिलान, भकूट मिलान र वैवाहिक जीवनको सुखद भविष्य।",
  },
  {
    icon: TrendingUp,
    title: "करियर तथा व्यवसाय",
    desc: "उचित क्षेत्र छनोट र दीर्घकालीन व्यापार सफलताको मार्गदर्शन।",
  },
  {
    icon: Activity,
    title: "स्वास्थ्य तथा जीवनशैली",
    desc: "ग्रह प्रभाव अनुसार स्वास्थ्य, मानसिक शान्ति र सन्तुलित जीवनशैली।",
  },
];

export default function CompanySolutions({ onOpenInquiry }: SolutionsProps) {
  return (
    <section id="services" className="w-full py-16 md:py-24 border-b border-border bg-surface-cream/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header with Lotus emblem matching reference */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          {/* Subtle Lotus / Mandala icon */}
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C13 4.5 15.5 7 19 8C16 10 14 13.5 14 17C13 15 11 15 10 17C10 13.5 8 10 5 8C8.5 7 11 4.5 12 2Z" opacity="0.8" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-textHeading font-normal tracking-tight">
            शास्त्रीय वैदिक सेवाहरू
          </h2>
          <p className="mt-2 text-sm text-textMuted font-sans">
            परम्परागत ज्ञान, आधुनिक जीवनका लागि
          </p>
        </div>

        {/* 6 Clean Rounded Service Cards matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {SERVICES.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.title}
                className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between items-center text-center shadow-soft hover:shadow-card hover:border-secondary transition-all duration-300 group"
              >
                <div className="flex flex-col items-center">
                  {/* Circular Terracotta Icon Badge */}
                  <div className="w-13 h-13 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-textInverted transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-base font-semibold text-textHeading leading-snug group-hover:text-primary transition-colors">
                    {serv.title}
                  </h3>

                  <p className="mt-3 text-xs text-textMuted leading-relaxed font-light line-clamp-3">
                    {serv.desc}
                  </p>
                </div>

                <button
                  onClick={() => onOpenInquiry(`सेवा: ${serv.title}`)}
                  className="mt-6 flex items-center gap-1 text-xs font-sans font-medium text-primary hover:text-primary-dark group-hover:translate-x-0.5 transition-all"
                >
                  <span>विवरण हेर्नुहोस्</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
