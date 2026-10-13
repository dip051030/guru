/**
 * Birth chart (kundali): sidereal lagna and grahas, whole-sign houses from the
 * lagna, nakshatra/pada, and Vimshottari dasha periods from the Moon.
 */
import { GRAHAS, julianDay, siderealGraha, toSidereal, type Graha } from "./ephemeris";

const RAD = Math.PI / 180;
const NAK = 360 / 27;

/** Sidereal ascendant (degrees) for an instant and place. */
export function siderealAscendant(date: Date, lat: number, lon: number): number {
  const jd = julianDay(date);
  const T = (jd - 2451545) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T;
  const lst = (((gmst + lon) % 360) + 360) % 360;
  const eps = (23.439291 - 0.0130042 * T) * RAD;
  const asc = Math.atan2(Math.cos(lst * RAD), -(Math.sin(lst * RAD) * Math.cos(eps) + Math.tan(lat * RAD) * Math.sin(eps))) / RAD;
  return toSidereal(asc, jd);
}

export interface ChartGraha {
  graha: Graha;
  lon: number;
  sign: number; // 0 = Mesha
  degree: number; // within sign
  nakshatra: number;
  pada: number;
  house: number; // 1-12 from lagna
  retrograde: boolean;
}

export interface Chart {
  lagna: { lon: number; sign: number; degree: number; nakshatra: number; pada: number };
  grahas: ChartGraha[];
}

export function birthChart(date: Date, lat: number, lon: number): Chart {
  const jd = julianDay(date);
  const asc = siderealAscendant(date, lat, lon);
  const lagnaSign = Math.floor(asc / 30);
  const grahas = GRAHAS.map((g) => {
    const { lon: l, retrograde } = siderealGraha(g, jd);
    const sign = Math.floor(l / 30);
    return {
      graha: g,
      lon: l,
      sign,
      degree: l % 30,
      nakshatra: Math.floor(l / NAK),
      pada: Math.floor((l % NAK) / (NAK / 4)) + 1,
      house: ((sign - lagnaSign + 12) % 12) + 1,
      retrograde,
    };
  });
  return {
    lagna: { lon: asc, sign: lagnaSign, degree: asc % 30, nakshatra: Math.floor(asc / NAK), pada: Math.floor((asc % NAK) / (NAK / 4)) + 1 },
    grahas,
  };
}

const DASHA_ORDER: Graha[] = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17];
const YEAR_MS = 365.25 * 86400000;

export interface DashaPeriod {
  lord: Graha;
  start: Date;
  end: Date;
}

/** Vimshottari mahadashas from birth (first one is the balance at birth), with antardashas. */
export function vimshottari(birth: Date, moonLon: number): (DashaPeriod & { sub: DashaPeriod[] })[] {
  const nak = Math.floor(moonLon / NAK);
  const first = nak % 9;
  const elapsedFraction = (moonLon % NAK) / NAK;
  // Start of the first mahadasha (before birth) so sub-periods line up.
  let t = birth.getTime() - elapsedFraction * DASHA_YEARS[first] * YEAR_MS;
  const out: (DashaPeriod & { sub: DashaPeriod[] })[] = [];
  for (let i = 0; i < 9; i++) {
    const li = (first + i) % 9;
    const len = DASHA_YEARS[li] * YEAR_MS;
    const sub: DashaPeriod[] = [];
    let s = t;
    for (let j = 0; j < 9; j++) {
      const sj = (li + j) % 9;
      const sl = (len * DASHA_YEARS[sj]) / 120;
      sub.push({ lord: DASHA_ORDER[sj], start: new Date(s), end: new Date(s + sl) });
      s += sl;
    }
    out.push({ lord: DASHA_ORDER[li], start: new Date(Math.max(t, birth.getTime())), end: new Date(t + len), sub });
    t += len;
  }
  return out;
}
