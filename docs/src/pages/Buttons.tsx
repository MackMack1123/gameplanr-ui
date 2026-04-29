import { Button, IconButton } from "@gameplanr/ui";
import { Section, Example } from "../Section";

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ButtonsSection({ id }: { id: string }) {
  return (
    <Section id={id} title="Buttons" description="Primary, secondary, ghost, and danger. Sizes sm/md/lg.">
      <Example label="Variants (md)">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </Example>

      <Example label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Example>

      <Example label="With icons">
        <Button leadingIcon={<PlusIcon />}>New Request</Button>
        <Button variant="secondary" trailingIcon={<ArrowIcon />}>Continue</Button>
        <Button variant="ghost" leadingIcon={<PlusIcon />}>Add</Button>
      </Example>

      <Example label="States">
        <Button loading>Saving</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled secondary</Button>
      </Example>

      <Example label="Block">
        <Button block>Full-width primary</Button>
      </Example>

      <Example label="IconButton variants">
        <IconButton aria-label="Add" variant="primary"><PlusIcon /></IconButton>
        <IconButton aria-label="Add" variant="secondary"><PlusIcon /></IconButton>
        <IconButton aria-label="Add" variant="ghost"><PlusIcon /></IconButton>
        <IconButton aria-label="Delete" variant="danger"><PlusIcon /></IconButton>
      </Example>

      <Example label="IconButton sizes">
        <IconButton aria-label="Add" size="sm"><PlusIcon /></IconButton>
        <IconButton aria-label="Add" size="md"><PlusIcon /></IconButton>
        <IconButton aria-label="Add" size="lg"><PlusIcon /></IconButton>
      </Example>
    </Section>
  );
}
