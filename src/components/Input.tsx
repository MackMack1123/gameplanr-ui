"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  invalid?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const sizeMap: Record<InputSize, { height: number; padX: number; font: string }> = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body  },
  lg: { height: 40, padX: 14, font: TYPE.size.body  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize = "md", invalid = false, leadingIcon, trailingIcon, disabled, style, className, ...rest },
  ref,
) {
  const [focused, setFocused] = React.useState(false);
  const dims = sizeMap[inputSize];
  const borderColor = invalid
    ? "#dc2626"
    : focused
      ? COLORS.green[600]
      : COLORS.surface.border;
  const ringColor = invalid ? "#fecaca" : "#bbf7d0";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: dims.height,
        paddingInline: dims.padX,
        backgroundColor: disabled ? COLORS.surface.hover : COLORS.surface.card,
        border: `1px solid ${borderColor}`,
        borderRadius: RADIUS.md,
        boxShadow: focused ? `0 0 0 3px ${ringColor}` : "none",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        cursor: disabled ? "not-allowed" : "text",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {leadingIcon && (
        <span style={{ display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
        {...rest}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: TYPE.family.sans,
          fontSize: dims.font,
          color: COLORS.ink[1],
          padding: 0,
        }}
      />
      {trailingIcon && (
        <span style={{ display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}
    </span>
  );
});
