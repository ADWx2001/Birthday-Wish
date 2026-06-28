import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { content } from "@/lib/content";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { EasterEggProvider } from "@/components/providers/EasterEggProvider";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";
import { Particles } from "@/components/effects/Particles";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { ShootingStar } from "@/components/effects/ShootingStar";
import { ProgressBar } from "@/components/ProgressBar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LoadingScreen } from "@/components/LoadingScreen";

// Elegant serif for headings, clean sans for body, handwriting for the letter.
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#04050a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${script.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider>
          <EasterEggProvider>
            {/* Global ambient layers (fixed, behind/around content) */}
            <ParallaxBackground />
            <div className="pointer-events-none fixed inset-0 -z-10">
              <Particles count={32} />
            </div>
            <FloatingHearts />
            <ShootingStar />

            {/* Persistent UI */}
            <ProgressBar />
            <MusicPlayer />

            {/* Opening curtain */}
            <LoadingScreen />

            <main className="relative z-10">{children}</main>
          </EasterEggProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
