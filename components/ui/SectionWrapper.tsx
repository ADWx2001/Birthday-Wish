"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  /** Reveal animation for the heading block. */
  titleAnimation?: React.ComponentProps<typeof Reveal>["animation"];
  children: React.ReactNode;
  /** Mark this section so the progress rail can track it. */
  "data-section"?: string;
}

/**
 * Consistent vertical rhythm + optional animated heading for a major section.
 * Sections register themselves via `data-section` so the progress bar lights up.
 */
export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    { id, className, title, subtitle, titleAnimation = "fade-up", children, ...rest },
    ref,
  ) {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32",
          className,
        )}
        {...rest}
      >
        {(title || subtitle) && (
          <Reveal animation={titleAnimation} className="mb-14 text-center sm:mb-20">
            {title && (
              <h2 className="text-glow-soft font-serif text-4xl font-light tracking-wide text-white-soft sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
                {subtitle}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </section>
    );
  },
);
