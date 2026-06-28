"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";

/**
 * The opening of the "gift": a dark screen with a single glowing, beating heart
 * and the loading line, which then fades away to reveal the hero. Scroll is
 * locked while it's visible so the reveal feels intentional.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    // Hold the moment, then fade into the experience.
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Restore scrolling once the curtain lifts.
  const handleExitComplete = () => {
    document.documentElement.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--black)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow halo */}
            <span className="absolute inset-0 -m-10 rounded-full bg-rose opacity-30 blur-3xl animate-glow" aria-hidden />
            <FaHeart className="relative text-6xl text-rose animate-heartbeat" style={{ filter: "drop-shadow(0 0 18px var(--rose))" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 font-serif text-lg tracking-wide text-muted sm:text-xl"
          >
            {content.loading.message}
          </motion.p>

          {/* Slim indeterminate progress shimmer */}
          <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
