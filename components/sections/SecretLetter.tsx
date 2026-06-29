"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Reveal } from "@/components/ui/Reveal";
import { GlowButton } from "@/components/ui/GlowButton";

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

export function SecretLetter() {
  const reduced = useReducedMotion();
  const { secretLetter } = content;

  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(false);

  const attempt = () => {
    if (value.trim() === secretLetter.code) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setValue("");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    attempt();
  };

  return (
    <SectionWrapper
      id="secret-letter"
      data-section="Secret Letter"
      title={secretLetter.sectionTitle}
      titleAnimation="fade-up"
    >
      <Reveal animation="scale" className="flex flex-col items-center gap-10">

        {/* ── Envelope ── */}
        <div className="relative w-full max-w-sm" style={{ perspective: 1200 }}>
          {/* Envelope shell */}
          <div
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #c8a96e 0%, #a07840 100%)",
              height: 320,
            }}
          >
            {/* Parchment interior (always visible behind the flap) */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "linear-gradient(160deg, #fbf6ec 0%, #f3ead6 100%)" }}
              aria-hidden
            />

            {/* Letter slides up when unlocked */}
            <AnimatePresence>
              {unlocked && (
                <motion.div
                  className="absolute inset-0 overflow-y-auto rounded-2xl p-5 sm:p-7"
                  initial={reduced ? false : { y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 0.65, ease: SOFT_EASE }}
                >
                  <p className="mb-3 font-script text-2xl" style={{ color: "#5a3a1a" }}>
                    {secretLetter.heading}
                  </p>
                  <p
                    className="font-serif text-sm leading-relaxed sm:text-base whitespace-pre-line"
                    style={{ color: "#4a3020" }}
                  >
                    {secretLetter.body}
                  </p>
                  <p className="mt-5 text-right font-script text-xl" style={{ color: "#5a3a1a" }}>
                    {secretLetter.signature}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flap — rotates back (rotateX -180) on unlock, backface hidden so it vanishes cleanly */}
            <motion.div
              className="absolute left-0 right-0 top-0 z-10"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                background: "linear-gradient(150deg, #d9bc82 0%, #b89050 100%)",
                height: "50%",
                clipPath: "polygon(0% 0%, 50% 88%, 100% 0%)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
              }}
              animate={{ rotateX: unlocked ? -180 : 0 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.85, delay: 0.12, ease: SOFT_EASE }
              }
            />

            {/* Wax seal — centred on the flap's V tip, fades out on unlock */}
            <AnimatePresence>
              {!unlocked && (
                <motion.div
                  className="absolute left-1/2 z-20 -translate-x-1/2"
                  style={{ top: "calc(50% - 22px)" }}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full shadow-xl ring-2 ring-white/30"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, #f07090, #c0395a)",
                    }}
                  >
                    <FaHeart className="text-sm text-white drop-shadow" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Code input / post-unlock message ── */}
        <div className="w-full max-w-md text-center">
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.form
                key="lock-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  error && !reduced
                    ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] }
                    : { opacity: 1, y: 0, x: 0 }
                }
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <label htmlFor="letter-code" className="font-serif text-lg text-white-soft">
                  {secretLetter.lockPrompt}
                </label>

                <input
                  id="letter-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError(false);
                  }}
                  aria-invalid={error}
                  placeholder="• •"
                  className="glass w-36 rounded-2xl px-5 py-3 text-center text-2xl tracking-[0.5em] text-white-soft outline-none transition focus:ring-2 focus:ring-[var(--gold-soft)]"
                />

                <GlowButton type="submit">Open the letter 💌</GlowButton>

                <div className="flex min-h-[4.5rem] flex-col items-center gap-2" aria-live="polite">
                  {error && (
                    <p className="text-sm text-rose">{secretLetter.wrongMessage}</p>
                  )}
                  {attempts >= 1 && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-xs text-sm leading-relaxed text-gold-soft"
                    >
                      💡 Count the glowing bulbs in the fairy lights section at the very top of the page — that number is your key.
                    </motion.p>
                  )}
                  {!error && attempts === 0 && (
                    <p className="text-sm text-muted">{secretLetter.lockHint}</p>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.p
                key="unlocked-msg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 1.8, duration: 1 }}
                className="font-serif text-xl font-light italic leading-relaxed text-white-soft"
              >
                💌 You found it. This letter was always meant for you.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </Reveal>
    </SectionWrapper>
  );
}
