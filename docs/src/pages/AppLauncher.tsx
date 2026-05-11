import { useState } from "react";
import {
  AppLauncher,
  COLORS,
  RADIUS,
  TYPE,
  type AppLauncherApp,
} from "@gameplanr/ui";
import { Section, Example } from "../Section";

/**
 * Dedicated docs page for <AppLauncher />.
 *
 * Distinct from <AppSwitcher /> (the in-app sidebar dropdown). Kept on its own
 * page rather than as a Widgets entry because the component has a real prop
 * surface, four entitlement variants worth showing live, and a production
 * design provenance worth referencing.
 */

// ──────────────────────────────────────────────────────────────────────────
// Realistic seed data
//
// Mirrors the Auth handoff (design_handoff_app_switcher/apps.jsx) so this
// docs page reads as the canonical demo. Cover all four entitlement variants:
//   - Activated live           → Tournament / Field / Calendar
//   - Available live (free)    → Volunteer
//   - Available live (paid)    → Lineup
//   - Coming-soon (notify-me)  → Evaluator / Fundraisr
// ──────────────────────────────────────────────────────────────────────────

const APPS: AppLauncherApp[] = [
  {
    id: "tournament",
    name: "Tournament",
    domain: "tournament.gameplanr.co",
    short: "Bracket builder + scorekeeping for the day-of.",
    icon: "trophy",
    tint: "orange",
    status: "live",
    activated: true,
    lastUsed: "Today",
    activity: { label: "Live: Spring Slam 14U", sub: "32 teams · Round of 16" },
  },
  {
    id: "field",
    name: "Field",
    domain: "field.gameplanr.co",
    short: "Field assignments, conflicts, and rain-day shuffle.",
    icon: "pitch",
    tint: "green",
    status: "live",
    activated: true,
    lastUsed: "Yesterday",
  },
  {
    id: "lineup",
    name: "Lineup",
    domain: "lineup.gameplanr.co",
    short: "Drag-drop lineup builder with position-by-inning rotation.",
    icon: "baseball",
    tint: "purple",
    status: "live",
    activated: false,
    paid: true,
  },
  {
    id: "calendar",
    name: "Calendar",
    domain: "calendar.gameplanr.co",
    short: "Pull every event from every app into one place.",
    icon: "calendar",
    tint: "blue",
    status: "live",
    activated: true,
    lastUsed: "2 days ago",
  },
  {
    id: "volunteer",
    name: "Volunteer",
    domain: "volunteer.gameplanr.co",
    short: "Sign-ups, shifts, and reminder emails.",
    icon: "megaphone",
    tint: "green",
    status: "live",
    activated: false,
  },
  {
    id: "evaluator",
    name: "Evaluator",
    domain: null,
    short: "Coach scoring + tryout sheets that actually export.",
    icon: "clipboard",
    tint: "slate",
    status: "soon",
    activated: false,
    eta: "Summer 2026",
  },
  {
    id: "fundraisr",
    name: "Fundraisr",
    domain: null,
    short: "Per-team fundraising pages with payment + pledge tracking.",
    icon: "fundraise",
    tint: "slate",
    status: "soon",
    activated: false,
    eta: "Fall 2026",
  },
];

const EMPTY_USER_APPS: AppLauncherApp[] = APPS.map((a) => ({
  ...a,
  activated: false,
  lastUsed: undefined,
  activity: null,
}));

// ──────────────────────────────────────────────────────────────────────────
// Live demo (full AppLauncher with state)
// ──────────────────────────────────────────────────────────────────────────

