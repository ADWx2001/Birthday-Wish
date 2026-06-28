"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMusic } from "react-icons/fi";
import { IoPause } from "react-icons/io5";
import { content } from "@/lib/content";

/**
 * Floating music toggle (bottom-right). Audio is muted/paused by default and
 * NEVER autoplays — it only starts on a real user click, satisfying browser
 * autoplay rules. If the audio file is missing it stays gracefully disabled
 * instead of throwing.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onError = () => setUnavailable(true);
    el.addEventListener("error", onError);
    return () => el.removeEventListener("error", onError);
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el || unavailable) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      // Missing/unsupported file — disable quietly.
      setUnavailable(true);
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={content.music.src} loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={
          unavailable
            ? "Music unavailable"
            : playing
              ? `Pause ${content.music.title}`
              : `Play ${content.music.title}`
        }
        aria-pressed={playing}
        disabled={unavailable}
        className="glass fixed bottom-6 right-6 z-[110] flex h-14 w-14 items-center justify-center rounded-full text-white-soft shadow-xl transition disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-soft)]"
      >
        {/* Pulsing halo when playing */}
        {playing && (
          <span className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-30 blur-md animate-glow" aria-hidden />
        )}
        <span className="relative">
          {playing ? (
            <IoPause className="text-xl text-gold" />
          ) : (
            <FiMusic className="text-xl" />
          )}
        </span>
      </motion.button>
    </>
  );
}
