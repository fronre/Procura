export type ThemeMode = 'nocturne' | 'candy' | 'obsidian';
export type Language = 'ar' | 'en';
export type NumeralType = 'eastern' | 'western';
export type ActiveTab = 'home' | 'quran' | 'athkar' | 'qibla' | 'settings';

export interface PrayerTime {
  id: string;
  nameAr: string;
  nameEn: string;
  time: string; // e.g. "05:14"
  timestamp: Date;
  isNext?: boolean;
  isPassed?: boolean;
  notification: 'athan' | 'beep' | 'silent';
}

export interface CityLocation {
  id: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface SurahMeta {
  number: number;
  nameAr: string;
  nameEn: string;
  englishMeaning: string;
  totalVerses: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeAr: 'مكية' | 'مدنية';
  juz: number;
}

export interface Ayah {
  numberInSurah: number;
  textAr: string;
  textEn: string;
  tafsir?: string;
  audioUrl?: string;
  page?: number;
  juz?: number;
}

export interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  surahNameAr: string;
  surahNameEn: string;
  timestamp: number;
}

export interface ThikrItem {
  id: string;
  category: 'morning' | 'evening' | 'after_prayer' | 'sleep' | 'duas';
  textAr: string;
  textEn?: string;
  fadlAr?: string;
  fadlEn?: string;
  targetCount: number;
  currentCount: number;
  referenceAr?: string;
}

export interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  serverUrl: string;
}

export interface PrayerCalculationMethod {
  id: string;
  nameAr: string;
  nameEn: string;
  fajrAngle: number;
  ishaAngle: number;
}
