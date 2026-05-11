"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Accordion: () => Accordion,
  Alert: () => Alert,
  AppIcon: () => AppIcon,
  AppLauncher: () => AppLauncher,
  AppSwitcher: () => AppSwitcher,
  Button: () => Button,
  COLORS: () => COLORS,
  Card: () => Card,
  Carousel: () => Carousel,
  Chart: () => Chart,
  CompactCard: () => CompactCard,
  ConfirmDialog: () => ConfirmDialog,
  DiamondField: () => DiamondField,
  EmptyState: () => EmptyState,
  FeaturedHero: () => FeaturedHero,
  FilterBar: () => FilterBar,
  FontDebugToggle: () => FontDebugToggle,
  FormField: () => FormField,
  GPMark: () => GPMark,
  GPWordmark: () => GPWordmark,
  GamePlanrNav: () => GamePlanrNav,
  IconButton: () => IconButton,
  Input: () => Input,
  KPIBar: () => KPIBar,
  LAYOUT: () => LAYOUT,
  Label: () => Label,
  LogoIcon: () => LogoIcon,
  MobileBottomNav: () => MobileBottomNav,
  Modal: () => Modal,
  PageHeader: () => PageHeader,
  Pagination: () => Pagination,
  Popover: () => Popover,
  Progress: () => Progress,
  RADIUS: () => RADIUS,
  SHADOW: () => SHADOW,
  Select: () => Select,
  Separator: () => Separator,
  Sheet: () => Sheet,
  Sidebar: () => Sidebar,
  Skeleton: () => Skeleton,
  StatCard: () => StatCard,
  StatusPill: () => StatusPill,
  TINT: () => TINT,
  TOKENS: () => TOKENS,
  TYPE: () => TYPE,
  Table: () => Table,
  Tabs: () => Tabs,
  Textarea: () => Textarea,
  Toast: () => Toast,
  Toggle: () => Toggle,
  Tooltip: () => Tooltip,
  useIsMobile: () => useIsMobile
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
  const baseBtn2 = {
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
    ...baseBtn2,
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
              style: choice === "jakarta" ? activeBtn : baseBtn2,
              children: "Jakarta"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              type: "button",
              onClick: () => apply("inter"),
              style: choice === "inter" ? activeBtn : baseBtn2,
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

// src/components/AppLauncher.tsx
var import_react4 = require("react");

// src/components/AppIcon.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M7 4h10v3a5 5 0 0 1-10 0V4Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M17 5h2.5a1.5 1.5 0 0 1 0 3H17M7 5H4.5a1.5 1.5 0 0 0 0 3H7" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M10 12.5v3.5h4v-3.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M8 19h8" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M9 16h6v3H9z" })
      ] });
    case "pitch":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "1.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M12 5v14" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { cx: "12", cy: "12", r: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M2.5 9h2v6h-2zM21.5 9h-2v6h2z" })
      ] });
    case "baseball":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { cx: "12", cy: "12", r: "8.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M5.2 7.5c2.2 1.2 3.6 3.6 3.6 6.5 0 1.4-.4 2.8-1 3.9" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M18.8 7.5c-2.2 1.2-3.6 3.6-3.6 6.5 0 1.4.4 2.8 1 3.9" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M7.5 6.2l.6 1M9 5.2l.5 1M16.5 6.2l-.6 1M15 5.2l-.5 1M6.5 18l.6-1M8 19l.5-1M17.5 18l-.6-1M16 19l-.5-1" })
      ] });
    case "calendar":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M3 10h18" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M8 3v4M16 3v4" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "7", y: "13", width: "3", height: "3", rx: "0.5", fill: stroke, stroke: "none" })
      ] });
    case "megaphone":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M14 8a4 4 0 0 1 0 8" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M17 5.5a8 8 0 0 1 0 13" })
      ] });
    case "clipboard":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M9 4h6v3H9z" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M9 12h6M9 16h4" })
      ] });
    case "fundraise":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M9.5 11.5h3a1 1 0 0 0 0-2H10a1 1 0 0 1 0-2h3M11 6.5v1.5M11 13v1.5" })
      ] });
    case "grid":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "3.5", y: "3.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "14.5", y: "3.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "3.5", y: "14.5", width: "6", height: "6", rx: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "14.5", y: "14.5", width: "6", height: "6", rx: "1" })
      ] });
    case "arrow-right":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M5 12h14M13 6l6 6-6 6" }) });
    case "plus":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M12 5v14M5 12h14" }) });
    case "check":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M5 12.5l4 4 10-10" }) });
    case "bell":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M6 9a6 6 0 1 1 12 0v4l1.5 3h-15L6 13V9Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M10 19a2 2 0 0 0 4 0" })
      ] });
    case "lock":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("rect", { x: "5", y: "11", width: "14", height: "9", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M8 11V8a4 4 0 1 1 8 0v3" })
      ] });
    case "sparkle":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" }) });
    case "search":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { ...common, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { cx: "11", cy: "11", r: "6.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M16 16l4 4" })
      ] });
    case "chevron-down":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M6 9l6 6 6-6" }) });
    case "external":
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M14 5h5v5M19 5l-9 9M11 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-5" }) });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { ...common, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { cx: "12", cy: "12", r: "6" }) });
  }
}

