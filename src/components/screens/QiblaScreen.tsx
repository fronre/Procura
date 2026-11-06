import React, { useEffect, useState } from 'react';
import {
  Compass,
  Info,
  MapPin,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatNumeral } from '../../utils/prayerTimes';
import { getThemeClasses } from '../../utils/themeStyles';

export const QiblaScreen: React.FC = () => {
  const {
    qiblaBearing,
    distanceToKaaba,
    city,
    numeralType,
    language,
    theme,
  } = useApp();

  const themeClasses = getThemeClasses(theme);

  // Compass heading (degrees 0-360)
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [manualHeading, setManualHeading] = useState<number>(0);

  // Listen to mobile device orientation
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      // webkitCompassHeading on iOS
      if ('webkitCompassHeading' in e && typeof (e as any).webkitCompassHeading === 'number') {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Standard Android: alpha is compass heading inverted
        heading = 360 - e.alpha;
      }

      if (heading !== null) {
        setHasCompassSensor(true);
        setDeviceHeading(Math.round(heading));
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  const activeHeading = hasCompassSensor ? deviceHeading : manualHeading;

  // Relative angle to turn: (Qibla bearing - current heading)
  const angleToTurn = (qiblaBearing - activeHeading + 360) % 360;
  const isAligned = Math.abs(angleToTurn) <= 3 || Math.abs(angleToTurn - 360) <= 3;

  return (
    <div className="space-y-5 pb-24 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-[#F8FAFC]">
          {language === 'ar' ? 'بوصلة القبلة المشرفة' : 'Qibla Compass'}
        </h1>
        <p className="text-xs text-[#94A3B8]">
          {language === 'ar' ? 'اتجه نحو الكعبة المشرفة في مكة المكرمة' : 'Find the direction towards the Holy Kaaba in Makkah'}
        </p>
      </div>

      {/* Alignment Status Banner */}
      <div
        className={`p-3.5 rounded-2xl border text-center transition-all duration-300 ${
          isAligned
            ? 'bg-amber-500/15 border-[#F59E0B] text-[#FCD34D] shadow-lg shadow-amber-950/40'
            : 'bg-[#111B32] border-white/[0.08] text-white/80'
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          {isAligned ? (
            <>
              <Sparkles className="w-4 h-4 text-[#F59E0B] animate-spin" />
              <span>{language === 'ar' ? 'أنت الآن باتجاه القبلة تماماً' : 'You are now directly facing the Qibla!'}</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 text-[#00D4FF]" />
              <span>
                {language === 'ar'
                  ? `أدر جهازك ${formatNumeral(Math.round(angleToTurn > 180 ? 360 - angleToTurn : angleToTurn), numeralType)}° إلى ${angleToTurn > 180 ? 'اليسار' : 'اليمين'}`
                  : `Rotate your device ${formatNumeral(Math.round(angleToTurn > 180 ? 360 - angleToTurn : angleToTurn), numeralType)}° to the ${angleToTurn > 180 ? 'left' : 'right'}`}
              </span>
            </>
          )}
        </div>
      </div>

      {/* CELESTIAL QIBLA COMPASS DIAL (Image_26 section 2/7) */}
      <div className="relative flex items-center justify-center py-6 select-none">
        {/* Infinite depth concentric rings with diminishing opacities (0.15 down to 0.04) */}
        <div className="absolute w-[330px] h-[330px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#00D4FF]/[0.08] pointer-events-none" />
        <div className="absolute w-[270px] h-[270px] rounded-full border border-[#2563EB]/[0.15] pointer-events-none" />

        {/* Main Outer Compass Rose (rotates opposite to device heading) */}
        <div
          className="w-[250px] h-[250px] rounded-full bg-gradient-to-b from-[#111B32] to-[#0B1428] border-2 border-white/[0.12] shadow-2xl relative flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `rotate(${-activeHeading}deg)`,
            boxShadow: isAligned
              ? '0 0 50px rgba(245, 158, 11, 0.35)'
              : '0 0 40px rgba(0, 212, 255, 0.15)',
          }}
        >
          {/* Degree Ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute w-full h-full flex justify-center pt-1 pointer-events-none"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div
                className={`w-0.5 ${
                  deg % 90 === 0 ? 'h-3 bg-[#00D4FF]' : 'h-1.5 bg-white/20'
                }`}
              />
            </div>
          ))}

          {/* Cardinal Directions */}
          <span className="absolute top-3 font-bold text-xs text-red-400 font-mono">N</span>
          <span className="absolute right-3 font-bold text-xs text-white/50 font-mono">E</span>
          <span className="absolute bottom-3 font-bold text-xs text-white/50 font-mono">S</span>
          <span className="absolute left-3 font-bold text-xs text-white/50 font-mono">W</span>

          {/* Golden Kaaba Target Marker at Qibla Bearing */}
          <div
            className="absolute w-full h-full flex justify-center items-start pt-2 pointer-events-none"
            style={{ transform: `rotate(${qiblaBearing}deg)` }}
          >
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-lg bg-black border-2 border-[#F59E0B] flex items-center justify-center shadow-lg shadow-amber-500/40">
                <span className="text-[10px] text-[#FCD34D] font-bold">🕋</span>
              </div>
              <span className="text-[9px] font-bold text-[#F59E0B] mt-0.5 tracking-tighter">
                {language === 'ar' ? 'القبلة' : 'Qibla'}
              </span>
            </div>
          </div>

          {/* Compass Center Core */}
          <div className="w-16 h-16 rounded-full bg-[#050B1B] border border-[#00D4FF]/40 flex flex-col items-center justify-center z-10 shadow-inner">
            <span className="font-mono text-sm font-bold text-[#F8FAFC]">
              {formatNumeral(qiblaBearing, numeralType)}°
            </span>
          </div>

          {/* Cyan Glowing Needle Head (#00D4FF) pointing to Qibla relative to compass */}
          <div
            className="absolute w-full h-full flex justify-center items-center pointer-events-none"
            style={{ transform: `rotate(${qiblaBearing}deg)` }}
          >
            {/* North half needle */}
            <div className="absolute -top-1 w-2 h-20 bg-gradient-to-t from-transparent via-[#00D4FF] to-white rounded-full filter drop-shadow-[0_0_8px_#00D4FF]" />
          </div>
        </div>
      </div>

      {/* Manual Compass Simulation Slider (useful on Desktop or when sensor is inactive) */}
      {!hasCompassSensor && (
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-[#00D4FF]" />
              {language === 'ar' ? 'تدوير البوصلة يدوياً (للتجربة):' : 'Rotate manually (desktop mode):'}
            </span>
            <span className="font-mono font-bold text-white">
              {formatNumeral(manualHeading, numeralType)}°
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={manualHeading}
            onChange={(e) => setManualHeading(Number(e.target.value))}
            className="w-full accent-[#00D4FF] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40">
            <span>0° (شمال)</span>
            <span>90° (شرق)</span>
            <span>180° (جنوب)</span>
            <span>270° (غرب)</span>
          </div>
        </div>
      )}

      {/* Info Card: Bearing, Distance to Kaaba, City */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] text-center">
          <div className="text-xs text-white/50 mb-1">
            {language === 'ar' ? 'زاوية القبلة' : 'Qibla Bearing'}
          </div>
          <div className="text-2xl font-bold font-mono text-[#00D4FF]">
            {formatNumeral(qiblaBearing, numeralType)}°
          </div>
          <div className="text-[11px] text-white/60 mt-0.5">
            {language === 'ar' ? 'من الشمال الجغرافي' : 'From True North'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#111B32] border border-white/[0.08] text-center">
          <div className="text-xs text-white/50 mb-1">
            {language === 'ar' ? 'المسافة إلى مكة' : 'Distance to Kaaba'}
          </div>
          <div className="text-2xl font-bold font-mono text-[#F59E0B]">
            {formatNumeral(distanceToKaaba.toLocaleString(), numeralType)}
          </div>
          <div className="text-[11px] text-white/60 mt-0.5">
            {language === 'ar' ? 'كيلومتر تقريباً' : 'Kilometers (km)'}
          </div>
        </div>
      </div>

      {/* Location reminder */}
      <div className="flex items-center justify-center gap-2 text-xs text-white/50">
        <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
        <span>
          {language === 'ar' ? city.nameAr : city.nameEn} ({formatNumeral(city.lat.toFixed(2), numeralType)}°, {formatNumeral(city.lng.toFixed(2), numeralType)}°)
        </span>
      </div>
    </div>
  );
};
