"use client";

import React, { useState } from "react";
import {
  IconCalendar as Calendar,
  IconArrowRight as ArrowRight,
  IconShield as ShieldCheck,
  IconAward as Award,
  IconSparkles as Sparkles,
  IconCompass as Compass,
  IconStar as Star,
  IconMapPin as MapPin,
  IconCheckCircle as CheckCircle2,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface HeroProps {
  onScrollToConsole: () => void;
  onOpenInquiry: (topic?: string) => void;
}

export default function HeroThesis({
  onScrollToConsole,
  onOpenInquiry,
}: HeroProps) {
  const { t, language } = useLanguage();
  const [activeHouse, setActiveHouse] = useState<number | null>(1);

  const HOUSES = [
    {
      num: 1,
      name: language === "ne" ? "लग्न" : "Lagna (Ascendant)",
      desc: language === "ne" ? "व्यक्तित्व, शरीर, आत्मा" : "Self, Vitality & Appearance",
      planet: language === "ne" ? "सूर्य" : "Sun",
      label: language === "ne" ? "कर्कट • चन्द्र" : "Cancer • Moon",
    },
    {
      num: 2,
      name: language === "ne" ? "धन" : "Dhana (Wealth)",
      desc: language === "ne" ? "सम्पत्ति, वाणी, कुटुम्ब" : "Wealth, Speech & Family",
      planet: language === "ne" ? "बुध" : "Mercury",
      label: language === "ne" ? "सिंह • सूर्य" : "Leo • Sun",
    },
    {
      num: 3,
      name: language === "ne" ? "सहज" : "Sahaja (Courage)",
      desc: language === "ne" ? "पराक्रम, भ्रातृ, सङ्घर्ष" : "Siblings, Valor & Efforts",
      planet: language === "ne" ? "मंगल" : "Mars",
      label: language === "ne" ? "कन्या • बुध" : "Virgo • Mercury",
    },
    {
      num: 4,
      name: language === "ne" ? "सुख" : "Sukha (Home/Mind)",
      desc: language === "ne" ? "माता, गृह, मनको शान्ति" : "Mother, Property & Inner Peace",
      planet: language === "ne" ? "चन्द्र" : "Moon",
      label: language === "ne" ? "तुला • शुक्र" : "Libra • Venus",
    },
    {
      num: 5,
      name: language === "ne" ? "सुत" : "Suta (Children)",
      desc: language === "ne" ? "बुद्धि, सन्तान, विद्या" : "Intellect, Progeny & Creative Spark",
      planet: language === "ne" ? "बृहस्पति" : "Jupiter",
      label: language === "ne" ? "वृश्चिक • मंगल" : "Scorpio • Mars",
    },
    {
      num: 6,
      name: language === "ne" ? "शत्रु" : "Shatru (Challenges)",
      desc: language === "ne" ? "रोग, ऋण, प्रतिस्पर्धा" : "Debts, Health & Competition",
      planet: language === "ne" ? "शनि" : "Saturn",
      label: language === "ne" ? "धनु • गुरु" : "Sagittarius • Jupiter",
    },
    {
      num: 7,
      name: language === "ne" ? "जाया" : "Jaya (Spouse)",
      desc: language === "ne" ? "विवाह, साझेदारी, यात्रा" : "Marriage, Partnership & Business",
      planet: language === "ne" ? "शुक्र" : "Venus",
      label: language === "ne" ? "मकर • शनि" : "Capricorn • Saturn",
    },
    {
      num: 8,
      name: language === "ne" ? "आयु" : "Ayu (Longevity)",
      desc: language === "ne" ? "आयुष्य, गूढ विद्या, संकट" : "Occult, Longevity & Transformation",
      planet: language === "ne" ? "राहु" : "Rahu",
      label: language === "ne" ? "कुम्भ • शनि" : "Aquarius • Saturn",
    },
    {
      num: 9,
      name: language === "ne" ? "धर्म" : "Dharma (Destiny)",
      desc: language === "ne" ? "भाग्य, गुरु, तीर्थाटन" : "Fortune, Philosophy & Higher Wisdom",
      planet: language === "ne" ? "बृहस्पति" : "Jupiter",
      label: language === "ne" ? "मीन • गुरु" : "Pisces • Jupiter",
    },
    {
      num: 10,
      name: language === "ne" ? "कर्म" : "Karma (Career)",
      desc: language === "ne" ? "आजीविका, पद, प्रतिष्ठा" : "Profession, Ambition & Public Status",
      planet: language === "ne" ? "सूर्य" : "Sun",
      label: language === "ne" ? "मेष • मंगल" : "Aries • Mars",
    },
    {
      num: 11,
      name: language === "ne" ? "लाभ" : "Labha (Gains)",
      desc: language === "ne" ? "आय, इच्छापूर्ति, मित्र" : "Income, Desires & High Connections",
      planet: language === "ne" ? "बुध" : "Mercury",
      label: language === "ne" ? "वृष • शुक्र" : "Taurus • Venus",
    },
    {
      num: 12,
      name: language === "ne" ? "व्यय" : "Vyaya (Liberation)",
      desc: language === "ne" ? "खर्च, मोक्ष, विदेश यात्रा" : "Foreign Travel, Solitude & Moksha",
      planet: language === "ne" ? "केतु" : "Ketu",
      label: language === "ne" ? "मिथुन • बुध" : "Gemini • Mercury",
    },
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
                {t.hero.statusPill}
              </span>
            </div>

            {/* Classical Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-terracotta uppercase mb-3 font-semibold">
              <span className="text-gold">—</span>
              <span>{t.hero.eyebrow}</span>
              <span className="text-gold">—</span>
            </div>

            {/* Master Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] text-navy font-bold tracking-tight leading-[1.12]">
              {t.hero.titleLine1} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-terracotta to-[#8F3316]">
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 font-serif text-lg sm:text-xl text-gold font-medium">
              {t.hero.subtitle}
            </p>

            {/* Paragraph / Value Proposition */}
            <p className="mt-5 text-sm sm:text-base text-textBody max-w-2xl font-light leading-relaxed">
              {t.hero.desc}
            </p>

            {/* CTA Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenInquiry(t.hero.ctaPrimary)}
                className="px-8 py-4 rounded-full bg-terracotta text-white font-medium text-sm md:text-base hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 group"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToConsole}
                className="px-7 py-4 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DCD0BE] text-navy font-medium text-sm md:text-base transition-all duration-200 flex items-center gap-2 shadow-sm hover:border-terracotta/40"
              >
                <Compass className="w-4 h-4 text-terracotta" />
                <span>{t.hero.ctaSecondary}</span>
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
                {t.hero.rating}
              </span>
              <span className="text-xs text-textMuted font-mono">
                {t.hero.ratingCount}
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
                    {t.hero.chartTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold font-medium">
                  <MapPin className="w-3 h-3 text-terracotta" />
                  <span>{t.hero.observatory}</span>
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
                    {language === "ne" ? "१ लग्न" : "1 Lagna"}
                  </span>
                  <span className="text-[10px] font-mono text-navy font-semibold">
                    {HOUSES[0].label}
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
                    {language === "ne" ? "२ धन" : "2 Wealth"}
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
                    {language === "ne" ? "३ सहज" : "3 Valor"}
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
                    {language === "ne" ? "४ सुख" : "4 Sukha"}
                  </span>
                  <span className="text-[9px] font-mono text-textMuted">
                    {language === "ne" ? "गृह/मन" : "Home/Mind"}
                  </span>
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
                    {language === "ne" ? "७ जाया" : "7 Spouse"}
                  </span>
                  <span className="text-[10px] font-mono text-navy font-semibold">
                    {HOUSES[6].label}
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
                    {language === "ne" ? "१० कर्म" : "10 Karma"}
                  </span>
                  <span className="text-[9px] font-mono text-textMuted">
                    {language === "ne" ? "आजीविका" : "Career"}
                  </span>
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
                      {HOUSES[activeHouse - 1].num} {language === "ne" ? "भाव" : "House"} ({HOUSES[activeHouse - 1].name}):
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
                <span>{t.hero.lat}</span>
                <span>{t.hero.ayanamsha}</span>
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
                {t.hero.b1Title}
              </h4>
              <p className="text-xs text-textMuted mt-0.5">{t.hero.b1Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                {t.hero.b2Title}
              </h4>
              <p className="text-xs text-textMuted mt-0.5">{t.hero.b2Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                {t.hero.b3Title}
              </h4>
              <p className="text-xs text-textMuted mt-0.5">{t.hero.b3Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border border-gold/40 bg-white flex items-center justify-center text-terracotta shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-navy">
                {t.hero.b4Title}
              </h4>
              <p className="text-xs text-textMuted mt-0.5">{t.hero.b4Sub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
