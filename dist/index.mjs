"use client";

// src/GamePlanrNav.tsx
import { useState, useRef, useEffect } from "react";

// src/LogoIcon.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function LogoIcon({ size = 24 }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("rect", { x: "6", y: "6", width: "15", height: "15", rx: "3", fill: "white" }),
        /* @__PURE__ */ jsx("rect", { x: "27", y: "6", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.6" }),
        /* @__PURE__ */ jsx("rect", { x: "6", y: "27", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.6" }),
        /* @__PURE__ */ jsx("rect", { x: "27", y: "27", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.35" })
      ]
    }
  );
}

// src/GamePlanrNav.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var FALLBACK_APPS = [
  { id: "calendar", name: "Calendar", href: "https://cal.gameplanr.co", pillBg: "rgba(56,189,248,0.15)", pillText: "#38bdf8", tagline: "Team scheduling & roster sync" },
  { id: "lineup", name: "Lineup Builder", href: "https://lineup.gameplanr.co", pillBg: "rgba(244,63,94,0.15)", pillText: "#fb7185", tagline: "Build & share game lineups" },
  { id: "field", name: "Field Management", href: "https://field.gameplanr.co", pillBg: "rgba(16,185,129,0.15)", pillText: "#34d399", tagline: "Bookable practice fields" },
  { id: "volunteer", name: "Volunteer", href: "https://volunteer.gameplanr.co", pillBg: "rgba(251,191,36,0.15)", pillText: "#fbbf24", tagline: "Sign-ups, shifts & reminders" }
];
var CONFIG_URL = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GAMEPLANR_NAV_CONFIG_URL || "https://auth.gameplanr.co/api/platform/nav-config";
var CACHE_KEY = "gp-nav-config-v1";
var CACHE_TTL_MS = 5 * 60 * 1e3;
function GamePlanrNav({ currentApp, userEmail, onSignOut }) {
  const [apps, setApps] = useState(() => {
    if (typeof window === "undefined") return FALLBACK_APPS;
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return FALLBACK_APPS;
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS * 6) return FALLBACK_APPS;
      if (Array.isArray(parsed.config?.apps) && parsed.config.apps.length > 0) return parsed.config.apps;
    } catch {
    }
    return FALLBACK_APPS;
  });
  useEffect(() => {
    let cancelled = false;
    fetch(CONFIG_URL, { cache: "no-store" }).then((r) => r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))).then((config) => {
      if (cancelled) return;
      if (!Array.isArray(config?.apps) || config.apps.length === 0) return;
      setApps(config.apps);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), config }));
      } catch {
      }
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const meta = currentApp ? apps.find((a) => a.id === currentApp) : null;
  const accentColor = meta?.pillText || "rgba(255,255,255,0.15)";
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2("style", { dangerouslySetInnerHTML: { __html: `
      @media (max-width: 768px) {
        .gp-nav-right-email { display: none !important; }
        .gp-nav-right-signout { font-size: 12px !important; padding: 4px 8px !important; }
      }
      .gp-app-switcher-trigger:hover { background-color: rgba(255,255,255,0.06) !important; }
      .gp-app-option:hover { background-color: rgba(255,255,255,0.05) !important; }
    ` } }),
    /* @__PURE__ */ jsxs2(
      "nav",
      {
        "aria-label": "Platform navigation",
        style: {
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          backgroundColor: "#0d1117",
          fontFamily: "inherit"
        },
        children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              "aria-hidden": "true",
              style: {
                width: 3,
                flexShrink: 0,
                backgroundColor: accentColor
              }
            }
          ),
          /* @__PURE__ */ jsxs2(
            "div",
            {
              style: {
                flex: 1,
                display: "flex",
                height: 56,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px"
              },
              children: [
                /* @__PURE__ */ jsxs2("div", { ref: switcherRef, style: { display: "flex", alignItems: "center", gap: 12, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs2(
                    "a",
                    {
                      href: meta?.href || "/",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "white",
                        textDecoration: "none"
                      },
                      "aria-label": "GamePlanr home",
                      children: [
                        /* @__PURE__ */ jsx2(LogoIcon, {}),
                        /* @__PURE__ */ jsx2("span", { style: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }, children: "GamePlanr" })
                      ]
                    }
                  ),
                  meta && /* @__PURE__ */ jsxs2(Fragment, { children: [
                    /* @__PURE__ */ jsx2(
                      "div",
                      {
                        style: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.15)" },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxs2(
                      "button",
                      {
                        type: "button",
                        className: "gp-app-switcher-trigger",
                        onClick: () => setOpen((o) => !o),
                        "aria-haspopup": "menu",
                        "aria-expanded": open,
                        style: {
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
                          transition: "background-color 0.15s"
                        },
                        children: [
                          meta.name,
                          /* @__PURE__ */ jsx2(
                            "svg",
                            {
                              width: "14",
                              height: "14",
                              viewBox: "0 0 20 20",
                              fill: "none",
                              "aria-hidden": "true",
                              style: {
                                transition: "transform 0.2s",
                                transform: open ? "rotate(180deg)" : "rotate(0deg)"
                              },
                              children: /* @__PURE__ */ jsx2("path", { d: "M5.5 8L10 12.5L14.5 8", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
                            }
                          )
                        ]
                      }
                    ),
                    open && /* @__PURE__ */ jsxs2(
                      "div",
                      {
                        role: "menu",
                        style: {
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: 0,
                          minWidth: 280,
                          backgroundColor: "#0a0b0f",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                          padding: 6,
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                          zIndex: 100
                        },
                        children: [
                          /* @__PURE__ */ jsx2(
                            "div",
                            {
                              style: {
                                padding: "8px 12px 6px 12px",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.4)"
                              },
                              children: "Switch apps"
                            }
                          ),
                          apps.map((a) => {
                            const isCurrent = a.id === currentApp;
                            return /* @__PURE__ */ jsxs2(
                              "a",
                              {
                                href: a.href,
                                role: "menuitem",
                                "aria-current": isCurrent ? "page" : void 0,
                                className: "gp-app-option",
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "10px 12px",
                                  borderRadius: 10,
                                  textDecoration: "none",
                                  transition: "background-color 0.15s",
                                  backgroundColor: isCurrent ? "rgba(255,255,255,0.04)" : "transparent"
                                },
                                children: [
                                  /* @__PURE__ */ jsx2(
                                    "span",
                                    {
                                      "aria-hidden": "true",
                                      style: {
                                        width: 8,
                                        height: 8,
                                        borderRadius: 9999,
                                        backgroundColor: a.pillText,
                                        flexShrink: 0,
                                        boxShadow: `0 0 12px ${a.pillText}`
                                      }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
                                    /* @__PURE__ */ jsxs2(
                                      "div",
                                      {
                                        style: {
                                          fontSize: 13,
                                          fontWeight: 600,
                                          color: a.pillText,
                                          lineHeight: 1.2,
                                          marginBottom: 2
                                        },
                                        children: [
                                          "GamePlanr ",
                                          a.name
                                        ]
                                      }
                                    ),
                                    /* @__PURE__ */ jsx2(
                                      "div",
                                      {
                                        style: {
                                          fontSize: 11,
                                          color: "rgba(255,255,255,0.45)",
                                          lineHeight: 1.3
                                        },
                                        children: a.tagline
                                      }
                                    )
                                  ] }),
                                  isCurrent && /* @__PURE__ */ jsx2(
                                    "span",
                                    {
                                      style: {
                                        fontSize: 9,
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        color: a.pillText,
                                        border: `1px solid ${a.pillText}`,
                                        borderRadius: 9999,
                                        padding: "2px 6px",
                                        textTransform: "uppercase"
                                      },
                                      children: "Current"
                                    }
                                  )
                                ]
                              },
                              a.id
                            );
                          })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
                  userEmail && /* @__PURE__ */ jsx2("span", { className: "gp-nav-right-email", style: { fontSize: 14, color: "#94a3b8" }, children: userEmail }),
                  onSignOut && /* @__PURE__ */ jsx2(
                    "button",
                    {
                      type: "button",
                      className: "gp-nav-right-signout",
                      onClick: onSignOut,
                      style: {
                        borderRadius: 6,
                        padding: "6px 12px",
                        fontSize: 14,
                        color: "#94a3b8",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.15s, color 0.15s",
                        fontFamily: "inherit"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.color = "white";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#94a3b8";
                      },
                      children: "Sign out"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}

// src/tokens.ts
var COLORS = {
  // Brand green — Tailwind green-600 family. NOT emerald.
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    600: "#16a34a",
    700: "#15803d",
    text: "#166534"
  },
  // Sidebar / dark surfaces.
  navy: {
    base: "#0b1220",
    surface: "#0f172a",
    raised: "#111a2e",
    line: "#1e293b",
    text: "#e2e8f0",
    textDim: "#94a3b8"
  },
  // Light-surface text ramp.
  ink: {
    1: "#0f172a",
    2: "#334155",
    3: "#64748b",
    4: "#94a3b8"
  },
  surface: {
    page: "#f7f8fa",
    card: "#ffffff",
    hover: "#f3f4f6",
    border: "#e5e7eb",
    borderSoft: "#eef0f3"
  },
  // Status pill colors — used by <StatusPill />.
  pill: {
    game: { bg: "#ede9fe", text: "#6d28d9" },
    practice: { bg: "#dbeafe", text: "#1d4ed8" },
    tournament: { bg: "#ffedd5", text: "#c2410c" },
    volunteer: { bg: "#dcfce7", text: "#166534" },
    pending: { bg: "#fef3c7", text: "#92400e" },
    approved: { bg: "#dcfce7", text: "#166534" },
    declined: { bg: "#fee2e2", text: "#b91c1c" },
    neutral: { bg: "#f3f4f6", text: "#334155" }
  },
  // Accent palette for legends / per-category highlights (not primary UI).
  accent: {
    blue: { fg: "#3b82f6", bg: "#dbeafe" },
    orange: { fg: "#f59e0b", bg: "#fef3c7" },
    purple: { fg: "#8b5cf6", bg: "#ede9fe" },
    red: { fg: "#ef4444", bg: "#fee2e2" }
  }
};
var TYPE = {
  family: {
    sans: 'var(--font-sans, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif)'
  },
  size: {
    h1: "28px",
    h2: "20px",
    h3: "16px",
    body: "14px",
    small: "13px",
    micro: "11px"
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  letterSpacing: {
    tight: "-0.56px",
    // h1
    normal: "0"
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5
  }
};
var RADIUS = {
  sm: "6px",
  md: "8px",
  // buttons
  lg: "12px",
  // cards
  pill: "99px"
};
var SHADOW = {
  sm: "0 1px 2px rgba(15,23,42,0.04)",
  md: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)"
};
var LAYOUT = {
  sidebarWidth: 248,
  sidebarPadding: 16
};
var TINT = {
  purple: { bg: "#ede9fe", fg: "#6d28d9" },
  blue: { bg: "#dbeafe", fg: "#1d4ed8" },
  orange: { bg: "#ffedd5", fg: "#c2410c" },
  green: { bg: "#dcfce7", fg: "#166534" },
  amber: { bg: "#fef3c7", fg: "#92400e" },
  slate: { bg: "#f3f4f6", fg: "#334155" }
};
var TOKENS = { COLORS, TYPE, RADIUS, SHADOW, LAYOUT, TINT };

// src/components/StatusPill.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function StatusPill({ variant, children, className, style }) {
  const colors = COLORS.pill[variant];
  return /* @__PURE__ */ jsx3(
    "span",
    {
      className,
      style: {
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: RADIUS.pill,
        padding: "3px 9px",
        fontSize: TYPE.size.micro,
        fontWeight: TYPE.weight.bold,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...style
      },
      children
    }
  );
}

// src/components/PageHeader.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function PageHeader({ title, subtitle, actions, className, style }) {
  return /* @__PURE__ */ jsxs3(
    "header",
    {
      className,
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
        paddingBottom: 28,
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx4(
            "h1",
            {
              style: {
                fontFamily: TYPE.family.sans,
                fontSize: TYPE.size.h1,
                fontWeight: TYPE.weight.bold,
                letterSpacing: TYPE.letterSpacing.tight,
                color: COLORS.ink[1],
                lineHeight: TYPE.lineHeight.tight,
                margin: 0
              },
              children: title
            }
          ),
          subtitle && /* @__PURE__ */ jsx4(
            "p",
            {
              style: {
                marginTop: 6,
                marginBottom: 0,
                fontSize: TYPE.size.body,
                color: COLORS.ink[3],
                lineHeight: TYPE.lineHeight.normal
              },
              children: subtitle
            }
          )
        ] }),
        actions && /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }, children: actions })
      ]
    }
  );
}

