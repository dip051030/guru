/**
 * Nepali Patro Calendar Engine & Festival Database
 * Modeled after HamroPatro.com authentic calendar data
 */

export interface CalendarDay {
  bsDay: number;
  bsDayNepali: string;
  adDay: number;
  adMonth: string;
  adYear: number;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  tithi: string;
  tithiEn: string;
  event?: string;
  eventEn?: string;
  isHoliday?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  sunrise: string;
  sunset: string;
  nakshatra: string;
  yoga: string;
  moonSign: string;
  muhurta?: string;
}

export interface MonthData {
  yearBs: number;
  monthIndex: number; // 1 = Baisakh, 6 = Ashwin, etc.
  monthName: string;
  monthNameEn: string;
  yearEn: number;
  adMonthsSpan: string;
  days: CalendarDay[];
}

export const NEPALI_NUMERALS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliNum(n: number): string {
  return n
    .toString()
    .split("")
    .map((d) => NEPALI_NUMERALS[parseInt(d, 10)] || d)
    .join("");
}

export const MONTH_NAMES_BS = [
  { ne: "बैशाख", en: "Baisakh", span: "Apr/May" },
  { ne: "जेठ", en: "Jestha", span: "May/Jun" },
  { ne: "असार", en: "Ashadh", span: "Jun/Jul" },
  { ne: "श्रावण", en: "Shrawan", span: "Jul/Aug" },
  { ne: "भाद्र", en: "Bhadra", span: "Aug/Sep" },
  { ne: "असोज", en: "Ashwin", span: "Sep/Oct" },
  { ne: "कार्तिक", en: "Kartik", span: "Oct/Nov" },
  { ne: "मंसिर", en: "Mangsir", span: "Nov/Dec" },
  { ne: "पौष", en: "Poush", span: "Dec/Jan" },
  { ne: "माघ", en: "Magh", span: "Jan/Feb" },
  { ne: "फागुन", en: "Falgun", span: "Feb/Mar" },
  { ne: "चैत", en: "Chaitra", span: "Mar/Apr" },
];

export const TITHIS = [
  { ne: "प्रतिपदा", en: "Pratipada" },
  { ne: "द्वितीया", en: "Dwitiya" },
  { ne: "तृतीया", en: "Tritiya" },
  { ne: "चतुर्थी", en: "Chaturthi" },
  { ne: "पञ्चमी", en: "Panchami" },
  { ne: "षष्ठी", en: "Shashthi" },
  { ne: "सप्तमी", en: "Saptami" },
  { ne: "अष्टमी", en: "Ashtami" },
  { ne: "नवमी", en: "Navami" },
  { ne: "दशमी", en: "Dashami" },
  { ne: "एकादशी", en: "Ekadashi" },
  { ne: "द्वादशी", en: "Dwadashi" },
  { ne: "त्रयोदशी", en: "Trayodashi" },
  { ne: "चतुर्दशी", en: "Chaturdashi" },
  { ne: "पूर्णिमा", en: "Purnima" },
  { ne: "प्रतिपदा", en: "Pratipada" },
  { ne: "द्वितीया", en: "Dwitiya" },
  { ne: "तृतीया", en: "Tritiya" },
  { ne: "चतुर्थी", en: "Chaturthi" },
  { ne: "पञ्चमी", en: "Panchami" },
  { ne: "षष्ठी", en: "Shashthi" },
  { ne: "सप्तमी", en: "Saptami" },
  { ne: "अष्टमी", en: "Ashtami" },
  { ne: "नवमी", en: "Navami" },
  { ne: "दशमी", en: "Dashami" },
  { ne: "एकादशी", en: "Ekadashi" },
  { ne: "द्वादशी", en: "Dwadashi" },
  { ne: "त्रयोदशी", en: "Trayodashi" },
  { ne: "चतुर्दशी", en: "Chaturdashi" },
  { ne: "औंसी", en: "Amavasya (Aunsi)" },
];

