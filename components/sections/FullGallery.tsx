"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";

// All images in /public/whole — natural ratios used as-is, no cropping.
const IMAGES = [
  "/whole/1.jpg",
  "/whole/2.jpg",
  "/whole/3.jpg",
  "/whole/4.jpg",
  "/whole/5.jpg",
  "/whole/6.jpg",
  "/whole/7.jpg",
  "/whole/8.jpg",
  "/whole/9.jpg",
  "/whole/10.jpg",
  "/whole/11.jpg",
  "/whole/12.jpg",
  "/whole/13.jpg",
  "/whole/14.jpg",
  "/whole/15.jpg",
  "/whole/16.jpg",
  "/whole/17.jpg",
  "/whole/18.jpg",
  "/whole/19.jpg",
  "/whole/20.jpg",
  "/whole/21.jpg",
  "/whole/22.jpg",
  "/whole/23.jpg",
  "/whole/24.jpg",
  "/whole/25.jpg",
  "/whole/26.jpg",
  "/whole/27.jpg",
  "/whole/29.jpg",
  "/whole/30.jpg",
  "/whole/31.jpg",
  "/whole/32.jpg",
  "/whole/33.jpg",
  "/whole/34.jpg",
  "/whole/35.jpg",
  "/whole/36.jpg",
  "/whole/37.jpg",
  "/whole/38.jpg",
  "/whole/39.jpg",
  "/whole/40.jpg",
  "/whole/41.jpg",
  "/whole/42.jpg",
  "/whole/43.jpg",
  "/whole/44.jpg",
];

export function FullGallery() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { lenis } = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openGallery = () => setOpen(true);
  const closeGallery = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Pause / resume Lenis so it doesn't intercept wheel + touch inside the overlay.
  useEffect(() => {
    if (open) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => { lenis?.start(); };
  }, [open, lenis]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeGallery]);

  // Belt-and-suspenders: stop wheel propagation at the container level so
  // Lenis (even if not fully paused) can't intercept it.
  useEffect(() => {
    if (!open) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  return (
    <>
      {/* ── Trigger section ── */}
      <section
        id="full-gallery"
        data-section="Full Gallery"
        className="relative py-24 sm:py-32"
      >
        {/* Subtle blurred preview strip behind the button */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
          aria-hidden
        >
          <div className="flex h-full gap-1">
            {IMAGES.slice(0, 8).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-full w-auto object-cover blur-sm"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <Reveal
          animation="scale"
          className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--gold)]"
              aria-hidden
            />
            <span className="flex items-center gap-2 font-serif text-sm uppercase tracking-[0.3em] text-gold">
              <BsImages className="text-base" aria-hidden />
              {IMAGES.length} Memories
            </span>
            <span
              className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--gold)]"
              aria-hidden
            />
          </div>

          <h2 className="font-serif text-4xl font-light text-white-soft sm:text-5xl">
            Every Moment With You
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            මගේ චූටි මැණිකගේ මන් ආසම ෆොටෝ ටික. 📸❤️
          </p>

          <GlowButton ref={triggerRef} onClick={openGallery}>
            Open Full Gallery
          </GlowButton>
        </Reveal>
      </section>

      {/* ── Full-screen gallery overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-[#060810]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Full photo gallery"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-white/8 bg-[#060810]/90 px-5 py-4 backdrop-blur-md sm:px-8">
              <div className="flex items-center gap-3">
                <BsImages className="text-xl text-gold" aria-hidden />
                <h2 className="font-serif text-lg font-light text-white-soft sm:text-xl">
                  Every Moment With You
                </h2>
                <span className="rounded-full bg-[var(--gold)]/15 px-2.5 py-0.5 text-xs text-gold">
                  {IMAGES.length}
                </span>
              </div>
              <button
                ref={closeRef}
                onClick={closeGallery}
                aria-label="Close gallery"
                className="rounded-full bg-white/8 p-2.5 text-white-soft transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Scrollable masonry — ref needed for Lenis bypass + touch scroll on iOS */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="columns-2 gap-2 p-3 sm:columns-3 sm:gap-3 sm:p-4 lg:columns-4 xl:columns-5">
                {IMAGES.map((src, i) => (
                  <motion.div
                    key={src}
                    className="mb-2 break-inside-avoid overflow-hidden rounded-lg sm:mb-3 sm:rounded-xl"
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : Math.min(i * 0.025, 0.55),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      loading="lazy"
                      className="block h-auto w-full transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </motion.div>
                ))}
              </div>
              {/* Bottom breathing room */}
              <div className="h-10" aria-hidden />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
