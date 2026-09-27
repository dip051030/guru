"use client";

import React from "react";
import { Mail, Compass, Sparkles, Award, Users, ShieldCheck, MapPin, Calendar } from "lucide-react";

interface LeadershipProps {
  onOpenInquiry: (subject: string) => void;
}

export default function CompanyLeadership({ onOpenInquiry }: LeadershipProps) {
  const HIGHLIGHTS = [
    {
      value: "३०+ वर्ष",
      label: "शास्त्रीय साधना",
      sub: "गुरुकुल परम्परामा दीक्षित"
    },
    {
      value: "२५,०००+",
      label: "परामर्श सेवाग्राही",
      sub: "स्वदेश तथा विदेशमा"
    },
    {
      value: "१००%",
      label: "सात्विक मार्गदर्शन",
      sub: "व्यापारिक विकृति रहित"
    },
    {
      value: "बालुवाटार",
      label: "काठमाडौँ केन्द्र",
      sub: "प्रत्यक्ष र अनलाइन सेवा"
    }
  ];

  return (
    <section id="about-guru" className="w-full py-20 md:py-28 border-b border-border bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ज्योतिषाचार्य परिचय</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy font-bold tracking-tight">
            गुरु नील हरि
          </h2>
          <p className="mt-2 text-gold font-mono text-sm md:text-base font-medium">
            संस्थापक तथा मुख्य ज्योतिषाचार्य • ३० वर्षको शास्त्रीय अनुभव
          </p>
        </div>

        {/* Content Card with Portrait & Bio */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 border border-[#EBE3D5] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Classical Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative">
                {/* Concentric Golden & Terracotta Rings */}
                <div className="absolute -inset-4 rounded-full border border-gold/30 animate-pulse pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-dashed border-gold/20 pointer-events-none" />
                
                {/* Circular Portrait Canvas */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#FFF5E6] to-[#F3E5D0] border-4 border-gold/60 p-2 shadow-xl flex items-center justify-center relative overflow-hidden">
                  {/* Atmospheric Glow */}
                  <div className="absolute inset-0 bg-radial from-gold/15 to-transparent pointer-events-none" />
                  
                  {/* Auspicious Classical Emblem */}
                  <div className="w-full h-full rounded-full bg-[#FAF7F2] border-2 border-gold/40 flex flex-col items-center justify-center p-4">
                    <span className="font-serif text-6xl text-terracotta select-none font-bold">
                      ॐ
                    </span>
                    <span className="font-serif text-sm font-semibold text-navy mt-1">
                      गुरु नील हरि
                    </span>
                    <span className="font-mono text-[10px] text-gold tracking-widest uppercase mt-0.5">
                      ज्योतिषाचार्य
                    </span>
                  </div>
                </div>

                {/* Floating Auspicious Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-terracotta text-white text-xs font-mono font-medium shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3.5 h-3.5" />
                  <span>वैदिक महर्षि परम्परा</span>
                </div>
              </div>

              <div className="mt-8 text-xs font-mono text-textMuted">
                <span>काठमाडौँ उपत्यका • नेपाल</span>
              </div>
            </div>

            {/* Right: Biography & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl text-navy font-bold">
                  शास्त्रसम्मत मार्गदर्शन र निष्पक्ष जीवन दृष्टि
                </h3>

                <p className="mt-4 text-sm md:text-base text-textBody leading-relaxed font-light">
                  गुरु नील हरि नेपालका प्रतिष्ठित तथा सम्मानित वैदिक ज्योतिषाचार्य हुनुहुन्छ। काठमाडौँको ऐतिहासिक गुरुकुल परम्परामा संस्कृत व्याकरण, महर्षि पाराशर वृहत् होराशास्त्र, जैमिनी सूत्र र सूर्य सिद्धान्तको गहन अध्ययन गर्नुभएका गुरुले विगत ३ दशकदेखि हजारौं व्यक्ति, परिवार तथा उद्यमीहरूलाई जीवनका महत्वपूर्ण मोडहरूमा निष्पक्ष र शास्त्रसम्मत मार्गदर्शन प्रदान गर्दै आउनुभएको छ।
                </p>

                <p className="mt-3 text-sm md:text-base text-textBody leading-relaxed font-light">
                  उहाँ अन्धविश्वास, त्रास र महँगो रत्न व्यापारको कडा आलोचक हुनुहुन्छ। उहाँको अटल सिद्धान्त छ: <span className="font-medium text-navy italic">&ldquo;ज्योतिष मानिसलाई डराउन होइन, उसको विवेक, आत्मविश्वास र कर्मको शक्ति जगाउन प्रयोग हुनुपर्दछ।&rdquo;</span>
                </p>
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#F0EBE1]">
                {HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5] text-center">
                    <div className="font-serif text-base lg:text-lg font-bold text-terracotta">
                      {item.value}
                    </div>
                    <div className="text-xs font-medium text-navy mt-0.5">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-textMuted mt-0.5 font-mono">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenInquiry("गुरु नील हरिसँग व्यक्तिगत परामर्श")}
                  className="px-8 py-3.5 rounded-full bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>गुरुसँग परामर्श समय लिनुहोस्</span>
                </button>

                <div className="text-xs font-mono text-textMuted">
                  प्रत्यक्ष भेटघाट: <span className="font-bold text-navy">बालुवाटार</span> वा <span className="font-bold text-navy">अनलाइन भिडियो</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
