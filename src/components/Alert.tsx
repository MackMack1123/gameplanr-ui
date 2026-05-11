"use client";

import React, { useState } from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type AlertTone = "info" | "success" | "warning" | "destructive";

export interface AlertProps {
  tone?: AlertTone;
  title?: React.ReactNode;
  /** Body content. Either pass children or this. */
  children?: React.ReactNode;
  /** Optional leading icon. Renders without an icon if omitted. */
  icon?: React.ReactNode;
  /** Inline action(s) rendered to the right (e.g. <Button size="sm">…</Button>). */
  action?: React.ReactNode;
  /** Show an X dismiss button. Pass onDismiss to wire it up. */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface ToneTokens {
  bg: string;
  border: string;
  fg: string;
  iconFg: string;
}

const TONES: Record<AlertTone, ToneTokens> = {
  info: {
    bg: COLORS.accent.blue.bg,
    border: "#bfdbfe",
    fg: "#1e40af",
    iconFg: COLORS.accent.blue.fg,
  },
  success: {
    bg: COLORS.green[50],
    border: "#bbf7d0",
    fg: COLORS.green.text,
    iconFg: COLORS.green[600],
  },
  warning: {
    bg: COLORS.accent.orange.bg,
    border: "#fde68a",
    fg: "#92400e",
    iconFg: COLORS.accent.orange.fg,
  },
  destructive: {
    bg: COLORS.accent.red.bg,
    border: "#fecaca",
    fg: "#991b1b",
    iconFg: COLORS.accent.red.fg,
  },
};

/**
 * Inline informational/warning/error bar — NOT a toast.
 * For ephemeral notifications use <Toast /> instead.
 *
 *   <Alert tone="warning" title="Heads up">Your trial ends in 3 days.</Alert>
 *   <Alert tone="destructive" dismissible onDismiss={...}>Failed to save.</Alert>
 */
export function Alert({
  tone = "info",
  title,
  children,
  icon,
  action,
  dismissible,
  onDismiss,
  className,
  style,
}: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const t = TONES[tone];

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: RADIUS.md,
        fontFamily: TYPE.family.sans,
        color: t.fg,
        ...style,
      }}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: t.iconFg,
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          {icon}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontSize: TYPE.size.body,
              fontWeight: TYPE.weight.semibold,
              marginBottom: children ? 2 : 0,
              color: t.fg,
            }}
          >
            {title}
          </div>
        )}
        {children && (
          <div style={{ fontSize: TYPE.size.small, lineHeight: 1.5, color: t.fg }}>
            {children}
          </div>
        )}
      </div>
      {action && (
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          {action}
        </div>
      )}
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
          style={{
            background: "transparent",
            border: 0,
            color: t.fg,
            cursor: "pointer",
            padding: 2,
            marginLeft: 4,
            opacity: 0.7,
            lineHeight: 1,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