// src/components/GPWordmark.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function GPWordmark({
  height = 22,
  color = COLORS.ink[1],
  accent = COLORS.green[600]
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "svg",
    {
      height,
      viewBox: "0 0 240 60",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "GamePlanr",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
          "text",
          {
            x: "0",
            y: "44",
            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "-1.4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("tspan", { fill: color, children: "GamePlan" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("tspan", { fill: accent, children: "r" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_jsx_runtime10 = require("react/jsx-runtime");
var LAUNCHER_QUERY_CSS = `
.gp-launcher-root {
  container-type: inline-size;
  container-name: gp-launcher;
}
@container gp-launcher (max-width: 520px) {
  .gp-launcher-inner { padding: 24px 16px 40px !important; }
  .gp-launcher-hero { padding: 20px !important; }
  .gp-launcher-hero-row {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 16px !important;
  }
  .gp-launcher-hero-cta {
    width: 100% !important;
    justify-content: center !important;
  }
  .gp-launcher-grid {
    grid-template-columns: 1fr !important;
  }
  .gp-launcher-greeting-h1 {
    font-size: 24px !important;
  }
}
@container gp-launcher (min-width: 521px) and (max-width: 768px) {
  .gp-launcher-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
`;
var launcherStyleInjected = false;
function ensureLauncherStyle() {
  if (typeof document === "undefined" || launcherStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-launcher", "");
  tag.appendChild(document.createTextNode(LAUNCHER_QUERY_CSS));
  document.head.appendChild(tag);
  launcherStyleInjected = true;
}
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
  ensureLauncherStyle();
  const [featuredId, setFeaturedId] = (0, import_react4.useState)(defaultFeatured);
  const featured = apps.find((a) => a.id === featuredId);
  const others = apps.filter((a) => a.id !== featuredId);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: "gp-launcher-root",
      style: {
        width: "100%",
        minHeight: "100%",
        background: COLORS.surface.page,
        fontFamily: TYPE.family.sans
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(TopStrip, { user }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
          "div",
          {
            className: "gp-launcher-inner",
            style: { maxWidth: 1100, margin: "0 auto", padding: "40px 32px 56px" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Greeting, { title: greeting.title, subtitle: greeting.subtitle }),
              featured && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                FeaturedHero,
                {
                  app: featured,
                  onContinue: () => onContinue?.(featured.id)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { style: { fontSize: 13, color: COLORS.ink[4] }, children: [
                      others.length,
                      " apps"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "div",
                {
                  className: "gp-launcher-grid",
                  style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
                  children: others.map((app) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                  ))
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Footer, { onManageAccount })
            ]
          }
        )
      ]
    }
  );
}
function TopStrip({ user }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      style: {
        borderBottom: `1px solid ${COLORS.surface.border}`,
        background: COLORS.surface.card
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(GPWordmark, { height: 20 }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { style: { fontSize: 13, color: COLORS.ink[3] }, children: user.email }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { marginBottom: 24 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "h1",
      {
        className: "gp-launcher-greeting-h1",
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
    subtitle && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.5, color: COLORS.ink[3] }, children: subtitle })
  ] });
}
function FeaturedHero({ app, onContinue }) {
  const tint = TINT[app.tint];
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        onContinue?.();
      },
      className: "gp-launcher-hero",
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { "aria-hidden": true, style: { position: "absolute", right: 60, top: 24, opacity: 0.3 }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "sparkle", size: 14, stroke: "#22c55e" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
          "div",
          {
            className: "gp-launcher-hero-row",
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              gap: 20
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: app.icon, size: 28, strokeWidth: 2 })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { minWidth: 0 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: 0, fontSize: 13, color: COLORS.navy.textDim }, children: app.short })
                  ] })
                ] }),
                app.activity && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { paddingTop: 8 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: 0, fontSize: 18, fontWeight: TYPE.weight.bold, color: "#fff" }, children: app.activity.label }),
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: "2px 0 0", fontSize: 13, color: COLORS.navy.textDim }, children: app.activity.sub })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                "button",
                {
                  type: "button",
                  className: "gp-launcher-hero-cta",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onContinue?.();
                  },
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "arrow-right", size: 16 })
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
  const [hover, setHover] = (0, import_react4.useState)(false);
  const tint = TINT[app.tint];
  const isSoon = app.status === "soon";
  const isPaidTrial = app.status === "live" && !app.activated && app.paid;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: app.icon, size: 19, strokeWidth: 1.9 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
            !isSoon && app.activated && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: 0, fontSize: 12.5, color: COLORS.ink[3], lineHeight: 1.4 }, children: app.short }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                isSoon ? notified ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "check", size: 11, strokeWidth: 2.5 }),
                      " We'll notify you"
                    ]
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "bell", size: 11 }),
                      " Notify me",
                      app.eta ? ` \xB7 ${app.eta}` : ""
                    ]
                  }
                ) : app.activated ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
                ) : isPaidTrial ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "sparkle", size: 11, strokeWidth: 2.4 }),
                      " Start free trial"
                    ]
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
                      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "plus", size: 11, strokeWidth: 2.4 }),
                      " Activate"
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "sparkle", size: 20 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: 0, fontSize: 13.5, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }, children: "One login, every app" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { margin: "2px 0 0", fontSize: 12.5, color: COLORS.ink[3] }, children: "Activate any GamePlanr app instantly with your existing account." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppIcon, { name: "arrow-right", size: 13 })
            ]
          }
        )
      ]
    }
  );
}

