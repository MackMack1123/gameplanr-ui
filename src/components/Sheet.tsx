"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type SheetSide = "right" | "left" | "top" | "bottom";
export type SheetSize = "sm" | "md" | "lg" | "full";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Which edge the sheet slides in from. Default "right". */
  side?: SheetSide;
  /** Width (for left/right) or height (for top/bottom). Default "md". */
  size?: SheetSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Footer slot for action buttons. */
  footer?: React.ReactNode;
  /** When true, clicking the backdrop closes. Default true. */
  closeOnBackdrop?: boolean;
  children?: React.ReactNode;
  /** ARIA label when no title is shown. */
  ariaLabel?: string;
}

const sizeMap: Record<SheetSize, number | string> = {
  sm: 320,
  md: 420,
  lg: 560,
  full: "100%",
};

const SHEET_KEYFRAMES = `
@keyframes gp-sheet-fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes gp-sheet-slide-right { from { transform: translateX(100%) } to { transform: translateX(0) } }
@keyframes gp-sheet-slide-left  { from { transform: translateX(-100%) } to { transform: translateX(0) } }
@keyframes gp-sheet-slide-up    { from { transform: translateY(100%) } to { transform: translateY(0) } }
@keyframes gp-sheet-slide-down  { from { transform: translateY(-100%) } to { transform: translateY(0) } }
`;

let sheetStyleInjected = false;
function ensureSheetStyle() {
  if (typeof document === "undefined" || sheetStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-sheet", "");
  tag.appendChild(document.createTextNode(SHEET_KEYFRAMES));
  document.head.appendChild(tag);
  sheetStyleInjected = true;
}

const slideAnim: Record<SheetSide, string> = {
  right:  "gp-sheet-slide-right 220ms cubic-bezier(.32,.72,.0,1)",
  left:   "gp-sheet-slide-left 220ms cubic-bezier(.32,.72,.0,1)",
  top:    "gp-sheet-slide-down 220ms cubic-bezier(.32,.72,.0,1)",
  bottom: "gp-sheet-slide-up 220ms cubic-bezier(.32,.72,.0,1)",
};

/**
 * Edge-slide drawer (panel that slides in from a side). The canonical mobile
 * drawer in v3 — pair with `useIsMobile` to swap a desktop sidebar into a
 * sheet on mobile.
 *
 *   const [open, setOpen] = useState(false);
 *   <Sheet open={open} onClose={() => setOpen(false)} side="right" title="Settings">
 *     ...
 *   </Sheet>
 */
export function Sheet({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  description,
  footer,
  closeOnBackdrop = true,
  children,
  ariaLabel,
}: SheetProps) {
  ensureSheetStyle();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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

  const isHorizontal = side === "left" || side === "right";
  const panelStyle: React.CSSProperties = {
    position: "absolute",
    background: COLORS.surface.card,
    boxShadow:
      side === "right"
        ? "-12px 0 32px rgba(15,23,42,0.18)"
        : side === "left"
          ? "12px 0 32px rgba(15,23,42,0.18)"
          : side === "top"
            ? "0 12px 32px rgba(15,23,42,0.18)"
            : "0 -12px 32px rgba(15,23,42,0.18)",
    fontFamily: TYPE.family.sans,
    display: "flex",
    flexDirection: "column",
    animation: slideAnim[side],
    ...(side === "right" && {
      top: 0, bottom: 0, right: 0, width: sizeMap[size], maxWidth: "100%",
    }),
    ...(side === "left" && {
      top: 0, bottom: 0, left: 0, width: sizeMap[size], maxWidth: "100%",
    }),
    ...(side === "top" && {
      top: 0, left: 0, right: 0, height: sizeMap[size], maxHeight: "100%",
    }),
    ...(side === "bottom" && {
      bottom: 0, left: 0, right: 0, height: sizeMap[size], maxHeight: "100%",
      borderTopLeftRadius: RADIUS.lg, borderTopRightRadius: RADIUS.lg,
    }),
  };

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        zIndex: 1000,
        animation: "gp-sheet-fade-in 180ms ease-out",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={!title && ariaLabel ? ariaLabel : undefined}
        aria-labelledby={title ? "gp-sheet-title" : undefined}
        style={panelStyle}
      >
        {(title || description) && (
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
            }}
          >
            {title && (
              <h2
                id="gp-sheet-title"
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
        <div
          style={{
            padding: "16px 20px",
            overflowY: "auto",
            flex: 1,
            color: COLORS.ink[1],
            fontSize: TYPE.size.body,
          }}
        >
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
              background: COLORS.surface.page,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
  // suppress isHorizontal warning if unused — it's here for future arrow-key nav
  void isHorizontal;
}
