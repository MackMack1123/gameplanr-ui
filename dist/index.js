"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppSwitcher: () => AppSwitcher,
  COLORS: () => COLORS,
  EmptyState: () => EmptyState,
  FontDebugToggle: () => FontDebugToggle,
  GamePlanrNav: () => GamePlanrNav,
  LAYOUT: () => LAYOUT,
  LogoIcon: () => LogoIcon,
  PageHeader: () => PageHeader,
  RADIUS: () => RADIUS,
  SHADOW: () => SHADOW,
  Sidebar: () => Sidebar,
  StatusPill: () => StatusPill,
  TOKENS: () => TOKENS,
  TYPE: () => TYPE
});
module.exports = __toCommonJS(index_exports);

// src/GamePlanrNav.tsx
var import_react = require("react");

// src/LogoIcon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function LogoIcon({ size = 24 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "6", width: "15", height: "15", rx: "3", fill: "white" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "27", y: "6", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "27", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "27", y: "27", width: "15", height: "15", rx: "3", fill: "white", opacity: "0.35" })
      ]
    }
  );
}

// src/GamePlanrNav.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const [apps, setApps] = (0, import_react.useState)(() => {
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
  (0, import_react.useEffect)(() => {
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
  const [open, setOpen] = (0, import_react.useState)(false);
  const switcherRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { dangerouslySetInnerHTML: { __html: `
      @media (max-width: 768px) {
        .gp-nav-right-email { display: none !important; }
        .gp-nav-right-signout { font-size: 12px !important; padding: 4px 8px !important; }
      }
      .gp-app-switcher-trigger:hover { background-color: rgba(255,255,255,0.06) !important; }
      .gp-app-option:hover { background-color: rgba(255,255,255,0.05) !important; }
    ` } }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: switcherRef, style: { display: "flex", alignItems: "center", gap: 12, position: "relative" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LogoIcon, {}),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }, children: "GamePlanr" })
                      ]
                    }
                  ),
                  meta && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "div",
                      {
                        style: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.15)" },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M5.5 8L10 12.5L14.5 8", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
                            }
                          )
                        ]
                      }
                    ),
                    open && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                                  isCurrent && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
                  userEmail && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "gp-nav-right-email", style: { fontSize: 14, color: "#94a3b8" }, children: userEmail }),
                  onSignOut && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var TOKENS = { COLORS, TYPE, RADIUS, SHADOW, LAYOUT };

// src/components/StatusPill.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function StatusPill({ variant, children, className, style }) {
  const colors = COLORS.pill[variant];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_jsx_runtime4 = require("react/jsx-runtime");
function PageHeader({ title, subtitle, actions, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        actions && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }, children: actions })
      ]
    }
  );
}

// src/components/EmptyState.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function EmptyState({ icon, title, description, action, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        icon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { marginBottom: 24 }, children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        description && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        action && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { marginTop: 24 }, children: action })
      ]
    }
  );
}

// src/components/FontDebugToggle.tsx
var import_react2 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var STORAGE_KEY = "gp-font-debug";
var URL_FLAG = "font-debug";
function FontDebugToggle() {
  const [enabled, setEnabled] = (0, import_react2.useState)(false);
  const [choice, setChoice] = (0, import_react2.useState)("jakarta");
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              type: "button",
              onClick: () => apply("jakarta"),
              style: choice === "jakarta" ? activeBtn : baseBtn,
              children: "Jakarta"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_react3 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function AppSwitcher({ apps, currentApp }) {
  const [open, setOpen] = (0, import_react3.useState)(false);
  const ref = (0, import_react3.useRef)(null);
  const active = apps.find((a) => a.id === currentApp) || apps[0];
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { ref, style: { position: "relative" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(AppTile, { short: active.short, accent: active.accent }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Chevron, { open })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
          return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(AppTile, { short: app.short, accent: app.accent, small: true }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
                isActive && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      style: { transition: "transform 120ms ease", transform: open ? "rotate(180deg)" : "none" },
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M3 5l4 4 4-4", stroke: COLORS.navy.textDim, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}

// src/components/Sidebar.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function Sidebar({ children, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  const inner = /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { style: iconStyle, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label }),
    trailing
  ] });
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { href, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
}
function Footer({ children, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
Sidebar.Footer = Footer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppSwitcher,
  COLORS,
  EmptyState,
  FontDebugToggle,
  GamePlanrNav,
  LAYOUT,
  LogoIcon,
  PageHeader,
  RADIUS,
  SHADOW,
  Sidebar,
  StatusPill,
  TOKENS,
  TYPE
});