// src/components/Sidebar.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function Sidebar({ children, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  const inner = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { style: iconStyle, children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: label }),
    trailing
  ] });
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("a", { href, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", onClick, "aria-current": active ? "page" : void 0, style: baseStyle, children: inner });
}
function Footer2({ children, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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

// src/components/MobileBottomNav.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function MobileBottomNav({
  children,
  className,
  style,
  ariaLabel = "Primary mobile navigation"
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "nav",
    {
      className,
      "aria-label": ariaLabel,
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        background: COLORS.surface.card,
        borderTop: `1px solid ${COLORS.surface.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        fontFamily: TYPE.family.sans,
        ...style
      },
      children
    }
  );
}
function Item({
  icon,
  label,
  href,
  onClick,
  active,
  badge
}) {
  const baseStyle = {
    flex: 1,
    minWidth: 0,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: "8px 6px",
    minHeight: 56,
    // 48px touch + safe vertical
    background: "transparent",
    border: "none",
    borderRadius: RADIUS.sm,
    cursor: "pointer",
    color: active ? COLORS.green[600] : COLORS.ink[3],
    textDecoration: "none",
    fontFamily: TYPE.family.sans,
    fontSize: TYPE.size.micro,
    fontWeight: active ? TYPE.weight.semibold : TYPE.weight.medium,
    lineHeight: 1.1,
    transition: "color 120ms ease",
    WebkitTapHighlightColor: "transparent"
  };
  const iconWrap = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    color: "inherit"
  };
  const labelStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%"
  };
  const inner = /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { style: iconWrap, children: [
      icon,
      badge != null && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "span",
        {
          style: {
            position: "absolute",
            top: -2,
            right: -4,
            minWidth: 14,
            height: 14,
            padding: "0 4px",
            borderRadius: 999,
            background: "#dc2626",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1
          },
          children: badge
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: labelStyle, children: label })
  ] });
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "a",
      {
        href,
        "aria-current": active ? "page" : void 0,
        style: baseStyle,
        children: inner
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "button",
    {
      type: "button",
      onClick,
      "aria-current": active ? "page" : void 0,
      style: baseStyle,
      children: inner
    }
  );
}
function Spacer({
  height = 56,
  style
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      "aria-hidden": true,
      style: {
        height,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        ...style
      }
    }
  );
}
MobileBottomNav.Item = Item;
MobileBottomNav.Spacer = Spacer;

// src/hooks/use-mobile.ts
var import_react5 = require("react");
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// src/components/Separator.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function Separator({
  orientation = "horizontal",
  decorative = true,
  inset,
  className,
  style
}) {
  const isVertical = orientation === "vertical";
  const ariaProps = decorative ? { "aria-hidden": true } : { role: "separator", "aria-orientation": orientation };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      className,
      ...ariaProps,
      style: {
        flexShrink: 0,
        background: COLORS.surface.border,
        ...isVertical ? { width: 1, height: "100%", marginInline: inset } : { height: 1, width: "100%", marginBlock: inset },
        ...style
      }
    }
  );
}

// src/components/Label.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function Label({
  htmlFor,
  required,
  optional,
  children,
  style,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "label",
    {
      htmlFor,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[1],
        lineHeight: 1.4,
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children }),
        required && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-hidden": true, style: { color: COLORS.green[600], fontWeight: TYPE.weight.bold }, children: "*" }),
        optional && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { color: COLORS.ink[3], fontWeight: TYPE.weight.regular, fontSize: TYPE.size.micro }, children: optional })
      ]
    }
  );
}

// src/components/Skeleton.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var SHIMMER_KEYFRAMES = `
@keyframes gp-skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;
var shimmerStyleInjected = false;
function ensureShimmerStyle() {
  if (typeof document === "undefined" || shimmerStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-skeleton", "");
  tag.appendChild(document.createTextNode(SHIMMER_KEYFRAMES));
  document.head.appendChild(tag);
  shimmerStyleInjected = true;
}
function Skeleton({
  width = "100%",
  height = 14,
  shape = "rect",
  paused,
  className,
  style
}) {
  ensureShimmerStyle();
  const radius = shape === "circle" ? "50%" : shape === "pill" ? 999 : RADIUS.sm;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    {
      "aria-hidden": true,
      className,
      style: {
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${COLORS.surface.hover} 0%, ${COLORS.surface.borderSoft} 50%, ${COLORS.surface.hover} 100%)`,
        backgroundSize: "200% 100%",
        animation: paused ? "none" : "gp-skeleton-shimmer 1.4s ease-in-out infinite",
        ...style
      }
    }
  );
}

// src/components/Progress.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var sizeMap = { sm: 4, md: 6, lg: 10 };
var toneFg = {
  brand: COLORS.green[600],
  neutral: COLORS.ink[2],
  warning: "#f59e0b",
  danger: "#dc2626"
};
var INDETERMINATE_KEYFRAMES = `
@keyframes gp-progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;
var indetStyleInjected = false;
function ensureIndetStyle() {
  if (typeof document === "undefined" || indetStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-progress", "");
  tag.appendChild(document.createTextNode(INDETERMINATE_KEYFRAMES));
  document.head.appendChild(tag);
  indetStyleInjected = true;
}
function Progress({
  value = 0,
  max = 100,
  tone = "brand",
  size = "md",
  showLabel,
  indeterminate,
  ariaLabel = "Progress",
  className,
  style
}) {
  if (indeterminate) ensureIndetStyle();
  const pct = indeterminate ? null : Math.min(100, Math.max(0, value / max * 100));
  const bar = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    {
      role: "progressbar",
      "aria-label": ariaLabel,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": indeterminate ? void 0 : value,
      style: {
        position: "relative",
        flex: 1,
        height: sizeMap[size],
        background: COLORS.surface.hover,
        borderRadius: 999,
        overflow: "hidden"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            width: indeterminate ? "30%" : `${pct}%`,
            background: toneFg[tone],
            borderRadius: 999,
            transition: indeterminate ? "none" : "width 200ms ease",
            animation: indeterminate ? "gp-progress-indeterminate 1.6s cubic-bezier(.45,0,.4,1) infinite" : "none"
          }
        }
      )
    }
  );
  if (!showLabel) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className, style: { display: "flex", alignItems: "center", ...style }, children: bar });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    "div",
    {
      className,
      style: { display: "flex", alignItems: "center", gap: 10, ...style },
      children: [
        bar,
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "span",
          {
            style: {
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.ink[3],
              minWidth: 32,
              textAlign: "right",
              fontVariantNumeric: "tabular-nums"
            },
            children: indeterminate ? "\u2026" : `${Math.round(pct ?? 0)}%`
          }
        )
      ]
    }
  );
}

// src/components/Alert.tsx
var import_react6 = require("react");
var import_jsx_runtime17 = require("react/jsx-runtime");
var TONES = {
  info: {
    bg: COLORS.accent.blue.bg,
    border: "#bfdbfe",
    fg: "#1e40af",
    iconFg: COLORS.accent.blue.fg
  },
  success: {
    bg: COLORS.green[50],
    border: "#bbf7d0",
    fg: COLORS.green.text,
    iconFg: COLORS.green[600]
  },
  warning: {
    bg: COLORS.accent.orange.bg,
    border: "#fde68a",
    fg: "#92400e",
    iconFg: COLORS.accent.orange.fg
  },
  destructive: {
    bg: COLORS.accent.red.bg,
    border: "#fecaca",
    fg: "#991b1b",
    iconFg: COLORS.accent.red.fg
  }
};
function Alert({
  tone = "info",
  title,
  children,
  icon,
  action,
  dismissible,
  onDismiss,
  className,
  style
}) {
  const [open, setOpen] = (0, import_react6.useState)(true);
  if (!open) return null;
  const t = TONES[tone];
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "div",
    {
      role: "alert",
      className,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: RADIUS.md,
        fontFamily: TYPE.family.sans,
        color: t.fg,
        ...style
      },
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "span",
          {
            "aria-hidden": true,
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.iconFg,
              flexShrink: 0,
              marginTop: 1
            },
            children: icon
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
            "div",
            {
              style: {
                fontSize: TYPE.size.body,
                fontWeight: TYPE.weight.semibold,
                marginBottom: children ? 2 : 0,
                color: t.fg
              },
              children: title
            }
          ),
          children && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { fontSize: TYPE.size.small, lineHeight: 1.5, color: t.fg }, children })
        ] }),
        action && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { style: { flexShrink: 0, display: "flex", alignItems: "center" }, children: action }),
        dismissible && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "button",
          {
            type: "button",
            "aria-label": "Dismiss",
            onClick: () => {
              setOpen(false);
              onDismiss?.();
            },
            style: {
              background: "transparent",
              border: 0,
              color: t.fg,
              cursor: "pointer",
              padding: 2,
              marginLeft: 4,
              opacity: 0.7,
              lineHeight: 1,
              fontSize: 16,
              flexShrink: 0
            },
            children: "\xD7"
          }
        )
      ]
    }
  );
}

