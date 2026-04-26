"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface EmptyStateProps {
  /** Main illustration / icon area. Consumer supplies whatever artwork. */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Primary call-to-action — typically a button. */
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Centered empty state for "no items found" scenarios. Pattern matches the
 * scheduling-requests reference: illustration, title, helper line, optional
 * primary CTA below.
 */
export function EmptyState({ icon, title, description, action, className, style }: EmptyStateProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "64px 24px",
        ...style,
      }}
    >
      {icon && <div style={{ marginBottom: 24 }}>{icon}</div>}
      <h2
        style={{
          margin: 0,
          fontFamily: TYPE.family.sans,
          fontSize: TYPE.size.h2,
          fontWeight: TYPE.weight.bold,
          color: COLORS.ink[1],
          lineHeight: TYPE.lineHeight.tight,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            fontSize: TYPE.size.body,
            color: COLORS.ink[3],
            lineHeight: TYPE.lineHeight.normal,
            maxWidth: 420,
          }}
        >
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: 24 }}>{action}</div>}
    </div>
  );
}
