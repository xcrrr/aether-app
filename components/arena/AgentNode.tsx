"use client";

import { useState, useEffect, useRef } from "react";
import type { ArenaAgent } from "@/lib/types";
import { TrustBadge } from "../ui/TrustBadge";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

const OFFSETS: Record<string, { dx: number; dy: number }> = {
  core: { dx: -55, dy: 30 },
  alpha1: { dx: -10, dy: -70 },
  alpha2: { dx: -120, dy: -70 },
  syntax: { dx: -145, dy: -20 },
  sandbox: { dx: -55, dy: 30 },
};

interface AgentNodeProps {
  agent: ArenaAgent;
  canvasWidth: number;
  canvasHeight: number;
}

export function AgentNode({ agent, canvasWidth, canvasHeight }: AgentNodeProps) {
  const [statusOpacity, setStatusOpacity] = useState(1);
  const prevStatusRef = useRef(agent.currentStatus);

  useEffect(() => {
    if (agent.currentStatus !== prevStatusRef.current) {
      setStatusOpacity(0);
      const t = setTimeout(() => setStatusOpacity(1), 150);
      prevStatusRef.current = agent.currentStatus;
      return () => clearTimeout(t);
    }
  }, [agent.currentStatus]);

  if (!agent.currentStatus && !agent.currentBadge) return null;

  const offset = OFFSETS[agent.id] || { dx: 0, dy: 0 };
  const x = agent.position.rx * canvasWidth + offset.dx;
  const y = agent.position.ry * canvasHeight + offset.dy;
  const [r, g, b] = hexToRgb(agent.color);

  const trustScoreMatch = agent.currentBadge.match(/Trust\s*(\d+)/);
  const showTrustBadge =
    agent.badgeStatus !== "processing" && trustScoreMatch;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        background: "rgba(15, 14, 23, 0.88)",
        border: `0.5px solid rgba(${r}, ${g}, ${b}, 0.3)`,
        borderRadius: "var(--radius-lg)",
        padding: "9px 11px",
        minWidth: "110px",
        maxWidth: "145px",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1.5"
        style={{ marginBottom: "5px" }}
      >
        <div
          className="rounded-full flex-shrink-0"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: agent.color,
          }}
        >
          {agent.name}
        </span>
      </div>

      {/* Status text */}
      <div
        style={{
          fontSize: "11px",
          color: "var(--text-tertiary)",
          lineHeight: 1.4,
          marginBottom: "5px",
          opacity: statusOpacity,
          transition: "opacity 0.25s ease",
        }}
      >
        {agent.currentStatus}
      </div>

      {/* Badge */}
      {showTrustBadge ? (
        <TrustBadge
          score={parseInt(trustScoreMatch[1], 10)}
          status={agent.badgeStatus as "approved" | "rejected" | "warning"}
        />
      ) : agent.currentBadge ? (
        <span
          style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 500,
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)`,
            color: agent.color,
          }}
        >
          {agent.currentBadge}
        </span>
      ) : null}
    </div>
  );
}
