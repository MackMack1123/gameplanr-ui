"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row on hover and shows a pointer cursor. Pair with onClick. */
  interactive?: boolean;
}
export type TableSortDirection = "asc" | "desc" | null;
export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
  align?: "left" | "right" | "center";
}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right" | "center";
  /** Truncate with ellipsis if content overflows. */
  truncate?: boolean;
}

function TableRoot({ style, children, ...rest }: TableProps) {
  return (
    <div
      style={{
        backgroundColor: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table
          {...rest}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.body,
            color: COLORS.ink[1],
            ...style,
          }}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

function TableHeader({ style, children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...rest}
      style={{
        backgroundColor: COLORS.surface.page,
        borderBottom: `1px solid ${COLORS.surface.border}`,
        ...style,
      }}
    >
      {children}
    </thead>
  );
}

function TableBody({ style, children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody {...rest} style={style}>
      {children}
    </tbody>
  );
}

function TableRow({ interactive, style, onMouseEnter, onMouseLeave, children, ...rest }: TableRowProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <tr
      {...rest}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        backgroundColor: interactive && hovered ? COLORS.surface.hover : "transparent",
        cursor: interactive ? "pointer" : "default",
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
        transition: "background-color 100ms ease",
        ...style,
      }}
    >
      {children}
    </tr>
  );
}

function TableHeaderCell({
  sortable,
  sortDirection = null,
  onSort,
  align = "left",
  style,
  children,
  ...rest
}: TableHeaderCellProps) {
  return (
    <th
      {...rest}
      onClick={sortable ? onSort : rest.onClick}
      style={{
        padding: "10px 14px",
        textAlign: align,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.micro,
        fontWeight: TYPE.weight.semibold,
        color: COLORS.ink[3],
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        cursor: sortable ? "pointer" : "default",
        userSelect: sortable ? "none" : "auto",
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {children}
        {sortable && <SortGlyph direction={sortDirection} />}
      </span>
    </th>
  );
}

function SortGlyph({ direction }: { direction: TableSortDirection }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 1,
        color: direction ? COLORS.ink[2] : COLORS.ink[4],
      }}
    >
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ opacity: direction === "desc" ? 0.3 : 1 }}>
        <path d="M1 4L4 1L7 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ opacity: direction === "asc" ? 0.3 : 1 }}>
        <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function TableCell({ align = "left", truncate, style, children, ...rest }: TableCellProps) {
  return (
    <td
      {...rest}
      style={{
        padding: "12px 14px",
        textAlign: align,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.body,
        color: COLORS.ink[1],
        verticalAlign: "middle",
        ...(truncate
          ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 240 }
          : {}),
        ...style,
      }}
    >
      {children}
    </td>
  );
}

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
