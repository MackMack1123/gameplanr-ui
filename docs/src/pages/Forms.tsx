import React from "react";
import { Input, Select, Toggle, FormField, Label, Textarea } from "@gameplanr/ui";
import { Section, Example } from "../Section";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function FormsSection({ id }: { id: string }) {
  const [enabled, setEnabled] = React.useState(true);
  const [muted, setMuted] = React.useState(false);
  const [team, setTeam] = React.useState("");

  return (
    <Section id={id} title="Forms" description="Input, Select, Toggle, FormField, Label, Textarea.">
      <Example label="Label — standalone (use FormField for the full row chrome)">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <Label htmlFor="ex-email">Email</Label>
          <Input id="ex-email" placeholder="you@team.com" />
          <Label htmlFor="ex-name" required>Display name</Label>
          <Input id="ex-name" placeholder="Jordan M." />
          <Label htmlFor="ex-bio" optional="(optional)">Bio</Label>
          <Textarea id="ex-bio" rows={3} placeholder="A short bio…" />
        </div>
      </Example>

      <Example label="Textarea — sizes, autoResize, invalid">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <Textarea size="sm" placeholder="Small (rows=2)" rows={2} />
          <Textarea size="md" placeholder="Medium (default, rows=3)" />
          <Textarea size="lg" placeholder="Large (rows=4)" rows={4} />
          <Textarea autoResize maxRows={6} placeholder="autoResize — type to grow up to 6 rows" />
          <Textarea invalid defaultValue="error state" />
        </div>
      </Example>

      <Example label="Input — sizes">
        <Input inputSize="sm" placeholder="Small" />
        <Input inputSize="md" placeholder="Medium (default)" />
        <Input inputSize="lg" placeholder="Large" />
      </Example>

      <Example label="Input — with icons + states">
        <Input placeholder="Search teams" leadingIcon={<SearchIcon />} />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Invalid" invalid defaultValue="bad@" />
      </Example>

      <Example label="Select">
        <Select
          options={[
            { value: "all",     label: "All Fields" },
            { value: "main",    label: "Main Field" },
            { value: "back",    label: "Back Field" },
          ]}
          placeholder="Choose…"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <Select
          selectSize="sm"
          options={[{ value: "10", label: "10 / page" }, { value: "25", label: "25 / page" }]}
          defaultValue="10"
        />
        <Select
          options={[{ value: "x", label: "Disabled select" }]}
          disabled
        />
      </Example>

      <Example label="Toggle">
        <Toggle aria-label="Notifications enabled" checked={enabled} onChange={setEnabled} />
        <Toggle aria-label="Muted" size="sm" checked={muted} onChange={setMuted} />
        <Toggle aria-label="Off, disabled" checked={false} onChange={() => {}} disabled />
        <Toggle aria-label="On, disabled" checked={true} onChange={() => {}} disabled />
      </Example>

      <Example label="FormField (stacked)">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField label="Team name" required helperText="Visible to admins.">
            <Input placeholder="Northvale Baseball" />
          </FormField>
          <FormField label="Email" error="Invalid email format.">
            <Input invalid defaultValue="not-an-email" />
          </FormField>
        </div>
      </Example>

      <Example label="FormField (horizontal)">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <FormField label="Allow players to sit" layout="horizontal" helperText="Inning-by-inning rotation.">
            <Toggle aria-label="Allow players to sit" checked={enabled} onChange={setEnabled} />
          </FormField>
          <FormField label="Game type" layout="horizontal">
            <Select options={[{ value: "regular", label: "Regular Season" }, { value: "tourney", label: "Tournament" }]} defaultValue="regular" />
          </FormField>
        </div>
      </Example>
    </Section>
  );
}
