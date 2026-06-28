"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { PhotoContent } from "@/lib/types";

interface PhotoProps {
  photo: PhotoContent;
  className?: string;
  /** Hint next/image about how wide the image renders, for srcset sizing. */
  sizes?: string;
  priority?: boolean;
  /** CSS object-position value — use "top" for photos where the subject is near the top. */
  objectPosition?: string;
}

/**
 * Renders a photo slot. Generated SVG placeholders are served as a plain <img>
 * (no optimisation needed); real raster photos you add later go through
 * next/image with lazy loading + a subtle shimmer until they load. Either way
 * the layout looks finished out of the box.
 */
export function Photo({ photo, className, sizes = "100vw", priority = false, objectPosition = "center" }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const isSvg = photo.src.toLowerCase().endsWith(".svg");

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[var(--navy)]", className)}>
      {/* Shimmer placeholder shown until the real image paints. */}
      {!loaded && !isSvg && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(110deg, var(--navy) 30%, var(--blue-dark) 50%, var(--navy) 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s linear infinite",
          }}
          aria-hidden
        />
      )}

      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}
