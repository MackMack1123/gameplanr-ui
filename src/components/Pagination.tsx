"use client";

import React from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  /** Total page count. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many sibling page buttons to render on either side of the current page. */
  siblingCount?: number;
  /** ARIA label for the nav element. Defaults to "Pagination". */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Compact 1-indexed pagination control with first/prev/next/last + sibling
 * buttons and a "…" gap when pages overflow the visible window.
 *
 *   <Pagination page={page} pageCount={42} onPageChange={setPage} />
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  ariaLabel = "Pagination",
  className,
  style,
}: PaginationProps) {
  const pages = computePages(page, pageCount, siblingCount);
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      <NavButton disabled={!canPrev} onClick={() => onPageChange(page - 1)} ariaLabel="Previous page">
        ‹
      </NavButton>
      {pages.map((p, i) =>
        p === "gap" ? (
          <span
            key={`gap-${i}`}
            aria-hidden
            style={{
              padding: "0 6px",
              color: COLORS.ink[3],
              fontSize: TYPE.size.small,
            }}
          >
            …
          </span>
        ) : (
          <PageButton
            key={p}
            page={p}
            current={p === page}
            onClick={() => onPageChange(p)}
          />
        ),
      )}
      <NavButton disabled={!canNext} onClick={() => onPageChange(page + 1)} ariaLabel="Next page">
        ›
      </NavButton>
    </nav>
  );
}

/* internal: page button */
function PageButton({
  page,
  current,
  onClick,
}: {
  page: number;
  current: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      style={{
        minWidth: 32,
        height: 32,
        padding: "0 8px",
        background: current ? COLORS.green[600] : "transparent",
        color: current ? "#fff" : COLORS.ink[1],
        border: current ? "none" : `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.sm,
        fontFamily: TYPE.family.sans,
        fontSize: TYPE.size.small,
        fontWeight: current ? TYPE.weight.semibold : TYPE.weight.medium,
        cursor: "pointer",
        transition: "background-color 120ms ease, color 120ms ease",
      }}
    >
      {page}
    </button>
  );
}

function NavButton({
  disabled,
  onClick,
  ariaLabel,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        minWidth: 32,
        height: 32,
        background: "transparent",
        color: disabled ? COLORS.ink[4] : COLORS.ink[2],
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.sm,
        fontSize: 18,
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

/**
 * Build the page array with gaps. Always includes 1 and pageCount; surrounds
 * `page` with up to `siblingCount` siblings on each side.
 */
function computePages(
  page: number,
  pageCount: number,
  siblingCount: number,
): (number | "gap")[] {
  if (pageCount <= 1) return [1];
  const window = Math.max(0, siblingCount);
  const first = 1;
  const last = pageCount;
  const left = Math.max(page - window, first + 1);
  const right = Math.min(page + window, last - 1);

  const out: (number | "gap")[] = [first];
  if (left > first + 1) out.push("gap");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < last - 1) out.push("gap");
  if (last !== first) out.push(last);
  return out;
}
