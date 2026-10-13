/**
 * Positional astronomy for the panchang.
 *
 * - Sun: Meeus, Astronomical Algorithms ch. 25 (≈0.01°)
 * - Moon: Meeus ch. 47, full 60-term longitude and main latitude series (≈0.01°)
 * - Planets: JPL "Approximate Positions of the Planets" Keplerian elements,
 *   1800–2050 set (arc-minute level, ample for rashi/house work)
 * - Rise/set: altitude search with bisection, so it works for the Sun and Moon alike
 *
 * Longitudes are tropical unless a function says "sidereal" (Lahiri ayanamsha).
 */

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;
const norm = (x: number) => ((x % 360) + 360) % 360;
const sinD = (x: number) => Math.sin(x * RAD);
const cosD = (x: number) => Math.cos(x * RAD);

export const DAY_MS = 86400000;

export function julianDay(date: Date): number {
  return date.getTime() / DAY_MS + 2440587.5;
}

const centuries = (jd: number) => (jd - 2451545.0) / 36525;

/** Lahiri (Chitrapaksha) ayanamsha: 23°51'11" at J2000, ~50.29"/year. */
export function lahiriAyanamsha(jd: number): number {
  return 23.8531 + (0.013969 * (jd - 2451545.0)) / 365.25;
}

export const toSidereal = (tropical: number, jd: number) => norm(tropical - lahiriAyanamsha(jd));

function obliquity(T: number) {
  return 23.439291 - 0.0130042 * T;
}

/** Nutation in longitude (degrees), main terms. */
function nutationLongitude(T: number) {
  const omega = 125.04452 - 1934.136261 * T;
  const L = 280.4665 + 36000.7698 * T;
  const Lp = 218.3165 + 481267.8813 * T;
  return (-17.2 * sinD(omega) - 1.32 * sinD(2 * L) - 0.23 * sinD(2 * Lp) + 0.21 * sinD(2 * omega)) / 3600;
}

// ---------------------------------------------------------------- Sun

/** Apparent geocentric ecliptic longitude of the Sun, degrees. */
export function sunLongitude(jd: number): number {
  const T = centuries(jd);
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * sinD(M) +
    (0.019993 - 0.000101 * T) * sinD(2 * M) +
    0.000289 * sinD(3 * M);
  const omega = 125.04 - 1934.136 * T;
  return norm(L0 + C - 0.00569 - 0.00478 * sinD(omega));
}

/** Sun's distance in AU (needed for heliocentric → geocentric planets). */
function sunDistance(jd: number): number {
  const T = centuries(jd);
  const M = 357.52911 + 35999.05029 * T;
  const e = 0.016708634 - 0.000042037 * T;
  const C = (1.914602 - 0.004817 * T) * sinD(M) + 0.019993 * sinD(2 * M);
  const v = M + C;
  return (1.000001018 * (1 - e * e)) / (1 + e * cosD(v));
}

// ---------------------------------------------------------------- Moon

// [D, M, M', F, Σl (1e-6 deg)]
const MOON_LON: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689],
  [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390], [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236],
  [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
  [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110], [3, 0, -1, 0, -892],
  [2, 1, 1, 0, -810], [4, -1, -2, 0, 759], [0, 2, -1, 0, -713], [2, 2, -1, 0, -700],
  [2, 1, -2, 0, 691], [2, -1, 0, -2, 596], [4, 0, 1, 0, 549], [0, 0, 4, 0, 537],
  [4, -1, 0, 0, 520], [1, 0, -2, 0, -487], [2, 1, 0, -2, -399], [0, 0, 2, -2, -381],
  [1, 1, 1, 0, 351], [3, 0, -2, 0, -340], [4, 0, -3, 0, 330], [2, -1, 2, 0, 327],
  [0, 2, 1, 0, -323], [1, 1, -1, 0, 299], [2, 0, 3, 0, 294],
];

