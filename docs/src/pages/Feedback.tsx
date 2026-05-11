import React from "react";
import {
  Modal,
  Toast,
  Button,
  IconButton,
  Alert,
  Skeleton,
  Progress,
  Tooltip,
  ConfirmDialog,
} from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function FeedbackSection({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmBusy, setConfirmBusy] = React.useState(false);
  return (
    <Section id={id} title="Feedback" description="Modal, ConfirmDialog, Toast, Alert, Tooltip, Skeleton, Progress.">
      <Example label="Alert — four tones">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <Alert tone="info" title="Heads up" dismissible>
            Calendar will switch to v3 tokens in next week's release.
          </Alert>
          <Alert tone="success" title="Saved" dismissible>
            Your roster import finished — 23 players added.
          </Alert>
          <Alert tone="warning" title="Trial ending" action={<Button size="sm">Upgrade</Button>}>
            Your free trial ends in 3 days.
          </Alert>
          <Alert tone="destructive" title="Failed to save" dismissible>
            Network timeout. Check your connection and retry.
          </Alert>
        </div>
      </Example>

      <Example label="Tooltip — hover or focus a control">
        <div style={{ display: "flex", gap: 12 }}>
          <Tooltip content="Save (⌘S)">
            <Button size="sm">Save</Button>
          </Tooltip>
          <Tooltip content="More options" side="right">
            <IconButton aria-label="More" size="sm">···</IconButton>
          </Tooltip>
          <Tooltip content="Tab to me to see focus-trigger" side="bottom">
            <Button size="sm" variant="secondary">Focus me</Button>
          </Tooltip>
        </div>
      </Example>

      <Example label="Skeleton — placeholder shimmer">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Skeleton shape="circle" width={36} height={36} />
            <div style={{ flex: 1 }}>
              <Skeleton width="40%" />
              <div style={{ height: 6 }} />
              <Skeleton width="70%" height={10} />
            </div>
          </div>
          <Skeleton height={140} />
        </div>
      </Example>

      <Example label="Progress — determinate + indeterminate">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <Progress value={28} showLabel />
          <Progress value={66} tone="warning" showLabel />
          <Progress value={92} tone="brand" size="lg" showLabel />
          <Progress indeterminate />
        </div>
      </Example>

      <Example label="ConfirmDialog — destructive">
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete team…</Button>
        <ConfirmDialog
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={async () => {
            setConfirmBusy(true);
            await new Promise((r) => setTimeout(r, 800));
            setConfirmBusy(false);
            setConfirmOpen(false);
          }}
          title="Delete this team?"
          description="This is permanent. Players, schedules, and history are gone."
          confirmLabel="Delete team"
          tone="destructive"
          confirmLoading={confirmBusy}
        />
      </Example>

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
