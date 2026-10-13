/**
 * Astronomical Ephemeris & Panchanga Calculation Engine
 * 
 * Implements high-precision algorithms for:
 * - Julian Date (JD)
 * - Tropical & Sidereal Solar/Lunar Longitudes
 * - Panchanga: Tithi, Nakshatra, Yoga, Karana
 * - Bikram Sambat (BS) Conversion Engine (Nepali Patra)
 * - Vedic 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu)
 * - Ascendant (Lagna) determination for any geographic coordinates
 */

import {
  GRAHAS, type Graha, lahiriAyanamsha, localMidnight, moonLongitude, riseSet, siderealGraha, siderealMoon,
  sunLongitude, toSidereal,
} from "./ephemeris";

import NepaliDate from "nepali-date-converter";

export interface GrahaPosition {
  name: string;
  sanskrit: string;
  symbol: string;
  longitude: number; // 0 to 360 degrees
  sign: string;
  signIndex: number; // 1 to 12
  degreeInSign: number; // 0 to 30
  minuteInSign: number;
  house: number;
  isRetrograde: boolean;
  dignity: string;
}

export interface PanchangaResult {
  gregorianDate: string;
  bikramSambat: {
    year: number;
    monthIndex: number;
    monthName: string;
    day: number;
    formatted: string;
    formattedNepali: string;
  };
  tithi: {
    index: number; // 1 to 30
    paksha: "Shukla" | "Krishna";
    name: string;
    sanskritName: string;
    progressPercentage: number;
  };
  nakshatra: {
    index: number; // 1 to 27
    name: string;
    sanskritName: string;
    ruler: string;
    deity: string;
    pada: number; // 1 to 4
  };
  yoga: {
    index: number; // 1 to 27
    name: string;
    nature: "Auspicious" | "Inauspicious" | "Neutral";
  };
  karana: {
    index: number;
    name: string;
    type: "Movable" | "Fixed";
  };
  solarSign: {
    name: string;
    sanskrit: string;
    degree: number;
  };
  lunarSign: {
    name: string;
    sanskrit: string;
    degree: number;
  };
  ascendant: {
    degree: number;
    sign: string;
    sanskritSign: string;
    signIndex: number;
    degreeInSign: number;
  };
  planets: GrahaPosition[];
}

const ZODIAC_SIGNS = [
  { name: "Aries", sanskrit: "Mesha", symbol: "♈", ruler: "Mars" },
  { name: "Taurus", sanskrit: "Vrishabha", symbol: "♉", ruler: "Venus" },
  { name: "Gemini", sanskrit: "Mithuna", symbol: "♊", ruler: "Mercury" },
  { name: "Cancer", sanskrit: "Karka", symbol: "♋", ruler: "Moon" },
  { name: "Leo", sanskrit: "Simha", symbol: "♌", ruler: "Sun" },
  { name: "Virgo", sanskrit: "Kanya", symbol: "♍", ruler: "Mercury" },
  { name: "Libra", sanskrit: "Tula", symbol: "♎", ruler: "Venus" },
  { name: "Scorpio", sanskrit: "Vrischika", symbol: "♏", ruler: "Mars" },
  { name: "Sagittarius", sanskrit: "Dhanu", symbol: "♐", ruler: "Jupiter" },
  { name: "Capricorn", sanskrit: "Makara", symbol: "♑", ruler: "Saturn" },
  { name: "Aquarius", sanskrit: "Kumbha", symbol: "♒", ruler: "Saturn" },
  { name: "Pisces", sanskrit: "Meena", symbol: "♓", ruler: "Jupiter" },
];

const NAKSHATRAS = [
  { name: "Ashwini", ruler: "Ketu", deity: "Ashwini Kumaras" },
  { name: "Bharani", ruler: "Venus", deity: "Yama" },
  { name: "Krittika", ruler: "Sun", deity: "Agni" },
  { name: "Rohini", ruler: "Moon", deity: "Brahma" },
  { name: "Mrigashira", ruler: "Mars", deity: "Soma" },
  { name: "Ardra", ruler: "Rahu", deity: "Rudra" },
  { name: "Punarvasu", ruler: "Jupiter", deity: "Aditi" },
  { name: "Pushya", ruler: "Saturn", deity: "Brihaspati" },
  { name: "Ashlesha", ruler: "Mercury", deity: "Nagas" },
  { name: "Magha", ruler: "Ketu", deity: "Pitris" },
  { name: "Purva Phalguni", ruler: "Venus", deity: "Bhaga" },
  { name: "Uttara Phalguni", ruler: "Sun", deity: "Aryaman" },
  { name: "Hasta", ruler: "Moon", deity: "Savitr" },
  { name: "Chitra", ruler: "Mars", deity: "Vishvakarma" },
  { name: "Swati", ruler: "Rahu", deity: "Vayu" },
  { name: "Vishakha", ruler: "Jupiter", deity: "Indragni" },
  { name: "Anuradha", ruler: "Saturn", deity: "Mitra" },
  { name: "Jyeshtha", ruler: "Mercury", deity: "Indra" },
  { name: "Mula", ruler: "Ketu", deity: "Nirriti" },
  { name: "Purva Ashadha", ruler: "Venus", deity: "Apas" },
  { name: "Uttara Ashadha", ruler: "Sun", deity: "Vishvadevas" },
  { name: "Shravana", ruler: "Moon", deity: "Vishnu" },
  { name: "Dhanishta", ruler: "Mars", deity: "Vasus" },
  { name: "Shatabhisha", ruler: "Rahu", deity: "Varuna" },
  { name: "Purva Bhadrapada", ruler: "Jupiter", deity: "Aja Ekapada" },
  { name: "Uttara Bhadrapada", ruler: "Saturn", deity: "Ahirbudhnya" },
  { name: "Revati", ruler: "Mercury", deity: "Pushan" },
];

