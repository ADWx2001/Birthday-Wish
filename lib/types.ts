/**
 * Shared content types. Everything the page renders is described here so that
 * `content.ts` stays fully typed and editing copy never requires touching a component.
 */

/** The set of reveal animations a section can request. Keep in sync with `Reveal`. */
export type RevealAnimation =
  | "fade-up"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "rotate"
  | "zoom"
  | "blur"
  | "opacity";

/**
 * A photo slot. `src` points at whatever should render (an SVG placeholder by
 * default, or a real image once you drop one into /public/photos and update it).
 * `placeholder` is the human label baked into the generated placeholder.
 */
export interface PhotoContent {
  placeholder: string;
  src: string;
  alt: string;
}

export interface StoryChapter {
  photo: PhotoContent;
  heading: string;
  message: string;
  /** Each chapter can request a different reveal so animations never feel repetitive. */
  animation: RevealAnimation;
}

export interface MemoryCardContent {
  photo: PhotoContent;
  date: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  photo: PhotoContent;
  /** Optional relative tile height used by the masonry layout (1 = base). */
  span?: number;
}

export interface SurpriseContent {
  sectionTitle: string;
  /** Short line above the lock. */
  lockPrompt: string;
  /** Small playful hint about what the code is. */
  lockHint: string;
  /** The passcode that unlocks the surprise (her age). */
  code: string;
  /** Shown briefly when the wrong code is entered. */
  wrongMessage: string;
  /** Revealed once unlocked. */
  heading: string;
  message: string;
  images: PhotoContent[];
  closing: string;
}

export interface FinalSectionContent {
  photo: PhotoContent;
  heading: string;
  paragraph: string;
  signature: string;
  loveLine: string;
  closingLine: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  loading: {
    message: string;
  };
  hero: {
    heading: string;
    typewriter: string[];
    ctaLabel: string;
  };
  story: {
    sectionTitle: string;
    sectionSubtitle: string;
    chapters: StoryChapter[];
  };
  memories: {
    sectionTitle: string;
    sectionSubtitle: string;
    cards: MemoryCardContent[];
  };
  lights: {
    sectionTitle: string;
    caption: string;
    /** How many bulbs hang in the journey section. */
    bulbCount: number;
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: GalleryItem[];
  };
  cake: {
    sectionTitle: string;
    instruction: string;
    buttonLabel: string;
    /** Revealed after the candles are blown out. */
    wishMessage: string;
  };
  sky: {
    sectionTitle: string;
    caption: string;
    /** Random positive messages shown when a star is clicked. */
    starMessages: string[];
    shootingStarMessage: string;
  };
  letter: {
    sectionTitle: string;
    hint: string;
    greeting: string;
    /** Long body of the letter — paragraphs are split on blank lines. */
    body: string;
    signature: string;
  };
  quotes: string[];
  surprise: SurpriseContent;
  final: FinalSectionContent;
  footer: {
    madeWith: string;
  };
  /** Easter-egg reveal copy. */
  secrets: {
    heartClickMessage: string;
  };
  /** Audio file in /public. Player degrades gracefully if the file is missing. */
  music: {
    src: string;
    title: string;
  };
}
