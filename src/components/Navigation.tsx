import React from 'react';
import {
  BookOpen,
  CircleDot,
  Compass,
  Home,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { getThemeClasses } from '../utils/themeStyles';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, language, theme } = useApp();
  const themeClasses = getThemeClasses(theme);

  const navItems: { id: ActiveTab; labelAr: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: Home },
    { id: 'quran', labelAr: 'القرآن', labelEn: 'Quran', icon: BookOpen },
    { id: 'athkar', labelAr: 'الأذكار', labelEn: 'Athkar', icon: CircleDot },
    { id: 'qibla', labelAr: 'القبلة', labelEn: 'Qibla', icon: Compass },
    { id: 'settings', labelAr: 'المزيد', labelEn: 'More', icon: SlidersHorizontal },
  ];

  return (
    <nav
      className={`fixed bottom-0 inset-x-0 z-40 h-[80px] ${themeClasses.surface1} border-t border-white/[0.06] backdrop-blur-xl transition-all flex items-center justify-center px-2 pb-[env(safe-area-inset-bottom)]`}
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="w-full max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center group py-1 px-1 transition-all relative"
            >
              {/* 64dp active pill container */}
              <div
                className={`w-16 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? themeClasses.navActivePill
                    : 'text-[#94A3B8] hover:text-white/80 group-hover:bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-medium mt-1 transition-colors ${
                  isActive
                    ? 'text-[#F8FAFC] font-semibold'
                    : 'text-[#94A3B8] group-hover:text-white/70'
                }`}
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
