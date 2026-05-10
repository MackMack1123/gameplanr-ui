import { useState } from "react";
import { COLORS, MobileBottomNav } from "@gameplanr/ui";
import { Section, Example } from "../Section";

/**
 * "Custom widgets" — composed patterns built once for a consumer app
 * (currently Lineup), parked here so other apps can borrow the visual
 * model. Each widget renders a live demo plus a copy-paste JSX snippet.
 *
 * Add a new widget when:
 * 1. The pattern combines several primitives in a non-trivial layout.
 * 2. Another app is plausibly going to want the same layout.
 * 3. The shape is stable (don't park half-baked patterns here — they
 *    rot in place).
 */

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          margin: 0,
          padding: "12px 14px",
          backgroundColor: "#0f172a",
          color: "#e2e8f0",
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.5,
          overflowX: "auto",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // ignore — fall back to manual select
          }
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: copied ? "#16a34a" : "rgba(255,255,255,0.08)",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 600,
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function WidgetNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: COLORS.ink[3],
        backgroundColor: "#fffaf0",
        border: `1px solid #fde68a`,
        borderRadius: 6,
        padding: "8px 10px",
        marginTop: 8,
      }}
    >
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 1: Horizontal stepper
// ──────────────────────────────────────────────────────────────────────────

const HORIZONTAL_STEPPER_JSX = `// Horizontal workflow stepper — compact "X of N done" pill row
// where each step shows status + label, connected by lines.
// Pills are tappable; the contextual primary action on the right
// targets the next non-complete step.

const steps = [
  { n: 1, title: "Confirm attendance", status: "complete" },
  { n: 2, title: "Rules & setup",      status: "complete" },
  { n: 3, title: "Build your lineup",  status: "in-progress" },
  { n: 4, title: "Finalize & share",   status: "todo" },
];

<Card>
  <CardContent className="p-4">
    <div className="flex items-center justify-between gap-3 mb-3">
      <div>
        <CardTitle className="text-sm">Game day checklist</CardTitle>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Tap a step to jump to that section.
        </p>
      </div>
      <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5
                       text-[11px] font-semibold text-slate-700">
        2 of 4 done
      </span>
    </div>
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <ol className="flex items-center gap-1 min-w-0 flex-1 flex-wrap">
        {steps.map((step, i) => {
          const isComplete = step.status === "complete";
          const isInProgress = step.status === "in-progress";
          const chipBg = isComplete ? "bg-emerald-600 text-white"
                       : isInProgress ? "bg-amber-500 text-white"
                       : "bg-slate-200 text-slate-500";
          const labelColor = isComplete ? "text-emerald-700"
                           : isInProgress ? "text-amber-700"
                           : "text-slate-500";
          const next = steps[i + 1];
          const connector = isComplete && next ? "bg-emerald-300" : "bg-slate-200";
          return (
            <li key={step.n} className="flex items-center gap-1">
              <button className="inline-flex items-center gap-1.5 rounded-full
                                 px-2 py-1 hover:bg-slate-50">
                <span className={\`inline-flex h-5 w-5 items-center justify-center
                                   rounded-full text-[10px] font-bold \${chipBg}\`}>
                  {isComplete ? "✓" : step.n}
                </span>
                <span className={\`text-xs font-semibold \${labelColor}\`}>
                  {step.title}
                </span>
              </button>
              {next && <span className={\`h-px w-3 sm:w-5 \${connector}\`} />}
            </li>
          );
        })}
      </ol>
      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
        Generate lineup
      </Button>
    </div>
  </CardContent>
</Card>`;

