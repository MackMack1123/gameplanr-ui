"use client";

import React, { useState } from "react";
import { COLORS, RADIUS, SHADOW, TYPE, TINT, type TintName } from "../tokens";
import { AppIcon, type AppIconName } from "./AppIcon";
import { GPWordmark } from "./GPWordmark";

/* ----- Responsive container-query styles ---------------------------------
 * AppLauncher is meant for a 1100px-max-width centered surface, but it can
 * land in narrower containers (mobile webview, embedded preview, narrow
 * window). We use CSS container queries on the root so the layout adapts
 * to the *component's* width rather than the viewport.
 *
 * < 520px (mobile): hero stacks vertically, CTA goes full width, grid is
 *   single-column, page padding tightens.
 * 521–768px (tablet-ish): grid drops to 2 columns; hero stays horizontal.
 * ≥ 769px: original 3-col grid + horizontal hero.
 *
 * Inline styles trump CSS, so the overrides use `!important`. That's
 * defensible here — we want the container-query rules to win unconditionally.
 * ----------------------------------------------------------------------- */

const LAUNCHER_QUERY_CSS = `
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
  .gp-launcher-footer {
    flex-wrap: wrap !important;
  }
  .gp-launcher-footer-btn {
    flex-basis: 100% !important;
    justify-content: flex-end !important;
    margin-top: 4px !important;
    padding: 8px 0 !important;
  }
}
@container gp-launcher (min-width: 521px) and (max-width: 768px) {
  .gp-launcher-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
`;

let launcherStyleInjected = false;
function ensureLauncherStyle() {
  if (typeof document === "undefined" || launcherStyleInjected) return;
  const tag = document.createElement("style");
  tag.setAttribute("data-gp-launcher", "");
  tag.appendChild(document.createTextNode(LAUNCHER_QUERY_CSS));
  document.head.appendChild(tag);
  launcherStyleInjected = true;
}

/**
 * One app's data as rendered by <AppLauncher />.
 *
 * `status='live'` apps either appear in the "Your apps" hero/grid (when
 * `activated`) or in the "Available to activate" slot (when not). `status='soon'`
 * apps appear in the grid with a "Notify me" / "We'll notify you" footer.
 */
export interface AppLauncherApp {
  /** Stable app slug, e.g. "lineup", "tournament". */
  id: string;
  name: string;
  /** Production hostname, e.g. "lineup.gameplanr.co". May be null for soon apps. */
  domain: string | null;
  /** Long-form pitch (currently unused at this density; kept for parity). */
  tagline?: string;
  /** Short pitch, one sentence — shown on cards. */
  short: string;
  /** Icon name from <AppIcon />. */
  icon: AppIconName;
  /** Tint pair name from TOKENS.TINT. */
  tint: TintName;
  status: "live" | "soon";
  /** True if this user has an entitlement / has activated the app. */
  activated: boolean;
  /** True if this app charges (Lineup), so the CTA reads "Start free trial". */
  paid?: boolean;
  /** Display string like "2 days ago" or "Today". */
  lastUsed?: string;
  /** Live activity payload, shown in the hero only if present. */
  activity?: { label: string; sub: string } | null;
  /** ETA copy for soon apps, e.g. "Summer 2026". */
  eta?: string;
}

export interface AppLauncherUser {
  email: string;
  /** 1-2 letter avatar initials. */
  initials: string;
}

export interface AppLauncherProps {
  apps: AppLauncherApp[];
  /** Which app starts in the hero slot. Defaults to the first activated live app. */
  featuredId?: string;
  user: AppLauncherUser;
  greeting?: { title: string; subtitle?: string };
  /** Map of appId → notified flag for soon-app subscriptions. */
  notified?: Record<string, boolean>;
  /** Click handler for an activate-and-promote action on a live, unactivated card. */
  onActivate?: (appId: string) => void;
  /** Click handler for a notify-me toggle on a soon card. Should round-trip to server. */
  onNotifyToggle?: (appId: string, willBeNotified: boolean) => void;
  /** Click handler for the hero "Continue <App>" CTA. */
  onContinue?: (appId: string) => void;
  /** Click handler for the account footer "Manage account" link. */
  onManageAccount?: () => void;
}

/**
 * Post-login GamePlanr app launcher: a featured "Continue where you left off"
 * hero plus a compact grid of every other app the user can switch to.
 *
 * The component manages local UI state (which app is in the hero, hover) and
 * emits callbacks for activate/notify/continue/manage-account. Persistent
 * state (entitlements, notify subscriptions, lastUsed timestamps) flows in
 * via props and should round-trip through the consumer's server.
 */
