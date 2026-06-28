"use client";

import { cn } from "@/lib/cn";
import type { StoryChapter as StoryChapterType } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";

/**
 * One chapter of the story. Image and text swap sides on alternating rows
 * (driven by `index`). The photo and the text each animate in independently so
 * the reveal feels layered.
 */
export function StoryChapter({
  chapter,
  index,
}: {
  chapter: StoryChapterType;
  index: number;
}) {
  const imageRight = index % 2 === 1;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 md:gap-14",
        // On desktop, odd rows put the image on the right.
        imageRight ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      {/* Photo */}
      <Reveal
        animation={imageRight ? "slide-left" : "slide-right"}
        className="w-full md:w-1/2"
      >
        <div className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <div className="aspect-square w-full">
            <Photo
              photo={chapter.photo}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectPosition="top"
              priority={index === 0}
              className="transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Warm vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,11,28,0.55))" }}
            aria-hidden
          />
        </div>
      </Reveal>

      {/* Text — uses the chapter's chosen animation */}
      <Reveal animation={chapter.animation} delay={0.15} className="w-full md:w-1/2">
        <div className={cn("text-center", imageRight ? "md:text-right" : "md:text-left")}>
          <h3 className="font-serif text-3xl font-light text-white-soft sm:text-4xl">
            {chapter.heading}
          </h3>
          <div
            className={cn(
              "my-5 h-px w-20 bg-gradient-to-r from-[var(--gold)] to-transparent",
              "mx-auto",
              imageRight ? "md:ml-auto md:mr-0" : "md:mx-0",
            )}
            aria-hidden
          />
          <p className="text-base leading-relaxed text-muted sm:text-lg">{chapter.message}</p>
        </div>
      </Reveal>
    </div>
  );
}
