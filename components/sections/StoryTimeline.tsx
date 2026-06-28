"use client";

import { content } from "@/lib/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StoryChapter } from "./StoryChapter";

/**
 * The story timeline: a sequence of alternating chapters. The faint vertical
 * line behind the chapters reads as a thread tying the story together (and is
 * hidden on mobile where the layout is already a single column).
 */
export function StoryTimeline() {
  return (
    <SectionWrapper
      id="story"
      data-section="Our Story"
      title={content.story.sectionTitle}
      subtitle={content.story.sectionSubtitle}
      titleAnimation="fade-up"
    >
      <div className="relative">
        {/* Central thread (desktop only) */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--gold)]/30 to-transparent md:block"
          aria-hidden
        />
        <div className="space-y-24 md:space-y-36">
          {content.story.chapters.map((chapter, i) => (
            <StoryChapter key={chapter.heading} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
