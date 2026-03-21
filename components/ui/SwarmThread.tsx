"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import type { SwarmThreadData } from "@/lib/types";
import { AgentBadge } from "./AgentBadge";
import { TrustBadge } from "./TrustBadge";

interface SwarmThreadProps {
  thread: SwarmThreadData;
  onArenaClick?: () => void;
}

export function SwarmThread({ thread, onArenaClick }: SwarmThreadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [thread.steps]);

  const lastStep = thread.steps[thread.steps.length - 1];

  return (
    <div
      className="border-half rounded-[10px] mb-3"
      style={{
        borderColor: "var(--border-subtle)",
        background: "rgba(255, 255, 255, 0.02)",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-3 text-left"
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center gap-2">
          <ChevronRight
            size={12}
            className="transition-transform duration-base"
            style={{
              color: "var(--text-tertiary)",
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
          <span
            className="uppercase tracking-wider"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              color: "var(--text-tertiary)",
            }}
          >
            Swarm · {thread.agentCount} agents · {thread.durationSeconds}s
          </span>
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onArenaClick?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              onArenaClick?.();
            }
          }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md"
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--violet-primary)",
            backgroundColor: "var(--violet-tint)",
            border: "0.5px solid var(--violet-border)",
            cursor: "pointer",
          }}
        >
          Arena ↗
        </span>
      </button>

      {/* Collapsed preview — last status line */}
      {!isExpanded && lastStep && (
        <div
          className="flex items-center gap-2 px-3.5 pb-3"
          style={{ paddingLeft: "34px" }}
        >
          <AgentBadge name={lastStep.agentName} color={lastStep.agentColor} />
          <span
            className="truncate"
            style={{ fontSize: "11px", color: "var(--text-secondary)" }}
          >
            {lastStep.message}
          </span>
          {lastStep.trustScore !== undefined && lastStep.trustStatus && (
            <TrustBadge
              score={lastStep.trustScore}
              status={lastStep.trustStatus}
            />
          )}
        </div>
      )}

      {/* Expanded content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-base ease-in-out"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
        }}
      >
        <div className="px-3.5 pb-3" style={{ paddingLeft: "34px" }}>
          {thread.steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-2 relative">
              {/* Vertical connector line */}
              {index < thread.steps.length - 1 && (
                <div
                  className="absolute border-half"
                  style={{
                    left: "8px",
                    top: "20px",
                    bottom: "-4px",
                    borderLeftColor: "var(--border-subtle)",
                    borderLeftWidth: "0.5px",
                  }}
                />
              )}
              {/* Agent circle */}
              <div
                className="flex-shrink-0 rounded-full mt-0.5"
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: `${step.agentColor}1f`,
                  border: `0.5px solid ${step.agentColor}40`,
                }}
              />
              <div className="flex-1 flex items-center gap-2 flex-wrap pb-2">
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: step.agentColor,
                  }}
                >
                  {step.agentName}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {step.message}
                </span>
                {step.trustScore !== undefined && step.trustStatus && (
                  <TrustBadge
                    score={step.trustScore}
                    status={step.trustStatus}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
