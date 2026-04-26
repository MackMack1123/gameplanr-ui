"use client";

import React, { useEffect, useState } from "react";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";

const STORAGE_KEY = "gp-font-debug";
const URL_FLAG = "font-debug";

type FontChoice = "jakarta" | "inter";

/**
 * Hidden floating toggle for swapping between Plus Jakarta Sans and Inter
 * during the v3 design rollout. Renders only when the URL contains
 * `?font-debug=1`. Persists the choice in localStorage and writes
 * `data-font="jakarta"|"inter"` on `<html>`.
 *
 * Apps must:
 *   1. Load both Plus Jakarta Sans and Inter via next/font (or equivalent)
 *      and expose them as CSS variables `--font-jakarta` and `--font-inter`.
 *   2. Define a `--font-sans` rule that selects between them based on the
 *      `data-font` attribute. e.g.:
 *        :root { --font-sans: var(--font-jakarta); }
 *        :root[data-font="inter"] { --font-sans: var(--font-inter); }
 *
 * Once the team locks the font, delete this component and the dual font load.
 */
export function FontDebugToggle() {
  const [enabled, setEnabled] = useState(false);
  const [choice, setChoice] = useState<FontChoice>("jakarta");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const flag = params.get(URL_FLAG);
    if (!flag || flag === "0" || flag === "false") return;

    setEnabled(true);

    const stored = window.localStorage.getItem(STORAGE_KEY) as FontChoice | null;
    const initial: FontChoice = stored === "inter" ? "inter" : "jakarta";
    setChoice(initial);
    document.documentElement.setAttribute("data-font", initial);
  }, []);

  const apply = (next: FontChoice) => {
    setChoice(next);
    document.documentElement.setAttribute("data-font", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable — ephemeral only */
    }
  };

  if (!enabled) return null;

  const baseBtn: React.CSSProperties = {
    fontFamily: TYPE.family.sans,
    fontSize: TYPE.size.small,
    fontWeight: TYPE.weight.semibold,
    padding: "6px 12px",
    borderRadius: RADIUS.md,
    cursor: "pointer",
    border: `1px solid ${COLORS.surface.border}`,
    background: COLORS.surface.card,
    color: COLORS.ink[1],
  };
  const activeBtn: React.CSSProperties = {
    ...baseBtn,
    background: COLORS.green[600],
    borderColor: COLORS.green[600],
    color: "#ffffff",
  };

  return (
    <div
      role="dialog"
      aria-label="Font debug toggle"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.md,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: TYPE.family.sans,
      }}
    >
      <div
        style={{
          fontSize: TYPE.size.micro,
          fontWeight: TYPE.weight.bold,
          color: COLORS.ink[3],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Font debug
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="button"
          onClick={() => apply("jakarta")}
          style={choice === "jakarta" ? activeBtn : baseBtn}
        >
          Jakarta
        </button>
        <button
          type="button"
          onClick={() => apply("inter")}
          style={choice === "inter" ? activeBtn : baseBtn}
        >
          Inter
        </button>
      </div>
    </div>
  );
}
