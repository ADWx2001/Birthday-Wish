"use client";

import { useEffect, useRef } from "react";

/**
 * Fires `onMatch` when the user types `sequence` (case-insensitive) on the
 * keyboard. Keeps a small rolling buffer of recent letters. Ignores typing
 * inside inputs/textareas so it never interferes with real forms.
 */
export function useKeySequence(sequence: string, onMatch: () => void) {
  const buffer = useRef("");
  const target = sequence.toLowerCase();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) {
        return;
      }
      if (e.key.length !== 1) return; // ignore modifier / control keys
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-target.length);
      if (buffer.current === target) {
        buffer.current = "";
        onMatch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onMatch]);
}
