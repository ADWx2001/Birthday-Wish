"use client";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
}

/**
 * Occasionally a soft heart drifts up from the bottom of the page and fades
 * away — a gentle ambient touch, not a constant stream. Disabled under reduced
 * motion.
 */
export function FloatingHearts() {
  const reduced = useReducedMotion();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const id = Date.now() + Math.random();
      const heart: Heart = {
        id,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 7 + Math.random() * 5,
        color: Math.random() > 0.5 ? "var(--rose)" : "var(--gold)",
      };
      setHearts((prev) => [...prev, heart]);
      // Remove after it finishes rising.
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, heart.duration * 1000);
      // Next heart in a relaxed, random interval.
      timer = setTimeout(spawn, 4000 + Math.random() * 6000);
    };

    timer = setTimeout(spawn, 3000);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0"
          style={{
            left: `${h.left}%`,
            color: h.color,
            fontSize: h.size,
            opacity: 0.35,
            animation: `rise ${h.duration}s ease-in forwards`,
          }}
        >
          <FaHeart />
        </span>
      ))}
    </div>
  );
}
