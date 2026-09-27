"use client";

import React from "react";
import { CaseStudy } from "./CaseStudyModal";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const RESEARCH_STUDIES: CaseStudy[] = [
  {
    id: "annual-horoscope",
    number: "०१",
    title: "वार्षिक राशिफल तथा गोचर फल",
    tag: "ANNUAL TRANSIT & PREDICTIONS",
    subtitle: "वर्षभरिको ग्रह स्थिति, बृहस्पति र शनि गोचर, आर्थिक तथा पारिवारिक मार्गचित्र।",
    client: "व्यक्तिगत तथा पारिवारिक परामर्श",
    year: "२०८१/२०८२",
    summary:
      "वर्षभरिको ग्रह स्थिति, मुख्यतया वृहस्पति र शनिको गोचर, साढेसाती प्रभाव र सूर्य संक्रान्तिको आधारमा तयार पारिने वार्षिक दिशानिर्देश। स्वास्थ्य, परिवार र आर्थिक उन्नतिका शुभ समयहरूको पहिचान।",
    challenge:
      "व्यक्तिपिच्छे फरक लग्न र राशिका आधारमा वार्षिक गोचरको फल सूक्ष्म रूपमा निर्धारण गर्नु र प्रतिकूल समयमा सात्विक समाधान सुझाउनु।",
    engineeringSolution:
      "लग्न कुण्डली र चन्द्र राशि दुबैबाट गोचरको अष्टकवर्ग (Ashtakavarga) बिन्दु गणना गरी कुन महिना कस्तो रहन्छ भन्ने यथार्थपरक मार्गचित्र प्रदान गरिन्छ।",
    architectureDetails: [
      "शनिको साढेसाती तथा ढैयाको शास्त्रीय मूल्याङ्कन",
      "गुरु (बृहस्पति) गोचरको शुभ फल र कार्य सिद्धि समय",
      "स्वास्थ्य र आर्थिक लगानीका लागि अनुकूल समय-तालिका",
      "दैनिक जीवनमा गर्न सकिने सात्विक उपाय र मन्त्र साधना",
    ],
    deliverables: [
      "विस्तृत वार्षिक प्रतिवेदन पुस्तिका",
      "मासिक गोचर प्रभाव तालिका",
      "गुरु नील हरिसँग प्रत्यक्ष परामर्श"
    ],
    metrics: [
      { label: "विश्लेषण अवधि", value: "१ वर्ष (१२ महिना)" },
      { label: "गणना पद्धति", value: "अष्टकवर्ग + गोचर" },
      { label: "मार्गदर्शन स्तर", value: "व्यक्तिगत" }
    ],
    quote: "वार्षिक राशिफलले मलाई नयाँ योजना बनाउन र जोखिमबाट बच्न निकै भरपर्दो आधार दियो।"
  },
  {
    id: "vimshottari-dasha",
    number: "०२",
    title: "दशा-अन्तर्दशा गहन विश्लेषण",
    tag: "DASHA PRECISION ANALYSIS",
    subtitle: "१२० वर्षे विंशोत्तरी चक्र, महादशा, अन्तर्दशा र प्रत्यन्तर दशाको सूक्ष्म फल।",
    client: "करियर तथा जीवन रूपान्तरण",
    year: "२०८०–२०८१",
    summary:
      "मानिसको जीवन कुन समयमा कुन ग्रहको प्रभावमा चल्दैछ भनी देखाउने सबैभन्दा प्रामाणिक वैदिक विधा विंशोत्तरी दशा हो। यसबाट वर्तमान अन्योलको कारण र भविष्यको सुनौलो समय स्पष्ट हुन्छ।",
    challenge:
      "दशानाथ र भुक्तिनाथ बीचको षडाष्टक वा द्विद्वादश सम्बन्धले ल्याउने अचानक मानसिक वा आर्थिक हलचललाई पूर्व-अनुमान गरी सन्तुलन कायम गर्नु।",
    engineeringSolution:
      "जन्म नक्षत्रको भुक्त र भोग्य घटी-पलाको शुद्ध गणित गरी मिनेट-मिनेटको दशा प्रवेश समय निकालेर ग्रहहरूको स्वाभाविक तथा तात्कालिक सम्बन्धको विश्लेषण।",
    architectureDetails: [
      "विंशोत्तरी महादशा र अन्तर्दशाको सूक्ष्म समयावधि",
      "प्रत्यन्तर र सूक्ष्म दशाको समय-सीमा निर्धारण",
      "दशा अनुकूल बनाउने सात्विक साधना र दान विधि",
      "करियर परिवर्तन, पदोन्नति वा विदेश यात्राका उपयुक्त योग",
    ],
    deliverables: [
      "जीवन कालक्रम दशा चार्ट",
      "दशा फल र समाधान निर्देशिका",
      "व्यक्तिगत संवाद तथा मार्गदर्शन"
    ],
    metrics: [
      { label: "विश्लेषण चक्र", value: "१२० वर्ष" },
      { label: "सूक्ष्मता", value: "प्रत्यन्तर दशा" },
      { label: "सफलता सूचकांक", value: "उत्कृष्ट" }
    ],
    quote: "दशाको विश्लेषणपछि मैले आफ्नो सही समय कुरेर लगानी गरें, जसले उत्कृष्ट प्रतिफल दियो।"
  },
  {
    id: "vedic-vastu",
    number: "०३",
    title: "गृह तथा औद्योगिक वास्तु परामर्श",
    tag: "SPATIAL ENERGY & HARMONY",
    subtitle: "पञ्चतत्व सन्तुलन, ईशान कोण, ब्रह्मस्थान र दिशागत ऊर्जाको वैज्ञानिक परीक्षण।",
    client: "आवासीय भवन तथा व्यावसायिक उद्योग",
    year: "२०८१",
    summary:
      "घर, कार्यालय वा उद्योगमा जल, अग्नि, वायु, पृथ्वी र आकाश तत्वको सन्तुलन मिलाई सुख, शान्ति र समृद्धि बढाउने शास्त्रीय वास्तु परामर्श। भौतिक तोडफोड नगरी ऊर्जा सुधार।",
    challenge:
      "बनिबनाउ आधुनिक संरचनाहरूमा ठूलो तोडफोड नगरी दिशा दोष, भान्सा र शौचालयको वास्तु दोषलाई रङ्ग, धातु र पिरामिड यन्त्रबाट सच्याउनु।",
    engineeringSolution:
      "दिशा कम्पास, ब्रह्मस्थान रेखाङ्कन र पद-विन्यास (८१ पद वास्तु चक्र) को आधारमा पञ्चतत्वको ऊर्जा सन्तुलन गरिन्छ।",
    architectureDetails: [
      "ईशान कोण (देव स्थान) र आग्नेय कोण (अग्नि तत्व) को शुद्धि",
      "कार्यालयमा मुख्य निर्णयकर्ताको बस्ने स्थान र दिशा शोधन",
      "उद्योगमा मेसिनरी तथा कच्चा पदार्थ भण्डारणको अनुकूलता",
      "वास्तु दोष निवारणका लागि तोडफोड रहित उपाय",
    ],
    deliverables: [
      "डिजिटल वास्तु नक्सा र ऊर्जा प्रतिवेदन",
      "स्थानगत सुधार कार्ययोजना",
      "स्थलगत निरीक्षण वा ब्लुप्रिन्ट परामर्श"
    ],
    metrics: [
      { label: "वास्तु चक्र", value: "८१ पद मण्डल" },
      { label: "पद्धति", value: "समराङ्गण सूत्रधार" },
      { label: "निवारण", value: "तोडफोड रहित" }
    ],
    quote: "वास्तु सुधारपछि हाम्रो व्यावसायिक कम्प्लेक्समा नयाँ ऊर्जा र सकारात्मक वातावरण बन्यो।"
  },
  {
    id: "prashna-jyotish",
    number: "०४",
    title: "प्रश्न ज्योतिष तथा तत्कालीन समाधान",
    tag: "HORARY ASTROLOGY (PRASHNA)",
    subtitle: "जन्म समय थाहा नभएका वा तुरुन्तै निर्णय लिनुपर्ने विषयमा तत्कालीन लग्न विश्लेषण।",
    client: "तत्कालीन निर्णय तथा मार्गदर्शन",
    year: "२०८१",
    summary:
      "जब व्यक्तिको जन्म मिति वा समय अस्पष्ट हुन्छ, वा कुनै हराएको वस्तु, तत्कालको सम्झौता वा आकस्मिक संकटबारे जान्नुपर्ने हुन्छ, तब प्रश्न गरिएको समयको लग्न बनाएर सटीक जवाफ दिइन्छ।",
    challenge:
      "प्रश्नकर्ताको मनको जिज्ञासा र प्रश्न सोधिएको सटीक समयको लग्न कुण्डली बीचको गहिरो तादात्म्यता स्थापना गरी द्रुत र निर्विवाद निर्णय दिनु।",
    engineeringSolution:
      "प्रश्न मार्ग र प्रश्न तन्त्रका प्राचीन नियमहरू अनुसार आरूढ लग्न, चन्द्रमाको स्थिति र इत्थशाल योगको आधारमा तत्काल निर्णय गरिन्छ।",
    architectureDetails: [
      "सोधिएको ठ्याक्कै समयको सूक्ष्म प्रश्न लग्न निर्माण",
      "कार्य सिद्धि योग (इत्थशाल, ईशराफ) को परीक्षण",
      "रोगबाट मुक्ति, अदालती फैसला वा यात्राको शीघ्र निर्णय",
      "हराएको वस्तु वा विछोडिएका व्यक्तिको दिशा ज्ञान",
    ],
    deliverables: [
      "प्रश्न कुण्डली तथा निर्णय सार",
      "तत्काल समाधान र मार्गदर्शन",
      "सल्लाहकार नोट"
    ],
    metrics: [
      { label: "प्रतिक्रिया समय", value: "तत्काल / २४ घण्टा" },
      { label: "सिद्धान्त", value: "प्रश्न मार्ग / ताजिक" },
      { label: "सटीकता", value: "प्रत्यक्ष फलदायी" }
    ],
    quote: "हराएको महत्वपूर्ण कागजात प्रश्न ज्योतिषले बताएको दिशा र ठाउँमै फेला पर्दा म छक्क परें।"
  },
  {
    id: "graha-shanti",
    number: "०५",
    title: "शान्ति, पूजा तथा शास्त्रीय अनुष्ठान",
    tag: "VEDIC REMEDIAL RITUALS",
    subtitle: "नवग्रह शान्ति, रुद्राभिषेक, महामृत्युञ्जय जप र सात्विक वैदिक हवन विधान।",
    client: "ग्रह दोष निवारण तथा आध्यात्मिक कल्याण",
    year: "२०८१",
    summary:
      "कुण्डलीमा रहेका प्रतिकूल ग्रहहरूलाई शान्त पार्न तथा अनुकूल ग्रहहरूको शक्ति बढाउन गरिने शास्त्रीय पूजा, मन्त्र जप, हवन र सात्विक दान विधान।",
    challenge:
      "व्यावसायिक कर्मकाण्डको भीडबाट अलग रही शुद्ध संस्कृत उच्चारण, योग्य वैदिक ब्राह्मण र शुद्ध सामाग्रीसहित विधिवत अनुष्ठान सम्पन्न गर्नु।",
    engineeringSolution:
      "प्रत्येक ग्रहको वैदिक मन्त्र, गायत्री मन्त्र र तान्त्रिक मन्त्रको भेद छुट्याई व्यक्तिको ग्रहबल अनुसार यथोचित जप संख्या र दशांश हवनको व्यवस्था।",
    architectureDetails: [
      "नवग्रह मण्डल स्थापना र विधिवत पूजन",
      "महामृत्युञ्जय जप तथा आयुष्य वृद्धि अनुष्ठान",
      "कालसर्प, पितृदोष वा मांगलिक योगको सात्विक शान्ति",
      "व्यक्ति आफैंले दैनिक जीवनमा गर्न सक्ने मन्त्र निर्देश",
    ],
    deliverables: [
      "अनुष्ठान विधि विधान पुस्तिका",
      "योग्य वैदिक पुरोहित मण्डल व्यवस्थापन",
      "शान्ति संकल्प तथा प्रसाद"
    ],
    metrics: [
      { label: "विधि", value: "वैदिक / श्रौत-स्मार्त" },
      { label: "मन्त्र उच्चारण", value: "शुद्ध स्वरसहित" },
      { label: "सात्विकता", value: "१००% निष्कलंक" }
    ],
    quote: "नवग्रह शान्तिपछि परिवारमा लामो समयदेखिको अशान्ति हटेर मानसिक चैन मिल्यो।"
  },
  {
    id: "patra-research",
    number: "०६",
    title: "पात्रो इन्जिन तथा पाण्डुलिपि अनुसन्धान",
    tag: "CALENDAR ENGINE & ARCHIVES",
    subtitle: "नेपाली पात्रो गणना प्रणाली, ऐतिहासिक पाण्डुलिपि संरक्षण र खगोल दृक-गणित।",
    client: "नेपाली पात्रो विकास तथा सम्पदा प्रतिष्ठान",
    year: "२०८०–२०८१",
    summary:
      "विक्रम संवत् तथा ईस्वी सन् गणना, तिथि, नक्षत्र र धार्मिक पर्वहरूको शुद्ध पञ्चाङ्ग इन्जिन र काठमाडौँका प्राचीन ऐतिहासिक ताडपत्र पाण्डुलिपिहरूको संरक्षण।",
    challenge:
      "विभिन्न देशान्तर र समयक्षेत्रमा रहेका नेपालीहरूका लागि चाडपर्वको निर्विवाद तालिका निर्माण गर्नु र जीर्ण हस्तलिखित ग्रन्थहरूको डिजिटल संरक्षण गर्नु।",
    engineeringSolution:
      "सूर्य सिद्धान्त र दृक-गणितको वैज्ञानिक समन्वय गरी चित्रापक्षीय अयनांशमा आधारित शुद्ध गणितीय मोडल र डिजिटल अर्काइभ तयार गरियो।",
    architectureDetails: [
      "१९७० देखि २१५० वि.सं. सम्मको शत-प्रतिशत शुद्ध दुईतर्फी रूपान्तरण",
      "१२ संक्रान्ति, मलमास र क्षयमासको स्वचालित निर्णय",
      "४५ भन्दा बढी ऐतिहासिक पाण्डुलिपिहरूको डिजिटल अर्काइभ",
      "नेपाल पञ्चाङ्ग निर्णायक समितिका निर्णयहरूसँग पूर्ण तालमेल",
    ],
    deliverables: [
      "पञ्चाङ्ग कोर एल्गोरिदम मोड्युल",
      "डिजिटल पाण्डुलिपि संग्रह",
      "तुलनात्मक खगोलीय अनुसन्धान प्रतिवेदन"
    ],
    metrics: [
      { label: "गणना अवधि", value: "१९७०–२१५० वि.सं." },
      { label: "गणितीय शुद्धता", value: "१००% दृक-सिद्ध" },
      { label: "संरक्षित ग्रन्थ", value: "४५ पाण्डुलिपि" }
    ],
    quote: "गुरु नील हरिको शास्त्रीय ज्ञानले नेपाली पात्रोलाई परम्परागत मर्यादा र डिजिटल शुद्धताको संगम बनाएको छ।"
  }
];

