/**
 * Transit (gochar) results for weekly and yearly rashifal, counted from the
 * native's Moon sign. Favourable houses follow the classical rules
 * (Phaladeepika ch. 26): Jupiter 2/5/7/9/11; Saturn, Rahu, Ketu and Mars
 * 3/6/11; Sun 3/6/10/11.
 */
import { julianDay, siderealGraha, type Graha } from "./ephemeris";

export const houseFrom = (rashi: number, sign: number) => ((sign - rashi + 12) % 12) + 1;

const GOOD: Record<string, number[]> = {
  Jupiter: [2, 5, 7, 9, 11],
  Saturn: [3, 6, 11],
  Rahu: [3, 6, 11],
  Ketu: [3, 6, 11],
  Mars: [3, 6, 11],
  Sun: [3, 6, 10, 11],
};

export const isFavourable = (graha: string, house: number) => GOOD[graha]?.includes(house) ?? false;

type Text = { ne: string; en: string };

export const JUPITER_TEXT: Text[] = [
  { ne: "गुरु जन्म राशिमा: खर्च र स्थान परिवर्तनको योग, धैर्यपूर्वक निर्णय गर्नुहोस्।", en: "Jupiter over your Moon sign: expenses and changes of place; decide patiently." },
  { ne: "धन, परिवार र वाणीमा सुधार; आम्दानी बढ्ने वर्ष।", en: "Growth in wealth, family harmony and speech; income improves." },
  { ne: "कामको चाप र अवरोध; साना यात्रामा सावधानी।", en: "Pressure and hurdles at work; take care on short journeys." },
  { ne: "घरायसी चिन्ता र सम्पत्ति विवादको सम्भावना।", en: "Domestic worries and possible property disputes." },
  { ne: "सन्तान, अध्ययन र बुद्धिमा शुभ; नयाँ योजना फलदायी।", en: "Auspicious for children, study and judgement; new plans bear fruit." },
  { ne: "रोग, ऋण र विरोधमा सावधानी चाहिने समय।", en: "Watch health, debts and opponents." },
  { ne: "विवाह, साझेदारी र सामाजिक सम्मानमा शुभ।", en: "Favourable for marriage, partnerships and social standing." },
  { ne: "स्वास्थ्य र अचानक बाधामा सचेत रहनुहोस्।", en: "Stay alert to health and sudden setbacks." },
  { ne: "भाग्य, धर्म र गुरुजनको आशीर्वाद; तीर्थयात्राको योग।", en: "Fortune, dharma and blessings of elders; pilgrimage likely." },
  { ne: "कार्यक्षेत्रमा परिवर्तन र जिम्मेवारी; पद टिकाउन मेहनत।", en: "Changes and responsibility at work; effort needed to hold position." },
  { ne: "लाभ, इच्छापूर्ति र मित्रहरूको साथ; अत्यन्त शुभ।", en: "Gains, wishes fulfilled and support of friends; very favourable." },
  { ne: "खर्च, विदेश यात्रा र आध्यात्मिक झुकाव।", en: "Expenses, foreign travel and a spiritual turn." },
];

export const SATURN_TEXT: Text[] = [
  { ne: "साढेसाती (मध्य चरण): मानसिक र शारीरिक थकान; धैर्य र अनुशासन राख्नुहोस्।", en: "Sade Sati (peak): mental and physical strain; keep patience and discipline." },
  { ne: "साढेसाती (अन्तिम चरण): आर्थिक र पारिवारिक सावधानी।", en: "Sade Sati (final phase): be careful with money and family matters." },
  { ne: "शनि शुभ: परिश्रमको फल, साहस र विजय।", en: "Saturn favourable: hard work pays off, courage and success." },
  { ne: "अर्धाष्टम शनि: घर, सवारी र मनको शान्तिमा अवरोध।", en: "Ardhashtama Shani: obstacles at home, with vehicles and peace of mind." },
  { ne: "सन्तान र अध्ययनमा ढिलाइ; लगानीमा सतर्कता।", en: "Delays with children or study; caution with investments." },
  { ne: "शनि शुभ: रोग र शत्रुमाथि विजय, ऋण मुक्ति।", en: "Saturn favourable: overcome illness and opponents, clear debts." },
  { ne: "साझेदारी र दाम्पत्यमा तनाव; सम्झौता गर्दा सावधानी।", en: "Strain in partnerships and marriage; be careful with agreements." },
  { ne: "अष्टम शनि: स्वास्थ्य, दुर्घटना र अचानक हानिमा विशेष सावधानी।", en: "Ashtama Shani: take special care with health, accidents and sudden losses." },
  { ne: "भाग्यमा ढिलाइ र पिता/गुरुसँग मतभेदको सम्भावना।", en: "Luck slows; possible friction with father or teachers." },
  { ne: "कामको भार बढ्ने तर स्थायित्व आउने।", en: "Heavier workload, but stability follows." },
  { ne: "शनि शुभ: आम्दानी र दीर्घकालीन लाभ।", en: "Saturn favourable: income and lasting gains." },
  { ne: "साढेसाती (प्रथम चरण): खर्च, निद्रा र यात्रामा सावधानी।", en: "Sade Sati (first phase): watch expenses, sleep and travel." },
];

