"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import type { ArenaStep, ArenaAgent } from "@/lib/types";
import { ARENA_RAW_TOKENS } from "@/lib/mock-data";
import { TrustBadge } from "../ui/TrustBadge";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

interface ArenaFeedProps {
  steps: ArenaStep[];
  activeStep: number;
  agents: ArenaAgent[];
  onSend: (message: string) => void;
}

type TabId = "feed" | "raw" | "trust";

const TABS: { id: TabId; label: string }[] = [
  { id: "feed", label: "Swarm feed" },
  { id: "raw", label: "Raw Aether-Lang" },
  { id: "trust", label: "Trust history" },
];

export function ArenaFeed({ steps, activeStep, agents, onSend }: ArenaFeedProps) {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [inputValue, setInputValue] = useState("");
  const feedScrollRef = useRef<HTMLDivElement>(null);

  const agentMap: Record<string, ArenaAgent> = {};
  for (const a of agents) {
    agentMap[a.id] = a;
  }

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInputValue("");
  };

  const visibleSteps = steps.slice(0, activeStep + 1);

  // Trust data: extract steps that have numeric trust scores
  const trustEntries: { agentName: string; color: string; score: number; status: "approved" | "rejected" | "warning" }[] = [];
  for (const s of visibleSteps) {
    const match = s.badgeText.match(/Trust\s*(\d+)/);
    if (match && s.badgeStatus !== "processing") {
      const agent = agentMap[s.agentId];
      trustEntries.push({
        agentName: agent?.name || s.agentId,
        color: agent?.color || "#7F77DD",
        score: parseInt(match[1], 10),
        status: s.badgeStatus as "approved" | "rejected" | "warning",
      });
    }
  }

  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{
        height: "180px",
        borderTop: "0.5px solid var(--border-subtle)",
        backgroundColor: "var(--bg-base)",
      }}
    >
      {/* Tab bar */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          height: "36px",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "0 14px",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 14px",
              fontSize: "11px",
              fontWeight: activeTab === tab.id ? 500 : 400,
              color:
                activeTab === tab.id
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)",
              borderBottom:
                activeTab === tab.id
                  ? "2px solid var(--violet-primary)"
                  : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              transition: "color 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "feed" && (
          <div
            ref={feedScrollRef}
            className="flex gap-2 h-full items-start"
            style={{
              padding: "10px 14px",
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
            }}
          >
            {visibleSteps.map((step, i) => {
              const agent = agentMap[step.agentId];
              const [r, g, b] = agent
                ? hexToRgb(agent.color)
                : [127, 119, 221];
              const trustMatch = step.badgeText.match(/Trust\s*(\d+)/);

              return (
                <div
                  key={i}
                  className="feed-card-enter"
                  style={{
                    flexShrink: 0,
                    minWidth: "200px",
                    maxWidth: "240px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "0.5px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "7px 10px",
                    display: "flex",
                    gap: "7px",
                  }}
                >
                  {/* Agent avatar */}
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginTop: "1px",
                      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 500,
                        color: agent?.color || "#7F77DD",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {agent?.name || step.agentId}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                        display: "block",
                      }}
                    >
                      {step.statusText}
                    </span>
                    {trustMatch && step.badgeStatus !== "processing" && (
                      <div style={{ marginTop: "3px" }}>
                        <TrustBadge
                          score={parseInt(trustMatch[1], 10)}
                          status={
                            step.badgeStatus as
                              | "approved"
                              | "rejected"
                              | "warning"
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "raw" && (
          <div
            style={{
              padding: "10px 14px",
              fontFamily: "monospace",
              fontSize: "10px",
              color: "var(--text-tertiary)",
              lineHeight: 1.8,
              overflowY: "auto",
              height: "100%",
              scrollbarWidth: "none",
            }}
          >
            {ARENA_RAW_TOKENS.slice(0, activeStep + 1).map((token, i) => (
              <div key={i}>{token}</div>
            ))}
          </div>
        )}

        {activeTab === "trust" && (
          <div
            className="flex flex-col gap-2"
            style={{
              padding: "10px 14px",
              overflowY: "auto",
              height: "100%",
              scrollbarWidth: "none",
            }}
          >
            {trustEntries.map((entry, i) => {
              const barColor =
                entry.score >= 80
                  ? "var(--green-primary)"
                  : entry.score >= 50
                  ? "var(--amber-primary)"
                  : "var(--red-primary)";

              return (
                <div key={i} className="flex items-center gap-3">
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: entry.color,
                      minWidth: "55px",
                    }}
                  >
                    {entry.agentName}
                  </span>
                  <div
                    className="flex-1"
                    style={{
                      height: "4px",
                      borderRadius: "2px",
                      backgroundColor: "var(--bg-surface)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        backgroundColor: barColor,
                        width: `${entry.score}%`,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      minWidth: "24px",
                      textAlign: "right",
                    }}
                  >
                    {entry.score}
                  </span>
                </div>
              );
            })}
            {trustEntries.length === 0 && (
              <span
                style={{
                  fontSize: "10px",
                  color: "var(--text-tertiary)",
                }}
              >
                Waiting for trust data…
              </span>
            )}
          </div>
        )}
      </div>

      {/* Input strip */}
      <div
        className="flex items-center gap-2 flex-shrink-0"
        style={{
          borderTop: "0.5px solid var(--border-subtle)",
          padding: "8px 14px 12px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Message Aether…"
          style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.04)",
            border: "0.5px solid var(--border-default)",
            borderRadius: "20px",
            padding: "7px 14px",
            fontSize: "12px",
            color: "var(--text-primary)",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          className="flex items-center justify-center rounded-full transition-colors"
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: inputValue.trim()
              ? "var(--violet-primary)"
              : "var(--bg-surface)",
            color: inputValue.trim()
              ? "#fff"
              : "var(--text-tertiary)",
            cursor: inputValue.trim() ? "pointer" : "default",
            flexShrink: 0,
          }}
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
}
