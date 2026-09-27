"use client";

import React from "react";
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Globe,
  Compass,
} from "lucide-react";

interface HeroProps {
  onScrollToConsole: () => void;
  onOpenInquiry: (topic?: string) => void;
}

export default function HeroThesis({
  onScrollToConsole,
  onOpenInquiry,
}: HeroProps) {
  return (
    <section className="relative w-full border-b border-border bg-gradient-to-b from-[#FDFBF7] via-[#FAF6EE] to-[#F5EFE6] pt-12 md:pt-16 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Thesis */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Cultural Eyebrow with decorative hyphens */}
            <div className="flex items-center gap-2 text-xs font-serif tracking-widest text-primary font-medium mb-4">
              <span className="text-secondary">—</span>
              <span>प्राचीन ज्ञान • आधुनिक जीवन</span>
              <span className="text-secondary">—</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-textHeading font-normal tracking-tight leading-[1.12]">
              ज्योतिष दर्शन
            </h1>

            <p className="mt-3 font-serif text-lg sm:text-xl md:text-2xl text-primary font-normal">
              तपाईंको जीवनयात्रामा वैदिक ज्योतिषको मार्गदर्शन
            </p>

            <p className="mt-5 text-sm sm:text-base text-textBody max-w-xl font-light leading-relaxed">
              जन्म कुण्डली, पञ्चाङ्ग गणना, ग्रह-नक्षत्रको प्रभाव र शास्त्रीय वैदिक उपायद्वारा
              जीवनका महत्वपूर्ण निर्णयहरूमा सही दिशा पाउनुहोस्। गुरु नील हरिको प्रत्यक्ष
              मार्गदर्शनमा अन्धविश्वास बिनाको प्रामाणिक परामर्श।
            </p>

            {/* Primary Action Button matching reference */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenInquiry("परामर्श सुरु गर्नुहोस्")}
                className="px-8 py-3.5 rounded-lg bg-primary text-textInverted text-sm font-sans font-medium hover:bg-primary-dark transition-all duration-200 flex items-center gap-2.5 shadow-card hover:shadow-hover group"
              >
                <Calendar className="w-4 h-4 text-secondary" />
                <span>परामर्श सुरु गर्नुहोस्</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToConsole}
                className="px-6 py-3.5 rounded-lg border border-border bg-surface text-textBody hover:text-foreground text-sm font-sans font-medium hover:border-secondary transition-all duration-200 flex items-center gap-2 shadow-soft"
              >
                <Compass className="w-4 h-4 text-secondary" />
                <span>कुण्डली गणना हेर्नुहोस्</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual composition matching the reference image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-secondary/30 bg-gradient-to-br from-[#FFF9EE] via-[#F8EFE0] to-[#EEDCC4] p-4 shadow-card flex items-center justify-center">
              {/* Soft celestial background circles */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg className="w-full h-full text-secondary" viewBox="0 0 400 300">
                  <circle cx="200" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="200" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Composition: Authentic Diamond Kundali Sheet on scripture */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {/* Traditional North-Indian Diamond Kundali Chart Sheet */}
                <div className="w-[82%] aspect-square max-h-[240px] bg-[#FFFDF8] border-2 border-secondary/70 rounded-lg p-2.5 shadow-hover relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-2 pointer-events-none">
                    <svg className="w-full h-full stroke-secondary/70 stroke-[1.2]">
                      <line x1="0" y1="0" x2="100%" y2="100%" />
                      <line x1="100%" y1="0" x2="0" y2="100%" />
                      <polygon
                        points="50%,0% 100%,50% 50%,100% 0%,50%"
                        fill="#FDF8F0"
                        className="stroke-primary/70 stroke-[1.5]"
                      />
                    </svg>
                  </div>

                  {/* House Text in Chart */}
                  <div className="absolute top-[16%] left-[32%] w-[36%] h-[20%] flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-[11px] text-primary font-bold">१ लग्न</span>
                    <span className="font-serif text-[10px] text-foreground font-semibold">कर्कट</span>
                  </div>
                  <div className="absolute top-[38%] left-[15%] w-[25%] h-[25%] flex items-center justify-center">
                    <span className="font-serif text-[10px] text-primary font-bold">४ सुख</span>
                  </div>
                  <div className="absolute bottom-[16%] left-[32%] w-[36%] h-[20%] flex items-center justify-center">
                    <span className="font-serif text-[10px] text-primary font-bold">७ विवाह</span>
                  </div>
                  <div className="absolute top-[38%] right-[15%] w-[25%] h-[25%] flex items-center justify-center">
                    <span className="font-serif text-[10px] text-primary font-bold">१० कर्म</span>
                  </div>
                </div>

                {/* Brass Diyo / Lamp accent bar */}
                <div className="mt-3 flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface/90 border border-secondary/40 shadow-soft text-xs font-serif text-textHeading">
                  <span className="text-secondary font-bold text-sm">ॐ</span>
                  <span>शुभम् भवतु • श्री गुरु नील हरि</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Feature Badges Strip matching reference */}
        <div className="mt-12 pt-8 border-t border-border/70 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shadow-soft shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-textHeading">
                विश्वासिलो परामर्श
              </h4>
              <p className="text-xs text-textMuted mt-0.5">सत्य र निष्पक्ष मार्गदर्शन</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shadow-soft shrink-0">
              <Award className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-textHeading">
                शास्त्रीय प्रामाणिकता
              </h4>
              <p className="text-xs text-textMuted mt-0.5">पाराशर र जैमिनी पद्धति</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shadow-soft shrink-0">
              <Users className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-textHeading">
                अनुभवी ज्योतिषाचार्य
              </h4>
              <p className="text-xs text-textMuted mt-0.5">२८+ वर्षको शास्त्रीय साधना</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full border border-secondary/50 bg-surface flex items-center justify-center text-primary shadow-soft shrink-0">
              <Globe className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-textHeading">
                अनलाइन तथा प्रत्यक्ष
              </h4>
              <p className="text-xs text-textMuted mt-0.5">स्वदेश तथा विदेशबाट सहज</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
