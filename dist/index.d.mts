import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type AppId$1 = "calendar" | "lineup" | "field" | "volunteer";
interface GamePlanrNavProps {
    /** Which app is currently active (omit for platform-level pages like auth) */
    currentApp?: AppId$1;
    /** User's email to display (optional — hide on login/register) */
    userEmail?: string | null;
    /** Called when the user clicks Sign out */
    onSignOut?: () => void;
}
declare function GamePlanrNav({ currentApp, userEmail, onSignOut }: GamePlanrNavProps): react_jsx_runtime.JSX.Element;

declare function LogoIcon({ size }: {
    size?: number;
}): react_jsx_runtime.JSX.Element;

/**
 * GamePlanr v3 design tokens.
 *
 * Single source of truth for color, type, spacing, radius, and shadow values
 * across Field, Tournament, Volunteer, Calendar (and later Lineup). Components
 * in this lib reference these tokens via inline styles. Consumers that want
 * the same tokens available as Tailwind classes should extend the preset
 * exported from `./tailwind.preset`.
 */
declare const COLORS: {
    readonly green: {
        readonly 50: "#f0fdf4";
        readonly 100: "#dcfce7";
        readonly 600: "#16a34a";
        readonly 700: "#15803d";
        readonly text: "#166534";
    };
    readonly navy: {
        readonly base: "#0b1220";
        readonly surface: "#0f172a";
        readonly raised: "#111a2e";
        readonly line: "#1e293b";
        readonly text: "#e2e8f0";
        readonly textDim: "#94a3b8";
    };
    readonly ink: {
        readonly 1: "#0f172a";
        readonly 2: "#334155";
        readonly 3: "#64748b";
        readonly 4: "#94a3b8";
    };
    readonly surface: {
        readonly page: "#f7f8fa";
        readonly card: "#ffffff";
        readonly hover: "#f3f4f6";
        readonly border: "#e5e7eb";
        readonly borderSoft: "#eef0f3";
    };
    readonly pill: {
        readonly game: {
            readonly bg: "#ede9fe";
            readonly text: "#6d28d9";
        };
        readonly practice: {
            readonly bg: "#dbeafe";
            readonly text: "#1d4ed8";
        };
        readonly tournament: {
            readonly bg: "#ffedd5";
            readonly text: "#c2410c";
        };
        readonly volunteer: {
            readonly bg: "#dcfce7";
            readonly text: "#166534";
        };
        readonly pending: {
            readonly bg: "#fef3c7";
            readonly text: "#92400e";
        };
        readonly approved: {
            readonly bg: "#dcfce7";
            readonly text: "#166534";
        };
        readonly declined: {
            readonly bg: "#fee2e2";
            readonly text: "#b91c1c";
        };
        readonly neutral: {
            readonly bg: "#f3f4f6";
            readonly text: "#334155";
        };
    };
    readonly accent: {
        readonly blue: {
            readonly fg: "#3b82f6";
            readonly bg: "#dbeafe";
        };
        readonly orange: {
            readonly fg: "#f59e0b";
            readonly bg: "#fef3c7";
        };
        readonly purple: {
            readonly fg: "#8b5cf6";
            readonly bg: "#ede9fe";
        };
        readonly red: {
            readonly fg: "#ef4444";
            readonly bg: "#fee2e2";
        };
    };
};
declare const TYPE: {
    readonly family: {
        readonly sans: "var(--font-sans, \"Plus Jakarta Sans\", system-ui, -apple-system, sans-serif)";
    };
    readonly size: {
        readonly h1: "28px";
        readonly h2: "20px";
        readonly h3: "16px";
        readonly body: "14px";
        readonly small: "13px";
        readonly micro: "11px";
    };
    readonly weight: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly letterSpacing: {
        readonly tight: "-0.56px";
        readonly normal: "0";
    };
    readonly lineHeight: {
        readonly tight: 1.2;
        readonly normal: 1.5;
    };
};
declare const RADIUS: {
    readonly sm: "6px";
    readonly md: "8px";
    readonly lg: "12px";
    readonly pill: "99px";
};
declare const SHADOW: {
    readonly sm: "0 1px 2px rgba(15,23,42,0.04)";
    readonly md: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)";
};
declare const LAYOUT: {
    readonly sidebarWidth: 248;
    readonly sidebarPadding: 16;
};
declare const TOKENS: {
    readonly COLORS: {
        readonly green: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 600: "#16a34a";
            readonly 700: "#15803d";
            readonly text: "#166534";
        };
        readonly navy: {
            readonly base: "#0b1220";
            readonly surface: "#0f172a";
            readonly raised: "#111a2e";
            readonly line: "#1e293b";
            readonly text: "#e2e8f0";
            readonly textDim: "#94a3b8";
        };
        readonly ink: {
            readonly 1: "#0f172a";
            readonly 2: "#334155";
            readonly 3: "#64748b";
            readonly 4: "#94a3b8";
        };
        readonly surface: {
            readonly page: "#f7f8fa";
            readonly card: "#ffffff";
            readonly hover: "#f3f4f6";
            readonly border: "#e5e7eb";
            readonly borderSoft: "#eef0f3";
        };
        readonly pill: {
            readonly game: {
                readonly bg: "#ede9fe";
                readonly text: "#6d28d9";
            };
            readonly practice: {
                readonly bg: "#dbeafe";
                readonly text: "#1d4ed8";
            };
            readonly tournament: {
                readonly bg: "#ffedd5";
                readonly text: "#c2410c";
            };
            readonly volunteer: {
                readonly bg: "#dcfce7";
                readonly text: "#166534";
            };
            readonly pending: {
                readonly bg: "#fef3c7";
                readonly text: "#92400e";
            };
            readonly approved: {
                readonly bg: "#dcfce7";
                readonly text: "#166534";
            };
            readonly declined: {
                readonly bg: "#fee2e2";
                readonly text: "#b91c1c";
            };
            readonly neutral: {
                readonly bg: "#f3f4f6";
                readonly text: "#334155";
            };
        };
        readonly accent: {
            readonly blue: {
                readonly fg: "#3b82f6";
                readonly bg: "#dbeafe";
            };
            readonly orange: {
                readonly fg: "#f59e0b";
                readonly bg: "#fef3c7";
            };
            readonly purple: {
                readonly fg: "#8b5cf6";
                readonly bg: "#ede9fe";
            };
            readonly red: {
                readonly fg: "#ef4444";
                readonly bg: "#fee2e2";
            };
        };
    };
    readonly TYPE: {
        readonly family: {
            readonly sans: "var(--font-sans, \"Plus Jakarta Sans\", system-ui, -apple-system, sans-serif)";
        };
        readonly size: {
            readonly h1: "28px";
            readonly h2: "20px";
            readonly h3: "16px";
            readonly body: "14px";
            readonly small: "13px";
            readonly micro: "11px";
        };
        readonly weight: {
            readonly regular: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly letterSpacing: {
            readonly tight: "-0.56px";
            readonly normal: "0";
        };
        readonly lineHeight: {
            readonly tight: 1.2;
            readonly normal: 1.5;
        };
    };
    readonly RADIUS: {
        readonly sm: "6px";
        readonly md: "8px";
        readonly lg: "12px";
        readonly pill: "99px";
    };
    readonly SHADOW: {
        readonly sm: "0 1px 2px rgba(15,23,42,0.04)";
        readonly md: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)";
    };
    readonly LAYOUT: {
        readonly sidebarWidth: 248;
        readonly sidebarPadding: 16;
    };
};
type Tokens = typeof TOKENS;

