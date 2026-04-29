"use client";

import React, { useState, useRef, useEffect } from "react";
import { LogoIcon } from "./LogoIcon";

export type AppId = "calendar" | "lineup" | "field" | "volunteer" | "tournament" | "fundraiser";

export interface GamePlanrNavProps {
  /** Which app is currently active (omit for platform-level pages like auth) */
  currentApp?: AppId;
  /** User's email to display (optional — hide on login/register) */
  userEmail?: string | null;
  /** Called when the user clicks Sign out */
  onSignOut?: () => void;
}

type AppConfig = { id: AppId; name: string; href: string; pillBg: string; pillText: string; tagline: string };
type NavConfig = { version: number; updatedAt: string; apps: AppConfig[] };

// Baked-in fallback used if the remote config endpoint is unreachable.
// Kept in sync with /api/platform/nav-config so a fresh load without network
// still renders the right nav.
const FALLBACK_APPS: AppConfig[] = [
  { id: "calendar", name: "Calendar",        href: "https://cal.gameplanr.co",       pillBg: "rgba(56,189,248,0.15)", pillText: "#38bdf8", tagline: "Team scheduling & roster sync" },
  { id: "lineup",   name: "Lineup Builder",  href: "https://lineup.gameplanr.co",    pillBg: "rgba(244,63,94,0.15)",  pillText: "#fb7185", tagline: "Build & share game lineups" },
  { id: "field",    name: "Field Management",href: "https://field.gameplanr.co",     pillBg: "rgba(16,185,129,0.15)", pillText: "#34d399", tagline: "Bookable practice fields" },
  { id: "volunteer",name: "Volunteer",       href: "https://volunteer.gameplanr.co", pillBg: "rgba(251,191,36,0.15)", pillText: "#fbbf24", tagline: "Sign-ups, shifts & reminders" },
];

const CONFIG_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GAMEPLANR_NAV_CONFIG_URL) ||
  "https://auth.gameplanr.co/api/platform/nav-config";

const CACHE_KEY = "gp-nav-config-v1";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function GamePlanrNav({ currentApp, userEmail, onSignOut }: GamePlanrNavProps) {
  // Start with the baked-in list so the nav renders instantly with no layout
  // shift, then swap in the remote config once it arrives.
  const [apps, setApps] = useState<AppConfig[]>(() => {
    if (typeof window === "undefined") return FALLBACK_APPS;
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return FALLBACK_APPS;
      const parsed: { fetchedAt: number; config: NavConfig } = JSON.parse(raw);
      if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS * 6) return FALLBACK_APPS; // ignore very old cache
      if (Array.isArray(parsed.config?.apps) && parsed.config.apps.length > 0) return parsed.config.apps;
    } catch { /* ignore */ }
    return FALLBACK_APPS;
  });

  // Fetch the remote config on mount (with stale-while-revalidate semantics)
  useEffect(() => {
    let cancelled = false;
    fetch(CONFIG_URL, { cache: "no-store" })
      .then(r => r.ok ? r.json() as Promise<NavConfig> : Promise.reject(new Error(`${r.status}`)))
      .then(config => {
        if (cancelled) return;
        if (!Array.isArray(config?.apps) || config.apps.length === 0) return;
        setApps(config.apps);
        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), config }));
        } catch { /* ignore quota */ }
      })
      .catch(() => {
        // Silently fall back — we already rendered with FALLBACK_APPS or cached config
      });
    return () => { cancelled = true; };
  }, []);

  const meta = currentApp ? apps.find(a => a.id === currentApp) : null;
  const accentColor = meta?.pillText || "rgba(255,255,255,0.15)";

  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      @media (max-width: 768px) {
        .gp-nav-right-email { display: none !important; }
        .gp-nav-right-signout { font-size: 12px !important; padding: 4px 8px !important; }
      }
      .gp-app-switcher-trigger:hover { background-color: rgba(255,255,255,0.06) !important; }
      .gp-app-option:hover { background-color: rgba(255,255,255,0.05) !important; }
    `}} />
    <nav
      aria-label="Platform navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        backgroundColor: "#0d1117",
        fontFamily: "inherit",
      }}
    >
      {/* Accent strip — left edge, matches sidebar border */}
      <div
        aria-hidden="true"
        style={{
          width: 3,
          flexShrink: 0,
          backgroundColor: accentColor,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          height: 56,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
      {/* Left: Logo + App switcher dropdown trigger */}
      <div ref={switcherRef} style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
        <a
          href={meta?.href || "/"}
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

            {/* Current app pill — now a dropdown trigger */}
            <button
              type="button"
              className="gp-app-switcher-trigger"
              onClick={() => setOpen(o => !o)}
              aria-haspopup="menu"
              aria-expanded={open}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 9999,
                backgroundColor: meta.pillBg,
                padding: "3px 6px 3px 12px",
                fontSize: 12,
                fontWeight: 600,
                color: meta.pillText,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background-color 0.15s",
              }}
            >
              {meta.name}
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                style={{
                  transition: "transform 0.2s",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M5.5 8L10 12.5L14.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {open && (
              <div
                role="menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  minWidth: 280,
                  backgroundColor: "#0a0b0f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: 6,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                  zIndex: 100,
                }}
              >
                <div
                  style={{
                    padding: "8px 12px 6px 12px",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Switch apps
                </div>
                {apps.map(a => {
                  const isCurrent = a.id === currentApp;
                  return (
                    <a
                      key={a.id}
                      href={a.href}
                      role="menuitem"
                      aria-current={isCurrent ? "page" : undefined}
                      className="gp-app-option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 10,
                        textDecoration: "none",
                        transition: "background-color 0.15s",
                        backgroundColor: isCurrent ? "rgba(255,255,255,0.04)" : "transparent",
                      }}
                    >
                      {/* Color dot */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 9999,
                          backgroundColor: a.pillText,
                          flexShrink: 0,
                          boxShadow: `0 0 12px ${a.pillText}`,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: a.pillText,
                            lineHeight: 1.2,
                            marginBottom: 2,
                          }}
                        >
                          GamePlanr {a.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.45)",
                            lineHeight: 1.3,
                          }}
                        >
                          {a.tagline}
                        </div>
                      </div>
                      {isCurrent && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: a.pillText,
                            border: `1px solid ${a.pillText}`,
                            borderRadius: 9999,
                            padding: "2px 6px",
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
          </>
        )}
      </div>

      {/* Right: User info + Sign out */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {userEmail && (
          <span className="gp-nav-right-email" style={{ fontSize: 14, color: "#94a3b8" }}>
            {userEmail}
          </span>
        )}
        {onSignOut && (
          <button
            type="button"
            className="gp-nav-right-signout"
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
      </div>
    </nav>
    </>
  );
}
