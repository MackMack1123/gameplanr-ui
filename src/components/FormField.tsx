"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label?: React.ReactNode;
  /** Visually mark required, plus aria. */
  required?: boolean;
  /** Helper text below the input. Hidden when `error` is set. */
  helperText?: React.ReactNode;
  /** Error message below the input. Replaces helperText when present. */
  error?: React.ReactNode;
  /** Wired into the label's htmlFor. Caller still applies it to the input. */
  htmlFor?: string;
  /** Layout: stacked (default) or horizontal (label left, input right). */
  layout?: "stacked" | "horizontal";
}

export function FormField({
  label,
  required,
  helperText,
  error,
  htmlFor,
  layout = "stacked",
  style,
  children,
  ...rest
}: FormFieldProps) {
  const isHorizontal = layout === "horizontal";
  return (
    <div
      {...rest}
      style={{
        display: isHorizontal ? "grid" : "flex",
        flexDirection: isHorizontal ? undefined : "column",
        gridTemplateColumns: isHorizontal ? "minmax(120px, 30%) 1fr" : undefined,
        alignItems: isHorizontal ? "center" : "stretch",
        gap: isHorizontal ? 16 : 6,
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: TYPE.size.small,
            fontWeight: TYPE.weight.semibold,
            color: COLORS.ink[1],
          }}
        >
          {label}
          {required && (
            <span aria-hidden style={{ color: "#dc2626", marginLeft: 4 }}>
              *
            </span>
          )}
        </label>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        {children}
        {error ? (
          <span style={{ fontSize: TYPE.size.small, color: "#dc2626" }}>
            {error}
          </span>
        ) : helperText ? (
          <span style={{ fontSize: TYPE.size.small, color: COLORS.ink[3] }}>
            {helperText}
          </span>
        ) : null}
      </div>
    </div>
  );
}
