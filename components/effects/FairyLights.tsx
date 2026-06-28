"use client";

import { cn } from "@/lib/cn";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";

interface FairyLightsProps {
  count?: number;
  className?: string;
}

/**
 * A string of warm hanging bulbs draped across the top of the hero. The whole
 * string sways gently (`animate-swing`) and individual bulbs flicker on
 * staggered, deterministic delays (index-based so SSR markup matches the
 * client). Double-clicking a bulb sparkles the whole page (easter egg).
 */
export function FairyLights({ count = 14, className }: FairyLightsProps) {
  const { sparkle } = useEasterEggs();
  const bulbs = Array.from({ length: count });

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 z-20 select-none", className)}
      aria-hidden
    >
      {/* Drooping wire behind the bulbs */}
      <svg
        className="absolute inset-x-0 top-0 h-24 w-full"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,12 C300,70 900,70 1200,12"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative flex items-start justify-between px-4 sm:px-10">
        {bulbs.map((_, i) => {
          // Bulbs follow the same gentle droop as the wire (parabola).
          const t = i / (count - 1);
          const droop = Math.sin(t * Math.PI) * 42;
          return (
            <div
              key={i}
              className="origin-top animate-swing"
              style={{ transform: `translateY(${droop}px)`, animationDelay: `${(i % 5) * 0.3}s` }}
            >
              {/* Tiny cap + wire to the bulb */}
              <span className="mx-auto block h-3 w-px bg-white/20" />
              <button
                type="button"
                onDoubleClick={sparkle}
                tabIndex={-1}
                className="pointer-events-auto block h-3 w-3 rounded-full animate-flicker"
                style={{
                  background: i % 2 ? "var(--gold-soft)" : "var(--rose-soft)",
                  boxShadow: `0 0 10px 2px ${i % 2 ? "var(--gold-glow)" : "rgba(246,201,214,0.6)"}`,
                  animationDelay: `${(i * 0.7) % 6}s`,
                }}
                aria-label="Fairy light"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
