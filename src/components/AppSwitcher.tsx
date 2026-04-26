"use client";

import React, { useState, useRef, useEffect } from "react";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";

export type AppId = "field" | "calendar" | "tournament" | "volunteer" | "lineup" | "fundraiser";

export interface AppSwitcherApp {
  id: AppId;
  name: string;
  href: string;
  /** Single-character or short letter for the avatar tile (e.g. "F" for Field). */
  short: string;
  /** Accent color for the app's avatar tile. */
  accent: string;
}

export interface AppSwitcherProps {
  /** Apps available to switch to, including the current one. */
  apps: AppSwitcherApp[];
  /** Which app is currently active. */
  currentApp: AppId;
}

/**
 * App switcher card — sits inside the Sidebar, below the GamePlanr logo.
 * Shows the active app (icon tile + "App" eyebrow + name) and opens a popover
 * grid of all apps when clicked.
 */
export function AppSwitcher({ apps, currentApp }: AppSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const active = apps.find((a) => a.id === currentApp) || apps[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!active) return null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          padding: "10px 12px",
          background: COLORS.navy.raised,
          border: `1px solid ${COLORS.navy.line}`,
          borderRadius: RADIUS.md,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: TYPE.family.sans,
        }}
      >
        <AppTile short={active.short} accent={active.accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: TYPE.weight.bold,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: COLORS.navy.textDim,
            }}
          >
            App
          </div>
          <div
            style={{
              fontSize: TYPE.size.small,
              fontWeight: TYPE.weight.semibold,
              color: COLORS.navy.text,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {active.name}
          </div>
        </div>
        <Chevron open={open} />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: COLORS.navy.surface,
            border: `1px solid ${COLORS.navy.line}`,
            borderRadius: RADIUS.md,
            boxShadow: SHADOW.md,
            padding: 6,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {apps.map((app) => {
            const isActive = app.id === currentApp;
            return (
              <a
                key={app.id}
                role="menuitem"
                href={isActive ? undefined : app.href}
                aria-current={isActive ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: RADIUS.sm,
                  textDecoration: "none",
                  background: isActive ? COLORS.navy.raised : "transparent",
                  cursor: isActive ? "default" : "pointer",
                  fontFamily: TYPE.family.sans,
                }}
              >
                <AppTile short={app.short} accent={app.accent} small />
                <span
                  style={{
                    fontSize: TYPE.size.small,
                    fontWeight: TYPE.weight.medium,
                    color: COLORS.navy.text,
                  }}
                >
                  {app.name}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      color: COLORS.navy.textDim,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Current
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AppTile({ short, accent, small }: { short: string; accent: string; small?: boolean }) {
  const size = small ? 24 : 32;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: RADIUS.sm,
        background: accent,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: TYPE.weight.bold,
        fontSize: small ? 12 : 14,
        flexShrink: 0,
      }}
    >
      {short}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ transition: "transform 120ms ease", transform: open ? "rotate(180deg)" : "none" }}
      aria-hidden="true"
    >
      <path d="M3 5l4 4 4-4" stroke={COLORS.navy.textDim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
