"use client";

import React from "react";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";

export type StatAccent = "green" | "blue" | "orange" | "purple" | "neutral";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Small text below value, e.g. "+12% vs last week". */
  delta?: React.ReactNode;
  /** Tone of the delta text — green for positive, red for negative, neutral by default. */
  deltaTone?: "positive" | "negative" | "neutral";
  /** Icon shown in a colored circular badge. */
  icon?: React.ReactNode;
  accent?: StatAccent;
}

const accentMap: Record<StatAccent, { bg: string; fg: string }> = {
  green:   { bg: COLORS.green[100], fg: COLORS.green[700] },
  blue:    { bg: COLORS.accent.blue.bg,   fg: COLORS.accent.blue.fg   },
  orange:  { bg: COLORS.accent.orange.bg, fg: COLORS.accent.orange.fg },
  purple:  { bg: COLORS.accent.purple.bg, fg: COLORS.accent.purple.fg },
  neutral: { bg: COLORS.surface.hover,    fg: COLORS.ink[2]           },
};

const deltaToneMap = {
  positive: COLORS.green[700],
  negative: "#b91c1c",
  neutral:  COLORS.ink[3],
};

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, delta, deltaTone = "neutral", icon, accent = "neutral", style, ...rest },
  ref,
) {
  const tone = accentMap[accent];

  return (
    <div
      ref={ref}
      {...rest}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.sm,
        padding: 16,
        ...style,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.small,
            fontWeight: TYPE.weight.medium,
            color: COLORS.ink[3],
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.h1,
            fontWeight: TYPE.weight.bold,
            letterSpacing: TYPE.letterSpacing.tight,
            color: COLORS.ink[1],
            lineHeight: 1.1,
          }}
        >
          {value}
        </span>
        {delta && (
          <span
            style={{
              fontFamily: TYPE.family.sans,
              fontSize: TYPE.size.small,
              fontWeight: TYPE.weight.medium,
              color: deltaToneMap[deltaTone],
            }}
          >
            {delta}
          </span>
        )}
      </div>
      {icon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            backgroundColor: tone.bg,
            color: tone.fg,
            borderRadius: "50%",
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
});
