"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  selectSize?: SelectSize;
  invalid?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const sizeMap: Record<SelectSize, { height: number; padX: number; font: string }> = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body  },
  lg: { height: 40, padX: 14, font: TYPE.size.body  },
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { selectSize = "md", invalid = false, options, placeholder, disabled, style, className, ...rest },
  ref,
) {
  const [focused, setFocused] = React.useState(false);
  const dims = sizeMap[selectSize];
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
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: dims.height,
        backgroundColor: disabled ? COLORS.surface.hover : COLORS.surface.card,
        border: `1px solid ${borderColor}`,
        borderRadius: RADIUS.md,
        boxShadow: focused ? `0 0 0 3px ${ringColor}` : "none",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
        {...rest}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          height: "100%",
          paddingInline: dims.padX,
          paddingRight: dims.padX + 18,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: TYPE.family.sans,
          fontSize: dims.font,
          color: COLORS.ink[1],
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: dims.padX,
          top: "50%",
          transform: "translateY(-50%)",
          color: COLORS.ink[3],
          pointerEvents: "none",
          display: "inline-flex",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
});
