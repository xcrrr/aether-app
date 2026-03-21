"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { modelOptions } from "@/lib/mock-data";
import type { ModelOption } from "@/lib/types";

export function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ModelOption>(
    modelOptions.find((m) => m.isDefault) ?? modelOptions[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = selected.subtitle
    ? `${selected.name} · ${selected.subtitle}`
    : selected.name;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Badge button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-half transition-colors"
        style={{
          padding: "5px 10px",
          borderRadius: "20px",
          borderColor: "var(--border-default)",
          background: "rgba(255, 255, 255, 0.04)",
          cursor: "pointer",
          fontSize: "12px",
          color: "var(--text-primary)",
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--bg-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
        }}
      >
        {/* Pulsing dot */}
        <span
          className="rounded-full animate-pulse-dot"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: selected.dotColor,
          }}
        />
        <span>{displayName}</span>
        <ChevronDown
          size={12}
          style={{
            color: "var(--text-tertiary)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 150ms ease",
          }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 border-half z-50"
          style={{
            minWidth: "220px",
            borderRadius: "10px",
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-default)",
            padding: "4px",
          }}
        >
          {modelOptions.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelected(model);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 rounded-lg transition-colors text-left"
              style={{
                padding: "8px 10px",
                fontSize: "12px",
                color:
                  selected.id === model.id
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                cursor: "pointer",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Dot */}
              <span
                className="rounded-full flex-shrink-0"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: model.dotColor,
                }}
              />
              {/* Name */}
              <span className="flex-1" style={{ fontWeight: 500 }}>
                {model.name}
                {model.subtitle && (
                  <span
                    style={{
                      fontWeight: 400,
                      color: "var(--text-tertiary)",
                      marginLeft: "4px",
                    }}
                  >
                    · {model.subtitle}
                  </span>
                )}
              </span>
              {/* Checkmark for selected */}
              {selected.id === model.id && (
                <Check
                  size={14}
                  style={{ color: "var(--violet-primary)", flexShrink: 0 }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