export function AppLauncher({
  apps,
  featuredId: initialFeaturedId,
  user,
  greeting = { title: "Where to next?", subtitle: "One login, every play." },
  notified = {},
  onActivate,
  onNotifyToggle,
  onContinue,
  onManageAccount,
}: AppLauncherProps) {
  const defaultFeatured =
    initialFeaturedId ??
    apps.find((a) => a.activated && a.status === "live")?.id ??
    apps.find((a) => a.status === "live")?.id ??
    apps[0]?.id;

  ensureLauncherStyle();
  const [featuredId, setFeaturedId] = useState<string | undefined>(defaultFeatured);
  const featured = apps.find((a) => a.id === featuredId);
  const others = apps.filter((a) => a.id !== featuredId);

  return (
    <div
      className="gp-launcher-root"
      style={{
        width: "100%",
        minHeight: "100%",
        background: COLORS.surface.page,
        fontFamily: TYPE.family.sans,
      }}
    >
      <TopStrip user={user} />

      <div
        className="gp-launcher-inner"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 56px" }}
      >
        <Greeting title={greeting.title} subtitle={greeting.subtitle} />

        {featured && (
          <FeaturedHero
            app={featured}
            onContinue={() => onContinue?.(featured.id)}
          />
        )}

        <div
          style={{
            marginTop: 36,
            marginBottom: 16,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 13,
              color: COLORS.ink[3],
              fontWeight: TYPE.weight.semibold,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            Switch to another app
          </h2>
          <span style={{ fontSize: 13, color: COLORS.ink[4] }}>{others.length} apps</span>
        </div>

        <div
          className="gp-launcher-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
        >
          {others.map((app) => (
            <CompactCard
              key={app.id}
              app={app}
              notified={!!notified[app.id]}
              onClick={() => {
                if (app.status === "soon") {
                  onNotifyToggle?.(app.id, !notified[app.id]);
                  return;
                }
                if (!app.activated) {
                  onActivate?.(app.id);
                }
                setFeaturedId(app.id);
              }}
            />
          ))}
        </div>

        <Footer onManageAccount={onManageAccount} />
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Top strip
// -------------------------------------------------------------------
function TopStrip({ user }: { user: AppLauncherUser }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${COLORS.surface.border}`,
        background: COLORS.surface.card,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <GPWordmark height={20} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: COLORS.ink[3] }}>{user.email}</span>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
              background: COLORS.accent.blue.bg,
              color: COLORS.accent.blue.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {user.initials}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Greeting
// -------------------------------------------------------------------
function Greeting({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1
        className="gp-launcher-greeting-h1"
        style={{
          margin: 0,
          fontSize: 32,
          lineHeight: 1.15,
          marginBottom: 4,
          fontWeight: TYPE.weight.bold,
          letterSpacing: "-0.56px",
          color: COLORS.ink[1],
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: COLORS.ink[3] }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// -------------------------------------------------------------------
// FeaturedHero — the big dark navy "Continue where you left off" card
// -------------------------------------------------------------------
export interface AppLauncherHeroProps {
  app: AppLauncherApp;
  onContinue?: () => void;
}

export function FeaturedHero({ app, onContinue }: AppLauncherHeroProps) {
  const tint = TINT[app.tint];
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onContinue?.();
      }}
      className="gp-launcher-hero"
      style={{
        display: "block",
        background: "linear-gradient(135deg, #0f172a 0%, #111a2e 60%, #0b1220 100%)",
        borderRadius: 16,
        padding: 28,
        color: "#fff",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        boxShadow: SHADOW.md,
        cursor: "pointer",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -40,
          top: -40,
          width: 260,
          height: 260,
          borderRadius: 99,
          background: `radial-gradient(circle, ${tint.fg}22 0%, transparent 65%)`,
        }}
      />
      <div aria-hidden style={{ position: "absolute", right: 60, top: 24, opacity: 0.3 }}>
        <AppIcon name="sparkle" size={14} stroke="#22c55e" />
      </div>

      <div
        className="gp-launcher-hero-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: TYPE.weight.semibold,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#22c55e",
              marginBottom: 14,
            }}
          >
            Continue where you left off
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: tint.bg,
                color: tint.fg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 16px ${tint.fg}55`,
                flexShrink: 0,
              }}
            >
              <AppIcon name={app.icon} size={28} strokeWidth={2} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: TYPE.weight.bold,
                  letterSpacing: "-0.6px",
                  color: "#fff",
                }}
              >
                {app.name}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: COLORS.navy.textDim }}>{app.short}</p>
            </div>
          </div>

          {app.activity && (
            <div style={{ paddingTop: 8 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: COLORS.navy.textDim,
                  fontWeight: TYPE.weight.semibold,
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 6,
                }}
              >
                Live now
              </p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: TYPE.weight.bold, color: "#fff" }}>
                {app.activity.label}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: COLORS.navy.textDim }}>
                {app.activity.sub}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="gp-launcher-hero-cta"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onContinue?.();
          }}
          style={{
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
            flexShrink: 0,
          }}
        >
          Continue {app.name}
          <AppIcon name="arrow-right" size={16} />
        </button>
      </div>
    </a>
  );
}

