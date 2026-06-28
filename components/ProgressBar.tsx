"use client";

import { useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface SectionMark {
  id: string;
  label: string;
}

/**
 * A slim vertical reading-progress rail (left edge, desktop only). The gold fill
 * tracks overall scroll, and each section gets a dot that lights up once you've
 * scrolled to it. Sections opt in via a `data-section="Label"` attribute.
 */
export function ProgressBar() {
  const progress = useScrollProgress();
  const [marks, setMarks] = useState<SectionMark[]>([]);
  const [reached, setReached] = useState<Set<string>>(new Set());

  // Collect the sections once the page has mounted.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    setMarks(
      nodes.map((n, i) => ({
        id: n.id || `section-${i}`,
        label: n.dataset.section || "",
      })),
    );

    // Light a dot when its section crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        setReached((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).id || "";
              next.add(id);
            }
          }
          return next;
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed left-5 top-1/2 z-[90] hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center"
      aria-hidden
    >
      {/* Track + fill */}
      <div className="relative h-64 w-px bg-white/15">
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-[var(--gold)] to-[var(--rose)]"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Dots */}
      <div className="pointer-events-none absolute inset-y-0 flex flex-col justify-between py-1">
        {marks.map((m) => {
          const on = reached.has(m.id);
          return (
            <div key={m.id} className="group relative flex items-center">
              <span
                className="block h-2 w-2 rounded-full transition-all duration-500"
                style={{
                  background: on ? "var(--gold)" : "rgba(255,255,255,0.25)",
                  boxShadow: on ? "0 0 10px 2px var(--gold-glow)" : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