// src/components/EmptyState.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function EmptyState({ icon, title, description, action, className, style }) {
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "64px 24px",
        ...style
      },
      children: [
        icon && /* @__PURE__ */ jsx5("div", { style: { marginBottom: 24 }, children: icon }),
        /* @__PURE__ */ jsx5(
          "h2",
          {
            style: {
              margin: 0,
              fontFamily: TYPE.family.sans,
              fontSize: TYPE.size.h2,
              fontWeight: TYPE.weight.bold,
              color: COLORS.ink[1],
              lineHeight: TYPE.lineHeight.tight
            },
            children: title
          }
        ),
        description && /* @__PURE__ */ jsx5(
          "p",
          {
            style: {
              marginTop: 8,
              marginBottom: 0,
              fontSize: TYPE.size.body,
              color: COLORS.ink[3],
              lineHeight: TYPE.lineHeight.normal,
              maxWidth: 420
            },
            children: description
          }
        ),
        action && /* @__PURE__ */ jsx5("div", { style: { marginTop: 24 }, children: action })
      ]
    }
  );
}

// src/components/FontDebugToggle.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var STORAGE_KEY = "gp-font-debug";
var URL_FLAG = "font-debug";
function FontDebugToggle() {
  const [enabled, setEnabled] = useState2(false);
  const [choice, setChoice] = useState2("jakarta");
  useEffect2(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const flag = params.get(URL_FLAG);
    if (!flag || flag === "0" || flag === "false") return;
    setEnabled(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored === "inter" ? "inter" : "jakarta";
    setChoice(initial);
    document.documentElement.setAttribute("data-font", initial);
  }, []);
  const apply = (next) => {
    setChoice(next);
    document.documentElement.setAttribute("data-font", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
    }
  };
  if (!enabled) return null;
  const baseBtn = {
    fontFamily: TYPE.family.sans,
    fontSize: TYPE.size.small,
    fontWeight: TYPE.weight.semibold,
    padding: "6px 12px",
    borderRadius: RADIUS.md,
    cursor: "pointer",
    border: `1px solid ${COLORS.surface.border}`,
    background: COLORS.surface.card,
    color: COLORS.ink[1]
  };
  const activeBtn = {
    ...baseBtn,
    background: COLORS.green[600],
    borderColor: COLORS.green[600],
    color: "#ffffff"
  };
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      role: "dialog",
      "aria-label": "Font debug toggle",
      style: {
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
        fontFamily: TYPE.family.sans
      },
      children: [
        /* @__PURE__ */ jsx6(
          "div",
          {
            style: {
              fontSize: TYPE.size.micro,
              fontWeight: TYPE.weight.bold,
              color: COLORS.ink[3],
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            },
            children: "Font debug"
          }
        ),
        /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              onClick: () => apply("jakarta"),
              style: choice === "jakarta" ? activeBtn : baseBtn,
              children: "Jakarta"
            }
          ),
          /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              onClick: () => apply("inter"),
              style: choice === "inter" ? activeBtn : baseBtn,
              children: "Inter"
            }
          )
        ] })
      ]
    }
  );
}

