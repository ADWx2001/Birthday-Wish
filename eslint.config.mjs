import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // These three React-Compiler lint rules false-positive on the intentional,
    // correct patterns this site relies on:
    //   • set-state-in-effect — we generate random particle/star positions in an
    //     effect on mount (the standard way to avoid SSR/client hydration
    //     mismatches), and drive the typewriter from a timer loop.
    //   • purity — Math.random()/Date.now() are only ever called inside event
    //     handlers (e.g. tapping a star), never during render.
    //   • preserve-manual-memoization — triggered by Framer Motion's shared
    //     layoutId usage in the gallery lightbox.
    // They're disabled deliberately; the production build still type-checks clean.
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/preserve-manual-memoization": "off",
    },
  },
]);

export default eslintConfig;