// src/components/Textarea.tsx
var import_react7 = __toESM(require("react"));
var import_jsx_runtime18 = require("react/jsx-runtime");
var padMap = { sm: "8px 10px", md: "10px 12px", lg: "12px 14px" };
var fontMap = { sm: 12.5, md: 14, lg: 15.5 };
function Textarea({
  size = "md",
  invalid,
  autoResize,
  maxRows = 12,
  rows = 3,
  style,
  onChange,
  value,
  defaultValue,
  ...rest
}) {
  const ref = (0, import_react7.useRef)(null);
  const [focused, setFocused] = import_react7.default.useState(false);
  const fitToContent = import_react7.default.useCallback(() => {
    const el = ref.current;
    if (!el || !autoResize) return;
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20") || 20;
    const maxHeight = lineHeight * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [autoResize, maxRows]);
  (0, import_react7.useEffect)(() => {
    fitToContent();
  }, [fitToContent, value, defaultValue]);
  const ringColor = invalid ? "#dc2626" : focused ? COLORS.green[600] : COLORS.surface.border;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "textarea",
    {
      ref,
      rows,
      value,
      defaultValue,
      onChange: (e) => {
        onChange?.(e);
        if (autoResize) fitToContent();
      },
      onFocus: (e) => {
        setFocused(true);
        rest.onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        rest.onBlur?.(e);
      },
      "aria-invalid": invalid || void 0,
      style: {
        width: "100%",
        padding: padMap[size],
        fontSize: fontMap[size],
        lineHeight: 1.5,
        fontFamily: TYPE.family.sans,
        color: COLORS.ink[1],
        background: COLORS.surface.card,
        border: `1px solid ${ringColor}`,
        borderRadius: RADIUS.md,
        outline: "none",
        boxShadow: focused ? `0 0 0 3px ${invalid ? "rgba(220,38,38,0.18)" : "rgba(22,163,74,0.18)"}` : "none",
        resize: autoResize ? "none" : "vertical",
        transition: "border-color 120ms ease, box-shadow 120ms ease",
        ...style
      },
      ...rest
    }
  );
}

