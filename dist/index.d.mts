import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type AppId$1 = "calendar" | "lineup" | "field" | "volunteer" | "tournament" | "fundraiser";
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
/**
 * Tint pairs (background + foreground) for app icons in the post-login app
 * launcher and similar surfaces. Each app maps to one tint name; the consumer
 * looks up TINT[name] for its bg/fg pair.
 */
declare const TINT: {
    readonly purple: {
        readonly bg: "#ede9fe";
        readonly fg: "#6d28d9";
    };
    readonly blue: {
        readonly bg: "#dbeafe";
        readonly fg: "#1d4ed8";
    };
    readonly orange: {
        readonly bg: "#ffedd5";
        readonly fg: "#c2410c";
    };
    readonly green: {
        readonly bg: "#dcfce7";
        readonly fg: "#166534";
    };
    readonly amber: {
        readonly bg: "#fef3c7";
        readonly fg: "#92400e";
    };
    readonly slate: {
        readonly bg: "#f3f4f6";
        readonly fg: "#334155";
    };
};
type TintName = keyof typeof TINT;
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
    readonly TINT: {
        readonly purple: {
            readonly bg: "#ede9fe";
            readonly fg: "#6d28d9";
        };
        readonly blue: {
            readonly bg: "#dbeafe";
            readonly fg: "#1d4ed8";
        };
        readonly orange: {
            readonly bg: "#ffedd5";
            readonly fg: "#c2410c";
        };
        readonly green: {
            readonly bg: "#dcfce7";
            readonly fg: "#166534";
        };
        readonly amber: {
            readonly bg: "#fef3c7";
            readonly fg: "#92400e";
        };
        readonly slate: {
            readonly bg: "#f3f4f6";
            readonly fg: "#334155";
        };
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

/** Names of icons known to <AppIcon />. */
type AppIconName = "trophy" | "pitch" | "baseball" | "calendar" | "megaphone" | "clipboard" | "fundraise" | "grid" | "arrow-right" | "plus" | "check" | "bell" | "lock" | "sparkle" | "search" | "chevron-down" | "external";
interface AppIconProps extends React.SVGAttributes<SVGSVGElement> {
    name: AppIconName;
    /** Pixel size of the icon (square). Defaults to 22. */
    size?: number;
    /** Stroke color. Defaults to currentColor. */
    stroke?: string;
    /** Stroke width. Defaults to 1.75. */
    strokeWidth?: number;
}
/**
 * Hand-drawn 24×24 stroke icon set used by <AppLauncher /> and friends.
 * Every icon is a plain SVG with rounded caps/joins so they sit cleanly inside
 * tinted icon tiles. Pass `size`, `stroke`, `strokeWidth` to override.
 */
declare function AppIcon({ name, size, stroke, strokeWidth, ...rest }: AppIconProps): react_jsx_runtime.JSX.Element;

/**
 * One app's data as rendered by <AppLauncher />.
 *
 * `status='live'` apps either appear in the "Your apps" hero/grid (when
 * `activated`) or in the "Available to activate" slot (when not). `status='soon'`
 * apps appear in the grid with a "Notify me" / "We'll notify you" footer.
 */
interface AppLauncherApp {
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
    activity?: {
        label: string;
        sub: string;
    } | null;
    /** ETA copy for soon apps, e.g. "Summer 2026". */
    eta?: string;
}
interface AppLauncherUser {
    email: string;
    /** 1-2 letter avatar initials. */
    initials: string;
}
interface AppLauncherProps {
    apps: AppLauncherApp[];
    /** Which app starts in the hero slot. Defaults to the first activated live app. */
    featuredId?: string;
    user: AppLauncherUser;
    greeting?: {
        title: string;
        subtitle?: string;
    };
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
declare function AppLauncher({ apps, featuredId: initialFeaturedId, user, greeting, notified, onActivate, onNotifyToggle, onContinue, onManageAccount, }: AppLauncherProps): react_jsx_runtime.JSX.Element;
interface AppLauncherHeroProps {
    app: AppLauncherApp;
    onContinue?: () => void;
}
declare function FeaturedHero({ app, onContinue }: AppLauncherHeroProps): react_jsx_runtime.JSX.Element;
interface AppLauncherCardProps {
    app: AppLauncherApp;
    notified?: boolean;
    onClick?: () => void;
}
declare function CompactCard({ app, notified, onClick }: AppLauncherCardProps): react_jsx_runtime.JSX.Element;

interface GPWordmarkProps {
    /** Rendered height in pixels. Width auto-scales via SVG viewBox. */
    height?: number;
    /** Color of the "GamePlan" text. */
    color?: string;
    /** Color of the trailing "r" + the sparkle accent. */
    accent?: string;
}
/**
 * "GamePlanr" wordmark. The "GamePlan" portion uses Plus Jakarta Sans bold
 * in a dark ink color; the trailing "r" is rendered in the brand green and
 * followed by a small 4-point sparkle in the same green.
 */
declare function GPWordmark({ height, color, accent, }: GPWordmarkProps): react_jsx_runtime.JSX.Element;
interface GPMarkProps {
    /** Pixel size (square). */
    size?: number;
}
/**
 * Solid green "GP" square mark — the favicon-shaped variant of the wordmark.
 * Used in compact spaces where the full wordmark won't fit.
 */
declare function GPMark({ size }: GPMarkProps): react_jsx_runtime.JSX.Element;

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

interface MobileBottomNavProps {
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
declare function MobileBottomNav({ children, className, style, ariaLabel, }: MobileBottomNavProps): react_jsx_runtime.JSX.Element;
declare namespace MobileBottomNav {
    var Item: ({ icon, label, href, onClick, active, badge, }: MobileBottomNavItemProps) => react_jsx_runtime.JSX.Element;
    var Spacer: ({ height, style, }: {
        height?: number;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
}
interface MobileBottomNavItemProps {
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

/**
 * Returns `true` when the viewport is at or below the mobile breakpoint
 * (default 768px). Updates on window resize.
 *
 * Used by `<Sidebar>` consumers to swap to a `<Sheet>` drawer on mobile,
 * by `<MobileBottomNav>` callers to render only on mobile, and by any
 * component that needs to branch on viewport size.
 *
 * SSR-safe: returns `false` on the first render (no `window`), then
 * updates on mount via the effect.
 */
declare function useIsMobile(breakpoint?: number): boolean;

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

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    /**
     * Required for accessibility — describes the action since there's no visible label.
     */
    "aria-label": string;
    children: React.ReactNode;
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    inputSize?: InputSize;
    invalid?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

type SelectSize = "sm" | "md" | "lg";
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    selectSize?: SelectSize;
    invalid?: boolean;
    options: SelectOption[];
    placeholder?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

type ToggleSize = "sm" | "md";
interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: ToggleSize;
    /**
     * Required for accessibility — describes what the toggle controls.
     */
    "aria-label": string;
}
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;

interface TabItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
}
declare function Tabs({ items, value, onChange, className, style }: TabsProps): react_jsx_runtime.JSX.Element;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Use `flat` for nested cards or list items where double-border looks heavy. */
    variant?: "default" | "flat";
    padding?: "none" | "sm" | "md" | "lg";
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
    Header: typeof CardHeader;
    Title: typeof CardTitle;
    Description: typeof CardDescription;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
};
declare function CardHeader({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function CardTitle({ children, style, ...rest }: React.HTMLAttributes<HTMLHeadingElement>): react_jsx_runtime.JSX.Element;
declare function CardDescription({ children, style, ...rest }: React.HTMLAttributes<HTMLParagraphElement>): react_jsx_runtime.JSX.Element;
declare function CardBody({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function CardFooter({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

type StatAccent = "green" | "blue" | "orange" | "purple" | "neutral";
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Small text below value, e.g. "+12% vs last week". */
    delta?: React.ReactNode;
    /** Tone of the delta text — green for positive, red for negative, neutral by default. */
    deltaTone?: "positive" | "negative" | "neutral";
    /** Icon shown in a colored circular badge. */
    icon?: React.ReactNode;
    accent?: StatAccent;
}
declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /** Highlights the row on hover and shows a pointer cursor. Pair with onClick. */
    interactive?: boolean;
}
type TableSortDirection = "asc" | "desc" | null;
interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    sortable?: boolean;
    sortDirection?: TableSortDirection;
    onSort?: () => void;
    align?: "left" | "right" | "center";
}
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: "left" | "right" | "center";
    /** Truncate with ellipsis if content overflows. */
    truncate?: boolean;
}
declare function TableRoot({ style, children, ...rest }: TableProps): react_jsx_runtime.JSX.Element;
declare function TableHeader({ style, children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>): react_jsx_runtime.JSX.Element;
declare function TableBody({ style, children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>): react_jsx_runtime.JSX.Element;
declare function TableRow({ interactive, style, onMouseEnter, onMouseLeave, children, ...rest }: TableRowProps): react_jsx_runtime.JSX.Element;
declare function TableHeaderCell({ sortable, sortDirection, onSort, align, style, children, ...rest }: TableHeaderCellProps): react_jsx_runtime.JSX.Element;
declare function TableCell({ align, truncate, style, children, ...rest }: TableCellProps): react_jsx_runtime.JSX.Element;
declare const Table: typeof TableRoot & {
    Header: typeof TableHeader;
    Body: typeof TableBody;
    Row: typeof TableRow;
    HeaderCell: typeof TableHeaderCell;
    Cell: typeof TableCell;
};

interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Left-side filter controls (Select, Input, DateRange, etc.). */
    filters?: React.ReactNode;
    /** Right-aligned actions (e.g., "+ New Request" Button). */
    actions?: React.ReactNode;
    /** Drop the bottom divider — useful when sitting directly above a Table card. */
    bare?: boolean;
}
/**
 * Horizontal bar that sits above tables and lists. Filters wrap on small viewports;
 * actions stay pinned right.
 */
declare function FilterBar({ filters, actions, bare, style, children, ...rest }: FilterBarProps): react_jsx_runtime.JSX.Element;

type ModalSize = "sm" | "md" | "lg";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Buttons in the footer. If omitted, no footer is rendered. */
    footer?: React.ReactNode;
    size?: ModalSize;
    /** When true, clicking the backdrop closes the modal. Default true. */
    closeOnBackdrop?: boolean;
    children?: React.ReactNode;
}
declare function Modal({ open, onClose, title, description, footer, size, closeOnBackdrop, children, }: ModalProps): React.ReactPortal | null;

type ToastTone = "success" | "error" | "info" | "warning";
interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    tone?: ToastTone;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Renders a close X button. Pair with onClose to dismiss. */
    onClose?: () => void;
    /** Optional inline action (e.g., "Undo" Button). */
    action?: React.ReactNode;
}
declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;

interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    label?: React.ReactNode;
    /** Visually mark required, plus aria. */
    required?: boolean;
    /** Helper text below the input. Hidden when `error` is set. */
    helperText?: React.ReactNode;
    /** Error message below the input. Replaces helperText when present. */
    error?: React.ReactNode;
    /** Wired into the label's htmlFor. Caller still applies it to the input. */
    htmlFor?: string;
    /** Layout: stacked (default) or horizontal (label left, input right). */
    layout?: "stacked" | "horizontal";
}
declare function FormField({ label, required, helperText, error, htmlFor, layout, style, children, ...rest }: FormFieldProps): react_jsx_runtime.JSX.Element;

interface KPIItem {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Optional small line below the value (e.g., "vs last week"). */
    hint?: React.ReactNode;
    /** Override the value tone — useful for highlighting a positive/negative figure. */
    valueTone?: "default" | "positive" | "negative";
}
interface KPIBarProps extends React.HTMLAttributes<HTMLDivElement> {
    items: KPIItem[];
    orientation?: "horizontal" | "vertical";
    /** Show thin dividers between items. Default true. */
    dividers?: boolean;
}
declare function KPIBar({ items, orientation, dividers, style, ...rest }: KPIBarProps): react_jsx_runtime.JSX.Element;

type PositionCode = "P" | "C" | "1B" | "2B" | "3B" | "SS" | "LF" | "CF" | "RF";
interface DiamondPlayer {
    id?: string;
    number?: string | number;
    name?: string;
}
interface DiamondFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Player assigned to each position. Use null for empty/unassigned. */
    positions: Partial<Record<PositionCode, DiamondPlayer | null>>;
    /** Highlights a position (e.g., currently being edited). */
    selected?: PositionCode;
    /** Click handler for a position marker. */
    onPositionClick?: (position: PositionCode) => void;
}
declare function DiamondField({ positions, selected, onPositionClick, style, ...rest }: DiamondFieldProps): react_jsx_runtime.JSX.Element;

export { AppIcon, type AppIconName, type AppIconProps, type AppId, AppLauncher, type AppLauncherApp, type AppLauncherCardProps, type AppLauncherHeroProps, type AppLauncherProps, type AppLauncherUser, AppSwitcher, type AppSwitcherApp, type AppSwitcherProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, COLORS, Card, type CardProps, CompactCard, DiamondField, type DiamondFieldProps, type DiamondPlayer, EmptyState, type EmptyStateProps, FeaturedHero, FilterBar, type FilterBarProps, FontDebugToggle, FormField, type FormFieldProps, GPMark, type GPMarkProps, GPWordmark, type GPWordmarkProps, GamePlanrNav, type GamePlanrNavProps, IconButton, type IconButtonProps, type IconButtonSize, type IconButtonVariant, Input, type InputProps, type InputSize, KPIBar, type KPIBarProps, type KPIItem, LAYOUT, LogoIcon, MobileBottomNav, type MobileBottomNavItemProps, type MobileBottomNavProps, Modal, type ModalProps, type ModalSize, PageHeader, type PageHeaderProps, type PositionCode, RADIUS, SHADOW, Select, type SelectOption, type SelectProps, type SelectSize, Sidebar, type SidebarNavItemProps, type SidebarProps, type StatAccent, StatCard, type StatCardProps, StatusPill, type StatusPillProps, type StatusPillVariant, TINT, TOKENS, TYPE, type TabItem, Table, type TableCellProps, type TableHeaderCellProps, type TableProps, type TableRowProps, type TableSortDirection, Tabs, type TabsProps, type TintName, Toast, type ToastProps, type ToastTone, Toggle, type ToggleProps, type ToggleSize, type Tokens, useIsMobile };
