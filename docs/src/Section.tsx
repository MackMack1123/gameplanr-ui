import React from "react";
import { COLORS } from "@gameplanr/ui";

export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ marginBottom: 56, scrollMarginTop: 24 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{title}</h2>
      {description && (
        <p style={{ margin: "4px 0 20px", color: COLORS.ink[3], fontSize: 14 }}>{description}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
    </section>
  );
}

export function Example({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.ink[3],
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          border: `1px solid ${COLORS.surface.border}`,
          borderRadius: 12,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}
