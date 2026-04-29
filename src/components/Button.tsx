"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const sizeMap: Record<ButtonSize, { height: number; padX: number; font: string; gap: number }> = {
  sm: { height: 28, padX: 10, font: TYPE.size.small, gap: 6 },
  md: { height: 36, padX: 14, font: TYPE.size.body,  gap: 8 },
  lg: { height: 40, padX: 18, font: TYPE.size.body,  gap: 8 },
};

const variantStyle = (variant: ButtonVariant, hovered: boolean, pressed: boolean): React.CSSProperties => {
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
      color: COLORS.ink[1],
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    block = false,
    loading = false,
    leadingIcon,
    trailingIcon,
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
  const dims = sizeMap[size];
  const isDisabled = disabled || loading;
  const palette = variantStyle(variant, hovered && !isDisabled, pressed && !isDisabled);

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={className}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e) => { setPressed(true); onMouseDown?.(e); }}
      onMouseUp={(e) => { setPressed(false); onMouseUp?.(e); }}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: dims.gap,
        height: dims.height,
        paddingInline: dims.padX,
        borderRadius: RADIUS.md,
        fontFamily: TYPE.family.sans,
        fontSize: dims.font,
        fontWeight: TYPE.weight.semibold,
        lineHeight: 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
        transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
        whiteSpace: "nowrap",
        ...palette,
        ...style,
      }}
      {...rest}
    >
      {loading ? <Spinner /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});

function Spinner() {
  return (
    <>
      <style>{`@keyframes gp-spin { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 14,
          height: 14,
          border: "2px solid currentColor",
          borderRightColor: "transparent",
          borderRadius: "50%",
          animation: "gp-spin 0.7s linear infinite",
        }}
      />
    </>
  );
}
