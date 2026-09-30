"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Flame, Sparkles, Gem, ShieldCheck, ArrowRight, Check, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SpiritualStoreSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

interface ProductItem {
  id: string;
  category: string;
  nameNe: string;
  nameEn: string;
  price: string;
  badgeNe: string;
  badgeEn: string;
  descNe: string;
  descEn: string;
  icon: string;
}

export const STORE_CATEGORIES = [
  { id: "all", nameNe: "सबै सामग्री", nameEn: "All Items" },
  { id: "puja", nameNe: "पूजा सामग्री", nameEn: "Puja Samagri" },
  { id: "havan", nameNe: "हवन सामग्री", nameEn: "Havan Samagri" },
  { id: "rudraksha", nameNe: "रुद्राक्ष तथा माला", nameEn: "Rudraksha & Mala" },
  { id: "yantra", nameNe: "यन्त्र", nameEn: "Yantra" },
  { id: "gemstones", nameNe: "रत्न तथा जेमस्टोन", nameEn: "Gemstones" },
  { id: "astrology", nameNe: "ज्योतिषीय सामग्री", nameEn: "Astrology Materials" },
  { id: "religious", nameNe: "धार्मिक सामग्री", nameEn: "Religious Items" },
  { id: "gifts", nameNe: "आध्यात्मिक उपहार", nameEn: "Spiritual Gifts" },
];

export const STORE_PRODUCTS: ProductItem[] = [
  {
    id: "griha-pravesh-kit",
    category: "puja",
    nameNe: "सम्पूर्ण गृह प्रवेश पूजा किट",
    nameEn: "Complete Griha Pravesh Puja Kit",
    price: "£45.00",
    badgeNe: "धेरै रुचाइएको",
    badgeEn: "Bestseller",
    descNe: "कलश, शुद्ध रोली, चन्दन, जौ-तिल, कुश, कपुर, घ्यू, पञ्चरत्न र विधि सामग्रीहरू समावेश।",
    descEn: "Pure kalash, roli, sandalwood, barley-sesame, kusha grass, camphor, and ritual essentials.",
    icon: "🪔",
  },
  {
    id: "havan-samagri-packet",
    category: "havan",
    nameNe: "शुद्ध वैदिक हवन सामग्री (१ केजी)",
    nameEn: "Pure Vedic Havan Samagri (1kg)",
    price: "£18.50",
    badgeNe: "सात्विक जडीबुटी",
    badgeEn: "Ayurvedic Herbs",
    descNe: "गुगल, लोबान, जटामसी, कपुर, रक्तचन्दन, घ्यू र ३२ प्रकारका सात्विक जडीबुटी सम्मिश्रण।",
    descEn: "Guggul, loban, jatamansi, red sandalwood, and 32 pure Vedic sacrificial herbs.",
    icon: "🔥",
  },
  {
    id: "panchamukhi-rudraksha-mala",
    category: "rudraksha",
    nameNe: "नेपाली पञ्चमुखी रुद्राक्ष माला (१०८ दाना)",
    nameEn: "Nepali 5-Mukhi Rudraksha Mala (108 Beads)",
    price: "£32.00",
    badgeNe: "प्रमाणित नेपाली",
    badgeEn: "Certified Nepal Origin",
    descNe: "प्राकृतिक नेपाली रुद्राक्ष दानाबाट गाँसिएको, मन्त्र-जप तथा ध्यानका लागि अभिमन्त्रित।",
    descEn: "Consecrated authentic Nepali Rudraksha beads strung for daily mantra japa and mental stillness.",
    icon: "📿",
  },
  {
    id: "shree-yantra-copper",
    category: "yantra",
    nameNe: "सिद्ध सम्पूर्ण श्रीयन्त्र (तामा / पित्तल)",
    nameEn: "Consecrated Copper Shree Yantra",
    price: "£28.00",
    badgeNe: "प्राण-प्रतिष्ठित",
    badgeEn: "Consecrated",
    descNe: "घर र कार्यालयमा धन, समृद्धि र वास्तु दोष निवारणका लागि शास्त्रीय ज्यामितिय श्रीयन्त्र।",
    descEn: "Sacred geometric copper plate designed according to Vedic scriptures for prosperity and Vastu harmony.",
    icon: "🔯",
  },
  {
    id: "vastu-pyramid-brass",
    category: "yantra",
    nameNe: "पित्तलको वास्तु ऊर्जा पिरामिड",
    nameEn: "Brass Vastu Energy Pyramid",
    price: "£24.00",
    badgeNe: "वास्तु ऊर्जा शोधक",
    badgeEn: "Energy Harmonizer",
    descNe: "घर तथा कार्यक्षेत्रको नकारात्मक ऊर्जा निष्कासन र सकारात्मक कम्पन वृद्धिका लागि।",
    descEn: "Installed at key directions to neutralize spatial geo-stress and harmonize environment.",
    icon: "🔺",
  },
  {
    id: "kundali-frame-patro",
    category: "astrology",
    nameNe: "हस्तलिखित जन्म कुण्डली तथा चक्र",
    nameEn: "Hand-Crafted Natal Kundali Codex",
    price: "£55.00",
    badgeNe: "व्यक्तिगत हस्तलिखित",
    badgeEn: "Custom Prepared",
    descNe: "लाहिडी अयनांशमा आधारित शुद्ध ग्रह गणित, लग्न चक्र, नवमांश र विंशोत्तरी दशा विवरण।",
    descEn: "Traditional handwritten parchment-style chart with complete planetary longitudes and Dasha balance.",
    icon: "📜",
  },
  {
    id: "natural-gangajal-dhoop",
    category: "religious",
    nameNe: "शुद्ध गङ्गाजल तथा हिमालयन धूप सेट",
    nameEn: "Sacred Gangajal & Himalayan Incense Set",
    price: "£14.00",
    badgeNe: "पवित्र शुद्धि",
    badgeEn: "Sacred Purification",
    descNe: "हरिद्वार गङ्गोत्रीको पवित्र जल र प्राकृतिक चन्दन-गुलाब धूपको दैनिक पूजा प्याक।",
    descEn: "Directly sourced sacred Gangetic water and natural handmade Himalayan incense.",
    icon: "💧",
  },
  {
    id: "brass-diya-set",
    category: "gifts",
    nameNe: "परम्परागत पित्तलको पञ्चमुखी दीयो",
    nameEn: "Traditional Brass 5-Wick Diya",
    price: "£22.00",
    badgeNe: "उपहारका लागि उत्तम",
    badgeEn: "Ideal Gift",
    descNe: "मन्दिर तथा गृह पूजाको शोभा बढाउने उत्कृष्ट कलात्मक ठोस पित्तलको दीयो।",
    descEn: "Solid brass traditional oil lamp crafted for daily aarti and spiritual home warming gifts.",
    icon: "✨",
  },
];