// src/components/AppSwitcher.tsx
import { useState as useState3, useRef as useRef2, useEffect as useEffect3 } from "react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function AppSwitcher({ apps, currentApp }) {
  const [open, setOpen] = useState3(false);
  const ref = useRef2(null);
  const active = apps.find((a) => a.id === currentApp) || apps[0];
  useEffect3(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
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
  return /* @__PURE__ */ jsxs6("div", { ref, style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        style: {
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
          fontFamily: TYPE.family.sans
        },
        children: [
          /* @__PURE__ */ jsx7(AppTile, { short: active.short, accent: active.accent }),
          /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx7(
              "div",
              {
                style: {
                  fontSize: 10,
                  fontWeight: TYPE.weight.bold,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: COLORS.navy.textDim
                },
                children: "App"
              }
            ),
            /* @__PURE__ */ jsx7(
              "div",
              {
                style: {
                  fontSize: TYPE.size.small,
                  fontWeight: TYPE.weight.semibold,
                  color: COLORS.navy.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: active.name
              }
            )
          ] }),
          /* @__PURE__ */ jsx7(Chevron, { open })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx7(
      "div",
      {
        role: "menu",
        style: {
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
          gap: 2
        },
        children: apps.map((app) => {
          const isActive = app.id === currentApp;
          return /* @__PURE__ */ jsxs6(
            "a",
            {
              role: "menuitem",
              href: isActive ? void 0 : app.href,
              "aria-current": isActive ? "page" : void 0,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: RADIUS.sm,
                textDecoration: "none",
                background: isActive ? COLORS.navy.raised : "transparent",
                cursor: isActive ? "default" : "pointer",
                fontFamily: TYPE.family.sans
              },
              children: [
                /* @__PURE__ */ jsx7(AppTile, { short: app.short, accent: app.accent, small: true }),
                /* @__PURE__ */ jsx7(
                  "span",
                  {
                    style: {
                      fontSize: TYPE.size.small,
                      fontWeight: TYPE.weight.medium,
                      color: COLORS.navy.text
                    },
                    children: app.name
                  }
                ),
                isActive && /* @__PURE__ */ jsx7(
                  "span",
                  {
                    style: {
                      marginLeft: "auto",
                      fontSize: 10,
                      color: COLORS.navy.textDim,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase"
                    },
                    children: "Current"
                  }
                )
              ]
            },
            app.id
          );
        })
      }
    )
  ] });
}
function AppTile({ short, accent, small }) {
  const size = small ? 24 : 32;
  return /* @__PURE__ */ jsx7(
    "div",
    {
      style: {
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
        flexShrink: 0
      },
      children: short
    }
  );
}
function Chevron({ open }) {
  return /* @__PURE__ */ jsx7(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      style: { transition: "transform 120ms ease", transform: open ? "rotate(180deg)" : "none" },
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx7("path", { d: "M3 5l4 4 4-4", stroke: COLORS.navy.textDim, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}

// src/components/AppLauncher.tsx
import { useState as useState4 } from "react";

// src/components/AppIcon.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function AppIcon({
  name,
  size = 22,
  stroke = "currentColor",
  strokeWidth = 1.75,
  ...rest
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest
  };
  switch (name) {
    case "trophy":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("path", { d: "M7 4h10v3a5 5 0 0 1-10 0V4Z" }),
        /* @__PURE__ */ jsx8("path", { d: "M17 5h2.5a1.5 1.5 0 0 1 0 3H17M7 5H4.5a1.5 1.5 0 0 0 0 3H7" }),
        /* @__PURE__ */ jsx8("path", { d: "M10 12.5v3.5h4v-3.5" }),
        /* @__PURE__ */ jsx8("path", { d: "M8 19h8" }),
        /* @__PURE__ */ jsx8("path", { d: "M9 16h6v3H9z" })
      ] });
    case "pitch":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "1.5" }),
        /* @__PURE__ */ jsx8("path", { d: "M12 5v14" }),
        /* @__PURE__ */ jsx8("circle", { cx: "12", cy: "12", r: "2" }),
        /* @__PURE__ */ jsx8("path", { d: "M2.5 9h2v6h-2zM21.5 9h-2v6h2z" })
      ] });
    case "baseball":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("circle", { cx: "12", cy: "12", r: "8.5" }),
        /* @__PURE__ */ jsx8("path", { d: "M5.2 7.5c2.2 1.2 3.6 3.6 3.6 6.5 0 1.4-.4 2.8-1 3.9" }),
        /* @__PURE__ */ jsx8("path", { d: "M18.8 7.5c-2.2 1.2-3.6 3.6-3.6 6.5 0 1.4.4 2.8 1 3.9" }),
        /* @__PURE__ */ jsx8("path", { d: "M7.5 6.2l.6 1M9 5.2l.5 1M16.5 6.2l-.6 1M15 5.2l-.5 1M6.5 18l.6-1M8 19l.5-1M17.5 18l-.6-1M16 19l-.5-1" })
      ] });
    case "calendar":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx8("path", { d: "M3 10h18" }),
        /* @__PURE__ */ jsx8("path", { d: "M8 3v4M16 3v4" }),
        /* @__PURE__ */ jsx8("rect", { x: "7", y: "13", width: "3", height: "3", rx: "0.5", fill: stroke, stroke: "none" })
      ] });
    case "megaphone":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("path", { d: "M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z" }),
        /* @__PURE__ */ jsx8("path", { d: "M14 8a4 4 0 0 1 0 8" }),
        /* @__PURE__ */ jsx8("path", { d: "M17 5.5a8 8 0 0 1 0 13" })
      ] });
    case "clipboard":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2" }),
        /* @__PURE__ */ jsx8("path", { d: "M9 4h6v3H9z" }),
        /* @__PURE__ */ jsx8("path", { d: "M9 12h6M9 16h4" })
      ] });
    case "fundraise":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("path", { d: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" }),
        /* @__PURE__ */ jsx8("path", { d: "M9.5 11.5h3a1 1 0 0 0 0-2H10a1 1 0 0 1 0-2h3M11 6.5v1.5M11 13v1.5" })
      ] });
    case "grid":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("rect", { x: "3.5", y: "3.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ jsx8("rect", { x: "14.5", y: "3.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ jsx8("rect", { x: "3.5", y: "14.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ jsx8("rect", { x: "14.5", y: "14.5", width: "6", height: "6", rx: "1" })
      ] });
    case "arrow-right":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M5 12h14M13 6l6 6-6 6" }) });
    case "plus":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M12 5v14M5 12h14" }) });
    case "check":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M5 12.5l4 4 10-10" }) });
    case "bell":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("path", { d: "M6 9a6 6 0 1 1 12 0v4l1.5 3h-15L6 13V9Z" }),
        /* @__PURE__ */ jsx8("path", { d: "M10 19a2 2 0 0 0 4 0" })
      ] });
    case "lock":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("rect", { x: "5", y: "11", width: "14", height: "9", rx: "2" }),
        /* @__PURE__ */ jsx8("path", { d: "M8 11V8a4 4 0 1 1 8 0v3" })
      ] });
    case "sparkle":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" }) });
    case "search":
      return /* @__PURE__ */ jsxs7("svg", { ...common, children: [
        /* @__PURE__ */ jsx8("circle", { cx: "11", cy: "11", r: "6.5" }),
        /* @__PURE__ */ jsx8("path", { d: "M16 16l4 4" })
      ] });
    case "chevron-down":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M6 9l6 6 6-6" }) });
    case "external":
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("path", { d: "M14 5h5v5M19 5l-9 9M11 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5" }) });
    default:
      return /* @__PURE__ */ jsx8("svg", { ...common, children: /* @__PURE__ */ jsx8("circle", { cx: "12", cy: "12", r: "6" }) });
  }
}

// src/components/GPWordmark.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function GPWordmark({
  height = 22,
  color = COLORS.ink[1],
  accent = COLORS.green[600]
}) {
  return /* @__PURE__ */ jsxs8(
    "svg",
    {
      height,
      viewBox: "0 0 240 60",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "GamePlanr",
      children: [
        /* @__PURE__ */ jsxs8(
          "text",
          {
            x: "0",
            y: "44",
            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "-1.4",
            children: [
              /* @__PURE__ */ jsx9("tspan", { fill: color, children: "GamePlan" }),
              /* @__PURE__ */ jsx9("tspan", { fill: accent, children: "r" })
            ]
          }
        ),
        /* @__PURE__ */ jsx9(
          "path",
          {
            d: "M203 12 L207 15 L211 12 L208 17.5 L211 23 L207 20 L203 23 L206 17.5 Z",
            fill: accent,
            opacity: 0.85
          }
        )
      ]
    }
  );
}
function GPMark({ size = 32 }) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: COLORS.green[600],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: size * 0.42,
        letterSpacing: "-0.5px",
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
      },
      children: "GP"
    }
  );
}

