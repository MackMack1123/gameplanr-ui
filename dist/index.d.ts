import * as react_jsx_runtime from 'react/jsx-runtime';

type AppId = "calendar" | "lineup" | "field";
interface GamePlanrNavProps {
    /** Which app is currently active (omit for platform-level pages like auth) */
    currentApp?: AppId;
    /** User's email to display (optional — hide on login/register) */
    userEmail?: string | null;
    /** Called when the user clicks Sign out */
    onSignOut?: () => void;
}
declare function GamePlanrNav({ currentApp, userEmail, onSignOut }: GamePlanrNavProps): react_jsx_runtime.JSX.Element;

declare function LogoIcon({ size }: {
    size?: number;
}): react_jsx_runtime.JSX.Element;

export { type AppId, GamePlanrNav, type GamePlanrNavProps, LogoIcon };
