"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type ConfirmTone = "neutral" | "destructive";

export interface ConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: React.ReactNode;
  /** Body copy explaining what's about to happen. */
  description?: React.ReactNode;
  /** Confirm button label. Default "Confirm". */
  confirmLabel?: string;
  /** Cancel button label. Default "Cancel". */
  cancelLabel?: string;
  /** "destructive" → red confirm button, dialog title gets a destructive tint. */
  tone?: ConfirmTone;
  /** When confirmLoading is true, the confirm button shows a busy state and is disabled. */
  confirmLoading?: boolean;
  /** When true, clicking the backdrop = cancel. Default true. */
  closeOnBackdrop?: boolean;
}

/**
 * Single-purpose confirm modal — title + body + Cancel/Confirm pair.
 * Use for destructive or otherwise-irreversible actions where Modal would be
 * overkill.
 *
 *   <ConfirmDialog
 *     open={open}
 *     onCancel={() => setOpen(false)}
 *     onConfirm={async () => { setBusy(true); await del(); setOpen(false); }}
 *     title="Delete this team?"
 *     description="This is permanent. Players, schedules, and history are gone."
 *     confirmLabel="Delete team"
 *     tone="destructive"
 *     confirmLoading={busy}
 *   />
 */
export function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "neutral",
  confirmLoading,
  closeOnBackdrop = true,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !confirmLoading) onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel, confirmLoading]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const isDestructive = tone === "destructive";
  const confirmBg = isDestructive ? "#dc2626" : COLORS.green[600];
  const confirmHoverBg = isDestructive ? "#b91c1c" : COLORS.green[700];

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnBackdrop && !confirmLoading && e.target === e.currentTarget) {
          onCancel();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="gp-confirm-title"
        aria-describedby={description ? "gp-confirm-desc" : undefined}
        style={{
          background: COLORS.surface.card,
          borderRadius: RADIUS.lg,
          boxShadow: "0 12px 32px rgba(15,23,42,0.18)",
          width: "100%",
          maxWidth: 420,
          fontFamily: TYPE.family.sans,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 22px 12px" }}>
          <h2
            id="gp-confirm-title"
            style={{
              margin: 0,
              fontSize: TYPE.size.h2,
              fontWeight: TYPE.weight.semibold,
              color: isDestructive ? "#991b1b" : COLORS.ink[1],
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              id="gp-confirm-desc"
              style={{
                margin: "8px 0 0",
                fontSize: TYPE.size.small,
                color: COLORS.ink[2],
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "12px 22px 18px",
          }}
        >
          <button
            type="button"
            disabled={confirmLoading}
            onClick={onCancel}
            style={{
              ...secondaryBtn,
              opacity: confirmLoading ? 0.5 : 1,
              cursor: confirmLoading ? "not-allowed" : "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={confirmLoading}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              if (!confirmLoading) e.currentTarget.style.background = confirmHoverBg;
            }}
            onMouseLeave={(e) => {
              if (!confirmLoading) e.currentTarget.style.background = confirmBg;
            }}
            style={{
              ...primaryBtn,
              background: confirmBg,
              opacity: confirmLoading ? 0.7 : 1,
              cursor: confirmLoading ? "wait" : "pointer",
            }}
          >
            {confirmLoading ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const baseBtn: React.CSSProperties = {
  height: 36,
  padding: "0 14px",
  borderRadius: RADIUS.md,
  fontFamily: TYPE.family.sans,
  fontSize: TYPE.size.small,
  fontWeight: TYPE.weight.semibold,
  border: "none",
  transition: "background-color 120ms ease",
};

const secondaryBtn: React.CSSProperties = {
  ...baseBtn,
  background: "transparent",
  color: COLORS.ink[2],
  border: `1px solid ${COLORS.surface.border}`,
};

const primaryBtn: React.CSSProperties = {
  ...baseBtn,
  color: "#fff",
};
