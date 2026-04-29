"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface KPIItem {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Optional small line below the value (e.g., "vs last week"). */
  hint?: React.ReactNode;
  /** Override the value tone — useful for highlighting a positive/negative figure. */
  valueTone?: "default" | "positive" | "negative";
}

export interface KPIBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: KPIItem[];
  orientation?: "horizontal" | "vertical";
  /** Show thin dividers between items. Default true. */
  dividers?: boolean;
}

const valueColor = (tone: KPIItem["valueTone"]) => {
  if (tone === "positive") return COLORS.green[700];
  if (tone === "negative") return "#b91c1c";
  return COLORS.ink[1];
};

export function KPIBar({ items, orientation = "horizontal", dividers = true, style, ...rest }: KPIBarProps) {
  const isVertical = orientation === "vertical";
  const dividerStyle = isVertical
    ? `1px solid ${COLORS.surface.borderSoft}`
    : `1px solid ${COLORS.surface.borderSoft}`;

  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical ? "stretch" : "center",
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const showDivider = dividers && i > 0;
        const padBlock = isVertical ? "10px 0" : "0";
        const padInline = isVertical ? "0" : "0 16px";
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: isVertical ? "row" : "column",
              alignItems: isVertical ? "center" : "flex-start",
              justifyContent: isVertical ? "space-between" : undefined,
              gap: isVertical ? 12 : 4,
              flex: isVertical ? "0 0 auto" : "1 1 0",
              minWidth: 0,
              padding: `${padBlock}`.trim() + " " + padInline,
              borderTop: showDivider && isVertical ? dividerStyle : "none",
              borderLeft: showDivider && !isVertical ? dividerStyle : "none",
            }}
          >
            <span
              style={{
                fontSize: TYPE.size.small,
                fontWeight: TYPE.weight.medium,
                color: COLORS.ink[3],
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: isVertical ? TYPE.size.body : TYPE.size.h2,
                fontWeight: TYPE.weight.bold,
                color: valueColor(item.valueTone),
                lineHeight: 1.2,
              }}
            >
              {item.value}
            </span>
            {item.hint && !isVertical && (
              <span style={{ fontSize: TYPE.size.small, color: COLORS.ink[3] }}>{item.hint}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
