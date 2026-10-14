/**
 * Written daily rashifal for each Moon sign, composed from the day's actual
 * transits (sidereal, Lahiri):
 *   overall  ← Moon's house from the rashi (Chandra gochar)
 *   career   ← Sun and Moon
 *   money    ← Moon and Jupiter
 *   love     ← Venus
 *   health   ← Mars and Moon
 * Several phrasings per tone, picked deterministically by date and sign, so the
 * same day always reads the same but consecutive days differ.
 */
import { getChandraGochar } from "./rashifal";
import { houseFrom, isFavourable } from "./gochar";
import { julianDay, siderealGraha, type Graha } from "./ephemeris";

type Tone = "good" | "mixed" | "caution";
type Bank = Record<Tone, { ne: string; en: string }[]>;

const CAREER: Bank = {
  good: [
    { ne: "कामकाजमा प्रगति हुनेछ र वरिष्ठहरूको साथ पाइनेछ।", en: "Work moves ahead and seniors back you." },
    { ne: "रोकिएका काम अघि बढ्ने र नयाँ जिम्मेवारी पाउने योग छ।", en: "Stalled work restarts and new responsibility may come your way." },
    { ne: "मेहनतको कदर हुनेछ; महत्वपूर्ण भेटघाट सफल रहनेछ।", en: "Your effort is noticed and key meetings go well." },
  ],
  mixed: [
    { ne: "काम सामान्य गतिमा चल्नेछ; योजनाअनुसार अघि बढ्नु उचित हुन्छ।", en: "Work runs at a steady pace; stick to the plan." },
    { ne: "सहकर्मीसँग समन्वय राखे काम सहज हुनेछ।", en: "Coordinating with colleagues keeps things smooth." },
    { ne: "धैर्य राखे दिनको अन्त्यसम्म अपेक्षित नतिजा आउनेछ।", en: "With patience, results arrive by the end of the day." },
  ],
  caution: [
    { ne: "कार्यस्थलमा विवादबाट टाढा रहनुहोस्; ठूला निर्णय पछि सार्नुहोस्।", en: "Avoid disputes at work and put off big decisions." },
    { ne: "कामको चाप बढ्न सक्छ; प्राथमिकता तय गरेर अघि बढ्नुहोस्।", en: "Workload may rise; set priorities and pace yourself." },
    { ne: "कागजपत्र र सम्झौता ध्यान दिएर पढ्नुहोस्।", en: "Read papers and agreements carefully." },
  ],
};

const MONEY: Bank = {
  good: [
    { ne: "आम्दानीका नयाँ स्रोत खुल्ने र अड्किएको रकम फिर्ता आउने सम्भावना छ।", en: "New income may open up and money owed could return." },
    { ne: "आर्थिक पक्ष बलियो रहनेछ; सोचेको खरिद सम्भव छ।", en: "Finances are firm; a planned purchase is possible." },
    { ne: "लगानीबाट लाभको संकेत छ।", en: "Investments show signs of gain." },
  ],
  mixed: [
    { ne: "आय र खर्च सन्तुलित रहनेछ।", en: "Income and spending stay balanced." },
    { ne: "अनावश्यक खर्च घटाए बचत गर्न सकिन्छ।", en: "Cutting needless spending helps you save." },
    { ne: "आर्थिक कारोबारमा सामान्य दिन।", en: "An ordinary day for money matters." },
  ],
  caution: [
    { ne: "अचानक खर्च आउन सक्छ; उधारो दिन-लिनमा सावधानी।", en: "Unexpected costs may arise; be careful lending or borrowing." },
    { ne: "जोखिमपूर्ण लगानी र सट्टाबाट टाढा रहनुहोस्।", en: "Stay away from risky investments and speculation." },
    { ne: "खर्च नियन्त्रणमा राख्नुहोस्।", en: "Keep spending in check." },
  ],
};

const LOVE: Bank = {
  good: [
    { ne: "परिवार र प्रियजनसँग रमाइलो समय बित्नेछ।", en: "Pleasant time with family and loved ones." },
    { ne: "दाम्पत्य जीवनमा मिठास र आपसी समझदारी बढ्नेछ।", en: "Warmth and understanding grow in your relationship." },
    { ne: "पुराना साथीसँग भेट हुने र सम्बन्ध सुमधुर हुने योग।", en: "You may meet old friends; relationships feel easy." },
  ],
  mixed: [
    { ne: "सम्बन्धमा सामान्य अवस्था; एकअर्काको कुरा सुन्नु राम्रो।", en: "Relationships are steady; listening helps." },
    { ne: "घरायसी काममा समय दिनुपर्ने हुन सक्छ।", en: "Home matters may need your time." },
    { ne: "परिवारका सदस्यसँग सल्लाह गरेर निर्णय लिनुहोस्।", en: "Decide after talking it over with family." },
  ],
  caution: [
    { ne: "बोलीमा संयम राख्नुहोस्; सानो कुरामा मनमुटाव हुन सक्छ।", en: "Mind your words; small things could cause friction." },
    { ne: "जीवनसाथीसँग गलतफहमी हुन नदिनुहोस्।", en: "Don't let misunderstandings grow with your partner." },
    { ne: "भावनामा बगेर निर्णय नलिनुहोस्।", en: "Avoid decisions made in the heat of emotion." },
  ],
};

