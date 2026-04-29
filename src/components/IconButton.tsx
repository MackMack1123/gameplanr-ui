"use client";

import React from "react";
import { COLORS, RADIUS } from "../tokens";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /**
   * Required for accessibility — describes the action since there's no visible label.
   */
  "aria-label": string;
  children: React.ReactNode;
}

const sizeMap: Record<IconButtonSize, number> = {
  sm: 28,
  md: 36,
  lg: 40,
};

const variantStyle = (variant: IconButtonVariant, hovered: boolean, pressed: boolean): React.CSSProperties => {
  if (variant === "primary") {
    const bg = pressed ? COLORS.green[700] : COLORS.green[600];
    return {
      backgroundColor: hovered && !pressed ? COLORS.green[700] : bg,
      color: "#ffffff",
      border: "1px solid transparent",
    };
  }
  if (variant === "secondary") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : COLORS.surface.card,
      color: COLORS.ink[2],
      border: `1px solid ${COLORS.surface.border}`,
    };
  }
  if (variant === "ghost") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : "transparent",
      color: COLORS.ink[2],
      border: "1px solid transparent",
    };
  }
  // danger
  const dangerBg = pressed ? "#b91c1c" : "#dc2626";
  return {
    backgroundColor: hovered && !pressed ? "#b91c1c" : dangerBg,
    color: "#ffffff",
    border: "1px solid transparent",
  };
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = "ghost",
    size = "md",
    disabled,
    style,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...rest
  },
  ref,
) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const dim = sizeMap[size];
  const palette = variantStyle(variant, hovered && !disabled, pressed && !disabled);

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={className}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e) => { setPressed(true); onMouseDown?.(e); }}
      onMouseUp={(e) => { setPressed(false); onMouseUp?.(e); }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        padding: 0,
        borderRadius: RADIUS.md,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
        ...palette,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
