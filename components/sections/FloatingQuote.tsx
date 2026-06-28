"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

/**
 * A minimal romantic quote that fades in and gently floats as it enters view.
 * Placed between major sections as a quiet breath in the story.
 */
export function FloatingQuote({ quote }: { quote: string }) {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center px-6 py-24 sm:py-32">
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <FaQuoteLeft className="mx-auto mb-5 text-xl text-gold/70" aria-hidden />
        <p className="font-serif text-2xl font-light italic leading-relaxed text-white-soft/90 sm:text-3xl md:text-4xl">
          {quote}
        </p>
      </motion.blockquote>
    </div>
  );
}