const HEALTH: Bank = {
  good: [
    { ne: "स्वास्थ्य राम्रो रहनेछ र ऊर्जा उच्च हुनेछ।", en: "Good health and plenty of energy." },
    { ne: "शारीरिक र मानसिक रूपमा स्फूर्ति महसुस गर्नुहुनेछ।", en: "You'll feel fresh in body and mind." },
    { ne: "पुराना स्वास्थ्य समस्यामा सुधार आउनेछ।", en: "Old health complaints ease." },
  ],
  mixed: [
    { ne: "स्वास्थ्य सामान्य रहनेछ; नियमित दिनचर्या पालना गर्नुहोस्।", en: "Health is fine; keep a regular routine." },
    { ne: "पर्याप्त पानी र आराम आवश्यक छ।", en: "Drink enough water and rest well." },
    { ne: "हल्का व्यायामले दिन ताजा बनाउनेछ।", en: "Light exercise will freshen the day." },
  ],
  caution: [
    { ne: "थकान र टाउको दुखाइ हुन सक्छ; खानपानमा ध्यान दिनुहोस्।", en: "Fatigue or headaches possible; watch what you eat." },
    { ne: "सवारी चलाउँदा र हतारमा काम गर्दा सावधानी अपनाउनुहोस्।", en: "Take care when driving or rushing." },
    { ne: "निद्रा पूरा गर्नुहोस्; तनाव कम गर्नुहोस्।", en: "Get enough sleep and ease stress." },
  ],
};

/** Traditional colour of the weekday (Sunday first). */
const DAY_COLOUR = [
  { ne: "रातो", en: "Red" },
  { ne: "सेतो", en: "White" },
  { ne: "रातो", en: "Red" },
  { ne: "हरियो", en: "Green" },
  { ne: "पहेंलो", en: "Yellow" },
  { ne: "सेतो", en: "White" },
  { ne: "नीलो", en: "Blue" },
];

// Venus is classically favourable in these houses from the Moon sign.
const VENUS_GOOD = [1, 2, 3, 4, 5, 8, 9, 11, 12];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const pick = (bank: Bank, tone: Tone, seed: number) => bank[tone][seed % bank[tone].length];

export interface DailyReading {
  moonSign: number;
  moonHouse: number;
  overall: { ne: string; en: string };
  career: { ne: string; en: string; tone: Tone };
  money: { ne: string; en: string; tone: Tone };
  love: { ne: string; en: string; tone: Tone };
  health: { ne: string; en: string; tone: Tone };
  /** 1-5 */
  stars: number;
  luckyColour: { ne: string; en: string };
}

/**
 * Reading for `rashi` (0 = Mesha) on the civil day containing `date`.
 * Positions are taken at 06:00 of that day in the visitor's clock, i.e. around sunrise.
 */
export function dailyReading(rashi: number, date: Date): DailyReading {
  const at = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6);
  const jd = julianDay(at);
  const sign = (g: Graha) => Math.floor(siderealGraha(g, jd).lon / 30);
  const moonSign = sign("Moon");
  const gochar = getChandraGochar(rashi, moonSign);
  const mh = gochar.house;
  const house = (g: Graha) => houseFrom(rashi, sign(g));

  const careerGood = Number(isFavourable("Sun", house("Sun"))) + Number([3, 6, 10, 11].includes(mh));
  const career: Tone = careerGood === 2 ? "good" : careerGood === 1 ? "mixed" : "caution";
  const money: Tone =
    [2, 11].includes(mh) || (isFavourable("Jupiter", house("Jupiter")) && ![8, 12].includes(mh))
      ? "good"
      : [8, 12].includes(mh)
        ? "caution"
        : "mixed";
  const love: Tone = VENUS_GOOD.includes(house("Venus")) ? "good" : [6, 8].includes(mh) ? "caution" : "mixed";
  const marsHouse = house("Mars");
  const health: Tone =
    isFavourable("Mars", marsHouse) || mh === 6 ? "good" : [1, 8].includes(marsHouse) || [8, 12].includes(mh) ? "caution" : "mixed";

  const key = `${at.getFullYear()}-${at.getMonth()}-${at.getDate()}-${rashi}`;
  const seed = hash(key);
  const points = (t: Tone) => (t === "good" ? 2 : t === "mixed" ? 1 : 0);
  const total = (gochar.favourable ? 4 : 1) + points(career) + points(money) + points(love) + points(health); // 1..12
  const stars = Math.max(1, Math.min(5, Math.round((total / 12) * 5)));

  return {
    moonSign,
    moonHouse: mh,
    overall: { ne: gochar.ne, en: gochar.en },
    career: { ...pick(CAREER, career, seed), tone: career },
    money: { ...pick(MONEY, money, seed >>> 3), tone: money },
    love: { ...pick(LOVE, love, seed >>> 6), tone: love },
    health: { ...pick(HEALTH, health, seed >>> 9), tone: health },
    stars,
    luckyColour: DAY_COLOUR[at.getDay()],
  };
}
