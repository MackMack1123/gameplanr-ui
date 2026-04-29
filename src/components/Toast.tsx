"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type ToastTone = "success" | "error" | "info" | "warning";

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Renders a close X button. Pair with onClose to dismiss. */
  onClose?: () => void;
  /** Optional inline action (e.g., "Undo" Button). */
  action?: React.ReactNode;
}

const toneMap: Record<ToastTone, { bg: string; fg: string; icon: React.ReactNode }> = {
  success: { bg: COLORS.green[100],         fg: COLORS.green[700],     icon: <CheckCircle /> },
  error:   { bg: "#fee2e2",                 fg: "#b91c1c",             icon: <XCircle />     },
  info:    { bg: COLORS.accent.blue.bg,     fg: COLORS.accent.blue.fg, icon: <InfoCircle />  },
  warning: { bg: COLORS.accent.orange.bg,   fg: COLORS.accent.orange.fg, icon: <AlertCircle /> },
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { tone = "info", title, description, onClose, action, style, children, ...rest },
  ref,
) {
  const palette = toneMap[tone];
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      {...rest}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
        padding: 14,
        fontFamily: TYPE.family.sans,
        minWidth: 280,
        maxWidth: 420,
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          backgroundColor: palette.bg,
          color: palette.fg,
          borderRadius: "50%",
          flexShrink: 0,
        }}
      >
        {palette.icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontSize: TYPE.size.body, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }}>
            {title}
          </div>
        )}
        {description && (
          <div style={{ marginTop: title ? 2 : 0, fontSize: TYPE.size.small, color: COLORS.ink[2] }}>
            {description}
          </div>
        )}
        {children}
        {action && <div style={{ marginTop: 8 }}>{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            background: "transparent",
            border: "none",
            color: COLORS.ink[3],
            cursor: "pointer",
            borderRadius: RADIUS.sm,
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});

function CheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 8.5L7 11L12 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function InfoCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 6V10M7 4H7.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function AlertCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 4V8M7 11H7.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
