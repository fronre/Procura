// Audio Utilities using Web Audio API and Audio streaming

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Subtle tactile bead click for Tasbeeh
export function playTasbeehClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // High subtle wooden/stone click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(820, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);

    // Also trigger mobile device haptic feedback if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
  } catch {
    // Audio context may not be allowed before user interaction
  }
}

// Gentle celestial chime when Tasbeeh target is completed
export function playTargetReachedSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 0.45;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 60, 30]);
    }
  } catch {
    // ignore
  }
}

// Play gentle notification sound
export function playNotificationChime() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // ignore
  }
}

// Global audio element for playing Adhan or Ayah recitation
let activeAudio: HTMLAudioElement | null = null;

export function stopCurrentAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
}

export function playRecitationAudio(
  surahNumber: number,
  ayahNumber: number,
  reciterId: string = 'Alafasy_128kbps',
  onEnded?: () => void,
  onError?: () => void
): HTMLAudioElement {
  stopCurrentAudio();

  const pad3 = (num: number) => String(num).padStart(3, '0');
  const surahStr = pad3(surahNumber);
  const ayahStr = pad3(ayahNumber);

  // EveryAyah high quality CDN
  const url = `https://everyayah.com/data/${reciterId}/${surahStr}${ayahStr}.mp3`;

  const audio = new Audio(url);
  activeAudio = audio;

  audio.play().catch(() => {
    if (onError) onError();
  });

  if (onEnded) {
    audio.onended = () => {
      onEnded();
    };
  }

  return audio;
}

// Play preview Adhan
export function playAdhanAudio(onEnded?: () => void): HTMLAudioElement {
  stopCurrentAudio();
  // Public Adhan audio from Wikimedia Commons / archive.org
  const adhanUrl = 'https://ia800508.us.archive.org/3/items/Athan_Makkah/Athan_Makkah.mp3';
  const audio = new Audio(adhanUrl);
  activeAudio = audio;

  audio.play().catch(() => {
    // fallback tone if network blocked
    playTargetReachedSound();
  });

  if (onEnded) {
    audio.onended = () => onEnded();
  }

  return audio;
}
