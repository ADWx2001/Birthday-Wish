"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  /** Normalised -1..1 around screen centre, handy for subtle parallax. */
  x: number;
  y: number;
}

/**
 * Tracks the pointer as a normalised offset from the screen centre.
 * Used to nudge background layers for a gentle parallax feel. Disabled
 * automatically when `enabled` is false (e.g. reduced motion / touch).
 */
export function useMousePosition(enabled = true): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      // Throttle to one update per animation frame.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return pos;
}