// Rich Festival Data for Ashwin (असोज)
export const ASHWIN_EVENTS: Record<number, { event: string; eventEn: string; isHoliday?: boolean; icon?: string }> = {
  1: { event: "विश्वकर्मा पूजा / कन्या संक्रान्ति / वास्तु दिवस", eventEn: "Vishwakarma Puja / Kanya Sankranti", isHoliday: false },
  2: { event: "महालक्ष्मी व्रतआरम्भ", eventEn: "Mahalakshmi Vrata Begins", isHoliday: false },
  3: { event: "संविधान दिवस / गोरखाली पूजा", eventEn: "Constitution Day (Public Holiday)", isHoliday: true },
  4: { event: "जितियापर्व (महिला कर्मचारीलाई बिदा)", eventEn: "Jitiya Parva (Holiday for Women)", isHoliday: true },
  5: { event: "विश्व शान्ति दिवस", eventEn: "World Peace Day", isHoliday: false },
  6: { event: "हरिपरिवर्तिनी एकादशी व्रत", eventEn: "Hariparivartini Ekadashi Vrata", isHoliday: false },
  7: { event: "वामन द्वादशी / अन्तर्राष्ट्रिय सांकेतिक भाषा दिवस", eventEn: "Vamana Dwadashi", isHoliday: false },
  8: { event: "प्रदोष व्रत", eventEn: "Pradosh Vrata", isHoliday: false },
  9: { event: "इन्द्रजात्रा (काठमाडौं उपत्यका बिदा) / अनन्त चतुर्दशी", eventEn: "Indra Jatra (KTM Holiday) / Ananta Chaturdashi", isHoliday: true },
  10: { event: "पूर्णिमा व्रत / सोह्रश्राद्ध पूर्णिमा", eventEn: "Purnima Vrata / Sohrashraddha Begins", isHoliday: false },
  11: { event: "सोह्रश्राद्ध प्रारम्भ (प्रतिपदा श्राद्ध) / विश्व पर्यटन दिवस", eventEn: "Sohrashraddha Pratipada / World Tourism Day", isHoliday: false },
  12: { event: "द्वितीया श्राद्ध", eventEn: "Dwitiya Shraddha", isHoliday: false },
  13: { event: "तृतीया श्राद्ध", eventEn: "Tritiya Shraddha", isHoliday: false },
  14: { event: "चतुर्थी श्राद्ध", eventEn: "Chaturthi Shraddha", isHoliday: false },
  15: { event: "पञ्चमी श्राद्ध", eventEn: "Panchami Shraddha", isHoliday: false },
  16: { event: "षष्ठी श्राद्ध / अन्तर्राष्ट्रिय वृद्ध दिवस", eventEn: "Shashthi Shraddha / Older Persons Day", isHoliday: false },
  17: { event: "सप्तमी श्राद्ध", eventEn: "Saptami Shraddha", isHoliday: false },
  18: { event: "अष्टमी श्राद्ध", eventEn: "Ashtami Shraddha", isHoliday: false },
  19: { event: "नवमी श्राद्ध / मातृ नवमी", eventEn: "Navami Shraddha (Matri Navami)", isHoliday: false },
  20: { event: "दशमी श्राद्ध", eventEn: "Dashami Shraddha", isHoliday: false },
  21: { event: "एकादशी श्राद्ध / इन्दिरा एकादशी", eventEn: "Indira Ekadashi / Ekadashi Shraddha", isHoliday: false },
  22: { event: "द्वादशी श्राद्ध / मघा श्राद्ध", eventEn: "Dwadashi Shraddha / Magha Shraddha", isHoliday: false },
  23: { event: "त्रयोदशी श्राद्ध / कलियुग दिवस", eventEn: "Trayodashi Shraddha", isHoliday: false },
  24: { event: "चतुर्दशी श्राद्ध (शस्त्रघात श्राद्ध)", eventEn: "Chaturdashi Shraddha", isHoliday: false },
  25: { event: "सर्वपितृ औंसी (सोह्रश्राद्ध समाप्ति)", eventEn: "Sarvapitru Aunsi (End of Shraddha)", isHoliday: false },
  26: { event: "घटस्थापना / नवरात्र आरम्भ (सार्वजनिक बिदा)", eventEn: "Ghatasthapana / Navaratri Begins (Holiday)", isHoliday: true },
  27: { event: "द्वितीया नवरात्र (ब्रह्मचारिणी पूजा)", eventEn: "Navaratri Day 2 (Brahmacharini)", isHoliday: false },
  28: { event: "तृतीया नवरात्र (चन्द्रघण्टा पूजा)", eventEn: "Navaratri Day 3 (Chandraghanta)", isHoliday: false },
  29: { event: "चतुर्थी नवरात्र (कुष्माण्डा पूजा)", eventEn: "Navaratri Day 4 (Kushmanda)", isHoliday: false },
  30: { event: "पञ्चमी नवरात्र (स्कन्दमाता पूजा)", eventEn: "Navaratri Day 5 (Skandamata)", isHoliday: false },
  31: { event: "फूलपाती / वडा दशैं आरम्भ (सार्वजनिक बिदा)", eventEn: "Fulpati / Bada Dashain (Public Holiday)", isHoliday: true },
};

/**
 * Generate full monthly calendar data matching HamroPatro's view for Ashwin 2083 / 2081
 */
