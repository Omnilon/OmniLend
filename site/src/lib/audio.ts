export type ToneType = "toggle-on" | "toggle-off" | "hover" | "enter";

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;

const baseFrequencies: Record<ToneType, number> = {
  "toggle-on": 880,
  "toggle-off": 220,
  hover: 660,
  enter: 440
};

function createContext() {
  const ctx = new AudioContext();
  const gain = ctx.createGain();
  gain.gain.value = 0.12;
  gain.connect(ctx.destination);
  audioContext = ctx;
  masterGain = gain;
  return ctx;
}

export async function ensureAudioContext() {
  if (!audioContext) {
    return createContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

export async function tearDownAudio() {
  if (audioContext) {
    await audioContext.close();
  }
  audioContext = null;
  masterGain = null;
}

export async function playTone(type: ToneType) {
  const ctx = await ensureAudioContext();
  if (!ctx || !masterGain) {
    return;
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const now = ctx.currentTime;
  const frequency = baseFrequencies[type];

  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, now);
  osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, now + 0.18);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.32);
}
