"use client";

import { Globe, Settings } from "lucide-react";
import { ModelSelector } from "./ModelSelector";

interface TopbarProps {
  onArenaClick?: () => void;
}

export function Topbar({ onArenaClick }: TopbarProps) {
  return (
    <header
      className="flex items-center justify-between flex-shrink-0 border-half"
      style={{
        height: "48px",
        padding: "0 16px",
        backgroundColor: "var(--bg-base)",
        borderBottom: "0.5px solid var(--border-subtle)",
      }}
    >
      {/* Left: Model selector */}
      <ModelSelector />

      {/* Right: Action buttons */}
      <div className="flex items-center gap-1">
        {/* Arena button */}
        <button
          onClick={onArenaClick}
          className="flex items-center gap-1.5 border-half transition-colors"
          style={{
            padding: "4px 10px",
            borderRadius: "7px",
            backgroundColor: "var(--violet-tint)",
            borderColor: "var(--violet-border)",
            color: "var(--violet-primary)",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "rgba(127, 119, 221, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--violet-tint)";
          }}
        >
          <span
            className="rounded-full"
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: "var(--violet-primary)",
            }}
          />
          Arena
        </button>

        {/* Sphere icon */}
        <button
          className="flex items-center justify-center rounded-md transition-colors"
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
          <Globe size={16} />
        </button>

        {/* Settings icon */}
        <button
          className="flex items-center justify-center rounded-md transition-colors"
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
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
}
