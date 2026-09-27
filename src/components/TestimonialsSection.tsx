"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "sushma",
    name: "सुष्मा अधिकारी",
    role: "शिक्षिका तथा अभिभावक",
    location: "काठमाडौँ",
    rating: 5,
    text: "विवाह कुण्डली मिलान र नवमांश विश्लेषणका लागि हामी गुरु नील हरिकहाँ पुगेका थियौं। उहाँले कुनै डर-त्रास नदेखाई दुवैको स्वभाव, गुण र ग्रह स्थितिको यथार्थ विश्लेषण गरिदिनुभयो। आज हाम्रो वैवाहिक जीवन अत्यन्त सुखमय छ।",
    service: "विवाह कुण्डली मिलान"
  },
  {
    id: "ramesh",
    name: "रमेश श्रेष्ठ",
    role: "उद्योगी तथा व्यवसायी",
    location: "काठमाडौँ / वीरगञ्ज",
    rating: 5,
    text: "नयाँ उद्योगको शिलान्यास र मेसिन स्थापनाको शुभ साइत गुरुबाट गराएका हौं। समयको सही चयन र वास्तु शोधनले हाम्रो उद्योग प्रारम्भदेखि नै निर्विघ्न र सफल रूपमा अघि बढिरहेको छ। उहाँको वैज्ञानिक दृष्टि प्रशंसनीय छ।",
    service: "व्यावसायिक साइत तथा वास्तु"
  },
  {
    id: "pradip",
    name: "प्रदिप लामिछाने",
    role: "सफ्टवेयर इन्जिनियर",
    location: "सिड्नी, अष्ट्रेलिया",
    rating: 5,
    text: "विदेशमा रहँदा करियरको अन्योलमा अनलाइन भिडियो परामर्श लिएको थिएँ। गुरुले विंशोत्तरी दशाको समय-सीमा ठ्याक्कै केलाइदिनुभयो। कुनै महँगो रत्न थोपर्ने काम नगरी सात्विक ध्यान र सत्कर्मको मार्ग देखाउनुभयो।",
    service: "जन्म कुण्डली तथा दशा फल"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-20 md:py-28 border-b border-border bg-[#F5EFEB] relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>विश्वास र अनुभूति</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy font-bold tracking-tight">
            हाम्रो ग्राहकहरूको अनुभूति
          </h2>
          <p className="mt-3 text-textMuted text-sm md:text-base leading-relaxed font-light">
            गुरु नील हरिको शास्त्रीय मार्गदर्शनबाट जीवनमा स्पष्ट दिशा, शान्ति र आत्मविश्वास पाएका सेवाग्राहीहरूका शब्दहरू।
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, idx) => (
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
            <span>१००% वास्तविक सेवाग्राही समीक्षा</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span>४.९५ / ५.० औसत सन्तुष्टि दर</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>२५,०००+ भन्दा बढी कुण्डली परामर्श</span>
          </div>
        </div>
      </div>
    </section>
  );
}
