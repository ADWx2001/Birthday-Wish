"use client";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";
import { useLenis } from "@/hooks/useLenis";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { Stars } from "@/components/effects/Stars";
import { Moon } from "@/components/effects/Moon";
import { FairyLights } from "@/components/effects/FairyLights";
import { GlowButton } from "@/components/ui/GlowButton";
import { Typewriter } from "@/components/ui/Typewriter";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The hero: a night sky with twinkling stars, a glowing clickable moon, and
 * swinging fairy lights overhead. Houses the big greeting, the typewriter
 * subtitle, and the call-to-action that smooth-scrolls into the story.
 */
export function Hero() {
  const { scrollTo } = useLenis();
  const { registerHeartClick } = useEasterEggs();

  return (
    <section
      id="hero"
      data-section="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      {/* Deeper night gradient just for the hero so the moon reads against it */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(20,28,68,0.6), transparent 60%)" }}
        aria-hidden
      />
      <Stars count={110} />
      <FairyLights count={16} />

      {/* Glowing moon, upper area */}
      <Moon className="right-[12%] top-[14%] h-24 w-24 sm:right-[18%] sm:h-32 sm:w-32 md:h-40 md:w-40" />

      <div className="relative z-30 mt-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: SOFT_EASE }}
          className="flex items-center justify-center gap-3"
        >
          <h1 className="text-glow-gold font-serif text-5xl font-light tracking-wide text-white-soft sm:text-7xl md:text-8xl">
            {content.hero.heading}
          </h1>
          {/* Clickable heart — 5 clicks reveals a secret */}
          <button
            type="button"
            onClick={registerHeartClick}
            aria-label="A little heart"
            className="text-3xl text-rose transition hover:scale-110 sm:text-5xl"
            style={{ filter: "drop-shadow(0 0 12px var(--rose))" }}
          >
            <FaHeart className="animate-heartbeat" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="mt-8 max-w-2xl"
        >
          <Typewriter
            lines={content.hero.typewriter}
            className="font-serif text-lg font-light leading-relaxed text-muted sm:text-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-12"
        >
          <GlowButton onClick={() => scrollTo("#story", { offset: 0 })}>
            {content.hero.ctaLabel}
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}
