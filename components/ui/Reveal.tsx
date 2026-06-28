"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  reducedRevealVariants,
  revealTransition,
  revealVariants,
} from "@/lib/animations";
import type { RevealAnimation } from "@/lib/types";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Which entrance to play. Sections vary this so motion never feels repetitive. */
  animation?: RevealAnimation;
  /** Delay before the entrance, in seconds. */
  delay?: number;
  /** Re-animate every time it enters the viewport (default: only once). */
  repeat?: boolean;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Animates its children in when scrolled into view. The actual animation is
 * picked from `revealVariants` by name; reduced-motion collapses everything to
 * a gentle opacity fade.
 */
export function Reveal({
  animation = "fade-up",
  delay = 0,
  repeat = false,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedRevealVariants : revealVariants[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.3 }}
      variants={variants}
      transition={{ ...revealTransition, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
