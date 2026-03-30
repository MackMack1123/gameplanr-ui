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
  return /* @__PURE__ */ jsxs2(
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
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsxs2(
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
            /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(
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
              return /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
          userEmail && /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: "#94a3b8" }, children: userEmail }),
          onSignOut && /* @__PURE__ */ jsx2(
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
export {
  GamePlanrNav,
  LogoIcon
};
