/**
 * GamePlanr v3 design tokens.
 *
 * Single source of truth for color, type, spacing, radius, and shadow values
 * across Field, Tournament, Volunteer, Calendar (and later Lineup). Components
 * in this lib reference these tokens via inline styles. Consumers that want
 * the same tokens available as Tailwind classes should extend the preset
 * exported from `./tailwind.preset`.
 */

export const COLORS = {
  // Brand green — Tailwind green-600 family. NOT emerald.
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    600: "#16a34a",
    700: "#15803d",
    text: "#166534",
  },

  // Sidebar / dark surfaces.
  navy: {
    base: "#0b1220",
    surface: "#0f172a",
    raised: "#111a2e",
    line: "#1e293b",
    text: "#e2e8f0",
    textDim: "#94a3b8",
  },

  // Light-surface text ramp.
  ink: {
    1: "#0f172a",
    2: "#334155",
    3: "#64748b",
    4: "#94a3b8",
  },

  surface: {
    page: "#f7f8fa",
    card: "#ffffff",
    hover: "#f3f4f6",
    border: "#e5e7eb",
    borderSoft: "#eef0f3",
  },

  // Status pill colors — used by <StatusPill />.
  pill: {
    game:        { bg: "#ede9fe", text: "#6d28d9" },
    practice:    { bg: "#dbeafe", text: "#1d4ed8" },
    tournament:  { bg: "#ffedd5", text: "#c2410c" },
    volunteer:   { bg: "#dcfce7", text: "#166534" },
    pending:     { bg: "#fef3c7", text: "#92400e" },
    approved:    { bg: "#dcfce7", text: "#166534" },
    declined:    { bg: "#fee2e2", text: "#b91c1c" },
    neutral:     { bg: "#f3f4f6", text: "#334155" },
  },

  // Accent palette for legends / per-category highlights (not primary UI).
  accent: {
    blue:   { fg: "#3b82f6", bg: "#dbeafe" },
    orange: { fg: "#f59e0b", bg: "#fef3c7" },
    purple: { fg: "#8b5cf6", bg: "#ede9fe" },
    red:    { fg: "#ef4444", bg: "#fee2e2" },
  },
} as const;

export const TYPE = {
  family: {
    sans: 'var(--font-sans, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif)',
  },
  size: {
    h1: "28px",
    h2: "20px",
    h3: "16px",
    body: "14px",
    small: "13px",
    micro: "11px",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: "-0.56px", // h1
    normal: "0",
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
  },
} as const;

export const RADIUS = {
  sm: "6px",
  md: "8px",   // buttons
  lg: "12px",  // cards
  pill: "99px",
} as const;

export const SHADOW = {
  sm: "0 1px 2px rgba(15,23,42,0.04)",
  md: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
} as const;

export const LAYOUT = {
  sidebarWidth: 248,
  sidebarPadding: 16,
} as const;

export const TOKENS = { COLORS, TYPE, RADIUS, SHADOW, LAYOUT } as const;
export type Tokens = typeof TOKENS;
