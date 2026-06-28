import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the generated SVG placeholders to be served through next/image if needed.
    // Real raster photos you add later are optimised normally.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