const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", // Shukla 15
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya", // Krishna 15
];

const NEPALI_MONTHS = [
  "Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
];

const NEPALI_NUMERALS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliNumber(num: number | string): string {
  return num
    .toString()
    .split("")
    .map((ch) => {
      const parsed = parseInt(ch, 10);
      return !isNaN(parsed) && ch >= "0" && ch <= "9" ? NEPALI_NUMERALS[parsed] : ch;
    })
    .join("");
}

/**
 * Calculates Julian Day Number from UTC Date
 */
export function calculateJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

export { lahiriAyanamsha };

/** Sidereal (Lahiri) Moon sign at an instant: 0 = Mesha … 11 = Meena. */
export function getSiderealMoonSign(date: Date): { index: number; degree: number } {
  const moon = siderealMoon(calculateJulianDate(date));
  return { index: Math.floor(moon / 30), degree: moon % 30 };
}

/** Apparent tropical longitude of the Sun (degrees), Meeus ch. 25. */
export const calculateSunLongitude = sunLongitude;

/** Apparent tropical longitude of the Moon (degrees), Meeus ch. 47. */
export const calculateMoonLongitude = moonLongitude;

/**
 * Computes Tithi from Sun and Moon longitudes
 */
export function calculateTithi(sunLong: number, moonLong: number) {
  let diff = (moonLong - sunLong + 360) % 360;
  const tithiIndex = Math.floor(diff / 12) + 1; // 1 to 30
  const isShukla = tithiIndex <= 15;
  const name = TITHI_NAMES[tithiIndex - 1];
  const progress = ((diff % 12) / 12) * 100;

  return {
    index: tithiIndex,
    paksha: isShukla ? ("Shukla" as const) : ("Krishna" as const),
    name: name,
    sanskritName: `${isShukla ? "शुक्ल" : "कृष्ण"} ${name}`,
    progressPercentage: Math.round(progress),
  };
}

/**
 * Calculates Nakshatra from Moon Longitude
 */
export function calculateNakshatra(moonLong: number) {
  const span = 360 / 27; // 13.333333 degrees
  const index = Math.floor(moonLong / span);
  const nak = NAKSHATRAS[index % 27];
  const pada = Math.floor(((moonLong % span) / span) * 4) + 1;

  return {
    index: index + 1,
    name: nak.name,
    sanskritName: nak.name,
    ruler: nak.ruler,
    deity: nak.deity,
    pada,
  };
}

/**
 * Calculates Yoga
 */
export function calculateYoga(sunLong: number, moonLong: number) {
  const sum = (sunLong + moonLong) % 360;
  const span = 360 / 27;
  const index = Math.floor(sum / span) + 1;
  const YOGA_NAMES = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
    "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda",
    "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
    "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
    "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
    "Indra", "Vaidhriti"
  ];
  const name = YOGA_NAMES[(index - 1) % 27];
  const inauspicious = ["Vishkambha", "Atiganda", "Shula", "Ganda", "Vyaghata", "Vajra", "Vyatipata", "Parigha", "Vaidhriti"];
  const nature = inauspicious.includes(name) ? ("Inauspicious" as const) : ("Auspicious" as const);

  return {
    index,
    name,
    nature,
  };
}

/**
 * Calculates Karana
 */
export function calculateKarana(sunLong: number, moonLong: number) {
  let diff = (moonLong - sunLong + 360) % 360;
  const halfTithiIndex = Math.floor(diff / 6) + 1; // 1 to 60
  const MOVABLE_KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)"];
  
  let name = "";
  let type: "Movable" | "Fixed" = "Movable";

  if (halfTithiIndex === 1) {
    name = "Kimstughna";
    type = "Fixed";
  } else if (halfTithiIndex >= 58) {
    if (halfTithiIndex === 58) name = "Shakuni";
    else if (halfTithiIndex === 59) name = "Chatushpada";
    else name = "Naga";
    type = "Fixed";
  } else {
    name = MOVABLE_KARANAS[(halfTithiIndex - 2) % 7];
  }

  return {
    index: halfTithiIndex,
    name,
    type,
  };
}