// [D, M, M', F, Σb (1e-6 deg)]
const MOON_LAT: [number, number, number, number, number][] = [
  [0, 0, 0, 1, 5128122], [0, 0, 1, 1, 280602], [0, 0, 1, -1, 277693], [2, 0, 0, -1, 173237],
  [2, 0, -1, 1, 55413], [2, 0, -1, -1, 46271], [2, 0, 0, 1, 32573], [0, 0, 2, 1, 17198],
  [2, 0, 1, -1, 9266], [0, 0, 2, -1, 8822], [2, -1, 0, -1, 8216], [2, 0, -2, -1, 4324],
  [2, 0, 1, 1, 4200], [2, 1, 0, -1, -3359], [2, -1, -1, 1, 2463], [2, -1, 0, 1, 2211],
  [2, -1, -1, -1, 2065], [0, 1, -1, -1, -1870], [4, 0, -1, -1, 1828], [0, 1, 0, 1, -1794],
];

function moonArgs(T: number) {
  return {
    Lp: 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841,
    D: 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T * T * T) / 545868,
    M: 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T,
    Mp: 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T * T * T) / 69699,
    F: 93.272095 + 483202.0175233 * T - 0.0036539 * T * T,
    E: 1 - 0.002516 * T - 0.0000074 * T * T,
    A1: 119.75 + 131.849 * T,
    A2: 53.09 + 479264.29 * T,
    A3: 313.45 + 481266.484 * T,
  };
}

function seriesSum(terms: [number, number, number, number, number][], a: ReturnType<typeof moonArgs>) {
  let sum = 0;
  for (const [d, m, mp, f, coeff] of terms) {
    const arg = d * a.D + m * a.M + mp * a.Mp + f * a.F;
    const e = m === 0 ? 1 : Math.abs(m) === 1 ? a.E : a.E * a.E;
    sum += coeff * e * sinD(arg);
  }
  return sum;
}

/** Geometric (no nutation) ecliptic longitude and latitude of the Moon, degrees. */
export function moonPositionGeometric(jd: number): { lon: number; lat: number } {
  const T = centuries(jd);
  const a = moonArgs(T);
  let sl = seriesSum(MOON_LON, a);
  sl += 3958 * sinD(a.A1) + 1962 * sinD(a.Lp - a.F) + 318 * sinD(a.A2);
  let sb = seriesSum(MOON_LAT, a);
  sb +=
    -2235 * sinD(a.Lp) + 382 * sinD(a.A3) + 175 * sinD(a.A1 - a.F) + 175 * sinD(a.A1 + a.F) +
    127 * sinD(a.Lp - a.Mp) - 115 * sinD(a.Lp + a.Mp);
  return { lon: norm(a.Lp + sl / 1e6), lat: sb / 1e6 };
}

/** Apparent ecliptic longitude of the Moon, degrees. */
export function moonLongitude(jd: number): number {
  return norm(moonPositionGeometric(jd).lon + nutationLongitude(centuries(jd)));
}

// ---------------------------------------------------------------- Planets

// a, e, I, L, ϖ (long. of perihelion), Ω, each [value at J2000, rate per century]
type Elements = [number, number][];
const PLANET_ELEMENTS: Record<string, Elements> = {
  Mercury: [[0.38709927, 0.00000037], [0.20563593, 0.00001906], [7.00497902, -0.00594749], [252.2503235, 149472.67411175], [77.45779628, 0.16047689], [48.33076593, -0.12534081]],
  Venus: [[0.72333566, 0.0000039], [0.00677672, -0.00004107], [3.39467605, -0.0007889], [181.9790995, 58517.81538729], [131.60246718, 0.00268329], [76.67984255, -0.27769418]],
  Earth: [[1.00000261, 0.00000562], [0.01671123, -0.00004392], [-0.00001531, -0.01294668], [100.46457166, 35999.37244981], [102.93768193, 0.32327364], [0, 0]],
  Mars: [[1.52371034, 0.00001847], [0.0933941, 0.00007882], [1.84969142, -0.00813131], [-4.55343205, 19140.30268499], [-23.94362959, 0.44441088], [49.55953891, -0.29257343]],
  Jupiter: [[5.202887, -0.00011607], [0.04838624, -0.00013253], [1.30439695, -0.00183714], [34.39644051, 3034.74612775], [14.72847983, 0.21252668], [100.47390909, 0.20469106]],
  Saturn: [[9.53667594, -0.0012506], [0.05386179, -0.00050991], [2.48599187, 0.00193609], [49.95424423, 1222.49362201], [92.59887831, -0.41897216], [113.66242448, -0.28867794]],
};

