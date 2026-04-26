"use client";

import React from "react";
import { COLORS, LAYOUT, RADIUS, TYPE } from "../tokens";

/* ----- Sidebar root + composable parts ------------------------------------ */

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dark navy sidebar. The only chrome on a v3 page — no top bar.
 * Composed via subcomponents:
 *
 *   <Sidebar>
 *     <Sidebar.Header>...</Sidebar.Header>
 *     <Sidebar.Section>          // app switcher slot
 *       <AppSwitcher ... />
 *     </Sidebar.Section>
 *     <Sidebar.Nav>
 *       <Sidebar.NavItem icon={<HomeIcon/>} label="Home" href="/" active />
 *       <Sidebar.NavItem icon={<CalIcon/>}  label="Calendar" href="/calendar" />
 *     </Sidebar.Nav>
 *     <Sidebar.Footer>...</Sidebar.Footer>
 *   </Sidebar>
 */
export function Sidebar({ children, className, style }: SidebarProps) {
  return (
    <aside
      className={className}
      style={{
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
        ...style,
      }}
    >
      {children}
    </aside>
  );
}

/* ----- Header (logo + brand) ---------------------------------------------- */

function Header({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        padding: `${LAYOUT.sidebarPadding}px ${LAYOUT.sidebarPadding}px ${LAYOUT.sidebarPadding}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ----- Section (generic spacing) ----------------------------------------- */

function Section({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        padding: `0 ${LAYOUT.sidebarPadding}px`,
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ----- Nav list ----------------------------------------------------------- */

function Nav({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: `4px ${LAYOUT.sidebarPadding - 4}px`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...style,
      }}
    >
      {children}
    </nav>
  );
}

/* ----- Nav item ---------------------------------------------------------- */

export interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  /** Optional trailing element — typically a count badge or pro-pill. */
  trailing?: React.ReactNode;
}

function NavItem({ icon, label, href, onClick, active, trailing }: SidebarNavItemProps) {
  const baseStyle: React.CSSProperties = {
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
    transition: "background-color 120ms ease, color 120ms ease",
  };
  const iconStyle: React.CSSProperties = {
    display: "inline-flex",
    width: 18,
    height: 18,
    color: active ? COLORS.green[600] : COLORS.navy.textDim,
    flexShrink: 0,
  };
  const inner = (
    <>
      {icon && <span style={iconStyle}>{icon}</span>}
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      {trailing}
    </>
  );

  if (href) {
    return (
      <a href={href} aria-current={active ? "page" : undefined} style={baseStyle}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-current={active ? "page" : undefined} style={baseStyle}>
      {inner}
    </button>
  );
}

/* ----- Footer ------------------------------------------------------------ */

function Footer({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        padding: LAYOUT.sidebarPadding,
        borderTop: `1px solid ${COLORS.navy.line}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ----- compound exports -------------------------------------------------- */

Sidebar.Header = Header;
Sidebar.Section = Section;
Sidebar.Nav = Nav;
Sidebar.NavItem = NavItem;
Sidebar.Footer = Footer;