/**
 * Converts AD Date to Bikram Sambat Date using Official Samiti Mapping
 */
export function getNepaliDate(date: Date) {
  try {
    const nd = new NepaliDate(date);
    const year = nd.getYear();
    const month = nd.getMonth() + 1;
    const day = nd.getDate();
    const monthName = NEPALI_MONTHS[month - 1] || "बैशाख";

    return {
      year,
      monthIndex: month,
      monthName,
      day,
      formatted: `${monthName} ${day}, ${year} BS`,
      formattedNepali: `${toNepaliNumber(year)} ${monthName} ${toNepaliNumber(day)}`,
    };
  } catch {
    return {
      year: 2083,
      monthIndex: 6,
      monthName: "असोज",
      day: 11,
      formatted: "असोज 11, 2083 BS",
      formattedNepali: "२०८३ असोज ११",
    };
  }
}

/**
 * Calculates Ascendant (Lagna) for given latitude and longitude
 */
export function calculateAscendant(date: Date, latitude: number, longitude: number) {
  const jd = calculateJulianDate(date);
  const d = jd - 2451545.0;

  // Greenwich Mean Sidereal Time (GMST) in degrees
  let gmst = 280.46061837 + 360.98564736629 * d;
  gmst = (gmst % 360 + 360) % 360;

  // Local Sidereal Time (LST)
  let lst = (gmst + longitude + 360) % 360;
  const lstRad = lst * (Math.PI / 180);
  const latRad = latitude * (Math.PI / 180);

  // Obliquity of the Ecliptic (approx 23.44 degrees)
  const epsRad = 23.439 * (Math.PI / 180);

  // Ascendant formula: tan(Asc) = cos(LST) / (-sin(LST)*cos(eps) - tan(lat)*sin(eps))
  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  // Tropical ascendant, then shifted to the sidereal (Lahiri) zodiac.
  const ascDeg = toSidereal(Math.atan2(y, x) * (180 / Math.PI), jd);

  const signIndex = Math.floor(ascDeg / 30) + 1;
  const sign = ZODIAC_SIGNS[signIndex - 1];
  const degreeInSign = ascDeg % 30;

  return {
    degree: ascDeg,
    sign: sign.name,
    sanskritSign: sign.sanskrit,
    signIndex,
    degreeInSign: parseFloat(degreeInSign.toFixed(2)),
  };
}

/**
 * Computes the 9 Vedic Grahas (Planets)
 */
export function calculatePlanetaryPositions(jd: number): GrahaPosition[] {
  const META: Record<Graha, { sanskrit: string; symbol: string }> = {
    Sun: { sanskrit: "Surya", symbol: "Su" },
    Moon: { sanskrit: "Chandra", symbol: "Mo" },
    Mars: { sanskrit: "Mangala", symbol: "Ma" },
    Mercury: { sanskrit: "Budha", symbol: "Me" },
    Jupiter: { sanskrit: "Guru", symbol: "Ju" },
    Venus: { sanskrit: "Shukra", symbol: "Ve" },
    Saturn: { sanskrit: "Shani", symbol: "Sa" },
    Rahu: { sanskrit: "Rahu", symbol: "Ra" },
    Ketu: { sanskrit: "Ketu", symbol: "Ke" },
  };

  return GRAHAS.map((name) => {
    const { lon, retrograde } = siderealGraha(name, jd);
    const signIndex = Math.floor(lon / 30) + 1;
    const degInSign = lon % 30;
    const sign = ZODIAC_SIGNS[signIndex - 1];
    return {
      name,
      sanskrit: META[name].sanskrit,
      symbol: META[name].symbol,
      longitude: parseFloat(lon.toFixed(2)),
      sign: sign.name,
      signIndex,
      degreeInSign: Math.floor(degInSign),
      minuteInSign: Math.floor((degInSign % 1) * 60),
      house: signIndex, // whole-sign from Mesha
      isRetrograde: retrograde,
      dignity: retrograde ? "Retrograde" : "Direct",
    };
  });
}

/**
 * Full master evaluation for an instant in time and location
 */
