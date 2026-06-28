"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaKey, FaLock } from "react-icons/fa";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { GlowButton } from "@/components/ui/GlowButton";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The locked finale: a pair of doors sealed with a keyhole. Enter the secret
 * code (her age) and a key turns, the lock fades, the doors swing open (3D
 * rotateY) and the photos of our future home are revealed one by one.
 *
 * The reveal content sits behind the doors the whole time; the doors simply
 * uncover it. Under reduced motion the doors open instantly with no rotation.
 */
export function KeyReveal() {
  const reduced = useReducedMotion();
  const { surprise } = content;

  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const attempt = () => {
    if (value.trim() === surprise.code) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    attempt();
  };

  // Timing — collapses to instant under reduced motion.
  const keyT = reduced ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: SOFT_EASE };
  const lockT = reduced ? { duration: 0 } : { duration: 0.4, delay: 0.7 };
  const doorT = reduced ? { duration: 0 } : { duration: 1.1, delay: 0.9, ease: SOFT_EASE };

  return (
    <SectionWrapper
      id="surprise"
      data-section="One More Surprise"
      title={surprise.sectionTitle}
      titleAnimation="fade-up"
    >
      <Reveal animation="scale" className="flex flex-col items-center">
        {/* ── The door / reveal stage ── */}
        <div
          className="relative w-full max-w-3xl"
          style={{ perspective: 1600 }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-white/15 sm:aspect-[16/10]">
            {/* Reveal content (behind the doors) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[var(--navy)] to-[var(--blue-dark)] p-5 sm:p-8"
              aria-hidden={!unlocked}
            >
              <motion.div
                initial="hidden"
                animate={unlocked ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.18, delayChildren: reduced ? 0 : 1.3 } },
                }}
                className="flex w-full flex-col items-center"
              >
                <motion.h3
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="text-glow-gold mb-5 text-center font-serif text-3xl font-light text-white-soft sm:text-4xl"
                >
                  {surprise.heading}
                </motion.h3>

                <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
                  {surprise.images.map((img) => (
                    <motion.div
                      key={img.placeholder}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.6, ease: SOFT_EASE }}
                      className="group overflow-hidden rounded-xl ring-1 ring-white/15"
                    >
                      <div className="aspect-[4/3] w-full">
                        <Photo
                          photo={img}
                          sizes="(max-width: 640px) 45vw, 18rem"
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="mt-5 max-w-lg text-center text-sm leading-relaxed text-muted sm:text-base"
                >
                  {surprise.message}
                </motion.p>
              </motion.div>
            </div>

            {/* Left door leaf */}
            <DoorLeaf side="left" open={unlocked} transition={doorT} />
            {/* Right door leaf */}
            <DoorLeaf side="right" open={unlocked} transition={doorT} />

            {/* Lock plate + key (overlay on the seam, fades away on unlock) */}
            <AnimatePresence>
              {!unlocked && (
                <motion.div
                  className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={lockT}
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#0c1030] shadow-2xl ring-2 ring-[var(--gold)]/40">
                    {/* glow */}
                    <span className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-20 blur-xl animate-glow" aria-hidden />
                    {/* keyhole */}
                    <FaLock className="text-2xl text-[var(--gold)]/70" aria-hidden />
                    {/* the turning key */}
                    <motion.span
                      className="absolute text-3xl text-[var(--gold-soft)]"
                      style={{ originX: 0.5, originY: 0.5 }}
                      animate={{ rotate: unlocked ? 90 : 0, opacity: unlocked ? 1 : 0.0 }}
                      transition={keyT}
                      aria-hidden
                    >
                      <FaKey />
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Passcode / closing line below the doors ── */}
        <div className="mt-10 w-full max-w-md text-center">
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.form
                key="lock-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={error && !reduced ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <label htmlFor="surprise-code" className="font-serif text-lg text-white-soft">
                  {surprise.lockPrompt}
                </label>

                <input
                  id="surprise-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={6}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError(false);
                  }}
                  aria-invalid={error}
                  aria-describedby="surprise-hint"
                  placeholder="• •"
                  className="glass w-40 rounded-2xl px-5 py-3 text-center text-2xl tracking-[0.5em] text-white-soft outline-none transition focus:ring-2 focus:ring-[var(--gold-soft)]"
                />

                <GlowButton type="submit">Unlock the surprise</GlowButton>

                <p id="surprise-hint" className="text-sm text-muted" aria-live="polite">
                  {error ? (
                    <span className="text-rose">{surprise.wrongMessage}</span>
                  ) : (
                    surprise.lockHint
                  )}
                </p>
              </motion.form>
            ) : (
              <motion.p
                key="closing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 1.6, duration: 1 }}
                className="font-serif text-xl font-light italic leading-relaxed text-white-soft"
              >
                {surprise.closing}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

/**
 * One leaf of the double door. Swings open around its outer edge (rotateY) to
 * uncover the reveal behind it. Decorated with inset gold-trim panels.
 */
function DoorLeaf({
  side,
  open,
  transition,
}: {
  side: "left" | "right";
  open: boolean;
  transition: object;
}) {
  const isLeft = side === "left";
  return (
    <motion.div
      className="absolute top-0 z-20 h-full w-1/2"
      style={{
        left: isLeft ? 0 : "50%",
        transformOrigin: isLeft ? "left center" : "right center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        background:
          "linear-gradient(135deg, #161d45 0%, #0f1330 60%, #0c1030 100%)",
        boxShadow: isLeft
          ? "inset -8px 0 24px rgba(0,0,0,0.5)"
          : "inset 8px 0 24px rgba(0,0,0,0.5)",
      }}
      animate={{ rotateY: open ? (isLeft ? -115 : 115) : 0 }}
      transition={transition}
      aria-hidden
    >
      {/* Decorative inset panels */}
      <div className="absolute inset-5 rounded-lg border border-[var(--gold)]/25 sm:inset-7" />
      <div className="absolute inset-9 rounded-md border border-[var(--gold)]/15 sm:inset-12" />
      {/* Door handle near the seam */}
      <span
        className={`absolute top-1/2 h-6 w-2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[var(--gold-soft)] to-[var(--gold)] shadow ${
          isLeft ? "right-3" : "left-3"
        }`}
      />
    </motion.div>
  );
}
