"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterProps {
  /** Lines are typed out one after another, looping back to the first. */
  lines: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  /** Pause once a line is fully typed, in ms. */
  holdTime?: number;
}

/**
 * Classic type-on / type-off effect that cycles through `lines`. Under reduced
 * motion it simply shows the first line statically (no animation).
 */
export function Typewriter({
  lines,
  className,
  typingSpeed = 45,
  deletingSpeed = 24,
  holdTime = 2200,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (reduced) return; // static fallback handled in render
    const current = lines[lineIndex % lines.length];

    if (!deleting && text === current) {
      // Finished typing — hold, then start deleting.
      timeout.current = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      // Finished deleting — advance to next line.
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      timeout.current = setTimeout(
        () => setText(next),
        deleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout.current);
  }, [text, deleting, lineIndex, lines, reduced, typingSpeed, deletingSpeed, holdTime]);

  if (reduced) {
    return <p className={className}>{lines[0]}</p>;
  }

  return (
    <p className={cn("min-h-[3.5em] sm:min-h-[2.5em]", className)} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "1em" }} />
    </p>
  );
}
