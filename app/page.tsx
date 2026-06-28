import dynamic from "next/dynamic";
import { content } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { FloatingQuote } from "@/components/sections/FloatingQuote";

/**
 * Below-the-fold sections are code-split with next/dynamic so the initial load
 * stays light. They still render on the server (default), so content and layout
 * are present immediately — only their JS is deferred.
 */
const StoryTimeline = dynamic(() =>
  import("@/components/sections/StoryTimeline").then((m) => m.StoryTimeline),
);
const MemoryCards = dynamic(() =>
  import("@/components/sections/MemoryCards").then((m) => m.MemoryCards),
);
const LightsSection = dynamic(() =>
  import("@/components/sections/LightsSection").then((m) => m.LightsSection),
);
const Gallery = dynamic(() =>
  import("@/components/sections/Gallery").then((m) => m.Gallery),
);
const FullGallery = dynamic(() =>
  import("@/components/sections/FullGallery").then((m) => m.FullGallery),
);
const Cake = dynamic(() => import("@/components/sections/Cake").then((m) => m.Cake));
const InteractiveSky = dynamic(() =>
  import("@/components/sections/InteractiveSky").then((m) => m.InteractiveSky),
);
const LoveLetter = dynamic(() =>
  import("@/components/sections/LoveLetter").then((m) => m.LoveLetter),
);
const PhotoCollage = dynamic(() =>
  import("@/components/sections/PhotoCollage").then((m) => m.PhotoCollage),
);
const FinalSection = dynamic(() =>
  import("@/components/sections/FinalSection").then((m) => m.FinalSection),
);
const KeyReveal = dynamic(() =>
  import("@/components/sections/KeyReveal").then((m) => m.KeyReveal),
);
const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((m) => m.Footer),
);

/**
 * The whole experience, composed as a chapter-by-chapter scroll. Romantic
 * quotes act as quiet breaths between the major sections. The most meaningful
 * photo (FinalSection) and the personal letter are deliberately near the end.
 */
export default function Home() {
  const [q0, q1, q2, q3] = content.quotes;

  return (
    <>
      <Hero />

      <FloatingQuote quote={q0} />
      <StoryTimeline />

      <FloatingQuote quote={q1} />
      <MemoryCards />

      <LightsSection />

      <FloatingQuote quote={q2} />
      <Gallery />
      <FullGallery />

      <Cake />
      <InteractiveSky />

      <FloatingQuote quote={q3} />
      <LoveLetter />

      <PhotoCollage />

      <FinalSection />

      <KeyReveal />
      <Footer />
    </>
  );
}
