"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium smooth scrolling. Lenis owns the scroll position and is driven from
 * the GSAP ticker so Lenis + ScrollTrigger stay perfectly in sync (no double
 * RAF loops, no jitter). When the user prefers reduced motion we skip Lenis
 * entirely and fall back to the browser's native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // On touch devices, native momentum scroll is faster and smoother than
    // JS-driven Lenis. Skip Lenis entirely; ScrollTrigger still works via its
    // own IntersectionObserver and the scrollTo fallback uses scrollIntoView.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || isTouchDevice) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Keep ScrollTrigger updated on every Lenis scroll event.
    instance.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (one shared rAF loop).
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // Stable scrollTo that works whether or not Lenis is active.
  const scrollTo = (target: string | HTMLElement, options?: { offset?: number }) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: options?.offset ?? 0, duration: 1.4 });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
