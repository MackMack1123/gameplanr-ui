/**
 * Tailwind preset that exposes GamePlanr v3 design tokens as utility classes.
 *
 * Consumer apps extend this from their `tailwind.config.{js,ts}`:
 *
 *     import gpPreset from "@gameplanr/ui/tailwind.preset";
 *     export default {
 *       presets: [gpPreset],
 *       content: [...]
 *     };
 */

import tailwindcssAnimate from "tailwindcss-animate";
import { COLORS, RADIUS, SHADOW, LAYOUT } from "./tokens";

const preset = {
  plugins: [tailwindcssAnimate],
  theme: {
    extend: {
      colors: {
        "gp-green": {
          50: COLORS.green[50],
          100: COLORS.green[100],
          600: COLORS.green[600],
          700: COLORS.green[700],
          text: COLORS.green.text,
          DEFAULT: COLORS.green[600],
        },
        "gp-navy": {
          DEFAULT: COLORS.navy.base,
          base: COLORS.navy.base,
          surface: COLORS.navy.surface,
          raised: COLORS.navy.raised,
          line: COLORS.navy.line,
          text: COLORS.navy.text,
          "text-dim": COLORS.navy.textDim,
        },
        "gp-ink": {
          1: COLORS.ink[1],
          2: COLORS.ink[2],
          3: COLORS.ink[3],
          4: COLORS.ink[4],
        },
        "gp-surface": {
          page: COLORS.surface.page,
          card: COLORS.surface.card,
          hover: COLORS.surface.hover,
          border: COLORS.surface.border,
          "border-soft": COLORS.surface.borderSoft,
        },
      },
      borderRadius: {
        "gp-sm": RADIUS.sm,
        "gp-md": RADIUS.md,
        "gp-lg": RADIUS.lg,
        "gp-pill": RADIUS.pill,
      },
      boxShadow: {
        "gp-sm": SHADOW.sm,
        "gp-md": SHADOW.md,
      },
      width: {
        "gp-sidebar": `${LAYOUT.sidebarWidth}px`,
      },
      fontFamily: {
        // Apps load Plus Jakarta Sans + Inter and expose them via CSS vars
        // (--font-jakarta, --font-inter). The active font is read from
        // --font-sans, which the FontDebugToggle flips between the two.
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
};

export default preset;
