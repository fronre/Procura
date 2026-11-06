import { CityLocation, NumeralType, PrayerCalculationMethod, PrayerTime } from '../types';

export const CITIES: CityLocation[] = [
  { id: 'makkah', nameAr: 'مكة المكرمة', nameEn: 'Makkah Al-Mukarramah', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh' },
  { id: 'madinah', nameAr: 'المدينة المنورة', nameEn: 'Al-Madinah Al-Munawwarah', countryAr: 'السعودية', countryEn: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, timezone: 'Asia/Riyadh' },
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', countryAr: 'مصر', countryEn: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo' },
  { id: 'london', nameAr: 'لندن', nameEn: 'London', countryAr: 'المملكة المتحدة', countryEn: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { id: 'istanbul', nameAr: 'إسطنبول', nameEn: 'Istanbul', countryAr: 'تركيا', countryEn: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul' },
  { id: 'dubai', nameAr: 'دبي', nameEn: 'Dubai', countryAr: 'الإمارات', countryEn: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
  { id: 'jakarta', nameAr: 'جاكرتا', nameEn: 'Jakarta', countryAr: 'إندونيسيا', countryEn: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta' },
  { id: 'newyork', nameAr: 'نيويورك', nameEn: 'New York', countryAr: 'الولايات المتحدة', countryEn: 'United States', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { id: 'paris', nameAr: 'باريس', nameEn: 'Paris', countryAr: 'فرنسا', countryEn: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { id: 'kualalumpur', nameAr: 'كوالالمبور', nameEn: 'Kuala Lumpur', countryAr: 'ماليزيا', countryEn: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
];

export const CALCULATION_METHODS: PrayerCalculationMethod[] = [
  { id: 'umm_al_qura', nameAr: 'جامعة أم القرى (مكة)', nameEn: 'Umm Al-Qura University (Makkah)', fajrAngle: 18.5, ishaAngle: 18.5 },
  { id: 'egyptian', nameAr: 'الهيئة المصرية العامة للمساحة', nameEn: 'Egyptian General Authority', fajrAngle: 19.5, ishaAngle: 17.5 },
  { id: 'mwl', nameAr: 'رابطة العالم الإسلامي', nameEn: 'Muslim World League', fajrAngle: 18, ishaAngle: 17 },
  { id: 'isna', nameAr: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA)', nameEn: 'ISNA (North America)', fajrAngle: 15, ishaAngle: 15 },
  { id: 'karachi', nameAr: 'جامعة العلوم الإسلامية بكراتشي', nameEn: 'University of Islamic Sciences, Karachi', fajrAngle: 18, ishaAngle: 18 },
];

export const KAABA_COORDINATES = { lat: 21.4225, lng: 39.8262 };

// Calculate Qibla bearing in degrees from north (0-360)
export function calculateQibla(latitude: number, longitude: number): number {
  const phiK = (KAABA_COORDINATES.lat * Math.PI) / 180.0;
  const lambdaK = (KAABA_COORDINATES.lng * Math.PI) / 180.0;
  const phi = (latitude * Math.PI) / 180.0;
  const lambda = (longitude * Math.PI) / 180.0;

  const numerator = Math.sin(lambdaK - lambda);
  const denominator = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

  let qibla = (Math.atan2(numerator, denominator) * 180.0) / Math.PI;
  if (qibla < 0) {
    qibla += 360;
  }
  return Math.round(qibla);
}

// Calculate distance to Kaaba in kilometers
export function calculateDistanceToKaaba(latitude: number, longitude: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((KAABA_COORDINATES.lat - latitude) * Math.PI) / 180;
  const dLon = ((KAABA_COORDINATES.lng - longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((KAABA_COORDINATES.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Convert numbers to Eastern Arabic numerals if selected
export function formatNumeral(value: number | string, numeralType: NumeralType): string {
  const str = String(value);
  if (numeralType === 'western') return str;

  const easternDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (w) => easternDigits[+w]);
}

// Solar declination & equation of time for prayer calculations
function dtr(d: number) { return (d * Math.PI) / 180.0; }
function rtd(r: number) { return (r * 180.0) / Math.PI; }

function sunPosition(julianDate: number) {
  const D = julianDate - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * Math.sin(dtr(g)) + 0.02 * Math.sin(dtr(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * D;
  const d = rtd(Math.asin(Math.sin(dtr(e)) * Math.sin(dtr(L))));
  let ra = rtd(Math.atan2(Math.cos(dtr(e)) * Math.sin(dtr(L)), Math.cos(dtr(L)))) / 15;
  if (ra < 0) ra += 24;
  const eqt = q / 15 - ra;
  return { declination: d, equationOfTime: eqt };
}

function getJulianDate(date: Date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  let y = year;
  if (month <= 2) {
    y -= 1;
    month += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

export function calculatePrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  methodId: string = 'umm_al_qura'
): PrayerTime[] {
  const method = CALCULATION_METHODS.find((m) => m.id === methodId) || CALCULATION_METHODS[0];
  const jd = getJulianDate(date);
  const { declination, equationOfTime } = sunPosition(jd);

  // Timezone offset in hours
  const timezoneOffset = -date.getTimezoneOffset() / 60;

  // Solar noon
  const transit = 12 + timezoneOffset - lng / 15 - equationOfTime;

  // Hour angles
  const sunAltitudeToHourAngle = (alt: number) => {
    const cosHA =
      (Math.sin(dtr(alt)) - Math.sin(dtr(lat)) * Math.sin(dtr(declination))) /
      (Math.cos(dtr(lat)) * Math.cos(dtr(declination)));
    if (cosHA > 1 || cosHA < -1) return 0;
    return rtd(Math.acos(cosHA)) / 15;
  };

  // Dhuhr
  const dhuhrTime = transit;

  // Sunrise & Sunset (center of sun 0.833 deg below horizon)
  const sunriseHA = sunAltitudeToHourAngle(-0.833);
  const sunriseTime = transit - sunriseHA;
  const sunsetTime = transit + sunriseHA;

  // Fajr
  const fajrHA = sunAltitudeToHourAngle(-method.fajrAngle);
  const fajrTime = transit - fajrHA;

  // Isha
  let ishaTime: number;
  if (method.id === 'umm_al_qura') {
    // 90 minutes after Maghrib
    ishaTime = sunsetTime + 1.5;
  } else {
    const ishaHA = sunAltitudeToHourAngle(-method.ishaAngle);
    ishaTime = transit + ishaHA;
  }

  // Asr (Standard Shafi/Maliki/Hanbali: shadow length = object + noon shadow)
  const noonShadow = Math.tan(dtr(Math.abs(lat - declination)));
  const asrAltitude = rtd(Math.atan(1 / (1 + noonShadow)));
  const asrHA = sunAltitudeToHourAngle(asrAltitude);
  const asrTime = transit + asrHA;

  // Maghrib is sunset
  const maghribTime = sunsetTime;

  const formatHoursToTime = (h: number): { str: string; date: Date } => {
    let cleanH = (h + 24) % 24;
    const hours = Math.floor(cleanH);
    const minutes = Math.floor((cleanH - hours) * 60);
    const pad = (n: number) => (n < 10 ? '0' + n : String(n));

    const prayerDate = new Date(date);
    prayerDate.setHours(hours, minutes, 0, 0);

    return {
      str: `${pad(hours)}:${pad(minutes)}`,
      date: prayerDate,
    };
  };

  const f = formatHoursToTime(fajrTime);
  const s = formatHoursToTime(sunriseTime);
  const d = formatHoursToTime(dhuhrTime);
  const a = formatHoursToTime(asrTime);
  const m = formatHoursToTime(maghribTime);
  const i = formatHoursToTime(ishaTime);

  const now = new Date();

  const prayers: PrayerTime[] = [
    { id: 'fajr', nameAr: 'الفجر', nameEn: 'Fajr', time: f.str, timestamp: f.date, notification: 'athan' },
    { id: 'sunrise', nameAr: 'الشروق', nameEn: 'Sunrise', time: s.str, timestamp: s.date, notification: 'silent' },
    { id: 'dhuhr', nameAr: 'الظهر', nameEn: 'Dhuhr', time: d.str, timestamp: d.date, notification: 'athan' },
    { id: 'asr', nameAr: 'العصر', nameEn: 'Asr', time: a.str, timestamp: a.date, notification: 'athan' },
    { id: 'maghrib', nameAr: 'المغرب', nameEn: 'Maghrib', time: m.str, timestamp: m.date, notification: 'athan' },
    { id: 'isha', nameAr: 'العشاء', nameEn: 'Isha', time: i.str, timestamp: i.date, notification: 'athan' },
  ];

  // Determine passed and next prayer
  let nextFound = false;
  prayers.forEach((prayer) => {
    if (prayer.timestamp < now) {
      prayer.isPassed = true;
    } else if (!nextFound && prayer.id !== 'sunrise') {
      prayer.isNext = true;
      nextFound = true;
    }
  });

  if (!nextFound) {
    // If all passed today, next is Fajr tomorrow
    prayers[0].isNext = true;
  }

  return prayers;
}

// Hijri Date Calculation
export function getHijriDate(gregorianDate: Date, adjustmentDays: number = 0): {
  day: number;
  monthAr: string;
  monthEn: string;
  year: number;
  formattedAr: string;
  formattedEn: string;
} {
  const adjusted = new Date(gregorianDate);
  adjusted.setDate(adjusted.getDate() + adjustmentDays);

  const islamicMonthsAr = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];

  const islamicMonthsEn = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
    'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];

  // Ku-calendar based formula approximation
  const jd = getJulianDate(adjusted);
  const l = Math.floor(jd) - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const m = Math.floor((24 * l3) / 709);
  const d = l3 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  const monthIndex = Math.max(0, Math.min(11, m - 1));
  const monthAr = islamicMonthsAr[monthIndex];
  const monthEn = islamicMonthsEn[monthIndex];

  return {
    day: d,
    monthAr,
    monthEn,
    year: y,
    formattedAr: `${d} ${monthAr} ${y} هـ`,
    formattedEn: `${d} ${monthEn} ${y} AH`,
  };
}
