"use client";

import React from "react";
import { COLORS, TYPE } from "../tokens";

export type PositionCode = "P" | "C" | "1B" | "2B" | "3B" | "SS" | "LF" | "CF" | "RF";

export interface DiamondPlayer {
  id?: string;
  number?: string | number;
  name?: string;
}

export interface DiamondFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Player assigned to each position. Use null for empty/unassigned. */
  positions: Partial<Record<PositionCode, DiamondPlayer | null>>;
  /** Highlights a position (e.g., currently being edited). */
  selected?: PositionCode;
  /** Click handler for a position marker. */
  onPositionClick?: (position: PositionCode) => void;
}

const POSITION_LAYOUT: Record<PositionCode, { x: number; y: number }> = {
  P:  { x: 50, y: 56 },
  C:  { x: 50, y: 90 },
  "1B": { x: 70, y: 64 },
  "2B": { x: 56, y: 42 },
  "3B": { x: 30, y: 64 },
  SS: { x: 44, y: 42 },
  LF: { x: 18, y: 22 },
  CF: { x: 50, y: 12 },
  RF: { x: 82, y: 22 },
};

const ALL_POSITIONS: PositionCode[] = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];

export function DiamondField({
  positions,
  selected,
  onPositionClick,
  style,
  ...rest
}: DiamondFieldProps) {
  return (
    <div
      {...rest}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
        <rect x="0" y="0" width="100" height="100" rx="6" fill="#e8f5ec" />
        <path d="M 8 92 Q 50 -8 92 92 Z" fill="#c9e7d3" />
        <polygon points="50,30 70,60 50,90 30,60" fill="#e8c89a" />
        <line x1="50" y1="90" x2="70" y2="60" stroke="#ffffff" strokeWidth="0.6" />
        <line x1="70" y1="60" x2="50" y2="30" stroke="#ffffff" strokeWidth="0.6" />
        <line x1="50" y1="30" x2="30" y2="60" stroke="#ffffff" strokeWidth="0.6" />
        <line x1="30" y1="60" x2="50" y2="90" stroke="#ffffff" strokeWidth="0.6" />
        <circle cx="50" cy="60" r="4" fill="#d4b380" />
      </svg>
      {ALL_POSITIONS.map((pos) => {
        const layout = POSITION_LAYOUT[pos];
        const player = positions[pos];
        const isSelected = selected === pos;
        return (
          <PositionMarker
            key={pos}
            code={pos}
            player={player ?? null}
            x={layout.x}
            y={layout.y}
            selected={isSelected}
            onClick={onPositionClick ? () => onPositionClick(pos) : undefined}
          />
        );
      })}
    </div>
  );
}

function PositionMarker({
  code,
  player,
  x,
  y,
  selected,
  onClick,
}: {
  code: PositionCode;
  player: DiamondPlayer | null;
  x: number;
  y: number;
  selected: boolean;
  onClick?: () => void;
}) {
  const interactive = !!onClick;
  const filled = !!player;
  const bg = selected ? COLORS.green[600] : filled ? COLORS.surface.card : "rgba(255,255,255,0.6)";
  const fg = selected ? "#ffffff" : COLORS.ink[1];
  const border = selected ? COLORS.green[700] : COLORS.surface.border;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-label={`Position ${code}${player?.name ? `: ${player.name}` : ": empty"}`}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: interactive ? "pointer" : "default",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: bg,
          color: fg,
          border: `1.5px solid ${border}`,
          boxShadow: "0 1px 2px rgba(15,23,42,0.12)",
          fontSize: TYPE.size.micro,
          fontWeight: TYPE.weight.bold,
          lineHeight: 1,
        }}
      >
        {player?.number ?? code}
      </span>
      {player?.name && (
        <span
          style={{
            fontSize: 9,
            fontWeight: TYPE.weight.medium,
            color: COLORS.ink[2],
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "1px 4px",
            borderRadius: 3,
            whiteSpace: "nowrap",
            maxWidth: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {player.name}
        </span>
      )}
    </button>
  );
}
