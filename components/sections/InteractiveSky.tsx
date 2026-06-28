"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface SkyStar {
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  message: string;
}

/**
 * A clickable sky. Tapping any star pops a little heart-and-sparkle burst at
 * that spot and floats up a random sweet message. Star positions are generated
 * on the client to keep SSR markup stable.
 */
export function InteractiveSky() {
  const [stars, setStars] = useState<SkyStar[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 640 ? 22 : 40;
    setStars(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      })),
    );
  }, []);

  const pop = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    const messages = content.sky.starMessages;
    const message = messages[Math.floor(Math.random() * messages.length)];
    setBursts((prev) => [...prev, { id, x, y, message }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 2600);
  };

  return (
    <SectionWrapper
      id="sky"
      data-section="Our Universe"
      title={content.sky.sectionTitle}
      subtitle={content.sky.caption}
      titleAnimation="opacity"
    >
      <div className="relative mx-auto h-[60vh] min-h-[420px] w-full overflow-hidden rounded-3xl glass">
        {/* Clickable stars */}
        {stars.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => pop(s.x, s.y)}
            aria-label="Make a star twinkle"
            className="absolute rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]"
            style={{ left: `${s.x}%`, top: `${s.y}%`, padding: 8 }}
          >
            <span
              className="block rounded-full animate-twinkle transition-transform hover:scale-150"
              style={{
                width: s.size,
                height: s.size,
                background: "var(--white-soft)",
                boxShadow: `0 0 ${s.size * 3}px var(--white-soft)`,
                animationDelay: `${s.delay}s`,
              }}
            />
          </button>
        ))}

        {/* Bursts: sparkles + hearts + message */}
        <AnimatePresence>
          {bursts.map((b) => (
            <div key={b.id} className="pointer-events-none absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
              {/* radiating sparkles */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full"
                    style={{ background: "var(--gold-soft)", boxShadow: "0 0 6px var(--gold-soft)" }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 34, y: Math.sin(angle) * 34, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                );
              })}
              {/* heart */}
              <motion.span
                className="absolute -translate-x-1/2 text-rose"
                initial={{ y: 0, opacity: 0, scale: 0.4 }}
                animate={{ y: -28, opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 1.4 }}
              >
                <FaHeart />
              </motion.span>
              {/* message */}
              <motion.p
                className="absolute w-44 -translate-x-1/2 text-center font-serif text-sm text-white-soft"
                style={{ top: -52 }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -16, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4 }}
              >
                {b.message}
              </motion.p>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
