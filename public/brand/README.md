# GamePlanr Brand Kit (Phase 0)

Minimal first pass — wordmark only. Sub-product icons and the favicon
set will land in `v3.1.0` once final assets exist (these references
were AI-generated PNGs without canonical SVG sources).

## Wordmark lockups

| File | Use on | Notes |
|---|---|---|
| `wordmark-color.svg` | white / light surfaces | "GamePlan" navy `#0f172a` + green `r` `#16a34a`. The default. |
| `wordmark-white.svg` | navy `#0f172a` or green `#16a34a` surfaces | All white. Use when the bg already supplies brand color. |
| `wordmark-mono.svg`  | print, single-color reproductions | All navy `#0f172a`. |

## Implementation note

The wordmarks are text-based SVGs using `Plus Jakarta Sans`. They
render correctly:

- **Inside any GamePlanr app** — every consumer loads the font.
- **In Storybook / docs / READMEs** — falls back to system sans, still legible.
- **In environments without the font** — graceful sans-serif fallback.

For pixel-perfect reproduction outside font-loaded contexts (e.g.,
print, third-party embeds, social previews), convert the SVGs to
outlined paths in a vector editor. The path-converted versions can
ship alongside these in `v3.1.0`.

## Brand colors (canonical, do not alter)

- Brand green: `#16a34a` (Tailwind green-600). NOT emerald.
- Navy: `#0f172a` (sidebar, dark surfaces, primary text).
- White: `#ffffff` (lockup on dark surfaces).

These match `src/tokens.ts` — the wordmark and tokens stay in sync.
