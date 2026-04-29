import React from "react";
import { Modal, Toast, Button } from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function FeedbackSection({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Section id={id} title="Feedback" description="Modal, Toast.">
      <Example label="Modal">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Discard changes?"
          description="You have unsaved edits to this lineup."
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger"    size="sm" onClick={() => setOpen(false)}>Discard</Button>
            </>
          }
        >
          Closing now will lose your changes since the last save.
        </Modal>
      </Example>

      <Example label="Toast tones">
        <Toast tone="success" title="Lineup saved" description="9 players assigned, balanced play enforced." />
        <Toast tone="info"    title="Sync in progress" description="Pulling roster from TeamSnap…" />
        <Toast tone="warning" title="Two players unassigned" description="Right field and bench are empty." />
        <Toast tone="error"   title="Save failed" description="Network error. Retry?" />
      </Example>

      <Example label="Toast with action + close">
        <Toast
          tone="success"
          title="Lineup saved"
          description="Drafted at 5:32 PM."
          action={<Button size="sm" variant="ghost">Undo</Button>}
          onClose={() => {}}
        />
      </Example>
    </Section>
  );
}