export default function SpiritualStoreSection({ onOpenInquiry }: SpiritualStoreSectionProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? STORE_PRODUCTS
      : STORE_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="store" className="w-full py-16 md:py-24 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-[#C85A17] font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>AUTHENTIC SPIRITUAL STORE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            धार्मिक तथा ज्योतिषीय सामग्री
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#C85A17] font-bold tracking-widest uppercase mt-1">
            Spiritual & Astrology Store
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            पूजा, कर्मकाण्ड, ज्योतिष तथा सनातन परम्परामा आवश्यक पर्ने सामग्रीहरू एकै स्थानमा। बेलायतभर सुरक्षित होम डेलिभरी।
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar -mx-2 px-2">
          {STORE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? "bg-[#C85A17] text-white border-[#C85A17] shadow-xs"
                    : "bg-[#FAF7F2] text-stone-700 border-stone-200 hover:border-[#C85A17] hover:text-[#C85A17]"
                }`}
              >
                <span>{isNe ? cat.nameNe : cat.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#FAF7F2] border border-stone-200/90 p-5 flex flex-col justify-between hover:border-[#C85A17] hover:bg-white transition-all hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{p.icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 text-amber-900 font-bold border border-amber-200">
                    {isNe ? p.badgeNe : p.badgeEn}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-stone-900 text-base leading-snug group-hover:text-[#C85A17] transition-colors">
                  {p.nameNe}
                </h4>
                <span className="text-[11px] font-mono text-stone-500 block mb-2">
                  {p.nameEn}
                </span>

                <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                  {isNe ? p.descNe : p.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                    {isNe ? "मूल्य" : "Price"}
                  </span>
                  <span className="text-sm font-mono font-bold text-stone-900">{p.price}</span>
                </div>

                <button
                  onClick={() => onOpenInquiry(`स्टोर सामग्री अर्डर वा सोधपुछ: ${p.nameNe} (${p.price})`)}
                  className="px-3.5 py-1.5 bg-[#181411] hover:bg-[#C85A17] text-white text-xs font-mono font-bold transition-colors"
                >
                  {isNe ? "खरिद / सोधपुछ" : "Enquire / Buy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* UK Delivery & Service Guarantee */}
        <div className="mt-12 p-6 bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-stone-700">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C85A17] shrink-0" />
            <div>
              <span className="font-bold text-stone-900 font-serif text-sm block">
                {isNe ? "प्रामाणिक र शुद्ध वैदिक सामग्रीको ग्यारेन्टी" : "100% Certified Pure Vedic Materials"}
              </span>
              <span className="text-stone-600 font-light">
                {isNe
                  ? "बेलायतस्थित वैदिक सनातन केन्द्र युकेबाट सिधै प्याकिङ र सुरक्षित डेलिभरी।"
                  : "Dispatched safely across the United Kingdom with traditional packaging."}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry("सम्पूर्ण स्टोर क्याटलग सोधपुछ")}
            className="px-5 py-2.5 bg-white border border-stone-300 hover:border-[#C85A17] text-stone-900 hover:text-[#C85A17] font-mono text-xs font-bold uppercase transition-colors shrink-0"
          >
            {isNe ? "सबै सामग्री सूची हेर्नुहोस्" : "View Full Catalogue"}
          </button>
        </div>

      </div>
    </section>
  );
}
