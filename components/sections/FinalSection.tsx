"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

const EMOJIS = ["🌸", "🌺", "🌷", "🌼", "💕", "✨", "💖", "🌸", "🌺", "⭐", "💮", "🌸"];

export function FinalSection() {
  const loveLetters = Array.from(content.final.loveLine);
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const [showCelebration, setShowCelebration] = useState(false);

  const PARTICLES = useMemo(() =>
    Array.from({ length: 72 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: (i * 1.39) % 100,
      delay: (i * 0.065) % 2.6,
      duration: 3.2 + (i % 3) * 0.7,
      size: 14 + (i % 18),
      rise: i % 5 === 0,
    })),
  []);

  const pausedForGalleryRef = useRef(false);
  const inViewRef = useRef(false);

  // Keep a ref in sync with inView so the unlock callback can read the latest value
  useEffect(() => { inViewRef.current = inView; }, [inView]);

  // Create audio + register a one-time unlock on the first user gesture.
  // Browsers on production HTTPS (Safari, Chrome mobile) block play() from
  // IntersectionObserver callbacks because they are not "user gesture" contexts.
  // The unlock pre-authorises the element so the scroll trigger works.
  useEffect(() => {
    const audio = new Audio("/track/lastslide.mp3");
    audio.volume = 0.65;
    audioRef.current = audio;

    const unlock = () => {
      if (inViewRef.current) {
        // Section already in view when user first interacts — play immediately.
        audio.play().catch(() => {});
      } else {
        // Not in view yet — play then pause to unlock, play for real on scroll.
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch(() => {});
      }
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Play audio + launch celebration once when section scrolls into view
  useEffect(() => {
    if (inView) {
      audioRef.current?.play().catch(() => {});
      setShowCelebration(true);
      const t = setTimeout(() => setShowCelebration(false), 5500);
      return () => clearTimeout(t);
    }
  }, [inView]);

  // Pause while full gallery is open; resume when it closes
  useEffect(() => {
    const onOpen = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        pausedForGalleryRef.current = true;
      }
    };
    const onClose = () => {
      if (pausedForGalleryRef.current) {
        audioRef.current?.play().catch(() => {});
        pausedForGalleryRef.current = false;
      }
    };
    window.addEventListener("fullgallery:open", onOpen);
    window.addEventListener("fullgallery:close", onClose);
    return () => {
      window.removeEventListener("fullgallery:open", onOpen);
      window.removeEventListener("fullgallery:close", onClose);
    };
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      id="final"
      data-section="Happy Birthday My Love"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-28 text-center"
    >
      {/* Sunrise wash that grows in as the section appears */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(180deg, rgba(40,30,70,0.0) 0%, rgba(220,140,120,0.35) 55%, rgba(255,200,150,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* Final photo */}
      <Reveal animation="zoom" className="w-full max-w-lg">
        <div className="relative mx-auto overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
          <div className="aspect-[4/5] w-full sm:aspect-[4/3]">
            <Photo photo={content.final.photo} sizes="(max-width: 640px) 100vw, 32rem" />
          </div>
        </div>
      </Reveal>

      <Reveal animation="fade-up" delay={0.2} className="mt-12 flex flex-col items-center">
        <h2 className="text-glow-gold flex flex-wrap items-center justify-center gap-3 font-serif text-4xl font-light text-white-soft sm:text-6xl">
          {content.final.heading}
          <FaHeart className="text-rose animate-heartbeat" />
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white-soft/90 sm:text-lg">
          {content.final.paragraph}
        </p>

        {/* Handwritten signature */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2, ease: SOFT_EASE }}
          className="mt-10 font-script text-3xl text-gold-soft sm:text-4xl"
        >
          {content.final.signature}
        </motion.p>

        {/* Heartbeat */}
        <div className="my-10">
          <FaHeart className="text-5xl text-rose animate-heartbeat" style={{ filter: "drop-shadow(0 0 16px var(--rose))" }} />
        </div>

        {/* "I Love You" — one letter at a time */}
        <motion.div
          className="flex flex-wrap justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
          aria-label={content.final.loveLine}
        >
          {loveLetters.map((char, i) => (
            <motion.span
              key={i}
              className="text-glow-soft font-script text-5xl text-white-soft sm:text-7xl"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.6 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: SOFT_EASE }}
              aria-hidden
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 1.6, duration: 1.6 }}
          className="mt-12 max-w-xl font-serif text-lg font-light italic text-white-soft/80 sm:text-xl"
        >
          {content.final.closingLine}
        </motion.p>
      </Reveal>
    </section>

    {/* ── Floral celebration overlay — triggers when the song starts ── */}
    <AnimatePresence>
      {showCelebration && !reduced && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          aria-hidden
        >
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.left}%`,
                ...(p.rise ? { bottom: "-5%" } : { top: "-5%" }),
                fontSize: `${p.size}px`,
                animation: `${p.rise ? "rise" : "fall"} ${p.duration}s ${p.delay}s ease-in forwards`,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
