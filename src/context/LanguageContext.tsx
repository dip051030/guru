"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ne" | "en";

export interface Translations {
  header: {
    patro: string;
    loading: string;
    sunrise: string;
    sunset: string;
    contact: string;
    location: string;
    home: string;
    services: string;
    kundali: string;
    aboutGuru: string;
    research: string;
    contactNav: string;
    bookConsultation: string;
  };
  hero: {
    statusPill: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    rating: string;
    ratingCount: string;
    chartTitle: string;
    observatory: string;
    lat: string;
    ayanamsha: string;
    b1Title: string;
    b1Sub: string;
    b2Title: string;
    b2Sub: string;
    b3Title: string;
    b3Sub: string;
    b4Title: string;
    b4Sub: string;
  };
  calculator: {
    badge: string;
    title: string;
    desc: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    locationLabel: string;
    calcButton: string;
    chartView: string;
    panchangaSummary: string;
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    lagna: string;
    sunSign: string;
    moonSign: string;
    bookPersonalAnalysis: string;
  };
  solutions: {
    badge: string;
    title: string;
    desc: string;
    learnMore: string;
  };
  research: {
    badge: string;
    title: string;
    desc: string;
    viewDetails: string;
  };
  manifesto: {
    badge: string;
    title: string;
    desc: string;
    quote: string;
    author: string;
    role: string;
    org: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    headline: string;
    p1: string;
    p2: string;
    bookWithGuru: string;
    inPersonOrOnline: string;
  };
  testimonials: {
    badge: string;
    title: string;
    desc: string;
    verifiedReviews: string;
    avgRating: string;
    consultationsDelivered: string;
  };
  preFooter: {
    badge: string;
    title: string;
    desc: string;
    bookNow: string;
    phoneText: string;
    privacy: string;
    accuracy: string;
    remedy: string;
  };
  footer: {
    tagline: string;
    city: string;
    quickLinks: string;
    ourServices: string;
    contactTitle: string;
    hours: string;
    copyright: string;
    standards: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  ne: {
    header: {
      patro: "नेपाली पात्रो:",
      loading: "लोड हुँदैछ...",
      sunrise: "काठमाडौँ सूर्योदय:",
      sunset: "सूर्यास्त:",
      contact: "सम्पर्क: +९७७ १ ४४१२३४५ / ९८५१०१२३४५",
      location: "बालुवाटार, काठमाडौँ",
      home: "गृह",
      services: "सेवाहरू",
      kundali: "कुण्डली गणना",
      aboutGuru: "गुरु परिचय",
      research: "अनुसन्धान",
      contactNav: "सम्पर्क",
      bookConsultation: "परामर्श बुक गर्नुहोस्",
    },
    hero: {
      statusPill: "काठमाडौँ वेधशाला • प्रत्यक्ष तथा अनलाइन परामर्श उपलब्ध",
      eyebrow: "प्राचीन सूर्य सिद्धान्त • शुद्ध दृक-गणित • जीवन दर्शन",
      titleLine1: "समयको लय,",
      titleLine2: "जीवनको स्पष्ट मार्गचित्र।",
      subtitle: "गुरु नील हरि • ३ दशकको प्रामाणिक साधना र शास्त्रसम्मत परामर्श",
      desc: "काल्पनिक डर र व्यापारिक शोषणबिना, तपाईंको वास्तविक जन्म समय र ग्रह-नक्षत्रको सूक्ष्म गणितीय विश्लेषणबाट व्यक्तिगत जीवन, वैवाहिक सम्बन्ध, व्यापारिक साइत र भविष्यका महत्वपूर्ण निर्णयहरूमा स्पष्ट, सात्विक दिशा प्राप्त गर्नुहोस्।",
      ctaPrimary: "परामर्श सुरु गर्नुहोस्",
      ctaSecondary: "कुण्डली गणना गर्नुहोस्",
      rating: "४.९५ / ५.०",
      ratingCount: "(२५,०००+ भन्दा बढी कुण्डली परामर्श सम्पन्न)",
      chartTitle: "लग्न कुण्डली चक्र (D-1)",
      observatory: "काठमाडौँ वेधशाला",
      lat: "अक्षांश: २७° ४३' उ.",
      ayanamsha: "चित्रापक्षीय अयनांश: २४° ०९' ५३\"",
      b1Title: "प्रामाणिक दृक-गणित",
      b1Sub: "चित्रापक्षीय अयनांश मानक",
      b2Title: "३०+ वर्ष साधना",
      b2Sub: "पाराशर तथा जैमिनी पद्धति",
      b3Title: "शोषणमुक्त सात्विक",
      b3Sub: "महँगो रत्न व्यापार निषेध",
      b4Title: "सम्पूर्ण गोपनीयता",
      b4Sub: "प्रत्यक्ष तथा भिडियो परामर्श",
    },
    calculator: {
      badge: "खगोलीय कम्प्युटेसन • दृक-पञ्चाङ्ग",
      title: "जन्म कुण्डली तथा पञ्चाङ्ग गणना",
      desc: "चित्रापक्षीय अयनांश र उच्च परिशुद्धता खगोलीय एल्गोरिदमद्वारा तयार गरिएको तपाईंको तात्कालिक जन्म कुण्डली, ग्रह स्थिति र पञ्चाङ्ग फल।",
      formTitle: "जन्म विवरण प्रविष्ट गर्नुहोस्",
      nameLabel: "पूरा नाम",
      namePlaceholder: "उदा. प्रदिप शर्मा",
      dateLabel: "जन्म मिति (ई.सं.)",
      timeLabel: "जन्म समय (२४ घण्टा)",
      locationLabel: "जन्म स्थान (अक्षांश/देशान्तर)",
      calcButton: "कुण्डली तथा पञ्चाङ्ग गणना गर्नुहोस्",
      chartView: "उत्तर-भारतीय लग्न कुण्डली चक्र",
      panchangaSummary: "पञ्चाङ्ग तथा खगोलीय सूचक",
      tithi: "तिथि",
      nakshatra: "नक्षत्र",
      yoga: "योग",
      karana: "करण",
      lagna: "उदय लग्न",
      sunSign: "सूर्य राशि",
      moonSign: "चन्द्र राशि",
      bookPersonalAnalysis: "गुरु नील हरिसँग यस कुण्डलीको विश्लेषण लिनुहोस्",
    },
    solutions: {
      badge: "शास्त्रीय वैदिक सेवाहरू",
      title: "प्रामाणिक ज्योतिष परामर्श सेवाहरू",
      desc: "महर्षि पाराशर र जैमिनी सूत्रको परम्परामा आधारित व्यक्तिगत, पारिवारिक तथा व्यापारिक समाधानहरू।",
      learnMore: "परामर्श लिनुहोस्",
    },
    research: {
      badge: "शास्त्रीय अनुसन्धान र परामर्श",
      title: "प्रमुख परामर्श तथा शास्त्रीय अनुसन्धान",
      desc: "गुरु नील हरिको प्रत्यक्ष मार्गदर्शनमा सम्पन्न भएका प्रामाणिक वैदिक अध्ययन, पात्रो गणना, र व्यक्तिगत परामर्शका ६ प्रमुख क्षेत्रहरू।",
      viewDetails: "विस्तृत विवरण",
    },
    manifesto: {
      badge: "वैदिक मर्यादा र निष्ठा",
      title: "वैदिक ज्योतिषको गरिमा र मूल्याङ्कन",
      desc: "ज्योतिष भनेको अन्धविश्वास फैलाउने वा त्रासमा पारेर व्यापार गर्ने माध्यम होइन। यो जीवनको लय बुझ्ने गहन आध्यात्मिक विज्ञान हो।",
      quote: "ज्योतिष मानिसलाई डराउन वा भाग्यवादी बनाउन होइन, उसको अन्तर्निहित शक्ति, विवेक र उचित समय पहिचान गरी जीवनलाई सार्थक बनाउने दिव्य प्रकाश हो।",
      author: "गुरु नील हरि",
      role: "संस्थापक तथा मुख्य ज्योतिषाचार्य",
      org: "नील हरि वैदिक ज्योतिष केन्द्र, बालुवाटार, काठमाडौँ",
    },
    about: {
      badge: "ज्योतिषाचार्य परिचय",
      title: "गुरु नील हरि",
      subtitle: "संस्थापक तथा मुख्य ज्योतिषाचार्य • ३० वर्षको शास्त्रीय अनुभव",
      headline: "शास्त्रसम्मत मार्गदर्शन र निष्पक्ष जीवन दृष्टि",
      p1: "गुरु नील हरि नेपालका प्रतिष्ठित तथा सम्मानित वैदिक ज्योतिषाचार्य हुनुहुन्छ। काठमाडौँको ऐतिहासिक गुरुकुल परम्परामा संस्कृत व्याकरण, महर्षि पाराशर वृहत् होराशास्त्र, जैमिनी सूत्र र सूर्य सिद्धान्तको गहन अध्ययन गर्नुभएका गुरुले विगत ३ दशकदेखि हजारौं व्यक्ति, परिवार तथा उद्यमीहरूलाई जीवनका महत्वपूर्ण मोडहरूमा निष्पक्ष र शास्त्रसम्मत मार्गदर्शन प्रदान गर्दै आउनुभएको छ।",
      p2: "उहाँ अन्धविश्वास, त्रास र महँगो रत्न व्यापारको कडा आलोचक हुनुहुन्छ। उहाँको अटल सिद्धान्त छ: \"ज्योतिष मानिसलाई डराउन होइन, उसको विवेक, आत्मविश्वास र कर्मको शक्ति जगाउन प्रयोग हुनुपर्दछ।\"",
      bookWithGuru: "गुरुसँग परामर्श समय लिनुहोस्",
      inPersonOrOnline: "प्रत्यक्ष भेटघाट: बालुवाटार वा अनलाइन भिडियो",
    },
    testimonials: {
      badge: "विश्वास र अनुभूति",
      title: "हाम्रो ग्राहकहरूको अनुभूति",
      desc: "गुरु नील हरिको शास्त्रीय मार्गदर्शनबाट जीवनमा स्पष्ट दिशा, शान्ति र आत्मविश्वास पाएका सेवाग्राहीहरूका शब्दहरू।",
      verifiedReviews: "१००% वास्तविक सेवाग्राही समीक्षा",
      avgRating: "४.९५ / ५.० औसत सन्तुष्टि दर",
      consultationsDelivered: "२५,०००+ भन्दा बढी कुण्डली परामर्श",
    },
    preFooter: {
      badge: "सत्य • निष्पक्षता • शास्त्रीय मर्यादा",
      title: "अब नै आफ्नो जन्म कुण्डली तथा शुभ साइत परामर्श लिनुहोस्",
      desc: "काठमाडौँ बालुवाटारस्थित केन्द्रमा प्रत्यक्ष उपस्थित भएर वा संसारको जुनसुकै कुनाबाट अनलाइन भिडियो परामर्श मार्फत गुरु नील हरिसँग संवाद गर्नुहोस्।",
      bookNow: "परामर्श बुक गर्नुहोस्",
      phoneText: "+९७७ १ ४४१२३४५ / ९८५१०१२३४५",
      privacy: "गोपनीयताको पूर्ण प्रत्याभूति",
      accuracy: "शास्त्रीय दृक-सिद्ध शुद्धता",
      remedy: "सात्विक र निष्पक्ष मार्गदर्शन",
    },
    footer: {
      tagline: "काठमाडौँको ऐतिहासिक वैदिक परम्परामा आधारित प्रामाणिक ज्योतिष परामर्श। व्यक्तिगत जन्म कुण्डली, विंशोत्तरी दशा फल, विवाह मिलान, व्यापारिक साइत र पञ्चाङ्ग गणनाको शुद्ध मार्गदर्शन।",
      city: "बालुवाटार, काठमाडौँ • वि.सं. २०८१ • चित्रापक्षीय अयनांश",
      quickLinks: "द्रुत लिङ्कहरू",
      ourServices: "हाम्रा सेवाहरू",
      contactTitle: "सम्पर्क तथा ठेगाना",
      hours: "आइतबार – शुक्रबार: बिहान ८:०० – साँझ ६:००",
      copyright: "© २०८१ नील हरि वैदिक ज्योतिष केन्द्र। सर्वाधिकार सुरक्षित।",
      standards: "प्रामाणिक वैदिक ज्योतिष तथा दृक-गणित • काठमाडौँ, नेपाल",
    },
  },
  en: {
    header: {
      patro: "Nepali Patro:",
      loading: "Loading...",
      sunrise: "KTM Sunrise:",
      sunset: "Sunset:",
      contact: "Contact: +977 1 4412345 / 9851012345",
      location: "Baluwatar, Kathmandu",
      home: "Home",
      services: "Services",
      kundali: "Ephemeris & Kundali",
      aboutGuru: "About Guru",
      research: "Advisory & Research",
      contactNav: "Contact",
      bookConsultation: "Book Consultation",
    },
    hero: {
      statusPill: "Kathmandu Observatory • In-Person & Worldwide Online Sessions",
      eyebrow: "Classical Surya Siddhanta • High-Precision Ephemeris • Philosophy",
      titleLine1: "The Rhythm of Time,",
      titleLine2: "A Clear Blueprint for Life.",
      subtitle: "Guru Neel Hari • 3 Decades of Authentic Vedic Mastery & Counsel",
      desc: "Free from commercial superstition and fear-driven retail traps, discover profound life direction, marriage compatibility, business muhurta, and planetary timing through rigorous astronomical mathematics and classical Parashara principles.",
      ctaPrimary: "Start Consultation",
      ctaSecondary: "Compute Kundali & Patro",
      rating: "4.95 / 5.0",
      ratingCount: "(Over 25,000+ Bespoke Natal Consultations Delivered)",
      chartTitle: "Natal Ascendant Chart (D-1)",
      observatory: "Kathmandu Observatory",
      lat: "Latitude: 27° 43' N",
      ayanamsha: "Chitrapaksha Ayanamsha: 24° 09' 53\"",
      b1Title: "Authentic Ephemeris",
      b1Sub: "Chitrapaksha Ayanamsha Standard",
      b2Title: "30+ Years Practice",
      b2Sub: "Parashara & Jaimini Lineage",
      b3Title: "Zero Exploitation",
      b3Sub: "Strict Prohibition on Gemstone Sales",
      b4Title: "Absolute Discretion",
      b4Sub: "In-Person & Encrypted Video",
    },
    calculator: {
      badge: "ASTRONOMICAL COMPUTATION • DRIK-PANCHANGA",
      title: "Natal Kundali & Ephemeris Suite",
      desc: "Calculated using high-precision astronomical algorithms calibrated to Chitrapaksha Ayanamsha and Kathmandu standard coordinates.",
      formTitle: "Enter Birth Coordinates",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Pradip Sharma",
      dateLabel: "Birth Date (A.D.)",
      timeLabel: "Birth Time (24h)",
      locationLabel: "Coordinates (Kathmandu Default)",
      calcButton: "Calculate Kundali & Ephemeris",
      chartView: "North-Indian Diamond Kundali Matrix",
      panchangaSummary: "Panchanga & Ephemeris Markers",
      tithi: "Tithi (Lunar Phase)",
      nakshatra: "Nakshatra (Asterism)",
      yoga: "Vedic Yoga",
      karana: "Karana (Half Lunar Day)",
      lagna: "Rising Sign (Lagna)",
      sunSign: "Surya Sign",
      moonSign: "Chandra Sign",
      bookPersonalAnalysis: "Book One-on-One Analysis with Guru Neel Hari",
    },
    solutions: {
      badge: "CLASSICAL VEDIC SERVICES",
      title: "Authentic Vedic Astrological Services",
      desc: "Grounded in Brihat Parashara Hora Shastra and Jaimini Sutras for personal destiny, family harmony, and enterprise success.",
      learnMore: "Book Session",
    },
    research: {
      badge: "APPLIED ADVISORY & RESEARCH",
      title: "Key Consultations & Heritage Research",
      desc: "Six signature advisory domains completed under the direct scholarly supervision of Jyotishacharya Guru Neel Hari.",
      viewDetails: "View Details",
    },
    manifesto: {
      badge: "ETHICAL JYOTISH PRINCIPLES",
      title: "Dignity & Moral Code of Vedic Astrology",
      desc: "Astrology is neither a tool to incite fear nor a commercial business. It is a profound spiritual science for understanding the cycles of nature.",
      quote: "Astrology is not meant to terrify people or render them fatalistic; it is the divine light that awakens their inner wisdom, strength, and auspicious timing to live a meaningful life.",
      author: "Guru Neel Hari",
      role: "Founder & Chief Jyotishacharya",
      org: "Neel Hari Vedic Jyotish Kendra, Baluwatar, Kathmandu",
    },
    about: {
      badge: "SCHOLAR BIOGRAPHY",
      title: "Guru Neel Hari",
      subtitle: "Founder & Chief Jyotishacharya • 30 Years of Classical Mastery",
      headline: "Classical Authority, Scientific Precision & Impartial Vision",
      p1: "Guru Neel Hari is among Nepal's most revered and authentic Vedic Jyotishacharyas. Trained in Kathmandu's historic Gurukul traditions in Sanskrit grammar, Brihat Parashara Hora Shastra, Jaimini Upadesha Sutras, and Surya Siddhanta astronomy, Guru has provided objective and shastra-compliant guidance to thousands of families and business leaders over three decades.",
      p2: "He is a resolute critic of superstition, fear-mongering, and commercial gemstone rackets. His unchanging philosophy: \"Astrology should never be used to intimidate; it must awaken human conscience, fortitude, and righteous action.\"",
      bookWithGuru: "Schedule Private Session with Guru",
      inPersonOrOnline: "Consultation: Baluwatar Sanctum or Encrypted Video",
    },
    testimonials: {
      badge: "CLIENT TRUST & EXPERIENCES",
      title: "Words from Our Clients",
      desc: "Reflections from individuals, business founders, and families whose paths were illuminated by Guru Neel Hari's authentic guidance.",
      verifiedReviews: "100% Verified Client Feedback",
      avgRating: "4.95 / 5.0 Average Satisfaction Rate",
      consultationsDelivered: "Over 25,000+ Consultations Delivered",
    },
    preFooter: {
      badge: "TRUTH • IMPARTIALITY • SACRED DIGNITY",
      title: "Consult Your Natal Chart & Auspicious Timing Today",
      desc: "Meet in person at our Baluwatar sanctuary in Kathmandu or book an online video consultation from anywhere across the globe.",
      bookNow: "Book Consultation Now",
      phoneText: "+977 1 4412345 / 9851012345",
      privacy: "Strict Client Confidentiality Guaranteed",
      accuracy: "High-Precision Drik-Ganita Calculations",
      remedy: "Pure Sattvic & Shastra-Compliant Counsel",
    },
    footer: {
      tagline: "Authentic Vedic astrological guidance based on Kathmandu's historic sacred heritage. Bespoke natal chart mapping, Vimshottari Dasha, matrimonial matching, and calendar computation.",
      city: "Baluwatar, Kathmandu • B.S. 2081 • Chitrapaksha Ayanamsha",
      quickLinks: "Quick Links",
      ourServices: "Core Services",
      contactTitle: "Sanctuary & Contact",
      hours: "Sunday – Friday: 8:00 AM – 6:00 PM NPT",
      copyright: "© 2081 Neel Hari Vedic Jyotish Kendra. All Rights Reserved.",
      standards: "Classical Vedic Astrology & Astronomical Ephemeris • Kathmandu, Nepal",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ne");

  useEffect(() => {
    // Check saved preference in localStorage
    const saved = localStorage.getItem("nh_lang");
    if (saved === "ne" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nh_lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "ne" ? "en" : "ne");
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
