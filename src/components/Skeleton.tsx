"use client";

import React from "react";
import { COLORS, RADIUS } from "../tokens";

export interface SkeletonProps {
  /** Pixel width or any CSS length. Defaults to 100%. */
  width?: number | string;
  /** Pixel height or any CSS length. Defaults to 14px (one body line). */
  height?: number | string;
  /** Border radius. "pill" → 999px; "circle" → 50%; otherwise treated as a CSS length / token key. */
  shape?: "rect" | "pill" | "circle";
  /** Pause the shimmer (e.g. when the parent wants to stop animations). */
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SHIMMER_KEYFRAMES = `
@keyframes gp-skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

let shimmerStyleInjected = false;
function ensureShimmerStyle() {
  if (typeof document === "undefined" || shimmerStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-skeleton", "");
  tag.appendChild(document.createTextNode(SHIMMER_KEYFRAMES));
  document.head.appendChild(tag);
  shimmerStyleInjected = true;
}

/**
 * Loading shimmer block. Use as a placeholder while async data loads.
 *
 *   <Skeleton width="60%" height={20} />
 *   <Skeleton shape="circle" width={32} height={32} />
 */
export function Skeleton({
  width = "100%",
  height = 14,
  shape = "rect",
  paused,
  className,
  style,
}: SkeletonProps) {
  ensureShimmerStyle();
  const radius =
    shape === "circle" ? "50%" : shape === "pill" ? 999 : RADIUS.sm;

  return (
    <div
      aria-hidden
      className={className}
      style={{
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${COLORS.surface.hover} 0%, ${COLORS.surface.borderSoft} 50%, ${COLORS.surface.hover} 100%)`,
        backgroundSize: "200% 100%",
        animation: paused ? "none" : "gp-skeleton-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}
