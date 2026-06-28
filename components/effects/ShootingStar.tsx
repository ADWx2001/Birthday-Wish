"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { content } from "@/lib/content";

interface Shot {
  id: number;
  top: number;
  left: number;
}

/**
 * Every so often a shooting star streaks across the sky. Catch it (click it)
 * and it reveals a hidden message. Skipped entirely under reduced motion.
 */
export function ShootingStar() {
  const reduced = useReducedMotion();
  const [shot, setShot] = useState<Shot | null>(null);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      // Random gap between appearances keeps it feeling spontaneous.
      const wait = 9000 + Math.random() * 11000;
      timer = setTimeout(() => {
        setShot({ id: Date.now(), top: Math.random() * 35, left: 40 + Math.random() * 45 });
        schedule();
      }, wait);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduced]);

  const onCatch = useCallback(() => {
    setShot(null);
    setMessage(true);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden" aria-hidden={!shot}>
        <AnimatePresence>
          {shot && (
            <motion.button
              key={shot.id}
              type="button"
              aria-label="Catch the shooting star"
              onClick={onCatch}
              className="pointer-events-auto absolute"
              style={{ top: `${shot.top}%`, left: `${shot.left}%` }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: -340, y: 220, opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeIn" }}
              onAnimationComplete={() => setShot(null)}
            >
              {/* Head */}
              <span
                className="block h-1.5 w-1.5 rounded-full bg-white"
                style={{ boxShadow: "0 0 10px 3px var(--white-soft)" }}
              />
              {/* Tail */}
              <span
                className="absolute right-0 top-1/2 h-px w-24 -translate-y-1/2 origin-right"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--white-soft))",
                  transform: "rotate(-32deg)",
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMessage(false)}
          >
            <motion.div
              className="glass max-w-md rounded-3xl px-8 py-10 text-center"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gold">A caught wish</p>
              <p className="font-serif text-xl text-white-soft">{content.sky.shootingStarMessage}</p>
              <button
                onClick={() => setMessage(false)}
                className="mt-6 rounded-full border border-[var(--glass-border)] px-6 py-2 text-sm text-muted transition hover:text-white-soft"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
