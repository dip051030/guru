/**
 * Nepali festivals and public holidays, computed for any year.
 *
 * Lunar festivals are defined by amanta lunar month + tithi and an observance
 * rule (which tithi prevails at sunrise, sunset or midnight in Kathmandu).
 * Fixed national days use the Bikram Sambat date; a few use the AD date.
 *
 * Holiday flags follow the Government of Nepal's usual gazette. The government
 * publishes the official list each year (and announces Eid separately), so a
 * given year can differ slightly.
 */
import NepaliDate from "nepali-date-converter";
import { elongation, julianDay, localMidnight, nextBoundary, riseSet } from "./ephemeris";
import { lunarMonthAt, tithiAt } from "./panchang";

const KTM = { lat: 27.7172, lon: 85.324, tz: "Asia/Kathmandu" };

export type HolidayKind = "national" | "regional" | "group" | null;

interface Base {
  id: string;
  ne: string;
  en: string;
  holiday: HolidayKind;
  /** Who gets the day off when it isn't nationwide. */
  noteNe?: string;
  noteEn?: string;
  /** Minor observances (generic Ekadashi etc.) rank below named festivals. */
  minor?: boolean;
}
interface LunarRule extends Base {
  kind: "lunar";
  month: number; // amanta, 0 = Chaitra
  tithi: number; // 1-30
  /**
   * When the tithi must prevail: at sunrise (udaya, default), in the afternoon
   * (aparahna, e.g. Vijaya Dashami), at sunset (pradosh) or at midnight (nishita).
   */
  at?: "sunrise" | "aparahna" | "sunset" | "midnight";
  /** If the tithi covers the instant on two days, take the later one. */
  preferLater?: boolean;
}
interface BsRule extends Base { kind: "bs"; month: number; day: number } // month 1 = Baisakh
interface AdRule extends Base { kind: "ad"; month: number; day: number } // month 1 = January
/** The civil day after another festival (e.g. Terai Holi). */
interface AfterRule extends Base { kind: "after"; after: string }

export type FestivalRule = LunarRule | BsRule | AdRule | AfterRule;

const VALLEY = { noteNe: "काठमाडौं उपत्यकामा बिदा", noteEn: "Holiday in Kathmandu Valley" };

