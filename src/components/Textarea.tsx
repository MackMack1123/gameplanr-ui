"use client";

import React, { useEffect, useRef } from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Visual size — controls padding + line-height feel. */
  size?: "sm" | "md" | "lg";
  /** Render in error state (red ring + border). */
  invalid?: boolean;
  /** Auto-grow height to fit content (with min/max from rows + maxRows). */
  autoResize?: boolean;
  /** Cap auto-resize at this many rows (default 12). */
  maxRows?: number;
}

const padMap = { sm: "8px 10px", md: "10px 12px", lg: "12px 14px" } as const;
const fontMap = { sm: 12.5, md: 14, lg: 15.5 } as const;

/**
 * Multi-line text input. Same conventions as Input — token-driven, plain HTML,
 * focus ring on the brand green.
 *
 *   <Textarea placeholder="Notes" rows={4} />
 *   <Textarea autoResize maxRows={10} value={s} onChange={e => setS(e.target.value)} />
 */
export function Textarea({
  size = "md",
  invalid,
  autoResize,
  maxRows = 12,
  rows = 3,
  style,
  onChange,
  value,
  defaultValue,
  ...rest
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = React.useState(false);

  const fitToContent = React.useCallback(() => {
    const el = ref.current;
    if (!el || !autoResize) return;
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20") || 20;
    const maxHeight = lineHeight * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [autoResize, maxRows]);

  useEffect(() => {
    fitToContent();
  }, [fitToContent, value, defaultValue]);

  const ringColor = invalid
    ? "#dc2626"
    : focused
      ? COLORS.green[600]
      : COLORS.surface.border;

  return (
    <textarea
      ref={ref}
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange?.(e);
        if (autoResize) fitToContent();
      }}
      onFocus={(e) => {
        setFocused(true);
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        rest.onBlur?.(e);
      }}
      aria-invalid={invalid || undefined}
      style={{
        width: "100%",
        padding: padMap[size],
        fontSize: fontMap[size],
        lineHeight: 1.5,
        fontFamily: TYPE.family.sans,
        color: COLORS.ink[1],
        background: COLORS.surface.card,
        border: `1px solid ${ringColor}`,
        borderRadius: RADIUS.md,
        outline: "none",
        boxShadow: focused
          ? `0 0 0 3px ${invalid ? "rgba(220,38,38,0.18)" : "rgba(22,163,74,0.18)"}`
          : "none",
        resize: autoResize ? "none" : "vertical",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        ...style,
      }}
      {...rest}
    />
  );
}