interface PortfolioWorksProps {
  onSelectStudy: (study: CaseStudy) => void;
}

export default function PortfolioWorks({ onSelectStudy }: PortfolioWorksProps) {
  return (
    <section id="works" className="w-full py-16 md:py-24 border-b border-border bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Subtle Background Rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-gold/15 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-terracotta/10 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>शास्त्रीय अनुसन्धान र परामर्श</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy font-bold tracking-tight">
            प्रमुख परामर्श तथा शास्त्रीय अनुसन्धान
          </h2>
          <p className="mt-3 text-textMuted text-sm md:text-base leading-relaxed font-light">
            गुरु नील हरिको प्रत्यक्ष मार्गदर्शनमा सम्पन्न भएका प्रामाणिक वैदिक अध्ययन, पात्रो गणना, र व्यक्तिगत परामर्शका ६ प्रमुख क्षेत्रहरू।
          </p>
        </div>

        {/* 6 Cards Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {RESEARCH_STUDIES.map((study) => (
            <article
              key={study.id}
              onClick={() => onSelectStudy(study)}
              className="group rounded-2xl p-7 border border-[#EBE3D5] hover:border-terracotta/40 hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between relative bg-white"
            >
              <div>
                {/* Card Top: Number + Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
                  <span className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta font-mono font-bold text-xs flex items-center justify-center">
                    {study.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-textMuted uppercase">
                    {study.tag}
                  </span>
                </div>

                {/* Card Body */}
                <div className="mt-5">
                  <h3 className="font-serif text-xl lg:text-2xl text-navy font-bold group-hover:text-terracotta transition-colors leading-snug">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-gold font-medium">
                    {study.subtitle}
                  </p>
                  <p className="mt-3 text-xs md:text-sm text-textBody leading-relaxed line-clamp-3 font-light">
                    {study.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer: Link */}
              <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                <span className="text-xs font-mono text-textMuted">
                  {study.client}
                </span>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-terracotta font-medium group-hover:translate-x-1 transition-transform">
                  <span>विस्तृत विवरण</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
