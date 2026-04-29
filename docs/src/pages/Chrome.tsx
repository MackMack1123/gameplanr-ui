import React from "react";
import { Tabs, StatusPill, PageHeader, EmptyState, Button } from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function ChromeSection({ id }: { id: string }) {
  const [tab, setTab] = React.useState("batting");
  return (
    <Section id={id} title="Chrome" description="Tabs, StatusPill, PageHeader, EmptyState.">
      <Example label="Tabs">
        <div style={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: "batting",   label: "Batting Order" },
              { value: "fielding",  label: "Fielding Positions" },
              { value: "preview",   label: "Preview Lineup" },
            ]}
          />
        </div>
      </Example>

      <Example label="StatusPill">
        <StatusPill variant="game">Game</StatusPill>
        <StatusPill variant="practice">Practice</StatusPill>
        <StatusPill variant="tournament">Tournament</StatusPill>
        <StatusPill variant="volunteer">Volunteer</StatusPill>
        <StatusPill variant="pending">Pending</StatusPill>
        <StatusPill variant="approved">Approved</StatusPill>
        <StatusPill variant="declined">Declined</StatusPill>
        <StatusPill variant="neutral">Neutral</StatusPill>
      </Example>

      <Example label="PageHeader">
        <div style={{ width: "100%" }}>
          <PageHeader
            title="Scheduling Requests"
            subtitle="Review and manage all field & facility requests."
            actions={<Button size="sm">+ New Request</Button>}
          />
        </div>
      </Example>

      <Example label="EmptyState">
        <div style={{ width: "100%" }}>
          <EmptyState
            title="No field requests found"
            description="There are no field & facility requests for the selected filters."
            action={<Button size="sm">+ New Request</Button>}
          />
        </div>
      </Example>
    </Section>
  );
}
