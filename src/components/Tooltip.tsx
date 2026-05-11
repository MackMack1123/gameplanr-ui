"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COLORS, RADIUS, TYPE } from "../tokens";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip content. Plain text usually, but rich nodes are supported. */
  content: React.ReactNode;
  /** Trigger element. Receives a ref + the relevant aria/event handlers. */
  children: React.ReactElement;
  /** Preferred side. The tooltip will flip to keep itself in viewport. Default "top". */
  side?: TooltipSide;
  /** ms to wait before showing on hover. Default 250. Focus shows immediately. */
  delay?: number;
  /** When true, render nothing (useful when the trigger is in a disabled state). */
  disabled?: boolean;
}

/**
 * Lightweight hover/focus tooltip. No Radix dep — uses native bounding-rect
 * positioning with a single-axis flip if the preferred side overflows.
 *
 *   <Tooltip content="Save (⌘S)">
 *     <IconButton ... />
 *   </Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = "top",
  delay = 250,
  disabled,
}: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    side: TooltipSide;
  } | null>(null);

  const compute = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offset = 8;
    const tipW = 240; // upper-bound estimate for clamping
    const tipH = 32;
    let chosen: TooltipSide = side;

    // Single-axis flip
    if (side === "top" && r.top < tipH + offset) chosen = "bottom";
    else if (side === "bottom" && vh - r.bottom < tipH + offset) chosen = "top";
    else if (side === "left" && r.left < tipW + offset) chosen = "right";
    else if (side === "right" && vw - r.right < tipW + offset) chosen = "left";

    let top = 0;
    let left = 0;
    switch (chosen) {
      case "top":
        top = r.top - offset;
        left = r.left + r.width / 2;
        break;
      case "bottom":
        top = r.bottom + offset;
        left = r.left + r.width / 2;
        break;
      case "left":
        top = r.top + r.height / 2;
        left = r.left - offset;
        break;
      case "right":
        top = r.top + r.height / 2;
        left = r.right + offset;
        break;
    }
    setPos({ top, left, side: chosen });
  }, [side]);

  useEffect(() => {
    if (!open) return;
    compute();
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, compute]);

  const show = (delayed: boolean) => {
    if (disabled) return;
    if (showTimer.current) clearTimeout(showTimer.current);
    if (delayed) {
      showTimer.current = setTimeout(() => setOpen(true), delay);
    } else {
      setOpen(true);
    }
  };
  const hide = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    setOpen(false);
  };

  const child = React.Children.only(children) as React.ReactElement<any>;
  const cloned = React.cloneElement(child, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      const oldRef = (child as any).ref;
      if (typeof oldRef === "function") oldRef(node);
      else if (oldRef && typeof oldRef === "object") oldRef.current = node;
    },
    onMouseEnter: (e: any) => {
      child.props.onMouseEnter?.(e);
      show(true);
    },
    onMouseLeave: (e: any) => {
      child.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: any) => {
      child.props.onFocus?.(e);
      show(false);
    },
    onBlur: (e: any) => {
      child.props.onBlur?.(e);
      hide();
    },
    "aria-describedby": open ? id : undefined,
  });

  return (
    <>
      {cloned}
      {open && pos && typeof document !== "undefined" &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transform: transformFor(pos.side),
              maxWidth: 240,
              padding: "6px 10px",
              background: COLORS.ink[1],
              color: "#fff",
              fontFamily: TYPE.family.sans,
              fontSize: 12,
              fontWeight: TYPE.weight.medium,
              lineHeight: 1.4,
              borderRadius: RADIUS.sm,
              boxShadow: "0 4px 12px rgba(15,23,42,0.18)",
              pointerEvents: "none",
              zIndex: 1100,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}

function transformFor(side: TooltipSide): string {
  switch (side) {
    case "top":    return "translate(-50%, -100%)";
    case "bottom": return "translate(-50%, 0)";
    case "left":   return "translate(-100%, -50%)";
    case "right":  return "translate(0, -50%)";
  }
}
