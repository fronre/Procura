import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ATHKAR_DATA, TASBEEH_PRESETS } from '../data/athkarData';
import { RECITERS } from '../data/quranData';
import {
  ActiveTab,
  Bookmark,
  CityLocation,
  Language,
  NumeralType,
  PrayerTime,
  ThemeMode,
} from '../types';
import {
  playAdhanAudio,
  playRecitationAudio,
  playTargetReachedSound,
  playTasbeehClickSound,
  stopCurrentAudio,
} from '../utils/audio';
import {
  calculateDistanceToKaaba,
  calculatePrayerTimes,
  calculateQibla,
  CITIES,
  getHijriDate,
} from '../utils/prayerTimes';

interface AudioPlaybackState {
  isPlaying: boolean;
  surahNumber?: number;
  ayahNumber?: number;
  title?: string;
  reciterName?: string;
  isAdhan?: boolean;
}

interface AppContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  numeralType: NumeralType;
  setNumeralType: (n: NumeralType) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // City & Location
  city: CityLocation;
  setCity: (c: CityLocation) => void;
  useLiveGps: boolean;
  setUseLiveGps: (val: boolean) => void;
  requestUserLocation: () => void;

  // Prayer Times & Calculations
  calculationMethod: string;
  setCalculationMethod: (m: string) => void;
  hijriAdjustment: number;
  setHijriAdjustment: (days: number) => void;
  prayerTimes: PrayerTime[];
  nextPrayer: PrayerTime | null;
  countdown: { hours: number; minutes: number; seconds: number; formatted: string };
  currentTime: Date;
  hijriDate: { formattedAr: string; formattedEn: string; day: number; monthAr: string; monthEn: string; year: number };
  qiblaBearing: number;
  distanceToKaaba: number;

  // Quran
  selectedReciter: string;
  setSelectedReciter: (r: string) => void;
  selectedSurahNumber: number;
  setSelectedSurahNumber: (num: number) => void;
  bookmarks: Bookmark[];
  toggleBookmark: (surahNumber: number, ayahNumber: number, surahNameAr: string, surahNameEn: string) => void;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  lastRead: { surahNumber: number; ayahNumber: number; surahNameAr: string; surahNameEn: string };
  setLastReadPosition: (surahNumber: number, ayahNumber: number, surahNameAr: string, surahNameEn: string) => void;

  // Athkar & Tasbeeh
  athkarProgress: Record<string, number>;
  incrementThikr: (thikrId: string, maxTarget: number) => void;
  resetThikr: (thikrId: string) => void;
  tasbeehCount: number;
  tasbeehTarget: number;
  setTasbeehTarget: (t: number) => void;
  tasbeehSelectedDhikr: { titleAr: string; titleEn: string };
  setTasbeehSelectedDhikr: (d: { titleAr: string; titleEn: string }) => void;
  tasbeehLaps: number;
  incrementTasbeeh: () => void;
  resetTasbeeh: () => void;

  // Audio Player
  audioState: AudioPlaybackState;
  playAyah: (surahNumber: number, ayahNumber: number, surahNameAr?: string) => void;
  playAdhan: () => void;
  pauseAudio: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('nocturne_theme') as ThemeMode) || 'nocturne';
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('nocturne_theme', t);
  };

  // Language & Numerals
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('nocturne_lang') as Language) || 'ar';
  });
  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('nocturne_lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  const [numeralType, setNumeralTypeState] = useState<NumeralType>(() => {
    return (localStorage.getItem('nocturne_numerals') as NumeralType) || 'western';
  });
  const setNumeralType = (n: NumeralType) => {
    setNumeralTypeState(n);
    localStorage.setItem('nocturne_numerals', n);
  };

  // Tab navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Location
  const [city, setCity] = useState<CityLocation>(CITIES[0]); // Makkah by default
  const [useLiveGps, setUseLiveGps] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

  const requestUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setGpsCoords({ lat, lng });
          setUseLiveGps(true);
          setCity({
            id: 'gps',
            nameAr: 'موقعي الحالي (GPS)',
            nameEn: 'My Location (GPS)',
            countryAr: 'محدد تلقائياً',
            countryEn: 'Auto-detected',
            lat,
            lng,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
        },
        () => {
          // If denied, remain on current city
        }
      );
    }
  };

  // Prayer settings
  const [calculationMethod, setCalculationMethod] = useState('umm_al_qura');
  const [hijriAdjustment, setHijriAdjustment] = useState(0);

  // Quran state
  const [selectedReciter, setSelectedReciter] = useState('Alafasy_128kbps');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('nocturne_bookmarks');
    return saved ? JSON.parse(saved) : [{ surahNumber: 2, ayahNumber: 255, surahNameAr: 'البقرة', surahNameEn: 'Al-Baqarah', timestamp: Date.now() }];
  });

  const [lastRead, setLastRead] = useState(() => {
    const saved = localStorage.getItem('nocturne_last_read');
    return saved ? JSON.parse(saved) : { surahNumber: 18, ayahNumber: 1, surahNameAr: 'الكهف', surahNameEn: 'Al-Kahf' };
  });

  const toggleBookmark = (surahNumber: number, ayahNumber: number, surahNameAr: string, surahNameEn: string) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
      } else {
        updated = [...prev, { surahNumber, ayahNumber, surahNameAr, surahNameEn, timestamp: Date.now() }];
      }
      localStorage.setItem('nocturne_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number) => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  const setLastReadPosition = (surahNumber: number, ayahNumber: number, surahNameAr: string, surahNameEn: string) => {
    const state = { surahNumber, ayahNumber, surahNameAr, surahNameEn };
    setLastRead(state);
    localStorage.setItem('nocturne_last_read', JSON.stringify(state));
  };

  // Tasbeeh & Athkar
  const [athkarProgress, setAthkarProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('nocturne_athkar');
    return saved ? JSON.parse(saved) : {};
  });

  const incrementThikr = (thikrId: string, maxTarget: number) => {
    setAthkarProgress((prev) => {
      const current = prev[thikrId] || 0;
      if (current >= maxTarget) return prev;
      playTasbeehClickSound();
      const nextVal = current + 1;
      if (nextVal === maxTarget) {
        playTargetReachedSound();
      }
      const updated = { ...prev, [thikrId]: nextVal };
      localStorage.setItem('nocturne_athkar', JSON.stringify(updated));
      return updated;
    });
  };

  const resetThikr = (thikrId: string) => {
    setAthkarProgress((prev) => {
      const updated = { ...prev, [thikrId]: 0 };
      localStorage.setItem('nocturne_athkar', JSON.stringify(updated));
      return updated;
    });
  };

  const [tasbeehCount, setTasbeehCount] = useState<number>(0);
  const [tasbeehTarget, setTasbeehTarget] = useState<number>(33);
  const [tasbeehSelectedDhikr, setTasbeehSelectedDhikr] = useState<{ titleAr: string; titleEn: string }>(TASBEEH_PRESETS[0]);
  const [tasbeehLaps, setTasbeehLaps] = useState<number>(0);

  const incrementTasbeeh = () => {
    playTasbeehClickSound();
    setTasbeehCount((prev) => {
      const next = prev + 1;
      if (tasbeehTarget > 0 && next >= tasbeehTarget) {
        playTargetReachedSound();
        setTasbeehLaps((l) => l + 1);
        return 0; // reset to 0 for next cycle
      }
      return next;
    });
  };

  const resetTasbeeh = () => {
    setTasbeehCount(0);
    setTasbeehLaps(0);
  };

  // Clock & Prayer Times
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeLat = useLiveGps && gpsCoords ? gpsCoords.lat : city.lat;
  const activeLng = useLiveGps && gpsCoords ? gpsCoords.lng : city.lng;

  const prayerTimes = useMemo(() => {
    return calculatePrayerTimes(currentTime, activeLat, activeLng, calculationMethod);
  }, [currentTime, activeLat, activeLng, calculationMethod]);

  const nextPrayer = useMemo(() => {
    return prayerTimes.find((p) => p.isNext) || prayerTimes[0];
  }, [prayerTimes]);

  const countdown = useMemo(() => {
    if (!nextPrayer) return { hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00' };

    let targetDate = new Date(nextPrayer.timestamp);
    if (targetDate.getTime() < currentTime.getTime()) {
      // It's Fajr tomorrow
      targetDate = new Date(targetDate.getTime() + 24 * 60 * 60 * 1000);
    }

    const diff = Math.max(0, targetDate.getTime() - currentTime.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n: number) => String(n).padStart(2, '0');
    return {
      hours,
      minutes,
      seconds,
      formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    };
  }, [nextPrayer, currentTime]);

  const hijriDate = useMemo(() => {
    return getHijriDate(currentTime, hijriAdjustment);
  }, [currentTime, hijriAdjustment]);

  const qiblaBearing = useMemo(() => {
    return calculateQibla(activeLat, activeLng);
  }, [activeLat, activeLng]);

  const distanceToKaaba = useMemo(() => {
    return calculateDistanceToKaaba(activeLat, activeLng);
  }, [activeLat, activeLng]);

  // Audio Player State
  const [audioState, setAudioState] = useState<AudioPlaybackState>({
    isPlaying: false,
  });

  const playAyah = (surahNumber: number, ayahNumber: number, surahNameAr?: string) => {
    const reciter = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];
    setAudioState({
      isPlaying: true,
      surahNumber,
      ayahNumber,
      title: `${surahNameAr || `سورة ${surahNumber}`} - آية ${ayahNumber}`,
      reciterName: reciter.nameAr,
      isAdhan: false,
    });

    playRecitationAudio(
      surahNumber,
      ayahNumber,
      selectedReciter,
      () => {
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      },
      () => {
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      }
    );
  };

  const playAdhan = () => {
    setAudioState({
      isPlaying: true,
      title: 'أذان الحرم المكي الشريف',
      reciterName: 'مؤذن المسجد الحرام',
      isAdhan: true,
    });

    playAdhanAudio(() => {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    });
  };

  const pauseAudio = () => {
    stopCurrentAudio();
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        numeralType,
        setNumeralType,
        activeTab,
        setActiveTab,
        city,
        setCity,
        useLiveGps,
        setUseLiveGps,
        requestUserLocation,
        calculationMethod,
        setCalculationMethod,
        hijriAdjustment,
        setHijriAdjustment,
        prayerTimes,
        nextPrayer,
        countdown,
        currentTime,
        hijriDate,
        qiblaBearing,
        distanceToKaaba,
        selectedReciter,
        setSelectedReciter,
        selectedSurahNumber,
        setSelectedSurahNumber,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        lastRead,
        setLastReadPosition,
        athkarProgress,
        incrementThikr,
        resetThikr,
        tasbeehCount,
        tasbeehTarget,
        setTasbeehTarget,
        tasbeehSelectedDhikr,
        setTasbeehSelectedDhikr,
        tasbeehLaps,
        incrementTasbeeh,
        resetTasbeeh,
        audioState,
        playAyah,
        playAdhan,
        pauseAudio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
