import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  Copy,
  Info,
  Play,
  Search,
  Share2,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RECITERS, SURAH_AYAHS, SURAH_LIST } from '../../data/quranData';
import { Ayah, SurahMeta } from '../../types';
import { formatNumeral } from '../../utils/prayerTimes';
import { getThemeClasses } from '../../utils/themeStyles';

export const QuranScreen: React.FC = () => {
  const {
    language,
    theme,
    numeralType,
    selectedSurahNumber,
    setSelectedSurahNumber,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    setLastReadPosition,
    playAyah,
    selectedReciter,
    setSelectedReciter,
  } = useApp();

  const themeClasses = getThemeClasses(theme);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan' | 'bookmarks'>('all');

  // Reader state
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [activeAyahForAction, setActiveAyahForAction] = useState<Ayah | null>(null);
  const [showTafsirModal, setShowTafsirModal] = useState<Ayah | null>(null);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);
  const [showReciterSelector, setShowReciterSelector] = useState(false);

  // Filtered surah list
  const filteredSurahs = useMemo(() => {
    return SURAH_LIST.filter((s) => {
      // Filter by type
      if (filterType === 'meccan' && s.revelationType !== 'Meccan') return false;
      if (filterType === 'medinan' && s.revelationType !== 'Medinan') return false;
      if (filterType === 'bookmarks') {
        const hasBookmark = bookmarks.some((b) => b.surahNumber === s.number);
        if (!hasBookmark) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchNameAr = s.nameAr.includes(q);
        const matchNameEn = s.nameEn.toLowerCase().includes(q);
        const matchMeaning = s.englishMeaning.toLowerCase().includes(q);
        const matchNumber = String(s.number) === q;
        return matchNameAr || matchNameEn || matchMeaning || matchNumber;
      }

      return true;
    });
  }, [searchQuery, filterType, bookmarks]);

  const currentSurah = useMemo(() => {
    return SURAH_LIST.find((s) => s.number === selectedSurahNumber) || SURAH_LIST[0];
  }, [selectedSurahNumber]);

  // Ayahs for current Surah
  const currentAyahs: Ayah[] = useMemo(() => {
    if (SURAH_AYAHS[selectedSurahNumber]) {
      return SURAH_AYAHS[selectedSurahNumber];
    }
    // Fallback template ayahs for Surahs where sample subset is not preloaded
    const list: Ayah[] = [];
    for (let i = 1; i <= Math.min(10, currentSurah.totalVerses); i++) {
      list.push({
        numberInSurah: i,
        textAr: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - آية ${i} من سورة ${currentSurah.nameAr}`,
        textEn: `In the name of Allah, verse ${i} of Surah ${currentSurah.nameEn}`,
        tafsir: `تفسير الآية الكريمة ${i} من سورة ${currentSurah.nameAr}`,
      });
    }
    return list;
  }, [selectedSurahNumber, currentSurah]);

  const handleOpenSurah = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setIsReadingMode(true);
    setLastReadPosition(
      surahNumber,
      1,
      currentSurah.nameAr,
      currentSurah.nameEn
    );
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `«${ayah.textAr}» [${currentSurah.nameAr}: ${ayah.numberInSurah}]`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedAyahNum(ayah.numberInSurah);
      setTimeout(() => setCopiedAyahNum(null), 2000);
    }
  };

  const currentReciterObj = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {!isReadingMode ? (
        // SURAH INDEX VIEW
        <>
          {/* Header & Search */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#F8FAFC]">
                  {language === 'ar' ? 'القرآن الكريم' : 'The Noble Quran'}
                </h1>
                <p className="text-xs text-[#94A3B8]">
                  {language === 'ar' ? '١١٤ سورة - تلاوة مباركة وتدبر' : '114 Surahs - Recitation & Tafsir'}
                </p>
              </div>

              {/* Reciter Badge Button */}
              <button
                onClick={() => setShowReciterSelector(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111B32] border border-white/[0.08] hover:border-[#00D4FF]/40 text-xs text-[#00D4FF] transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px]">{language === 'ar' ? currentReciterObj.nameAr : currentReciterObj.nameEn}</span>
              </button>
            </div>

            {/* Search Input (as specified in Image_26 section 6: 56dp height, surface #0B1428, corner radius 16dp) */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث باسم السورة أو رقمها...' : 'Search by Surah name or number...'}
                className="w-full h-14 px-11 rounded-2xl bg-[#0B1428] border border-white/[0.08] focus:border-[#2563EB] focus:ring-2 focus:ring-[#00D4FF]/20 text-[#F8FAFC] placeholder-white/40 text-sm outline-none transition-all"
              />
              <Search className="w-5 h-5 text-[#94A3B8] absolute right-4 top-4.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-4 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter Chips (Image_26 section 4: Height 36dp, pill 9999dp) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', labelAr: 'جميع السور', labelEn: 'All Surahs' },
                { id: 'meccan', labelAr: 'مكية', labelEn: 'Meccan' },
                { id: 'medinan', labelAr: 'مدنية', labelEn: 'Medinan' },
                { id: 'bookmarks', labelAr: `العلامات (${bookmarks.length})`, labelEn: `Bookmarks (${bookmarks.length})` },
              ].map((chip) => {
                const isActive = filterType === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setFilterType(chip.id as any)}
                    className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md shadow-blue-900/30 font-semibold'
                        : 'bg-[#0B1428] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {language === 'ar' ? chip.labelAr : chip.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Surahs List */}
          <div className="space-y-2 mt-2">
            {filteredSurahs.length === 0 ? (
              <div className="text-center py-12 text-white/50 text-sm">
                {language === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching Surahs found'}
              </div>
            ) : (
              filteredSurahs.map((surah) => {
                const hasBookmark = bookmarks.some((b) => b.surahNumber === surah.number);

                return (
                  <div
                    key={surah.number}
                    onClick={() => handleOpenSurah(surah.number)}
                    className="group cursor-pointer p-3.5 rounded-2xl bg-[#111B32] border border-white/[0.08] hover:border-[#00D4FF]/40 hover:bg-[#1A2744] transition-all flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Gold Circular Surah Index Badge (Image_26 section 5) */}
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#F59E0B]/40 text-[#F59E0B] flex items-center justify-center font-bold text-sm shrink-0">
                        {formatNumeral(surah.number, numeralType)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#F8FAFC] group-hover:text-[#00D4FF] transition-colors">
                            {surah.nameAr}
                          </h3>
                          {hasBookmark && (
                            <BookMarked className="w-3.5 h-3.5 text-[#F59E0B]" />
                          )}
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          {surah.nameEn} • {surah.englishMeaning}
                        </div>
                      </div>
                    </div>

                    <div className="text-left flex flex-col items-end">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/70 font-medium">
                        {language === 'ar' ? surah.revelationTypeAr : surah.revelationType}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] mt-1 font-mono">
                        {formatNumeral(surah.totalVerses, numeralType)} {language === 'ar' ? 'آية' : 'ayahs'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        // AYAH READING STAGE (Surah Reader View)
        <div className="space-y-4">
          {/* Top Reader Navigation Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <button
              onClick={() => setIsReadingMode(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white/90 transition-colors"
            >
              {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{language === 'ar' ? 'فهرس السور' : 'Surah Index'}</span>
            </button>

            <div className="text-center">
              <h2 className="font-bold text-lg text-[#F8FAFC]">{currentSurah.nameAr}</h2>
              <span className="text-[11px] text-[#94A3B8]">
                {currentSurah.nameEn} • {currentSurah.revelationTypeAr} • {formatNumeral(currentSurah.totalVerses, numeralType)} آية
              </span>
            </div>

            <button
              onClick={() => setShowReciterSelector(true)}
              className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-[#00D4FF] border border-white/[0.08]"
              title="تغيير القارئ"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bismillah Header (Except Surah At-Tawbah 9) */}
          {currentSurah.number !== 9 && (
            <div className="py-6 px-4 rounded-3xl bg-[#111B32] border border-white/[0.08] text-center relative overflow-hidden shadow-lg">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                }}
              />
              <p className="font-quran text-2xl sm:text-3xl text-[#FCD34D] tracking-wide select-none">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Ayahs List */}
          <div className="space-y-3">
            {currentAyahs.map((ayah) => {
              const bookmarked = isBookmarked(currentSurah.number, ayah.numberInSurah);

              return (
                <div
                  key={ayah.numberInSurah}
                  onClick={() => setActiveAyahForAction(ayah)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                    bookmarked
                      ? 'bg-[#1A2744] border-[#F59E0B]/40 shadow-lg'
                      : 'bg-[#111B32] border-white/[0.06] hover:border-white/[0.15] hover:bg-[#15203a]'
                  }`}
                >
                  {/* Ayah Top Header Bar */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.04]">
                    {/* Gold Circular Ayah Index Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-[#F59E0B]/50 text-[#F59E0B] flex items-center justify-center font-bold text-xs">
                        {formatNumeral(ayah.numberInSurah, numeralType)}
                      </div>
                      {bookmarked && (
                        <span className="text-[10px] text-[#F59E0B] font-medium flex items-center gap-1">
                          <BookMarked className="w-3 h-3" />
                          {language === 'ar' ? 'محفوظة' : 'Bookmarked'}
                        </span>
                      )}
                    </div>

                    {/* Quick Play & Bookmark Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAyah(currentSurah.number, ayah.numberInSurah, currentSurah.nameAr);
                        }}
                        className="p-1.5 rounded-full bg-white/[0.06] hover:bg-[#2563EB] text-[#00D4FF] hover:text-white transition-colors"
                        title="استماع"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(currentSurah.number, ayah.numberInSurah, currentSurah.nameAr, currentSurah.nameEn);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${
                          bookmarked
                            ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                            : 'bg-white/[0.06] text-white/60 hover:text-white'
                        }`}
                        title="حفظ العلامة"
                      >
                        <BookMarked className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Quranic Arabic Script (Noto Serif / Amiri with 46-54px line-height as specified) */}
                  <p className="font-quran text-xl sm:text-2xl text-[#F8FAFC] text-right select-text">
                    {ayah.textAr}
                  </p>

                  {/* English Translation beneath */}
                  {ayah.textEn && (
                    <p className="text-xs sm:text-sm text-[#94A3B8] italic mt-2.5 pt-2 border-t border-white/[0.04] leading-relaxed">
                      {ayah.textEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AYAH ACTION TRAY / MODAL (Image_26 section 5) */}
      {activeAyahForAction && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full sm:max-w-md bg-[#111B32] border border-white/[0.12] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-500/15 border border-[#F59E0B]/40 text-[#F59E0B] flex items-center justify-center font-bold text-xs">
                  {formatNumeral(activeAyahForAction.numberInSurah, numeralType)}
                </span>
                <span className="font-bold text-sm text-[#F8FAFC]">
                  {currentSurah.nameAr} - آية {formatNumeral(activeAyahForAction.numberInSurah, numeralType)}
                </span>
              </div>
              <button
                onClick={() => setActiveAyahForAction(null)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ayah Snippet Preview */}
            <p className="font-quran text-base text-[#F8FAFC] text-right line-clamp-3 mb-4 bg-[#0B1428] p-3 rounded-xl border border-white/[0.06]">
              {activeAyahForAction.textAr}
            </p>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  playAyah(currentSurah.number, activeAyahForAction.numberInSurah, currentSurah.nameAr);
                  setActiveAyahForAction(null);
                }}
                className="py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] font-medium flex items-center justify-center gap-2 text-xs transition-all shadow-lg"
              >
                <Play className="w-4 h-4 fill-current text-[#00D4FF]" />
                <span>{language === 'ar' ? 'استماع للتلاوة' : 'Play Recitation'}</span>
              </button>

              <button
                onClick={() => {
                  setShowTafsirModal(activeAyahForAction);
                  setActiveAyahForAction(null);
                }}
                className="py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-[#F8FAFC] font-medium flex items-center justify-center gap-2 text-xs transition-all border border-white/[0.08]"
              >
                <Info className="w-4 h-4 text-[#FCD34D]" />
                <span>{language === 'ar' ? 'قراءة التفسير' : 'View Tafsir'}</span>
              </button>

              <button
                onClick={() => {
                  toggleBookmark(currentSurah.number, activeAyahForAction.numberInSurah, currentSurah.nameAr, currentSurah.nameEn);
                  setActiveAyahForAction(null);
                }}
                className="py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F8FAFC] font-medium flex items-center justify-center gap-2 text-xs transition-all border border-white/[0.06]"
              >
                <BookMarked className="w-4 h-4 text-[#F59E0B]" />
                <span>
                  {isBookmarked(currentSurah.number, activeAyahForAction.numberInSurah)
                    ? (language === 'ar' ? 'إزالة العلامة' : 'Remove Bookmark')
                    : (language === 'ar' ? 'حفظ علامة' : 'Bookmark Ayah')}
                </span>
              </button>

              <button
                onClick={() => {
                  handleCopyAyah(activeAyahForAction);
                  setActiveAyahForAction(null);
                }}
                className="py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F8FAFC] font-medium flex items-center justify-center gap-2 text-xs transition-all border border-white/[0.06]"
              >
                <Copy className="w-4 h-4 text-[#00D4FF]" />
                <span>{language === 'ar' ? 'نسخ الآية' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAFSIR MODAL */}
      {showTafsirModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#111B32] border border-[#F59E0B]/30 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-bold text-base text-[#F8FAFC]">
                  {language === 'ar' ? 'التفسير الميسر' : 'Simplified Tafsir'}
                </h3>
              </div>
              <button
                onClick={() => setShowTafsirModal(null)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B1428] border border-white/[0.06] mb-4">
              <span className="text-[11px] text-[#F59E0B] font-semibold">
                {currentSurah.nameAr} - آية {formatNumeral(showTafsirModal.numberInSurah, numeralType)}
              </span>
              <p className="font-quran text-lg text-[#F8FAFC] text-right mt-1">
                {showTafsirModal.textAr}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-semibold text-[#00D4FF]">
                {language === 'ar' ? 'بيان ومعنى الآية:' : 'Explanation & Context:'}
              </h4>
              <p className="text-sm text-[#F8FAFC] leading-relaxed text-right bg-white/[0.02] p-4 rounded-xl border border-white/[0.04]">
                {showTafsirModal.tafsir || 'تفسير وبيان لمعنى الآية الكريمة وتدبر أسرارها.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RECITER SELECTOR MODAL */}
      {showReciterSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#111B32] border border-white/[0.1] rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[#00D4FF]" />
                <h3 className="font-bold text-base text-[#F8FAFC]">
                  {language === 'ar' ? 'اختر القارئ المفضل' : 'Select Quran Reciter'}
                </h3>
              </div>
              <button
                onClick={() => setShowReciterSelector(false)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {RECITERS.map((r) => {
                const isSelected = selectedReciter === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedReciter(r.id);
                      setShowReciterSelector(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-start flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#2563EB]/25 border-[#00D4FF]/60 text-white font-semibold shadow-md'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-white/80'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{language === 'ar' ? r.nameAr : r.nameEn}</div>
                      <div className="text-xs text-white/50">تلاوة برواية حفص عن عاصم</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#00D4FF]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
