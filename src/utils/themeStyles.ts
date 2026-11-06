import { ThemeMode } from '../types';

export function getThemeClasses(theme: ThemeMode) {
  switch (theme) {
    case 'candy':
      return {
        bg: 'bg-[#fef7ff]',
        surface1: 'bg-white/90 backdrop-blur-md',
        card: 'bg-white/80 border border-pink-100 shadow-sm shadow-pink-100/50',
        cardElevated: 'bg-[#fce7f3]/50 border border-pink-200/60 shadow-md shadow-pink-200/30',
        cardActive: 'bg-[#f5d0fe]/60 border border-[#e040a0]/40 shadow-lg shadow-pink-300/30',
        textPrimary: 'text-[#2d123b]',
        textSecondary: 'text-[#6b5b7b]',
        textSubtle: 'text-pink-300',
        border: 'border-pink-200/60',
        primaryBtn: 'bg-[#e040a0] text-white hover:bg-[#d02c8e] shadow-md shadow-pink-300/40 rounded-full',
        secondaryBtn: 'bg-pink-50 border border-pink-200 text-[#2d123b] hover:bg-pink-100 rounded-full',
        goldAccent: 'text-[#7c52aa]',
        goldBorder: 'border-[#7c52aa]/40',
        cyanAccent: 'text-[#0096cc]',
        navActivePill: 'bg-[#e040a0]/15 text-[#e040a0]',
        navInactive: 'text-[#6b5b7b]',
        rounded: 'rounded-2xl',
        pill: 'rounded-full',
      };
    case 'obsidian':
      return {
        bg: 'bg-[#09090b]',
        surface1: 'bg-[#0c0c0f] border-b border-zinc-800',
        card: 'bg-[#18181b] border border-zinc-800',
        cardElevated: 'bg-[#1e1e24] border border-zinc-700',
        cardActive: 'bg-[#27272a] border border-[#a78bfa]/40',
        textPrimary: 'text-[#fafafa]',
        textSecondary: 'text-[#a1a1aa]',
        textSubtle: 'text-zinc-600',
        border: 'border-zinc-800',
        primaryBtn: 'bg-[#a78bfa] text-black font-semibold hover:bg-[#906df8] rounded-lg',
        secondaryBtn: 'bg-zinc-900 border border-zinc-700 text-[#fafafa] hover:bg-zinc-800 rounded-lg',
        goldAccent: 'text-[#38bdf8]',
        goldBorder: 'border-[#38bdf8]/40',
        cyanAccent: 'text-[#34d399]',
        navActivePill: 'bg-[#a78bfa]/20 text-[#a78bfa]',
        navInactive: 'text-zinc-500',
        rounded: 'rounded-xl',
        pill: 'rounded-full',
      };
    case 'nocturne':
    default:
      return {
        bg: 'bg-[#050B1B]',
        surface1: 'bg-[#0B1428] border-b border-white/[0.06]',
        card: 'bg-[#111B32] border border-white/[0.08] shadow-lg shadow-black/35',
        cardElevated: 'bg-[#111B32] border border-white/[0.12] shadow-xl shadow-black/45',
        cardActive: 'bg-[#1A2744] border border-[#00D4FF]/30 shadow-cyan-900/20',
        textPrimary: 'text-[#F8FAFC]',
        textSecondary: 'text-[#94A3B8]',
        textSubtle: 'text-[#475569]',
        border: 'border-white/[0.08]',
        primaryBtn: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] shadow-lg shadow-blue-900/30 rounded-2xl',
        secondaryBtn: 'bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:bg-white/[0.08] rounded-2xl',
        goldAccent: 'text-[#F59E0B]',
        goldBorder: 'border-[#F59E0B]/30',
        cyanAccent: 'text-[#00D4FF]',
        navActivePill: 'bg-[#2563EB]/25 text-[#00D4FF]',
        navInactive: 'text-[#94A3B8]',
        rounded: 'rounded-2xl',
        pill: 'rounded-full',
      };
  }
}
