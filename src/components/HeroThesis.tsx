"use client";

import React, { useState } from "react";
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Compass,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface HeroProps {
  onScrollToConsole: () => void;
  onOpenInquiry: (topic?: string) => void;
}

export default function HeroThesis({
  onScrollToConsole,
  onOpenInquiry,
}: HeroProps) {
  const [activeHouse, setActiveHouse] = useState<number | null>(1);

  const HOUSES = [
    { num: 1, name: "लग्न", desc: "व्यक्तित्व, शरीर, आत्मा", planet: "सूर्य" },
    { num: 2, name: "धन", desc: "सम्पत्ति, वाणी, कुटुम्ब", planet: "बुध" },
    { num: 3, name: "सहज", desc: "पराक्रम, भ्रातृ, सङ्घर्ष", planet: "मंगल" },
    { num: 4, name: "सुख", desc: "माता, गृह, मनको शान्ति", planet: "चन्द्र" },
    { num: 5, name: "सुत", desc: "बुद्धि, सन्तान, विद्या", planet: "बृहस्पति" },
    { num: 6, name: "शत्रु", desc: "रोग, ऋण, प्रतिस्पर्धा", planet: "शनि" },
    { num: 7, name: "जाया", desc: "विवाह, साझेदारी, यात्रा", planet: "शुक्र" },
    { num: 8, name: "आयु", desc: "आयुष्य, गूढ विद्या, संकट", planet: "राहु" },
    { num: 9, name: "धर्म", desc: "भाग्य, गुरु, तीर्थाटन", planet: "बृहस्पति" },
    { num: 10, name: "कर्म", desc: "आजीविका, पद, प्रतिष्ठा", planet: "सूर्य" },
    { num: 11, name: "लाभ", desc: "आय, इच्छापूर्ति, मित्र", planet: "बुध" },
    { num: 12, name: "व्यय", desc: "खर्च, मोक्ष, विदेश यात्रा", planet: "केतु" },
  ];

  return (
    <section className="relative w-full border-b border-[#E8DFD1] bg-[#FAF7F2] pt-10 sm:pt-14 md:pt-16 pb-14 md:pb-20 overflow-hidden">
      {/* Delicate Atmospheric Ambient Radiance & Sacred Geometry Rings */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#F5E6CC]/40 via-[#F3DEBD]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-gold/15 pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-[400px] h-[400px] rounded-full border border-dashed border-terracotta/10 pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial & Thesis Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Observatory Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DAC8] shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-navy tracking-tight">
                काठमाडौँ वेधशाला • प्रत्यक्ष तथा अनलाइन परामर्श उपलब्ध
              </span>
            </div>

            {/* Classical Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-terracotta uppercase mb-3 font-semibold">
              <span className="text-gold">—</span>
              <span>प्राचीन सूर्य सिद्धान्त • शुद्ध दृक-गणित • जीवन दर्शन</span>
              <span className="text-gold">—</span>
            </div>

            {/* Master Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] text-navy font-bold tracking-tight leading-[1.12]">
              समयको लय, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-terracotta to-[#8F3316]">
                जीवनको स्पष्ट मार्गचित्र।
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 font-serif text-lg sm:text-xl text-gold font-medium">
              गुरु नील हरि • ३ दशकको प्रामाणिक साधना र शास्त्रसम्मत परामर्श
            </p>

            {/* Paragraph / Value Proposition */}
            <p className="mt-5 text-sm sm:text-base text-textBody max-w-2xl font-light leading-relaxed">
              काल्पनिक डर र व्यापारिक शोषणबिना, तपाईंको वास्तविक जन्म समय र ग्रह-नक्षत्रको सूक्ष्म गणितीय विश्लेषणबाट व्यक्तिगत जीवन, वैवाहिक सम्बन्ध, व्यापारिक साइत र भविष्यका महत्वपूर्ण निर्णयहरूमा स्पष्ट, सात्विक दिशा प्राप्त गर्नुहोस्।
            </p>

            {/* CTA Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenInquiry("परामर्श सुरु गर्नुहोस्")}
                className="px-8 py-4 rounded-full bg-terracotta text-white font-medium text-sm md:text-base hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 group"
              >
                <Calendar className="w-4 h-4" />
                <span>परामर्श सुरु गर्नुहोस्</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToConsole}
                className="px-7 py-4 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DCD0BE] text-navy font-medium text-sm md:text-base transition-all duration-200 flex items-center gap-2 shadow-sm hover:border-terracotta/40"
              >
                <Compass className="w-4 h-4 text-terracotta" />
                <span>कुण्डली गणना गर्नुहोस्</span>
              </button>
            </div>

            {/* Social Proof & Rating Snippet */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-[#EAE1D3] w-full">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-navy">
                ४.९५ / ५.०
              </span>
              <span className="text-xs text-textMuted font-mono">
                (२५,०००+ भन्दा बढी कुण्डली परामर्श सम्पन्न)
              </span>
            </div>
          </div>

          {/* Right Column: Aesthetic Celestial Astrolabe & Diamond Kundali Visualizer */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Container with Multi-layer Shadow & Parchment Tone */}
            <div className="relative w-full max-w-[480px] bg-gradient-to-b from-[#FFFDF9] to-[#F7EFE1] rounded-3xl p-6 sm:p-8 border border-[#E2D5C0] shadow-card">
              {/* Top Bar of the Visualizer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC9]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                  <span className="font-serif text-sm font-bold text-navy">
                    लग्न कुण्डली चक्र (D-1)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold font-medium">
                  <MapPin className="w-3 h-3 text-terracotta" />
                  <span>काठमाडौँ वेधशाला</span>
                </div>
              </div>

              {/* The Diamond Kundali Chart with Interactive House Cells */}
              <div className="mt-6 relative aspect-square w-full max-w-[340px] mx-auto bg-[#FFFDF8] border-2 border-gold/70 rounded-2xl p-3 shadow-inner flex items-center justify-center">
                {/* Background Sacred Geometric Lines */}
                <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] stroke-gold/60 stroke-[1.2] pointer-events-none">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                  <polygon
                    points="50%,0% 100%,50% 50%,100% 0%,50%"
                    fill="rgba(197,153,78,0.06)"
                    className="stroke-terracotta/70 stroke-[1.5]"
                  />
                </svg>

                {/* 12 Interactive Houses Layout */}
                {/* 1st House (Lagna / Ascendant) - Top Center */}
                <button
                  onClick={() => setActiveHouse(1)}
                  className={`absolute top-[16%] left-[32%] w-[36%] h-[20%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 1
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-terracotta">
                    १ लग्न
                  </span>
                  <span className="text-[10px] font-mono text-navy font-semibold">
                    कर्कट • चन्द्र
                  </span>
                </button>

                {/* 2nd House - Top Left */}
                <button
                  onClick={() => setActiveHouse(2)}
                  className={`absolute top-[4%] left-[12%] w-[22%] h-[18%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 2
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-[11px] font-bold text-navy">
                    २ धन
                  </span>
                </button>

                {/* 3rd House - Mid Upper Left */}
                <button
                  onClick={() => setActiveHouse(3)}
                  className={`absolute top-[26%] left-[4%] w-[18%] h-[20%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 3
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-[11px] font-bold text-navy">
                    ३ सहज
                  </span>
                </button>

                {/* 4th House (Sukha / Mind) - Mid Left */}
                <button
                  onClick={() => setActiveHouse(4)}
                  className={`absolute top-[40%] left-[16%] w-[22%] h-[20%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 4
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-terracotta">
                    ४ सुख
                  </span>
                  <span className="text-[9px] font-mono text-textMuted">गृह/मन</span>
                </button>

                {/* 7th House (Jaya / Marriage) - Bottom Center */}
                <button
                  onClick={() => setActiveHouse(7)}
                  className={`absolute bottom-[16%] left-[32%] w-[36%] h-[20%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 7
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-terracotta">
                    ७ जाया
                  </span>
                  <span className="text-[10px] font-mono text-navy font-semibold">
                    मकर • शनि
                  </span>
                </button>

                {/* 10th House (Karma / Profession) - Mid Right */}
                <button
                  onClick={() => setActiveHouse(10)}
                  className={`absolute top-[40%] right-[16%] w-[22%] h-[20%] rounded-lg flex flex-col items-center justify-center transition-all ${
                    activeHouse === 10
                      ? "bg-terracotta/15 border border-terracotta scale-105"
                      : "hover:bg-gold/10"
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-terracotta">
                    १० कर्म
                  </span>
                  <span className="text-[9px] font-mono text-textMuted">आजीविका</span>
                </button>

                {/* Center Auspicious Bindu */}
                <div className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center font-serif text-[10px] shadow-sm select-none">
                  ॐ
                </div>
              </div>

              {/* Active House Selected Detail Card */}
              {activeHouse && (
                <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#E8DEC9] shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-serif text-terracotta text-sm">
                      {HOUSES[activeHouse - 1].num} भाव ({HOUSES[activeHouse - 1].name}):
                    </span>
                    <span className="text-textBody ml-1.5 font-light">
                      {HOUSES[activeHouse - 1].desc}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] font-mono text-[10px] text-gold font-bold border border-[#E5DAC8]">
                    {HOUSES[activeHouse - 1].planet}
                  </span>
                </div>
              )}

              {/* Coordinates Pill */}
              <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex items-center justify-between text-[11px] font-mono text-textMuted">
                <span>अक्षांश: २७° ४३' उ.</span>
                <span>चित्रापक्षीय अयनांश: २४° ०९' ५३"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prestigious Institutional Badges Strip */}
        <div className="mt-14 pt-10 border-t border-[#E8DFD1] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                प्रामाणिक दृक-गणित
              </h4>
              <p className="text-xs text-textMuted mt-0.5">चित्रापक्षीय अयनांश मानक</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                ३०+ वर्ष साधना
              </h4>
              <p className="text-xs text-textMuted mt-0.5">पाराशर तथा जैमिनी पद्धति</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                शोषणमुक्त सात्विक
              </h4>
              <p className="text-xs text-textMuted mt-0.5">महँगो रत्न व्यापार निषेध</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                सम्पूर्ण गोपनीयता
              </h4>
              <p className="text-xs text-textMuted mt-0.5">प्रत्यक्ष तथा भिडियो परामर्श</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
