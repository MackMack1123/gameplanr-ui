"use client";

import React from "react";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";
import { Skeleton } from "./Skeleton";

export interface ChartLegendItem {
  /** Stable id (used by React keys). */
  id: string;
  label: React.ReactNode;
  /** Swatch color — falls back to ink-3 if omitted. */
  color?: string;
}

export interface ChartProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Top-right slot — typically a date-range or aggregation toggle. */
  toolbar?: React.ReactNode;
  /** Legend items. Rendered below the chart body when supplied. */
  legend?: ChartLegendItem[];
  /** Body slot — the actual chart renderer (BYO: recharts, chart.js, custom SVG). */
  children?: React.ReactNode;
  /** Render the loading shimmer at the given height instead of children. */
  loading?: boolean;
  /** When provided AND not loading AND no children, render an empty-state node. */
  empty?: React.ReactNode;
  /** Pixel height for the chart body. Default 240. */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Chart container — provides consistent card chrome (title, toolbar, legend,
 * loading + empty states) without coupling to a charting library. Consumers
 * pass the chart renderer of their choice as children:
 *
 *   <Chart title="Sign-ups" toolbar={<RangeSelect/>} legend={[...]}>
 *     <ResponsiveContainer width="100%" height="100%">
 *       <LineChart data={data}>...</LineChart>
 *     </ResponsiveContainer>
 *   </Chart>
 *
 * For loading/empty states, gameplanr-ui handles the chrome — pass `loading`
 * or `empty` and skip children.
 */
export function Chart({
  title,
  description,
  toolbar,
  legend,
  children,
  loading,
  empty,
  height = 240,
  className,
  style,
}: ChartProps) {
  const showEmpty = !loading && !children && empty;

  return (
    <div
      className={className}
      style={{
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        boxShadow: SHADOW.sm,
        padding: 16,
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      {(title || toolbar || description) && (
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div
                style={{
                  fontSize: TYPE.size.h3,
                  fontWeight: TYPE.weight.semibold,
                  color: COLORS.ink[1],
                  letterSpacing: "-0.1px",
                }}
              >
                {title}
              </div>
            )}
            {description && (
              <div
                style={{
                  fontSize: TYPE.size.small,
                  color: COLORS.ink[3],
                  marginTop: 2,
                }}
              >
                {description}
              </div>
            )}
          </div>
          {toolbar && (
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
              {toolbar}
            </div>
          )}
        </header>
      )}

      <div style={{ height, position: "relative" }}>
        {loading ? (
          <Skeleton width="100%" height={height} />
        ) : showEmpty ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: TYPE.size.small,
              color: COLORS.ink[3],
            }}
          >
            {empty}
          </div>
        ) : (
          children
        )}
      </div>

      {legend && legend.length > 0 && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
          }}
        >
          {legend.map((item) => (
            <div
              key={item.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: TYPE.size.small,
                color: COLORS.ink[2],
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: item.color ?? COLORS.ink[3],
                  flexShrink: 0,
                }}
              />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
