import { COLORS, RADIUS, SHADOW, TYPE } from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function TokensSection({ id }: { id: string }) {
  return (
    <Section
      id={id}
      title="Tokens"
      description="Single source of truth for color, type, radius, shadow, layout. Change here, ripples everywhere."
    >
      <Example label="Brand">
        <Swatch name="green-50"  color={COLORS.green[50]}  />
        <Swatch name="green-100" color={COLORS.green[100]} />
        <Swatch name="green-600" color={COLORS.green[600]} dark />
        <Swatch name="green-700" color={COLORS.green[700]} dark />
      </Example>

      <Example label="Navy / dark surfaces">
        <Swatch name="navy.base"    color={COLORS.navy.base}    dark />
        <Swatch name="navy.surface" color={COLORS.navy.surface} dark />
        <Swatch name="navy.raised"  color={COLORS.navy.raised}  dark />
        <Swatch name="navy.line"    color={COLORS.navy.line}    dark />
      </Example>

      <Example label="Ink (light-surface text)">
        <Swatch name="ink.1" color={COLORS.ink[1]} dark />
        <Swatch name="ink.2" color={COLORS.ink[2]} dark />
        <Swatch name="ink.3" color={COLORS.ink[3]} />
        <Swatch name="ink.4" color={COLORS.ink[4]} />
      </Example>

      <Example label="Surface">
        <Swatch name="page"       color={COLORS.surface.page}       />
        <Swatch name="card"       color={COLORS.surface.card}       />
        <Swatch name="hover"      color={COLORS.surface.hover}      />
        <Swatch name="border"     color={COLORS.surface.border}     />
        <Swatch name="borderSoft" color={COLORS.surface.borderSoft} />
      </Example>

      <Example label="Type scale">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: TYPE.size.h1, fontWeight: TYPE.weight.bold, letterSpacing: TYPE.letterSpacing.tight }}>h1 28/700/-0.56</span>
          <span style={{ fontSize: TYPE.size.h2, fontWeight: TYPE.weight.semibold }}>h2 20/600</span>
          <span style={{ fontSize: TYPE.size.h3, fontWeight: TYPE.weight.semibold }}>h3 16/600</span>
          <span style={{ fontSize: TYPE.size.body }}>body 14/400</span>
          <span style={{ fontSize: TYPE.size.small, color: COLORS.ink[3] }}>small 13/400 ink-3</span>
          <span style={{ fontSize: TYPE.size.micro, color: COLORS.ink[3], textTransform: "uppercase", letterSpacing: "0.04em" }}>micro 11/600</span>
        </div>
      </Example>

      <Example label="Radius">
        {(Object.entries(RADIUS) as [keyof typeof RADIUS, string][]).map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 60, height: 60, backgroundColor: "#0f172a", borderRadius: v }} />
            <span style={{ fontSize: 11, color: COLORS.ink[3] }}>{k} · {v}</span>
          </div>
        ))}
      </Example>

      <Example label="Shadow">
        {(Object.entries(SHADOW) as [keyof typeof SHADOW, string][]).map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 80, height: 60, backgroundColor: "#fff", boxShadow: v, borderRadius: 8 }} />
            <span style={{ fontSize: 11, color: COLORS.ink[3] }}>{k}</span>
          </div>
        ))}
      </Example>
    </Section>
  );
}

function Swatch({ name, color, dark = false }: { name: string; color: string; dark?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 96 }}>
      <div
        style={{
          width: 80,
          height: 60,
          backgroundColor: color,
          borderRadius: 8,
          border: "1px solid rgba(15,23,42,0.08)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 6,
          fontSize: 9,
          fontWeight: 600,
          color: dark ? "#ffffff" : "#0f172a",
        }}
      >
        {color}
      </div>
      <span style={{ fontSize: 11, color: COLORS.ink[3] }}>{name}</span>
    </div>
  );
}
