import { COLORS, LAYOUT } from "@gameplanr/ui";
import { BrandSection } from "./pages/Brand";
import { TokensSection } from "./pages/Tokens";
import { ButtonsSection } from "./pages/Buttons";
import { FormsSection } from "./pages/Forms";
import { LayoutSection } from "./pages/Layout";
import { DataSection } from "./pages/Data";
import { FeedbackSection } from "./pages/Feedback";
import { DomainSection } from "./pages/Domain";
import { ChromeSection } from "./pages/Chrome";
import { WidgetsSection } from "./pages/Widgets";

const sections = [
  { id: "brand",    label: "Brand",      Component: BrandSection },
  { id: "tokens",   label: "Tokens",     Component: TokensSection },
  { id: "buttons",  label: "Buttons",    Component: ButtonsSection },
  { id: "forms",    label: "Forms",      Component: FormsSection },
  { id: "layout",   label: "Layout",     Component: LayoutSection },
  { id: "data",     label: "Data",       Component: DataSection },
  { id: "feedback", label: "Feedback",   Component: FeedbackSection },
  { id: "domain",   label: "Domain",     Component: DomainSection },
  { id: "chrome",   label: "Chrome",     Component: ChromeSection },
  { id: "widgets",  label: "Widgets",    Component: WidgetsSection },
];

export function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <DocsSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: LAYOUT.sidebarWidth,
          padding: "32px 40px 80px",
          maxWidth: 1100,
        }}
      >
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: "-0.5px" }}>
            GamePlanr Design System
          </h1>
          <p style={{ margin: "6px 0 0", color: COLORS.ink[3], fontSize: 14 }}>
            v3 — tokens, components, and the canonical reference for every consumer app.
          </p>
        </header>
        {sections.map(({ id, Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
    </div>
  );
}

function DocsSidebar() {
  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: LAYOUT.sidebarWidth,
        backgroundColor: COLORS.navy.surface,
        color: COLORS.navy.text,
        padding: LAYOUT.sidebarPadding,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            backgroundColor: COLORS.green[600],
            borderRadius: 8,
            fontWeight: 700,
            color: "#fff",
            fontSize: 12,
          }}
        >
          GP
        </div>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Design System</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              color: COLORS.navy.text,
              textDecoration: "none",
              fontSize: 14,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.navy.raised)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {label}
          </a>
        ))}
      </nav>
      <div
        style={{
          marginTop: "auto",
          fontSize: 11,
          color: COLORS.navy.textDim,
          padding: "8px 6px",
        }}
      >
        @gameplanr/ui · v3
      </div>
    </aside>
  );
}