export const RAHU_TEXT: Text[] = [
  { ne: "भ्रम र अस्थिरता; स्वास्थ्यमा ध्यान दिनुहोस्।", en: "Confusion and restlessness; mind your health." },
  { ne: "वाणी र पारिवारिक धनमा सावधानी।", en: "Be careful with words and family finances." },
  { ne: "राहु शुभ: साहस, नयाँ अवसर र सफलता।", en: "Rahu favourable: courage, new openings and success." },
  { ne: "घरायसी अशान्ति र मातृ पक्षको चिन्ता।", en: "Unrest at home; concern for mother." },
  { ne: "निर्णयमा भ्रम; सट्टा र जोखिमबाट टाढा रहनुहोस्।", en: "Unclear judgement; avoid speculation and risk." },
  { ne: "राहु शुभ: प्रतिस्पर्धामा विजय र रोगमुक्ति।", en: "Rahu favourable: win competitions, recover health." },
  { ne: "साझेदारीमा गलतफहमी र धोकाको सम्भावना।", en: "Misunderstanding or deceit possible in partnerships." },
  { ne: "अचानक घटना र गोप्य शत्रुबाट सावधान।", en: "Beware sudden events and hidden opponents." },
  { ne: "धार्मिक कार्य र भाग्यमा अवरोध।", en: "Hurdles in religious work and luck." },
  { ne: "कार्यक्षेत्रमा अचानक परिवर्तन।", en: "Sudden changes at work." },
  { ne: "राहु शुभ: अप्रत्याशित लाभ र सम्पर्क विस्तार।", en: "Rahu favourable: unexpected gains and wider network." },
  { ne: "विदेश सम्बन्ध, खर्च र निद्रामा असर।", en: "Foreign links, expenses and disturbed sleep." },
];

export const SUN_TEXT: Text[] = [
  { ne: "थकान र अहंकारको टकराव", en: "fatigue and clashes of ego" },
  { ne: "धनमा खर्च र आँखाको ख्याल", en: "spending and eye strain" },
  { ne: "साहस र सफलता", en: "courage and success" },
  { ne: "घरायसी असन्तोष", en: "unease at home" },
  { ne: "मानसिक तनाव", en: "mental strain" },
  { ne: "शत्रुमाथि विजय र स्वास्थ्य सुधार", en: "victory over rivals and better health" },
  { ne: "यात्रा र साझेदारीमा थकान", en: "tiring travel and partnerships" },
  { ne: "स्वास्थ्यमा सावधानी", en: "care with health" },
  { ne: "पिता/गुरुसँग मतभेद", en: "friction with father or teachers" },
  { ne: "पद-प्रतिष्ठा र कार्यमा सफलता", en: "recognition and success at work" },
  { ne: "लाभ र सम्मान", en: "gains and honour" },
  { ne: "खर्च र यात्रा", en: "expenses and travel" },
];

export interface TransitPosition {
  graha: Graha;
  sign: number;
  house: number;
  retrograde: boolean;
  favourable: boolean;
}

export function transitsFor(rashi: number, date: Date, grahas: Graha[]): TransitPosition[] {
  const jd = julianDay(date);
  return grahas.map((g) => {
    const { lon, retrograde } = siderealGraha(g, jd);
    const sign = Math.floor(lon / 30);
    const house = houseFrom(rashi, sign);
    return { graha: g, sign, house, retrograde, favourable: isFavourable(g, house) };
  });
}

/** Next date (daily resolution) after `from` when `graha` changes sign, within `maxDays`. */
export function nextSignChange(graha: Graha, from: Date, maxDays = 800): { date: Date; sign: number } | null {
  const sign0 = Math.floor(siderealGraha(graha, julianDay(from)).lon / 30);
  for (let i = 1; i <= maxDays; i++) {
    const d = new Date(from.getTime() + i * 86400000);
    const sign = Math.floor(siderealGraha(graha, julianDay(d)).lon / 30);
    if (sign !== sign0) return { date: d, sign };
  }
  return null;
}
