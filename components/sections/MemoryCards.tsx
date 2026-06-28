"use client";

import { content } from "@/lib/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Photo } from "@/components/ui/Photo";

/**
 * A row of glassmorphism memory cards. Each lifts, scales and glows on hover
 * (handled by GlassCard) and reveals on scroll with a slight stagger.
 */
export function MemoryCards() {
  return (
    <SectionWrapper
      id="memories"
      data-section="Little Moments"
      title={content.memories.sectionTitle}
      subtitle={content.memories.sectionSubtitle}
      titleAnimation="scale"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {content.memories.cards.map((card, i) => (
          <Reveal key={card.title} animation="fade-up" delay={i * 0.12}>
            <GlassCard className="h-full">
              <div className="aspect-[3/4] w-full">
                <Photo photo={card.photo} sizes="(max-width: 640px) 100vw, 33vw" objectPosition="top" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{card.date}</p>
                <h3 className="mt-2 font-serif text-2xl font-light text-white-soft">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
