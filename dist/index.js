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
  GamePlanrNav: () => GamePlanrNav,
  LogoIcon: () => LogoIcon
});
module.exports = __toCommonJS(index_exports);

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
var APP_LINKS = [
  { label: "GamePlanr Calendar", href: "https://cal.gameplanr.co", id: "calendar" },
  { label: "GamePlanr Lineup", href: "https://lineup.gameplanr.co", id: "lineup" },
  { label: "GamePlanr Field", href: "https://field.gameplanr.co", id: "field" }
];
var APP_META = {
  calendar: {
    name: "Calendar",
    pillBg: "rgba(99,102,241,0.15)",
    pillText: "#818cf8"
  },
  lineup: {
    name: "Lineup Builder",
    pillBg: "rgba(56,189,248,0.15)",
    pillText: "#38bdf8"
  },
  field: {
    name: "Field Management",
    pillBg: "rgba(16,185,129,0.15)",
    pillText: "#34d399"
  }
};
function GamePlanrNav({ currentApp, userEmail, onSignOut }) {
  const meta = currentApp ? APP_META[currentApp] : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "nav",
    {
      "aria-label": "Platform navigation",
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0d1117",
        padding: "0 24px",
        fontFamily: "inherit"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "a",
            {
              href: currentApp ? APP_LINKS.find((a) => a.id === currentApp)?.href || "/" : "/",
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
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "span",
              {
                style: {
                  display: "inline-flex",
                  borderRadius: 9999,
                  backgroundColor: meta.pillBg,
                  padding: "2px 10px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: meta.pillText
                },
                children: meta.name
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "ul",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
              listStyle: "none",
              margin: 0,
              padding: 0
            },
            role: "list",
            children: APP_LINKS.map((app) => {
              const isCurrent = currentApp === app.id;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "a",
                {
                  href: app.href,
                  "aria-current": isCurrent ? "page" : void 0,
                  style: {
                    display: "inline-block",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "background-color 0.15s, color 0.15s",
                    backgroundColor: isCurrent ? "rgba(255,255,255,0.1)" : "transparent",
                    fontWeight: isCurrent ? 500 : 400,
                    color: isCurrent ? "white" : "#94a3b8"
                  },
                  children: app.label
                }
              ) }, app.id);
            })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
          userEmail && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontSize: 14, color: "#94a3b8" }, children: userEmail }),
          onSignOut && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
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
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GamePlanrNav,
  LogoIcon
});
