/**
 * Tailwind preset that exposes GamePlanr v3 design tokens as utility classes.
 *
 * Consumer apps extend this from their `tailwind.config.{js,ts}`:
 *
 *     import gpPreset from "@gameplanr/ui/tailwind.preset";
 *     export default {
 *       presets: [gpPreset],
 *       content: [...]
 *     };
 */
declare const preset: {
    theme: {
        extend: {
            colors: {
                "gp-green": {
                    50: "#f0fdf4";
                    100: "#dcfce7";
                    600: "#16a34a";
                    700: "#15803d";
                    text: "#166534";
                    DEFAULT: "#16a34a";
                };
                "gp-navy": {
                    DEFAULT: "#0b1220";
                    base: "#0b1220";
                    surface: "#0f172a";
                    raised: "#111a2e";
                    line: "#1e293b";
                    text: "#e2e8f0";
                    "text-dim": "#94a3b8";
                };
                "gp-ink": {
                    1: "#0f172a";
                    2: "#334155";
                    3: "#64748b";
                    4: "#94a3b8";
                };
                "gp-surface": {
                    page: "#f7f8fa";
                    card: "#ffffff";
                    hover: "#f3f4f6";
                    border: "#e5e7eb";
                    "border-soft": "#eef0f3";
                };
            };
            borderRadius: {
                "gp-sm": "6px";
                "gp-md": "8px";
                "gp-lg": "12px";
                "gp-pill": "99px";
            };
            boxShadow: {
                "gp-sm": "0 1px 2px rgba(15,23,42,0.04)";
                "gp-md": "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)";
            };
            width: {
                "gp-sidebar": string;
            };
            fontFamily: {
                sans: string[];
            };
        };
    };
};

export { preset as default };