/** Heliocentric ecliptic rectangular coordinates (AU, J2000 ecliptic). */
function heliocentric(planet: string, jd: number) {
  const T = centuries(jd);
  const [a, e, I, L, peri, node] = PLANET_ELEMENTS[planet].map(([v, r]) => v + r * T);
  const w = peri - node;
  const M = norm(L - peri);
  // Solve Kepler's equation (degrees).
  const eDeg = e * DEG;
  let E = M + eDeg * sinD(M);
  for (let i = 0; i < 8; i++) {
    const dM = M - (E - eDeg * sinD(E));
    E += dM / (1 - e * cosD(E));
  }
  const xp = a * (cosD(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * sinD(E);
  const cw = cosD(w), sw = sinD(w), cO = cosD(node), sO = sinD(node), cI = cosD(I), sI = sinD(I);
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  };
}

/** Geocentric ecliptic longitude (tropical, of-date) of a planet, degrees. */
export function planetLongitude(planet: string, jd: number): number {
  const p = heliocentric(planet, jd);
  const earth = heliocentric("Earth", jd);
  const x = p.x - earth.x;
  const y = p.y - earth.y;
  // J2000 → of-date: add general precession in longitude since J2000.
  const precession = 1.396971 * centuries(jd);
  return norm(Math.atan2(y, x) * DEG + precession);
}

/** Mean lunar node (Rahu), tropical degrees. Ketu is opposite. */
export function rahuLongitude(jd: number): number {
  const T = centuries(jd);
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
}

export const GRAHAS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"] as const;
export type Graha = (typeof GRAHAS)[number];

export function grahaLongitude(graha: Graha, jd: number): number {
  switch (graha) {
    case "Sun": return sunLongitude(jd);
    case "Moon": return moonLongitude(jd);
    case "Rahu": return rahuLongitude(jd);
    case "Ketu": return norm(rahuLongitude(jd) + 180);
    default: return planetLongitude(graha, jd);
  }
}

/** Sidereal longitude and retrograde flag for a graha. */
export function siderealGraha(graha: Graha, jd: number): { lon: number; retrograde: boolean } {
  const lon = toSidereal(grahaLongitude(graha, jd), jd);
  if (graha === "Rahu" || graha === "Ketu") return { lon, retrograde: true };
  if (graha === "Sun" || graha === "Moon") return { lon, retrograde: false };
  const next = toSidereal(grahaLongitude(graha, jd + 1), jd + 1);
  const delta = ((next - lon + 540) % 360) - 180;
  return { lon, retrograde: delta < 0 };
}

// ---------------------------------------------------------------- Panchang angles

/** Moon − Sun elongation (0..360). Ayanamsha cancels, so tropical is fine. */
export function elongation(jd: number) {
  return norm(moonLongitude(jd) - sunLongitude(jd));
}

/** Sidereal Moon longitude (for nakshatra / rashi). */
export function siderealMoon(jd: number) {
  return toSidereal(moonLongitude(jd), jd);
}

/** Sidereal Sun + Moon (for yoga). */
export function yogaAngle(jd: number) {
  return norm(toSidereal(sunLongitude(jd), jd) + siderealMoon(jd));
}

/**
 * Next instant after `jd` at which `angleFn` (increasing, wrapping at 360)
 * reaches the next multiple of `step`. `rate` is a rough degrees/day speed.
 */
export function nextBoundary(angleFn: (jd: number) => number, jd: number, step: number, rate: number): number {
  const a0 = angleFn(jd);
  const target = (Math.floor(a0 / step) + 1) * step;
  let t = jd + (target - a0) / rate;
  for (let i = 0; i < 12; i++) {
    const diff = ((target - angleFn(t) + 540) % 360) - 180;
    if (Math.abs(diff) < 1e-6) break;
    t += diff / rate;
  }
  return t;
}

/** Previous instant before `jd` at which the angle crossed a multiple of `step`. */
export function prevBoundary(angleFn: (jd: number) => number, jd: number, step: number, rate: number): number {
  const a0 = angleFn(jd);
  const target = Math.floor(a0 / step) * step;
  let t = jd - (a0 - target) / rate;
  for (let i = 0; i < 12; i++) {
    const diff = ((target - angleFn(t) + 540) % 360) - 180;
    if (Math.abs(diff) < 1e-6) break;
    t += diff / rate;
  }
  return t;
}

export const jdToDate = (jd: number) => new Date((jd - 2440587.5) * DAY_MS);

// ---------------------------------------------------------------- Rise / set

function equatorial(lon: number, lat: number, jd: number) {
  const eps = obliquity(centuries(jd));
  const ra = Math.atan2(sinD(lon) * cosD(eps) - Math.tan(lat * RAD) * sinD(eps), cosD(lon)) * DEG;
  const dec = Math.asin(sinD(lat) * cosD(eps) + cosD(lat) * sinD(eps) * sinD(lon)) * DEG;
  return { ra: norm(ra), dec };
}

function siderealTime(jd: number) {
  const T = centuries(jd);
  return norm(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T);
}

function altitude(body: "sun" | "moon", jd: number, lat: number, lon: number) {
  const pos = body === "sun" ? { lon: sunLongitude(jd), lat: 0 } : moonPositionGeometric(jd);
  const { ra, dec } = equatorial(pos.lon, pos.lat, jd);
  const H = siderealTime(jd) + lon - ra;
  return Math.asin(sinD(lat) * sinD(dec) + cosD(lat) * cosD(dec) * cosD(H)) * DEG;
}

// Standard altitudes: Sun −0°50' (refraction + semi-diameter); Moon +0.125° (adds parallax).
const H0 = { sun: -0.8333, moon: 0.125 };

/**
 * Rise and set instants of the Sun or Moon within the 24 hours starting at
 * `startMs` (usually local midnight). Either may be null (e.g. Moon some days).
 */
export function riseSet(
  body: "sun" | "moon",
  startMs: number,
  lat: number,
  lon: number
): { rise: Date | null; set: Date | null } {
  const step = 10 * 60 * 1000;
  const h0 = H0[body];
  const f = (ms: number) => altitude(body, ms / DAY_MS + 2440587.5, lat, lon) - h0;
  let rise: Date | null = null;
  let set: Date | null = null;
  let prev = f(startMs);
  for (let t = startMs + step; t <= startMs + DAY_MS; t += step) {
    const cur = f(t);
    if ((prev < 0) !== (cur < 0)) {
      let lo = t - step, hi = t, flo = prev;
      for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        const fm = f(mid);
        if ((flo < 0) === (fm < 0)) { lo = mid; flo = fm; } else hi = mid;
      }
      const when = new Date((lo + hi) / 2);
      if (prev < 0 && !rise) rise = when;
      if (prev >= 0 && !set) set = when;
    }
    prev = cur;
  }
  return { rise, set };
}

// ---------------------------------------------------------------- Time zones

/** Offset of `timeZone` from UTC at instant `ms`, in minutes. */
export function tzOffsetMinutes(ms: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(ms));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - ms) / 60000);
}

/** UTC instant of local midnight for the calendar day y-m-d in `timeZone`. */
export function localMidnight(y: number, m: number, d: number, timeZone: string): number {
  const guess = Date.UTC(y, m, d);
  const off = tzOffsetMinutes(guess, timeZone);
  const first = guess - off * 60000;
  const off2 = tzOffsetMinutes(first, timeZone);
  return guess - off2 * 60000;
}
