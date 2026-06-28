"use client";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The closing chapter. As it scrolls into view a warm sunrise wash rises behind
 * everything, the most meaningful photo is revealed, and the "I Love You" line
 * is spelled out one letter at a time before the final thank-you fades in.
 */
export function FinalSection() {
  const loveLetters = Array.from(content.final.loveLine);

  return (
    <section
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
  );
}
