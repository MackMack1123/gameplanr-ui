"use client";

import React from "react";
import { COLORS } from "../tokens";

export interface GPWordmarkProps {
  /** Rendered height in pixels. Width auto-scales via SVG viewBox. */
  height?: number;
  /** Color of the "GamePlan" text. */
  color?: string;
  /** Color of the trailing "r" + the sparkle accent. */
  accent?: string;
}

/**
 * "GamePlanr" wordmark. The "GamePlan" portion uses Plus Jakarta Sans bold
 * in a dark ink color; the trailing "r" is rendered in the brand green and
 * followed by a small 4-point sparkle in the same green.
 */
export function GPWordmark({
  height = 22,
  color = COLORS.ink[1],
  accent = COLORS.green[600],
}: GPWordmarkProps) {
  return (
    <svg
      height={height}
      viewBox="0 0 240 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GamePlanr"
    >
      <text
        x="0"
        y="44"
        fontFamily='"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
        fontWeight={700}
        fontSize={40}
        letterSpacing="-1.4"
      >
        <tspan fill={color}>GamePlan</tspan>
        <tspan fill={accent}>r</tspan>
      </text>
      <path
        d="M203 12 L207 15 L211 12 L208 17.5 L211 23 L207 20 L203 23 L206 17.5 Z"
        fill={accent}
        opacity={0.85}
      />
    </svg>
  );
}

export interface GPMarkProps {
  /** Pixel size (square). */
  size?: number;
}

/**
 * Solid green "GP" square mark — the favicon-shaped variant of the wordmark.
 * Used in compact spaces where the full wordmark won't fit.
 */
export function GPMark({ size = 32 }: GPMarkProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: COLORS.green[600],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: size * 0.42,
        letterSpacing: "-0.5px",
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
      }}
    >
      GP
    </div>
  );
}
