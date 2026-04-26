"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type StatusPillVariant =
  | "game"
  | "practice"
  | "tournament"
  | "volunteer"
  | "pending"
  | "approved"
  | "declined"
  | "neutral";

export interface StatusPillProps {
  variant: StatusPillVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function StatusPill({ variant, children, className, style }: StatusPillProps) {
  const colors = COLORS.pill[variant];
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: RADIUS.pill,
        padding: "3px 9px",
        fontSize: TYPE.size.micro,
        fontWeight: TYPE.weight.bold,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
