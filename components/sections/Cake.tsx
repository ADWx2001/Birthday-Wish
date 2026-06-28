"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/lib/content";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";

const CANDLES = 5;

/**
 * An animated birthday cake. The candles flicker until you press the button —
 * then the flames go out, little smoke wisps rise, confetti bursts (via the
 * easter-egg hub) and the wish message fades in.
 */
export function Cake() {
  const { confetti } = useEasterEggs();
  const [blown, setBlown] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    confetti();
  };

  return (
    <SectionWrapper
      id="cake"
      data-section="Make a Wish"
      title={content.cake.sectionTitle}
      titleAnimation="rotate"
    >
      <Reveal animation="zoom" className="flex flex-col items-center">
        <p className="mb-12 text-center text-base text-muted sm:text-lg">{content.cake.instruction}</p>

        {/* ── Cake ── */}
        <div className="relative">
          {/* Candles */}
          <div className="absolute -top-16 left-1/2 flex -translate-x-1/2 gap-5">
            {Array.from({ length: CANDLES }).map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame / smoke */}
                <div className="relative h-8 w-3">
                  <AnimatePresence>
                    {!blown ? (
                      <motion.span
                        key="flame"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full animate-flicker"
                        style={{
                          width: 10,
                          height: 16,
                          background: "radial-gradient(circle at 50% 70%, #fff3c4, #ffae3b 60%, #ff7a18)",
                          borderRadius: "50% 50% 50% 50% / 70% 70% 40% 40%",
                          boxShadow: "0 0 14px 4px rgba(255,170,60,0.7)",
                          animationDelay: `${i * 0.3}s`,
                        }}
                        exit={{ opacity: 0, scale: 0.2, y: -6 }}
                      />
                    ) : (
                      <motion.span
                        key="smoke"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/40 blur-sm"
                        style={{ width: 6, height: 6 }}
                        initial={{ opacity: 0.6, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -40, scale: 1.6 }}
                        transition={{ duration: 1.8, delay: i * 0.08 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                {/* Wax stick */}
                <span className="h-10 w-2 rounded-sm bg-gradient-to-b from-[var(--rose-soft)] to-[var(--rose)]" />
              </div>
            ))}
          </div>

          {/* Cake tiers */}
          <div className="flex flex-col items-center">
            <div className="h-12 w-44 rounded-t-xl bg-gradient-to-b from-[var(--rose-soft)] to-[var(--rose)] shadow-inner" />
            <div className="-mt-1 h-16 w-60 rounded-lg bg-gradient-to-b from-[#f1d7b8] to-[#d9b489] shadow-lg" />
            <div className="-mt-1 h-20 w-72 rounded-lg bg-gradient-to-b from-[var(--purple-soft)] to-[var(--purple)] shadow-xl" />
            {/* Plate */}
            <div className="-mt-1 h-3 w-80 rounded-full bg-white/15 blur-[1px]" />
          </div>
        </div>

        <div className="mt-16">
          <GlowButton onClick={blow}>
            {blown ? "✨ Wish made ✨" : content.cake.buttonLabel}
          </GlowButton>
        </div>

        <AnimatePresence>
          {blown && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-10 max-w-xl text-center font-serif text-xl font-light italic leading-relaxed text-white-soft"
            >
              {content.cake.wishMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </Reveal>
    </SectionWrapper>
  );
}
