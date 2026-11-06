import React, { useState } from 'react';
import {
  Bell,
  BellOff,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Compass,
  Play,
  Share2,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatNumeral } from '../../utils/prayerTimes';
import { getThemeClasses } from '../../utils/themeStyles';

export const HomeScreen: React.FC = () => {
  const {
    prayerTimes,
    nextPrayer,
    countdown,
    qiblaBearing,
    city,
    hijriDate,
    setActiveTab,
    numeralType,
    language,
    theme,
    lastRead,
    setSelectedSurahNumber,
    playAyah,
    playAdhan,
    audioState,
    tasbeehCount,
    tasbeehTarget,
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [copiedAyah, setCopiedAyah] = useState(false);

  // Daily Ayah of the day
  const dailyAyah = {
    surahNumber: 2,
    ayahNumber: 255,
    surahNameAr: 'سورة البقرة',
    surahNameEn: 'Al-Baqarah',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep.',
  };

  const isMorning = new Date().getHours() < 16 && new Date().getHours() >= 4;

  const handleShareAyah = () => {
    const text = `«${dailyAyah.arabic}»\n[${dailyAyah.surahNameAr} - آية ${dailyAyah.ayahNumber}]`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedAyah(true);
      setTimeout(() => setCopiedAyah(false), 2000);
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-fade-in">
      {/* 1. HERO "Next Prayer" Card (as explicitly specified in Image_26 section 2) */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#111B32] border border-[#00D4FF]/25 shadow-xl shadow-cyan-950/20 p-5">
        {/* Ambient top-end sheen of #00D4FF at 10% opacity */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 75%)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header Row: Label & Qibla Angle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-medium text-[#00D4FF]">
                {language === 'ar' ? 'الصلاة القادمة' : 'NEXT PRAYER'}
              </span>
            </div>

            {/* Qibla Angle indicator */}
            <button
              onClick={() => setActiveTab('qibla')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white/80 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="font-mono">
                {formatNumeral(qiblaBearing, numeralType)}°
              </span>
              <span className="text-[10px] text-white/50">
                {language === 'ar' ? 'القبلة' : 'Qibla'}
              </span>
            </button>
          </div>

          {/* Salah Name & Live Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                {language === 'ar' ? nextPrayer?.nameAr : nextPrayer?.nameEn}
              </h1>
              <p className="text-sm text-[#94A3B8] mt-0.5">
                {language === 'ar' ? 'يحين وقتها الساعة' : 'Due at'}{' '}
                <span className="text-[#F8FAFC] font-semibold">
                  {formatNumeral(nextPrayer?.time || '--:--', numeralType)}
                </span>
              </p>
            </div>

            {/* Monospaced Live Countdown */}
            <div className="bg-[#0B1428]/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/[0.08] self-start sm:self-auto flex flex-col items-center">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-medium">
                {language === 'ar' ? 'متبقي حتى الأذان' : 'TIME REMAINING'}
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#00D4FF] tracking-widest">
                {formatNumeral(countdown.formatted, numeralType)}
              </span>
            </div>
          </div>

          {/* Quick Action: Listen to Adhan / Prayer reminder */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <button
              onClick={playAdhan}
              className="flex items-center gap-2 text-xs font-medium text-[#F8FAFC] hover:text-[#00D4FF] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#2563EB]/25 border border-[#00D4FF]/30 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current text-[#00D4FF]" />
              </div>
              <span>{language === 'ar' ? 'سماع أذان الحرم المكي' : 'Listen to Makkah Adhan'}</span>
            </button>

            <span className="text-xs text-white/50">
              {language === 'ar' ? city.nameAr : city.nameEn}
            </span>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S PRAYER TIMES TIMELINE */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold tracking-wide text-white/80 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>{language === 'ar' ? 'مواقيت الصلاة اليوم' : 'Today\'s Prayer Times'}</span>
          </h2>
          <span className="text-xs text-white/50 font-mono">
            {formatNumeral(hijriDate.formattedAr, numeralType)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {prayerTimes.map((prayer) => {
            const isNext = prayer.isNext;
            const isPassed = prayer.isPassed;

            return (
              <div
                key={prayer.id}
                className={`relative p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isNext
                    ? 'bg-[#1A2744] border-[#00D4FF]/40 shadow-lg shadow-cyan-950/30'
                    : isPassed
                    ? 'bg-[#111B32]/60 border-white/[0.04] opacity-75'
                    : 'bg-[#111B32] border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isNext ? 'text-[#00D4FF] font-semibold' : 'text-white/90'}`}>
                    {language === 'ar' ? prayer.nameAr : prayer.nameEn}
                  </span>

                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400/80" />
                  ) : prayer.notification === 'athan' ? (
                    <Bell className={`w-3.5 h-3.5 ${isNext ? 'text-[#00D4FF]' : 'text-white/40'}`} />
                  ) : (
                    <BellOff className="w-3.5 h-3.5 text-white/30" />
                  )}
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className={`text-xl font-bold font-mono ${isNext ? 'text-[#F8FAFC]' : 'text-white/85'}`}>
                    {formatNumeral(prayer.time, numeralType)}
                  </span>

                  {isNext && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] font-semibold">
                      {language === 'ar' ? 'الآن' : 'Next'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SPIRITUAL SHORTCUTS: ATHKAR & QURAN RESUME */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Daily Athkar Tile */}
        <div
          onClick={() => setActiveTab('athkar')}
          className="group cursor-pointer p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] hover:border-[#00D4FF]/40 hover:bg-[#1A2744] transition-all flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#00D4FF] group-hover:scale-105 transition-transform">
              <CircleDot className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-white/50 font-medium">
                {isMorning ? (language === 'ar' ? 'حان وقت' : 'Recommended') : (language === 'ar' ? 'حان وقت' : 'Recommended')}
              </div>
              <div className="text-sm font-bold text-[#F8FAFC]">
                {isMorning ? (language === 'ar' ? 'أذكار الصباح' : 'Morning Athkar') : (language === 'ar' ? 'أذكار المساء' : 'Evening Athkar')}
              </div>
              <div className="text-[11px] text-[#F59E0B] mt-0.5 flex items-center gap-1">
                <span>{language === 'ar' ? 'تسبيح اليوم:' : 'Tasbeeh:'}</span>
                <span className="font-mono font-bold">{formatNumeral(tasbeehCount, numeralType)}/{formatNumeral(tasbeehTarget, numeralType)}</span>
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-[#2563EB] transition-colors">
            {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </div>

        {/* Continue Quran Reading Tile */}
        <div
          onClick={() => {
            setSelectedSurahNumber(lastRead.surahNumber);
            setActiveTab('quran');
          }}
          className="group cursor-pointer p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] hover:border-[#F59E0B]/40 hover:bg-[#1A2744] transition-all flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B] group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-white/50 font-medium">
                {language === 'ar' ? 'متابعة التلاوة' : 'Continue Reciting'}
              </div>
              <div className="text-sm font-bold text-[#F8FAFC]">
                {language === 'ar' ? lastRead.surahNameAr : lastRead.surahNameEn}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">
                {language === 'ar' ? `آية رقم ${formatNumeral(lastRead.ayahNumber, numeralType)}` : `Verse ${formatNumeral(lastRead.ayahNumber, numeralType)}`}
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-[#F59E0B] transition-colors">
            {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </div>
      </section>

      {/* 4. AYAH OF THE DAY (آية اليوم) */}
      <section className="p-5 rounded-[24px] bg-[#111B32] border border-white/[0.08] relative overflow-hidden">
        {/* Subtle celestial gold corner badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-xs uppercase font-semibold text-[#FCD34D]">
              {language === 'ar' ? 'آية اليوم المباركة' : 'VERSE OF THE DAY'}
            </span>
          </div>

          <span className="text-xs text-white/50">
            {language === 'ar' ? dailyAyah.surahNameAr : dailyAyah.surahNameEn} • {formatNumeral(dailyAyah.ayahNumber, numeralType)}
          </span>
        </div>

        {/* Sacred Arabic Text */}
        <p className="font-quran text-xl sm:text-2xl text-[#F8FAFC] text-right leading-[2.2] my-2 select-text">
          {dailyAyah.arabic}
        </p>

        {/* English Translation */}
        <p className="text-xs sm:text-sm text-[#94A3B8] italic mt-2 leading-relaxed border-t border-white/[0.06] pt-3">
          "{dailyAyah.translation}"
        </p>

        {/* Action Row */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <button
            onClick={() => playAyah(dailyAyah.surahNumber, dailyAyah.ayahNumber, dailyAyah.surahNameAr)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/25 border border-[#2563EB]/50 hover:bg-[#2563EB]/40 text-[#00D4FF] text-xs font-medium transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استماع للآية' : 'Listen'}</span>
          </button>

          <button
            onClick={handleShareAyah}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedAyah ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'مشاركة' : 'Share')}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
