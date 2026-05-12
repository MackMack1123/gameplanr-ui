"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

/* ----- root --------------------------------------------------------------- */

export interface MobileBottomNavProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** ARIA label for the nav landmark. Defaults to "Primary mobile navigation". */
  ariaLabel?: string;
}

/**
 * Fixed bottom-bar primary navigation for mobile. Designed to be the
 * canonical mobile-nav pattern in v3 (paired with the sidebar→sheet
 * drawer for secondary/deeper nav).
 *
 * Renders unconditionally — the consumer decides whether to mount it
 * (typically via `useIsMobile()`):
 *
 *   const isMobile = useIsMobile();
 *   return (
 *     <>
 *       {!isMobile && <Sidebar>...</Sidebar>}
 *       <main>...</main>
 *       {isMobile && (
 *         <MobileBottomNav>
 *           <MobileBottomNav.Item icon={<HomeIcon/>} label="Home" href="/" active />
 *           <MobileBottomNav.Item icon={<CalIcon/>}  label="Calendar" href="/cal" />
 *           <MobileBottomNav.Item icon={<TeamIcon/>} label="Teams" href="/teams" />
 *           <MobileBottomNav.Item icon={<MoreIcon/>} label="More" onClick={openSheet} />
 *         </MobileBottomNav>
 *       )}
 *       <MobileBottomNav.Spacer />
 *     </>
 *   );
 *
 * Caps at roughly 5 items for thumb-reachability — overflow goes into a
 * "More" item that opens a Sheet drawer (see `Sidebar` + `useIsMobile`
 * for the drawer pattern). Includes safe-area-inset-bottom padding so
 * the bar clears the iOS home indicator.
 */
export function MobileBottomNav({
  children,
  className,
  style,
  ariaLabel = "Primary mobile navigation",
}: MobileBottomNavProps) {
  return (
    <nav
      className={className}
      aria-label={ariaLabel}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
        // Semi-transparent + backdrop blur gives a native iOS feel over content.
        // Falls back to the solid card color on browsers without backdrop-filter.
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px) saturate(180%)",
        WebkitBackdropFilter: "blur(10px) saturate(180%)",
        borderTop: `1px solid ${COLORS.surface.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      {children}
    </nav>
  );
}

/* ----- item --------------------------------------------------------------- */

export interface MobileBottomNavItemProps {
  /** Icon node — typically 22–24px square. Required for visual clarity. */
  icon: React.ReactNode;
  /** Short label rendered under the icon. Keep to ~10 chars. */
  label: string;
  /** Treat as a link if provided; otherwise a button. */
  href?: string;
  onClick?: () => void;
  /** Marks the item as the current view; receives the active styling. */
  active?: boolean;
  /** Optional small badge/dot rendered top-right of the icon. */
  badge?: React.ReactNode;
}

function Item({
  icon,
  label,
  href,
  onClick,
  active,
  badge,
}: MobileBottomNavItemProps) {
  const baseStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: "8px 6px",
    minHeight: 56, // 48px touch + safe vertical
    // Active item gets a subtle green wash (10% brand green) behind it
    // for a stronger affordance than text-color alone — matches the
    // pattern Calendar landed on locally before adoption.
    background: active ? "rgba(22,163,74,0.10)" : "transparent",
    border: "none",
    borderRadius: RADIUS.sm,
    cursor: "pointer",
    color: active ? COLORS.green[600] : COLORS.ink[3],
    textDecoration: "none",
    fontFamily: TYPE.family.sans,
    fontSize: TYPE.size.micro,
    fontWeight: active ? TYPE.weight.semibold : TYPE.weight.medium,
    lineHeight: 1.1,
    transition: "color 160ms ease, background-color 160ms ease",
    WebkitTapHighlightColor: "transparent",
  };

  const iconWrap: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    color: "inherit",
    // Active icon scales up slightly — small but adds polish, matches
    // the native-app feel users expect from a primary tab bar.
    transform: active ? "scale(1.10)" : "scale(1)",
    transition: "transform 200ms cubic-bezier(.32,.72,0,1)",
  };

  const labelStyle: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  };

  const inner = (
    <>
      <span style={iconWrap}>
        {icon}
        {badge != null && (
          <span
            style={{
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
              lineHeight: 1,
            }}
          >
            {badge}
          </span>
        )}
      </span>
      <span style={labelStyle}>{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        style={baseStyle}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      style={baseStyle}
    >
      {inner}
    </button>
  );
}

/* ----- spacer ------------------------------------------------------------- */

/**
 * Renders an empty block sized to the bottom-nav height + safe-area inset.
 * Drop at the end of `<main>` content so the last row isn't hidden behind
 * the fixed bar.
 *
 * Defaults to 56px + safe-area-inset-bottom; matches `<MobileBottomNav.Item>`
 * minHeight + padding.
 */
function Spacer({
  height = 56,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        height,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        ...style,
      }}
    />
  );
}

/* ----- compound exports --------------------------------------------------- */

MobileBottomNav.Item = Item;
MobileBottomNav.Spacer = Spacer;
