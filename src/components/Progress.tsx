"use client";

import React from "react";
import { COLORS } from "../tokens";

export type ProgressTone = "brand" | "neutral" | "warning" | "danger";

export interface ProgressProps {
  /** Current value, clamped to [0, max]. Optional when `indeterminate` is true. */
  value?: number;
  /** Max value. Defaults to 100. */
  max?: number;
  /** Bar tone — defaults to brand green. */
  tone?: ProgressTone;
  /** Visual size — sm = 4px, md = 6px (default), lg = 10px. */
  size?: "sm" | "md" | "lg";
  /** Render the value as a percent label to the right of the bar. */
  showLabel?: boolean;
  /** Indeterminate mode — pass undefined value or set indeterminate true. */
  indeterminate?: boolean;
  /** Accessible label for screen readers. Defaults to "Progress". */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = { sm: 4, md: 6, lg: 10 } as const;

const toneFg: Record<ProgressTone, string> = {
  brand:   COLORS.green[600],
  neutral: COLORS.ink[2],
  warning: "#f59e0b",
  danger:  "#dc2626",
};

const INDETERMINATE_KEYFRAMES = `
@keyframes gp-progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;

let indetStyleInjected = false;
function ensureIndetStyle() {
  if (typeof document === "undefined" || indetStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-progress", "");
  tag.appendChild(document.createTextNode(INDETERMINATE_KEYFRAMES));
  document.head.appendChild(tag);
  indetStyleInjected = true;
}

/**
 * Determinate or indeterminate progress bar.
 *
 *   <Progress value={42} />
 *   <Progress value={3} max={10} tone="warning" showLabel />
 *   <Progress indeterminate />
 */
export function Progress({
  value = 0,
  max = 100,
  tone = "brand",
  size = "md",
  showLabel,
  indeterminate,
  ariaLabel = "Progress",
  className,
  style,
}: ProgressProps) {
  if (indeterminate) ensureIndetStyle();
  const pct = indeterminate
    ? null
    : Math.min(100, Math.max(0, (value / max) * 100));

  const bar = (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      style={{
        position: "relative",
        flex: 1,
        height: sizeMap[size],
        background: COLORS.surface.hover,
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: indeterminate ? "30%" : `${pct}%`,
          background: toneFg[tone],
          borderRadius: 999,
          transition: indeterminate ? "none" : "width 200ms ease",
          animation: indeterminate
            ? "gp-progress-indeterminate 1.6s cubic-bezier(.45,0,.4,1) infinite"
            : "none",
        }}
      />
    </div>
  );

  if (!showLabel) {
    return (
      <div className={className} style={{ display: "flex", alignItems: "center", ...style }}>
        {bar}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: 10, ...style }}
    >
      {bar}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.ink[3],
          minWidth: 32,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {indeterminate ? "…" : `${Math.round(pct ?? 0)}%`}
      </span>
    </div>
  );
}
