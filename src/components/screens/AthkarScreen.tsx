import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  CircleDot,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ATHKAR_CATEGORIES, ATHKAR_DATA, TASBEEH_PRESETS } from '../../data/athkarData';
import { formatNumeral } from '../../utils/prayerTimes';
import { getThemeClasses } from '../../utils/themeStyles';

export const AthkarScreen: React.FC = () => {
  const {
    language,
    theme,
    numeralType,
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
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [selectedCategory, setSelectedCategory] = useState<string>('morning');
  const [isPressedTasbeeh, setIsPressedTasbeeh] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Filtered Athkar by category
  const filteredAthkar = useMemo(() => {
    return ATHKAR_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">
            {language === 'ar' ? 'الأذكار والمسبحة' : 'Athkar & Tasbeeh'}
          </h1>
          <p className="text-xs text-[#94A3B8]">
            {language === 'ar' ? 'حصن المسلم والذكر اليومي المستجاب' : 'Daily Islamic Remembrances & Digital Rosary'}
          </p>
        </div>

        {selectedCategory === 'tasbeeh' && (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition-colors"
            title="تصفير العداد"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصفير' : 'Reset'}</span>
          </button>
        )}
      </div>

      {/* Category Filter Chips (Image_26 section 4: Height 36dp, pill 9999dp) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {ATHKAR_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md shadow-blue-900/30 font-semibold'
                  : 'bg-[#0B1428] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{language === 'ar' ? cat.nameAr : cat.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: CIRCULAR DIGITAL TASBEEH COUNTER (Image_26 section 7) */}
      {selectedCategory === 'tasbeeh' ? (
        <div className="space-y-6 pt-2">
          {/* Active Dhikr Selector Pill */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {TASBEEH_PRESETS.map((preset) => {
              const isSelected = tasbeehSelectedDhikr.titleAr === preset.titleAr;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTasbeehSelectedDhikr(preset);
                    setTasbeehTarget(preset.target);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all ${
                    isSelected
                      ? 'bg-[#1A2744] border-[#00D4FF]/60 text-[#00D4FF] font-semibold'
                      : 'bg-[#111B32] border-white/[0.06] text-white/70 hover:text-white'
                  }`}
                >
                  {preset.titleAr}
                </button>
              );
            })}
          </div>

          {/* Dhikr Title Display */}
          <div className="text-center space-y-1">
            <h2 className="font-quran text-2xl sm:text-3xl text-[#FCD34D] font-bold">
              {tasbeehSelectedDhikr.titleAr}
            </h2>
            <p className="text-xs text-[#94A3B8]">
              {language === 'ar' ? 'انقر على الدائرة للعد مع الاهتزاز والصوت' : 'Tap the circle to count with haptic click'}
            </p>
          </div>

          {/* CENTERED CIRCULAR TOUCH SURFACE (220dp x 220dp) WITH LAYERED PULSATING BORDERS & CONCENTRIC RINGS */}
          <div className="flex justify-center items-center py-6">
            <div className="relative flex items-center justify-center">
              {/* Concentric outer decorative rings with diminishing opacities (Image_26 section 2/7) */}
              <div className="absolute w-[310px] h-[310px] rounded-full border border-white/[0.03] pointer-events-none" />
              <div className="absolute w-[270px] h-[270px] rounded-full border border-[#00D4FF]/[0.08] pointer-events-none" />
              <div className="absolute w-[245px] h-[245px] rounded-full border border-[#2563EB]/[0.15] animate-pulse pointer-events-none" />

              {/* Exact 220dp x 220dp Interactive Surface */}
              <button
                type="button"
                onClick={incrementTasbeeh}
                onMouseDown={() => setIsPressedTasbeeh(true)}
                onMouseUp={() => setIsPressedTasbeeh(false)}
                onTouchStart={() => setIsPressedTasbeeh(true)}
                onTouchEnd={() => setIsPressedTasbeeh(false)}
                className={`w-[220px] h-[220px] rounded-full bg-gradient-to-b from-[#1A2744] to-[#111B32] border-2 border-[#00D4FF]/50 shadow-2xl flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-150 relative overflow-hidden group ${
                  isPressedTasbeeh ? 'scale-95 shadow-cyan-900/60 border-[#00D4FF]' : 'scale-100 hover:border-[#00D4FF]/80'
                }`}
                style={{
                  boxShadow: '0 0 45px rgba(0, 212, 255, 0.18), inset 0 0 25px rgba(37, 99, 235, 0.25)',
                }}
              >
                {/* Ambient cosmic sheen inside circle */}
                <div className="absolute inset-0 bg-radial from-[#00D4FF]/10 to-transparent opacity-60 pointer-events-none" />

                {/* Target progress circular arc or label */}
                <span className="text-xs uppercase font-medium tracking-wider text-[#00D4FF] mb-1">
                  {tasbeehTarget > 0 ? (
                    <span>
                      {language === 'ar' ? 'الهدف:' : 'Target:'} {formatNumeral(tasbeehTarget, numeralType)}
                    </span>
                  ) : (
                    language === 'ar' ? 'تسبيح مفتوح' : 'Free Count'
                  )}
                </span>

                {/* Total Count in large 40dp bold typography #F8FAFC (Image_26 section 7) */}
                <span className="text-[44px] sm:text-[48px] font-bold font-mono tracking-tight text-[#F8FAFC] leading-none my-1">
                  {formatNumeral(tasbeehCount, numeralType)}
                </span>

                {/* Laps / Cycles completed */}
                <span className="text-[11px] text-[#F59E0B] font-medium flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {language === 'ar' ? 'الدورات:' : 'Cycles:'} {formatNumeral(tasbeehLaps, numeralType)}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Quick Target Presets (33, 99, 100, Free) */}
          <div className="max-w-xs mx-auto flex items-center justify-center gap-2 pt-2">
            {[33, 99, 100, 0].map((tgt) => {
              const isSelected = tasbeehTarget === tgt;
              return (
                <button
                  key={tgt}
                  onClick={() => setTasbeehTarget(tgt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-[#2563EB] border-[#00D4FF] text-white shadow-md'
                      : 'bg-[#111B32] border-white/[0.08] text-white/70 hover:text-white'
                  }`}
                >
                  {tgt === 0 ? (language === 'ar' ? 'حر' : 'Free') : formatNumeral(tgt, numeralType)}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // VIEW 2: ATHKAR CARDS LIST
        <div className="space-y-3">
          {filteredAthkar.map((thikr) => {
            const current = athkarProgress[thikr.id] || 0;
            const isCompleted = current >= thikr.targetCount;
            const progressPercent = Math.min(100, Math.round((current / thikr.targetCount) * 100));

            return (
              <div
                key={thikr.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                  isCompleted
                    ? 'bg-[#15233e] border-emerald-500/40 shadow-lg'
                    : 'bg-[#111B32] border-white/[0.08]'
                }`}
              >
                {/* Progress bar line at top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/[0.05]">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-[#2563EB]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Thikr Header: Reference & Target Badge */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-[#F59E0B] font-semibold text-[11px]">
                    {thikr.referenceAr}
                  </span>

                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white/70 font-mono">
                    {formatNumeral(current, numeralType)} / {formatNumeral(thikr.targetCount, numeralType)}
                  </span>
                </div>

                {/* Arabic Text with Tashkeel */}
                <p className="font-quran text-lg sm:text-xl text-[#F8FAFC] text-right leading-[2.2] select-text">
                  {thikr.textAr}
                </p>

                {/* English Meaning */}
                {thikr.textEn && (
                  <p className="text-xs text-[#94A3B8] italic mt-2.5 pt-2 border-t border-white/[0.04] leading-relaxed">
                    {thikr.textEn}
                  </p>
                )}

                {/* Virtue / Fadl */}
                {thikr.fadlAr && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#0B1428] border border-white/[0.04] text-[11px] text-[#FCD34D]/90 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{thikr.fadlAr}</span>
                  </div>
                )}

                {/* Action Row */}
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => resetThikr(thikr.id)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
                    title="إعادة العد لهذا الذكر"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => incrementThikr(thikr.id, thikr.targetCount)}
                    disabled={isCompleted}
                    className={`px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md shadow-blue-900/30'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{language === 'ar' ? 'تم بحمد الله' : 'Completed'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>
                          {language === 'ar' ? 'تسبيح' : 'Tap to Count'} (
                          {formatNumeral(current, numeralType)}/{formatNumeral(thikr.targetCount, numeralType)})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-[#111B32] border border-white/[0.1] rounded-3xl p-6 shadow-2xl text-center">
            <h3 className="font-bold text-lg text-white mb-2">
              {language === 'ar' ? 'تصفير عداد المسبحة؟' : 'Reset Tasbeeh Counter?'}
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              {language === 'ar'
                ? 'سيتم إعادة تعيين عدد التسبيحات والدورات المكتملة إلى الصفر.'
                : 'This will reset the total count and completed cycles to zero.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition-colors"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  resetTasbeeh();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white transition-colors"
              >
                {language === 'ar' ? 'تأكيد التصفير' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
