"use client";

import { ChevronLeft, Maximize2 } from "lucide-react";
import { useCallback } from "react";

interface ArenaTopbarProps {
  onClose: () => void;
  conversationTitle: string;
  stepCount: number;
  durationMs: number;
  agentCount: number;
}

export function ArenaTopbar({
  onClose,
  conversationTitle,
  stepCount,
  durationMs,
  agentCount,
}: ArenaTopbarProps) {
  const truncatedTitle =
    conversationTitle.length > 32
      ? conversationTitle.slice(0, 32) + "…"
      : conversationTitle;

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* Center: Live indicator + title */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center gap-2"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          className="rounded-full arena-live-dot"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: "var(--green-primary)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
          }}
        >
          Arena — {truncatedTitle}
        </span>
      </div>

      {/* Right: Stats + fullscreen + back */}
      <div className="flex items-center gap-2">
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-tertiary)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "0.5px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "4px 9px",
            whiteSpace: "nowrap",
          }}
        >
          {agentCount} agents · {stepCount} turns · {(durationMs / 1000).toFixed(1)}s
        </span>

        <button
          onClick={handleFullscreen}
          className="flex items-center justify-center transition-colors"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            color: "var(--text-tertiary)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-tertiary)";
          }}
        >
          <Maximize2 size={14} />
        </button>

        <button
          onClick={onClose}
          className="flex items-center gap-1 transition-colors"
          style={{
            border: "0.5px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            padding: "5px 11px",
            fontSize: "11px",
            color: "var(--text-secondary)",
            cursor: "pointer",
            background: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <ChevronLeft size={10} />
          Back to chat
        </button>
      </div>
    </>
  );
}
