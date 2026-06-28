import { cn } from "@/lib/cn";

interface GlowGradientProps {
  className?: string;
  /** CSS color (token or value) for the soft blurred glow. */
  color?: string;
  /** Diameter in pixels. */
  size?: number;
  opacity?: number;
}

/**
 * A single soft blurred radial glow. Sprinkle a couple behind any section to
 * get warm depth without harsh edges. Purely decorative.
 */
export function GlowGradient({
  className,
  color = "var(--gold)",
  size = 520,
  opacity = 0.22,
}: GlowGradientProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-[100px]", className)}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
      }}
    />
  );
}
