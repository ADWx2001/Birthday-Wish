"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";

/**
 * A large glowing moon. Clicking it triggers a brief sunrise wash over the whole
 * page (an easter egg). It's a real button for keyboard access.
 */
export function Moon({ className }: { className?: string }) {
  const { sunrise } = useEasterEggs();

  return (
    <motion.button
      type="button"
      aria-label="The moon — click for a little surprise"
      onClick={sunrise}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      className={cn(
        "group absolute rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]",
        className,
      )}
    >
      {/* Outer halo */}
      <span className="absolute inset-0 -m-16 rounded-full bg-[var(--gold-soft)] opacity-20 blur-3xl animate-glow" aria-hidden />
      <span className="absolute inset-0 -m-6 rounded-full bg-[var(--gold-soft)] opacity-25 blur-2xl" aria-hidden />
      {/* Moon body */}
      <span
        className="relative block h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fff9ec 0%, #ffedcf 40%, #f3d9a6 70%, #e6c489 100%)",
          boxShadow:
            "inset -16px -12px 36px rgba(180,150,90,0.45), 0 0 60px rgba(255,225,170,0.55)",
        }}
        aria-hidden
      >
        {/* Soft craters */}
        <span className="absolute left-[28%] top-[35%] h-3 w-3 rounded-full bg-[rgba(180,150,90,0.25)]" />
        <span className="absolute left-[58%] top-[55%] h-5 w-5 rounded-full bg-[rgba(180,150,90,0.2)]" />
        <span className="absolute left-[45%] top-[22%] h-2 w-2 rounded-full bg-[rgba(180,150,90,0.22)]" />
      </span>
    </motion.button>
  );
}
