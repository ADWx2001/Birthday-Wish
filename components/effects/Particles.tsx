"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

/**
 * Tiny floating dust particles that drift slowly upward/sideways, adding a
 * magical sense of depth. Counts are reduced on mobile and the whole effect is
 * skipped under reduced motion.
 */
export function Particles({ count = 40 }: { count?: number }) {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (reduced) return;
    const isMobile = window.innerWidth < 640;
    const total = isMobile ? Math.round(count / 2) : count;
    const palette = ["var(--gold-soft)", "var(--rose-soft)", "var(--purple-soft)", "var(--white-soft)"];
    setParticles(
      Array.from({ length: total }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 8 + 7,
        color: palette[Math.floor(Math.random() * palette.length)],
      })),
    );
  }, [count, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.5,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
