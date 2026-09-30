"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, Flame, Palette, CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MainServicesSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export default function MainServicesSection({ onOpenInquiry }: MainServicesSectionProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";

  return (
    <section id="services" className="w-full py-16 md:py-24 bg-[#FDFBF7] border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            हाम्रा सेवाहरू
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#C85A17] font-bold tracking-widest uppercase mt-1">
            Our Services & Consultations
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            परम्परागत वैदिक ज्ञान र सनातन संस्कारमा आधारित विभिन्न सेवा तथा व्यक्तिगत परामर्शहरू।
          </p>
        </div>

        {/* 4 Detailed Service Blocks */}
        <div className="space-y-12">

          {/* 1. Vedic Astrology */}
          <div id="service-astrology" className="bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="lg:max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#C85A17] text-xs font-mono font-bold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SERVICE 01</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                  वैदिक ज्योतिष शास्त्र
                </h3>
                <span className="text-xs sm:text-sm font-mono text-[#C85A17] font-bold block mb-3">
                  Vedic Astrology
                </span>
                <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                  जन्म विवरण तथा परम्परागत ज्योतिषीय सिद्धान्तका आधारमा जीवनका विभिन्न पक्षबारे परामर्श।
                </p>

                <button
                  onClick={() => onOpenInquiry("वैदिक ज्योतिष शास्त्र (Vedic Astrology)")}
                  className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {isNe ? "ज्योतिष परामर्श लिनुहोस्" : "Book Astrology Consultation"}
                </button>
              </div>

              {/* Service Features Checklist */}
              <div className="lg:w-1/2 bg-stone-50/80 p-6 border border-stone-200/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-4">
                  {isNe ? "उपलब्ध ज्योतिषीय सेवाहरू:" : "Included Advisory Services:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-stone-800">
                  {[
                    "जन्म कुण्डली अध्ययन",
                    "ग्रह तथा दशा अध्ययन",
                    "गोचर विश्लेषण",
                    "विवाह तथा सम्बन्ध परामर्श",
                    "करियर तथा व्यवसाय परामर्श",
                    "शिक्षा तथा विदेश सम्बन्धी परामर्श",
                    "शुभ समय सम्बन्धी परामर्श",
                    "परम्परागत ज्योतिषीय उपाय मार्गदर्शन",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A17] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Vastu Shastra */}
          <div id="service-vastu" className="bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="lg:max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#C85A17] text-xs font-mono font-bold uppercase mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SERVICE 02</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                  वास्तु शास्त्र
                </h3>
                <span className="text-xs sm:text-sm font-mono text-[#C85A17] font-bold block mb-3">
                  Vastu Shastra
                </span>
                <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                  घर, कार्यालय तथा अन्य भवनको स्थान, दिशा र संरचनालाई परम्परागत वास्तु सिद्धान्तअनुसार अध्ययन तथा परामर्श।
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenInquiry("वास्तु शास्त्र (Vastu Shastra)")}
                    className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    {isNe ? "वास्तु परामर्श लिनुहोस्" : "Book Vastu Consultation"}
                  </button>

                  <a
                    href="#store"
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>{isNe ? "वास्तु यन्त्र तथा सामग्री" : "Vastu Products"}</span>
                  </a>
                </div>
              </div>

              {/* Service Features Checklist */}
              <div className="lg:w-1/2 bg-stone-50/80 p-6 border border-stone-200/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-4">
                  {isNe ? "वास्तु परामर्शका क्षेत्रहरू:" : "Vastu Assessment Domains:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-stone-800">
                  {[
                    "घरको वास्तु परामर्श",
                    "फ्ल्याट/अपार्टमेन्ट वास्तु",
                    "कार्यालय तथा व्यवसायिक स्थान",
                    "जग्गा तथा साइट अध्ययन",
                    "प्रवेशद्वार तथा दिशाको अध्ययन",
                    "कोठा तथा स्थान व्यवस्थापन",
                    "नयाँ भवन निर्माणपूर्व वास्तु परामर्श",
                    "Existing Property Assessment",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A17] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Karmakanda & Puja Services + SERVICE -> PRODUCT CONNECTION (Section 11) */}
          <div id="service-karmakanda" className="bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="lg:max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#C85A17] text-xs font-mono font-bold uppercase mb-3">
                  <Flame className="w-3.5 h-3.5" />
                  <span>SERVICE 03</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                  कर्मकाण्ड तथा पूजा
                </h3>
                <span className="text-xs sm:text-sm font-mono text-[#C85A17] font-bold block mb-3">
                  Karmakanda & Puja Services
                </span>
                <p className="text-sm text-stone-600 font-light leading-relaxed mb-4">
                  सनातन वैदिक परम्पराअनुसार विभिन्न धार्मिक संस्कार, पूजा तथा अनुष्ठानको सेवा।
                </p>

                {/* Service -> Product Connection (Section 11 of spec) */}
                <div className="mb-6 p-3.5 bg-amber-50/80 border border-amber-200/80 text-xs font-sans text-stone-800">
                  <div className="flex items-center gap-2 font-bold text-[#C85A17] mb-1">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isNe ? "पूजा सामग्री सेवा जडान (Service → Store):" : "Required Materials Included:"}</span>
                  </div>
                  <p className="font-light">
                    {isNe
                      ? "“गृह प्रवेश, हवन वा कुनै पनि पूजाका लागि आवश्यक सम्पूर्ण पूजा तथा हवन सामग्रीहरू हाम्रो स्टोरमा पनि उपलब्ध छन्।”"
                      : "“Complete required Puja & Havan Samagri kits are readily prepared and available in our Spiritual Store.”"}
                  </p>
                  <a
                    href="#store"
                    className="inline-flex items-center gap-1 text-[#C85A17] hover:underline font-bold mt-2"
                  >
                    <span>{isNe ? "आवश्यक पूजा सामग्री हेर्नुहोस् →" : "View Required Puja Materials →"}</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenInquiry("कर्मकाण्ड तथा पूजा (Karmakanda & Puja Services)")}
                  className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {isNe ? "पूजा / कर्मकाण्ड बुक गर्नुहोस्" : "Book Ritual Service"}
                </button>
              </div>

              {/* Service Features Checklist */}
              <div className="lg:w-1/2 bg-stone-50/80 p-6 border border-stone-200/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-4">
                  {isNe ? "प्रमुख धार्मिक संस्कार तथा पूजा:" : "Sacred Rituals & Ceremonies:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-stone-800">
                  {[
                    "गृह प्रवेश पूजा",
                    "गृह शान्ति तथा वास्तु शान्ति",
                    "ग्रह शान्ति अनुष्ठान",
                    "विवाह सम्बन्धी संस्कार",
                    "नामकरण संस्कार",
                    "व्रतबन्ध / उपनयन संस्कार",
                    "विशेष पूजा तथा महायज्ञ",
                    "पारिवारिक तथा धार्मिक संस्कार",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A17] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Colour Therapy / Wellness (Section 9 of spec) */}
          <div id="service-colour" className="bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="lg:max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#C85A17] text-xs font-mono font-bold uppercase mb-3">
                  <Palette className="w-3.5 h-3.5" />
                  <span>SERVICE 04</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                  रङ्ग थेरापी
                </h3>
                <span className="text-xs sm:text-sm font-mono text-[#C85A17] font-bold block mb-3">
                  Colour Therapy & Wellness
                </span>
                <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                  रङ्गसँग सम्बन्धित परम्परागत तथा wellness-based अवधारणाका आधारमा व्यक्तिगत colour consultation र दैनिक जीवनमा रङ्गको प्रयोग सम्बन्धी मार्गदर्शन।
                </p>

                <button
                  onClick={() => onOpenInquiry("रङ्ग थेरापी (Colour Therapy & Wellness)")}
                  className="px-6 py-3 bg-[#C85A17] hover:bg-[#A6440C] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {isNe ? "Colour Consultation Book गर्नुहोस्" : "Book Colour Consultation"}
                </button>
              </div>

              {/* Service Features Checklist */}
              <div className="lg:w-1/2 bg-stone-50/80 p-6 border border-stone-200/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-4">
                  {isNe ? "परामर्शका मुख्य पक्षहरू:" : "Consultation Dimensions:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-stone-800">
                  {[
                    "व्यक्तिगत रङ्ग परामर्श",
                    "ग्रह तथा रङ्ग परम्परागत अध्ययन",
                    "पोशाकका रङ्ग सम्बन्धी सुझाव",
                    "दैनिक जीवनमा रङ्गको सन्तुलन",
                    "वातावरण र स्थानका रङ्ग मार्गदर्शन",
                    "सात्विक मनस्थितिका लागि रङ्ग समन्वय",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A17] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