function FullDemo() {
  // Mirror the component's own internal state at the docs level so toggles
  // round-trip: notify-me on a soon app flips its footer immediately.
  const [notified, setNotified] = useState<Record<string, boolean>>({});
  const [activatedOverrides, setActivatedOverrides] = useState<
    Record<string, boolean>
  >({});

  const apps = APPS.map((a) =>
    activatedOverrides[a.id] ? { ...a, activated: true, lastUsed: "Just now" } : a,
  );

  return (
    <div
      style={{
        width: "100%",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        background: COLORS.surface.page,
      }}
    >
      <AppLauncher
        apps={apps}
        user={{ email: "jordan@chargers14u.com", initials: "JM" }}
        greeting={{ title: "Where to next, Jordan?", subtitle: "One login, every play." }}
        notified={notified}
        onActivate={(id) =>
          setActivatedOverrides((prev) => ({ ...prev, [id]: true }))
        }
        onNotifyToggle={(id, will) =>
          setNotified((prev) => ({ ...prev, [id]: will }))
        }
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Empty-state demo — brand-new user, no entitlements
// ──────────────────────────────────────────────────────────────────────────

function EmptyStateDemo() {
  const [notified, setNotified] = useState<Record<string, boolean>>({});
  const [activatedOverrides, setActivatedOverrides] = useState<
    Record<string, boolean>
  >({});

  const apps = EMPTY_USER_APPS.map((a) =>
    activatedOverrides[a.id] ? { ...a, activated: true, lastUsed: "Just now" } : a,
  );

  return (
    <div
      style={{
        width: "100%",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        background: COLORS.surface.page,
      }}
    >
      <AppLauncher
        apps={apps}
        user={{ email: "newcoach@example.com", initials: "NC" }}
        greeting={{
          title: "Welcome to GamePlanr",
          subtitle: "Pick an app to get started.",
        }}
        notified={notified}
        onActivate={(id) =>
          setActivatedOverrides((prev) => ({ ...prev, [id]: true }))
        }
        onNotifyToggle={(id, will) =>
          setNotified((prev) => ({ ...prev, [id]: will }))
        }
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Mobile preview — phone-frame container at <760px
// ──────────────────────────────────────────────────────────────────────────

function MobilePreviewDemo() {
  const [notified, setNotified] = useState<Record<string, boolean>>({});
  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 640,
        background: COLORS.surface.page,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 24,
        overflow: "auto",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
      }}
    >
      <AppLauncher
        apps={APPS}
        user={{ email: "jordan@chargers14u.com", initials: "JM" }}
        notified={notified}
        onNotifyToggle={(id, will) =>
          setNotified((prev) => ({ ...prev, [id]: will }))
        }
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Distinction note: AppSwitcher vs AppLauncher
// ──────────────────────────────────────────────────────────────────────────

function DistinctionNote() {
  return (
    <div
      style={{
        background: "#fffaf0",
        border: `1px solid #fde68a`,
        borderRadius: 8,
        padding: 14,
        fontSize: 13,
        color: COLORS.ink[2],
        lineHeight: 1.55,
      }}
    >
      <div style={{ fontWeight: 700, color: COLORS.ink[1], marginBottom: 6 }}>
        Don't confuse with <code>{`<AppSwitcher />`}</code>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li>
          <strong>AppLauncher</strong> — the <em>full-page post-login picker</em> shown after a
          user authenticates on <code>auth.gameplanr.co</code>. Big hero card +
          3-column grid of every app. Designed for the moment of
          "where to next?" before entering any specific app.
        </li>
        <li>
          <strong>AppSwitcher</strong> — the <em>in-app sidebar dropdown</em> that lets a
          user jump between apps without leaving their current workspace. Lives
          in <code>{`<Sidebar.Section>`}</code> at the top of the sidebar.
        </li>
      </ul>
      <div style={{ marginTop: 8, color: COLORS.ink[3], fontSize: 12 }}>
        Same data shape (<code>id</code>, <code>name</code>, <code>icon</code>, <code>tint</code>) but distinct surfaces, distinct components.
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Props tables
// ──────────────────────────────────────────────────────────────────────────

interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

function PropsTable({ title, rows }: { title: string; rows: PropRow[] }) {
  return (
    <div
      style={{
        width: "100%",
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: COLORS.surface.hover,
          borderBottom: `1px solid ${COLORS.surface.border}`,
          fontSize: 12,
          fontWeight: TYPE.weight.semibold,
          color: COLORS.ink[2],
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {title}
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: TYPE.family.sans,
        }}
      >
        <thead>
          <tr style={{ textAlign: "left", fontSize: 11, color: COLORS.ink[3] }}>
            <th style={cellStyle("th")}>Prop</th>
            <th style={cellStyle("th")}>Type</th>
            <th style={cellStyle("th")}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td style={cellStyle("td")}>
                <code style={{ fontWeight: 600, color: COLORS.ink[1] }}>
                  {r.name}
                </code>
                {r.required && (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 10,
                      color: "#b91c1c",
                      fontWeight: 700,
                    }}
                  >
                    required
                  </span>
                )}
              </td>
              <td style={cellStyle("td")}>
                <code style={{ color: COLORS.ink[2], fontSize: 12 }}>{r.type}</code>
              </td>
              <td style={cellStyle("td")}>
                <span style={{ color: COLORS.ink[2], fontSize: 13, lineHeight: 1.5 }}>
                  {r.description}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function cellStyle(kind: "th" | "td"): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
    verticalAlign: "top",
    fontWeight: kind === "th" ? 600 : 400,
    fontSize: kind === "th" ? 11 : 13,
    textTransform: kind === "th" ? "uppercase" : "none",
    letterSpacing: kind === "th" ? "0.04em" : "0",
    color: kind === "th" ? COLORS.ink[3] : COLORS.ink[1],
  };
}

const APP_LAUNCHER_PROPS: PropRow[] = [
  {
    name: "apps",
    type: "AppLauncherApp[]",
    required: true,
    description:
      "Every app this user can see (live + soon, activated + not). Order is preserved in the grid; the featured app is lifted out into the hero.",
  },
  {
    name: "user",
    type: "AppLauncherUser",
    required: true,
    description: "Email + 1–2 letter avatar initials shown in the top strip.",
  },
  {
    name: "featuredId",
    type: "string",
    description:
      "Which app starts in the hero slot. Defaults to the first activated live app, then any live app, then the first app.",
  },
  {
    name: "greeting",
    type: "{ title; subtitle? }",
    description:
      'Defaults to { title: "Where to next?", subtitle: "One login, every play." }. Customize per consumer.',
  },
  {
    name: "notified",
    type: "Record<string, boolean>",
    description:
      "Server-sourced map of soon-app subscriptions. Component reads to render the bell ↔ check footer; consumer flips it via onNotifyToggle.",
  },
  {
    name: "onActivate",
    type: "(appId: string) => void",
    description:
      "Fires when a user clicks an unactivated live app. Run the app's activation flow, then promote the card to the hero on success.",
  },
  {
    name: "onNotifyToggle",
    type: "(appId: string, willBeNotified: boolean) => void",
    description:
      "Fires when a user clicks a soon app. POST to your notify endpoint, then update the notified prop.",
  },
  {
    name: "onContinue",
    type: "(appId: string) => void",
    description:
      "Fires when the user clicks the hero \"Continue <App>\" button. Typically navigates to the app's subdomain.",
  },
  {
    name: "onManageAccount",
    type: "() => void",
    description:
      'Fires when the footer "Manage account" link is clicked.',
  },
];

const FEATURED_HERO_PROPS: PropRow[] = [
  {
    name: "app",
    type: "AppLauncherApp",
    required: true,
    description: "The app to feature. Renders icon, name, short pitch, and (if present) live activity panel.",
  },
  {
    name: "onContinue",
    type: "() => void",
    description: 'Fires when the card or "Continue" button is clicked.',
  },
];

const COMPACT_CARD_PROPS: PropRow[] = [
  {
    name: "app",
    type: "AppLauncherApp",
    required: true,
    description: "The app to render as a grid cell. Footer adapts to the activated/paid/soon state of the app.",
  },
  {
    name: "notified",
    type: "boolean",
    description: "For soon apps, whether this user already has a notify-me subscription.",
  },
  {
    name: "onClick",
    type: "() => void",
    description:
      "Fires on click. AppLauncher composes this into onActivate / onNotifyToggle internally; standalone consumers handle as they like.",
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Design notes — reference back to the Auth repo source
// ──────────────────────────────────────────────────────────────────────────

function DesignNotes() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        padding: 16,
        fontSize: 13,
        color: COLORS.ink[2],
        lineHeight: 1.6,
        width: "100%",
      }}
    >
      <div style={{ fontWeight: 700, color: COLORS.ink[1], marginBottom: 8 }}>
        Design provenance
      </div>
      <p style={{ margin: "0 0 8px" }}>
        AppLauncher is a faithful React port of the high-fidelity prototype in
        the Game-Planr-Auth repo at{" "}
        <code>design_handoff_app_switcher/</code>. The handoff bundle contains:
      </p>
      <ul style={{ margin: "0 0 8px", paddingLeft: 18 }}>
        <li><code>App Switcher - Hero.html</code> — runnable HTML prototype.</li>
        <li><code>v5-hero.jsx</code> — the original hero + grid components.</li>
        <li><code>apps.jsx</code> — the canonical seed app list, AppIcon set, and tint table (now <code>TINT</code> in <code>tokens.ts</code>).</li>
        <li><code>tokens.css</code> — the design-token CSS the rest of the system was reverse-engineered from.</li>
        <li><code>README.md</code> — the high-fidelity spec (pixel-locked dimensions, interaction model, state shape).</li>
      </ul>
      <p style={{ margin: "0 0 8px" }}>
        <strong>Visual fidelity</strong> is locked at high. Final colors, type, spacing,
        hover/active states, and interaction model are intentional. The hero gradient is
        deliberately dark navy; if your auth surface is also dark, switch the hero to
        a lighter elevated treatment so it still pops (this is called out in the original spec).
      </p>
      <p style={{ margin: 0, fontSize: 12, color: COLORS.ink[3] }}>
        Auth currently renders the picker as server-side HTML with inline tokens
        mirroring this component (see <code>src/services/app-launcher-render.ts</code> in
        Game-Planr-Auth main). React-based consumers should import{" "}
        <code>{`<AppLauncher />`}</code> directly to stay in sync; Auth will switch over
        when its render pipeline supports React.
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────────

export function AppLauncherSection({ id }: { id: string }) {
  return (
    <Section
      id={id}
      title="App Launcher"
      description="Post-login picker that lets a user (1) continue into the app they most recently used via a featured hero, and (2) jump to any other GamePlanr app via a compact grid below. Distinct from the in-app AppSwitcher dropdown — see the note below."
    >
      <Example label="Distinction · AppSwitcher vs AppLauncher">
        <DistinctionNote />
      </Example>

      <Example label="Live demo · all four entitlement variants">
        <FullDemo />
      </Example>

      <Example label="Empty state · brand-new user, no entitlements">
        <EmptyStateDemo />
      </Example>

      <Example label="Mobile preview · 360px frame">
        <MobilePreviewDemo />
      </Example>

      <Example label="Props · <AppLauncher>">
        <PropsTable title="AppLauncherProps" rows={APP_LAUNCHER_PROPS} />
      </Example>

      <Example label="Props · <FeaturedHero>">
        <PropsTable title="AppLauncherHeroProps" rows={FEATURED_HERO_PROPS} />
      </Example>

      <Example label="Props · <CompactCard>">
        <PropsTable title="AppLauncherCardProps" rows={COMPACT_CARD_PROPS} />
      </Example>

      <Example label="Design notes · provenance">
        <DesignNotes />
      </Example>
    </Section>
  );
}
