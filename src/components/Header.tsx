import React, { useState } from 'react';
import {
  Compass,
  Globe2,
  MapPin,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES, formatNumeral } from '../utils/prayerTimes';
import { getThemeClasses } from '../utils/themeStyles';

export const Header: React.FC = () => {
  const {
    city,
    setCity,
    useLiveGps,
    setUseLiveGps,
    requestUserLocation,
    hijriDate,
    currentTime,
    audioState,
    playAdhan,
    pauseAudio,
    theme,
    language,
    setLanguage,
    numeralType,
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const gregorianFormatted = currentTime.toLocaleDateString(
    language === 'ar' ? 'ar-EG' : 'en-US',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <>
      <header className={`sticky top-0 z-30 px-4 py-3 ${themeClasses.surface1} transition-colors duration-200`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          {/* Location button */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all text-xs font-medium"
            title="تغيير المدينة أو الموقع"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="truncate max-w-[130px] sm:max-w-[200px]">
              {language === 'ar' ? city.nameAr : city.nameEn}
            </span>
            <span className="text-[10px] text-white/50 px-1 py-0.5 rounded bg-white/[0.05]">
              {useLiveGps ? 'GPS' : (language === 'ar' ? city.countryAr : city.countryEn)}
            </span>
          </button>

          {/* Hijri & Gregorian Date */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FCD34D]">
              <Moon className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>
                {formatNumeral(
                  language === 'ar' ? hijriDate.formattedAr : hijriDate.formattedEn,
                  numeralType
                )}
              </span>
            </div>
            <span className={`text-[11px] ${themeClasses.textSecondary}`}>
              {formatNumeral(gregorianFormatted, numeralType)}
            </span>
          </div>

          {/* Action buttons (Audio Adhan preview, Language toggle) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (audioState.isPlaying && audioState.isAdhan) {
                  pauseAudio();
                } else {
                  playAdhan();
                }
              }}
              className={`p-2 rounded-full border transition-all ${
                audioState.isPlaying && audioState.isAdhan
                  ? 'bg-amber-500/20 text-[#F59E0B] border-amber-500/40 animate-pulse'
                  : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08] text-white/80'
              }`}
              title={audioState.isPlaying && audioState.isAdhan ? 'إيقاف الأذان' : 'سماع الأذان'}
            >
              {audioState.isPlaying && audioState.isAdhan ? (
                <VolumeX className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#00D4FF]" />
              )}
            </button>

            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-2 py-1 text-[11px] font-semibold rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/80 transition-all flex items-center gap-1"
              title="تغيير اللغة"
            >
              <Globe2 className="w-3 h-3 text-[#00D4FF]" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md ${themeClasses.cardElevated} rounded-3xl p-6 relative border shadow-2xl`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00D4FF]" />
                <h3 className="font-semibold text-lg">
                  {language === 'ar' ? 'تحديد الموقع والمدينة' : 'Select Location & City'}
                </h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* GPS Auto Detect Button */}
            <button
              onClick={() => {
                requestUserLocation();
                setShowLocationModal(false);
              }}
              className="w-full mb-4 py-3 px-4 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 hover:bg-[#2563EB]/30 text-[#00D4FF] font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-[#00D4FF]" />
              <span>{language === 'ar' ? 'تحديد موقعي بدقة عبر GPS' : 'Auto-detect via GPS'}</span>
            </button>

            <p className="text-xs text-white/60 mb-2">
              {language === 'ar' ? 'أو اختر مدينة من القائمة:' : 'Or choose from cities:'}
            </p>

            {/* City Preset List */}
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
              {CITIES.map((c) => {
                const isSelected = city.id === c.id && !useLiveGps;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setUseLiveGps(false);
                      setCity(c);
                      setShowLocationModal(false);
                    }}
                    className={`w-full p-3 rounded-xl text-start flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-[#2563EB]/30 border-[#00D4FF]/60 text-white font-semibold'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-white/80'
                    }`}
                  >
                    <div>
                      <div className="text-sm">{language === 'ar' ? c.nameAr : c.nameEn}</div>
                      <div className="text-xs text-white/50">{language === 'ar' ? c.countryAr : c.countryEn}</div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-[#00D4FF] font-medium flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {language === 'ar' ? 'الحالية' : 'Active'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
