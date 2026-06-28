"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
}

/**
 * Pill button with a warm glow that intensifies on hover. Fully keyboard
 * accessible (it's a real <button>).
 */
export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  function GlowButton({ children, onClick, className, type = "button", ...rest }, ref) {
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-9 py-4",
        "text-base font-medium tracking-wide text-black sm:text-lg",
        "bg-gradient-to-r from-[var(--gold-soft)] via-[var(--gold)] to-[var(--rose-soft)]",
        "shadow-[0_0_30px_-6px_var(--gold-glow)] transition-shadow duration-500",
        "hover:shadow-[0_0_55px_0_var(--gold-glow)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
      {...rest}
    >
      {/* Soft animated halo behind the button. */}
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--gold)] opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
      {children}
    </motion.button>
  );
});

