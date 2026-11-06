import React from 'react';
import { Pause, Square, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AudioBar: React.FC = () => {
  const { audioState, pauseAudio } = useApp();

  if (!audioState.isPlaying) return null;

  return (
    <div className="fixed bottom-[88px] inset-x-4 max-w-md mx-auto z-40 animate-slide-up">
      <div className="bg-[#111B32]/95 border border-[#00D4FF]/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl rounded-2xl p-3 flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB]/25 border border-[#00D4FF]/30 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-[#00D4FF] animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#F8FAFC] truncate">
              {audioState.title || 'تلاوة عطرة'}
            </div>
            <div className="text-[11px] text-[#94A3B8] truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-ping" />
              <span>{audioState.reciterName || 'القارئ'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={pauseAudio}
            className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all flex items-center gap-1 text-xs"
            title="إيقاف التلاوة"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-medium">إيقاف</span>
          </button>
        </div>
      </div>
    </div>
  );
};
