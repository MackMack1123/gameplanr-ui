import React from "react";
import { Table, StatusPill, Pagination, Chart, CalendarGrid, COLORS, TYPE } from "@gameplanr/ui";
import type { CalendarDayMeta } from "@gameplanr/ui";
import { Section, Example } from "../Section";

const ROWS = [
  { id: 1, date: "May 22, 2025", time: "5:30 PM", field: "Westfield Field",   coach: "Coach Johnson",  team: "12U Baseball",    status: "approved" as const },
  { id: 2, date: "May 22, 2025", time: "6:00 PM", field: "Community Field",   coach: "Coach Martinez", team: "14U Baseball",    status: "pending"  as const },
  { id: 3, date: "May 23, 2025", time: "5:30 PM", field: "Westfield Field",   coach: "Coach Smith",    team: "10U Softball",    status: "approved" as const },
  { id: 4, date: "May 24, 2025", time: "5:30 PM", field: "Riverside Park",    coach: "Coach Thompson", team: "16U Baseball",    status: "declined" as const },
  { id: 5, date: "May 25, 2025", time: "5:30 PM", field: "Community Field",   coach: "Coach Brown",    team: "8U Tee Ball",     status: "pending"  as const },
];

export function DataSection({ id }: { id: string }) {
  const [sort, setSort] = React.useState<"asc" | "desc" | null>("asc");
  const [page, setPage] = React.useState(3);
  // CalendarGrid demo state — start in the current month
  const [calMonth, setCalMonth] = React.useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [calSelected, setCalSelected] = React.useState<Date | null>(null);
  return (
    <Section id={id} title="Data" description="Table, Pagination, Chart, CalendarGrid, status pills.">
      <Example label="Table">
        <div style={{ width: "100%" }}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sortable sortDirection={sort} onSort={() => setSort(sort === "asc" ? "desc" : "asc")}>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Field</Table.HeaderCell>
                <Table.HeaderCell>Requested by</Table.HeaderCell>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell align="right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ROWS.map((row) => (
                <Table.Row key={row.id} interactive>
                  <Table.Cell>{row.date}</Table.Cell>
                  <Table.Cell>{row.time}</Table.Cell>
                  <Table.Cell truncate>{row.field}</Table.Cell>
                  <Table.Cell>{row.coach}</Table.Cell>
                  <Table.Cell>{row.team}</Table.Cell>
                  <Table.Cell>
                    <StatusPill variant={row.status}>
                      {row.status[0].toUpperCase() + row.status.slice(1)}
                    </StatusPill>
                  </Table.Cell>
                  <Table.Cell align="right" style={{ color: "#64748b" }}>···</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Example>

      <Example label="Pagination">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <Pagination page={page} pageCount={42} onPageChange={setPage} />
          <Pagination page={1} pageCount={3} onPageChange={() => {}} />
          <Pagination page={5} pageCount={5} onPageChange={() => {}} />
        </div>
      </Example>

      <Example label="Chart — container chrome (BYO renderer)">
        <div style={{ width: "100%", maxWidth: 560 }}>
          <Chart
            title="Sign-ups this week"
            description="Compared to the previous 7 days."
            legend={[
              { id: "this-week", label: "This week", color: COLORS.green[600] },
              { id: "last-week", label: "Last week", color: COLORS.ink[3] },
            ]}
          >
            <SimpleBars />
          </Chart>
        </div>
      </Example>

      <Example label="Chart — loading + empty states">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }}>
          <Chart title="Loading…" loading height={160} />
          <Chart title="Empty" empty="No data for the selected range." height={160} />
        </div>
      </Example>

      <Example label="CalendarGrid — month view with event chips">
        <div style={{ width: "100%" }}>
          <CalendarGrid
            month={calMonth}
            onMonthChange={setCalMonth}
            selected={calSelected}
            onDayClick={(date) => setCalSelected(date)}
            renderDay={renderEventDay}
            cellHeight={88}
          />
        </div>
      </Example>

      <Example label="CalendarGrid — compact picker (no event chips, smaller cells)">
        <div style={{ width: 320 }}>
          <CalendarGrid
            month={calMonth}
            onMonthChange={setCalMonth}
            selected={calSelected}
            onDayClick={(date) => setCalSelected(date)}
            cellHeight={36}
          />
        </div>
      </Example>
    </Section>
  );
}

/* CalendarGrid demo — fake events keyed by ISO day-of-year. */
function renderEventDay(meta: CalendarDayMeta) {
  const events = EVENTS_BY_DOW[meta.date.getDay()] || [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: 999,
            fontSize: 11,
            fontWeight: meta.isToday ? TYPE.weight.bold : TYPE.weight.medium,
            background: meta.isToday ? COLORS.green[600] : "transparent",
            color: meta.isToday ? "#fff" : "inherit",
          }}
        >
          {meta.date.getDate()}
        </span>
        {meta.isWeekend && !meta.isOutsideMonth && (
          <span style={{ fontSize: 9, color: COLORS.ink[4], textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Wknd
          </span>
        )}
      </div>
      {!meta.isOutsideMonth && events.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, overflow: "hidden" }}>
          {events.slice(0, 2).map((ev, i) => (
            <StatusPill key={i} variant={ev.variant}>
              {ev.label}
            </StatusPill>
          ))}
          {events.length > 2 && (
            <span style={{ fontSize: 10, color: COLORS.ink[3], paddingLeft: 4 }}>
              +{events.length - 2} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

const EVENTS_BY_DOW: Record<
  number,
  { label: string; variant: "game" | "practice" | "tournament" | "volunteer" }[]
> = {
  0: [],
  1: [{ label: "Practice 5p", variant: "practice" }],
  2: [
    { label: "Game 6p", variant: "game" },
    { label: "Snack duty", variant: "volunteer" },
  ],
  3: [{ label: "Practice 5p", variant: "practice" }],
  4: [],
  5: [
    { label: "Game 7p", variant: "game" },
    { label: "Tournament", variant: "tournament" },
    { label: "Field crew", variant: "volunteer" },
  ],
  6: [{ label: "Tournament", variant: "tournament" }],
};

// Tiny inline SVG bar chart so the docs page doesn't pull in recharts.
function SimpleBars() {
  const data = [4, 7, 6, 9, 8, 12, 10];
  const prev = [3, 5, 6, 5, 7, 8, 7];
  const max = Math.max(...data, ...prev);
  return (
    <svg viewBox="0 0 280 200" width="100%" height="100%" preserveAspectRatio="none">
      {data.map((v, i) => {
        const x = i * 38 + 14;
        const h1 = (v / max) * 160;
        const h2 = (prev[i] / max) * 160;
        return (
          <g key={i}>
            <rect x={x} y={180 - h2} width={12} height={h2} fill="#94a3b8" rx={2} />
            <rect x={x + 14} y={180 - h1} width={12} height={h1} fill="#16a34a" rx={2} />
          </g>
        );
      })}
      <line x1={0} y1={180} x2={280} y2={180} stroke="#e5e7eb" strokeWidth={1} />
    </svg>
  );
}
