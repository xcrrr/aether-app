"use client";

import { useState } from "react";
import { Plus, Search, PanelLeftClose, PanelLeftOpen, MessageSquare } from "lucide-react";
import type { ChatHistorySection } from "@/lib/types";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  chatHistory: ChatHistorySection[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggle,
  chatHistory,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = chatHistory
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  const hasResults = filteredSections.length > 0;

  return (
    <aside
      data-sidebar-collapsed={isCollapsed}
      className="flex-shrink-0 flex flex-col h-full overflow-hidden transition-[width] duration-base ease-in-out border-half"
      style={{
        width: isCollapsed ? "52px" : "260px",
        backgroundColor: "var(--bg-sidebar)",
        borderRight: "0.5px solid var(--border-subtle)",
      }}
    >
      {/* Top bar: Logo + collapse toggle */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{ padding: "12px 10px", height: "48px" }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Logo mark */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              backgroundColor: "var(--violet-primary)",
            }}
            data-tooltip="Aether"
          >
            <div
              className="rounded-full bg-white"
              style={{ width: "10px", height: "10px" }}
            />
          </div>
          {/* Wordmark */}
          <span
            className="whitespace-nowrap transition-opacity duration-base"
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-primary)",
              opacity: isCollapsed ? 0 : 1,
            }}
          >
            Aether
          </span>
        </div>
        <button
          onClick={onToggle}
          className="flex-shrink-0 flex items-center justify-center rounded-md transition-colors"
          style={{
            width: "28px",
            height: "28px",
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
          data-tooltip={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </button>
      </div>

      {/* New chat button */}
      <div
        className="flex-shrink-0 transition-opacity duration-base"
        style={{
          padding: isCollapsed ? "0 8px" : "0 10px",
          marginBottom: "8px",
        }}
      >
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 border-half transition-colors"
          style={{
            height: "34px",
            borderRadius: "8px",
            backgroundColor: "var(--violet-tint)",
            borderColor: "var(--violet-border)",
            color: "var(--violet-primary)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(127, 119, 221, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--violet-tint)";
          }}
          data-tooltip="New chat"
        >
          <Plus size={14} />
          <span
            className="whitespace-nowrap transition-opacity duration-base"
            style={{ opacity: isCollapsed ? 0 : 1 }}
          >
            {isCollapsed ? "" : "New chat"}
          </span>
        </button>
      </div>

      {/* Search input */}
      {!isCollapsed && (
        <div style={{ padding: "0 10px", marginBottom: "8px" }}>
          <div
            className="flex items-center gap-2 border-half"
            style={{
              borderRadius: "7px",
              borderColor: "var(--border-default)",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "0 8px",
              height: "30px",
            }}
          >
            <Search
              size={13}
              style={{ color: "var(--text-tertiary)", flexShrink: 0 }}
            />
            <input
              type="text"
              placeholder="Search chats…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize: "12px",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>
      )}

      {/* Chat history */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ padding: isCollapsed ? "0 6px" : "0 6px" }}
      >
        {!isCollapsed && searchQuery && !hasResults && (
          <p
            className="text-center"
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              padding: "16px 0",
            }}
          >
            No chats found
          </p>
        )}

        {filteredSections.map((section) => (
          <div key={section.label} style={{ marginBottom: "8px" }}>
            {/* Section label */}
            {!isCollapsed && (
              <div
                className="uppercase tracking-wider"
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  padding: "8px 8px 4px",
                }}
              >
                {section.label}
              </div>
            )}

            {/* Chat items */}
            {section.items.map((item) => {
              const isActive = item.id === activeConversationId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectConversation(item.id)}
                  className="w-full flex items-center gap-2 transition-colors"
                  style={{
                    height: "32px",
                    borderRadius: "7px",
                    padding: isCollapsed ? "0 8px" : "0 8px",
                    backgroundColor: isActive
                      ? "var(--violet-tint)"
                      : "transparent",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  data-tooltip={item.title}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="flex-shrink-0 rounded-full"
                      style={{
                        width: "5px",
                        height: "5px",
                        backgroundColor: "var(--violet-primary)",
                      }}
                    />
                  )}

                  {isCollapsed ? (
                    <MessageSquare
                      size={14}
                      style={{
                        color: isActive
                          ? "var(--violet-primary)"
                          : "var(--text-tertiary)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <>
                      <span
                        className="flex-1 truncate text-left"
                        style={{
                          fontSize: "12px",
                          color: isActive
                            ? "var(--text-primary)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="flex-shrink-0"
                        style={{
                          fontSize: "10px",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        {item.timestamp}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom: User avatar */}
      <div
        className="flex-shrink-0 flex items-center gap-2 overflow-hidden"
        style={{
          padding: "10px",
          borderTop: "0.5px solid var(--border-subtle)",
        }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "var(--violet-tint)",
            color: "var(--violet-primary)",
            fontSize: "11px",
            fontWeight: 500,
          }}
          data-tooltip="Adam"
        >
          A
        </div>
        <span
          className="whitespace-nowrap transition-opacity duration-base truncate"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-primary)",
            opacity: isCollapsed ? 0 : 1,
          }}
        >
          Adam
        </span>
      </div>
    </aside>
  );
}
