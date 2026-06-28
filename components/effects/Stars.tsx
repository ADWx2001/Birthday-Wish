"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface StarsProps {
  /** Base star count on desktop; halved automatically on small screens. */
  count?: number;
  className?: string;
}

/**
 * A field of softly twinkling stars. Star positions are generated on the client
 * after mount (so SSR and client markup match — no hydration warnings). On
 * reduced motion the stars are shown but don't twinkle.
 */
export function Stars({ count = 90, className }: StarsProps) {
  const reduced = useReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const total = isMobile ? Math.round(count / 2) : count;
    setStars(
      Array.from({ length: total }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    );
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className={reduced ? "absolute rounded-full" : "absolute rounded-full animate-twinkle"}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "var(--white-soft)",
            boxShadow: `0 0 ${s.size * 3}px var(--white-soft)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
