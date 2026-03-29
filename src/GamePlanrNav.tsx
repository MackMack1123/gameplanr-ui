"use client";

import React from "react";
import { LogoIcon } from "./LogoIcon";

export type AppId = "calendar" | "lineup" | "field";

export interface GamePlanrNavProps {
  /** Which app is currently active (omit for platform-level pages like auth) */
  currentApp?: AppId;
  /** User's email to display (optional — hide on login/register) */
  userEmail?: string | null;
  /** Called when the user clicks Sign out */
  onSignOut?: () => void;
}

const APP_LINKS: { label: string; href: string; id: AppId }[] = [
  { label: "GamePlanr Calendar", href: "https://cal.gameplanr.co", id: "calendar" },
  { label: "GamePlanr Lineup", href: "https://lineup.gameplanr.co", id: "lineup" },
  { label: "GamePlanr Field", href: "https://field.gameplanr.co", id: "field" },
];

const APP_META: Record<AppId, { name: string; pillBg: string; pillText: string }> = {
  calendar: {
    name: "Calendar",
    pillBg: "rgba(99,102,241,0.15)",
    pillText: "#818cf8",
  },
  lineup: {
    name: "Lineup Builder",
    pillBg: "rgba(56,189,248,0.15)",
    pillText: "#38bdf8",
  },
  field: {
    name: "Field Management",
    pillBg: "rgba(16,185,129,0.15)",
    pillText: "#34d399",
  },
};

export function GamePlanrNav({ currentApp, userEmail, onSignOut }: GamePlanrNavProps) {
  const meta = currentApp ? APP_META[currentApp] : null;

  return (
    <nav
      aria-label="Platform navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0d1117",
        padding: "0 24px",
        fontFamily: "inherit",
      }}
    >
      {/* Left: Logo + App badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a
          href={currentApp ? (APP_LINKS.find((a) => a.id === currentApp)?.href || "/") : "/"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "white",
            textDecoration: "none",
          }}
          aria-label="GamePlanr home"
        >
          <LogoIcon />
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>
            GamePlanr
          </span>
        </a>

        {meta && (
          <>
            {/* Divider */}
            <div
              style={{ width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.15)" }}
              aria-hidden="true"
            />

            {/* Current app pill */}
            <span
              style={{
                display: "inline-flex",
                borderRadius: 9999,
                backgroundColor: meta.pillBg,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 500,
                color: meta.pillText,
              }}
            >
              {meta.name}
            </span>
          </>
        )}
      </div>

      {/* Center: App switcher */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        role="list"
      >
        {APP_LINKS.map((app) => {
          const isCurrent = currentApp === app.id;
          return (
            <li key={app.id}>
              <a
                href={app.href}
                aria-current={isCurrent ? "page" : undefined}
                style={{
                  display: "inline-block",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "background-color 0.15s, color 0.15s",
                  backgroundColor: isCurrent ? "rgba(255,255,255,0.1)" : "transparent",
                  fontWeight: isCurrent ? 500 : 400,
                  color: isCurrent ? "white" : "#94a3b8",
                }}
              >
                {app.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Right: User info + Sign out */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {userEmail && (
          <span style={{ fontSize: 14, color: "#94a3b8" }}>
            {userEmail}
          </span>
        )}
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            style={{
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 14,
              color: "#94a3b8",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s, color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
