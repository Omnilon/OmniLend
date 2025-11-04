"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { playTone, ToneType } from "@/lib/audio";

const STORAGE_KEY = "omnilend:sound-enabled";

type SoundContextValue = {
  enabled: boolean;
  toggle: (nextState?: boolean) => void;
  play: (tone?: ToneType) => void;
};

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

type SoundProviderProps = {
  children: ReactNode;
};

export function SoundProvider({ children }: SoundProviderProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  const toggle = useCallback(
    (nextState?: boolean) => {
      setEnabled((prev) => (typeof nextState === "boolean" ? nextState : !prev));
    },
    []
  );

  const play = useCallback(
    async (tone: ToneType = "hover") => {
      if (!enabled) return;
      try {
        await playTone(tone);
      } catch (error) {
        console.warn("Audio playback failed", error);
      }
    },
    [enabled]
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, play, toggle]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}
