"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  /** "single" → only one item open at a time. "multiple" → independent toggles. */
  type?: AccordionType;
  /** Controlled open ids. */
  openIds?: string[];
  /** Uncontrolled initial open ids. */
  defaultOpenIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Disclosure stack. Each child is an `<Accordion.Item id="…">` with
 * `<Accordion.Trigger>` and `<Accordion.Content>` inside.
 *
 *   <Accordion type="single" defaultOpenIds={["a"]}>
 *     <Accordion.Item id="a">
 *       <Accordion.Trigger>Question A</Accordion.Trigger>
 *       <Accordion.Content>Answer A</Accordion.Content>
 *     </Accordion.Item>
 *   </Accordion>
 */
export function Accordion({
  type = "single",
  openIds: controlledOpen,
  defaultOpenIds,
  onOpenChange,
  children,
  className,
  style,
}: AccordionProps) {
  const [uncontrolled, setUncontrolled] = useState<string[]>(
    defaultOpenIds ?? [],
  );
  const isControlled = controlledOpen !== undefined;
  const openIds = isControlled ? controlledOpen! : uncontrolled;

  const setOpen = useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const isOpen = useCallback((id: string) => openIds.includes(id), [openIds]);

  const toggle = useCallback(
    (id: string) => {
      const currentlyOpen = openIds.includes(id);
      if (type === "single") {
        setOpen(currentlyOpen ? [] : [id]);
      } else {
        setOpen(currentlyOpen ? openIds.filter((x) => x !== id) : [...openIds, id]);
      }
    },
    [openIds, type, setOpen],
  );

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          background: COLORS.surface.card,
          border: `1px solid ${COLORS.surface.border}`,
          borderRadius: RADIUS.md,
          overflow: "hidden",
          fontFamily: TYPE.family.sans,
          ...style,
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/* ----- item ----- */

const ItemContext = createContext<string | null>(null);

function Item({
  id,
  children,
  style,
}: {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <ItemContext.Provider value={id}>
      <div
        data-accordion-item={id}
        style={{
          borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
          ...style,
        }}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

/* ----- trigger ----- */

function Trigger({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ctx = useContext(AccordionContext);
  const id = useContext(ItemContext);
  if (!ctx || !id) return null;
  const open = ctx.isOpen(id);

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => ctx.toggle(id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 12,
        padding: "12px 14px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.body,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[1],
        cursor: "pointer",
        ...style,
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: COLORS.ink[3],
          transition: "transform 180ms ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        ▾
      </span>
    </button>
  );
}

/* ----- content ----- */

function Content({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ctx = useContext(AccordionContext);
  const id = useContext(ItemContext);
  if (!ctx || !id) return null;
  const open = ctx.isOpen(id);
  if (!open) return null;

  return (
    <div
      style={{
        padding: "0 14px 14px",
        fontSize: TYPE.size.body,
        color: COLORS.ink[2],
        lineHeight: 1.55,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;