export const FESTIVAL_RULES: FestivalRule[] = [
  // Chaitra
  { kind: "lunar", id: "chaite-dashain", month: 0, tithi: 8, ne: "चैते दशैं", en: "Chaite Dashain", holiday: null },
  { kind: "lunar", id: "ram-navami", month: 0, tithi: 9, ne: "राम नवमी", en: "Ram Navami", holiday: "national" },
  { kind: "lunar", id: "mata-tirtha", month: 0, tithi: 30, ne: "मातातीर्थ औंसी (आमाको मुख हेर्ने दिन)", en: "Mata Tirtha Aunsi (Mother's Day)", holiday: null },
  // Vaishakha
  { kind: "lunar", id: "akshaya-tritiya", month: 1, tithi: 3, ne: "अक्षय तृतीया", en: "Akshaya Tritiya", holiday: null },
  { kind: "lunar", id: "buddha-jayanti", month: 1, tithi: 15, ne: "बुद्ध जयन्ती / उभौली पर्व", en: "Buddha Jayanti / Ubhauli", holiday: "national" },
  // Jyeshtha
  { kind: "lunar", id: "sithi-nakha", month: 2, tithi: 6, ne: "सिथी नखः", en: "Sithi Nakha", holiday: null },
  // Ashadha
  { kind: "lunar", id: "harishayani", month: 3, tithi: 11, ne: "हरिशयनी एकादशी", en: "Harishayani Ekadashi", holiday: null },
  { kind: "lunar", id: "guru-purnima", month: 3, tithi: 15, ne: "गुरु पूर्णिमा", en: "Guru Purnima", holiday: null },
  // Shravana
  { kind: "lunar", id: "nag-panchami", month: 4, tithi: 5, ne: "नाग पञ्चमी", en: "Nag Panchami", holiday: null },
  { kind: "lunar", id: "janai-purnima", month: 4, tithi: 15, ne: "जनै पूर्णिमा / रक्षाबन्धन", en: "Janai Purnima / Raksha Bandhan", holiday: "national" },
  { kind: "lunar", id: "gai-jatra", month: 4, tithi: 16, ne: "गाईजात्रा", en: "Gai Jatra", holiday: "regional", ...VALLEY },
  { kind: "lunar", id: "janmashtami", month: 4, tithi: 23, at: "midnight", ne: "श्रीकृष्ण जन्माष्टमी", en: "Krishna Janmashtami", holiday: "national" },
  { kind: "lunar", id: "kushe-aunsi", month: 4, tithi: 30, ne: "कुशे औंसी (बुबाको मुख हेर्ने दिन)", en: "Kushe Aunsi (Father's Day)", holiday: null },
  // Bhadrapada
  { kind: "lunar", id: "teej", month: 5, tithi: 3, ne: "हरितालिका तीज", en: "Haritalika Teej", holiday: "national", noteNe: "महिलाका लागि बिदा", noteEn: "Holiday for women" },
  { kind: "lunar", id: "ganesh-chaturthi", month: 5, tithi: 4, ne: "गणेश चतुर्थी", en: "Ganesh Chaturthi", holiday: null },
  { kind: "lunar", id: "rishi-panchami", month: 5, tithi: 5, ne: "ऋषि पञ्चमी", en: "Rishi Panchami", holiday: null },
  { kind: "lunar", id: "gaura", month: 5, tithi: 8, ne: "गौरा पर्व", en: "Gaura Parva", holiday: "regional", noteNe: "सुदूरपश्चिममा बिदा", noteEn: "Holiday in Sudurpashchim" },
  { kind: "lunar", id: "indra-jatra", month: 5, tithi: 14, ne: "इन्द्रजात्रा", en: "Indra Jatra", holiday: "regional", ...VALLEY },
  { kind: "lunar", id: "sorha-shraddha", month: 5, tithi: 16, ne: "सोह्र श्राद्ध आरम्भ", en: "Sorha Shraddha begins", holiday: null },
  { kind: "lunar", id: "jitiya", month: 5, tithi: 23, ne: "जितिया पर्व", en: "Jitiya", holiday: "group", noteNe: "मधेशमा महिलाका लागि बिदा", noteEn: "Holiday for women (Madhesh)" },
  // Ashwin — Dashain and Tihar
  { kind: "lunar", id: "ghatasthapana", month: 6, tithi: 1, ne: "घटस्थापना", en: "Ghatasthapana", holiday: "national" },
  { kind: "lunar", id: "fulpati", month: 6, tithi: 7, ne: "फूलपाती", en: "Fulpati", holiday: "national" },
  { kind: "lunar", id: "maha-ashtami", month: 6, tithi: 8, ne: "महाअष्टमी", en: "Maha Ashtami", holiday: "national" },
  { kind: "lunar", id: "maha-navami", month: 6, tithi: 9, ne: "महानवमी", en: "Maha Navami", holiday: "national" },
  { kind: "lunar", id: "vijaya-dashami", month: 6, tithi: 10, at: "aparahna", ne: "विजया दशमी (दशैं टीका)", en: "Vijaya Dashami (Dashain Tika)", holiday: "national" },
  { kind: "lunar", id: "papankusha", month: 6, tithi: 11, ne: "पापाङ्कुशा एकादशी", en: "Papankusha Ekadashi", holiday: "national" },
  { kind: "lunar", id: "kojagrat", month: 6, tithi: 15, at: "midnight", ne: "कोजाग्रत पूर्णिमा", en: "Kojagrat Purnima", holiday: "national" },
  { kind: "lunar", id: "kag-tihar", month: 6, tithi: 28, ne: "काग तिहार", en: "Kag Tihar", holiday: null },
  { kind: "lunar", id: "kukur-tihar", month: 6, tithi: 29, ne: "कुकुर तिहार / नरक चतुर्दशी", en: "Kukur Tihar", holiday: null },
  { kind: "lunar", id: "laxmi-puja", month: 6, tithi: 30, at: "sunset", preferLater: true, ne: "लक्ष्मी पूजा", en: "Laxmi Puja", holiday: "national" },
  // Kartik
  { kind: "lunar", id: "govardhan", month: 7, tithi: 1, ne: "गोवर्द्धन पूजा / म्ह पूजा (नेपाल संवत् नयाँ वर्ष)", en: "Govardhan Puja / Mha Puja (Nepal Sambat New Year)", holiday: "national" },
  { kind: "lunar", id: "bhai-tika", month: 7, tithi: 2, ne: "भाइटीका", en: "Bhai Tika", holiday: "national" },
  { kind: "lunar", id: "chhath", month: 7, tithi: 6, at: "sunset", ne: "छठ पर्व", en: "Chhath", holiday: "national" },
  { kind: "lunar", id: "haribodhini", month: 7, tithi: 11, ne: "हरिबोधिनी एकादशी", en: "Haribodhini Ekadashi", holiday: null },
  { kind: "lunar", id: "bala-chaturdashi", month: 7, tithi: 29, ne: "बाला चतुर्दशी", en: "Bala Chaturdashi", holiday: null },
  // Margashirsha
  { kind: "lunar", id: "bibaha-panchami", month: 8, tithi: 5, ne: "विवाह पञ्चमी", en: "Bibaha Panchami", holiday: null },
  { kind: "lunar", id: "udhauli", month: 8, tithi: 15, ne: "उधौली पर्व / योमरी पुन्ही", en: "Udhauli / Yomari Punhi", holiday: "group", noteNe: "किराँत समुदायका लागि बिदा", noteEn: "Holiday for the Kirat community" },
  // Magh
  { kind: "lunar", id: "sonam-lhosar", month: 10, tithi: 1, ne: "सोनाम ल्होसार", en: "Sonam Lhosar", holiday: "national" },
  { kind: "lunar", id: "basanta-panchami", month: 10, tithi: 5, ne: "वसन्त पञ्चमी (सरस्वती पूजा)", en: "Basanta Panchami (Saraswati Puja)", holiday: null },
  { kind: "lunar", id: "shivaratri", month: 10, tithi: 29, at: "midnight", ne: "महाशिवरात्रि", en: "Maha Shivaratri", holiday: "national" },
  // Phalguna
  { kind: "lunar", id: "gyalpo-lhosar", month: 11, tithi: 1, ne: "ग्याल्पो ल्होसार", en: "Gyalpo Lhosar", holiday: "national" },
  { kind: "lunar", id: "holi", month: 11, tithi: 15, at: "sunset", ne: "फागु पूर्णिमा (होली)", en: "Fagu Purnima (Holi)", holiday: "national", noteNe: "पहाडी जिल्लामा", noteEn: "Hill districts" },
  { kind: "after", id: "holi-terai", after: "holi", ne: "तराई होली", en: "Holi (Terai)", holiday: "regional", noteNe: "तराईका जिल्लामा बिदा", noteEn: "Holiday in Terai districts" },
  { kind: "lunar", id: "ghode-jatra", month: 11, tithi: 29, ne: "घोडेजात्रा", en: "Ghode Jatra", holiday: "regional", ...VALLEY },

  // Fixed Bikram Sambat dates
  { kind: "bs", id: "new-year", month: 1, day: 1, ne: "नयाँ वर्ष", en: "Nepali New Year", holiday: "national" },
  { kind: "bs", id: "loktantra", month: 1, day: 11, ne: "लोकतन्त्र दिवस", en: "Loktantra Diwas", holiday: "national" },
  { kind: "bs", id: "ganatantra", month: 2, day: 15, ne: "गणतन्त्र दिवस", en: "Republic Day", holiday: "national" },
  { kind: "bs", id: "ropain", month: 3, day: 15, ne: "असार पन्ध्र (दहीचिउरा खाने दिन)", en: "Asar 15 (Paddy Day)", holiday: null },
  { kind: "bs", id: "saune-sankranti", month: 4, day: 1, ne: "साउने संक्रान्ति", en: "Saune Sankranti", holiday: null },
  { kind: "bs", id: "sambidhan", month: 6, day: 3, ne: "संविधान दिवस", en: "Constitution Day", holiday: "national" },
  { kind: "bs", id: "tamu-lhosar", month: 9, day: 15, ne: "तमु ल्होसार", en: "Tamu Lhosar", holiday: "national" },
  { kind: "bs", id: "prithvi-jayanti", month: 9, day: 27, ne: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस", en: "Prithvi Jayanti", holiday: "national" },
  { kind: "bs", id: "maghe-sankranti", month: 10, day: 1, ne: "माघे संक्रान्ति", en: "Maghe Sankranti", holiday: "national" },
  { kind: "bs", id: "sahid-diwas", month: 10, day: 16, ne: "शहीद दिवस", en: "Martyrs' Day", holiday: null },
  { kind: "bs", id: "prajatantra", month: 11, day: 7, ne: "प्रजातन्त्र दिवस", en: "Democracy Day", holiday: "national" },

  // Fixed AD dates
  { kind: "ad", id: "womens-day", month: 3, day: 8, ne: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day", holiday: "group", noteNe: "महिलाका लागि बिदा", noteEn: "Holiday for women" },
  { kind: "ad", id: "labour-day", month: 5, day: 1, ne: "मजदुर दिवस", en: "Labour Day", holiday: "group", noteNe: "श्रमिकका लागि बिदा", noteEn: "Holiday for workers" },
  { kind: "ad", id: "christmas", month: 12, day: 25, ne: "क्रिसमस", en: "Christmas", holiday: "national" },

  // Recurring vrat days (shown only when nothing bigger falls on the day)
  { kind: "lunar", id: "ekadashi-s", month: -1, tithi: 11, ne: "एकादशी व्रत", en: "Ekadashi", holiday: null, minor: true },
  { kind: "lunar", id: "ekadashi-k", month: -1, tithi: 26, ne: "एकादशी व्रत", en: "Ekadashi", holiday: null, minor: true },
  { kind: "lunar", id: "purnima", month: -1, tithi: 15, ne: "पूर्णिमा", en: "Purnima", holiday: null, minor: true },
  { kind: "lunar", id: "aunsi", month: -1, tithi: 30, ne: "औंसी", en: "Aunsi", holiday: null, minor: true },
];

export interface FestivalOccurrence {
  rule: FestivalRule;
  /** AD civil date (local, Nepal) as yyyy-mm-dd. */
  date: string;
}

interface DayInfo {
  /** tithi prevailing at sunrise / sunset / midnight that ends the day */
  sunrise: number;
  aparahna: number;
  sunset: number;
  midnight: number;
  jd: { sunrise: number; aparahna: number; sunset: number; midnight: number };
}

const dayCache = new Map<string, DayInfo>();

const key = (y: number, m: number, d: number) => {
  const dt = new Date(Date.UTC(y, m, d));
  return dt.toISOString().slice(0, 10);
};

function dayInfo(y: number, m: number, d: number): DayInfo {
  const k = key(y, m, d);
  const hit = dayCache.get(k);
  if (hit) return hit;
  const start = localMidnight(y, m, d, KTM.tz);
  const end = localMidnight(y, m, d + 1, KTM.tz);
  const { rise, set } = riseSet("sun", start, KTM.lat, KTM.lon);
  const sunrise = julianDay(rise ?? new Date(start + 6 * 3600000));
  const sunset = julianDay(set ?? new Date(start + 18 * 3600000));
  const jd = {
    sunrise,
    // Middle of aparahna, the 4th of the day's five parts.
    aparahna: sunrise + (sunset - sunrise) * 0.7,
    sunset,
    midnight: julianDay(new Date(end - 1)),
  };
  const info = {
    sunrise: tithiAt(jd.sunrise),
    aparahna: tithiAt(jd.aparahna),
    sunset: tithiAt(jd.sunset),
    midnight: tithiAt(jd.midnight),
    jd,
  };
  dayCache.set(k, info);
  if (dayCache.size > 2000) dayCache.clear();
  return info;
}

const prevTithi = (t: number) => (t === 1 ? 30 : t - 1);
const nextTithi = (t: number) => (t === 30 ? 1 : t + 1);

/** Does lunar rule `r` fall on civil date y-m-d (Nepal)? */
function lunarMatches(r: LunarRule, y: number, m: number, d: number): boolean {
  const at = r.at ?? "sunrise";
  const today = dayInfo(y, m, d);
  const t = today[at];
  let instant: number;
  if (t === r.tithi) {
    // Vriddhi: the same tithi at the same instant two days running -> first
    // day, or the second for rules that prefer the later day.
    const neighbour = r.preferLater ? dayInfo(y, m, d + 1) : dayInfo(y, m, d - 1);
    if (neighbour[at] === r.tithi) return false;
    instant = today.jd[at];
  } else if (t === prevTithi(r.tithi) && dayInfo(y, m, d + 1)[at] === nextTithi(r.tithi)) {
    // Kshaya: the tithi starts and ends between two observation instants -> this day.
    instant = nextBoundary(elongation, today.jd[at], 12, 12.19) + 0.01;
  } else {
    return false;
  }
  if (r.month === -1) return true;
  const lm = lunarMonthAt(instant, r.tithi);
  return !lm.adhik && lm.amanta === r.month;
}

/** All festivals and holidays on the civil date (AD, Nepal). */
export function festivalsOn(y: number, m: number, d: number): FestivalRule[] {
  const bs = new NepaliDate(new Date(y, m, d, 12));
  const bsMonth = bs.getMonth() + 1;
  const bsDay = bs.getDate();
  const found = FESTIVAL_RULES.filter((r) => {
    if (r.kind === "bs") return r.month === bsMonth && r.day === bsDay;
    if (r.kind === "ad") return r.month === m + 1 && r.day === d;
    if (r.kind === "after") {
      const base = FESTIVAL_RULES.find((b) => b.id === r.after);
      return base?.kind === "lunar" && lunarMatches(base, y, m, d - 1);
    }
    return lunarMatches(r, y, m, d);
  });
  const major = found.filter((r) => !r.minor);
  return major.length ? major : found.slice(0, 1);
}

/** Festivals between two AD dates inclusive, in order. */
export function festivalsBetween(from: Date, days: number): FestivalOccurrence[] {
  const out: FestivalOccurrence[] = [];
  for (let i = 0; i < days; i++) {
    const dt = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    for (const rule of festivalsOn(dt.getFullYear(), dt.getMonth(), dt.getDate())) {
      out.push({ rule, date: key(dt.getFullYear(), dt.getMonth(), dt.getDate()) });
    }
  }
  return out;
}

export const isPublicHoliday = (rules: FestivalRule[]) => rules.some((r) => r.holiday === "national");