// src/components/AppLauncher.tsx
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function AppLauncher({
  apps,
  featuredId: initialFeaturedId,
  user,
  greeting = { title: "Where to next?", subtitle: "One login, every play." },
  notified = {},
  onActivate,
  onNotifyToggle,
  onContinue,
  onManageAccount
}) {
  const defaultFeatured = initialFeaturedId ?? apps.find((a) => a.activated && a.status === "live")?.id ?? apps.find((a) => a.status === "live")?.id ?? apps[0]?.id;
  const [featuredId, setFeaturedId] = useState4(defaultFeatured);
  const featured = apps.find((a) => a.id === featuredId);
  const others = apps.filter((a) => a.id !== featuredId);
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      style: {
        width: "100%",
        minHeight: "100%",
        background: COLORS.surface.page,
        fontFamily: TYPE.family.sans
      },
      children: [
        /* @__PURE__ */ jsx10(TopStrip, { user }),
        /* @__PURE__ */ jsxs9("div", { style: { maxWidth: 1100, margin: "0 auto", padding: "40px 32px 56px" }, children: [
          /* @__PURE__ */ jsx10(Greeting, { title: greeting.title, subtitle: greeting.subtitle }),
          featured && /* @__PURE__ */ jsx10(
            FeaturedHero,
            {
              app: featured,
              onContinue: () => onContinue?.(featured.id)
            }
          ),
          /* @__PURE__ */ jsxs9(
            "div",
            {
              style: {
                marginTop: 36,
                marginBottom: 16,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsx10(
                  "h2",
                  {
                    style: {
                      margin: 0,
                      fontSize: 13,
                      color: COLORS.ink[3],
                      fontWeight: TYPE.weight.semibold,
                      textTransform: "uppercase",
                      letterSpacing: "0.6px"
                    },
                    children: "Switch to another app"
                  }
                ),
                /* @__PURE__ */ jsxs9("span", { style: { fontSize: 13, color: COLORS.ink[4] }, children: [
                  others.length,
                  " apps"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx10("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }, children: others.map((app) => /* @__PURE__ */ jsx10(
            CompactCard,
            {
              app,
              notified: !!notified[app.id],
              onClick: () => {
                if (app.status === "soon") {
                  onNotifyToggle?.(app.id, !notified[app.id]);
                  return;
                }
                if (!app.activated) {
                  onActivate?.(app.id);
                }
                setFeaturedId(app.id);
              }
            },
            app.id
          )) }),
          /* @__PURE__ */ jsx10(Footer, { onManageAccount })
        ] })
      ]
    }
  );
}
function TopStrip({ user }) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      style: {
        borderBottom: `1px solid ${COLORS.surface.border}`,
        background: COLORS.surface.card
      },
      children: /* @__PURE__ */ jsxs9(
        "div",
        {
          style: {
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [
            /* @__PURE__ */ jsx10(GPWordmark, { height: 20 }),
            /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
              /* @__PURE__ */ jsx10("span", { style: { fontSize: 13, color: COLORS.ink[3] }, children: user.email }),
              /* @__PURE__ */ jsx10(
                "div",
                {
                  style: {
                    width: 30,
                    height: 30,
                    borderRadius: 99,
                    background: COLORS.accent.blue.bg,
                    color: COLORS.accent.blue.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 12
                  },
                  children: user.initials
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function Greeting({ title, subtitle }) {
  return /* @__PURE__ */ jsxs9("div", { style: { marginBottom: 24 }, children: [
    /* @__PURE__ */ jsx10(
      "h1",
      {
        style: {
          margin: 0,
          fontSize: 32,
          lineHeight: 1.15,
          marginBottom: 4,
          fontWeight: TYPE.weight.bold,
          letterSpacing: "-0.56px",
          color: COLORS.ink[1]
        },
        children: title
      }
    ),
    subtitle && /* @__PURE__ */ jsx10("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.5, color: COLORS.ink[3] }, children: subtitle })
  ] });
}
function FeaturedHero({ app, onContinue }) {
  const tint = TINT[app.tint];
  return /* @__PURE__ */ jsxs9(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        onContinue?.();
      },
      style: {
        display: "block",
        background: "linear-gradient(135deg, #0f172a 0%, #111a2e 60%, #0b1220 100%)",
        borderRadius: 16,
        padding: 28,
        color: "#fff",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        boxShadow: SHADOW.md,
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              right: -40,
              top: -40,
              width: 260,
              height: 260,
              borderRadius: 99,
              background: `radial-gradient(circle, ${tint.fg}22 0%, transparent 65%)`
            }
          }
        ),
        /* @__PURE__ */ jsx10("div", { "aria-hidden": true, style: { position: "absolute", right: 60, top: 24, opacity: 0.3 }, children: /* @__PURE__ */ jsx10(AppIcon, { name: "sparkle", size: 14, stroke: "#22c55e" }) }),
        /* @__PURE__ */ jsxs9(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              gap: 20
            },
            children: [
              /* @__PURE__ */ jsxs9("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ jsx10(
                  "p",
                  {
                    style: {
                      margin: 0,
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#22c55e",
                      marginBottom: 14
                    },
                    children: "Continue where you left off"
                  }
                ),
                /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }, children: [
                  /* @__PURE__ */ jsx10(
                    "div",
                    {
                      style: {
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: tint.bg,
                        color: tint.fg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 16px ${tint.fg}55`,
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ jsx10(AppIcon, { name: app.icon, size: 28, strokeWidth: 2 })
                    }
                  ),
                  /* @__PURE__ */ jsxs9("div", { style: { minWidth: 0 }, children: [
                    /* @__PURE__ */ jsx10(
                      "h2",
                      {
                        style: {
                          margin: 0,
                          fontSize: 26,
                          fontWeight: TYPE.weight.bold,
                          letterSpacing: "-0.6px",
                          color: "#fff"
                        },
                        children: app.name
                      }
                    ),
                    /* @__PURE__ */ jsx10("p", { style: { margin: 0, fontSize: 13, color: COLORS.navy.textDim }, children: app.short })
                  ] })
                ] }),
                app.activity && /* @__PURE__ */ jsxs9("div", { style: { paddingTop: 8 }, children: [
                  /* @__PURE__ */ jsx10(
                    "p",
                    {
                      style: {
                        margin: 0,
                        fontSize: 11,
                        color: COLORS.navy.textDim,
                        fontWeight: TYPE.weight.semibold,
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        marginBottom: 6
                      },
                      children: "Live now"
                    }
                  ),
                  /* @__PURE__ */ jsx10("p", { style: { margin: 0, fontSize: 18, fontWeight: TYPE.weight.bold, color: "#fff" }, children: app.activity.label }),
                  /* @__PURE__ */ jsx10("p", { style: { margin: "2px 0 0", fontSize: 13, color: COLORS.navy.textDim }, children: app.activity.sub })
                ] })
              ] }),
              /* @__PURE__ */ jsxs9(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onContinue?.();
                  },
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: COLORS.green[600],
                    color: "#fff",
                    border: 0,
                    height: 44,
                    padding: "0 20px",
                    borderRadius: RADIUS.md,
                    fontFamily: TYPE.family.sans,
                    fontSize: 14,
                    fontWeight: TYPE.weight.semibold,
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(22,163,74,0.4)",
                    flexShrink: 0
                  },
                  children: [
                    "Continue ",
                    app.name,
                    /* @__PURE__ */ jsx10(AppIcon, { name: "arrow-right", size: 16 })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function CompactCard({ app, notified = false, onClick }) {
  const [hover, setHover] = useState4(false);
  const tint = TINT[app.tint];
  const isSoon = app.status === "soon";
  const isPaidTrial = app.status === "live" && !app.activated && app.paid;
  return /* @__PURE__ */ jsxs9(
    "button",
    {
      type: "button",
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick,
      style: {
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        padding: 14,
        textAlign: "left",
        cursor: "pointer",
        transition: "transform 140ms ease, box-shadow 140ms ease",
        boxShadow: hover ? SHADOW.md : SHADOW.sm,
        transform: hover ? "translateY(-1px)" : "none",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        opacity: isSoon ? 0.95 : 1,
        position: "relative",
        fontFamily: TYPE.family.sans
      },
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            style: {
              width: 38,
              height: 38,
              borderRadius: 9,
              background: isSoon ? TINT.slate.bg : tint.bg,
              color: isSoon ? COLORS.ink[4] : tint.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              filter: isSoon ? "saturate(0.4)" : "none"
            },
            children: /* @__PURE__ */ jsx10(AppIcon, { name: app.icon, size: 19, strokeWidth: 1.9 })
          }
        ),
        /* @__PURE__ */ jsxs9("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }, children: [
            /* @__PURE__ */ jsx10(
              "p",
              {
                style: {
                  margin: 0,
                  fontSize: 14,
                  fontWeight: TYPE.weight.bold,
                  letterSpacing: "-0.1px",
                  color: isSoon ? COLORS.ink[2] : COLORS.ink[1]
                },
                children: app.name
              }
            ),
            !isSoon && app.activated && /* @__PURE__ */ jsx10(
              "span",
              {
                "aria-hidden": true,
                style: {
                  width: 5,
                  height: 5,
                  borderRadius: 99,
                  background: COLORS.green[600]
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx10("p", { style: { margin: 0, fontSize: 12.5, color: COLORS.ink[3], lineHeight: 1.4 }, children: app.short }),
          /* @__PURE__ */ jsxs9(
            "div",
            {
              style: {
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 20
              },
              children: [
                isSoon ? notified ? /* @__PURE__ */ jsxs9(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.green.text,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [
                      /* @__PURE__ */ jsx10(AppIcon, { name: "check", size: 11, strokeWidth: 2.5 }),
                      " We'll notify you"
                    ]
                  }
                ) : /* @__PURE__ */ jsxs9(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      color: TINT.amber.fg,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [
                      /* @__PURE__ */ jsx10(AppIcon, { name: "bell", size: 11 }),
                      " Notify me",
                      app.eta ? ` \xB7 ${app.eta}` : ""
                    ]
                  }
                ) : app.activated ? /* @__PURE__ */ jsx10(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.ink[3],
                      textTransform: "uppercase",
                      letterSpacing: "0.4px"
                    },
                    children: app.lastUsed || "Active"
                  }
                ) : isPaidTrial ? /* @__PURE__ */ jsxs9(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.green[600],
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [
                      /* @__PURE__ */ jsx10(AppIcon, { name: "sparkle", size: 11, strokeWidth: 2.4 }),
                      " Start free trial"
                    ]
                  }
                ) : /* @__PURE__ */ jsxs9(
                  "span",
                  {
                    style: {
                      fontSize: 11,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.green[600],
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [
                      /* @__PURE__ */ jsx10(AppIcon, { name: "plus", size: 11, strokeWidth: 2.4 }),
                      " Activate"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx10(
                  AppIcon,
                  {
                    name: "arrow-right",
                    size: 13,
                    stroke: hover ? COLORS.green[600] : COLORS.ink[4]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Footer({ onManageAccount }) {
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      style: {
        marginTop: 32,
        padding: 16,
        borderRadius: RADIUS.lg,
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: TYPE.family.sans
      },
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            style: {
              width: 36,
              height: 36,
              borderRadius: 10,
              background: COLORS.green[50],
              color: COLORS.green[600],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsx10(AppIcon, { name: "sparkle", size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs9("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsx10("p", { style: { margin: 0, fontSize: 13.5, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }, children: "One login, every app" }),
          /* @__PURE__ */ jsx10("p", { style: { margin: "2px 0 0", fontSize: 12.5, color: COLORS.ink[3] }, children: "Activate any GamePlanr app instantly with your existing account." })
        ] }),
        /* @__PURE__ */ jsxs9(
          "button",
          {
            type: "button",
            onClick: onManageAccount,
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: 0,
              color: COLORS.ink[3],
              fontFamily: TYPE.family.sans,
              fontSize: 13,
              fontWeight: TYPE.weight.semibold,
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: RADIUS.sm
            },
            children: [
              "Manage account",
              /* @__PURE__ */ jsx10(AppIcon, { name: "arrow-right", size: 13 })
            ]
          }
        )
      ]
    }
  );
}

// src/components/Sidebar.tsx
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function Sidebar({ children, className, style }) {
  return /* @__PURE__ */ jsx11(
    "aside",
    {
      className,
      style: {
        width: LAYOUT.sidebarWidth,
        flexShrink: 0,
        background: COLORS.navy.surface,
        color: COLORS.navy.text,
        fontFamily: TYPE.family.sans,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        ...style
      },
      children
    }
  );
}
function Header({ children, style }) {
  return /* @__PURE__ */ jsx11(
    "div",
    {
      style: {
        padding: `${LAYOUT.sidebarPadding}px ${LAYOUT.sidebarPadding}px ${LAYOUT.sidebarPadding}px`,
        ...style
      },
      children
    }
  );
}
function Section({
  children,
  style
}) {
  return /* @__PURE__ */ jsx11(
    "div",
    {
      style: {
        padding: `0 ${LAYOUT.sidebarPadding}px`,
        marginBottom: 12,
        ...style
      },
      children
    }
  );
}
function Nav({ children, style }) {
  return /* @__PURE__ */ jsx11(
    "nav",
    {
      "aria-label": "Main navigation",
      style: {
        flex: 1,
        overflowY: "auto",
        padding: `4px ${LAYOUT.sidebarPadding - 4}px`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...style
      },
      children
    }
  );
}
function NavItem({ icon, label, href, onClick, active, trailing }) {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: RADIUS.sm,
    fontSize: TYPE.size.small,
    fontWeight: TYPE.weight.medium,
    textDecoration: "none",
    color: active ? COLORS.navy.text : COLORS.navy.textDim,
    background: active ? "rgba(255,255,255,0.06)" : "transparent",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontFamily: TYPE.family.sans,
    transition: "background-color 120ms ease, color 120ms ease"
  };
  const iconStyle = {
    display: "inline-flex",
    width: 18,
    height: 18,
    color: active ? COLORS.green[600] : COLORS.navy.textDim,
    flexShrink: 0
  };
  const inner = /* @__PURE__ */ jsxs10(Fragment2, { children: [
    icon && /* @__PURE__ */ jsx11("span", { style: iconStyle, children: icon }),
    /* @__PURE__ */ jsx11("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label }),
    trailing
  ] });
  if (href) {
    return /* @__PURE__ */ jsx11("a", { href, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
  }
  return /* @__PURE__ */ jsx11("button", { type: "button", onClick, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
}
function Footer2({ children, style }) {
  return /* @__PURE__ */ jsx11(
    "div",
    {
      style: {
        padding: LAYOUT.sidebarPadding,
        borderTop: `1px solid ${COLORS.navy.line}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style
      },
      children
    }
  );
}
Sidebar.Header = Header;
Sidebar.Section = Section;
Sidebar.Nav = Nav;
Sidebar.NavItem = NavItem;
Sidebar.Footer = Footer2;

// src/components/Button.tsx
import React5 from "react";
import { Fragment as Fragment3, jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
var sizeMap = {
  sm: { height: 28, padX: 10, font: TYPE.size.small, gap: 6 },
  md: { height: 36, padX: 14, font: TYPE.size.body, gap: 8 },
  lg: { height: 40, padX: 18, font: TYPE.size.body, gap: 8 }
};
var variantStyle = (variant, hovered, pressed) => {
  if (variant === "primary") {
    const bg = pressed ? COLORS.green[700] : COLORS.green[600];
    return {
      backgroundColor: hovered && !pressed ? COLORS.green[700] : bg,
      color: "#ffffff",
      border: "1px solid transparent"
    };
  }
  if (variant === "secondary") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : COLORS.surface.card,
      color: COLORS.ink[1],
      border: `1px solid ${COLORS.surface.border}`
    };
  }
  if (variant === "ghost") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : "transparent",
      color: COLORS.ink[2],
      border: "1px solid transparent"
    };
  }
  const dangerBg = pressed ? "#b91c1c" : "#dc2626";
  return {
    backgroundColor: hovered && !pressed ? "#b91c1c" : dangerBg,
    color: "#ffffff",
    border: "1px solid transparent"
  };
};
var Button = React5.forwardRef(function Button2({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  style,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}, ref) {
  const [hovered, setHovered] = React5.useState(false);
  const [pressed, setPressed] = React5.useState(false);
  const dims = sizeMap[size];
  const isDisabled = disabled || loading;
  const palette = variantStyle(variant, hovered && !isDisabled, pressed && !isDisabled);
  return /* @__PURE__ */ jsxs11(
    "button",
    {
      ref,
      disabled: isDisabled,
      "aria-busy": loading || void 0,
      className,
      onMouseEnter: (e) => {
        setHovered(true);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      },
      onMouseDown: (e) => {
        setPressed(true);
        onMouseDown?.(e);
      },
      onMouseUp: (e) => {
        setPressed(false);
        onMouseUp?.(e);
      },
      style: {
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : void 0,
        alignItems: "center",
        justifyContent: "center",
        gap: dims.gap,
        height: dims.height,
        paddingInline: dims.padX,
        borderRadius: RADIUS.md,
        fontFamily: TYPE.family.sans,
        fontSize: dims.font,
        fontWeight: TYPE.weight.semibold,
        lineHeight: 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
        transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
        whiteSpace: "nowrap",
        ...palette,
        ...style
      },
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsx12(Spinner, {}) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});
function Spinner() {
  return /* @__PURE__ */ jsxs11(Fragment3, { children: [
    /* @__PURE__ */ jsx12("style", { children: `@keyframes gp-spin { to { transform: rotate(360deg); } }` }),
    /* @__PURE__ */ jsx12(
      "span",
      {
        "aria-hidden": true,
        style: {
          display: "inline-block",
          width: 14,
          height: 14,
          border: "2px solid currentColor",
          borderRightColor: "transparent",
          borderRadius: "50%",
          animation: "gp-spin 0.7s linear infinite"
        }
      }
    )
  ] });
}

// src/components/IconButton.tsx
import React6 from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var sizeMap2 = {
  sm: 28,
  md: 36,
  lg: 40
};
var variantStyle2 = (variant, hovered, pressed) => {
  if (variant === "primary") {
    const bg = pressed ? COLORS.green[700] : COLORS.green[600];
    return {
      backgroundColor: hovered && !pressed ? COLORS.green[700] : bg,
      color: "#ffffff",
      border: "1px solid transparent"
    };
  }
  if (variant === "secondary") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : COLORS.surface.card,
      color: COLORS.ink[2],
      border: `1px solid ${COLORS.surface.border}`
    };
  }
  if (variant === "ghost") {
    return {
      backgroundColor: hovered ? COLORS.surface.hover : "transparent",
      color: COLORS.ink[2],
      border: "1px solid transparent"
    };
  }
  const dangerBg = pressed ? "#b91c1c" : "#dc2626";
  return {
    backgroundColor: hovered && !pressed ? "#b91c1c" : dangerBg,
    color: "#ffffff",
    border: "1px solid transparent"
  };
};
var IconButton = React6.forwardRef(function IconButton2({
  variant = "ghost",
  size = "md",
  disabled,
  style,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}, ref) {
  const [hovered, setHovered] = React6.useState(false);
  const [pressed, setPressed] = React6.useState(false);
  const dim = sizeMap2[size];
  const palette = variantStyle2(variant, hovered && !disabled, pressed && !disabled);
  return /* @__PURE__ */ jsx13(
    "button",
    {
      ref,
      disabled,
      className,
      onMouseEnter: (e) => {
        setHovered(true);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      },
      onMouseDown: (e) => {
        setPressed(true);
        onMouseDown?.(e);
      },
      onMouseUp: (e) => {
        setPressed(false);
        onMouseUp?.(e);
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        padding: 0,
        borderRadius: RADIUS.md,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
        ...palette,
        ...style
      },
      ...rest,
      children
    }
  );
});

// src/components/Input.tsx
import React7 from "react";
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var sizeMap3 = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body },
  lg: { height: 40, padX: 14, font: TYPE.size.body }
};
var Input = React7.forwardRef(function Input2({ inputSize = "md", invalid = false, leadingIcon, trailingIcon, disabled, style, className, ...rest }, ref) {
  const [focused, setFocused] = React7.useState(false);
  const dims = sizeMap3[inputSize];
  const borderColor = invalid ? "#dc2626" : focused ? COLORS.green[600] : COLORS.surface.border;
  const ringColor = invalid ? "#fecaca" : "#bbf7d0";
  return /* @__PURE__ */ jsxs12(
    "span",
    {
      className,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: dims.height,
        paddingInline: dims.padX,
        backgroundColor: disabled ? COLORS.surface.hover : COLORS.surface.card,
        border: `1px solid ${borderColor}`,
        borderRadius: RADIUS.md,
        boxShadow: focused ? `0 0 0 3px ${ringColor}` : "none",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        cursor: disabled ? "not-allowed" : "text",
        opacity: disabled ? 0.7 : 1,
        ...style
      },
      children: [
        leadingIcon && /* @__PURE__ */ jsx14("span", { style: { display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }, children: leadingIcon }),
        /* @__PURE__ */ jsx14(
          "input",
          {
            ref,
            disabled,
            "aria-invalid": invalid || void 0,
            onFocus: (e) => {
              setFocused(true);
              rest.onFocus?.(e);
            },
            onBlur: (e) => {
              setFocused(false);
              rest.onBlur?.(e);
            },
            ...rest,
            style: {
              flex: 1,
              minWidth: 0,
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: TYPE.family.sans,
              fontSize: dims.font,
              color: COLORS.ink[1],
              padding: 0
            }
          }
        ),
        trailingIcon && /* @__PURE__ */ jsx14("span", { style: { display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }, children: trailingIcon })
      ]
    }
  );
});

// src/components/Select.tsx
import React8 from "react";
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
var sizeMap4 = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body },
  lg: { height: 40, padX: 14, font: TYPE.size.body }
};
var Select = React8.forwardRef(function Select2({ selectSize = "md", invalid = false, options, placeholder, disabled, style, className, ...rest }, ref) {
  const [focused, setFocused] = React8.useState(false);
  const dims = sizeMap4[selectSize];
  const borderColor = invalid ? "#dc2626" : focused ? COLORS.green[600] : COLORS.surface.border;
  const ringColor = invalid ? "#fecaca" : "#bbf7d0";
  return /* @__PURE__ */ jsxs13(
    "span",
    {
      className,
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: dims.height,
        backgroundColor: disabled ? COLORS.surface.hover : COLORS.surface.card,
        border: `1px solid ${borderColor}`,
        borderRadius: RADIUS.md,
        boxShadow: focused ? `0 0 0 3px ${ringColor}` : "none",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        opacity: disabled ? 0.7 : 1,
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs13(
          "select",
          {
            ref,
            disabled,
            "aria-invalid": invalid || void 0,
            onFocus: (e) => {
              setFocused(true);
              rest.onFocus?.(e);
            },
            onBlur: (e) => {
              setFocused(false);
              rest.onBlur?.(e);
            },
            ...rest,
            style: {
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              height: "100%",
              paddingInline: dims.padX,
              paddingRight: dims.padX + 18,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: TYPE.family.sans,
              fontSize: dims.font,
              color: COLORS.ink[1],
              cursor: disabled ? "not-allowed" : "pointer"
            },
            children: [
              placeholder && /* @__PURE__ */ jsx15("option", { value: "", disabled: true, children: placeholder }),
              options.map((opt) => /* @__PURE__ */ jsx15("option", { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value))
            ]
          }
        ),
        /* @__PURE__ */ jsx15(
          "span",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              right: dims.padX,
              top: "50%",
              transform: "translateY(-50%)",
              color: COLORS.ink[3],
              pointerEvents: "none",
              display: "inline-flex"
            },
            children: /* @__PURE__ */ jsx15("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx15("path", { d: "M3 4.5L6 7.5L9 4.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
          }
        )
      ]
    }
  );
});

