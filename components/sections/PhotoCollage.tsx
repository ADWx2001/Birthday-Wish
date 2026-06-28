"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IMAGES = [
  { src: "/collage/IMG-20250107-WA0014.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0015.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0017.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0018.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0019.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0020.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0021.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0022.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0023.jpg", alt: "A precious moment" },
  { src: "/collage/IMG-20250107-WA0031.jpg", alt: "A precious moment" },
];

// Fixed tilts — deterministic so SSR and client always match (no Math.random).
const TILTS = [1.8, -2.2, 2.5, -1.4, 3.0, -2.8, 1.2, -1.8, 2.2, -3.0];

export function PhotoCollage() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper
      id="collage"
      data-section="Our Collage"
      title="Cuteness Overloaded 💖"
      subtitle="A wall of moments I never want to forget. Aww Aww Aww Loku Madam😍"
      titleAnimation="fade-up"
    >
      <div className="columns-2 gap-4 sm:gap-5 lg:columns-3 xl:columns-4">
        {IMAGES.map((img, i) => (
          <Reveal
            key={img.src}
            animation="scale"
            delay={reduced ? 0 : (i % 4) * 0.07}
            className="mb-4 break-inside-avoid sm:mb-5"
          >
            <motion.div
              className="relative cursor-pointer"
              style={{ rotate: reduced ? 0 : TILTS[i] }}
              whileHover={reduced ? {} : { scale: 1.06, rotate: 0, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {/* Polaroid frame */}
              <div className="bg-[#fefcf5] p-[10px] pb-8 shadow-[0_6px_28px_rgba(0,0,0,0.5)] ring-1 ring-black/5 sm:p-3 sm:pb-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="block h-auto w-full"
                />
                {/* Warm gold shimmer on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold) 0%, transparent 60%)",
                  }}
                  aria-hidden
                />
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
