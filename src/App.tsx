/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioBar } from './components/AudioBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AthkarScreen } from './components/screens/AthkarScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { QiblaScreen } from './components/screens/QiblaScreen';
import { QuranScreen } from './components/screens/QuranScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AppProvider, useApp } from './context/AppContext';
import { getThemeClasses } from './utils/themeStyles';

const MainLayout: React.FC = () => {
  const { activeTab, theme, language } = useApp();
  const themeClasses = getThemeClasses(theme);

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} text-[#F8FAFC] transition-colors duration-300 relative flex flex-col font-sans`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Nocturne Serenity Celestial Micro-Starfield Ambient Background */}
      {theme === 'nocturne' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 left-12 w-1.5 h-1.5 rounded-full bg-[#00D4FF]/40 animate-twinkle-1" />
          <div className="absolute top-36 right-20 w-1 h-1 rounded-full bg-white/40 animate-twinkle-2" />
          <div className="absolute top-72 left-1/4 w-1 h-1 rounded-full bg-[#F59E0B]/50 animate-twinkle-3" />
          <div className="absolute top-96 right-12 w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 animate-twinkle-1" />
          <div className="absolute bottom-40 left-16 w-1 h-1 rounded-full bg-white/30 animate-twinkle-2" />
          <div className="absolute bottom-60 right-1/3 w-1.5 h-1.5 rounded-full bg-[#FCD34D]/40 animate-twinkle-3" />
          {/* Ambient luminous gradients */}
          <div
            className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(0, 212, 255, 0.08) 50%, transparent 75%)',
            }}
          />
        </div>
      )}

      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-3 pb-8 relative z-10">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'quran' && <QuranScreen />}
        {activeTab === 'athkar' && <AthkarScreen />}
        {activeTab === 'qibla' && <QiblaScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </main>

      {/* Floating Audio Bar */}
      <AudioBar />

      {/* Material 3 Bottom Navigation Bar */}
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
