"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/lib/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A love letter sealed in an envelope. Click it: the flap lifts, the folded
 * paper slides up out of the pocket and unfolds into the full handwritten
 * message. Saved near the end of the page for emotional impact.
 */
export function LoveLetter() {
  const [open, setOpen] = useState(false);
  const paragraphs = content.letter.body.split(/\n\s*\n/);

  return (
    <SectionWrapper
      id="letter"
      data-section="A Letter For You"
      title={content.letter.sectionTitle}
      titleAnimation="fade-up"
    >
      <Reveal animation="scale" className="flex flex-col items-center">
        <div className="relative w-full max-w-md" style={{ perspective: 1200 }}>
          {/* Envelope */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close the letter" : "Open the letter"}
            className="relative block w-full focus:outline-none"
          >
            <div className="relative h-60 w-full rounded-xl bg-gradient-to-b from-[#2a2150] to-[#1a1338] shadow-2xl ring-1 ring-white/10 sm:h-64">
              {/* Back flap (opens) */}
              <motion.div
                className="absolute inset-x-0 top-0 z-30 origin-top"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: open ? -180 : 0 }}
                transition={{ duration: 0.8, ease: SOFT_EASE }}
              >
                <div
                  className="mx-auto h-0 w-0"
                  style={{
                    borderLeft: "calc(min(28rem, 100%) / 2 - 1px) solid transparent",
                    borderRight: "calc(min(28rem, 100%) / 2 - 1px) solid transparent",
                    borderTop: "7rem solid #352a63",
                  }}
                  aria-hidden
                />
              </motion.div>

              {/* Pocket front */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-xl"
                style={{
                  background: "linear-gradient(180deg, #241b48, #1a1338)",
                  clipPath: "polygon(0 35%, 50% 100%, 100% 35%, 100% 100%, 0 100%)",
                }}
                aria-hidden
              />

              {/* Wax seal heart (hidden once open) */}
              {!open && (
                <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[#b04a66] text-xl text-white shadow-lg">
                    ❤
                  </div>
                  <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-muted">
                    {content.letter.hint}
                  </p>
                </div>
              )}
            </div>
          </button>

          {/* The letter paper rising out of the envelope */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="relative z-10 mx-auto -mt-10 w-[92%] rounded-lg p-7 text-left shadow-2xl sm:p-9"
                style={{
                  background:
                    "linear-gradient(180deg, #fbf6ec 0%, #f3ead6 100%)",
                  color: "#3a2f25",
                }}
                initial={{ y: 40, opacity: 0, height: 0 }}
                animate={{ y: 0, opacity: 1, height: "auto" }}
                exit={{ y: 40, opacity: 0, height: 0 }}
                transition={{ duration: 0.9, ease: SOFT_EASE }}
              >
                <p className="font-script text-2xl text-[#5a3d2b]">{content.letter.greeting}</p>
                <div className="mt-4 space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="font-script text-lg leading-relaxed text-[#4a3a2c]">
                      {p}
                    </p>
                  ))}
                </div>
                <p className="mt-6 text-right font-script text-2xl text-[#5a3d2b]">
                  {content.letter.signature}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