function HorizontalStepperDemo() {
  const steps = [
    { n: 1, title: "Confirm attendance", status: "complete" as const },
    { n: 2, title: "Rules & setup", status: "complete" as const },
    { n: 3, title: "Build your lineup", status: "in-progress" as const },
    { n: 4, title: "Finalize & share", status: "todo" as const },
  ];
  const completedCount = steps.filter((s) => s.status === "complete").length;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 12,
        padding: 16,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink[1] }}>
            Game day checklist
          </div>
          <div style={{ fontSize: 11, color: COLORS.ink[3], marginTop: 2 }}>
            Tap a step to jump to that section.
          </div>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: COLORS.surface.hover,
            borderRadius: 999,
            padding: "2px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.ink[2],
          }}
        >
          {completedCount} of {steps.length} done
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flex: 1,
            minWidth: 0,
            flexWrap: "wrap",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {steps.map((step, i) => {
            const isComplete = step.status === "complete";
            const isInProgress = step.status === "in-progress";
            const chipBg = isComplete
              ? "#16a34a"
              : isInProgress
                ? "#f59e0b"
                : "#e2e8f0";
            const chipColor = isComplete || isInProgress ? "#fff" : "#64748b";
            const labelColor = isComplete
              ? "#047857"
              : isInProgress
                ? "#b45309"
                : "#64748b";
            const next = steps[i + 1];
            const connectorColor =
              isComplete && next ? "#a7f3d0" : "#e2e8f0";
            return (
              <li
                key={step.n}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <button
                  type="button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    border: "none",
                    background: "transparent",
                    borderRadius: 999,
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 20,
                      width: 20,
                      borderRadius: "50%",
                      background: chipBg,
                      color: chipColor,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {isComplete ? "✓" : step.n}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: labelColor,
                    }}
                  >
                    {step.title}
                  </span>
                </button>
                {next && (
                  <span
                    style={{
                      height: 1,
                      width: 20,
                      background: connectorColor,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Generate lineup
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 2: Vertical stepper (richer onboarding flow)
// ──────────────────────────────────────────────────────────────────────────

const VERTICAL_STEPPER_JSX = `// Vertical workflow stepper — richer per-step row with summary line and
// action button on the right. Use when the user benefits from seeing
// every step's *current state* at a glance (not just position).
// Vertical eats more space; reach for the horizontal version unless
// you actually need the per-step copy.

<Card>
  <CardHeader>
    <CardTitle>Game day checklist</CardTitle>
    <span>2 of 4 done</span>
  </CardHeader>
  <CardContent>
    <ol className="space-y-2">
      {steps.map((step) => (
        <li className="flex items-start gap-3 rounded-lg border bg-white p-3">
          <span className="h-7 w-7 rounded-full bg-emerald-600 text-white">
            {step.complete ? "✓" : step.n}
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold">{step.title}</div>
            <p className="text-xs text-slate-500">{step.summary}</p>
          </div>
          <Button size="sm">{step.action}</Button>
        </li>
      ))}
    </ol>
  </CardContent>
</Card>`;

function VerticalStepperDemo() {
  const steps = [
    {
      n: 1,
      title: "Confirm attendance",
      summary: "9 of 13 players present",
      complete: true,
    },
    {
      n: 2,
      title: "Rules & setup",
      summary: "6 innings · Standard 9 fielders · all players bat",
      complete: true,
    },
    {
      n: 3,
      title: "Build your lineup",
      summary: "9 of 9 positions filled · 11-batter order",
      complete: false,
      inProgress: true,
    },
    {
      n: 4,
      title: "Finalize & share",
      summary: "Generate a share link or export to PDF",
      complete: false,
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {steps.map((step) => {
          const chipBg = step.complete
            ? "#16a34a"
            : step.inProgress
              ? "#fef3c7"
              : "#f1f5f9";
          const chipColor = step.complete
            ? "#fff"
            : step.inProgress
              ? "#b45309"
              : "#64748b";
          const borderColor = step.complete
            ? "#a7f3d0"
            : step.inProgress
              ? "#fde68a"
              : "#e2e8f0";
          return (
            <li
              key={step.n}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                background: "#fff",
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 28,
                  width: 28,
                  borderRadius: "50%",
                  background: chipBg,
                  color: chipColor,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {step.complete ? "✓" : step.n}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.ink[1],
                  }}
                >
                  {step.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.ink[3], marginTop: 2 }}>
                  {step.summary}
                </div>
              </div>
              <button
                type="button"
                style={{
                  background: step.complete ? "#fff" : "#16a34a",
                  color: step.complete ? COLORS.ink[1] : "#fff",
                  border: step.complete
                    ? `1px solid ${COLORS.surface.border}`
                    : "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {step.complete ? "Update" : "Open"}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 3: Inning navigator (compact prev/next + label)
// ──────────────────────────────────────────────────────────────────────────

const INNING_NAVIGATOR_JSX = `// Compact inning (or step / page) navigator — one rounded card with
// prev / inning-label / next, intended for on-screen navigation that
// stays visible while content updates beneath it.

<div className="flex items-center gap-1 rounded-lg border border-slate-200
                bg-slate-50 px-1 py-1">
  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Previous">
    <ChevronLeft className="h-5 w-5" />
  </Button>
  <div className="px-3 min-w-[64px] text-center">
    <div className="text-[10px] font-semibold uppercase tracking-wider
                    text-slate-400 leading-none">Inning</div>
    <div className="text-lg font-bold text-slate-900 leading-none mt-0.5">
      3 <span className="text-sm font-normal text-slate-400">/ 6</span>
    </div>
  </div>
  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Next">
    <ChevronRight className="h-5 w-5" />
  </Button>
</div>`;

function InningNavigatorDemo() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        border: `1px solid ${COLORS.surface.border}`,
        background: COLORS.surface.hover,
        borderRadius: 8,
        padding: 4,
      }}
    >
      <button
        type="button"
        style={{
          height: 32,
          width: 32,
          border: "none",
          background: "transparent",
          color: COLORS.ink[2],
          cursor: "pointer",
          fontSize: 18,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        ‹
      </button>
      <div style={{ padding: "0 12px", minWidth: 64, textAlign: "center" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: COLORS.ink[3],
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          Inning
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.ink[1],
            lineHeight: 1,
            marginTop: 2,
          }}
        >
          3<span style={{ fontSize: 14, fontWeight: 400, color: COLORS.ink[3] }}> / 6</span>
        </div>
      </div>
      <button
        type="button"
        style={{
          height: 32,
          width: 32,
          border: "none",
          background: "transparent",
          color: COLORS.ink[2],
          cursor: "pointer",
          fontSize: 18,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        ›
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 4: Live event banner (sticky bottom CTA on mobile)
// ──────────────────────────────────────────────────────────────────────────

const LIVE_BANNER_JSX = `// Sticky bottom banner on mobile only. Pulses to indicate "live now"
// state — show on every page except the focused view it links into.
// Detection should re-evaluate on a 60-second interval.

<button className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex
                   items-center justify-between gap-3 border-t
                   border-emerald-700 bg-emerald-600 px-4 py-3 text-white
                   shadow-lg active:bg-emerald-700">
  <span className="flex items-center gap-2 animate-pulse">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping
                       rounded-full bg-white opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
    </span>
    <span className="text-sm font-semibold">Game in progress</span>
  </span>
  <span className="inline-flex items-center gap-1 text-sm font-bold">
    Launch Game Time →
  </span>
</button>`;

function LiveBannerDemo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: "#16a34a",
        color: "#fff",
        borderRadius: 8,
        padding: "12px 16px",
        width: "100%",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            height: 8,
            width: 8,
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#fff",
              opacity: 0.6,
              animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              height: 8,
              width: 8,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
        </span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Game in progress</span>
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 700 }}>
        Launch Game Time →
      </span>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 5: Attendance toggle grid
// ──────────────────────────────────────────────────────────────────────────

const ATTENDANCE_GRID_JSX = `// Tap-to-toggle attendance card grid with bulk actions.
// Each cell is a button so the entire row is the touch target;
// minimum 44px height for thumb friendliness.

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
  {players.map((player) => {
    const isPresent = !!attendance[player.id];
    return (
      <button
        type="button"
        onClick={() => toggle(player.id, !isPresent)}
        className={[
          "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left",
          "min-h-[44px] transition-colors",
          isPresent
            ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
            : "border-slate-200 bg-white hover:bg-slate-50 opacity-70",
        ].join(" ")}
      >
        <span className={[
          "inline-flex h-7 w-7 items-center justify-center",
          "rounded-full text-xs font-bold",
          isPresent ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500",
        ].join(" ")}>
          {player.number || "—"}
        </span>
        <span className={[
          "min-w-0 flex-1 truncate text-sm font-medium",
          isPresent ? "text-slate-900"
                    : "text-slate-500 line-through decoration-slate-300",
        ].join(" ")}>
          {player.name}
        </span>
      </button>
    );
  })}
</div>`;

function AttendanceGridDemo() {
  const sample = [
    { id: 1, name: "Madison Mackrell", num: 4, present: true },
    { id: 2, name: "Cailin Lesovitz", num: 21, present: true },
    { id: 3, name: "Piper Mascio", num: 19, present: true },
    { id: 4, name: "Emma Achtert", num: 16, present: false },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 8,
        width: "100%",
      }}
    >
      {sample.map((p) => (
        <div
          key={p.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: p.present ? "#ecfdf5" : "#fff",
            border: `1px solid ${p.present ? "#a7f3d0" : "#e2e8f0"}`,
            borderRadius: 8,
            padding: "8px 12px",
            opacity: p.present ? 1 : 0.7,
            minHeight: 44,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 28,
              width: 28,
              borderRadius: "50%",
              background: p.present ? "#16a34a" : "#e2e8f0",
              color: p.present ? "#fff" : "#64748b",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {p.num}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: p.present ? COLORS.ink[1] : COLORS.ink[3],
              textDecoration: p.present ? "none" : "line-through",
            }}
          >
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 6: DnD sortable list (note + JSX)
// ──────────────────────────────────────────────────────────────────────────

const DND_LIST_JSX = `// Drag-and-drop list using @dnd-kit. The SortableItem wrapper handles
// the per-item ref, transform style, and grip affordance. Use whenever
// users need to reorder a list (batting order, position priority, etc.)

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

const SortableItem = ({ id, children, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = transform ? {
    transform: \`translate3d(\${transform.x}px, \${transform.y}px, 0)\`,
    transition,
    opacity: isDragging ? 0.4 : 1,
  } : undefined;
  return (
    <div ref={setNodeRef} style={style}
         {...(disabled ? {} : { ...attributes, ...listeners })}
         className="cursor-grab active:cursor-grabbing">
      <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
      {children}
    </div>
  );
};

<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEnd}>
  <SortableContext items={ids.map(String)} strategy={verticalListSortingStrategy}>
    {ids.map((id, i) => (
      <SortableItem key={id} id={String(id)}>
        {i + 1}. {playersById[id].name}
      </SortableItem>
    ))}
  </SortableContext>
</DndContext>`;

function DnDListNote() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 12,
        padding: 16,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {[
          "1. Madison Mackrell",
          "2. Cailin Lesovitz",
          "3. Piper Mascio",
          "4. Emma Achtert",
        ].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              background: "#fff",
              border: `1px solid ${COLORS.surface.border}`,
              borderRadius: 8,
              cursor: "grab",
            }}
          >
            <span
              style={{
                color: COLORS.ink[3],
                fontFamily: "monospace",
                fontSize: 12,
              }}
            >
              ⋮⋮
            </span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 7: MobileBottomNav (canonical mobile primary nav)
// ──────────────────────────────────────────────────────────────────────────

const MOBILE_BOTTOM_NAV_JSX = `// Canonical mobile primary navigation in v3. Pair with the sidebar
// for desktop and a sheet drawer for secondary/deeper nav. Caps at
// ~5 items for thumb-reachability; overflow goes into a "More" item
// that opens a Sheet drawer.

import { MobileBottomNav, useIsMobile } from "@gameplanr/ui";

const isMobile = useIsMobile();

return (
  <>
    {isMobile && (
      <MobileBottomNav>
        <MobileBottomNav.Item icon={<HomeIcon/>}  label="Home"     href="/" active />
        <MobileBottomNav.Item icon={<CalIcon/>}   label="Calendar" href="/calendar" />
        <MobileBottomNav.Item icon={<TeamIcon/>}  label="Teams"    href="/teams" />
        <MobileBottomNav.Item icon={<InboxIcon/>} label="Inbox"    href="/inbox" badge="3" />
        <MobileBottomNav.Item icon={<MoreIcon/>}  label="More"     onClick={openSheet} />
      </MobileBottomNav>
    )}
    {/* Pad page content so the last row clears the fixed bar */}
    <MobileBottomNav.Spacer />
  </>
);`;

// Tiny inline icon set for the demo
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/>
    </svg>
  );
}
function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M3 9h18M8 3v4M16 3v4"/>
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/>
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-4 4-4s2.5 1 2.5 2.5"/>
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M4 13l2-7h12l2 7"/><path d="M4 13v6h16v-6"/>
      <path d="M4 13h5l1 2h4l1-2h5"/>
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
    </svg>
  );
}

function MobileBottomNavDemo() {
  // Frame the nav inside a phone-shaped container so the fixed
  // positioning reads correctly without escaping the docs page.
  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 480,
        background: COLORS.surface.page,
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ padding: 16, fontSize: 12, color: COLORS.ink[3] }}>
        Page content scrolls here…
      </div>
      <div
        style={{
          // Override the fixed-bottom positioning for the demo so it
          // sits inside the phone frame instead of the viewport.
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <MobileBottomNav style={{ position: "relative" }}>
          <MobileBottomNav.Item icon={<HomeIcon />} label="Home" onClick={() => {}} active />
          <MobileBottomNav.Item icon={<CalIcon />} label="Calendar" onClick={() => {}} />
          <MobileBottomNav.Item icon={<TeamIcon />} label="Teams" onClick={() => {}} />
          <MobileBottomNav.Item icon={<InboxIcon />} label="Inbox" onClick={() => {}} badge="3" />
          <MobileBottomNav.Item icon={<MoreIcon />} label="More" onClick={() => {}} />
        </MobileBottomNav>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 8: Sidebar → Sheet drawer (secondary/deeper nav on mobile)
// ──────────────────────────────────────────────────────────────────────────

const SIDEBAR_TO_SHEET_JSX = `// Companion to MobileBottomNav. Sidebar is the desktop primary nav;
// on mobile, hide it behind a Sheet (drawer) opened from a "More" item
// in the bottom bar. The sidebar tree is reused inside the sheet so
// secondary nav items have one source of truth.

import { useState } from "react";
import { Sidebar, MobileBottomNav, useIsMobile } from "@gameplanr/ui";
// Sheet primitive: bring your own (e.g. shadcn/ui Sheet, Radix Dialog,
// vaul, etc.) — keeps gameplanr-ui dependency-free.

function AppChrome({ children }) {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navTree = (
    <Sidebar.Nav>
      <Sidebar.NavItem icon={<HomeIcon/>}     label="Home"      href="/" active />
      <Sidebar.NavItem icon={<CalIcon/>}      label="Calendar"  href="/cal" />
      <Sidebar.NavItem icon={<TeamIcon/>}     label="Teams"     href="/teams" />
      <Sidebar.NavItem icon={<SettingsIcon/>} label="Settings"  href="/settings" />
    </Sidebar.Nav>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {!isMobile && <Sidebar>{navTree}</Sidebar>}
      <main style={{ flex: 1 }}>
        {children}
        <MobileBottomNav.Spacer />
      </main>
      {isMobile && (
        <MobileBottomNav>
          <MobileBottomNav.Item icon={<HomeIcon/>} label="Home"     href="/" active />
          <MobileBottomNav.Item icon={<CalIcon/>}  label="Calendar" href="/cal" />
          <MobileBottomNav.Item icon={<TeamIcon/>} label="Teams"    href="/teams" />
          <MobileBottomNav.Item icon={<MoreIcon/>} label="More"     onClick={() => setDrawerOpen(true)} />
        </MobileBottomNav>
      )}
      {isMobile && (
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen} side="right">
          <Sidebar style={{ width: "100%", position: "static", height: "auto" }}>
            {navTree}
          </Sidebar>
        </Sheet>
      )}
    </div>
  );
}`;

function SidebarToSheetNote() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 12,
        padding: 16,
        width: "100%",
        fontSize: 13,
        color: COLORS.ink[2],
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontWeight: 600, color: COLORS.ink[1], marginBottom: 8 }}>
        Two surfaces, one nav tree
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li><strong>Desktop:</strong> sidebar visible, no bottom bar.</li>
        <li><strong>Mobile:</strong> sidebar hidden; primary nav lives in <code>MobileBottomNav</code> at the bottom; secondary/deeper items live behind a "More" sheet drawer that re-renders the same sidebar tree.</li>
      </ul>
      <div style={{ marginTop: 8, color: COLORS.ink[3], fontSize: 12 }}>
        The Sheet primitive is intentionally not in <code>@gameplanr/ui</code>. Bring your own (shadcn/ui Sheet, Radix Dialog, vaul, etc.) so we don't ship a transitive Radix dep.
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 9: AppLauncher (post-login app picker)
// ──────────────────────────────────────────────────────────────────────────

const APP_LAUNCHER_JSX = `// Post-login app picker shown after a user authenticates and chooses
// which GamePlanr app to enter. Composed of a top strip (greeting +
// account), a featured hero card, and a 3-column compact grid of the
// remaining apps. Theming uses the TINT palette from tokens.

import { AppLauncher, AppIcon, TINT } from "@gameplanr/ui";

const apps = [
  { id: "field",      name: "Field",      tint: "green",  icon: <AppIcon name="pitch"/>,    href: "/field" },
  { id: "tournament", name: "Tournament", tint: "purple", icon: <AppIcon name="trophy"/>,   href: "/tournament" },
  { id: "calendar",   name: "Calendar",   tint: "blue",   icon: <AppIcon name="calendar"/>, href: "/calendar" },
  { id: "lineup",     name: "Lineup",     tint: "orange", icon: <AppIcon name="baseball"/>, href: "/lineup" },
  { id: "volunteer",  name: "Volunteer",  tint: "amber",  icon: <AppIcon name="megaphone"/>,href: "/volunteer" },
];

<AppLauncher
  user={{ name: "Brett", email: "brett@example.com" }}
  featured={apps[0]}
  apps={apps.slice(1)}
  onSignOut={() => {/* ... */}}
/>`;

function AppLauncherNote() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.surface.border}`,
        borderRadius: 12,
        padding: 16,
        width: "100%",
        fontSize: 13,
        color: COLORS.ink[2],
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontWeight: 600, color: COLORS.ink[1], marginBottom: 8 }}>
        Composed of <code>FeaturedHero</code> + <code>CompactCard</code>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li><code>FeaturedHero</code> — the big primary-app card at the top.</li>
        <li><code>CompactCard</code> — secondary apps in the 3-column grid.</li>
        <li>Both consume the <code>TINT</code> token map for per-app color: <code>{`{ bg, fg }`}</code> pairs scoped to <code>purple | blue | orange | green | amber | slate</code>.</li>
        <li>Account footer is built-in — pass <code>user.name</code>, <code>user.email</code>, and an <code>onSignOut</code> callback.</li>
      </ul>
      <div style={{ marginTop: 8, color: COLORS.ink[3], fontSize: 12 }}>
        The Auth app renders the picker server-side as inline-styled HTML (no React) using the same tokens; React-based consumers should import <code>{`<AppLauncher />`}</code> directly for parity.
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────────

export function WidgetsSection({ id }: { id: string }) {
  return (
    <Section
      id={id}
      title="Custom widgets"
      description="Composed patterns built once for a consumer app and parked here for cross-app reuse. Use the Copy button to lift JSX into your app."
    >
      <Example label="Horizontal stepper · workflow checklist (compact)">
        <HorizontalStepperDemo />
        <CodeSnippet code={HORIZONTAL_STEPPER_JSX} />
        <WidgetNote>
          Reach for this when you need a workflow indicator that doesn't dominate the page. Pills are tappable; the contextual primary button on the right targets the next non-complete step.
        </WidgetNote>
      </Example>

      <Example label="Vertical stepper · workflow checklist (rich)">
        <VerticalStepperDemo />
        <CodeSnippet code={VERTICAL_STEPPER_JSX} />
        <WidgetNote>
          Use when each step needs its own copy and a per-step action. Heavier vertical footprint than the horizontal version — only worth it if the per-step summary is load-bearing.
        </WidgetNote>
      </Example>

      <Example label="Inning navigator · compact prev/next">
        <InningNavigatorDemo />
        <CodeSnippet code={INNING_NAVIGATOR_JSX} />
        <WidgetNote>
          Generic enough to use as a step / page / week navigator. The label slot is centered and gets uppercase eyebrow + bold value.
        </WidgetNote>
      </Example>

      <Example label="Live-event banner · sticky bottom CTA">
        <LiveBannerDemo />
        <CodeSnippet code={LIVE_BANNER_JSX} />
        <WidgetNote>
          Mobile-only by default (md:hidden). Detection should re-evaluate on a 60s interval. Suppress on the focused view it links into.
        </WidgetNote>
      </Example>

      <Example label="Attendance toggle grid">
        <AttendanceGridDemo />
        <CodeSnippet code={ATTENDANCE_GRID_JSX} />
        <WidgetNote>
          Tap-to-toggle pattern with min 44px touch targets. Pairs with bulk-action links ("Mark all present" / "Clear all") above the grid.
        </WidgetNote>
      </Example>

      <Example label="DnD sortable list (visual only — JSX requires @dnd-kit)">
        <DnDListNote />
        <CodeSnippet code={DND_LIST_JSX} />
        <WidgetNote>
          The visual demo above isn't draggable. Working version requires @dnd-kit/core + @dnd-kit/sortable. Use whenever users need to reorder a list (batting order, priority weights, etc.)
        </WidgetNote>
      </Example>

      <Example label="MobileBottomNav · canonical mobile primary nav">
        <MobileBottomNavDemo />
        <CodeSnippet code={MOBILE_BOTTOM_NAV_JSX} />
        <WidgetNote>
          Pair with <code>useIsMobile()</code> so it only mounts on mobile. Caps at ~5 items for thumb-reachability — overflow into a "More" item that opens a sheet drawer (see next widget). Includes <code>safe-area-inset-bottom</code> padding so the bar clears the iOS home indicator. Drop a <code>{`<MobileBottomNav.Spacer />`}</code> at the end of <code>{`<main>`}</code> so the last row isn't hidden behind the fixed bar.
        </WidgetNote>
      </Example>

      <Example label="Sidebar → Sheet drawer · secondary mobile nav">
        <SidebarToSheetNote />
        <CodeSnippet code={SIDEBAR_TO_SHEET_JSX} />
        <WidgetNote>
          The companion to <code>MobileBottomNav</code>. One <code>{`<Sidebar.Nav>`}</code> tree feeds both surfaces — desktop sidebar and the mobile sheet drawer — so secondary items have a single source of truth. Sheet primitive is BYO (shadcn/ui Sheet, Radix Dialog, vaul) — gameplanr-ui stays Radix-free.
        </WidgetNote>
      </Example>

      <Example label="AppLauncher · post-login app picker">
        <AppLauncherNote />
        <CodeSnippet code={APP_LAUNCHER_JSX} />
        <WidgetNote>
          Live demo intentionally omitted — the component needs realistic per-app data (icons, hrefs, tints, signed-in user) that varies per consumer. The JSX above is the canonical shape. <code>FeaturedHero</code> and <code>CompactCard</code> are also exported for one-off composition.
        </WidgetNote>
      </Example>
    </Section>
  );
}
