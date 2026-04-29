"use client";

import React from "react";
import { COLORS } from "../tokens";

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left-side filter controls (Select, Input, DateRange, etc.). */
  filters?: React.ReactNode;
  /** Right-aligned actions (e.g., "+ New Request" Button). */
  actions?: React.ReactNode;
  /** Drop the bottom divider — useful when sitting directly above a Table card. */
  bare?: boolean;
}

/**
 * Horizontal bar that sits above tables and lists. Filters wrap on small viewports;
 * actions stay pinned right.
 */
export function FilterBar({ filters, actions, bare = false, style, children, ...rest }: FilterBarProps) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        paddingBottom: bare ? 0 : 12,
        marginBottom: bare ? 0 : 12,
        borderBottom: bare ? "none" : `1px solid ${COLORS.surface.borderSoft}`,
        ...style,
      }}
    >
      {filters && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
          {filters}
        </div>
      )}
      {children}
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          {actions}
        </div>
      )}
    </div>
  );
}