// -------------------------------------------------------------------
// CompactCard — one cell of the 3-col grid
// -------------------------------------------------------------------
export interface AppLauncherCardProps {
  app: AppLauncherApp;
  notified?: boolean;
  onClick?: () => void;
}

export function CompactCard({ app, notified = false, onClick }: AppLauncherCardProps) {
  const [hover, setHover] = useState(false);
  const tint = TINT[app.tint];
  const isSoon = app.status === "soon";
  const isPaidTrial = app.status === "live" && !app.activated && app.paid;

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
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
        fontFamily: TYPE.family.sans,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 9,
          background: isSoon ? TINT.slate.bg : tint.bg,
          color: isSoon ? COLORS.ink[4] : tint.fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          filter: isSoon ? "saturate(0.4)" : "none",
        }}
      >
        <AppIcon name={app.icon} size={19} strokeWidth={1.9} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: TYPE.weight.bold,
              letterSpacing: "-0.1px",
              color: isSoon ? COLORS.ink[2] : COLORS.ink[1],
            }}
          >
            {app.name}
          </p>
          {!isSoon && app.activated && (
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                borderRadius: 99,
                background: COLORS.green[600],
              }}
            />
          )}
        </div>
        <p style={{ margin: 0, fontSize: 12.5, color: COLORS.ink[3], lineHeight: 1.4 }}>
          {app.short}
        </p>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 20,
          }}
        >
          {isSoon ? (
            notified ? (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: TYPE.weight.semibold,
                  color: COLORS.green.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AppIcon name="check" size={11} strokeWidth={2.5} /> We'll notify you
              </span>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: TYPE.weight.semibold,
                  color: TINT.amber.fg,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AppIcon name="bell" size={11} /> Notify me{app.eta ? ` · ${app.eta}` : ""}
              </span>
            )
          ) : app.activated ? (
            <span
              style={{
                fontSize: 11,
                fontWeight: TYPE.weight.semibold,
                color: COLORS.ink[3],
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              {app.lastUsed || "Active"}
            </span>
          ) : isPaidTrial ? (
            <span
              style={{
                fontSize: 11,
                fontWeight: TYPE.weight.semibold,
                color: COLORS.green[600],
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AppIcon name="sparkle" size={11} strokeWidth={2.4} /> Start free trial
            </span>
          ) : (
            <span
              style={{
                fontSize: 11,
                fontWeight: TYPE.weight.semibold,
                color: COLORS.green[600],
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AppIcon name="plus" size={11} strokeWidth={2.4} /> Activate
            </span>
          )}
          <AppIcon
            name="arrow-right"
            size={13}
            stroke={hover ? COLORS.green[600] : COLORS.ink[4]}
          />
        </div>
      </div>
    </button>
  );
}

// -------------------------------------------------------------------
// Footer — "One login, every app" account card
// -------------------------------------------------------------------
function Footer({ onManageAccount }: { onManageAccount?: () => void }) {
  return (
    <div
      className="gp-launcher-footer"
      style={{
        marginTop: 32,
        padding: 16,
        borderRadius: RADIUS.lg,
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: TYPE.family.sans,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: COLORS.green[50],
          color: COLORS.green[600],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AppIcon name="sparkle" size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: TYPE.weight.semibold, color: COLORS.ink[1] }}>
          One login, every app
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12.5, color: COLORS.ink[3] }}>
          Activate any GamePlanr app instantly with your existing account.
        </p>
      </div>
      <button
        type="button"
        className="gp-launcher-footer-btn"
        onClick={onManageAccount}
        style={{
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
          borderRadius: RADIUS.sm,
          flexShrink: 0,
        }}
      >
        Manage account
        <AppIcon name="arrow-right" size={13} />
      </button>
    </div>
  );
}