type StatusPillVariant = "game" | "practice" | "tournament" | "volunteer" | "pending" | "approved" | "declined" | "neutral";
interface StatusPillProps {
    variant: StatusPillVariant;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare function StatusPill({ variant, children, className, style }: StatusPillProps): react_jsx_runtime.JSX.Element;

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    /** Right-aligned action area — typically Filter group + primary CTA button. */
    actions?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Standard page header. Sits at the top of every admin page surface, replaces
 * any per-page top bar.
 */
declare function PageHeader({ title, subtitle, actions, className, style }: PageHeaderProps): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    /** Main illustration / icon area. Consumer supplies whatever artwork. */
    icon?: React.ReactNode;
    title: string;
    description?: string;
    /** Primary call-to-action — typically a button. */
    action?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Centered empty state for "no items found" scenarios. Pattern matches the
 * scheduling-requests reference: illustration, title, helper line, optional
 * primary CTA below.
 */
declare function EmptyState({ icon, title, description, action, className, style }: EmptyStateProps): react_jsx_runtime.JSX.Element;

/**
 * Hidden floating toggle for swapping between Plus Jakarta Sans and Inter
 * during the v3 design rollout. Renders only when the URL contains
 * `?font-debug=1`. Persists the choice in localStorage and writes
 * `data-font="jakarta"|"inter"` on `<html>`.
 *
 * Apps must:
 *   1. Load both Plus Jakarta Sans and Inter via next/font (or equivalent)
 *      and expose them as CSS variables `--font-jakarta` and `--font-inter`.
 *   2. Define a `--font-sans` rule that selects between them based on the
 *      `data-font` attribute. e.g.:
 *        :root { --font-sans: var(--font-jakarta); }
 *        :root[data-font="inter"] { --font-sans: var(--font-inter); }
 *
 * Once the team locks the font, delete this component and the dual font load.
 */
declare function FontDebugToggle(): react_jsx_runtime.JSX.Element | null;

type AppId = "field" | "calendar" | "tournament" | "volunteer" | "lineup" | "fundraiser";
interface AppSwitcherApp {
    id: AppId;
    name: string;
    href: string;
    /** Single-character or short letter for the avatar tile (e.g. "F" for Field). */
    short: string;
    /** Accent color for the app's avatar tile. */
    accent: string;
}
interface AppSwitcherProps {
    /** Apps available to switch to, including the current one. */
    apps: AppSwitcherApp[];
    /** Which app is currently active. */
    currentApp: AppId;
}
/**
 * App switcher card — sits inside the Sidebar, below the GamePlanr logo.
 * Shows the active app (icon tile + "App" eyebrow + name) and opens a popover
 * grid of all apps when clicked.
 */
declare function AppSwitcher({ apps, currentApp }: AppSwitcherProps): react_jsx_runtime.JSX.Element | null;

interface SidebarProps {
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
declare function Sidebar({ children, className, style }: SidebarProps): react_jsx_runtime.JSX.Element;
declare namespace Sidebar {
    var Header: ({ children, style }: {
        children: React.ReactNode;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var Section: ({ children, style, }: {
        children: React.ReactNode;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var Nav: ({ children, style }: {
        children: React.ReactNode;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var NavItem: ({ icon, label, href, onClick, active, trailing }: SidebarNavItemProps) => react_jsx_runtime.JSX.Element;
    var Footer: ({ children, style }: {
        children: React.ReactNode;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
}
interface SidebarNavItemProps {
    icon?: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    /** Optional trailing element — typically a count badge or pro-pill. */
    trailing?: React.ReactNode;
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
    loading?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { type AppId, AppSwitcher, type AppSwitcherApp, type AppSwitcherProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, COLORS, EmptyState, type EmptyStateProps, FontDebugToggle, GamePlanrNav, type GamePlanrNavProps, LAYOUT, LogoIcon, PageHeader, type PageHeaderProps, RADIUS, SHADOW, Sidebar, type SidebarNavItemProps, type SidebarProps, StatusPill, type StatusPillProps, type StatusPillVariant, TOKENS, TYPE, type Tokens };
