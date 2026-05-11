"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";

export type PopoverSide = "bottom" | "top" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  /** Trigger element. Click toggles, ESC + outside-click close. */
  trigger: React.ReactElement;
  /** Content shown when open. */
  children: React.ReactNode;
  /** Preferred side. Will flip to the opposite side if it overflows the viewport. */
  side?: PopoverSide;
  /** Alignment along the trigger's edge. Default "start". */
  align?: PopoverAlign;
  /** Pixel offset from the trigger edge. Default 6. */
  offset?: number;
  /** Controlled open state — pair with onOpenChange. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** ARIA label when no semantic title is in the body. */
  ariaLabel?: string;
}

/**
 * Anchored floating panel. Click trigger to toggle, ESC + click-outside to
 * close. Underpins date/color pickers, menus, and other dropdowns.
 *
 *   <Popover trigger={<Button>Filter</Button>} side="bottom" align="start">
 *     <FilterMenu ... />
 *   </Popover>
 */
export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "start",
  offset = 6,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ariaLabel,
}: PopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(!!defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? !!controlledOpen : uncontrolled;
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  };

  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; side: PopoverSide } | null>(null);

  const compute = React.useCallback(() => {
    const t = triggerRef.current;
    const p = panelRef.current;
    if (!t || !p) return;
    const tr = t.getBoundingClientRect();
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let chosen: PopoverSide = side;

    if (side === "bottom" && vh - tr.bottom < ph + offset && tr.top > ph + offset) chosen = "top";
    else if (side === "top" && tr.top < ph + offset && vh - tr.bottom > ph + offset) chosen = "bottom";
    else if (side === "right" && vw - tr.right < pw + offset && tr.left > pw + offset) chosen = "left";
    else if (side === "left" && tr.left < pw + offset && vw - tr.right > pw + offset) chosen = "right";

    let top = 0;
    let left = 0;
    switch (chosen) {
      case "bottom":
      case "top": {
        top = chosen === "bottom" ? tr.bottom + offset : tr.top - ph - offset;
        if (align === "start") left = tr.left;
        else if (align === "end") left = tr.right - pw;
        else left = tr.left + tr.width / 2 - pw / 2;
        break;
      }
      case "right":
      case "left": {
        left = chosen === "right" ? tr.right + offset : tr.left - pw - offset;
        if (align === "start") top = tr.top;
        else if (align === "end") top = tr.bottom - ph;
        else top = tr.top + tr.height / 2 - ph / 2;
        break;
      }
    }
    // Clamp to viewport
    left = Math.max(8, Math.min(left, vw - pw - 8));
    top = Math.max(8, Math.min(top, vh - ph - 8));
    setPos({ top, left, side: chosen });
  }, [side, align, offset]);

  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    // Compute after the panel mounts; rAF gives layout a tick.
    const id = requestAnimationFrame(compute);
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, compute]);

  // Outside-click + ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const t = triggerRef.current;
      const p = panelRef.current;
      const target = e.target as Node | null;
      if (!target) return;
      if (t && t.contains(target)) return;
      if (p && p.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
    // setOpen is stable enough — controlled-vs-uncontrolled handled inside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const child = React.Children.only(trigger) as React.ReactElement<any>;
  const cloned = React.cloneElement(child, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      const oldRef = (child as any).ref;
      if (typeof oldRef === "function") oldRef(node);
      else if (oldRef && typeof oldRef === "object") oldRef.current = node;
    },
    onClick: (e: any) => {
      child.props.onClick?.(e);
      setOpen(!open);
    },
    "aria-expanded": open,
    "aria-haspopup": "dialog",
  });

  return (
    <>
      {cloned}
      {open && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label={ariaLabel}
            style={{
              position: "fixed",
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              minWidth: 200,
              background: COLORS.surface.card,
              border: `1px solid ${COLORS.surface.border}`,
              borderRadius: RADIUS.md,
              boxShadow: SHADOW.md,
              padding: 8,
              fontFamily: TYPE.family.sans,
              fontSize: TYPE.size.body,
              color: COLORS.ink[1],
              zIndex: 1050,
              opacity: pos ? 1 : 0,
              transition: "opacity 80ms ease",
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}
