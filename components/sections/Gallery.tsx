"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { content } from "@/lib/content";
import type { GalleryItem } from "@/lib/types";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Masonry gallery. Tiles use CSS columns so they keep their varied heights.
 * Clicking a tile opens a fullscreen modal that zooms smoothly from the tile
 * (shared `layoutId`), over a dark blurred backdrop. ESC and clicking outside
 * close it; focus is trapped while open for keyboard users.
 */
export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (item: GalleryItem, index: number, trigger: HTMLElement) => {
    lastFocused.current = trigger;
    setActive(item);
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActive(null);
    setActiveIndex(-1);
    // Return focus to the tile that opened the modal.
    lastFocused.current?.focus();
  }, []);

  // Keyboard: ESC to close, trap Tab inside the dialog.
  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // Only the close button is focusable here, so keep focus on it.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <SectionWrapper
      id="gallery"
      data-section="Our Gallery"
      title={content.gallery.sectionTitle}
      subtitle={content.gallery.sectionSubtitle}
      titleAnimation="blur"
    >
      {/* Masonry via CSS columns — images size themselves via h-auto so nothing is cropped */}
      <div className="columns-2 gap-4 sm:gap-5 lg:columns-3">
        {content.gallery.items.map((item, i) => (
          <Reveal
            key={item.photo.placeholder}
            animation={i % 2 ? "fade-up" : "scale"}
            delay={(i % 3) * 0.08}
            className="mb-4 break-inside-avoid sm:mb-5"
          >
            <motion.button
              type="button"
              layoutId={`gallery-${i}`}
              onClick={(e) => open(item, i, e.currentTarget)}
              className="block w-full overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-[var(--gold)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]"
              aria-label={`Open photo`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                className="block h-auto w-full"
              />
            </motion.button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.photo.alt}
          >
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close image"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white-soft transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]"
            >
              <IoClose className="text-2xl" />
            </button>

            <motion.div
              layoutId={`gallery-${activeIndex}`}
              className="overflow-hidden rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.photo.src}
                alt={active.photo.alt}
                className="block h-auto max-h-[85vh] w-auto max-w-[90vw]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
