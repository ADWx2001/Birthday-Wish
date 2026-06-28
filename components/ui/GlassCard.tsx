"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOFT_EASE } from "@/lib/animations";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  /** Enable the lift + glow hover interaction. */
  interactive?: boolean;
}

/**
 * Elegant glassmorphism surface. When `interactive`, it lifts, scales 1.03 and
 * gains a warm glow on hover — used by the memory cards.
 */
export function GlassCard({ className, children, interactive = true }: GlassCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "glass relative overflow-hidden rounded-3xl",
        interactive && "cursor-pointer",
        className,
      )}
      whileHover={
        interactive && !reduced
          ? {
              y: -10,
              scale: 1.03,
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 40px -8px var(--gold-glow)",
            }
          : undefined
      }
      transition={{ duration: 0.4, ease: SOFT_EASE }}
    >
      {children}
    </motion.div>
  );
}