// src/components/Toggle.tsx
import React9 from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var sizeMap5 = {
  sm: { width: 32, height: 18, thumb: 14, pad: 2 },
  md: { width: 40, height: 22, thumb: 18, pad: 2 }
};
var Toggle = React9.forwardRef(function Toggle2({ checked, onChange, size = "md", disabled, style, className, ...rest }, ref) {
  const dims = sizeMap5[size];
  const trackBg = checked ? COLORS.green[600] : COLORS.surface.border;
  const thumbX = checked ? dims.width - dims.thumb - dims.pad : dims.pad;
  return /* @__PURE__ */ jsx16(
    "button",
    {
      ref,
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: (e) => {
        if (disabled) return;
        onChange(!checked);
        rest.onClick?.(e);
      },
      className,
      ...rest,
      style: {
        position: "relative",
        display: "inline-block",
        width: dims.width,
        height: dims.height,
        padding: 0,
        backgroundColor: trackBg,
        border: "none",
        borderRadius: dims.height / 2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 160ms ease",
        ...style
      },
      children: /* @__PURE__ */ jsx16(
        "span",
        {
          "aria-hidden": true,
          style: {
            position: "absolute",
            top: dims.pad,
            left: thumbX,
            width: dims.thumb,
            height: dims.thumb,
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 1px 3px rgba(15,23,42,0.18)",
            transition: "left 160ms ease"
          }
        }
      )
    }
  );
});

