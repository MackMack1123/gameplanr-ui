"use client";

import React from "react";
import { COLORS } from "../tokens";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps {
  orientation?: SeparatorOrientation;
  /** When true, the separator is decorative (default). Set false for semantic
   *  separators that should be announced to assistive tech. */
  decorative?: boolean;
  /** Pixel inset on both ends (margin), useful inside dense menus. */
  inset?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Plain divider line. Defaults to horizontal full-width.
 *
 *   <Separator />
 *   <Separator orientation="vertical" style={{ height: 24 }} />
 */
export function Separator({
  orientation = "horizontal",
  decorative = true,
  inset,
  className,
  style,
}: SeparatorProps) {
  const isVertical = orientation === "vertical";
  const ariaProps = decorative
    ? { "aria-hidden": true as const }
    : { role: "separator", "aria-orientation": orientation };

  return (
    <div
      className={className}
      {...ariaProps}
      style={{
        flexShrink: 0,
        background: COLORS.surface.border,
        ...(isVertical
          ? { width: 1, height: "100%", marginInline: inset }
          : { height: 1, width: "100%", marginBlock: inset }),
        ...style,
      }}
    />
  );
}
