"use client";

import React, { useState } from "react";
import {
  IconSparkles,
  IconCalendar,
  IconHeart,
  IconBriefcase,
  IconActivity,
  IconShield,
  IconArrowRight,
  IconSun,
  IconAward,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface HoroscopeExplorerProps {
  onOpenInquiry?: (topic?: string) => void;
  className?: string;
  defaultRashiIndex?: number;
}

type Period = "daily" | "weekly" | "yearly";

interface RashiInfo {
  id: string;
  glyph: string;
  neName: string;
  enName: string;
  elementNe: string;
  elementEn: string;
  lordNe: string;
  lordEn: string;
  luckyNum: string;
  luckyColorNe: string;
  luckyColorEn: string;
  luckyDirNe: string;
  luckyDirEn: string;
  daily: {
    luck: string;
    luckPercent: number;
    overviewNe: string;
    overviewEn: string;
    adviceNe: string;
    adviceEn: string;
    energyNe: string;
    energyEn: string;
  };
  weekly: {
    datesNe: string;
    datesEn: string;
    careerNe: string;
    careerEn: string;
    loveNe: string;
    loveEn: string;
    healthNe: string;
    healthEn: string;
    bestDaysNe: string;
    bestDaysEn: string;
  };
  yearly: {
    yearNe: string;
    yearEn: string;
    summaryNe: string;
    summaryEn: string;
    transitsNe: string;
    transitsEn: string;
    favorableNe: string;
    favorableEn: string;
    annualRemedyNe: string;
    annualRemedyEn: string;
  };
}

export const RASHI_DATA: RashiInfo[] = [
  {
    id: "aries",
    glyph: "♈",
    neName: "मेष",
    enName: "Aries",
    elementNe: "अग्नि (Fire)",
    elementEn: "Fire",
    lordNe: "मङ्गल (Mars)",
    lordEn: "Mars",
    luckyNum: "९ / 1",
    luckyColorNe: "गाढा रातो र सुनौलो",
    luckyColorEn: "Crimson & Gold",
    luckyDirNe: "पूर्व (East)",
    luckyDirEn: "East",
    daily: {
      luck: "८८%",
      luckPercent: 88,
      overviewNe: "कार्यक्षेत्रमा नयाँ अवसर र नेतृत्वको सम्भावना छ। रोकिएका धनसम्बन्धी कार्य सुचारु हुनेछन्। आत्मविश्वास उच्च रहनेछ।",
      overviewEn: "High momentum in leadership and new opportunities. Stalled financial matters move forward favorably with elevated confidence.",
      adviceNe: "बिहान सूर्यदेवलाई तामाको भाँडोबाट जल चढाउनुहोस्।",
      adviceEn: "Offer pure water to the rising Sun from a copper vessel.",
      energyNe: "उत्साहजनक र गतिशील",
      energyEn: "Dynamic & Resolute",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "सहकर्मीको सहयोगले नयाँ परियोजना प्रारम्भ गर्न सकिनेछ। व्यापारमा अपेक्षित नाफाको योग छ।",
      careerEn: "Collaboration with trusted colleagues catalyzes a new venture. Profitable returns in trade.",
      loveNe: "पारिवारिक सौहार्दता कायम रहनेछ। प्रियजनसँग मिष्ठान्न भोजन र रमाइलो भेटघाटको योग।",
      loveEn: "Domestic peace prevails. Uplifting gatherings with loved ones.",
      healthNe: "टाउको दुखाइ र आँखाको थकानबाट बच्न पर्याप्त विश्राम लिनुहोस्।",
      healthEn: "Ensure sufficient eye rest and hydration to prevent stress headaches.",
      bestDaysNe: "मंगलबार र आइतबार",
      bestDaysEn: "Tuesday & Sunday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "बृहस्पतिको अनुकूलताले मान-प्रतिष्ठा र पदोन्नति मिल्नेछ। वैदेशिक अध्ययन वा यात्राका योजनाहरू साकार हुने वर्ष।",
      summaryEn: "Auspicious Jupiter transit brings public recognition, promotion, and successful overseas voyages.",
      transitsNe: "दशम भावमा शनिको स्थिरताले दीर्घकालीन परिश्रमको स्थायी फल दिनेछ।",
      transitsEn: "Saturn's presence in the tenth house rewards long-term disciplined dedication.",
      favorableNe: "वैशाख, असोज र माघ महिना",
      favorableEn: "April-May, Oct, & Feb",
      annualRemedyNe: "मंगलबार हनुमान चालिसा पाठ गर्ने र रातो चन्दन प्रयोग गर्ने।",
      annualRemedyEn: "Recite Hanuman Chalisa on Tuesdays and wear red sandalwood tilak.",
    },
  },
  {
    id: "taurus",
    glyph: "♉",
    neName: "वृष",
    enName: "Taurus",
    elementNe: "पृथ्वी (Earth)",
    elementEn: "Earth",
    lordNe: "शुक्र (Venus)",
    lordEn: "Venus",
    luckyNum: "६ / 2",
    luckyColorNe: "सेतो र चम्किलो चाँदी",
    luckyColorEn: "Pearl White & Silver",
    luckyDirNe: "दक्षिण-पूर्व (SE)",
    luckyDirEn: "South-East",
    daily: {
      luck: "८२%",
      luckPercent: 82,
      overviewNe: "स्थिरता र सन्तुष्टिको दिन। भौतिक सुख-सुविधाका साधन संग्रह हुनेछन्। बोलीको प्रभावले अरूलाई आकर्षित गर्न सकिनेछ।",
      overviewEn: "Grounding and materially rewarding energy. Aesthetic pursuits prosper and your articulate speech builds trust.",
      adviceNe: "सेतो वस्तु वा गाईलाई खान दिएर दिनको सुरुवात गर्नुहोस्।",
      adviceEn: "Offer green grass or fresh grains to cows or donate white goods.",
      energyNe: "धैर्यवान र सात्विक",
      energyEn: "Steady & Harmonious",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "आर्थिक लगानीमा विचार पुर्‍याउनुहोला। साझेदारी काममा पारदर्शिता राख्दा दीर्घकालीन लाभ मिल्नेछ।",
      careerEn: "Exercise prudence in major financial expenditures. Clear transparency in partnership yields stability.",
      loveNe: "दाम्पत्य जीवनमा मिठास थपिनेछ। पुराना मनमुटाव समाधान हुने समय छ।",
      loveEn: "Marital harmony deepens as old misunderstandings resolve naturally.",
      healthNe: "घाँटी र कण्ठ रोगको संवेदनशीलता रहन सक्छ, तातो पानी सेवन लाभदायक।",
      healthEn: "Throat sensitivity possible; warm herbal water is advised.",
      bestDaysNe: "शुक्रबार र सोमबार",
      bestDaysEn: "Friday & Monday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "सम्पत्ति खरिद तथा गृह-निर्माणका लागि विशेष फलदायी वर्ष। पारिवारिक सुख र सन्तान पक्षबाट खुसी मिल्नेछ।",
      summaryEn: "Highly auspicious year for real estate acquisition, home building, and joyful family milestones.",
      transitsNe: "राहु-केतुको अक्षीय परिवर्तनले अप्रत्याशित वित्तीय अवसरहरू सिर्जना गर्नेछ।",
      transitsEn: "Nodal transit axis opens unexpected avenues for wealth generation and global investments.",
      favorableNe: "ज्येष्ठ, कात्तिक र फागुन",
      favorableEn: "May-June, Nov, & March",
      annualRemedyNe: "शुक्रवार श्रीसूक्त पाठ गर्ने र लक्ष्मीजीको आराधना गर्ने।",
      annualRemedyEn: "Recite Sri Suktam every Friday and maintain sacred cleanliness.",
    },
  },
  {
    id: "gemini",
    glyph: "♊",
    neName: "मिथुन",
    enName: "Gemini",
    elementNe: "वायु (Air)",
    elementEn: "Air",
    lordNe: "बुध (Mercury)",
    lordEn: "Mercury",
    luckyNum: "५ / 3",
    luckyColorNe: "हरियो र हल्का पहेलो",
    luckyColorEn: "Emerald Green & Light Yellow",
    luckyDirNe: "उत्तर (North)",
    luckyDirEn: "North",
    daily: {
      luck: "९१%",
      luckPercent: 91,
      overviewNe: "बौद्धिक प्रतिस्पर्धा र सञ्चारमा अद्भुत सफलता। नयाँ सूचना र सम्पर्कले भविष्यका ढोका खोल्नेछ। छोटो यात्रा सुखद।",
      overviewEn: "Remarkable sharpness in intellect and communication. High networking acumen unlocks new prospective paths.",
      adviceNe: "तुलसीको पात चपाएर वा जल चढाएर काम सुरु गर्नुहोस्।",
      adviceEn: "Revere Tulsi plant with sacred water before commencing tasks.",
      energyNe: "तीक्ष्ण र सिर्जनशील",
      energyEn: "Agile & Expressive",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "लेखन, सञ्चार, सूचना प्रविधि र व्यापारमा उल्लेखनीय प्रगति। नयाँ सम्झौतामा हस्ताक्षर हुनसक्छ।",
      careerEn: "Significant breakthroughs in writing, IT, trading, and formal contract signings.",
      loveNe: "मित्रता प्रेममा बदलिने सम्भावना। खुला कुराकानीले सम्बन्धलाई प्रगाढ बनाउनेछ।",
      loveEn: "Warm social connections flourish. Candid conversations deepen mutual respect.",
      healthNe: "श्वासप्रश्वास र स्नायु प्रणालीलाई ऊर्जावान राख्न प्राणायाम गर्नुहोस्।",
      healthEn: "Daily pranayama recommended to balance nervous system and mental fatigue.",
      bestDaysNe: "बुधबार र बिहीबार",
      bestDaysEn: "Wednesday & Thursday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "विद्या, अनुसन्धान र व्यापार विस्तारमा स्वर्णिम समय। ज्ञानको सही उपयोगले प्रतिष्ठित स्थान दिलाउनेछ।",
      summaryEn: "A landmark year for advanced research, academic excellence, and international business scaling.",
      transitsNe: "बृहस्पतिको शुभ दृष्टिले भाग्यवृद्धि र धार्मिक कार्यमा संलग्नता बढाउनेछ।",
      transitsEn: "Jupiter's benevolence enhances fortune, spiritual merit, and societal standing.",
      favorableNe: "असार, मंसिर र चैत",
      favorableEn: "June-July, Dec, & April",
      annualRemedyNe: "बुधबार विष्णु सहस्रनाम पाठ गर्ने र हरियो मूंग दाल दान गर्ने।",
      annualRemedyEn: "Chant Vishnu Sahasranama on Wednesdays and support green environmental causes.",
    },
  },
  {
    id: "cancer",
    glyph: "♋",
    neName: "कर्कट",
    enName: "Cancer",
    elementNe: "जल (Water)",
    elementEn: "Water",
    lordNe: "चन्द्रमा (Moon)",
    lordEn: "Moon",
    luckyNum: "२ / 4",
    luckyColorNe: "मोती सेतो र क्रिम",
    luckyColorEn: "Pearl White & Cream",
    luckyDirNe: "उत्तर-पश्चिम (NW)",
    luckyDirEn: "North-West",
    daily: {
      luck: "७६%",
      luckPercent: 76,
      overviewNe: "भावनालाई नियन्त्रणमा राख्दै व्यावहारिक निर्णय लिनुपर्ने दिन। पारिवारिक जिम्मेवारीले व्यस्तता बढाउनेछ।",
      overviewEn: "Favor rational pragmatism over passing emotional waves. Fulfilling family duties brings profound peace.",
      adviceNe: "आमा वा मातृसमान स्त्रीको आशीर्वाद लिनुहोस्।",
      adviceEn: "Seek maternal blessings and drink water from a silver cup.",
      energyNe: "संवेदनशील र कल्याणकारी",
      energyEn: "Intuitive & Caring",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "कार्यक्षेत्रमा धैर्य राख्नुहोस्, हतारमा निर्णय नगर्नुहोला। आर्थिक लेनदेनमा सजगता आवश्यक।",
      careerEn: "Avoid hasty career commitments. Maintain precise financial bookkeeping.",
      loveNe: "घरपरिवारमा धार्मिक अनुष्ठान वा शुभ भेटघाटको माहोल बन्नेछ।",
      loveEn: "Auspicious home rituals or family reunions inspire warmth.",
      healthNe: "कफ र छातीको चिसोबाट बच्न न्यानो खानपानमा जोड दिनुहोस्।",
      healthEn: "Guard against seasonal chills; warm nourishing broths advised.",
      bestDaysNe: "सोमबार र मंगलबार",
      bestDaysEn: "Monday & Tuesday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "आन्तरिक शान्ति, ध्यान र आध्यात्मिक विकासको वर्ष। पुराना तनावहरू क्रमशः हट्दै जानेछन्।",
      summaryEn: "Transformative year for spiritual grounding, inner calm, and resolution of historic anxieties.",
      transitsNe: "शनिको अढैयाको अन्त्यतिर सकारात्मक मोड आउने र रोकिएका कार्य पूरा हुनेछन्।",
      transitsEn: "As Saturn's heavy gaze softens, major long-pending aspirations materialize.",
      favorableNe: "साउन, पुस र वैशाख",
      favorableEn: "July-Aug, Jan, & May",
      annualRemedyNe: "सोमबार शिवलिङ्गमा दूध र जलले अभिषेक गर्ने।",
      annualRemedyEn: "Perform milk and water abhishekam to Shiva Lingam on Mondays.",
    },
  },
  {
    id: "leo",
    glyph: "♌",
    neName: "सिंह",
    enName: "Leo",
    elementNe: "अग्नि (Fire)",
    elementEn: "Fire",
    lordNe: "सूर्य (Sun)",
    lordEn: "Sun",
    luckyNum: "१ / 7",
    luckyColorNe: "केसरी र सुनौलो",
    luckyColorEn: "Saffron & Burnished Gold",
    luckyDirNe: "पूर्व (East)",
    luckyDirEn: "East",
    daily: {
      luck: "९४%",
      luckPercent: 94,
      overviewNe: "तेज, पराक्रम र मान-प्रतिष्ठाको अभूतपूर्व योग। ठूला निर्णय लिन र प्रशासकीय काम फत्ते गर्न उत्तम समय।",
      overviewEn: "Radiant planetary alignment empowering leadership, state affairs, and executive decision-making.",
      adviceNe: "आदित्य हृदय स्तोत्र पाठ गर्नुहोस् वा सूर्य नमस्कार गर्नुहोस्।",
      adviceEn: "Recite Aditya Hridaya Stotram or perform morning Surya Namaskaras.",
      energyNe: "तेजस्वी र राजसी",
      energyEn: "Regal & Authoritative",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "उच्च अधिकारीबाट प्रशंसा र नयाँ जिम्मेवारीको प्राप्ति। सरकारी काममा सफलता।",
      careerEn: "Commendation from senior leadership and successful resolution of official government tasks.",
      loveNe: "व्यक्तिगत सम्बन्धमा आत्मसम्मानको सन्तुलन कायम राख्नुहोला।",
      loveEn: "Balance pride with gentle understanding in intimate bonds.",
      healthNe: "हृदय र रक्तचापको नियमित जाँच तथा हल्का व्यायाम लाभदायक।",
      healthEn: "Cardiovascular wellness supported by brisk morning walking.",
      bestDaysNe: "आइतबार र बिहीबार",
      bestDaysEn: "Sunday & Thursday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "व्यावसायिक उचाइ र सामाजिक नेतृत्व प्राप्त हुने वर्ष। नयाँ उद्योग वा लगानीमा विजय।",
      summaryEn: "Ascent to apex executive stature and civic leadership. Commercial ventures hit key revenue milestones.",
      transitsNe: "भाग्य स्थानमा बृहस्पतिको शुभ प्रभावले सबै क्षेत्रमा मार्गनिर्देशन र संरक्षण मिल्नेछ।",
      transitsEn: "Jupiter in the fortune house radiates divine grace, mentorship, and protection.",
      favorableNe: "भदौ, माघ र जेठ",
      favorableEn: "Aug-Sept, Jan-Feb, & June",
      annualRemedyNe: "आइतबार गायत्री मन्त्र जप गर्ने र पिताको सेवा गर्ने।",
      annualRemedyEn: "Chant the Gayatri Mantra daily and serve parental elders with reverent care.",
    },
  },
  {
    id: "virgo",
    glyph: "♍",
    neName: "कन्या",
    enName: "Virgo",
    elementNe: "पृथ्वी (Earth)",
    elementEn: "Earth",
    lordNe: "बुध (Mercury)",
    lordEn: "Mercury",
    luckyNum: "५ / 6",
    luckyColorNe: "गहिरो हरियो र सेतो",
    luckyColorEn: "Forest Green & Silver",
    luckyDirNe: "दक्षिण (South)",
    luckyDirEn: "South",
    daily: {
      luck: "८६%",
      luckPercent: 86,
      overviewNe: "बारीकीपूर्वक गरिएको कामले ठूलो प्रशंसा पाउनेछ। हिसाबकिताब, लेखा र कानूनी काममा सहजता मिल्नेछ।",
      overviewEn: "Meticulous analytical work draws high praise. Accounting, legal drafting, and audits run seamlessly.",
      adviceNe: "हरियो घाँस वा अन्न चराचुरुङ्गीलाई दिनुहोस्।",
      adviceEn: "Feed birds with grains or offer green fodder to sanctuary animals.",
      energyNe: "सूक्ष्म र विश्लेषणात्मक",
      energyEn: "Analytical & Grounded",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "कार्यकुशलताले प्रतिस्पर्धीहरूलाई पछि पार्न सकिनेछ। रोकिएका बक्यौता रकम उठ्नेछ।",
      careerEn: "Superb efficiency outpaces competition. Recovery of long-stalled dues.",
      loveNe: "सानो कुरामा तर्कवितर्कबाट बच्नुहोस्, आपसी समझदारी बढाउनुहोस्।",
      loveEn: "Bypass minor critical debates; nurture empathy and shared joy.",
      healthNe: "पाचन प्रणालीलाई सन्तुलित राख्न सात्विक र ताजा भोजन गर्नुहोस्।",
      healthEn: "Light, fiber-rich digestive diet keeps gut inflammation at bay.",
      bestDaysNe: "बुधबार र शुक्रबार",
      bestDaysEn: "Wednesday & Friday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "ऋणमुक्ति, प्रतिस्पर्धीमाथि विजय र दक्षता वृद्धि गर्ने वर्ष। नयाँ सीप आर्जनमा विशेष सफलता।",
      summaryEn: "Eradication of debts, triumph over competitors, and acquisition of cutting-edge professional masteries.",
      transitsNe: "केतुको प्रभावले आध्यात्मिक गहिराइ र अनावश्यक मोहबाट मुक्ति दिनेछ।",
      transitsEn: "Ketu's transit deepens spiritual discernment and cleanses redundant clutter.",
      favorableNe: "असोज, फागुन र असार",
      favorableEn: "Sept-Oct, Feb-March, & July",
      annualRemedyNe: "गणेशजीलाई दुर्वा (दूबो) अर्पण गर्ने र गणेश अथर्वशीर्ष पाठ गर्ने।",
      annualRemedyEn: "Offer fresh Durva grass to Lord Ganesha and chant Ganapati Atharvashirsha.",
    },
  },
  {
    id: "libra",
    glyph: "♎",
    neName: "तुला",
    enName: "Libra",
    elementNe: "वायु (Air)",
    elementEn: "Air",
    lordNe: "शुक्र (Venus)",
    lordEn: "Venus",
    luckyNum: "६ / 8",
    luckyColorNe: "हल्का नीलो र सेतो",
    luckyColorEn: "Sky Blue & Alabaster",
    luckyDirNe: "पश्चिम (West)",
    luckyDirEn: "West",
    daily: {
      luck: "८४%",
      luckPercent: 84,
      overviewNe: "कला, सौन्दर्य र साझेदारीमा अनुकूलता। कूटनीतिक कौशलले जटिल विवाद समाधान गर्न मद्दत गर्नेछ।",
      overviewEn: "Aesthetic grace and diplomatic balance resolve tricky negotiations effortlessly. Partnerships shine.",
      adviceNe: "सुगन्धित अगरबत्ती वा अत्तरको प्रयोग गर्नुहोस्।",
      adviceEn: "Apply natural sandalwood or floral fragrance before meeting collaborators.",
      energyNe: "सौम्य र सन्तुलित",
      energyEn: "Harmonious & Poised",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "नयाँ व्यावसायिक सम्झौता र ग्राहक सञ्जाल विस्तार हुनेछ। आर्थिक पक्ष सन्तुलित।",
      careerEn: "Expansion of client network and lucrative contract closures. Stable cash flow.",
      loveNe: "विवाह वार्ता वा प्रेम सम्बन्धमा नयाँ आयाम थपिनेछ। रोमान्टिक समय।",
      loveEn: "Matrimonial discussions advance happily. Deep romantic rapport.",
      healthNe: "मृगौला र कम्मरको दुखाइबाट बच्न पर्याप्त पानी पिउनुहोस्।",
      healthEn: "Hydrate copiously to maintain healthy kidney and lumbar vitality.",
      bestDaysNe: "शुक्रबार र शनिबार",
      bestDaysEn: "Friday & Saturday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "सम्बन्ध, विवाह र व्यापार विस्तारका लागि ऐतिहासिक फलदायी वर्ष। विदेशी मुलुकसँग सहकार्य।",
      summaryEn: "A stellar year for wedlock, high-profile alliances, and international trade expansion.",
      transitsNe: "सप्तम भावमा बृहस्पतिको दृष्टिले पारिवारिक र व्यावसायिक साझेदारीलाई अमृततुल्य बनाउनेछ।",
      transitsEn: "Jupiter's gaze on the seventh house brings divine blessing to partnerships.",
      favorableNe: "कात्तिक, चैत र साउन",
      favorableEn: "Oct-Nov, March-April, & August",
      annualRemedyNe: "कन्याहरूलाई खीर वा फलफूल खुवाउने र सेतो वस्त्र दान गर्ने।",
      annualRemedyEn: "Sponsor meals for young girls and wear clean natural fabrics.",
    },
  },
  {
    id: "scorpio",
    glyph: "♏",
    neName: "वृश्चिक",
    enName: "Scorpio",
    elementNe: "जल (Water)",
    elementEn: "Water",
    lordNe: "मङ्गल (Mars)",
    lordEn: "Mars",
    luckyNum: "९ / 7",
    luckyColorNe: "सिन्दूरे रातो र कफी",
    luckyColorEn: "Crimson & Deep Maroon",
    luckyDirNe: "उत्तर (North)",
    luckyDirEn: "North",
    daily: {
      luck: "७९%",
      luckPercent: 79,
      overviewNe: "गूढ ज्ञान र अनुसन्धानमा गहिरो रुचि। गोप्य शत्रुहरू परास्त हुनेछन् तर लगानीमा सतर्कता आवश्यक।",
      overviewEn: "Strong instinct for esoteric wisdom and hidden insights. Competitors neutralized; verify all investment fine print.",
      adviceNe: "हनुमानजीलाई सिन्दूर अर्पण गर्नुहोस् वा स्मरण गर्नुहोस्।",
      adviceEn: "Offer reverence to Lord Hanuman and practice silent meditation.",
      energyNe: "गम्भीर र दृढ",
      energyEn: "Intense & Resilient",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "प्राविधिक र अनुसन्धानमूलक कार्यमा विशेष प्रगति। गोपनीयता कायम राख्दा फाइदा।",
      careerEn: "High breakthroughs in research, forensics, engineering, and confidential strategies.",
      loveNe: "अनावश्यक शंकाबाट बच्नुहोस्। एक-अर्काको व्यक्तिगत स्पेसको सम्मान गर्नुहोस्।",
      loveEn: "Dispel ungrounded doubts; mutual emotional sanctuary fosters trust.",
      healthNe: "मानसिक तनाव र अनिद्राबाट बच्न साँझमा ध्यान (Meditation) गर्नुहोस्।",
      healthEn: "Evening dhyana (meditation) recommended to calm hyperactive thought loops.",
      bestDaysNe: "मंगलबार र सोमबार",
      bestDaysEn: "Tuesday & Monday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "परिवर्तन र आत्म-पुनर्जन्मको वर्ष। पुराना अवरोधहरू पार गर्दै नयाँ जीवनशैलीको सुरुवात हुनेछ।",
      summaryEn: "A profound epoch of self-regeneration, shedding obsolete shackles, and redefining life's trajectory.",
      transitsNe: "छैठौं भावमा बृहस्पतिको गोचरले ऋण र रोगबाट मुक्ति दिलाउनेछ।",
      transitsEn: "Jupiter in the sixth house dissolves debts, legal burdens, and chronic ailments.",
      favorableNe: "मंसिर, वैशाख र भदौ",
      favorableEn: "Nov-Dec, April-May, & Sept",
      annualRemedyNe: "महामृत्युञ्जय मन्त्रको नियमित जप गर्ने र तामाको सिक्का जलमा विसर्जन गर्ने।",
      annualRemedyEn: "Daily chanting of the Maha Mrityunjaya Mantra and charitable acts.",
    },
  },
  {
    id: "sagittarius",
    glyph: "♐",
    neName: "धनु",
    enName: "Sagittarius",
    elementNe: "अग्नि (Fire)",
    elementEn: "Fire",
    lordNe: "बृहस्पति (Jupiter)",
    lordEn: "Jupiter",
    luckyNum: "३ / 12",
    luckyColorNe: "पहेलो र सुनौलो",
    luckyColorEn: "Royal Yellow & Golden Saffron",
    luckyDirNe: "उत्तर-पूर्व (NE)",
    luckyDirEn: "North-East",
    daily: {
      luck: "९०%",
      luckPercent: 90,
      overviewNe: "गुरुको कृपाले भाग्य चम्किने दिन। उच्च अध्ययन, परामर्श र आध्यात्मिक कार्यमा सफलता मिल्नेछ।",
      overviewEn: "Guru's grace illuminates fortune. Superb fruition in higher learning, executive consultancy, and dharma.",
      adviceNe: "निधारमा पहेलो चन्दन वा केशरको तिलक लगाउनुहोस्।",
      adviceEn: "Apply pure saffron or yellow sandalwood tilak on your forehead.",
      energyNe: "आशावादी र सात्विक",
      energyEn: "Philosophical & Expansive",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "सल्लाहकार वा गुरुको सहयोगले ठूलो निर्णय सुल्झनेछ। सामाजिक मर्यादामा वृद्धि।",
      careerEn: "Mentorship untangles complex dilemmas. Elevation of societal prestige.",
      loveNe: "पारिवारिक धार्मिक यात्रा वा तीर्थाटनको योजना बन्नेछ। सन्तानबाट शुभ समाचार।",
      loveEn: "Pilgrimage or peaceful cultural family travel plans materialize.",
      healthNe: "कलेजो र तौलको सन्तुलनका लागि चिल्लो-पिरो भोजन नियन्त्रण गर्नुहोस्।",
      healthEn: "Support hepatic health by curtailing overly rich or oily delicacies.",
      bestDaysNe: "बिहीबार र आइतबार",
      bestDaysEn: "Thursday & Sunday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "विद्या, सन्तान सुख र उच्च पद प्राप्तिको अभूतपूर्व वर्ष। आध्यात्मिक उन्नति र गुरु दीक्षा।",
      summaryEn: "Monumental year for academic honours, progeny milestones, and spiritual initiation into higher wisdom.",
      transitsNe: "पञ्चम भावमा बृहस्पतिको प्रत्यक्ष कृपाले बुद्धि, विवेक र सिर्जनात्मक कार्यमा जय दिलाउनेछ।",
      transitsEn: "Jupiter in the fifth house sparks sheer brilliance, wisdom, and auspicious ventures.",
      favorableNe: "पुस, जेठ र असोज",
      favorableEn: "Dec-Jan, May-June, & Oct",
      annualRemedyNe: "बिहीबार गाईलाई चनाको दाल र गुड खुवाउने, पहेलो वस्त्र लगाउने।",
      annualRemedyEn: "Feed soaked chickpeas and jaggery to cows on Thursdays.",
    },
  },
  {
    id: "capricorn",
    glyph: "♑",
    neName: "मकर",
    enName: "Capricorn",
    elementNe: "पृथ्वी (Earth)",
    elementEn: "Earth",
    lordNe: "शनि (Saturn)",
    lordEn: "Saturn",
    luckyNum: "८ / 4",
    luckyColorNe: "गाढा नीलो र खैरो",
    luckyColorEn: "Midnight Blue & Charcoal",
    luckyDirNe: "दक्षिण (South)",
    luckyDirEn: "South",
    daily: {
      luck: "७८%",
      luckPercent: 78,
      overviewNe: "कडा परिश्रमको जगमा स्थायी उपलब्धि बन्ने दिन। जिम्मेवारीलाई इमानदारीपूर्वक पूरा गर्दा वरिष्ठबाट सराहना।",
      overviewEn: "Disciplined effort cements lasting foundations. Integrity in execution earns sincere praise from superiors.",
      adviceNe: "वृद्ध वा असहाय व्यक्तिलाई सम्मान र सहयोग गर्नुहोस्।",
      adviceEn: "Assist elderly or destitute persons and avoid arrogance.",
      energyNe: "धैर्यवान र कर्मठ",
      energyEn: "Pragmatic & Enduring",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "दीर्घकालीन परियोजनामा लगनशीलता चाहिन्छ। नयाँ योजनाको खाका तयार गर्न उपयुक्त।",
      careerEn: "Steady diligence required in multi-year infrastructure; optimal for framing blueprints.",
      loveNe: "पारिवारिक जिम्मेवारीलाई बोझ नसम्झी प्रेमपूर्वक सम्हाल्नुहोला।",
      loveEn: "Embrace domestic responsibilities as tokens of enduring love.",
      healthNe: "घुँडा र जोर्नीको दुखाइबाट बच्न नियमित व्यायाम र तातो तेल मालिस।",
      healthEn: "Warm sesame oil application relieves joint and knee tightness.",
      bestDaysNe: "शनिबार र बुधबार",
      bestDaysEn: "Saturday & Wednesday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "साढेसातीको अन्त्यसँगै नयाँ समृद्धिको ढोका खुल्नेछ। घर-जग्गा र स्थायी सम्पत्ति जोड्ने वर्ष।",
      summaryEn: "Emerging victorious as Sade Sati concludes; dawn of stable wealth and permanent acquisitions.",
      transitsNe: "शनिको तृतीय भावमा गोचरले अदम्य साहस र पराक्रम वृद्धि गराउनेछ।",
      transitsEn: "Saturn transiting the third house injects formidable courage and unstoppable stamina.",
      favorableNe: "माघ, असार र कात्तिक",
      favorableEn: "Jan-Feb, June-July, & Nov",
      annualRemedyNe: "शनिबार पिपलको रुखमा जल चढाउने र तिलको तेलको दियो बाल्ने।",
      annualRemedyEn: "Light a sesame oil lamp near a sacred Peepal tree on Saturdays.",
    },
  },
  {
    id: "aquarius",
    glyph: "♒",
    neName: "कुम्भ",
    enName: "Aquarius",
    elementNe: "वायु (Air)",
    elementEn: "Air",
    lordNe: "शनि (Saturn)",
    lordEn: "Saturn",
    luckyNum: "७ / 8",
    luckyColorNe: "आसमानी नीलो र बैजनी",
    luckyColorEn: "Electric Blue & Violet",
    luckyDirNe: "पश्चिम (West)",
    luckyDirEn: "West",
    daily: {
      luck: "८५%",
      luckPercent: 85,
      overviewNe: "नवीन सोच, प्राविधिक आविष्कार र समाजसेवामा अभिरुचि। मित्रवर्गबाट राम्रो सहयोग प्राप्त हुनेछ।",
      overviewEn: "Visionary ideas, technological triumphs, and social philanthropy find generous camaraderie and backing.",
      adviceNe: "कालो तिल वा छाता खाँचोमा परेकालाई दान गर्नुहोस्।",
      adviceEn: "Donate black sesame or umbrellas to laborers in need.",
      energyNe: "क्रान्तिकारी र मानवीय",
      energyEn: "Visionary & Altruistic",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "सामूहिक कार्य र अन्तर्राष्ट्रिय सम्पर्कबाट फाइदा। नयाँ प्रविधिको प्रयोगमा सफलता।",
      careerEn: "High yields from collective teamwork and global syndicates. Tech modernization flourishes.",
      loveNe: "मित्रता नै सम्बन्धको आधार बन्नेछ। बौद्धिक कुराकानीले नजिक ल्याउनेछ।",
      loveEn: "Deep intellectual intimacy forms the rock-solid basis of love.",
      healthNe: "पैताला र नसाको दुखाइबाट बच्न हलुका हिँडडुल र ध्यान गर्नुहोस्।",
      healthEn: "Gentle walks and reflexology relieve ankle and circulation tension.",
      bestDaysNe: "शनिबार र बिहीबार",
      bestDaysEn: "Saturday & Thursday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "संसारभर ख्याति र सामाजिक प्रभाव विस्तार हुने वर्ष। साढेसातीको उतरार्धले मानसिक परिपक्वता दिनेछ।",
      summaryEn: "Global influence and societal footprint swell. Sade Sati's final leg forges unshakeable wisdom.",
      transitsNe: "द्वितीय भावमा शनिको स्थिरताले सञ्चित धनको रक्षा र सदुपयोग गराउनेछ।",
      transitsEn: "Saturn anchoring wealth chambers secures reserves and prudent investments.",
      favorableNe: "फागुन, साउन र मंसिर",
      favorableEn: "Feb-March, July-Aug, & Dec",
      annualRemedyNe: "रुद्राक्ष धारण गर्ने, शनि स्तोत्र पाठ गर्ने र असहायलाई भोजन गराउने।",
      annualRemedyEn: "Wear consecrated Rudraksha beads and sponsor meals for the underprivileged.",
    },
  },
  {
    id: "pisces",
    glyph: "♓",
    neName: "मीन",
    enName: "Pisces",
    elementNe: "जल (Water)",
    elementEn: "Water",
    lordNe: "बृहस्पति (Jupiter)",
    lordEn: "Jupiter",
    luckyNum: "३ / 9",
    luckyColorNe: "सुनौलो पहेलो र सुन्तला",
    luckyColorEn: "Golden Yellow & Tangerine",
    luckyDirNe: "उत्तर-पूर्व (NE)",
    luckyDirEn: "North-East",
    daily: {
      luck: "८९%",
      luckPercent: 89,
      overviewNe: "अन्तर्ज्ञान र सिर्जनात्मक शक्ति प्रबल। वैदेशिक कार्य, दान-पुण्य र अध्ययनमा सुखद नतिजा मिल्नेछ।",
      overviewEn: "Heightened intuition and artistic transcendence. Stellar dividends in overseas affairs, charity, and wisdom.",
      adviceNe: "केसर वा चन्दनको तिलक लगाउनुहोस् र भगवान नारायणको ध्यान गर्नुहोस्।",
      adviceEn: "Apply saffron tilak and meditate on Lord Narayana.",
      energyNe: "आध्यात्मिक र करुणामयी",
      energyEn: "Compassionate & Mystical",
    },
    weekly: {
      datesNe: "यस हप्ताको ग्रह गोचर",
      datesEn: "This Week's Transits",
      careerNe: "दूरगामी योजनाहरू बन्नेछन्। विदेशी मुद्रा वा बाह्य स्रोतबाट लाभको योग।",
      careerEn: "Far-reaching strategic designs take wing; gains through forex and international channels.",
      loveNe: "आत्मीय सम्बन्धमा समर्पण र विश्वास बढ्नेछ। शान्त वातावरणमा समय बिताउनुहोला।",
      loveEn: "Unconditional devotion and quiet serenity nurture the soul.",
      healthNe: "पैतालाको हेरचाह र पर्याप्त गहिरो निन्द्रा लिनु आवश्यक छ।",
      healthEn: "Prioritize restful deep sleep and gentle foot soaks.",
      bestDaysNe: "बिहीबार र सोमबार",
      bestDaysEn: "Thursday & Monday",
    },
    yearly: {
      yearNe: "वर्ष २०८२/२०८३ वार्षिक दृष्टि",
      yearEn: "Annual Outlook 2026/2082",
      summaryNe: "आत्मज्ञान, वैदेशिक बसोबास वा यात्रा र परोपकारी कार्यका लागि ऐतिहासिक वर्ष।",
      summaryEn: "An epochal year for self-realization, foreign residence, and sacred charitable legacies.",
      transitsNe: "राहु-बृहस्पतिको गोचरले आध्यात्मिक चेतना र वैश्विक स्तरको पहिचान दिलाउनेछ।",
      transitsEn: "Jupiter and Rahu transits elevate spiritual frequency and universal recognition.",
      favorableNe: "चैत, भदौ र पुस",
      favorableEn: "March-April, Aug-Sept, & Jan",
      annualRemedyNe: "विष्णु सहस्रनाम पाठ गर्ने, पहेलो दाल दान गर्ने र गुरुको सेवा गर्ने।",
      annualRemedyEn: "Recite Vishnu Sahasranama and offer selfless seva to your spiritual guru.",
    },
  },
];

export default function HoroscopeExplorer({
  onOpenInquiry,
  className = "",
  defaultRashiIndex = 0,
}: HoroscopeExplorerProps) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  const [selectedRashiIdx, setSelectedRashiIdx] = useState<number>(defaultRashiIndex);
  const [activePeriod, setActivePeriod] = useState<Period>("daily");

  const rashi = RASHI_DATA[selectedRashiIdx];

  return (
    <div className={`w-full bg-white border border-stone-200/90 rounded-lg shadow-xs overflow-hidden ${className}`}>
      
      {/* 1. Header Toolbar with Eye-Pleasing Period Switcher */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/90 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#D95B16] text-white flex items-center justify-center font-serif text-lg font-bold">
            {rashi.glyph}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                {isNe ? "राशिफल तथा ग्रह गोचर विश्लेषण" : "Vedic Horoscope & Planetary Forecast"}
              </h3>
              <span className="hidden md:inline-block px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-mono font-bold rounded-md">
                {isNe ? "सूर्यसिद्धान्त" : "Surya-Siddhanta"}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 font-mono">
              {isNe
                ? "लाहिडी अयनांश तथा पारम्परिक दृक्-पद्धतिमा आधारित १२ राशिको भविष्यफल"
                : "12 Signs decoded through authentic Lahiri Ayanamsha and Drik-Ganita transits"}
            </p>
          </div>
        </div>

        {/* Segmented Period Toggle (Daily / Weekly / Yearly) */}
        <div className="inline-flex p-1 bg-stone-200/60 border border-stone-300/70 rounded-md self-start sm:self-auto">
          <button
            onClick={() => setActivePeriod("daily")}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono font-bold rounded-md transition-all ${
              activePeriod === "daily"
                ? "bg-[#D95B16] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/40"
            }`}
          >
            {isNe ? "दैनिक (Daily)" : "Daily"}
          </button>
          <button
            onClick={() => setActivePeriod("weekly")}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
              activePeriod === "weekly"
                ? "bg-[#D95B16] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/40"
            }`}
          >
            {isNe ? "साप्ताहिक (Weekly)" : "Weekly"}
          </button>
          <button
            onClick={() => setActivePeriod("yearly")}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
              activePeriod === "yearly"
                ? "bg-[#D95B16] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900 hover:bg-stone-200/40"
            }`}
          >
            {isNe ? "वार्षिक (Yearly)" : "Yearly"}
          </button>
        </div>
      </div>

      {/* 2. Interactive 12 Zodiac Sign Strip */}
      <div className="p-3 sm:p-4 bg-stone-50/70 border-b border-stone-200/80">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">
          {RASHI_DATA.map((r, idx) => {
            const isSelected = selectedRashiIdx === idx;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRashiIdx(idx)}
                className={`p-2 sm:py-2.5 text-center transition-all border flex flex-col items-center justify-center gap-0.5 rounded-xl relative group ${
                  isSelected
                    ? "bg-[#181411] text-white border-[#181411] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/80 hover:border-[#D95B16] hover:bg-amber-50/30"
                }`}
              >
                <span className={`text-base sm:text-lg font-serif leading-none ${
                  isSelected ? "text-amber-400" : "text-[#D95B16] group-hover:scale-110 transition-transform"
                }`}>
                  {r.glyph}
                </span>
                <span className="text-[11px] sm:text-xs font-bold font-serif leading-tight">
                  {isNe ? r.neName : r.enName}
                </span>
                <span className={`text-[9px] font-mono leading-none ${
                  isSelected ? "text-stone-300" : "text-stone-600"
                }`}>
                  {isNe ? r.enName.slice(0, 3) : r.neName}
                </span>

                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#181411] rotate-45" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Eye-Pleasing Content Card for Selected Rashi */}
      <div className="p-5 sm:p-7 lg:p-8 bg-white">
        
        {/* Sign Header & Meta Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-lg text-[#D95B16] flex items-center justify-center text-3xl font-serif shrink-0 shadow-2xs">
              {rashi.glyph}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 tracking-tight">
                  {isNe ? `${rashi.neName} राशि (${rashi.enName})` : `${rashi.enName} (${rashi.neName})`}
                </h2>
                <span className="px-2.5 py-0.5 bg-orange-50 text-[#D95B16] border border-orange-200 text-xs font-mono font-bold rounded-md">
                  {isNe ? `स्वामी: ${rashi.lordNe}` : `Lord: ${rashi.lordEn}`}
                </span>
                <span className="px-2.5 py-0.5 bg-stone-100 text-stone-700 border border-stone-200 text-xs font-mono rounded-md">
                  {isNe ? `तत्व: ${rashi.elementNe}` : `Element: ${rashi.elementEn}`}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono mt-1">
                {activePeriod === "daily" && (isNe ? "दैनिक गोचर तथा अनुकूलता" : "Daily Planetary Transits & Auspicious Alignment")}
                {activePeriod === "weekly" && (isNe ? "साप्ताहिक कार्य, सम्बन्ध तथा स्वास्थ्य" : "Weekly Career, Relationship & Health Forecast")}
                {activePeriod === "yearly" && (isNe ? "वार्षिक गुरु तथा शनिको प्रभाव (२०८२/२०८३)" : "Annual Jupiter & Saturn Impact (2026/2082)")}
              </p>
            </div>
          </div>

          {/* Quick Metrics (Lucky Num / Color / Direction / Luck Rate) */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap bg-[#FAF7F2] p-3 border border-stone-200/70 rounded-md">
            <div className="text-center px-2">
              <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                {isNe ? "शुभ अंक" : "Lucky No"}
              </span>
              <span className="text-sm font-mono font-bold text-stone-900">{rashi.luckyNum}</span>
            </div>
            <div className="h-6 w-px bg-stone-300" />
            <div className="text-center px-2">
              <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                {isNe ? "शुभ रङ्ग" : "Lucky Color"}
              </span>
              <span className="text-xs font-serif font-bold text-stone-900">
                {isNe ? rashi.luckyColorNe.split(" ")[0] : rashi.luckyColorEn.split(" ")[0]}
              </span>
            </div>
            <div className="h-6 w-px bg-stone-300" />
            <div className="text-center px-2">
              <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                {isNe ? "शुभ दिशा" : "Lucky Dir"}
              </span>
              <span className="text-xs font-mono font-bold text-stone-900">
                {isNe ? rashi.luckyDirNe.split(" ")[0] : rashi.luckyDirEn}
              </span>
            </div>
            <div className="h-6 w-px bg-stone-300" />
            <div className="text-center px-2">
              <span className="block text-[10px] font-mono uppercase text-stone-600 font-bold">
                {isNe ? "भाग्य प्रतिशत" : "Luck Meter"}
              </span>
              <span className="text-sm font-mono font-black text-[#D95B16]">{rashi.daily.luck}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Period View */}
        <div className="mt-6">
          
          {/* ========================================================================= */}
          {/* A. DAILY VIEW                                                            */}
          {/* ========================================================================= */}
          {activePeriod === "daily" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#FAF7F2] p-5 sm:p-6 border border-stone-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-[#D95B16] font-bold text-xs font-mono uppercase tracking-wider">
                  <IconSun className="w-4 h-4" />
                  <span>{isNe ? "आजको मुख्य भविष्यवाणी (Daily Reading)" : "Today's Core Reading"}</span>
                </div>
                <p className="text-base sm:text-lg font-serif text-stone-900 leading-relaxed font-normal">
                  {isNe ? rashi.daily.overviewNe : rashi.daily.overviewEn}
                </p>

                {/* Progress bar for luck */}
                <div className="mt-4 pt-4 border-t border-stone-200/80 flex items-center gap-3">
                  <span className="text-xs font-mono text-stone-500 font-bold shrink-0">
                    {isNe ? "उर्जा स्तर:" : "Energy:"} <strong className="text-stone-800">{isNe ? rashi.daily.energyNe : rashi.daily.energyEn}</strong>
                  </span>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-[#D95B16] h-full transition-all duration-500"
                      style={{ width: `${rashi.daily.luckPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D95B16] shrink-0">
                    {rashi.daily.luck}
                  </span>
                </div>
              </div>

              {/* Vedic Remedy (सात्विक उपाय) */}
              <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-start gap-3.5">
                <IconSparkles className="w-5 h-5 text-[#D95B16] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-[#D95B16] tracking-wider">
                    {isNe ? "आजको सात्विक वैदिक उपाय (Remedy of the Day)" : "Auspicious Vedic Remedy of the Day"}
                  </h4>
                  <p className="text-sm font-sans text-stone-800 mt-1 font-medium leading-relaxed">
                    {isNe ? rashi.daily.adviceNe : rashi.daily.adviceEn}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* B. WEEKLY VIEW                                                           */}
          {/* ========================================================================= */}
          {activePeriod === "weekly" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Career & Finance */}
                <div className="p-5 bg-[#FAF7F2] border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <IconBriefcase className="w-4 h-4 text-[#D95B16]" />
                    <span>{isNe ? "कार्य तथा आर्थिक" : "Career & Wealth"}</span>
                  </div>
                  <p className="text-sm font-serif text-stone-900 leading-relaxed">
                    {isNe ? rashi.weekly.careerNe : rashi.weekly.careerEn}
                  </p>
                </div>

                {/* Love & Relationships */}
                <div className="p-5 bg-[#FAF7F2] border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <IconHeart className="w-4 h-4 text-[#D95B16]" />
                    <span>{isNe ? "परिवार तथा सम्बन्ध" : "Love & Harmony"}</span>
                  </div>
                  <p className="text-sm font-serif text-stone-900 leading-relaxed">
                    {isNe ? rashi.weekly.loveNe : rashi.weekly.loveEn}
                  </p>
                </div>

                {/* Health & Vitality */}
                <div className="p-5 bg-[#FAF7F2] border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <IconActivity className="w-4 h-4 text-[#D95B16]" />
                    <span>{isNe ? "स्वास्थ्य तथा उर्जा" : "Health & Vitality"}</span>
                  </div>
                  <p className="text-sm font-serif text-stone-900 leading-relaxed">
                    {isNe ? rashi.weekly.healthNe : rashi.weekly.healthEn}
                  </p>
                </div>
              </div>

              {/* Best Days Bar */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-stone-700">
                  <IconCalendar className="w-4 h-4 text-[#D95B16]" />
                  <span className="font-bold">{isNe ? "साताको उत्तम शुभ बारहरू:" : "Most Auspicious Days of the Week:"}</span>
                  <span className="text-[#D95B16] font-bold text-sm">
                    {isNe ? rashi.weekly.bestDaysNe : rashi.weekly.bestDaysEn}
                  </span>
                </div>
                <span className="text-stone-500">
                  {isNe ? "महत्वपूर्ण सम्झौता र यात्राका लागि उत्तम" : "Ideal for major signatures & journeys"}
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* C. YEARLY VIEW                                                           */}
          {/* ========================================================================= */}
          {activePeriod === "yearly" && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-5 sm:p-6 bg-[#181411] text-white rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
                  <IconAward className="w-4 h-4" />
                  <span>{isNe ? rashi.yearly.yearNe : rashi.yearly.yearEn}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                  {isNe ? rashi.yearly.summaryNe : rashi.yearly.summaryEn}
                </h3>
                <div className="pt-3 border-t border-stone-800 text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
                  <span className="text-amber-400 font-bold font-mono">
                    {isNe ? "प्रमुख ग्रह गोचर प्रभाव: " : "Core Planetary Influences: "}
                  </span>
                  {isNe ? rashi.yearly.transitsNe : rashi.yearly.transitsEn}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF7F2] border border-stone-200 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block mb-1">
                    {isNe ? "विशेष फलदायी महिनाहरू" : "MOST FAVORABLE MONTHS"}
                  </span>
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    {isNe ? rashi.yearly.favorableNe : rashi.yearly.favorableEn}
                  </h4>
                  <p className="text-xs text-stone-500 font-mono mt-1">
                    {isNe ? "नयाँ कार्य, विवाह र लगानीका लागि उत्तम" : "Peak celestial support for major investments"}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-[#D95B16] font-bold block mb-1">
                    {isNe ? "वार्षिक सात्विक अनुष्ठान तथा उपाय" : "ANNUAL SACRED VEDIC PROTOCOL"}
                  </span>
                  <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                    {isNe ? rashi.yearly.annualRemedyNe : rashi.yearly.annualRemedyEn}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans mt-1">
                    {isNe ? "वर्षभर ग्रह शान्ति र आत्मरक्षाका लागि" : "For perpetual year-round harmony & vitality"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Callout & Direct Consultation Link */}
          <div className="mt-7 pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-sans">
              <IconShield className="w-4 h-4 text-[#D95B16] shrink-0" />
              <span>
                {isNe
                  ? "राशिफल सामान्य गोचरमा आधारित हो। व्यक्तिगत जन्म समय र विंशोत्तरी दशाका लागि कुण्डली विश्लेषण आवश्यक हुन्छ।"
                  : "General transits offer broad trends. Complete accuracy requires natal chart analysis with exact birth coordinates."}
              </span>
            </div>

            <button
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry(
                    isNe
                      ? `${rashi.neName} राशि: विस्तृत कुण्डली तथा दशा विश्लेषण`
                      : `${rashi.enName} Sign: Natal Chart & Dasha Analysis`
                  );
                }
              }}
              className="px-5 py-2.5 bg-[#D95B16] hover:bg-[#B8480C] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl shadow-xs transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>{isNe ? "व्यक्तिगत कुण्डली परामर्श लिनुहोस्" : "Book Natal Consultation"}</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