// src/components/Tabs.tsx
import React10 from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
function Tabs({ items, value, onChange, className, style }) {
  return /* @__PURE__ */ jsx17(
    "div",
    {
      role: "tablist",
      className,
      style: {
        display: "flex",
        alignItems: "stretch",
        gap: 4,
        borderBottom: `1px solid ${COLORS.surface.border}`,
        ...style
      },
      children: items.map((item) => {
        const active = item.value === value;
        return /* @__PURE__ */ jsx17(Tab, { item, active, onSelect: onChange }, item.value);
      })
    }
  );
}
function Tab({ item, active, onSelect }) {
  const [hovered, setHovered] = React10.useState(false);
  const color = active ? COLORS.ink[1] : hovered ? COLORS.ink[2] : COLORS.ink[3];
  return /* @__PURE__ */ jsx17(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": active,
      disabled: item.disabled,
      onClick: () => !item.disabled && onSelect(item.value),
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        position: "relative",
        padding: "10px 14px",
        marginBottom: -1,
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${active ? COLORS.green[600] : "transparent"}`,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.body,
        fontWeight: active ? TYPE.weight.semibold : TYPE.weight.medium,
        color,
        cursor: item.disabled ? "not-allowed" : "pointer",
        opacity: item.disabled ? 0.55 : 1,
        transition: "color 120ms ease, border-color 120ms ease"
      },
      children: item.label
    }
  );
}

// src/components/Card.tsx
import React11 from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var padMap = { none: 0, sm: 12, md: 16, lg: 20 };
var Card = Object.assign(
  React11.forwardRef(function Card2({ variant = "default", padding = "md", style, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx18(
      "div",
      {
        ref,
        ...rest,
        style: {
          backgroundColor: COLORS.surface.card,
          border: variant === "flat" ? "none" : `1px solid ${COLORS.surface.border}`,
          borderRadius: RADIUS.lg,
          boxShadow: variant === "flat" ? "none" : SHADOW.sm,
          padding: padMap[padding],
          ...style
        },
        children
      }
    );
  }),
  {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Body: CardBody,
    Footer: CardFooter
  }
);
function CardHeader({ children, style, ...rest }) {
  return /* @__PURE__ */ jsx18(
    "div",
    {
      ...rest,
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
        ...style
      },
      children
    }
  );
}
function CardTitle({ children, style, ...rest }) {
  return /* @__PURE__ */ jsx18(
    "h3",
    {
      ...rest,
      style: {
        margin: 0,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.h3,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[1],
        ...style
      },
      children
    }
  );
}
function CardDescription({ children, style, ...rest }) {
  return /* @__PURE__ */ jsx18(
    "p",
    {
      ...rest,
      style: {
        margin: "4px 0 0",
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        color: COLORS.ink[3],
        ...style
      },
      children
    }
  );
}
function CardBody({ children, style, ...rest }) {
  return /* @__PURE__ */ jsx18("div", { ...rest, style, children });
}
function CardFooter({ children, style, ...rest }) {
  return /* @__PURE__ */ jsx18(
    "div",
    {
      ...rest,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        paddingTop: 12,
        marginTop: 12,
        borderTop: `1px solid ${COLORS.surface.borderSoft}`,
        ...style
      },
      children
    }
  );
}

// src/components/StatCard.tsx
import React12 from "react";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
var accentMap = {
  green: { bg: COLORS.green[100], fg: COLORS.green[700] },
  blue: { bg: COLORS.accent.blue.bg, fg: COLORS.accent.blue.fg },
  orange: { bg: COLORS.accent.orange.bg, fg: COLORS.accent.orange.fg },
  purple: { bg: COLORS.accent.purple.bg, fg: COLORS.accent.purple.fg },
  neutral: { bg: COLORS.surface.hover, fg: COLORS.ink[2] }
};
var deltaToneMap = {
  positive: COLORS.green[700],
  negative: "#b91c1c",
  neutral: COLORS.ink[3]
};
var StatCard = React12.forwardRef(function StatCard2({ label, value, delta, deltaTone = "neutral", icon, accent = "neutral", style, ...rest }, ref) {
  const tone = accentMap[accent];
  return /* @__PURE__ */ jsxs14(
    "div",
    {
      ref,
      ...rest,
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.sm,
        padding: 16,
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs14("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx19(
            "span",
            {
              style: {
                fontFamily: TYPE.family.sans,
                fontSize: TYPE.size.small,
                fontWeight: TYPE.weight.medium,
                color: COLORS.ink[3]
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsx19(
            "span",
            {
              style: {
                fontFamily: TYPE.family.sans,
                fontSize: TYPE.size.h1,
                fontWeight: TYPE.weight.bold,
                letterSpacing: TYPE.letterSpacing.tight,
                color: COLORS.ink[1],
                lineHeight: 1.1
              },
              children: value
            }
          ),
          delta && /* @__PURE__ */ jsx19(
            "span",
            {
              style: {
                fontFamily: TYPE.family.sans,
                fontSize: TYPE.size.small,
                fontWeight: TYPE.weight.medium,
                color: deltaToneMap[deltaTone]
              },
              children: delta
            }
          )
        ] }),
        icon && /* @__PURE__ */ jsx19(
          "span",
          {
            "aria-hidden": true,
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              backgroundColor: tone.bg,
              color: tone.fg,
              borderRadius: "50%",
              flexShrink: 0
            },
            children: icon
          }
        )
      ]
    }
  );
});

// src/components/Table.tsx
import React13 from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
function TableRoot({ style, children, ...rest }) {
  return /* @__PURE__ */ jsx20(
    "div",
    {
      style: {
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden"
      },
      children: /* @__PURE__ */ jsx20("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsx20(
        "table",
        {
          ...rest,
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.body,
            color: COLORS.ink[1],
            ...style
          },
          children
        }
      ) })
    }
  );
}
function TableHeader({ style, children, ...rest }) {
  return /* @__PURE__ */ jsx20(
    "thead",
    {
      ...rest,
      style: {
        backgroundColor: COLORS.surface.page,
        borderBottom: `1px solid ${COLORS.surface.border}`,
        ...style
      },
      children
    }
  );
}
function TableBody({ style, children, ...rest }) {
  return /* @__PURE__ */ jsx20("tbody", { ...rest, style, children });
}
function TableRow({ interactive, style, onMouseEnter, onMouseLeave, children, ...rest }) {
  const [hovered, setHovered] = React13.useState(false);
  return /* @__PURE__ */ jsx20(
    "tr",
    {
      ...rest,
      onMouseEnter: (e) => {
        setHovered(true);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setHovered(false);
        onMouseLeave?.(e);
      },
      style: {
        backgroundColor: interactive && hovered ? COLORS.surface.hover : "transparent",
        cursor: interactive ? "pointer" : "default",
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
        transition: "background-color 100ms ease",
        ...style
      },
      children
    }
  );
}
function TableHeaderCell({
  sortable,
  sortDirection = null,
  onSort,
  align = "left",
  style,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx20(
    "th",
    {
      ...rest,
      onClick: sortable ? onSort : rest.onClick,
      style: {
        padding: "10px 14px",
        textAlign: align,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.micro,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[3],
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        cursor: sortable ? "pointer" : "default",
        userSelect: sortable ? "none" : "auto",
        ...style
      },
      children: /* @__PURE__ */ jsxs15("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        children,
        sortable && /* @__PURE__ */ jsx20(SortGlyph, { direction: sortDirection })
      ] })
    }
  );
}
function SortGlyph({ direction }) {
  return /* @__PURE__ */ jsxs15(
    "span",
    {
      "aria-hidden": true,
      style: {
        display: "inline-flex",
        flexDirection: "column",
        gap: 1,
        color: direction ? COLORS.ink[2] : COLORS.ink[4]
      },
      children: [
        /* @__PURE__ */ jsx20("svg", { width: "8", height: "5", viewBox: "0 0 8 5", fill: "none", style: { opacity: direction === "desc" ? 0.3 : 1 }, children: /* @__PURE__ */ jsx20("path", { d: "M1 4L4 1L7 4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) }),
        /* @__PURE__ */ jsx20("svg", { width: "8", height: "5", viewBox: "0 0 8 5", fill: "none", style: { opacity: direction === "asc" ? 0.3 : 1 }, children: /* @__PURE__ */ jsx20("path", { d: "M1 1L4 4L7 1", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) })
      ]
    }
  );
}
function TableCell({ align = "left", truncate, style, children, ...rest }) {
  return /* @__PURE__ */ jsx20(
    "td",
    {
      ...rest,
      style: {
        padding: "12px 14px",
        textAlign: align,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.body,
        color: COLORS.ink[1],
        verticalAlign: "middle",
        ...truncate ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 } : {},
        ...style
      },
      children
    }
  );
}
var Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell
});

// src/components/FilterBar.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function FilterBar({ filters, actions, bare = false, style, children, ...rest }) {
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      ...rest,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        paddingBottom: bare ? 0 : 12,
        marginBottom: bare ? 0 : 12,
        borderBottom: bare ? "none" : `1px solid ${COLORS.surface.borderSoft}`,
        ...style
      },
      children: [
        filters && /* @__PURE__ */ jsx21("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }, children: filters }),
        children,
        actions && /* @__PURE__ */ jsx21("div", { style: { display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }, children: actions })
      ]
    }
  );
}

// src/components/Modal.tsx
import React14 from "react";
import { createPortal } from "react-dom";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var sizeMap6 = { sm: 400, md: 560, lg: 760 };
function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  size = "md",
  closeOnBackdrop = true,
  children
}) {
  React14.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
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
  return createPortal(
    /* @__PURE__ */ jsx22(
      "div",
      {
        role: "presentation",
        onMouseDown: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        },
        style: {
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15,23,42,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          zIndex: 1e3
        },
        children: /* @__PURE__ */ jsxs17(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? "gp-modal-title" : void 0,
            style: {
              backgroundColor: COLORS.surface.card,
              borderRadius: RADIUS.lg,
              boxShadow: "0 12px 32px rgba(15,23,42,0.18)",
              width: "100%",
              maxWidth: sizeMap6[size],
              maxHeight: "calc(100vh - 32px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: TYPE.family.sans
            },
            children: [
              (title || description) && /* @__PURE__ */ jsxs17("div", { style: { padding: "16px 20px", borderBottom: `1px solid ${COLORS.surface.borderSoft}` }, children: [
                title && /* @__PURE__ */ jsx22(
                  "h2",
                  {
                    id: "gp-modal-title",
                    style: {
                      margin: 0,
                      fontSize: TYPE.size.h2,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.ink[1]
                    },
                    children: title
                  }
                ),
                description && /* @__PURE__ */ jsx22("p", { style: { margin: "4px 0 0", fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: description })
              ] }),
              /* @__PURE__ */ jsx22("div", { style: { padding: "16px 20px", overflowY: "auto", color: COLORS.ink[1], fontSize: TYPE.size.body }, children }),
              footer && /* @__PURE__ */ jsx22(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 8,
                    padding: "12px 20px",
                    borderTop: `1px solid ${COLORS.surface.borderSoft}`,
                    backgroundColor: COLORS.surface.page
                  },
                  children: footer
                }
              )
            ]
          }
        )
      }
    ),
    document.body
  );
}

// src/components/Toast.tsx
import React15 from "react";
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
var toneMap = {
  success: { bg: COLORS.green[100], fg: COLORS.green[700], icon: /* @__PURE__ */ jsx23(CheckCircle, {}) },
  error: { bg: "#fee2e2", fg: "#b91c1c", icon: /* @__PURE__ */ jsx23(XCircle, {}) },
  info: { bg: COLORS.accent.blue.bg, fg: COLORS.accent.blue.fg, icon: /* @__PURE__ */ jsx23(InfoCircle, {}) },
  warning: { bg: COLORS.accent.orange.bg, fg: COLORS.accent.orange.fg, icon: /* @__PURE__ */ jsx23(AlertCircle, {}) }
};
var Toast = React15.forwardRef(function Toast2({ tone = "info", title, description, onClose, action, style, children, ...rest }, ref) {
  const palette = toneMap[tone];
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      ...rest,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
        padding: 14,
        fontFamily: TYPE.family.sans,
        minWidth: 280,
        maxWidth: 420,
        ...style
      },
      children: [
        /* @__PURE__ */ jsx23(
          "span",
          {
            "aria-hidden": true,
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              backgroundColor: palette.bg,
              color: palette.fg,
              borderRadius: "50%",
              flexShrink: 0
            },
            children: palette.icon
          }
        ),
        /* @__PURE__ */ jsxs18("div", { style: { flex: 1, minWidth: 0 }, children: [
          title && /* @__PURE__ */ jsx23("div", { style: { fontSize: TYPE.size.body, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }, children: title }),
          description && /* @__PURE__ */ jsx23("div", { style: { marginTop: title ? 2 : 0, fontSize: TYPE.size.small, color: COLORS.ink[2] }, children: description }),
          children,
          action && /* @__PURE__ */ jsx23("div", { style: { marginTop: 8 }, children: action })
        ] }),
        onClose && /* @__PURE__ */ jsx23(
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Dismiss notification",
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              background: "transparent",
              border: "none",
              color: COLORS.ink[3],
              cursor: "pointer",
              borderRadius: RADIUS.sm,
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsx23("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M3 3L11 11M11 3L3 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
});
function CheckCircle() {
  return /* @__PURE__ */ jsx23("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M4 8.5L7 11L12 5.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function XCircle() {
  return /* @__PURE__ */ jsx23("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M3 3L11 11M11 3L3 11", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
function InfoCircle() {
  return /* @__PURE__ */ jsx23("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M7 6V10M7 4H7.01", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
function AlertCircle() {
  return /* @__PURE__ */ jsx23("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M7 4V8M7 11H7.01", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}

// src/components/FormField.tsx
import { jsx as jsx24, jsxs as jsxs19 } from "react/jsx-runtime";
function FormField({
  label,
  required,
  helperText,
  error,
  htmlFor,
  layout = "stacked",
  style,
  children,
  ...rest
}) {
  const isHorizontal = layout === "horizontal";
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      ...rest,
      style: {
        display: isHorizontal ? "grid" : "flex",
        flexDirection: isHorizontal ? void 0 : "column",
        gridTemplateColumns: isHorizontal ? "minmax(120px, 30%) 1fr" : void 0,
        alignItems: isHorizontal ? "center" : "stretch",
        gap: isHorizontal ? 16 : 6,
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: [
        label && /* @__PURE__ */ jsxs19(
          "label",
          {
            htmlFor,
            style: {
              fontSize: TYPE.size.small,
              fontWeight: TYPE.weight.semibold,
              color: COLORS.ink[1]
            },
            children: [
              label,
              required && /* @__PURE__ */ jsx24("span", { "aria-hidden": true, style: { color: "#dc2626", marginLeft: 4 }, children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs19("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }, children: [
          children,
          error ? /* @__PURE__ */ jsx24("span", { style: { fontSize: TYPE.size.small, color: "#dc2626" }, children: error }) : helperText ? /* @__PURE__ */ jsx24("span", { style: { fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: helperText }) : null
        ] })
      ]
    }
  );
}

// src/components/KPIBar.tsx
import { jsx as jsx25, jsxs as jsxs20 } from "react/jsx-runtime";
var valueColor = (tone) => {
  if (tone === "positive") return COLORS.green[700];
  if (tone === "negative") return "#b91c1c";
  return COLORS.ink[1];
};
function KPIBar({ items, orientation = "horizontal", dividers = true, style, ...rest }) {
  const isVertical = orientation === "vertical";
  const dividerStyle = isVertical ? `1px solid ${COLORS.surface.borderSoft}` : `1px solid ${COLORS.surface.borderSoft}`;
  return /* @__PURE__ */ jsx25(
    "div",
    {
      ...rest,
      style: {
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical ? "stretch" : "center",
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: items.map((item, i) => {
        const showDivider = dividers && i > 0;
        const padBlock = isVertical ? "10px 0" : "0";
        const padInline = isVertical ? "0" : "0 16px";
        return /* @__PURE__ */ jsxs20(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: isVertical ? "row" : "column",
              alignItems: isVertical ? "center" : "flex-start",
              justifyContent: isVertical ? "space-between" : void 0,
              gap: isVertical ? 12 : 4,
              flex: isVertical ? "0 0 auto" : "1 1 0",
              minWidth: 0,
              padding: `${padBlock}`.trim() + " " + padInline,
              borderTop: showDivider && isVertical ? dividerStyle : "none",
              borderLeft: showDivider && !isVertical ? dividerStyle : "none"
            },
            children: [
              /* @__PURE__ */ jsx25(
                "span",
                {
                  style: {
                    fontSize: TYPE.size.small,
                    fontWeight: TYPE.weight.medium,
                    color: COLORS.ink[3]
                  },
                  children: item.label
                }
              ),
              /* @__PURE__ */ jsx25(
                "span",
                {
                  style: {
                    fontSize: isVertical ? TYPE.size.body : TYPE.size.h2,
                    fontWeight: TYPE.weight.bold,
                    color: valueColor(item.valueTone),
                    lineHeight: 1.2
                  },
                  children: item.value
                }
              ),
              item.hint && !isVertical && /* @__PURE__ */ jsx25("span", { style: { fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: item.hint })
            ]
          },
          i
        );
      })
    }
  );
}

// src/components/DiamondField.tsx
import { jsx as jsx26, jsxs as jsxs21 } from "react/jsx-runtime";
var POSITION_LAYOUT = {
  P: { x: 50, y: 56 },
  C: { x: 50, y: 90 },
  "1B": { x: 70, y: 64 },
  "2B": { x: 56, y: 42 },
  "3B": { x: 30, y: 64 },
  SS: { x: 44, y: 42 },
  LF: { x: 18, y: 22 },
  CF: { x: 50, y: 12 },
  RF: { x: 82, y: 22 }
};
var ALL_POSITIONS = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];
function DiamondField({
  positions,
  selected,
  onPositionClick,
  style,
  ...rest
}) {
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      ...rest,
      style: {
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs21("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet", style: { width: "100%", height: "100%", display: "block" }, children: [
          /* @__PURE__ */ jsx26("rect", { x: "0", y: "0", width: "100", height: "100", rx: "6", fill: "#e8f5ec" }),
          /* @__PURE__ */ jsx26("path", { d: "M 8 92 Q 50 -8 92 92 Z", fill: "#c9e7d3" }),
          /* @__PURE__ */ jsx26("polygon", { points: "50,30 70,60 50,90 30,60", fill: "#e8c89a" }),
          /* @__PURE__ */ jsx26("line", { x1: "50", y1: "90", x2: "70", y2: "60", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx26("line", { x1: "70", y1: "60", x2: "50", y2: "30", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx26("line", { x1: "50", y1: "30", x2: "30", y2: "60", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx26("line", { x1: "30", y1: "60", x2: "50", y2: "90", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx26("circle", { cx: "50", cy: "60", r: "4", fill: "#d4b380" })
        ] }),
        ALL_POSITIONS.map((pos) => {
          const layout = POSITION_LAYOUT[pos];
          const player = positions[pos];
          const isSelected = selected === pos;
          return /* @__PURE__ */ jsx26(
            PositionMarker,
            {
              code: pos,
              player: player ?? null,
              x: layout.x,
              y: layout.y,
              selected: isSelected,
              onClick: onPositionClick ? () => onPositionClick(pos) : void 0
            },
            pos
          );
        })
      ]
    }
  );
}
function PositionMarker({
  code,
  player,
  x,
  y,
  selected,
  onClick
}) {
  const interactive = !!onClick;
  const filled = !!player;
  const bg = selected ? COLORS.green[600] : filled ? COLORS.surface.card : "rgba(255,255,255,0.6)";
  const fg = selected ? "#ffffff" : COLORS.ink[1];
  const border = selected ? COLORS.green[700] : COLORS.surface.border;
  return /* @__PURE__ */ jsxs21(
    "button",
    {
      type: "button",
      onClick,
      disabled: !interactive,
      "aria-label": `Position ${code}${player?.name ? `: ${player.name}` : ": empty"}`,
      style: {
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: interactive ? "pointer" : "default"
      },
      children: [
        /* @__PURE__ */ jsx26(
          "span",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: bg,
              color: fg,
              border: `1.5px solid ${border}`,
              boxShadow: "0 1px 2px rgba(15,23,42,0.12)",
              fontSize: TYPE.size.micro,
              fontWeight: TYPE.weight.bold,
              lineHeight: 1
            },
            children: player?.number ?? code
          }
        ),
        player?.name && /* @__PURE__ */ jsx26(
          "span",
          {
            style: {
              fontSize: 9,
              fontWeight: TYPE.weight.medium,
              color: COLORS.ink[2],
              backgroundColor: "rgba(255,255,255,0.8)",
              padding: "1px 4px",
              borderRadius: 3,
              whiteSpace: "nowrap",
              maxWidth: 60,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: player.name
          }
        )
      ]
    }
  );
}
export {
  AppIcon,
  AppLauncher,
  AppSwitcher,
  Button,
  COLORS,
  Card,
  CompactCard,
  DiamondField,
  EmptyState,
  FeaturedHero,
  FilterBar,
  FontDebugToggle,
  FormField,
  GPMark,
  GPWordmark,
  GamePlanrNav,
  IconButton,
  Input,
  KPIBar,
  LAYOUT,
  LogoIcon,
  Modal,
  PageHeader,
  RADIUS,
  SHADOW,
  Select,
  Sidebar,
  StatCard,
  StatusPill,
  TINT,
  TOKENS,
  TYPE,
  Table,
  Tabs,
  Toast,
  Toggle
};