export function evaluatePanchanga(date: Date, latitude = 27.7172, longitude = 85.324): PanchangaResult {
  const jd = calculateJulianDate(date);
  // Nakshatra, yoga and rashi are sidereal in Vedic reckoning; tithi and
  // karana depend only on the Sun-Moon difference, so the ayanamsha cancels.
  const sunLong = toSidereal(calculateSunLongitude(jd), jd);
  const moonLong = toSidereal(calculateMoonLongitude(jd), jd);

  const bs = getNepaliDate(date);
  const tithi = calculateTithi(sunLong, moonLong);
  const nakshatra = calculateNakshatra(moonLong);
  const yoga = calculateYoga(sunLong, moonLong);
  const karana = calculateKarana(sunLong, moonLong);
  const ascendant = calculateAscendant(date, latitude, longitude);
  const planets = calculatePlanetaryPositions(jd);

  const solarSignIndex = Math.floor(sunLong / 30);
  const lunarSignIndex = Math.floor(moonLong / 30);

  return {
    gregorianDate: date.toISOString().split("T")[0],
    bikramSambat: bs,
    tithi,
    nakshatra,
    yoga,
    karana,
    solarSign: {
      name: ZODIAC_SIGNS[solarSignIndex].name,
      sanskrit: ZODIAC_SIGNS[solarSignIndex].sanskrit,
      degree: parseFloat((sunLong % 30).toFixed(2)),
    },
    lunarSign: {
      name: ZODIAC_SIGNS[lunarSignIndex].name,
      sanskrit: ZODIAC_SIGNS[lunarSignIndex].sanskrit,
      degree: parseFloat((moonLong % 30).toFixed(2)),
    },
    ascendant: {
      degree: ascendant.degree,
      sign: ascendant.sign,
      sanskritSign: ascendant.sanskritSign,
      signIndex: ascendant.signIndex,
      degreeInSign: ascendant.degreeInSign,
    },
    planets,
  };
}

/**
 * Sunrise and sunset instants (ms) for the calendar day of `date` at the
 * location, searched from local midnight in `timeZone`.
 */
function solarDay(date: Date, lat: number, lon: number, timeZone: string) {
  const midnight = localMidnight(date.getFullYear(), date.getMonth(), date.getDate(), timeZone);
  const { rise, set } = riseSet("sun", midnight, lat, lon);
  return {
    sunriseMs: rise?.getTime() ?? midnight + 6 * 3600000,
    sunsetMs: set?.getTime() ?? midnight + 18 * 3600000,
    weekday: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).getUTCDay(),
  };
}

function timeFormatter(timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone });
  return (ms: number) => fmt.format(new Date(ms));
}

/**
 * Sunrise and sunset for any coordinates, formatted in the given IANA time zone
 * (e.g. "Europe/London").
 */
export function getSunTimes(
  date: Date,
  lat: number,
  lon: number,
  timeZone: string
): { sunrise: string; sunset: string } {
  const { sunriseMs, sunsetMs } = solarDay(date, lat, lon, timeZone);
  const at = timeFormatter(timeZone);
  return { sunrise: at(sunriseMs), sunset: at(sunsetMs) };
}

export interface TimeWindow {
  start: string;
  end: string;
}

// Which eighth of the daytime (1-8) each period falls in, indexed Sunday..Saturday.
const RAHU_KAAL_OCTANT = [8, 2, 7, 5, 6, 4, 3];
const YAMAGANDA_OCTANT = [5, 4, 3, 2, 1, 7, 6];
const GULIKA_OCTANT = [7, 6, 5, 4, 3, 2, 1];

/**
 * Daily muhurta windows for any location. Rahu Kaal, Yamaganda and Gulika are
 * fixed eighths of the local sunrise-to-sunset span (so they shift with the
 * seasons and the place); Abhijit is the 8th of 15 daytime muhurtas, and Brahma
 * Muhurta is the 2nd-to-last of 15 night muhurtas before sunrise.
 */
export function getDailyMuhurtaTimings(
  date: Date,
  lat = 27.7172,
  lon = 85.324,
  timeZone = "Asia/Kathmandu"
) {
  const { sunriseMs, sunsetMs, weekday } = solarDay(date, lat, lon, timeZone);
  const at = timeFormatter(timeZone);
  const day = sunsetMs - sunriseMs;
  const night = 24 * 3600 * 1000 - day;

  const octant = (n: number): TimeWindow => ({
    start: at(sunriseMs + ((n - 1) * day) / 8),
    end: at(sunriseMs + (n * day) / 8),
  });

  return {
    sunrise: at(sunriseMs),
    sunset: at(sunsetMs),
    rahuKaal: octant(RAHU_KAAL_OCTANT[weekday]),
    yamaGanda: octant(YAMAGANDA_OCTANT[weekday]),
    gulika: octant(GULIKA_OCTANT[weekday]),
    abhijitMuhurta: { start: at(sunriseMs + (7 * day) / 15), end: at(sunriseMs + (8 * day) / 15) },
    brahmaMuhurta: { start: at(sunriseMs - (2 * night) / 15), end: at(sunriseMs - night / 15) },
  };
}
