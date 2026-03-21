"use client";

import { suggestionChips } from "@/lib/mock-data";

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* Logo mark */}
      <div
        className="flex items-center justify-center rounded-[10px]"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--violet-primary)",
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{ width: "14px", height: "14px" }}
        />
      </div>

      {/* Greeting */}
      <div className="text-center">
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          {getGreeting()}, Adam
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
          }}
        >
          What would you like to explore today?
        </p>
      </div>

      {/* Suggestion chips — 2x2 grid */}
      <div
        className="grid grid-cols-2 gap-3"
        style={{ maxWidth: "480px", width: "100%", padding: "0 16px" }}
      >
        {suggestionChips.map((chip) => (
          <button
            key={chip}
            onClick={() => onSuggestionClick(chip)}
            className="text-left border-half transition-colors"
            style={{
              borderColor: "var(--border-default)",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "12px",
              color: "var(--text-secondary)",
              background: "transparent",
              cursor: "pointer",
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
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
