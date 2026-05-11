import { Card, StatCard, KPIBar, FilterBar, Button, Select, Input, Separator } from "@gameplanr/ui";
import { Section, Example } from "../Section";

const CalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.5 7H15.5M6 1.5V5M12 1.5V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M5 3H13V7C13 9.21 11.21 11 9 11C6.79 11 5 9.21 5 7V3Z M9 11V14 M6 14H12 M5 4H3V6C3 7.1 3.9 8 5 8 M13 4H15V6C15 7.1 14.1 8 13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function LayoutSection({ id }: { id: string }) {
  return (
    <Section id={id} title="Layout" description="Card, StatCard, KPIBar, FilterBar, Separator.">
      <Example label="Separator — horizontal + vertical">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <div style={{ fontSize: 13, color: "#334155" }}>Above the line</div>
          <Separator />
          <div style={{ fontSize: 13, color: "#334155" }}>Below the line</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
            <span style={{ fontSize: 13 }}>Left</span>
            <Separator orientation="vertical" />
            <span style={{ fontSize: 13 }}>Middle</span>
            <Separator orientation="vertical" />
            <span style={{ fontSize: 13 }}>Right</span>
          </div>
        </div>
      </Example>

      <Example label="Card with subcomponents">
        <div style={{ width: "100%", maxWidth: 460 }}>
          <Card>
            <Card.Header>
              <div>
                <Card.Title>Game Settings</Card.Title>
                <Card.Description>Rules that affect lineup generation.</Card.Description>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </Card.Header>
            <Card.Body>
              <p style={{ margin: 0, fontSize: 14, color: "#334155" }}>
                Regular season · 6 innings · Min 2 innings per player.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="sm">Reset</Button>
              <Button size="sm">Save</Button>
            </Card.Footer>
          </Card>
        </div>
      </Example>

      <Example label="StatCard">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, width: "100%" }}>
          <StatCard label="Upcoming Events" value="14" delta="+3 this week" deltaTone="positive" icon={<CalIcon />} accent="blue" />
          <StatCard label="Tournaments"     value="3"  delta="2 active"      icon={<TrophyIcon />} accent="orange" />
          <StatCard label="Volunteer Tasks" value="22" delta="6 unfilled"    deltaTone="negative" accent="purple" icon={<CalIcon />} />
          <StatCard label="Sponsorship"     value="$12,750" delta="64% of goal" accent="green" icon={<TrophyIcon />} />
        </div>
      </Example>

      <Example label="KPIBar (horizontal)">
        <div style={{ width: "100%" }}>
          <KPIBar
            items={[
              { label: "Total Players", value: "9 / 9" },
              { label: "Pitchers",      value: "2", valueTone: "positive" },
              { label: "Infielders",    value: "4" },
              { label: "Outfielders",   value: "3" },
              { label: "Bench",         value: "0", valueTone: "negative" },
            ]}
          />
        </div>
      </Example>

      <Example label="KPIBar (vertical, in a side card)">
        <div style={{ width: 280 }}>
          <Card padding="sm">
            <KPIBar
              orientation="vertical"
              items={[
                { label: "Spring 2025", value: "16 games" },
                { label: "Wins",        value: "10", valueTone: "positive" },
                { label: "Losses",      value: "6",  valueTone: "negative" },
                { label: "Avg. score",  value: "8.2 – 5.1" },
              ]}
            />
          </Card>
        </div>
      </Example>

      <Example label="FilterBar">
        <div style={{ width: "100%" }}>
          <FilterBar
            filters={
              <>
                <Input inputSize="sm" placeholder="Search…" />
                <Select selectSize="sm" options={[{ value: "all", label: "All Fields" }]} defaultValue="all" />
                <Select selectSize="sm" options={[{ value: "all", label: "All Statuses" }]} defaultValue="all" />
              </>
            }
            actions={<Button size="sm">+ New Request</Button>}
          />
        </div>
      </Example>
    </Section>
  );
}
