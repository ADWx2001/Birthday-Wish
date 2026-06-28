import type { Variants } from "framer-motion";
import type { RevealAnimation } from "./types";

/** A soft, luxurious easing curve reused across the site. */
export const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Framer Motion variants keyed by reveal name. Each section can request a
 * different one so consecutive sections never animate the same way.
 * The `hidden` state is what we animate FROM; `visible` is the resting state.
 */
export const revealVariants: Record<RevealAnimation, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 72 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -72 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -4, y: 36 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 1.12 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 24 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  opacity: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/** Reduced-motion fallback: everything just gently fades, no movement. */
export const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Standard transition for reveals. */
export const revealTransition = {
  duration: 0.9,
  ease: SOFT_EASE,
};

/** Container that staggers its children in. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
