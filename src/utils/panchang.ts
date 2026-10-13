/**
 * Daily panchang for a civil date at a location, built on ./ephemeris.
 * Udaya (sunrise) convention: the tithi, nakshatra etc. "of the day" are the
 * ones prevailing at local sunrise; end times say when each one changes.
 */
import {
  DAY_MS, elongation, julianDay, jdToDate, localMidnight, nextBoundary, prevBoundary, riseSet,
  siderealMoon, sunLongitude, toSidereal, yogaAngle,
} from "./ephemeris";

export const TITHI_NE = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी",
  "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा",
];
export const TITHI_EN = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
  "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
];
export const NAKSHATRA_EN = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati",
];
export const NAKSHATRA_NE = [
  "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा",
  "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा",
  "मूल", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वभाद्रपद", "उत्तरभाद्रपद", "रेवती",
];
export const YOGA_EN = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula",
  "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan",
  "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti",
];
export const YOGA_NE = [
  "विष्कम्भ", "प्रीति", "आयुष्मान्", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्मा", "धृति", "शूल",
  "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि", "व्यतीपात", "वरीयान्",
  "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "ऐन्द्र", "वैधृति",
];
const KARANA_EN = ["Kimstughna", "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga"];
const KARANA_NE = ["किंस्तुघ्न", "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि", "शकुनि", "चतुष्पद", "नाग"];
export const LUNAR_MONTH_EN = ["Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", "Ashwin", "Kartik", "Margashirsha", "Poush", "Magh", "Phalguna"];
export const LUNAR_MONTH_NE = ["चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन"];
export const RASHI_EN = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"];
export const RASHI_NE = ["मेष", "वृष", "मिथुन", "कर्कट", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन"];

/** Tithi number 1-30 (1-15 Shukla, 16-30 Krishna; 30 = Amavasya) at an instant. */
export function tithiAt(jd: number): number {
  return Math.floor(elongation(jd) / 12) + 1;
}

export function tithiName(tithi: number, lang: "ne" | "en") {
  if (tithi === 30) return lang === "ne" ? "औंसी" : "Amavasya";
  const i = (tithi - 1) % 15;
  if (i === 14) return lang === "ne" ? TITHI_NE[14] : TITHI_EN[14];
  return lang === "ne" ? TITHI_NE[i] : TITHI_EN[i];
}

export const pakshaOf = (tithi: number) => (tithi <= 15 ? "shukla" : "krishna") as "shukla" | "krishna";

function karanaIndex(jd: number) {
  const k = Math.floor(elongation(jd) / 6); // 0..59
  if (k === 0) return 0;
  if (k >= 57) return k - 57 + 8;
  return ((k - 1) % 7) + 1;
}

export interface LunarMonth {
  /** Amanta month (new moon to new moon), 0 = Chaitra. */
  amanta: number;
  /** Purnimanta month as used in Nepali calendars for naming. */
  purnimanta: number;
  adhik: boolean;
  newMoonStart: number;
  newMoonEnd: number;
}

const newMoonCache = new Map<number, LunarMonth>();

/** Lunar month containing instant `jd`, named by the Sun's sidereal sign at its starting new moon. */
export function lunarMonthAt(jd: number, tithi = tithiAt(jd)): LunarMonth {
  const start = prevBoundary(elongation, jd, 360, 12.19);
  const key = Math.round(start * 24);
  const cached = newMoonCache.get(key);
  if (cached) return { ...cached, purnimanta: tithi > 15 ? (cached.amanta + 1) % 12 : cached.amanta };
  const end = nextBoundary(elongation, start + 1, 360, 12.19);
  const signStart = Math.floor(toSidereal(sunLongitude(start), start) / 30);
  const signEnd = Math.floor(toSidereal(sunLongitude(end), end) / 30);
  const amanta = (signStart + 1) % 12;
  const result: LunarMonth = {
    amanta,
    // Krishna paksha belongs to the following month in purnimanta reckoning.
    purnimanta: tithi > 15 ? (amanta + 1) % 12 : amanta,
    adhik: signStart === signEnd,
    newMoonStart: start,
    newMoonEnd: end,
  };
  newMoonCache.set(key, result);
  if (newMoonCache.size > 400) newMoonCache.clear();
  return { ...result, purnimanta: tithi > 15 ? (amanta + 1) % 12 : amanta };
}

export type ChoghadiyaName = "Udveg" | "Char" | "Labh" | "Amrit" | "Kaal" | "Shubh" | "Rog";
const DAY_SEQ: ChoghadiyaName[] = ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"];
const NIGHT_SEQ: ChoghadiyaName[] = ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"];
// First period for Sunday..Saturday, as an index into the sequences above.
const DAY_START = [0, 3, 6, 2, 5, 1, 4];
const NIGHT_START = [0, 2, 4, 6, 1, 3, 5];
export const CHOGHADIYA_NE: Record<ChoghadiyaName, string> = {
  Udveg: "उद्वेग", Char: "चर", Labh: "लाभ", Amrit: "अमृत", Kaal: "काल", Shubh: "शुभ", Rog: "रोग",
};
export const CHOGHADIYA_QUALITY: Record<ChoghadiyaName, "good" | "neutral" | "bad"> = {
  Amrit: "good", Shubh: "good", Labh: "good", Char: "neutral", Udveg: "bad", Rog: "bad", Kaal: "bad",
};

export interface Period {
  start: Date;
  end: Date;
}

export interface DayPanchang {
  weekday: number;
  sunrise: Date;
  sunset: Date;
  nextSunrise: Date;
  moonrise: Date | null;
  moonset: Date | null;
  tithi: number;
  tithiEnd: Date;
  nextTithi: number;
  paksha: "shukla" | "krishna";
  nakshatra: number;
  nakshatraEnd: Date;
  yoga: number;
  yogaEnd: Date;
  karanas: { index: number; end: Date }[];
  moonRashi: number;
  sunRashi: number;
  lunarMonth: LunarMonth;
  rahuKaal: Period;
  yamaganda: Period;
  gulika: Period;
  abhijit: Period;
  brahmaMuhurta: Period;
  choghadiya: { day: { name: ChoghadiyaName; period: Period }[]; night: { name: ChoghadiyaName; period: Period }[] };
}

const RAHU = [8, 2, 7, 5, 6, 4, 3];
const YAMA = [5, 4, 3, 2, 1, 7, 6];
const GULIKA = [7, 6, 5, 4, 3, 2, 1];

const toJd = (d: Date) => julianDay(d);

/**
 * Full panchang for civil date (y, m 0-based, d) at the location.
 * Rise/set are searched from local midnight in `timeZone`.
 */
export function getDayPanchang(y: number, m: number, d: number, lat: number, lon: number, timeZone: string): DayPanchang {
  const midnight = localMidnight(y, m, d, timeZone);
  const sun = riseSet("sun", midnight, lat, lon);
  const nextMidnight = localMidnight(y, m, d + 1, timeZone);
  const sunNext = riseSet("sun", nextMidnight, lat, lon);
  const moon = riseSet("moon", midnight, lat, lon);

  // Polar fallback: use 6:00/18:00 local if the Sun doesn't rise or set.
  const sunrise = sun.rise ?? new Date(midnight + 6 * 3600000);
  const sunset = sun.set ?? new Date(midnight + 18 * 3600000);
  const nextSunrise = sunNext.rise ?? new Date(nextMidnight + 6 * 3600000);

  const jdRise = toJd(sunrise);
  const tithi = tithiAt(jdRise);
  const tithiEndJd = nextBoundary(elongation, jdRise, 12, 12.19);
  const nakshatraSpan = 360 / 27;
  const nakshatra = Math.floor(siderealMoon(jdRise) / nakshatraSpan);
  const yoga = Math.floor(yogaAngle(jdRise) / nakshatraSpan);

  // Karanas running from sunrise until next sunrise.
  const karanas: { index: number; end: Date }[] = [];
  let t = jdRise;
  const stop = toJd(nextSunrise);
  while (t < stop && karanas.length < 4) {
    const idx = karanaIndex(t + 1e-6);
    const end = nextBoundary(elongation, t + 1e-6, 6, 12.19);
    karanas.push({ index: idx, end: jdToDate(end) });
    t = end;
  }

  const weekday = new Date(Date.UTC(y, m, d)).getUTCDay();
  const dayLen = sunset.getTime() - sunrise.getTime();
  const nightLen = nextSunrise.getTime() - sunset.getTime();
  const span = (from: number, len: number, n: number, parts: number): Period => ({
    start: new Date(from + ((n - 1) * len) / parts),
    end: new Date(from + (n * len) / parts),
  });
  const rise = sunrise.getTime();
  const set = sunset.getTime();

  const choghadiya = {
    day: Array.from({ length: 8 }, (_, i) => ({
      name: DAY_SEQ[(DAY_START[weekday] + i) % 7],
      period: span(rise, dayLen, i + 1, 8),
    })),
    night: Array.from({ length: 8 }, (_, i) => ({
      name: NIGHT_SEQ[(NIGHT_START[weekday] + i) % 7],
      period: span(set, nightLen, i + 1, 8),
    })),
  };

  return {
    weekday,
    sunrise,
    sunset,
    nextSunrise,
    moonrise: moon.rise,
    moonset: moon.set,
    tithi,
    tithiEnd: jdToDate(tithiEndJd),
    nextTithi: (tithi % 30) + 1,
    paksha: pakshaOf(tithi),
    nakshatra,
    nakshatraEnd: jdToDate(nextBoundary(siderealMoon, jdRise, nakshatraSpan, 13.2)),
    yoga,
    yogaEnd: jdToDate(nextBoundary(yogaAngle, jdRise, nakshatraSpan, 14.2)),
    karanas,
    moonRashi: Math.floor(siderealMoon(jdRise) / 30),
    sunRashi: Math.floor(toSidereal(sunLongitude(jdRise), jdRise) / 30),
    lunarMonth: lunarMonthAt(jdRise, tithi),
    rahuKaal: span(rise, dayLen, RAHU[weekday], 8),
    yamaganda: span(rise, dayLen, YAMA[weekday], 8),
    gulika: span(rise, dayLen, GULIKA[weekday], 8),
    abhijit: span(rise, dayLen, 8, 15),
    brahmaMuhurta: { start: new Date(rise - (2 * (DAY_MS - dayLen)) / 15), end: new Date(rise - (DAY_MS - dayLen) / 15) },
    choghadiya,
  };
}

export const karanaName = (i: number, lang: "ne" | "en") => (lang === "ne" ? KARANA_NE[i] : KARANA_EN[i]);
