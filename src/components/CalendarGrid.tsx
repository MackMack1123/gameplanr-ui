"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  type Locale,
} from "date-fns";
import { COLORS, RADIUS, TYPE } from "../tokens";

/* -------------------------------------------------------------------------
 * Public types
 * ----------------------------------------------------------------------- */

/** Day of week index: 0 = Sunday, 1 = Monday, …, 6 = Saturday. */
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarDayMeta {
  /** ISO date for this cell. */
  date: Date;
  /** True if this date belongs to a neighbouring month (leading/trailing fill). */
  isOutsideMonth: boolean;
  /** True if this date is today (in the user's local timezone). */
  isToday: boolean;
  /** True if Saturday or Sunday. */
  isWeekend: boolean;
  /** True if this date matches the controlled `selected` prop. */
  isSelected: boolean;
  /** True if this cell currently owns keyboard focus inside the grid. */
  isFocused: boolean;
}

export interface CalendarGridProps {
  /** The month to display. Any date in the target month works. */
  month: Date;
  onMonthChange?: (next: Date) => void;
  /** Currently selected day (controlled). Pure presentation — wire onDayClick to update it. */
  selected?: Date | null;
  onDayClick?: (date: Date, meta: CalendarDayMeta) => void;
  /** First day of the week. 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: WeekStartsOn;
  /** date-fns Locale for weekday + month names. Defaults to en-US. */
  locale?: Locale;
  /** Render the chrome (month label + prev/next + weekday header). Default true. */
  showHeader?: boolean;
  /** Custom per-cell renderer. Receives the date + meta. If omitted, the cell renders the day number. */
  renderDay?: (meta: CalendarDayMeta) => React.ReactNode;
  /** Custom weekday-name renderer. Receives the weekday short label (already localized). */
  renderWeekday?: (label: string, weekdayIndex: number) => React.ReactNode;
  /** Fixed pixel height for each day cell. Default 96. Set lower for compact pickers. */
  cellHeight?: number;
  /** ARIA label for the grid region. Default "Calendar". */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* -------------------------------------------------------------------------
 * Component
 * ----------------------------------------------------------------------- */

/**
 * Month grid (6 weeks × 7 days) with keyboard navigation, optional chrome,
 * and a per-cell renderer slot. Theming via gp-* tokens; consumers do NOT
 * pass className overrides — pass `renderDay` to customize cell content.
 *
 * Keyboard:
 *   - Arrow keys     → move focus by day
 *   - PgUp / PgDn    → previous / next month (focus follows)
 *   - Shift+PgUp/Dn  → previous / next year
 *   - Home / End     → start / end of week
 *   - Enter / Space  → onDayClick on the focused cell
 *
 * A11y:
 *   - Grid uses role="grid" with role="row" + role="gridcell" inside.
 *   - aria-label on each cell with the full date.
 *   - role="status" live region announces month/year on month change.
 *   - aria-selected on the cell matching `selected`.
 *
 * Event-density: use `renderDay` to draw event chips per cell.
 *
 *   <CalendarGrid
 *     month={month}
 *     onMonthChange={setMonth}
 *     selected={selected}
 *     onDayClick={setSelected}
 *     renderDay={({ date }) => (
 *       <>
 *         <DayHeader date={date} />
 *         {eventsFor(date).map((e) => <EventChip key={e.id} event={e} />)}
 *       </>
 *     )}
 *   />
 */
export function CalendarGrid({
  month,
  onMonthChange,
  selected = null,
  onDayClick,
  weekStartsOn = 0,
  locale,
  showHeader = true,
  renderDay,
  renderWeekday,
  cellHeight = 96,
  ariaLabel = "Calendar",
  className,
  style,
}: CalendarGridProps) {
  /* The visible grid: 42 days (6 weeks × 7), with neighbouring-month fill. */
  const weeks = useMemo(() => buildMonthGrid(month, weekStartsOn), [month, weekStartsOn]);

  /* Keyboard focus state — only one cell is in the tab order at a time. */
  const [focusedDate, setFocusedDate] = useState<Date>(() => initialFocus(month, selected));
  const focusedRef = useRef<HTMLDivElement | null>(null);
  /* Indicates the next render should physically focus the cell — true after a
     keyboard-driven move, false on initial mount or external selection changes. */
  const shouldFocusRef = useRef(false);

  /* Keep focusedDate in the visible month. If the consumer flips the month
     externally, snap focus to the same day-of-month (clamped to last day). */
  useEffect(() => {
    if (!isSameMonth(focusedDate, month)) {
      const dom = focusedDate.getDate();
      const last = endOfMonth(month).getDate();
      const clamped = Math.min(dom, last);
      setFocusedDate(new Date(month.getFullYear(), month.getMonth(), clamped));
    }
    // We intentionally only react to month changes here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  /* When a keyboard move requested focus, physically focus the new cell. */
  useEffect(() => {
    if (shouldFocusRef.current && focusedRef.current) {
      focusedRef.current.focus();
      shouldFocusRef.current = false;
    }
  }, [focusedDate]);

  const moveFocus = useCallback(
    (next: Date) => {
      shouldFocusRef.current = true;
      if (!isSameMonth(next, month)) {
        onMonthChange?.(next);
      }
      setFocusedDate(next);
    },
    [month, onMonthChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, cellDate: Date) => {
      let next: Date | null = null;
      switch (e.key) {
        case "ArrowLeft":
          next = addDays(cellDate, -1);
          break;
        case "ArrowRight":
          next = addDays(cellDate, 1);
          break;
        case "ArrowUp":
          next = addDays(cellDate, -7);
          break;
        case "ArrowDown":
          next = addDays(cellDate, 7);
          break;
        case "PageUp":
          next = e.shiftKey ? subMonths(cellDate, 12) : subMonths(cellDate, 1);
          break;
        case "PageDown":
          next = e.shiftKey ? addMonths(cellDate, 12) : addMonths(cellDate, 1);
          break;
        case "Home":
          next = startOfWeek(cellDate, { weekStartsOn });
          break;
        case "End":
          next = endOfWeek(cellDate, { weekStartsOn });
          break;
        case "Enter":
        case " ": {
          const meta = makeMeta(cellDate, month, selected, focusedDate);
          onDayClick?.(cellDate, meta);
          e.preventDefault();
          return;
        }
        default:
          return;
      }
      if (next) {
        e.preventDefault();
        moveFocus(next);
      }
    },
    [moveFocus, month, selected, focusedDate, onDayClick, weekStartsOn],
  );

  const weekdayLabels = useMemo(() => {
    const base = startOfWeek(new Date(2020, 0, 5), { weekStartsOn });
    return Array.from({ length: 7 }, (_, i) =>
      format(addDays(base, i), "EEEEE", locale ? { locale } : undefined),
    );
  }, [weekStartsOn, locale]);

  const monthLabel = useMemo(
    () => format(month, "MMMM yyyy", locale ? { locale } : undefined),
    [month, locale],
  );

  return (
    <div
      className={className}
      style={{
        background: COLORS.surface.card,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.lg,
        overflow: "hidden",
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      {showHeader && (
        <Header
          monthLabel={monthLabel}
          onPrev={() => onMonthChange?.(subMonths(month, 1))}
          onNext={() => onMonthChange?.(addMonths(month, 1))}
          onToday={() => onMonthChange?.(startOfMonth(new Date()))}
        />
      )}

      {/* SR-only live region — announces month/year on every change. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={visuallyHidden}
      >
        {monthLabel}
      </div>

      {/* Weekday row */}
      <div
        role="row"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
          background: COLORS.surface.page,
        }}
      >
        {weekdayLabels.map((label, i) => (
          <div
            key={i}
            role="columnheader"
            aria-label={format(addDays(startOfWeek(new Date(2020, 0, 5), { weekStartsOn }), i), "EEEE", locale ? { locale } : undefined)}
            style={{
              padding: "8px 0",
              textAlign: "center",
              fontSize: TYPE.size.micro,
              fontWeight: TYPE.weight.semibold,
              color: COLORS.ink[3],
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {renderWeekday ? renderWeekday(label, i) : label}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        role="grid"
        aria-label={ariaLabel}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {weeks.flat().map((cellDate, i) => {
          const meta = makeMeta(cellDate, month, selected, focusedDate);
          const isFocused = isSameDay(cellDate, focusedDate);
          return (
            <div
              key={i}
              ref={isFocused ? focusedRef : null}
              role="gridcell"
              aria-label={format(cellDate, "EEEE, MMMM d, yyyy", locale ? { locale } : undefined)}
              aria-selected={meta.isSelected || undefined}
              aria-disabled={meta.isOutsideMonth || undefined}
              tabIndex={isFocused ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, cellDate)}
              onClick={() => {
                setFocusedDate(cellDate);
                onDayClick?.(cellDate, meta);
              }}
              style={{
                minHeight: cellHeight,
                padding: 6,
                borderRight:
                  (i % 7) === 6 ? "none" : `1px solid ${COLORS.surface.borderSoft}`,
                borderBottom:
                  i >= 35 ? "none" : `1px solid ${COLORS.surface.borderSoft}`,
                background: meta.isOutsideMonth
                  ? COLORS.surface.page
                  : meta.isSelected
                    ? "rgba(22,163,74,0.08)"
                    : COLORS.surface.card,
                color: meta.isOutsideMonth ? COLORS.ink[4] : COLORS.ink[1],
                cursor: "pointer",
                outline: "none",
                position: "relative",
                transition: "background-color 120ms ease, box-shadow 120ms ease",
                boxShadow: isFocused ? `inset 0 0 0 2px ${COLORS.green[600]}` : "none",
              }}
            >
              {renderDay ? renderDay(meta) : <DefaultDayLabel meta={meta} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Header (compound — exposed via CalendarGrid.Header for custom chrome)
 * ----------------------------------------------------------------------- */

function Header({
  monthLabel,
  onPrev,
  onNext,
  onToday,
}: {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderBottom: `1px solid ${COLORS.surface.borderSoft}`,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: TYPE.size.h3,
          fontWeight: TYPE.weight.semibold,
          color: COLORS.ink[1],
          letterSpacing: "-0.1px",
        }}
      >
        {monthLabel}
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <NavBtn ariaLabel="Previous month" onClick={onPrev}>‹</NavBtn>
        <button
          type="button"
          onClick={onToday}
          style={{
            height: 28,
            padding: "0 10px",
            background: "transparent",
            color: COLORS.ink[2],
            border: `1px solid ${COLORS.surface.border}`,
            borderRadius: RADIUS.sm,
            fontFamily: TYPE.family.sans,
            fontSize: TYPE.size.small,
            fontWeight: TYPE.weight.semibold,
            cursor: "pointer",
          }}
        >
          Today
        </button>
        <NavBtn ariaLabel="Next month" onClick={onNext}>›</NavBtn>
      </div>
    </div>
  );
}

function NavBtn({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        background: "transparent",
        color: COLORS.ink[2],
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: RADIUS.sm,
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

function DefaultDayLabel({ meta }: { meta: CalendarDayMeta }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        borderRadius: 999,
        fontSize: TYPE.size.small,
        fontWeight: meta.isToday ? TYPE.weight.bold : TYPE.weight.medium,
        background: meta.isToday ? COLORS.green[600] : "transparent",
        color: meta.isToday ? "#fff" : "inherit",
      }}
    >
      {meta.date.getDate()}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Internal helpers
 * ----------------------------------------------------------------------- */

function buildMonthGrid(month: Date, weekStartsOn: WeekStartsOn): Date[][] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn });
  const weeks: Date[][] = [];
  let cursor = start;
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function initialFocus(month: Date, selected: Date | null): Date {
  if (selected && isSameMonth(selected, month)) return selected;
  const now = new Date();
  if (isSameMonth(now, month)) return now;
  return startOfMonth(month);
}

function makeMeta(
  date: Date,
  month: Date,
  selected: Date | null,
  focusedDate: Date,
): CalendarDayMeta {
  const day = date.getDay();
  return {
    date,
    isOutsideMonth: !isSameMonth(date, month),
    isToday: isToday(date),
    isWeekend: day === 0 || day === 6,
    isSelected: !!selected && isSameDay(date, selected),
    isFocused: isSameDay(date, focusedDate),
  };
}

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
