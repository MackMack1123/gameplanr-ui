"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** htmlFor of the associated control. Always pass when standing alone — the label↔input link is what makes click-to-focus work. */
  htmlFor?: string;
  /** Renders a small green asterisk after the label text. */
  required?: boolean;
  /** Optional secondary copy rendered to the right at lower contrast. */
  optional?: React.ReactNode;
}

/**
 * Standalone <label>. Use when a control needs a label but doesn't want the
 * full FormField chrome (description, error, helper). For form rows with
 * description/error, prefer FormField.
 *
 *   <Label htmlFor="email" required>Email</Label>
 *   <Input id="email" />
 */
export function Label({
  htmlFor,
  required,
  optional,
  children,
  style,
  ...rest
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[1],
        lineHeight: 1.4,
        ...style,
      }}
      {...rest}
    >
      <span>{children}</span>
      {required && (
        <span aria-hidden style={{ color: COLORS.green[600], fontWeight: TYPE.weight.bold }}>
          *
        </span>
      )}
      {optional && (
        <span style={{ color: COLORS.ink[3], fontWeight: TYPE.weight.regular, fontSize: TYPE.size.micro }}>
          {optional}
        </span>
      )}
    </label>
  );
}
