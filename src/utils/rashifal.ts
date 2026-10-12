// Daily rashifal from the Moon's transit (Chandra gochar): the house the Moon
// occupies counted from the native's rashi. Classical texts (e.g. Phaladeepika
// ch. 26) treat the Moon as favourable in houses 1, 3, 6, 7, 10 and 11.

export interface GocharResult {
  /** House of the transiting Moon counted from the rashi, 1-12. */
  house: number;
  favourable: boolean;
  /** Rough 0-100 indicator derived from the classical result. */
  score: number;
  ne: string;
  en: string;
  energyNe: string;
  energyEn: string;
}

const HOUSE_RESULTS: Omit<GocharResult, "house">[] = [
  { favourable: true, score: 75, energyNe: "शान्त र सन्तुलित", energyEn: "Calm & balanced",
    ne: "चन्द्रमा तपाईंकै राशिमा छन्। मन प्रसन्न रहने, भोजन र आरामको सुख मिल्ने तथा परिवारसँग राम्रो समय बित्ने योग छ।",
    en: "The Moon transits your own sign. Expect a settled mind, good food and rest, and pleasant time with family." },
  { favourable: false, score: 45, energyNe: "सावधानीपूर्ण", energyEn: "Cautious",
    ne: "धन खर्च हुने र बोलीका कारण गलतफहमी हुन सक्ने समय। आर्थिक निर्णय र वादविवादमा संयम राख्नुहोस्।",
    en: "Money may slip away and words can be misread. Be careful with spending and avoid arguments." },
  { favourable: true, score: 85, energyNe: "उत्साहजनक", energyEn: "Energetic",
    ne: "पराक्रम र आत्मविश्वास बढ्ने दिन। सुरु गरेका काममा सफलता र भाइबहिनी तथा साथीहरूको सहयोग मिल्नेछ।",
    en: "Courage and confidence rise. Efforts succeed, with support from siblings and friends." },
  { favourable: false, score: 40, energyNe: "मध्यम", energyEn: "Unsettled",
    ne: "मनमा चिन्ता र घरायसी असन्तुष्टि हुन सक्छ। यात्रा र सवारीमा सावधानी अपनाउनुहोस्।",
    en: "Some worry and unease at home. Take care while travelling or driving." },
  { favourable: false, score: 45, energyNe: "मध्यम", energyEn: "Strained",
    ne: "योजनामा अवरोध र मानसिक थकान हुन सक्छ। सन्तान वा अध्ययनसम्बन्धी चिन्ता रहन सक्छ; ठूला निर्णय पछि सार्नुहोस्।",
    en: "Plans may meet obstacles and the mind tires easily. Defer big decisions." },
  { favourable: true, score: 85, energyNe: "विजयी", energyEn: "Victorious",
    ne: "विरोधी कमजोर हुने, स्वास्थ्यमा सुधार आउने र रोकिएका काम पूरा हुने शुभ समय।",
    en: "Opponents weaken, health improves and pending work gets done." },
  { favourable: true, score: 80, energyNe: "मधुर", energyEn: "Harmonious",
    ne: "साझेदारी र दाम्पत्य सम्बन्धमा मधुरता, सम्मान र लाभ। भेटघाट र सम्झौताका लागि अनुकूल।",
    en: "Warmth in partnerships and marriage, with respect and gains. Good for meetings and agreements." },
  { favourable: false, score: 35, energyNe: "कमजोर", energyEn: "Low",
    ne: "स्वास्थ्य र अचानक आउने खर्चमा सावधानी चाहिने दिन। जोखिमपूर्ण काम र ठूलो लगानी टार्नुहोस्।",
    en: "Watch your health and unexpected costs. Avoid risky ventures and large investments." },
  { favourable: false, score: 45, energyNe: "सुस्त", energyEn: "Sluggish",
    ne: "भाग्यले पूर्ण साथ नदिने, थकान र काममा ढिलाइ हुन सक्ने समय। धैर्य राख्नुहोस्।",
    en: "Luck is lukewarm; expect fatigue and delays. Patience pays." },
  { favourable: true, score: 90, energyNe: "प्रगतिशील", energyEn: "Rising",
    ne: "कार्यक्षेत्रमा सफलता, पद-प्रतिष्ठा र नयाँ जिम्मेवारी मिल्ने योग। महत्वपूर्ण काम आजै सम्पन्न गर्नुहोस्।",
    en: "Success at work, recognition and new responsibility. Push important tasks forward today." },
  { favourable: true, score: 90, energyNe: "लाभदायक", energyEn: "Rewarding",
    ne: "आम्दानी र इच्छापूर्तिको योग। मित्र तथा ठूला व्यक्तिहरूबाट लाभ मिल्नेछ।",
    en: "Gains and wishes fulfilled. Friends and elders bring benefit." },
  { favourable: false, score: 40, energyNe: "खर्चिलो", energyEn: "Draining",
    ne: "खर्च बढ्ने र निद्रा कम हुने समय। लगानी र उधारो दिनेमा सावधानी अपनाउनुहोस्।",
    en: "Expenses rise and sleep may suffer. Be careful with lending and investments." },
];

/** rashiIndex and moonSignIndex are 0 = Mesha … 11 = Meena. */
export function getChandraGochar(rashiIndex: number, moonSignIndex: number): GocharResult {
  const house = ((moonSignIndex - rashiIndex + 12) % 12) + 1;
  return { house, ...HOUSE_RESULTS[house - 1] };
}
