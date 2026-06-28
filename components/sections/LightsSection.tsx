"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowGradient } from "@/components/effects/GlowGradient";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Lighting up our journey": a string of bulbs that begins dark and switches on
 * one bulb at a time as the section scrolls through the viewport. A GSAP
 * ScrollTrigger scrubs scroll progress (0→1), which we map to how many bulbs
 * are lit; once they're all on, a warm wash brightens the whole section.
 * Under reduced motion everything is simply shown already lit.
 */
export function LightsSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bulbCount = content.lights.bulbCount;
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    // Scrub a 0→1 value across the section's passage through the viewport.
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      end: "bottom 70%",
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [reduced]);

  // How many bulbs are lit, and the leftover brightness wash after the last one.
  const litCount = Math.round(progress * bulbCount);
  const afterglow = Math.max(0, (progress - 0.85) / 0.15); // 0→1 once nearly complete

  return (
    <SectionWrapper
      ref={sectionRef}
      id="lights"
      data-section="Our Journey"
      title={content.lights.sectionTitle}
      titleAnimation="opacity"
    >
      {/* Warm wash that grows as the bulbs come on */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, var(--gold-glow), transparent 65%)",
          opacity: progress * 0.4 + afterglow * 0.2,
        }}
        aria-hidden
      />
      <GlowGradient className="left-1/2 top-1/3 -translate-x-1/2" color="var(--gold)" size={700} opacity={afterglow * 0.25} />

      <div className="relative mx-auto max-w-4xl">
        {/* Hanging string of bulbs */}
        <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-10">
          {Array.from({ length: bulbCount }).map((_, i) => {
            const lit = i < litCount;
            return (
              <div key={i} className="flex flex-col items-center">
                <span className="h-8 w-px bg-white/15" aria-hidden />
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: 26,
                    height: 34,
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    background: lit
                      ? "radial-gradient(circle at 40% 35%, #fff7e6, var(--gold) 70%)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: lit
                      ? "0 0 22px 6px var(--gold-glow), 0 0 50px 12px rgba(244,201,130,0.25)"
                      : "inset 0 0 6px rgba(0,0,0,0.4)",
                  }}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-16 max-w-xl text-center text-base leading-relaxed text-muted sm:text-lg">
          {content.lights.caption}
        </p>

        {/* Progress read-out for accessibility/feedback */}
        <p className="mt-6 text-center text-sm tracking-[0.3em] text-gold/80" aria-live="polite">
          {litCount} / {bulbCount}
        </p>
      </div>
    </SectionWrapper>
  );
}
