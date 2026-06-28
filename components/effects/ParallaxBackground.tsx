"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Blob {
  color: string;
  size: number;
  top: string;
  left: string;
  /** Parallax strength — larger blobs sit "further away" and move less. */
  depth: number;
  opacity: number;
}

const BLOBS: Blob[] = [
  { color: "var(--blue)", size: 620, top: "5%", left: "-8%", depth: 18, opacity: 0.35 },
  { color: "var(--purple)", size: 480, top: "30%", left: "70%", depth: 30, opacity: 0.18 },
  { color: "var(--rose)", size: 420, top: "62%", left: "-5%", depth: 26, opacity: 0.14 },
  { color: "var(--gold)", size: 520, top: "80%", left: "60%", depth: 22, opacity: 0.12 },
];

/**
 * Fixed, full-page backdrop of large blurred gradient blobs. They drift subtly
 * with the pointer for a gentle parallax feel (disabled under reduced motion or
 * when there's no mouse). Sits behind all content.
 */
export function ParallaxBackground() {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition(!reduced);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[110px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            opacity: b.opacity,
            transform: `translate3d(${x * b.depth}px, ${y * b.depth}px, 0)`,
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      ))}
    </div>
  );
}
