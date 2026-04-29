"use client";

import React from "react";
import { COLORS, RADIUS, SHADOW, TYPE } from "../tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use `flat` for nested cards or list items where double-border looks heavy. */
  variant?: "default" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
}

const padMap = { none: 0, sm: 12, md: 16, lg: 20 };

export const Card = Object.assign(
  React.forwardRef<HTMLDivElement, CardProps>(function Card(
    { variant = "default", padding = "md", style, children, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        {...rest}
        style={{
          backgroundColor: COLORS.surface.card,
          border: variant === "flat" ? "none" : `1px solid ${COLORS.surface.border}`,
          borderRadius: RADIUS.lg,
          boxShadow: variant === "flat" ? "none" : SHADOW.sm,
          padding: padMap[padding],
          ...style,
        }}
      >
        {children}
      </div>
    );
  }),
  {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Body: CardBody,
    Footer: CardFooter,
  },
);

function CardHeader({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children, style, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...rest}
      style={{
        margin: 0,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.h3,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[1],
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

function CardDescription({ children, style, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      style={{
        margin: "4px 0 0",
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        color: COLORS.ink[3],
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function CardBody({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} style={style}>
      {children}
    </div>
  );
}

function CardFooter({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        paddingTop: 12,
        marginTop: 12,
        borderTop: `1px solid ${COLORS.surface.borderSoft}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
