import React from "react";
import { Table, StatusPill, Pagination, Chart, COLORS } from "@gameplanr/ui";
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
  return (
    <Section id={id} title="Data" description="Table, Pagination, Chart, status pills.">
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
    </Section>
  );
}

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
