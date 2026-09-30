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
    horoscope: string;
    store: string;
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
      contact: "सम्पर्क / WhatsApp: +४४ ७८३८ ८२०५१८",
      location: "वैदिक सनातन केन्द्र युके",
      home: "गृह",
      services: "सेवाहरू",
      kundali: "कुण्डली गणना",
      horoscope: "राशिफल",
      store: "स्टोर",
      aboutGuru: "गुरु परिचय",
      research: "अनुसन्धान",
      contactNav: "सम्पर्क",
      bookConsultation: "परामर्श बुक गर्नुहोस्",
    },
    hero: {
      statusPill: "वैदिक सनातन केन्द्र युके • प्रत्यक्ष तथा अनलाइन परामर्श उपलब्ध",
      eyebrow: "प्राचीन सूर्य सिद्धान्त • शुद्ध दृक-गणित • जीवन दर्शन",
      titleLine1: "समयको लय,",
      titleLine2: "जीवनको स्पष्ट मार्गचित्र।",
      subtitle: "गुरु निलहरि • CEO | Chief Consultant • वैदिक सनातन केन्द्र युके",
      desc: "काल्पनिक डर र व्यापारिक शोषणबिना, तपाईंको वास्तविक जन्म समय र ग्रह-नक्षत्रको सूक्ष्म गणितीय विश्लेषणबाट ज्योतिष (Horoscope), रत्न पहिचान (Gemstone Consultation), वास्तु शास्त्र (Home & Office Harmony) र कर्मकाण्ड (Vedic Rituals) मा स्पष्ट, सात्विक दिशा प्राप्त गर्नुहोस्।",
      ctaPrimary: "परामर्श सुरु गर्नुहोस्",
      ctaSecondary: "कुण्डली गणना गर्नुहोस्",
      rating: "४.९५ / ५.०",
      ratingCount: "(२५,०००+ भन्दा बढी कुण्डली परामर्श सम्पन्न)",
      chartTitle: "लग्न कुण्डली चक्र (D-1)",
      observatory: "वैदिक सनातन केन्द्र युके",
      lat: "अक्षांश: २७° ४३' उ.",
      ayanamsha: "चित्रापक्षीय अयनांश: २४° ०९' ५३\"",
      b1Title: "प्रामाणिक दृक-गणित",
      b1Sub: "चित्रापक्षीय अयनांश मानक",
      b2Title: "३०+ वर्ष साधना",
      b2Sub: "पाराशर तथा जैमिनी पद्धति",
      b3Title: "रत्न पहिचान",
      b3Sub: "शुद्ध प्रामाणिक रत्न परीक्षण",
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
      bookPersonalAnalysis: "गुरु निलहरिसँग यस कुण्डलीको विश्लेषण लिनुहोस्",
    },
    solutions: {
      badge: "शास्त्रीय वैदिक सेवाहरू",
      title: "प्रामाणिक वैदिक तथा ज्योतिष सेवाहरू",
      desc: "महर्षि पाराशर र जैमिनी सूत्रको परम्परामा आधारित ज्योतिष, रत्न पहिचान, वास्तु शास्त्र र वैदिक कर्मकाण्ड समाधानहरू।",
      learnMore: "परामर्श लिनुहोस्",
    },
    research: {
      badge: "शास्त्रीय अनुसन्धान र परामर्श",
      title: "प्रमुख परामर्श तथा शास्त्रीय अनुसन्धान",
      desc: "गुरु निलहरिको प्रत्यक्ष मार्गदर्शनमा सम्पन्न भएका प्रामाणिक वैदिक अध्ययन, रत्न परीक्षण, वास्तु शोधन र व्यक्तिगत परामर्श।",
      viewDetails: "विस्तृत विवरण",
    },
    manifesto: {
      badge: "वैदिक मर्यादा र निष्ठा",
      title: "वैदिक ज्योतिषको गरिमा र मूल्याङ्कन",
      desc: "ज्योतिष भनेको अन्धविश्वास फैलाउने वा त्रासमा पारेर व्यापार गर्ने माध्यम होइन। यो जीवनको लय बुझ्ने गहन आध्यात्मिक विज्ञान हो।",
      quote: "ज्योतिष मानिसलाई डराउन वा भाग्यवादी बनाउन होइन, उसको अन्तर्निहित शक्ति, विवेक र उचित समय पहिचान गरी जीवनलाई सार्थक बनाउने दिव्य प्रकाश हो।",
      author: "गुरु निलहरि (Guru Nilhari)",
      role: "CEO | Chief Consultant",
      org: "वैदिक सनातन केन्द्र युके (Vedic Sanatan Kendra UK)",
    },
    about: {
      badge: "ज्योतिषाचार्य परिचय",
      title: "गुरु निलहरि (Guru Nilhari)",
      subtitle: "CEO | Chief Consultant • वैदिक सनातन केन्द्र युके • ३० वर्षको शास्त्रीय अनुभव",
      headline: "शास्त्रसम्मत मार्गदर्शन, रत्न परीक्षण र वास्तु विशेषज्ञता",
      p1: "गुरु निलहरि वैदिक सनातन केन्द्र युके (Vedic Sanatan Kendra UK) का संस्थापक, CEO तथा प्रमुख परामर्शदाता हुनुहुन्छ। हिमालयन तथा गुरुकुल परम्परामा महर्षि पाराशर वृहत् होराशास्त्र, जैमिनी सूत्र, वास्तु शास्त्र तथा वैदिक कर्मकाण्डको गहन अध्ययन गर्नुभएका गुरुले विगत ३ दशकदेखि बेलायत (UK), नेपाल र विश्वभरका हजारौं व्यक्ति, परिवार तथा उद्यमीहरूलाई निष्पक्ष र शास्त्रसम्मत मार्गदर्शन प्रदान गर्दै आउनुभएको छ।",
      p2: "उहाँ ज्योतिष तथा कुण्डली (Astrology), वैज्ञानिक रत्न पहिचान (Gemstone Identification), वास्तु शास्त्र (Home & Office Harmony) तथा वैदिक कर्मकाण्ड एवं पूजा (Karmakanda) का प्रतिष्ठित विज्ञ हुनुहुन्छ।",
      bookWithGuru: "गुरु निलहरिसँग परामर्श समय लिनुहोस्",
      inPersonOrOnline: "युके प्रत्यक्ष भेटघाट वा विश्वव्यापी अनलाइन भिडियो",
    },
    testimonials: {
      badge: "विश्वास र अनुभूति",
      title: "हाम्रो ग्राहकहरूको अनुभूति",
      desc: "गुरु निलहरिको शास्त्रीय मार्गदर्शनबाट जीवनमा स्पष्ट दिशा, शान्ति र आत्मविश्वास पाएका सेवाग्राहीहरूका शब्दहरू।",
      verifiedReviews: "१००% वास्तविक सेवाग्राही समीक्षा",
      avgRating: "४.९५ / ५.० औसत सन्तुष्टि दर",
      consultationsDelivered: "२५,०००+ भन्दा बढी कुण्डली परामर्श",
    },
    preFooter: {
      badge: "सत्य • निष्पक्षता • शास्त्रीय मर्यादा",
      title: "अब नै आफ्नो जन्म कुण्डली तथा शुभ साइत परामर्श लिनुहोस्",
      desc: "वैदिक सनातन केन्द्र युके मार्फत प्रत्यक्ष भेटघाट वा संसारको जुनसुकै कुनाबाट अनलाइन भिडियो परामर्श मार्फत गुरु निलहरिसँग संवाद गर्नुहोस्।",
      bookNow: "परामर्श बुक गर्नुहोस्",
      phoneText: "+44 7838 820518",
      privacy: "गोपनीयताको पूर्ण प्रत्याभूति",
      accuracy: "शास्त्रीय दृक-सिद्ध शुद्धता",
      remedy: "सात्विक र निष्पक्ष मार्गदर्शन",
    },
    footer: {
      tagline: "वैदिक सनातन केन्द्र युके - ज्योतिष, रत्न पहिचान, वास्तु शास्त्र र वैदिक कर्मकाण्डको प्रामाणिक केन्द्र। गुरु निलहरिको प्रत्यक्ष मार्गदर्शन।",
      city: "वैदिक सनातन केन्द्र युके • www.gurunilhari.com",
      quickLinks: "द्रुत लिङ्कहरू",
      ourServices: "हाम्रा सेवाहरू",
      contactTitle: "सम्पर्क तथा ठेगाना",
      hours: "आइतबार – शनिबार: बिहान ९:०० – साँझ ७:०० GMT",
      copyright: "© २०२६ वैदिक सनातन केन्द्र युके (Guru Nilhari)। सर्वाधिकार सुरक्षित।",
      standards: "www.gurunilhari.com • WhatsApp: +44 7838 820518",
    },
  },
  en: {
    header: {
      patro: "Nepali Patro:",
      loading: "Loading...",
      sunrise: "KTM Sunrise:",
      sunset: "Sunset:",
      contact: "Contact / WhatsApp: +44 7838 820518",
      location: "Vedic Sanatan Kendra UK",
      home: "Home",
      services: "Services",
      kundali: "Ephemeris & Kundali",
      horoscope: "Horoscope",
      store: "Store",
      aboutGuru: "About Guru",
      research: "Advisory & Research",
      contactNav: "Contact",
      bookConsultation: "Book Consultation",
    },
    hero: {
      statusPill: "Vedic Sanatan Kendra UK • In-Person & Global Online Sessions",
      eyebrow: "Classical Surya Siddhanta • High-Precision Ephemeris • Philosophy",
      titleLine1: "The Rhythm of Time,",
      titleLine2: "A Clear Blueprint for Life.",
      subtitle: "Guru Nilhari • CEO | Chief Consultant • Vedic Sanatan Kendra UK",
      desc: "Free from commercial superstition and fear-driven retail traps, discover profound life direction across Astrology (Jyotish & Horoscope), Gemstone Identification (Ratna Consultation), Vastu Shastra (Home & Office Harmony), and Karmakanda (Vedic Rituals & Puja).",
      ctaPrimary: "Start Consultation",
      ctaSecondary: "Compute Kundali & Patro",
      rating: "4.95 / 5.0",
      ratingCount: "(Over 25,000+ Bespoke Natal Consultations Delivered)",
      chartTitle: "Natal Ascendant Chart (D-1)",
      observatory: "Vedic Sanatan Kendra UK",
      lat: "Latitude: 27° 43' N",
      ayanamsha: "Chitrapaksha Ayanamsha: 24° 09' 53\"",
      b1Title: "Authentic Ephemeris",
      b1Sub: "Chitrapaksha Ayanamsha Standard",
      b2Title: "30+ Years Practice",
      b2Sub: "Parashara & Jaimini Lineage",
      b3Title: "Gemstone Identification",
      b3Sub: "Certified Ratna Consultation",
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
      bookPersonalAnalysis: "Book One-on-One Analysis with Guru Nilhari",
    },
    solutions: {
      badge: "CLASSICAL VEDIC SERVICES",
      title: "Authentic Vedic & Astrological Services",
      desc: "Grounded in Brihat Parashara Hora Shastra and Jaimini Sutras for Astrology, Gemstone Identification, Vastu Shastra, and Karmakanda.",
      learnMore: "Book Session",
    },
    research: {
      badge: "APPLIED ADVISORY & RESEARCH",
      title: "Key Consultations & Heritage Research",
      desc: "Four core advisory domains and classical research completed under the direct scholarly supervision of Guru Nilhari.",
      viewDetails: "View Details",
    },
    manifesto: {
      badge: "ETHICAL JYOTISH PRINCIPLES",
      title: "Dignity & Moral Code of Vedic Astrology",
      desc: "Astrology is neither a tool to incite fear nor a commercial business. It is a profound spiritual science for understanding the cycles of nature.",
      quote: "Astrology is not meant to terrify people or render them fatalistic; it is the divine light that awakens their inner wisdom, strength, and auspicious timing to live a meaningful life.",
      author: "Guru Nilhari",
      role: "CEO | Chief Consultant",
      org: "Vedic Sanatan Kendra UK",
    },
    about: {
      badge: "SCHOLAR BIOGRAPHY",
      title: "Guru Nilhari",
      subtitle: "CEO | Chief Consultant • Vedic Sanatan Kendra UK • 30 Years of Classical Mastery",
      headline: "Classical Authority, Gemological Precision & Impartial Vision",
      p1: "Guru Nilhari is the Founder, CEO, and Chief Consultant of Vedic Sanatan Kendra UK. Steeped in the classical Vedic traditions of Brihat Parashara Hora Shastra, Jaimini Upadesha Sutras, Vastu Shastra, and sacred Karmakanda rituals, Guru Nilhari has guided thousands of seekers, professionals, and families across the United Kingdom, Nepal, and globally for over three decades.",
      p2: "He provides specialized guidance in four core pillars: Astrology (Jyotish & Horoscope), Gemstone Identification (Ratna Consultation), Vastu Shastra (Home & Office Harmony), and Karmakanda (Vedic Rituals & Puja).",
      bookWithGuru: "Schedule Private Session with Guru Nilhari",
      inPersonOrOnline: "Consultation: UK In-Person or Encrypted Online Video",
    },
    testimonials: {
      badge: "CLIENT TRUST & EXPERIENCES",
      title: "Words from Our Clients",
      desc: "Reflections from individuals, business founders, and families whose paths were illuminated by Guru Nilhari's authentic guidance.",
      verifiedReviews: "100% Verified Client Feedback",
      avgRating: "4.95 / 5.0 Average Satisfaction Rate",
      consultationsDelivered: "Over 25,000+ Consultations Delivered",
    },
    preFooter: {
      badge: "TRUTH • IMPARTIALITY • SACRED DIGNITY",
      title: "Consult Your Natal Chart & Auspicious Timing Today",
      desc: "Meet in person with Vedic Sanatan Kendra UK or book an online video consultation from anywhere across the globe.",
      bookNow: "Book Consultation Now",
      phoneText: "+44 7838 820518",
      privacy: "Strict Client Confidentiality Guaranteed",
      accuracy: "High-Precision Drik-Ganita Calculations",
      remedy: "Pure Sattvic & Shastra-Compliant Counsel",
    },
    footer: {
      tagline: "Vedic Sanatan Kendra UK - Authentic Centre for Astrology (Jyotish & Horoscope), Gemstone Identification (Ratna Consultation), Vastu Shastra (Home & Office Harmony), and Karmakanda (Vedic Rituals & Puja) under Guru Nilhari.",
      city: "Vedic Sanatan Kendra UK • www.gurunilhari.com",
      quickLinks: "Quick Links",
      ourServices: "Core Services",
      contactTitle: "Sanctuary & Contact",
      hours: "Sunday – Saturday: 9:00 AM – 7:00 PM GMT",
      copyright: "© 2026 Vedic Sanatan Kendra UK (Guru Nilhari). All Rights Reserved.",
      standards: "www.gurunilhari.com • WhatsApp: +44 7838 820518",
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