// src/components/Pagination.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  ariaLabel = "Pagination",
  className,
  style
}) {
  const pages = computePages(page, pageCount, siblingCount);
  const canPrev = page > 1;
  const canNext = page < pageCount;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    "nav",
    {
      "aria-label": ariaLabel,
      className,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(NavButton, { disabled: !canPrev, onClick: () => onPageChange(page - 1), ariaLabel: "Previous page", children: "\u2039" }),
        pages.map(
          (p, i) => p === "gap" ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            "span",
            {
              "aria-hidden": true,
              style: {
                padding: "0 6px",
                color: COLORS.ink[3],
                fontSize: TYPE.size.small
              },
              children: "\u2026"
            },
            `gap-${i}`
          ) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            PageButton,
            {
              page: p,
              current: p === page,
              onClick: () => onPageChange(p)
            },
            p
          )
        ),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(NavButton, { disabled: !canNext, onClick: () => onPageChange(page + 1), ariaLabel: "Next page", children: "\u203A" })
      ]
    }
  );
}
function PageButton({
  page,
  current,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "button",
    {
      type: "button",
      "aria-current": current ? "page" : void 0,
      onClick,
      style: {
        minWidth: 32,
        height: 32,
        padding: "0 8px",
        background: current ? COLORS.green[600] : "transparent",
        color: current ? "#fff" : COLORS.ink[1],
        border: current ? "none" : `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.sm,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        fontWeight: current ? TYPE.weight.semibold : TYPE.weight.medium,
        cursor: "pointer",
        transition: "background-color 120ms ease, color 120ms ease"
      },
      children: page
    }
  );
}
function NavButton({
  disabled,
  onClick,
  ariaLabel,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "button",
    {
      type: "button",
      disabled,
      "aria-label": ariaLabel,
      onClick,
      style: {
        minWidth: 32,
        height: 32,
        background: "transparent",
        color: disabled ? COLORS.ink[4] : COLORS.ink[2],
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.sm,
        fontSize: 18,
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      },
      children
    }
  );
}
function computePages(page, pageCount, siblingCount) {
  if (pageCount <= 1) return [1];
  const window2 = Math.max(0, siblingCount);
  const first = 1;
  const last = pageCount;
  const left = Math.max(page - window2, first + 1);
  const right = Math.min(page + window2, last - 1);
  const out = [first];
  if (left > first + 1) out.push("gap");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < last - 1) out.push("gap");
  if (last !== first) out.push(last);
  return out;
}

// src/components/Accordion.tsx
var import_react8 = require("react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var AccordionContext = (0, import_react8.createContext)(null);
function Accordion({
  type = "single",
  openIds: controlledOpen,
  defaultOpenIds,
  onOpenChange,
  children,
  className,
  style
}) {
  const [uncontrolled, setUncontrolled] = (0, import_react8.useState)(
    defaultOpenIds ?? []
  );
  const isControlled = controlledOpen !== void 0;
  const openIds = isControlled ? controlledOpen : uncontrolled;
  const setOpen = (0, import_react8.useCallback)(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  const isOpen = (0, import_react8.useCallback)((id) => openIds.includes(id), [openIds]);
  const toggle = (0, import_react8.useCallback)(
    (id) => {
      const currentlyOpen = openIds.includes(id);
      if (type === "single") {
        setOpen(currentlyOpen ? [] : [id]);
      } else {
        setOpen(currentlyOpen ? openIds.filter((x) => x !== id) : [...openIds, id]);
      }
    },
    [openIds, type, setOpen]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(AccordionContext.Provider, { value: { isOpen, toggle }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      className,
      style: {
        display: "flex",
        flexDirection: "column",
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.md,
        overflow: "hidden",
        fontFamily: TYPE.family.sans,
        ...style
      },
      children
    }
  ) });
}
var ItemContext = (0, import_react8.createContext)(null);
function Item2({
  id,
  children,
  style
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ItemContext.Provider, { value: id, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      "data-accordion-item": id,
      style: {
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
        ...style
      },
      children
    }
  ) });
}
function Trigger({
  children,
  style
}) {
  const ctx = (0, import_react8.useContext)(AccordionContext);
  const id = (0, import_react8.useContext)(ItemContext);
  if (!ctx || !id) return null;
  const open = ctx.isOpen(id);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "button",
    {
      type: "button",
      "aria-expanded": open,
      onClick: () => ctx.toggle(id),
      style: {
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
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: { flex: 1, minWidth: 0 }, children }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "span",
          {
            "aria-hidden": true,
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: COLORS.ink[3],
              transition: "transform 180ms ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)"
            },
            children: "\u25BE"
          }
        )
      ]
    }
  );
}
function Content({
  children,
  style
}) {
  const ctx = (0, import_react8.useContext)(AccordionContext);
  const id = (0, import_react8.useContext)(ItemContext);
  if (!ctx || !id) return null;
  const open = ctx.isOpen(id);
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "div",
    {
      style: {
        padding: "0 14px 14px",
        fontSize: TYPE.size.body,
        color: COLORS.ink[2],
        lineHeight: 1.55,
        ...style
      },
      children
    }
  );
}
Accordion.Item = Item2;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

// src/components/Sheet.tsx
var import_react9 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime21 = require("react/jsx-runtime");
var sizeMap2 = {
  sm: 320,
  md: 420,
  lg: 560,
  full: "100%"
};
var SHEET_KEYFRAMES = `
@keyframes gp-sheet-fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes gp-sheet-slide-right { from { transform: translateX(100%) } to { transform: translateX(0) } }
@keyframes gp-sheet-slide-left  { from { transform: translateX(-100%) } to { transform: translateX(0) } }
@keyframes gp-sheet-slide-up    { from { transform: translateY(100%) } to { transform: translateY(0) } }
@keyframes gp-sheet-slide-down  { from { transform: translateY(-100%) } to { transform: translateY(0) } }
`;
var sheetStyleInjected = false;
function ensureSheetStyle() {
  if (typeof document === "undefined" || sheetStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-sheet", "");
  tag.appendChild(document.createTextNode(SHEET_KEYFRAMES));
  document.head.appendChild(tag);
  sheetStyleInjected = true;
}
var slideAnim = {
  right: "gp-sheet-slide-right 220ms cubic-bezier(.32,.72,.0,1)",
  left: "gp-sheet-slide-left 220ms cubic-bezier(.32,.72,.0,1)",
  top: "gp-sheet-slide-down 220ms cubic-bezier(.32,.72,.0,1)",
  bottom: "gp-sheet-slide-up 220ms cubic-bezier(.32,.72,.0,1)"
};
function Sheet({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  description,
  footer,
  closeOnBackdrop = true,
  children,
  ariaLabel
}) {
  ensureSheetStyle();
  (0, import_react9.useEffect)(() => {
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
  const isHorizontal = side === "left" || side === "right";
  const panelStyle = {
    position: "absolute",
    background: COLORS.surface.card,
    boxShadow: side === "right" ? "-12px 0 32px rgba(15,23,42,0.18)" : side === "left" ? "12px 0 32px rgba(15,23,42,0.18)" : side === "top" ? "0 12px 32px rgba(15,23,42,0.18)" : "0 -12px 32px rgba(15,23,42,0.18)",
    fontFamily: TYPE.family.sans,
    display: "flex",
    flexDirection: "column",
    animation: slideAnim[side],
    ...side === "right" && {
      top: 0,
      bottom: 0,
      right: 0,
      width: sizeMap2[size],
      maxWidth: "100%"
    },
    ...side === "left" && {
      top: 0,
      bottom: 0,
      left: 0,
      width: sizeMap2[size],
      maxWidth: "100%"
    },
    ...side === "top" && {
      top: 0,
      left: 0,
      right: 0,
      height: sizeMap2[size],
      maxHeight: "100%"
    },
    ...side === "bottom" && {
      bottom: 0,
      left: 0,
      right: 0,
      height: sizeMap2[size],
      maxHeight: "100%",
      borderTopLeftRadius: RADIUS.lg,
      borderTopRightRadius: RADIUS.lg
    }
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      "div",
      {
        role: "presentation",
        onMouseDown: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.45)",
          zIndex: 1e3,
          animation: "gp-sheet-fade-in 180ms ease-out"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": !title && ariaLabel ? ariaLabel : void 0,
            "aria-labelledby": title ? "gp-sheet-title" : void 0,
            style: panelStyle,
            children: [
              (title || description) && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
                "div",
                {
                  style: {
                    padding: "16px 20px",
                    borderBottom: `1px solid ${COLORS.surface.borderSoft}`
                  },
                  children: [
                    title && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                      "h2",
                      {
                        id: "gp-sheet-title",
                        style: {
                          margin: 0,
                          fontSize: TYPE.size.h2,
                          fontWeight: TYPE.weight.semibold,
                          color: COLORS.ink[1]
                        },
                        children: title
                      }
                    ),
                    description && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { style: { margin: "4px 0 0", fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: description })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "div",
                {
                  style: {
                    padding: "16px 20px",
                    overflowY: "auto",
                    flex: 1,
                    color: COLORS.ink[1],
                    fontSize: TYPE.size.body
                  },
                  children
                }
              ),
              footer && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 8,
                    padding: "12px 20px",
                    borderTop: `1px solid ${COLORS.surface.borderSoft}`,
                    background: COLORS.surface.page
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
  void isHorizontal;
}

// src/components/ConfirmDialog.tsx
var import_react10 = require("react");
var import_react_dom2 = require("react-dom");
var import_jsx_runtime22 = require("react/jsx-runtime");
function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "neutral",
  confirmLoading,
  closeOnBackdrop = true
}) {
  (0, import_react10.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !confirmLoading) onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel, confirmLoading]);
  if (!open) return null;
  if (typeof document === "undefined") return null;
  const isDestructive = tone === "destructive";
  const confirmBg = isDestructive ? "#dc2626" : COLORS.green[600];
  const confirmHoverBg = isDestructive ? "#b91c1c" : COLORS.green[700];
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      "div",
      {
        role: "presentation",
        onMouseDown: (e) => {
          if (closeOnBackdrop && !confirmLoading && e.target === e.currentTarget) {
            onCancel();
          }
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          zIndex: 1e3
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            "aria-labelledby": "gp-confirm-title",
            "aria-describedby": description ? "gp-confirm-desc" : void 0,
            style: {
              background: COLORS.surface.card,
              borderRadius: RADIUS.lg,
              boxShadow: "0 12px 32px rgba(15,23,42,0.18)",
              width: "100%",
              maxWidth: 420,
              fontFamily: TYPE.family.sans,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { style: { padding: "20px 22px 12px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  "h2",
                  {
                    id: "gp-confirm-title",
                    style: {
                      margin: 0,
                      fontSize: TYPE.size.h2,
                      fontWeight: TYPE.weight.semibold,
                      color: isDestructive ? "#991b1b" : COLORS.ink[1]
                    },
                    children: title
                  }
                ),
                description && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  "p",
                  {
                    id: "gp-confirm-desc",
                    style: {
                      margin: "8px 0 0",
                      fontSize: TYPE.size.small,
                      color: COLORS.ink[2],
                      lineHeight: 1.5
                    },
                    children: description
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    padding: "12px 22px 18px"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                      "button",
                      {
                        type: "button",
                        disabled: confirmLoading,
                        onClick: onCancel,
                        style: {
                          ...secondaryBtn,
                          opacity: confirmLoading ? 0.5 : 1,
                          cursor: confirmLoading ? "not-allowed" : "pointer"
                        },
                        children: cancelLabel
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                      "button",
                      {
                        type: "button",
                        disabled: confirmLoading,
                        onClick: onConfirm,
                        onMouseEnter: (e) => {
                          if (!confirmLoading) e.currentTarget.style.background = confirmHoverBg;
                        },
                        onMouseLeave: (e) => {
                          if (!confirmLoading) e.currentTarget.style.background = confirmBg;
                        },
                        style: {
                          ...primaryBtn,
                          background: confirmBg,
                          opacity: confirmLoading ? 0.7 : 1,
                          cursor: confirmLoading ? "wait" : "pointer"
                        },
                        children: confirmLoading ? "Working\u2026" : confirmLabel
                      }
                    )
                  ]
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
var baseBtn = {
  height: 36,
  padding: "0 14px",
  borderRadius: RADIUS.md,
  fontFamily: TYPE.family.sans,
  fontSize: TYPE.size.small,
  fontWeight: TYPE.weight.semibold,
  border: "none",
  transition: "background-color 120ms ease"
};
var secondaryBtn = {
  ...baseBtn,
  background: "transparent",
  color: COLORS.ink[2],
  border: `1px solid ${COLORS.surface.border}`
};
var primaryBtn = {
  ...baseBtn,
  color: "#fff"
};

// src/components/Tooltip.tsx
var import_react11 = __toESM(require("react"));
var import_react_dom3 = require("react-dom");
var import_jsx_runtime23 = require("react/jsx-runtime");
function Tooltip({
  content,
  children,
  side = "top",
  delay = 250,
  disabled
}) {
  const id = (0, import_react11.useId)();
  const triggerRef = (0, import_react11.useRef)(null);
  const showTimer = (0, import_react11.useRef)(null);
  const [open, setOpen] = (0, import_react11.useState)(false);
  const [pos, setPos] = (0, import_react11.useState)(null);
  const compute = import_react11.default.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offset = 8;
    const tipW = 240;
    const tipH = 32;
    let chosen = side;
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
  (0, import_react11.useEffect)(() => {
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
  const show = (delayed) => {
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
  const child = import_react11.default.Children.only(children);
  const cloned = import_react11.default.cloneElement(child, {
    ref: (node) => {
      triggerRef.current = node;
      const oldRef = child.ref;
      if (typeof oldRef === "function") oldRef(node);
      else if (oldRef && typeof oldRef === "object") oldRef.current = node;
    },
    onMouseEnter: (e) => {
      child.props.onMouseEnter?.(e);
      show(true);
    },
    onMouseLeave: (e) => {
      child.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e) => {
      child.props.onFocus?.(e);
      show(false);
    },
    onBlur: (e) => {
      child.props.onBlur?.(e);
      hide();
    },
    "aria-describedby": open ? id : void 0
  });
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
    cloned,
    open && pos && typeof document !== "undefined" && (0, import_react_dom3.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        "div",
        {
          id,
          role: "tooltip",
          style: {
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
            zIndex: 1100
          },
          children: content
        }
      ),
      document.body
    )
  ] });
}
function transformFor(side) {
  switch (side) {
    case "top":
      return "translate(-50%, -100%)";
    case "bottom":
      return "translate(-50%, 0)";
    case "left":
      return "translate(-100%, -50%)";
    case "right":
      return "translate(0, -50%)";
  }
}

// src/components/Popover.tsx
var import_react12 = __toESM(require("react"));
var import_react_dom4 = require("react-dom");
var import_jsx_runtime24 = require("react/jsx-runtime");
function Popover({
  trigger,
  children,
  side = "bottom",
  align = "start",
  offset = 6,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ariaLabel
}) {
  const [uncontrolled, setUncontrolled] = (0, import_react12.useState)(!!defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? !!controlledOpen : uncontrolled;
  const setOpen = (next) => {
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  };
  const triggerRef = (0, import_react12.useRef)(null);
  const panelRef = (0, import_react12.useRef)(null);
  const [pos, setPos] = (0, import_react12.useState)(null);
  const compute = import_react12.default.useCallback(() => {
    const t = triggerRef.current;
    const p = panelRef.current;
    if (!t || !p) return;
    const tr = t.getBoundingClientRect();
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let chosen = side;
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
    left = Math.max(8, Math.min(left, vw - pw - 8));
    top = Math.max(8, Math.min(top, vh - ph - 8));
    setPos({ top, left, side: chosen });
  }, [side, align, offset]);
  (0, import_react12.useEffect)(() => {
    if (!open) {
      setPos(null);
      return;
    }
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
  (0, import_react12.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e) => {
      const t = triggerRef.current;
      const p = panelRef.current;
      const target = e.target;
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
  }, [open]);
  const child = import_react12.default.Children.only(trigger);
  const cloned = import_react12.default.cloneElement(child, {
    ref: (node) => {
      triggerRef.current = node;
      const oldRef = child.ref;
      if (typeof oldRef === "function") oldRef(node);
      else if (oldRef && typeof oldRef === "object") oldRef.current = node;
    },
    onClick: (e) => {
      child.props.onClick?.(e);
      setOpen(!open);
    },
    "aria-expanded": open,
    "aria-haspopup": "dialog"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
    cloned,
    open && typeof document !== "undefined" && (0, import_react_dom4.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "div",
        {
          ref: panelRef,
          role: "dialog",
          "aria-label": ariaLabel,
          style: {
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
            transition: "opacity 80ms ease"
          },
          children
        }
      ),
      document.body
    )
  ] });
}

// src/components/Carousel.tsx
var import_react13 = __toESM(require("react"));
var import_jsx_runtime25 = require("react/jsx-runtime");
function Carousel({
  children,
  showArrows = true,
  showDots = true,
  gap = 12,
  slideWidth = "100%",
  ariaLabel = "Carousel",
  className,
  style
}) {
  const slides = import_react13.default.Children.toArray(children);
  const trackRef = (0, import_react13.useRef)(null);
  const [active, setActive] = (0, import_react13.useState)(0);
  (0, import_react13.useEffect)(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slideEls = track.children;
      if (!slideEls.length) return;
      const trackLeft = track.scrollLeft;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      for (let i = 0; i < slideEls.length; i++) {
        const child = slideEls[i];
        const dist = Math.abs(child.offsetLeft - trackLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      }
      setActive(nearestIdx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);
  const goTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[idx];
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(slides.length - 1, active + 1));
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    "section",
    {
      "aria-roledescription": "carousel",
      "aria-label": ariaLabel,
      className,
      style: {
        position: "relative",
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "div",
          {
            ref: trackRef,
            style: {
              display: "flex",
              gap,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            },
            children: slides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "div",
              {
                role: "group",
                "aria-roledescription": "slide",
                "aria-label": `Slide ${i + 1} of ${slides.length}`,
                style: {
                  flex: `0 0 ${slideWidth}`,
                  scrollSnapAlign: "start",
                  scrollSnapStop: "always"
                },
                children: slide
              },
              i
            ))
          }
        ),
        showArrows && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ArrowButton, { side: "left", onClick: prev, disabled: active === 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ArrowButton, { side: "right", onClick: next, disabled: active === slides.length - 1 })
        ] }),
        showDots && slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginTop: 12
            },
            children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "button",
              {
                type: "button",
                "aria-label": `Go to slide ${i + 1}`,
                "aria-current": i === active ? "true" : void 0,
                onClick: () => goTo(i),
                style: {
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  background: i === active ? COLORS.green[600] : COLORS.surface.border,
                  cursor: "pointer",
                  transition: "background-color 140ms ease"
                }
              },
              i
            ))
          }
        )
      ]
    }
  );
}
function ArrowButton({
  side,
  onClick,
  disabled
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "button",
    {
      type: "button",
      "aria-label": side === "left" ? "Previous slide" : "Next slide",
      disabled,
      onClick,
      style: {
        position: "absolute",
        top: "50%",
        [side]: 8,
        transform: "translateY(-50%)",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(15,23,42,0.7)",
        color: "#fff",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        fontSize: 16,
        lineHeight: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        transition: "opacity 120ms ease, background-color 120ms ease"
      },
      children: side === "left" ? "\u2039" : "\u203A"
    }
  );
}

// src/components/Chart.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function Chart({
  title,
  description,
  toolbar,
  legend,
  children,
  loading,
  empty,
  height = 240,
  className,
  style
}) {
  const showEmpty = !loading && !children && empty;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "div",
    {
      className,
      style: {
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.sm,
        padding: 16,
        fontFamily: TYPE.family.sans,
        ...style
      },
      children: [
        (title || toolbar || description) && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
          "header",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 12
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                  "div",
                  {
                    style: {
                      fontSize: TYPE.size.h3,
                      fontWeight: TYPE.weight.semibold,
                      color: COLORS.ink[1],
                      letterSpacing: "-0.1px"
                    },
                    children: title
                  }
                ),
                description && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                  "div",
                  {
                    style: {
                      fontSize: TYPE.size.small,
                      color: COLORS.ink[3],
                      marginTop: 2
                    },
                    children: description
                  }
                )
              ] }),
              toolbar && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { style: { flexShrink: 0, display: "flex", alignItems: "center" }, children: toolbar })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { style: { height, position: "relative" }, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Skeleton, { width: "100%", height }) : showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "div",
          {
            style: {
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: TYPE.size.small,
              color: COLORS.ink[3]
            },
            children: empty
          }
        ) : children }),
        legend && legend.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "div",
          {
            style: {
              marginTop: 12,
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 16px"
            },
            children: legend.map((item) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
              "div",
              {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: TYPE.size.small,
                  color: COLORS.ink[2]
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                    "span",
                    {
                      "aria-hidden": true,
                      style: {
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: item.color ?? COLORS.ink[3],
                        flexShrink: 0
                      }
                    }
                  ),
                  item.label
                ]
              },
              item.id
            ))
          }
        )
      ]
    }
  );
}

// src/components/Button.tsx
var import_react14 = __toESM(require("react"));
var import_jsx_runtime27 = require("react/jsx-runtime");
var sizeMap3 = {
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
var Button = import_react14.default.forwardRef(function Button2({
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
  const [hovered, setHovered] = import_react14.default.useState(false);
  const [pressed, setPressed] = import_react14.default.useState(false);
  const dims = sizeMap3[size];
  const isDisabled = disabled || loading;
  const palette = variantStyle(variant, hovered && !isDisabled, pressed && !isDisabled);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
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
        loading ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Spinner, {}) : leadingIcon,
        children,
        !loading && trailingIcon
      ]
    }
  );
});
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("style", { children: `@keyframes gp-spin { to { transform: rotate(360deg); } }` }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
var import_react15 = __toESM(require("react"));
var import_jsx_runtime28 = require("react/jsx-runtime");
var sizeMap4 = {
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
var IconButton = import_react15.default.forwardRef(function IconButton2({
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
  const [hovered, setHovered] = import_react15.default.useState(false);
  const [pressed, setPressed] = import_react15.default.useState(false);
  const dim = sizeMap4[size];
  const palette = variantStyle2(variant, hovered && !disabled, pressed && !disabled);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
var import_react16 = __toESM(require("react"));
var import_jsx_runtime29 = require("react/jsx-runtime");
var sizeMap5 = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body },
  lg: { height: 40, padX: 14, font: TYPE.size.body }
};
var Input = import_react16.default.forwardRef(function Input2({ inputSize = "md", invalid = false, leadingIcon, trailingIcon, disabled, style, className, ...rest }, ref) {
  const [focused, setFocused] = import_react16.default.useState(false);
  const dims = sizeMap5[inputSize];
  const borderColor = invalid ? "#dc2626" : focused ? COLORS.green[600] : COLORS.surface.border;
  const ringColor = invalid ? "#fecaca" : "#bbf7d0";
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
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
        leadingIcon && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { style: { display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }, children: leadingIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
        trailingIcon && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { style: { display: "inline-flex", color: COLORS.ink[3], flexShrink: 0 }, children: trailingIcon })
      ]
    }
  );
});

// src/components/Select.tsx
var import_react17 = __toESM(require("react"));
var import_jsx_runtime30 = require("react/jsx-runtime");
var sizeMap6 = {
  sm: { height: 28, padX: 10, font: TYPE.size.small },
  md: { height: 36, padX: 12, font: TYPE.size.body },
  lg: { height: 40, padX: 14, font: TYPE.size.body }
};
var Select = import_react17.default.forwardRef(function Select2({ selectSize = "md", invalid = false, options, placeholder, disabled, style, className, ...rest }, ref) {
  const [focused, setFocused] = import_react17.default.useState(false);
  const dims = sizeMap6[selectSize];
  const borderColor = invalid ? "#dc2626" : focused ? COLORS.green[600] : COLORS.surface.border;
  const ringColor = invalid ? "#fecaca" : "#bbf7d0";
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
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
              placeholder && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("option", { value: "", disabled: true, children: placeholder }),
              options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("option", { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("path", { d: "M3 4.5L6 7.5L9 4.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
          }
        )
      ]
    }
  );
});

// src/components/Toggle.tsx
var import_react18 = __toESM(require("react"));
var import_jsx_runtime31 = require("react/jsx-runtime");
var sizeMap7 = {
  sm: { width: 32, height: 18, thumb: 14, pad: 2 },
  md: { width: 40, height: 22, thumb: 18, pad: 2 }
};
var Toggle = import_react18.default.forwardRef(function Toggle2({ checked, onChange, size = "md", disabled, style, className, ...rest }, ref) {
  const dims = sizeMap7[size];
  const trackBg = checked ? COLORS.green[600] : COLORS.surface.border;
  const thumbX = checked ? dims.width - dims.thumb - dims.pad : dims.pad;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
var import_react19 = __toESM(require("react"));
var import_jsx_runtime32 = require("react/jsx-runtime");
function Tabs({ items, value, onChange, className, style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
        return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Tab, { item, active, onSelect: onChange }, item.value);
      })
    }
  );
}
function Tab({ item, active, onSelect }) {
  const [hovered, setHovered] = import_react19.default.useState(false);
  const color = active ? COLORS.ink[1] : hovered ? COLORS.ink[2] : COLORS.ink[3];
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
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
var import_react20 = __toESM(require("react"));
var import_jsx_runtime33 = require("react/jsx-runtime");
var padMap2 = { none: 0, sm: 12, md: 16, lg: 20 };
var Card = Object.assign(
  import_react20.default.forwardRef(function Card2({ variant = "default", padding = "md", style, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      "div",
      {
        ref,
        ...rest,
        style: {
          backgroundColor: COLORS.surface.card,
          border: variant === "flat" ? "none" : `1px solid ${COLORS.surface.border}`,
          borderRadius: RADIUS.lg,
          boxShadow: variant === "flat" ? "none" : SHADOW.sm,
          padding: padMap2[padding],
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { ...rest, style, children });
}
function CardFooter({ children, style, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
var import_react21 = __toESM(require("react"));
var import_jsx_runtime34 = require("react/jsx-runtime");
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
var StatCard = import_react21.default.forwardRef(function StatCard2({ label, value, delta, deltaTone = "neutral", icon, accent = "neutral", style, ...rest }, ref) {
  const tone = accentMap[accent];
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
          delta && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
        icon && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
var import_react22 = __toESM(require("react"));
var import_jsx_runtime35 = require("react/jsx-runtime");
function TableRoot({ style, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    "div",
    {
      style: {
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("tbody", { ...rest, style, children });
}
function TableRow({ interactive, style, onMouseEnter, onMouseLeave, children, ...rest }) {
  const [hovered, setHovered] = import_react22.default.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        children,
        sortable && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(SortGlyph, { direction: sortDirection })
      ] })
    }
  );
}
function SortGlyph({ direction }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("svg", { width: "8", height: "5", viewBox: "0 0 8 5", fill: "none", style: { opacity: direction === "desc" ? 0.3 : 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("path", { d: "M1 4L4 1L7 4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("svg", { width: "8", height: "5", viewBox: "0 0 8 5", fill: "none", style: { opacity: direction === "asc" ? 0.3 : 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("path", { d: "M1 1L4 4L7 1", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }) })
      ]
    }
  );
}
function TableCell({ align = "left", truncate, style, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var import_jsx_runtime36 = require("react/jsx-runtime");
function FilterBar({ filters, actions, bare = false, style, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
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
        filters && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }, children: filters }),
        children,
        actions && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { style: { display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }, children: actions })
      ]
    }
  );
}

// src/components/Modal.tsx
var import_react23 = __toESM(require("react"));
var import_react_dom5 = require("react-dom");
var import_jsx_runtime37 = require("react/jsx-runtime");
var sizeMap8 = { sm: 400, md: 560, lg: 760 };
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
  import_react23.default.useEffect(() => {
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
  return (0, import_react_dom5.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
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
              maxWidth: sizeMap8[size],
              maxHeight: "calc(100vh - 32px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: TYPE.family.sans
            },
            children: [
              (title || description) && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { style: { padding: "16px 20px", borderBottom: `1px solid ${COLORS.surface.borderSoft}` }, children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
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
                description && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("p", { style: { margin: "4px 0 0", fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { style: { padding: "16px 20px", overflowY: "auto", color: COLORS.ink[1], fontSize: TYPE.size.body }, children }),
              footer && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
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
var import_react24 = __toESM(require("react"));
var import_jsx_runtime38 = require("react/jsx-runtime");
var toneMap = {
  success: { bg: COLORS.green[100], fg: COLORS.green[700], icon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(CheckCircle, {}) },
  error: { bg: "#fee2e2", fg: "#b91c1c", icon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(XCircle, {}) },
  info: { bg: COLORS.accent.blue.bg, fg: COLORS.accent.blue.fg, icon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(InfoCircle, {}) },
  warning: { bg: COLORS.accent.orange.bg, fg: COLORS.accent.orange.fg, icon: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(AlertCircle, {}) }
};
var Toast = import_react24.default.forwardRef(function Toast2({ tone = "info", title, description, onClose, action, style, children, ...rest }, ref) {
  const palette = toneMap[tone];
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { style: { fontSize: TYPE.size.body, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }, children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { style: { marginTop: title ? 2 : 0, fontSize: TYPE.size.small, color: COLORS.ink[2] }, children: description }),
          children,
          action && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { style: { marginTop: 8 }, children: action })
        ] }),
        onClose && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M3 3L11 11M11 3L3 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        )
      ]
    }
  );
});
function CheckCircle() {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M4 8.5L7 11L12 5.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function XCircle() {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M3 3L11 11M11 3L3 11", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
function InfoCircle() {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M7 6V10M7 4H7.01", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
function AlertCircle() {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M7 4V8M7 11H7.01", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}

// src/components/FormField.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
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
        label && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
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
              required && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { "aria-hidden": true, style: { color: "#dc2626", marginLeft: 4 }, children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }, children: [
          children,
          error ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: TYPE.size.small, color: "#dc2626" }, children: error }) : helperText ? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { style: { fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: helperText }) : null
        ] })
      ]
    }
  );
}

// src/components/KPIBar.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var valueColor = (tone) => {
  if (tone === "positive") return COLORS.green[700];
  if (tone === "negative") return "#b91c1c";
  return COLORS.ink[1];
};
function KPIBar({ items, orientation = "horizontal", dividers = true, style, ...rest }) {
  const isVertical = orientation === "vertical";
  const dividerStyle = isVertical ? `1px solid ${COLORS.surface.borderSoft}` : `1px solid ${COLORS.surface.borderSoft}`;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
        return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
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
              item.hint && !isVertical && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { style: { fontSize: TYPE.size.small, color: COLORS.ink[3] }, children: item.hint })
            ]
          },
          i
        );
      })
    }
  );
}

// src/components/DiamondField.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet", style: { width: "100%", height: "100%", display: "block" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("rect", { x: "0", y: "0", width: "100", height: "100", rx: "6", fill: "#e8f5ec" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", { d: "M 8 92 Q 50 -8 92 92 Z", fill: "#c9e7d3" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("polygon", { points: "50,30 70,60 50,90 30,60", fill: "#e8c89a" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("line", { x1: "50", y1: "90", x2: "70", y2: "60", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("line", { x1: "70", y1: "60", x2: "50", y2: "30", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("line", { x1: "50", y1: "30", x2: "30", y2: "60", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("line", { x1: "30", y1: "60", x2: "50", y2: "90", stroke: "#ffffff", strokeWidth: "0.6" }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("circle", { cx: "50", cy: "60", r: "4", fill: "#d4b380" })
        ] }),
        ALL_POSITIONS.map((pos) => {
          const layout = POSITION_LAYOUT[pos];
          const player = positions[pos];
          const isSelected = selected === pos;
          return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
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
        player?.name && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  Alert,
  AppIcon,
  AppLauncher,
  AppSwitcher,
  Button,
  COLORS,
  Card,
  Carousel,
  Chart,
  CompactCard,
  ConfirmDialog,
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
  Label,
  LogoIcon,
  MobileBottomNav,
  Modal,
  PageHeader,
  Pagination,
  Popover,
  Progress,
  RADIUS,
  SHADOW,
  Select,
  Separator,
  Sheet,
  Sidebar,
  Skeleton,
  StatCard,
  StatusPill,
  TINT,
  TOKENS,
  TYPE,
  Table,
  Tabs,
  Textarea,
  Toast,
  Toggle,
  Tooltip,
  useIsMobile
});