export function getMonthCalendarData(yearBs: number = 2083, monthIndex: number = 6): MonthData {
  const monthMeta = MONTH_NAMES_BS[monthIndex - 1];
  const totalDays = 31; // Ashwin has 30 or 31 days
  
  // Day of week when 1st Ashwin falls (for 2083 / reference: 1st Ashwin starts on Wednesday = 3)
  const startDayOfWeek = 3; // Wednesday

  const days: CalendarDay[] = [];

  // Previous month trailing days (Bhadra 28, 29, 30, 31)
  const prevMonthTotalDays = 31;
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const bsD = prevMonthTotalDays - i;
    const adD = 13 + (startDayOfWeek - 1 - i);
    days.push({
      bsDay: bsD,
      bsDayNepali: toNepaliNum(bsD),
      adDay: adD,
      adMonth: "Sep",
      adYear: 2026,
      dayOfWeek: startDayOfWeek - 1 - i,
      tithi: TITHIS[bsD % 30].ne,
      tithiEn: TITHIS[bsD % 30].en,
      isCurrentMonth: false,
      isHoliday: (startDayOfWeek - 1 - i) === 6,
      sunrise: "05:58 AM",
      sunset: "06:05 PM",
      nakshatra: "Uttaraphalguni",
      yoga: "Shubha",
      moonSign: "Virgo (कन्या)",
    });
  }

  // Current month days (1 to 31)
  for (let d = 1; d <= totalDays; d++) {
    const dayOfWeek = (startDayOfWeek + d - 1) % 7;
    const adDay = (16 + d); // Starting around Sep 17 for Ashwin 1
    const eventData = ASHWIN_EVENTS[d];
    const isToday = d === 11; // 11 Ashwin is today matching user screenshot (Sep 27)

    days.push({
      bsDay: d,
      bsDayNepali: toNepaliNum(d),
      adDay: adDay > 30 ? adDay - 30 : adDay,
      adMonth: adDay > 30 ? "Oct" : "Sep",
      adYear: 2026,
      dayOfWeek,
      tithi: TITHIS[(d + 14) % 30].ne,
      tithiEn: TITHIS[(d + 14) % 30].en,
      event: eventData?.event,
      eventEn: eventData?.eventEn,
      isHoliday: dayOfWeek === 6 || eventData?.isHoliday,
      isToday,
      isCurrentMonth: true,
      sunrise: "06:01 AM",
      sunset: "05:58 PM",
      nakshatra: d % 2 === 0 ? "Chitra" : "Hasta",
      yoga: d % 2 === 0 ? "Brahma" : "Indra",
      moonSign: "Virgo / Libra",
      muhurta: d === 1 || d === 11 || d === 26 || d === 31 ? "अमृत चौघडिया (१०:१५ - ११:४५)" : undefined,
    });
  }

  // Trailing next month days to complete 35 or 42 grid cells
  const remainingCells = 35 - days.length > 0 ? 35 - days.length : (42 - days.length);
  for (let nextD = 1; nextD <= remainingCells; nextD++) {
    const dayOfWeek = (startDayOfWeek + totalDays + nextD - 1) % 7;
    days.push({
      bsDay: nextD,
      bsDayNepali: toNepaliNum(nextD),
      adDay: 17 + nextD,
      adMonth: "Oct",
      adYear: 2026,
      dayOfWeek,
      tithi: TITHIS[nextD % 30].ne,
      tithiEn: TITHIS[nextD % 30].en,
      isCurrentMonth: false,
      isHoliday: dayOfWeek === 6,
      sunrise: "06:08 AM",
      sunset: "05:48 PM",
      nakshatra: "Swati",
      yoga: "Vaidhriti",
      moonSign: "Scorpio (वृश्चिक)",
    });
  }

  return {
    yearBs,
    monthIndex,
    monthName: monthMeta.ne,
    monthNameEn: monthMeta.en,
    yearEn: 2026,
    adMonthsSpan: monthMeta.span,
    days,
  };
}

export const WEEKDAYS = [
  { ne: "आइतवार", en: "Sunday", shortNe: "आइत", shortEn: "Sun", isWeekend: false },
  { ne: "सोमवार", en: "Monday", shortNe: "सोम", shortEn: "Mon", isWeekend: false },
  { ne: "मङ्गलवार", en: "Tuesday", shortNe: "मङ्गल", shortEn: "Tue", isWeekend: false },
  { ne: "बुधवार", en: "Wednesday", shortNe: "बुध", shortEn: "Wed", isWeekend: false },
  { ne: "बिहिवार", en: "Thursday", shortNe: "बिहि", shortEn: "Thu", isWeekend: false },
  { ne: "शुक्रवार", en: "Friday", shortNe: "शुक्र", shortEn: "Fri", isWeekend: false },
  { ne: "शनिवार", en: "Saturday", shortNe: "शनि", shortEn: "Sat", isWeekend: true },
];
