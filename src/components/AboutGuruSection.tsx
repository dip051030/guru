"use client";

import React from "react";
import { CheckCircle2, Award, Phone, Calendar, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AboutGuruSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export default function AboutGuruSection({ onOpenInquiry }: AboutGuruSectionProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const keyFocus = [
    { ne: "परम्परागत वैदिक ज्ञान", en: "Traditional Vedic Knowledge" },
    { ne: "ज्योतिष परामर्श", en: "Astrology Consultation" },
    { ne: "वास्तु परामर्श", en: "Vastu Consultation" },
    { ne: "कर्मकाण्ड तथा संस्कार", en: "Karmakanda & Rituals" },
    { ne: "शुभ मुहूर्त निर्धारण", en: "Auspicious Muhurta" },
    { ne: "रत्न पहिचान तथा परामर्श", en: "Gemstone Consultation" },
    { ne: "रङ्ग वेल्नेस", en: "Colour Wellness" },
    { ne: "धार्मिक सामग्रीहरू", en: "Spiritual Products" },
  ];

  return (
    <section id="about" className="w-full py-16 md:py-24 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authority Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="w-full bg-[#0E1A2E] text-white p-8 sm:p-10 border border-stone-800 shadow-xl relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] uppercase font-bold tracking-widest">
                  UK REGISTERED
                </span>
              </div>

              <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-3xl font-black mb-6">
                ॐ
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                गुरु नीलहरी
              </h3>
              <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold tracking-wider block mt-0.5">
                GURU NILHARI
              </span>

              <div className="mt-3 pt-3 border-t border-stone-800">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold block">
                  CEO तथा प्रमुख परामर्शदाता
                </span>
                <span className="text-[11px] font-mono text-stone-300">
                  CEO & Chief Consultant
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-800 text-xs font-sans text-stone-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">वैदिक सनातन केन्द्र युके (Vedic Sanatan Kendra UK)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href="https://wa.me/447838820518" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 font-mono">
                    +44 7838 820518
                  </a>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry("गुरु नीलहरीसँग प्रत्यक्ष परामर्श")}
                className="mt-6 w-full py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-orange-200" />
                <span>{isNe ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio & Key Focus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
              गुरु नीलहरीको परिचय
            </h2>
            <span className="block text-xs sm:text-sm font-mono text-[#C85A17] font-bold tracking-widest uppercase mt-1">
              About Guru Nilhari • Vedic Sanatan Kendra UK
            </span>

            <p className="mt-5 text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              गुरु नीलहरी वैदिक सनातन परम्परा, ज्योतिष शास्त्र, वास्तु शास्त्र तथा कर्मकाण्ड सम्बन्धी सेवा र परामर्श प्रदान गर्दै आउनुभएको छ।
            </p>

            <div className="my-5 p-4 bg-[#FAF7F2] border-l-4 border-[#C85A17] text-stone-800">
              <span className="text-xs font-mono uppercase font-bold text-[#C85A17] block mb-1">
                {isNe ? "हाम्रो उद्देश्य:" : "Our Core Mission:"}
              </span>
              <p className="text-sm font-serif font-medium leading-relaxed">
                वैदिक ज्ञान र परम्परागत संस्कारलाई आधुनिक जीवनशैलीसँग सरल र बुझ्न सजिलो तरिकाले जोड्नु उहाँको सेवाको मुख्य उद्देश्य हो।
              </p>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-stone-500 font-bold mb-3 block">
              {isNe ? "मुख्य परामर्श विधा तथा सेवा क्षेत्र:" : "Key Areas of Focus:"}
            </span>

            {/* 8 Focus Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-8">
              {keyFocus.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 bg-stone-50 border border-stone-200 text-xs font-sans text-stone-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C85A17] shrink-0" />
                  <span className="font-bold">{f.ne}</span>
                  <span className="text-[11px] text-stone-500 font-mono">({f.en})</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenInquiry("गुरु नीलहरीसँग व्यक्तिगत परामर्श")}
                className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white text-xs sm:text-sm font-bold font-mono uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4 text-orange-200" />
                <span>{isNe ? "परामर्श लिनुहोस्" : "Book Consultation"}</span>
              </button>

              <a
                href="#services"
                className="px-6 py-3 bg-white border border-stone-300 hover:border-[#C85A17] text-stone-800 hover:text-[#C85A17] text-xs sm:text-sm font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>{isNe ? "सेवाहरू हेर्नुहोस्" : "Explore Services"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
