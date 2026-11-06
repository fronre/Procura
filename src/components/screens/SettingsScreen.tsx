import React from 'react';
import {
  Check,
  CheckCircle2,
  Globe,
  Hash,
  Moon,
  Palette,
  Play,
  Sliders,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RECITERS } from '../../data/quranData';
import { ThemeMode } from '../../types';
import { CALCULATION_METHODS, formatNumeral } from '../../utils/prayerTimes';
import { getThemeClasses } from '../../utils/themeStyles';

export const SettingsScreen: React.FC = () => {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    numeralType,
    setNumeralType,
    calculationMethod,
    setCalculationMethod,
    selectedReciter,
    setSelectedReciter,
    hijriAdjustment,
    setHijriAdjustment,
    playAdhan,
    audioState,
    pauseAudio,
  } = useApp();

  const themeClasses = getThemeClasses(theme);

  const themeOptions: {
    id: ThemeMode;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    colors: string[];
    badge: string;
  }[] = [
    {
      id: 'nocturne',
      titleAr: 'السكينة الليلية (Nocturne Serenity)',
      titleEn: 'Nocturne Serenity (Default)',
      subtitleAr: 'سماء ليلية سرمدية، كحلي عميق مع توهج سماوي وذهب مقدس',
      subtitleEn: 'Deep celestial midnight navy with cyan luminescence & gold',
      colors: ['#050B1B', '#111B32', '#2563EB', '#00D4FF', '#F59E0B'],
      badge: 'الأساسي',
    },
    {
      id: 'candy',
      titleAr: 'حلوى مبهجة (Candy Pop)',
      titleEn: 'Candy — Playful & Vibrant',
      subtitleAr: 'ألوان زاهية مبهجة، وردي ساطع وبنفسجي وسماوي',
      subtitleEn: 'Bold joyful pop with hot pink, purple, and sky blue accents',
      colors: ['#fef7ff', '#ffffff', '#e040a0', '#7c52aa', '#0096cc'],
      badge: 'مبهج',
    },
    {
      id: 'obsidian',
      titleAr: 'سبج فائق التباين (Obsidian)',
      titleEn: 'Obsidian — High-Contrast Dark',
      subtitleAr: 'أسود عميق للمطورين، رمادي دقيق مع بنفسجي ناعم وزمرد',
      subtitleEn: 'Developer-grade near-black with soft violet & emerald',
      colors: ['#09090b', '#18181b', '#a78bfa', '#34d399', '#38bdf8'],
      badge: 'داكن جداً',
    },
  ];

  return (
    <div className="space-y-6 pb-24 animate-fade-in max-w-xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">
          {language === 'ar' ? 'الإعدادات والمظهر' : 'Settings & Themes'}
        </h1>
        <p className="text-xs text-[#94A3B8]">
          {language === 'ar' ? 'تخصيص السمات وطرق الحساب واللغة والقراء' : 'Customize theme palettes, calculation methods & reciters'}
        </p>
      </div>

      {/* 1. THEME SWITCHER */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#00D4FF]" />
          <span>{language === 'ar' ? 'نمط المظهر والألوان (Themes)' : 'Design Themes'}</span>
        </h2>

        <div className="space-y-2.5">
          {themeOptions.map((opt) => {
            const isSelected = theme === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1A2744] border-[#00D4FF]/60 shadow-lg shadow-cyan-950/30'
                    : 'bg-[#111B32] border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#F8FAFC]">
                      {language === 'ar' ? opt.titleAr : opt.titleEn}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70">
                      {opt.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#00D4FF] text-black flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#94A3B8] mb-3">
                  {language === 'ar' ? opt.subtitleAr : opt.subtitleEn}
                </p>

                {/* Color swatches */}
                <div className="flex items-center gap-2">
                  {opt.colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. LANGUAGE & NUMERALS */}
      <section className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] space-y-4">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#F59E0B]" />
          <span>{language === 'ar' ? 'اللغة والأرقام' : 'Language & Numerals'}</span>
        </h2>

        {/* Language selector */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/70">
            {language === 'ar' ? 'لغة الواجهة:' : 'Interface Language:'}
          </span>
          <div className="flex items-center gap-1.5 bg-[#0B1428] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setLanguage('ar')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                language === 'ar' ? 'bg-[#2563EB] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              العربية (RTL)
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                language === 'en' ? 'bg-[#2563EB] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              English (LTR)
            </button>
          </div>
        </div>

        {/* Numerals selector */}
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
          <span className="text-xs text-white/70">
            {language === 'ar' ? 'صيغة الأرقام:' : 'Numerals Format:'}
          </span>
          <div className="flex items-center gap-1.5 bg-[#0B1428] p-1 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setNumeralType('eastern')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                numeralType === 'eastern' ? 'bg-[#2563EB] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              مشرقية (١ ٢ ٣)
            </button>
            <button
              onClick={() => setNumeralType('western')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                numeralType === 'western' ? 'bg-[#2563EB] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              غربية (1 2 3)
            </button>
          </div>
        </div>
      </section>

      {/* 3. PRAYER CALCULATION METHOD */}
      <section className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] space-y-3">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#00D4FF]" />
          <span>{language === 'ar' ? 'طريقة حساب مواقيت الصلاة' : 'Prayer Calculation Method'}</span>
        </h2>

        <div className="space-y-1.5">
          {CALCULATION_METHODS.map((method) => {
            const isSelected = calculationMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setCalculationMethod(method.id)}
                className={`w-full p-3 rounded-xl border text-start flex items-center justify-between text-xs transition-all ${
                  isSelected
                    ? 'bg-[#2563EB]/25 border-[#00D4FF]/60 text-white font-semibold'
                    : 'bg-[#0B1428] border-white/[0.04] text-white/70 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-medium">{language === 'ar' ? method.nameAr : method.nameEn}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">
                    الفجر: {method.fajrAngle}° | العشاء: {method.ishaAngle}°
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#00D4FF]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. DEFAULT QURAN RECITER */}
      <section className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] space-y-3">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-[#FCD34D]" />
          <span>{language === 'ar' ? 'القارئ المعتمد لتلاوة القرآن' : 'Default Quran Reciter'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {RECITERS.map((r) => {
            const isSelected = selectedReciter === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedReciter(r.id)}
                className={`p-3 rounded-xl border text-start text-xs flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-[#2563EB]/25 border-[#00D4FF]/60 text-white font-semibold'
                    : 'bg-[#0B1428] border-white/[0.04] text-white/70 hover:text-white'
                }`}
              >
                <span>{language === 'ar' ? r.nameAr : r.nameEn}</span>
                {isSelected && <Check className="w-4 h-4 text-[#00D4FF]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. HIJRI ADJUSTMENT & ADHAN TEST */}
      <section className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] space-y-4">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#F59E0B]" />
          <span>{language === 'ar' ? 'تعديل التاريخ الهجري وتجربة الأذان' : 'Hijri Adjustment & Adhan Preview'}</span>
        </h2>

        {/* Hijri day adjustment */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/80 font-medium">
              {language === 'ar' ? 'تعديل التقويم الهجري:' : 'Hijri Day Adjustment:'}
            </div>
            <div className="text-[11px] text-white/40">
              {language === 'ar' ? 'حسب رؤية الهلال المحلية' : 'According to local moon sighting'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[-2, -1, 0, 1, 2].map((days) => {
              const isSelected = hijriAdjustment === days;
              return (
                <button
                  key={days}
                  onClick={() => setHijriAdjustment(days)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-[#2563EB] border-[#00D4FF] text-white'
                      : 'bg-[#0B1428] border-white/[0.06] text-white/60 hover:text-white'
                  }`}
                >
                  {days > 0 ? `+${days}` : days}
                </button>
              );
            })}
          </div>
        </div>

        {/* Adhan sound preview */}
        <div className="border-t border-white/[0.04] pt-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/80 font-medium">
              {language === 'ar' ? 'أذان الحرم المكي الشريف:' : 'Makkah Adhan Preview:'}
            </div>
            <div className="text-[11px] text-white/40">
              {language === 'ar' ? 'سماع صوت الأذان العذب' : 'Listen to authentic call to prayer'}
            </div>
          </div>

          <button
            onClick={() => {
              if (audioState.isPlaying && audioState.isAdhan) {
                pauseAudio();
              } else {
                playAdhan();
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              audioState.isPlaying && audioState.isAdhan
                ? 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/40 animate-pulse'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{audioState.isPlaying && audioState.isAdhan ? (language === 'ar' ? 'إيقاف' : 'Stop') : (language === 'ar' ? 'سماع الأذان' : 'Play Adhan')}</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-xs text-white/50 space-y-1">
        <p className="font-semibold text-white/70">Nocturne Serenity | السكينة الليلية</p>
        <p>A nocturnal sanctuary for daily prayer, Quranic recitation, and mindfulness.</p>
        <p className="text-[10px] text-white/40 pt-1">Designed with Material 3 Architectural Clarity & Refined Spiritual Minimalism</p>
      </div>
    </div>
  );
};
