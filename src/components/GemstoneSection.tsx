"use client";

import React, { useState } from "react";
import {
  IconGem,
  IconShield,
  IconCheckCircle,
  IconArrowRight,
  IconShoppingBag,
  IconSparkles,
  IconFilter,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface GemstoneSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export interface GemstoneItem {
  id: string;
  nameNe: string;
  nameEn: string;
  rulingPlanetNe: string;
  rulingPlanetEn: string;
  origin: string;
  carat: string;
  certification: string;
  priceEstimate: string;
  availability: string;
  colorHex: string;
  descriptionNe: string;
  descriptionEn: string;
}

export const GEMSTONES_CATALOGUE: GemstoneItem[] = [
  {
    id: "ruby",
    nameNe: "माणिक्य (Ruby)",
    nameEn: "Natural Ruby (Manik)",
    rulingPlanetNe: "सूर्य (Sun)",
    rulingPlanetEn: "Sun",
    origin: "Burma / Madagascar",
    carat: "4.50 Carat",
    certification: "Certified Untreated Natural",
    priceEstimate: "£280 - £650",
    availability: "In Stock (UK Kendra)",
    colorHex: "#9B111E",
    descriptionNe: "आत्मविश्वास, मान-प्रतिष्ठा र प्रशासनिक नेतृत्वका लागि परम्परागत सूर्य रत्न।",
    descriptionEn: "Traditional Surya gemstone supporting leadership, vital solar energy, and dignity.",
  },
  {
    id: "pearl",
    nameNe: "सच्चा मोती (Pearl)",
    nameEn: "Natural Basra / South Sea Pearl",
    rulingPlanetNe: "चन्द्रमा (Moon)",
    rulingPlanetEn: "Moon",
    origin: "South Sea / Japan",
    carat: "6.25 Carat",
    certification: "100% Natural Organic Marine",
    priceEstimate: "£120 - £310",
    availability: "In Stock (UK Kendra)",
    colorHex: "#F0EAD6",
    descriptionNe: "मानसिक शान्ति, भावनात्मक सन्तुलन र सौम्यताका लागि चन्द्रमाको रत्न।",
    descriptionEn: "Lunar gemstone fostering mental tranquillity, emotional grace, and equilibrium.",
  },
  {
    id: "coral",
    nameNe: "रातो मूंगा (Red Coral)",
    nameEn: "Italian Red Coral (Moonga)",
    rulingPlanetNe: "मङ्गल (Mars)",
    rulingPlanetEn: "Mars",
    origin: "Mediterranean / Italy",
    carat: "5.75 Carat",
    certification: "Certified Natural Corallium Rubrum",
    priceEstimate: "£160 - £380",
    availability: "In Stock (UK Kendra)",
    colorHex: "#E24D28",
    descriptionNe: "पराक्रम, शारीरिक ऊर्जा र दृढ संकल्पका लागि मङ्गल ग्रहको पवित्र रत्न।",
    descriptionEn: "Mars gemstone associated with physical stamina, courage, and decisive fortitude.",
  },
  {
    id: "emerald",
    nameNe: "पन्ना (Emerald)",
    nameEn: "Natural Zambian Emerald (Panna)",
    rulingPlanetNe: "बुध (Mercury)",
    rulingPlanetEn: "Mercury",
    origin: "Zambia / Colombia",
    carat: "4.80 Carat",
    certification: "Certified Natural Beryl",
    priceEstimate: "£290 - £720",
    availability: "In Stock (UK Kendra)",
    colorHex: "#097969",
    descriptionNe: "बुद्धि, व्यापारिक तीक्ष्णता र सञ्चार कुशलताका लागि बुधको हरियो रत्न।",
    descriptionEn: "Mercury gemstone for communicative clarity, analytical intellect, and commerce.",
  },
  {
    id: "yellow-sapphire",
    nameNe: "पुखराज (Yellow Sapphire)",
    nameEn: "Ceylon Yellow Sapphire (Pukhraj)",
    rulingPlanetNe: "बृहस्पति (Jupiter)",
    rulingPlanetEn: "Jupiter",
    origin: "Ceylon (Sri Lanka)",
    carat: "5.20 Carat",
    certification: "Certified Natural Corundum",
    priceEstimate: "£350 - £850",
    availability: "In Stock (UK Kendra)",
    colorHex: "#F1B72F",
    descriptionNe: "ज्ञान, धर्म, सन्तान सुख र आध्यात्मिक उन्नतिका लागि देवगुरु बृहस्पतिको रत्न।",
    descriptionEn: "Jupiter's premier gem fostering wisdom, academic excellence, and sacred virtues.",
  },
  {
    id: "diamond",
    nameNe: "हीरा / ओपल (Diamond / White Zircon)",
    nameEn: "Natural Diamond / White Zircon",
    rulingPlanetNe: "शुक्र (Venus)",
    rulingPlanetEn: "Venus",
    origin: "Natural Gem-Quality",
    carat: "1.50 - 3.50 Carat",
    certification: "Certified Untreated",
    priceEstimate: "£220 - £900",
    availability: "In Stock (UK Kendra)",
    colorHex: "#E5E4E2",
    descriptionNe: "कला, सौन्दर्य, भौतिक समृद्धि र दाम्पत्य सुखका लागि शुक्रको रत्न।",
    descriptionEn: "Venusian gem supporting artistic refinement, harmonious marriage, and aesthetics.",
  },
  {
    id: "blue-sapphire",
    nameNe: "नीलम (Blue Sapphire)",
    nameEn: "Kashmir / Ceylon Blue Sapphire",
    rulingPlanetNe: "शनि (Saturn)",
    rulingPlanetEn: "Saturn",
    origin: "Ceylon (Sri Lanka)",
    carat: "4.75 Carat",
    certification: "Certified Natural Untreated",
    priceEstimate: "£420 - £1,100",
    availability: "In Stock (UK Kendra)",
    colorHex: "#0F52BA",
    descriptionNe: "कर्मक्षेत्रमा धैर्य, न्याय, एकाग्रता र स्थायित्वका लागि शनिदेवको रत्न।",
    descriptionEn: "Saturnian gemstone for profound focus, discipline, and long-term career permanence.",
  },
  {
    id: "hessonite",
    nameNe: "गोमेद (Hessonite)",
    nameEn: "Ceylon Hessonite Garnet (Gomed)",
    rulingPlanetNe: "राहु (Rahu)",
    rulingPlanetEn: "Rahu",
    origin: "Sri Lanka",
    carat: "6.50 Carat",
    certification: "Certified Natural Garnet",
    priceEstimate: "£110 - £260",
    availability: "In Stock (UK Kendra)",
    colorHex: "#A0522D",
    descriptionNe: "आकस्मिक बाधा निवारण र कानूनी सफलताका लागि राहु ग्रहको मह रङ्गको रत्न।",
    descriptionEn: "Rahu gemstone for dissolving sudden obstacles and navigating worldly complexities.",
  },
  {
    id: "cats-eye",
    nameNe: "लहसुनिया (Cat's Eye)",
    nameEn: "Chrysoberyl Cat's Eye (Lehsunia)",
    rulingPlanetNe: "केतु (Ketu)",
    rulingPlanetEn: "Ketu",
    origin: "Orissa / Sri Lanka",
    carat: "5.10 Carat",
    certification: "Certified Chrysoberyl Chatoyancy",
    priceEstimate: "£140 - £340",
    availability: "In Stock (UK Kendra)",
    colorHex: "#708238",
    descriptionNe: "आध्यात्मिक मोक्ष, अन्तर्ज्ञान र अप्रत्याशित सुरक्षाका लागि केतुको रत्न।",
    descriptionEn: "Ketu gemstone renowned for chatoyancy, spiritual intuition, and shielding grace.",
  },
];

export default function GemstoneSection({ onOpenInquiry }: GemstoneSectionProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [selectedGem, setSelectedGem] = useState<GemstoneItem | null>(null);

  return (
    <section id="service-gemstone" className="w-full py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 text-[#D95B16] rounded-full font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <IconGem size={14} />
            <span>AUTHENTIC RATNA PARIKSHAN</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            रत्न तथा जेमस्टोन
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#D95B16] font-bold tracking-widest uppercase mt-1">
            Gemstone Consultation & Certified Collection
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            जन्म विवरण तथा परम्परागत ज्योतिषीय अध्ययनका आधारमा व्यक्तिगत रत्न परामर्श तथा प्रामाणिक रत्नको बिक्री।
          </p>
        </div>

        {/* FUNCTION A: Astrological Gemstone Consultation Card */}
        <div className="bg-white border border-stone-200/90 rounded-lg p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D95B16] font-bold block mb-1">
                {isNe ? "भाग १: ज्योतिषीय परामर्श (Consultation)" : "PART A: ASTROLOGICAL CONSULTATION"}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                {isNe ? "ज्योतिषीय रत्न परामर्श तथा परीक्षण" : "Astrological Gemstone Compatibility Analysis"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 leading-relaxed">
                {isNe
                  ? "तपाईंको लग्न, भाग्य स्थान तथा महादशाको अध्ययन गरेर मात्र अनुकूल रत्न सिफारिस गरिन्छ। व्यापारिक नाफाका लागि अनावश्यक रत्न कहिल्यै सिफारिस गरिँदैन।"
                  : "Prescribed strictly according to your Lagna, 9th house, and Dasha sequence. No commercial upselling or fear-mongering."}
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry("ज्योतिषीय रत्न परामर्श (Astrological Gemstone Consultation)")}
              className="px-6 py-3.5 bg-[#D95B16] hover:bg-[#B8480C] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md shrink-0 active:scale-95"
            >
              {isNe ? "रत्न परामर्श लिनुहोस्" : "Get Gemstone Consultation"}
            </button>
          </div>
        </div>

        {/* FUNCTION B: Product Catalogue (Gemstones & Jewellery) */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D95B16] font-bold block mb-1">
              {isNe ? "भाग २: प्रमाणित रत्न संग्रह (Store Catalogue)" : "PART B: CERTIFIED GEMSTONE COLLECTION"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {isNe ? "रत्न तथा जेमस्टोन बिक्री (In Stock)" : "Natural Gemstones & Jewellery"}
            </h3>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              {isNe ? "प्रत्येक रत्न प्रयोगशालाबाट प्रमाणित र परम्परागत विधिले अभिमन्त्रित गरिन्छ।" : "Lab-certified, untreated natural stones available directly from our UK centre."}
            </p>
          </div>

          <a
            href="#store"
            className="text-xs font-mono font-bold text-[#D95B16] hover:underline flex items-center gap-1.5"
          >
            <span>{isNe ? "सम्पूर्ण स्टोर हेर्नुहोस्" : "Browse All Products"}</span>
            <IconArrowRight size={14} />
          </a>
        </div>

        {/* 9-Gemstone Catalogue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GEMSTONES_CATALOGUE.map((g) => (
            <div
              key={g.id}
              className="bg-white border border-stone-200/90 rounded-lg p-6 flex flex-col justify-between hover:border-[#D95B16] transition-all hover:shadow-lg shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center font-serif text-lg text-white shadow-xs"
                    style={{ backgroundColor: g.colorHex }}
                  >
                    💎
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {g.availability}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-stone-900 text-lg group-hover:text-[#D95B16] transition-colors">
                  {g.nameNe}
                </h4>
                <span className="text-xs font-mono text-stone-500 block mb-2">
                  {g.nameEn}
                </span>

                <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                  {isNe ? g.descriptionNe : g.descriptionEn}
                </p>

                {/* Specs Box */}
                <div className="p-3.5 bg-stone-50 border border-stone-200/70 rounded-md text-[11px] font-mono text-stone-700 space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-bold">{isNe ? "स्वामी ग्रह:" : "Planet:"}</span>
                    <span className="font-bold text-stone-900">{isNe ? g.rulingPlanetNe : g.rulingPlanetEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-bold">{isNe ? "उत्पत्ति:" : "Origin:"}</span>
                    <span className="text-stone-900">{g.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-bold">{isNe ? "तौल / क्यारेट:" : "Carat:"}</span>
                    <span className="text-stone-900 font-bold">{g.carat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-bold">{isNe ? "प्रमाणीकरण:" : "Cert:"}</span>
                    <span className="text-stone-900">{g.certification}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                    {isNe ? "अनुमानित मूल्य" : "Price Range"}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D95B16]">{g.priceEstimate}</span>
                </div>

                <button
                  onClick={() => onOpenInquiry(`रत्न खरिद वा सोधपुछ: ${g.nameNe}`)}
                  className="px-3.5 py-1.5 rounded-md bg-[#181411] hover:bg-[#D95B16] text-white text-xs font-mono font-bold transition-colors active:scale-95 shadow-xs"
                >
                  {isNe ? "सोधपुछ / खरिद" : "Enquire / Buy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* UK Hallmarking & Medical Disclaimer Notice (Section 20 of spec) */}
        <div className="mt-10 p-5 bg-stone-100/90 border border-stone-200/90 rounded-lg text-xs font-sans text-stone-600 leading-relaxed shadow-xs">
          <p className="font-light">
            <strong className="text-stone-800 font-mono uppercase font-bold">UK Legal & Hallmarking Notice:</strong>{" "}
            {isNe
              ? "रत्न तथा बहुमूल्य धातुबाट निर्मित औंठी वा लकेटहरू बेलायतको Hallmarking ऐन र उपभोक्ता संरक्षण मापदण्ड अनुरूप प्रमाणित हुन्छन्। रत्न सम्बन्धी परामर्श परम्परागत तथा सात्विक मार्गदर्शन हो, यसले चिकित्सा वा कानुनी सल्लाहलाई प्रतिस्थापन गर्दैन।"
              : "Precious gemstone jewellery items comply with applicable UK Hallmarking guidance and consumer protection standards. Astrological gemstone advice is provided as traditional complementary guidance and not as medical or financial guarantees."}
          </p>
        </div>

      </div>
    </section>
  );
}
