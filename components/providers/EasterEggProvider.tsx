"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { content } from "@/lib/content";

/**
 * Central hub for every playful surprise on the page. Components call these
 * triggers (e.g. the cake fires `confetti`, the moon fires `sunrise`) and this
 * provider renders the matching full-screen overlay. Keeping it in one place
 * means overlays never fight each other and reduced-motion is handled once.
 */
interface EasterEggContextValue {
  heartRain: () => void;
  confetti: () => void;
  sparkle: () => void;
  sunrise: () => void;
  /** Each heart click bumps a counter; the 5th reveals a hidden message. */
  registerHeartClick: () => void;
  /** True while the brief sunrise overlay is showing (background can react). */
  sunriseActive: boolean;
}

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

export const useEasterEggs = () => {
  const ctx = useContext(EasterEggContext);
  if (!ctx) throw new Error("useEasterEggs must be used within EasterEggProvider");
  return ctx;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [hearts, setHearts] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [sparkleOn, setSparkleOn] = useState(false);
  const [sunriseOn, setSunriseOn] = useState(false);
  const [secret, setSecret] = useState(false);
  const heartClicks = useRef(0);

  // Auto-clear an overlay after `ms` using a single throwaway timer.
  const flash = useCallback(
    (setter: (v: boolean) => void, ms: number) => {
      setter(true);
      window.setTimeout(() => setter(false), ms);
    },
    [],
  );

  const heartRain = useCallback(() => flash(setHearts, 5200), [flash]);
  const confetti = useCallback(() => flash(setConfettiOn, 4200), [flash]);
  const sparkle = useCallback(() => flash(setSparkleOn, 2600), [flash]);
  const sunrise = useCallback(() => flash(setSunriseOn, 6000), [flash]);

  const registerHeartClick = useCallback(() => {
    heartClicks.current += 1;
    if (heartClicks.current >= 5) {
      heartClicks.current = 0;
      setSecret(true);
    }
  }, []);

  // Typing easter eggs.
  useKeySequence("love", heartRain);
  useKeySequence("happy", confetti);

  const value = useMemo(
    () => ({ heartRain, confetti, sparkle, sunrise, registerHeartClick, sunriseActive: sunriseOn }),
    [heartRain, confetti, sparkle, sunrise, registerHeartClick, sunriseOn],
  );

  return (
    <EasterEggContext.Provider value={value}>
      {children}

      {/* ── Heart rain (type LOVE) ── */}
      <AnimatePresence>
        {hearts && !reducedMotion && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-rose"
                style={{
                  left: `${rand(0, 100)}%`,
                  top: "-5%",
                  fontSize: `${rand(14, 34)}px`,
                  color: i % 2 ? "var(--rose)" : "var(--gold)",
                  animation: `fall ${rand(3.5, 6)}s linear ${rand(0, 1.5)}s forwards`,
                }}
              >
                <FaHeart />
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Confetti (type HAPPY / blow the candles) ── */}
      <AnimatePresence>
        {confettiOn && !reducedMotion && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 90 }).map((_, i) => {
              const colors = ["var(--gold)", "var(--rose)", "var(--purple)", "var(--gold-soft)", "var(--white-soft)"];
              return (
                <span
                  key={i}
                  className="absolute block"
                  style={{
                    left: `${rand(0, 100)}%`,
                    top: "-5%",
                    width: `${rand(6, 11)}px`,
                    height: `${rand(8, 16)}px`,
                    background: colors[i % colors.length],
                    borderRadius: "2px",
                    animation: `fall ${rand(2.8, 5)}s linear ${rand(0, 1.2)}s forwards`,
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Whole-page sparkle (double-click a fairy light) ── */}
      <AnimatePresence>
        {sparkleOn && !reducedMotion && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[120]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 70 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${rand(0, 100)}%`,
                  top: `${rand(0, 100)}%`,
                  width: `${rand(2, 5)}px`,
                  height: `${rand(2, 5)}px`,
                  background: "var(--gold-soft)",
                  boxShadow: "0 0 8px var(--gold-soft)",
                  animation: `twinkle ${rand(0.8, 1.8)}s ease-in-out ${rand(0, 1)}s infinite`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Brief sunrise wash (click the moon) ── */}
      <AnimatePresence>
        {sunriseOn && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,170,120,0.0) 0%, rgba(255,178,140,0.35) 45%, rgba(255,210,150,0.5) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Hidden message (click a heart 5×) ── */}
      <AnimatePresence>
        {secret && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSecret(false)}
          >
            <motion.div
              className="glass max-w-md rounded-3xl px-8 py-10 text-center"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaHeart className="mx-auto mb-4 text-3xl text-rose animate-heartbeat" />
              <p className="font-serif text-xl text-white-soft">
                {content.secrets.heartClickMessage}
              </p>
              <button
                onClick={() => setSecret(false)}
                className="mt-6 rounded-full border border-[var(--glass-border)] px-6 py-2 text-sm text-muted transition hover:text-white-soft"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EasterEggContext.Provider>
  );
}
