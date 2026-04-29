import React from "react";
import { Table, StatusPill } from "@gameplanr/ui";
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
  return (
    <Section id={id} title="Data" description="Table with sortable headers, status pills, hover rows.">
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
    </Section>
  );
}
