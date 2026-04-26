"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tailwind.preset.ts
var tailwind_preset_exports = {};
__export(tailwind_preset_exports, {
  default: () => tailwind_preset_default
});
module.exports = __toCommonJS(tailwind_preset_exports);

// src/tokens.ts
var COLORS = {
  // Brand green — Tailwind green-600 family. NOT emerald.
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    600: "#16a34a",
    700: "#15803d",
    text: "#166534"
  },
  // Sidebar / dark surfaces.
  navy: {
    base: "#0b1220",
    surface: "#0f172a",
    raised: "#111a2e",
    line: "#1e293b",
    text: "#e2e8f0",
    textDim: "#94a3b8"
  },
  // Light-surface text ramp.
  ink: {
    1: "#0f172a",
    2: "#334155",
    3: "#64748b",
    4: "#94a3b8"
  },
  surface: {
    page: "#f7f8fa",
    card: "#ffffff",
    hover: "#f3f4f6",
    border: "#e5e7eb",
    borderSoft: "#eef0f3"
  },
  // Status pill colors — used by <StatusPill />.
  pill: {
    game: { bg: "#ede9fe", text: "#6d28d9" },
    practice: { bg: "#dbeafe", text: "#1d4ed8" },
    tournament: { bg: "#ffedd5", text: "#c2410c" },
    volunteer: { bg: "#dcfce7", text: "#166534" },
    pending: { bg: "#fef3c7", text: "#92400e" },
    approved: { bg: "#dcfce7", text: "#166534" },
    declined: { bg: "#fee2e2", text: "#b91c1c" },
    neutral: { bg: "#f3f4f6", text: "#334155" }
  },
  // Accent palette for legends / per-category highlights (not primary UI).
  accent: {
    blue: { fg: "#3b82f6", bg: "#dbeafe" },
    orange: { fg: "#f59e0b", bg: "#fef3c7" },
    purple: { fg: "#8b5cf6", bg: "#ede9fe" },
    red: { fg: "#ef4444", bg: "#fee2e2" }
  }
};
var RADIUS = {
  sm: "6px",
  md: "8px",
  // buttons
  lg: "12px",
  // cards
  pill: "99px"
};
var SHADOW = {
  sm: "0 1px 2px rgba(15,23,42,0.04)",
  md: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)"
};
var LAYOUT = {
  sidebarWidth: 248,
  sidebarPadding: 16
};

// src/tailwind.preset.ts
var preset = {
  theme: {
    extend: {
      colors: {
        "gp-green": {
          50: COLORS.green[50],
          100: COLORS.green[100],
          600: COLORS.green[600],
          700: COLORS.green[700],
          text: COLORS.green.text,
          DEFAULT: COLORS.green[600]
        },
        "gp-navy": {
          DEFAULT: COLORS.navy.base,
          base: COLORS.navy.base,
          surface: COLORS.navy.surface,
          raised: COLORS.navy.raised,
          line: COLORS.navy.line,
          text: COLORS.navy.text,
          "text-dim": COLORS.navy.textDim
        },
        "gp-ink": {
          1: COLORS.ink[1],
          2: COLORS.ink[2],
          3: COLORS.ink[3],
          4: COLORS.ink[4]
        },
        "gp-surface": {
          page: COLORS.surface.page,
          card: COLORS.surface.card,
          hover: COLORS.surface.hover,
          border: COLORS.surface.border,
          "border-soft": COLORS.surface.borderSoft
        }
      },
      borderRadius: {
        "gp-sm": RADIUS.sm,
        "gp-md": RADIUS.md,
        "gp-lg": RADIUS.lg,
        "gp-pill": RADIUS.pill
      },
      boxShadow: {
        "gp-sm": SHADOW.sm,
        "gp-md": SHADOW.md
      },
      width: {
        "gp-sidebar": `${LAYOUT.sidebarWidth}px`
      },
      fontFamily: {
        // Apps load Plus Jakarta Sans + Inter and expose them via CSS vars
        // (--font-jakarta, --font-inter). The active font is read from
        // --font-sans, which the FontDebugToggle flips between the two.
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"]
      }
    }
  }
};
var tailwind_preset_default = preset;
