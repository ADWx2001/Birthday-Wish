"use client";

import { useEffect, useState } from "react";

/**
 * Single source of truth for the user's motion preference. Every effect reads
 * this and either disables itself or scales down. Defaults to `false` on the
 * server so the first paint matches, then syncs on mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
