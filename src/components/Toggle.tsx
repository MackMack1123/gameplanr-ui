"use client";

import React from "react";
import { COLORS } from "../tokens";

export type ToggleSize = "sm" | "md";

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: ToggleSize;
  /**
   * Required for accessibility — describes what the toggle controls.
   */
  "aria-label": string;
}

const sizeMap: Record<ToggleSize, { width: number; height: number; thumb: number; pad: number }> = {
  sm: { width: 32, height: 18, thumb: 14, pad: 2 },
  md: { width: 40, height: 22, thumb: 18, pad: 2 },
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { checked, onChange, size = "md", disabled, style, className, ...rest },
  ref,
) {
  const dims = sizeMap[size];
  const trackBg = checked ? COLORS.green[600] : COLORS.surface.border;
  const thumbX = checked ? dims.width - dims.thumb - dims.pad : dims.pad;

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        onChange(!checked);
        rest.onClick?.(e);
      }}
      className={className}
      {...rest}
      style={{
        position: "relative",
        display: "inline-block",
        width: dims.width,
        height: dims.height,
        padding: 0,
        backgroundColor: trackBg,
        border: "none",
        borderRadius: dims.height / 2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 160ms ease",
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: dims.pad,
          left: thumbX,
          width: dims.thumb,
          height: dims.thumb,
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(15,23,42,0.18)",
          transition: "left 160ms ease",
        }}
      />
    </button>
  );
});
