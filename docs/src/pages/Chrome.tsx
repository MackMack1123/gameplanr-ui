import React from "react";
import { Tabs, StatusPill, PageHeader, EmptyState, Button, Sheet, Popover, Input } from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function ChromeSection({ id }: { id: string }) {
  const [tab, setTab] = React.useState("batting");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);
  return (
    <Section id={id} title="Chrome" description="Tabs, StatusPill, PageHeader, EmptyState, Sheet, Popover.">
      <Example label="Sheet — side drawer + bottom sheet">
        <div style={{ display: "flex", gap: 12 }}>
          <Button size="sm" onClick={() => setSheetOpen(true)}>Open right drawer</Button>
          <Button size="sm" variant="secondary" onClick={() => setBottomOpen(true)}>Open bottom sheet</Button>
          <Sheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            side="right"
            title="Filters"
            description="Refine the visible field requests."
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setSheetOpen(false)}>Reset</Button>
                <Button size="sm" onClick={() => setSheetOpen(false)}>Apply</Button>
              </>
            }
          >
            <p style={{ margin: 0 }}>Drop your filter controls here. The drawer slides in from the right edge and traps focus.</p>
          </Sheet>
          <Sheet
            open={bottomOpen}
            onClose={() => setBottomOpen(false)}
            side="bottom"
            size="sm"
            title="Quick actions"
          >
            <p style={{ margin: 0 }}>The mobile pattern paired with <code>useIsMobile()</code> + <code>MobileBottomNav</code>.</p>
          </Sheet>
        </div>
      </Example>

      <Example label="Popover — anchored panel (click to toggle)">
        <Popover
          trigger={<Button size="sm" variant="secondary">Filter ▾</Button>}
          side="bottom"
          align="start"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Filter by name
            </div>
            <Input inputSize="sm" placeholder="Search…" />
            <Button size="sm" style={{ marginTop: 4 }}>Apply</Button>
          </div>
        </Popover>
      </Example>

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
