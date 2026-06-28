"use client";

import { FaHeart } from "react-icons/fa";
import { content } from "@/lib/content";

/** Minimal footer: a tiny beating heart, "Made with love", and the year. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 flex flex-col items-center gap-2 px-5 py-12 text-center text-sm text-muted">
      <FaHeart className="text-rose animate-heartbeat" aria-hidden />
      <p>
        {content.footer.madeWith} · {year}
      </p>
    </footer>
  );
}
