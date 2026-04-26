"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-aligned action area — typically Filter group + primary CTA button. */
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Standard page header. Sits at the top of every admin page surface, replaces
 * any per-page top bar.
 */
export function PageHeader({ title, subtitle, actions, className, style }: PageHeaderProps) {
  return (
    <header
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
        paddingBottom: 28,
        ...style,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1
          style={{
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.h1,
            fontWeight: TYPE.weight.bold,
            letterSpacing: TYPE.letterSpacing.tight,
            color: COLORS.ink[1],
            lineHeight: TYPE.lineHeight.tight,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              marginTop: 6,
              marginBottom: 0,
              fontSize: TYPE.size.body,
              color: COLORS.ink[3],
              lineHeight: TYPE.lineHeight.normal,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </header>
  );
}
