import { COLORS } from "@gameplanr/ui";
import { Section, Example } from "../Section";

// Inlined from gameplanr-ui/public/brand/wordmark-*.svg so the docs site
// is self-contained — no asset path coupling between the library and the
// docs Vite app.
const WORDMARK_VIEWBOX = "0 0 360 80";
const SPARKLE_PATH = "M310 22 L316 26 L322 22 L318 30 L322 38 L316 34 L310 38 L314 30 Z";
const WORDMARK_FONT_FAMILY =
  "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

function WordmarkColor({ height = 48 }: { height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="GamePlanr"
      style={{ height, width: "auto" }}
    >
      <text
        x="0"
        y="58"
        fontFamily={WORDMARK_FONT_FAMILY}
        fontWeight={700}
        fontSize={56}
        letterSpacing={-2}
      >
        <tspan fill="#0f172a">GamePlan</tspan>
        <tspan fill={COLORS.green[600]}>r</tspan>
      </text>
      <path d={SPARKLE_PATH} fill={COLORS.green[600]} opacity={0.85} />
    </svg>
  );
}

function WordmarkMono({ height = 48 }: { height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="GamePlanr"
      style={{ height, width: "auto" }}
    >
      <text
        x="0"
        y="58"
        fontFamily={WORDMARK_FONT_FAMILY}
        fontWeight={700}
        fontSize={56}
        letterSpacing={-2}
        fill="#0f172a"
      >
        GamePlanr
      </text>
      <path d={SPARKLE_PATH} fill="#0f172a" opacity={0.9} />
    </svg>
  );
}

function WordmarkWhite({ height = 48 }: { height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="GamePlanr"
      style={{ height, width: "auto" }}
    >
      <text
        x="0"
        y="58"
        fontFamily={WORDMARK_FONT_FAMILY}
        fontWeight={700}
        fontSize={56}
        letterSpacing={-2}
        fill="#ffffff"
      >
        GamePlanr
      </text>
      <path d={SPARKLE_PATH} fill="#ffffff" opacity={0.9} />
    </svg>
  );
}

function GpMark({ size = 56 }: { size?: number }) {
  // The "GP" rounded square used in app sidebars + favicons.
  return (
    <div
      aria-label="GamePlanr GP mark"
      style={{
        width: size,
        height: size,
        backgroundColor: COLORS.green[600],
        borderRadius: 12,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: WORDMARK_FONT_FAMILY,
        fontWeight: 700,
        fontSize: size * 0.42,
        letterSpacing: "-0.02em",
      }}
    >
      GP
    </div>
  );
}

export function BrandSection({ id }: { id: string }) {
  return (
    <Section
      id={id}
      title="Brand"
      description="Wordmark and mark assets. Source SVGs live in gameplanr-ui/public/brand/ and are also inlined in the per-app sidebars where they appear."
    >
      <Example label="Wordmark — color (default for light surfaces)">
        <WordmarkColor />
        <UsageNote>
          Use on white or near-white backgrounds. The green-600 r and sparkle
          are load-bearing brand cues — don't substitute another accent.
        </UsageNote>
      </Example>

      <Example label="Wordmark — mono (single-color contexts)">
        <WordmarkMono />
        <UsageNote>
          Use when color isn't available: monochrome print, watermarks,
          embroidery. Drop the green; keep the typographic shape.
        </UsageNote>
      </Example>

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.ink[3],
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 8,
          }}
        >
          Wordmark — white (on dark surfaces)
        </div>
        <div
          style={{
            padding: 20,
            backgroundColor: COLORS.navy.base,
            border: `1px solid ${COLORS.navy.line}`,
            borderRadius: 12,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
          }}
        >
          <WordmarkWhite />
          <UsageNote dark>
            Use on the navy sidebar surface (where it lives in every app's
            chrome) or over dark photography. White on white is invalid.
          </UsageNote>
        </div>
      </div>

      <Example label="GP mark (favicon, sidebar avatar, square contexts)">
        <GpMark size={56} />
        <GpMark size={40} />
        <GpMark size={28} />
        <UsageNote>
          Rounded green square with white "GP." Used where the wordmark
          doesn't fit — favicons, mobile home-screen icons, sidebar avatars.
        </UsageNote>
      </Example>

      <Example label="Don't">
        <DontTile>Don't recolor the r or sparkle</DontTile>
        <DontTile>Don't stretch or skew</DontTile>
        <DontTile>Don't set on a busy photo without scrim</DontTile>
        <DontTile>Don't mix mono + color variants</DontTile>
      </Example>
    </Section>
  );
}

function UsageNote({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      style={{
        margin: 0,
        flex: "1 1 280px",
        minWidth: 240,
        fontSize: 13,
        lineHeight: 1.45,
        color: dark ? COLORS.navy.textDim : COLORS.ink[3],
      }}
    >
      {children}
    </p>
  );
}

function DontTile({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        flex: "1 1 200px",
        minWidth: 180,
        padding: "12px 14px",
        border: `1px dashed ${COLORS.surface.border}`,
        borderRadius: 8,
        fontSize: 13,
        color: COLORS.ink[3],
      }}
    >
      <span
        style={{
          display: "inline-block",
          marginRight: 8,
          color: "#dc2626",
          fontWeight: 700,
        }}
      >
        ✕
      </span>
      {children}
    </div>
  );
}
