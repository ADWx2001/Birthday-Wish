"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export interface LenisContextValue {
  lenis: Lenis | null;
  /** Smoothly scroll to a CSS selector or element (used by "Begin Our Story"). */
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  // Fallback for reduced-motion / SSR: native smooth scroll.
  scrollTo: (target) => {
    if (typeof window === "undefined") return;
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
});

export const useLenis = () => useContext(LenisContext);
