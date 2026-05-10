"use client";

import React from "react";

/** Names of icons known to <AppIcon />. */
export type AppIconName =
  | "trophy"
  | "pitch"
  | "baseball"
  | "calendar"
  | "megaphone"
  | "clipboard"
  | "fundraise"
  | "grid"
  | "arrow-right"
  | "plus"
  | "check"
  | "bell"
  | "lock"
  | "sparkle"
  | "search"
  | "chevron-down"
  | "external";

export interface AppIconProps extends React.SVGAttributes<SVGSVGElement> {
  name: AppIconName;
  /** Pixel size of the icon (square). Defaults to 22. */
  size?: number;
  /** Stroke color. Defaults to currentColor. */
  stroke?: string;
  /** Stroke width. Defaults to 1.75. */
  strokeWidth?: number;
}

/**
 * Hand-drawn 24×24 stroke icon set used by <AppLauncher /> and friends.
 * Every icon is a plain SVG with rounded caps/joins so they sit cleanly inside
 * tinted icon tiles. Pass `size`, `stroke`, `strokeWidth` to override.
 */
export function AppIcon({
  name,
  size = 22,
  stroke = "currentColor",
  strokeWidth = 1.75,
  ...rest
}: AppIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
  switch (name) {
    case "trophy":
      return (
        <svg {...common}>
          <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" />
          <path d="M17 5h2.5a1.5 1.5 0 0 1 0 3H17M7 5H4.5a1.5 1.5 0 0 0 0 3H7" />
          <path d="M10 12.5v3.5h4v-3.5" />
          <path d="M8 19h8" />
          <path d="M9 16h6v3H9z" />
        </svg>
      );
    case "pitch":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
          <path d="M12 5v14" />
          <circle cx="12" cy="12" r="2" />
          <path d="M2.5 9h2v6h-2zM21.5 9h-2v6h2z" />
        </svg>
      );
    case "baseball":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M5.2 7.5c2.2 1.2 3.6 3.6 3.6 6.5 0 1.4-.4 2.8-1 3.9" />
          <path d="M18.8 7.5c-2.2 1.2-3.6 3.6-3.6 6.5 0 1.4.4 2.8 1 3.9" />
          <path d="M7.5 6.2l.6 1M9 5.2l.5 1M16.5 6.2l-.6 1M15 5.2l-.5 1M6.5 18l.6-1M8 19l.5-1M17.5 18l-.6-1M16 19l-.5-1" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v4M16 3v4" />
          <rect x="7" y="13" width="3" height="3" rx="0.5" fill={stroke} stroke="none" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z" />
          <path d="M14 8a4 4 0 0 1 0 8" />
          <path d="M17 5.5a8 8 0 0 1 0 13" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4h6v3H9z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "fundraise":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
          <path d="M9.5 11.5h3a1 1 0 0 0 0-2H10a1 1 0 0 1 0-2h3M11 6.5v1.5M11 13v1.5" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
          <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
          <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
          <rect x="14.5" y="14.5" width="6" height="6" rx="1" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12.5l4 4 10-10" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 1 1 12 0v4l1.5 3h-15L6 13V9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 5h5v5M19 5l-9 9M11 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
  }
}
