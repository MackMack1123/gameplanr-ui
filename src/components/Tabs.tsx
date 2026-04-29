"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Tabs({ items, value, onChange, className, style }: TabsProps) {
  return (
    <div
      role="tablist"
      className={className}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 4,
        borderBottom: `1px solid ${COLORS.surface.border}`,
        ...style,
      }}
    >
      {items.map((item) => {
        const active = item.value === value;
        return <Tab key={item.value} item={item} active={active} onSelect={onChange} />;
      })}
    </div>
  );
}

function Tab({ item, active, onSelect }: { item: TabItem; active: boolean; onSelect: (v: string) => void }) {
  const [hovered, setHovered] = React.useState(false);
  const color = active ? COLORS.ink[1] : hovered ? COLORS.ink[2] : COLORS.ink[3];

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={item.disabled}
      onClick={() => !item.disabled && onSelect(item.value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "10px 14px",
        marginBottom: -1,
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${active ? COLORS.green[600] : "transparent"}`,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.body,
        fontWeight: active ? TYPE.weight.semibold : TYPE.weight.medium,
        color,
        cursor: item.disabled ? "not-allowed" : "pointer",
        opacity: item.disabled ? 0.55 : 1,
        transition: "color 120ms ease, border-color 120ms ease",
      }}
    >
      {item.label}
    </button>
  );
}
