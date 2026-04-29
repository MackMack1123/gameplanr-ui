"use client";

import React from "react";
import { createPortal } from "react-dom";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons in the footer. If omitted, no footer is rendered. */
  footer?: React.ReactNode;
  size?: ModalSize;
  /** When true, clicking the backdrop closes the modal. Default true. */
  closeOnBackdrop?: boolean;
  children?: React.ReactNode;
}

const sizeMap: Record<ModalSize, number> = { sm: 400, md: 560, lg: 760 };

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  size = "md",
  closeOnBackdrop = true,
  children,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "gp-modal-title" : undefined}
        style={{
          backgroundColor: COLORS.surface.card,
          borderRadius: RADIUS.lg,
          boxShadow: "0 12px 32px rgba(15,23,42,0.18)",
          width: "100%",
          maxWidth: sizeMap[size],
          maxHeight: "calc(100vh - 32px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: TYPE.family.sans,
        }}
      >
        {(title || description) && (
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.surface.borderSoft}` }}>
            {title && (
              <h2
                id="gp-modal-title"
                style={{
                  margin: 0,
                  fontSize: TYPE.size.h2,
                  fontWeight: TYPE.weight.semibold,
                  color: COLORS.ink[1],
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p style={{ margin: "4px 0 0", fontSize: TYPE.size.small, color: COLORS.ink[3] }}>
                {description}
              </p>
            )}
          </div>
        )}

        <div style={{ padding: "16px 20px", overflowY: "auto", color: COLORS.ink[1], fontSize: TYPE.size.body }}>
          {children}
        </div>

        {footer && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
              padding: "12px 20px",
              borderTop: `1px solid ${COLORS.surface.borderSoft}`,
              backgroundColor: COLORS.surface.page,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
