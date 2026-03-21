"use client";

import { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, Check } from "lucide-react";
import type { Message, SwarmThreadData } from "@/lib/types";
import { SwarmThread } from "./SwarmThread";

interface ChatMessageProps {
  message: Message;
  swarmThread?: SwarmThreadData;
}

export function ChatMessage({ message, swarmThread }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="border-half"
          style={{
            maxWidth: "65%",
            backgroundColor: "rgba(127, 119, 221, 0.13)",
            border: "0.5px solid rgba(127, 119, 221, 0.2)",
            borderRadius: "14px 14px 3px 14px",
            padding: "10px 14px",
            fontSize: "14px",
            color: "var(--text-primary)",
            lineHeight: "1.6",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 group">
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
        style={{
          width: "26px",
          height: "26px",
          backgroundColor: "var(--violet-primary)",
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{ width: "8px", height: "8px" }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <span
          className="block mb-1"
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--violet-light)",
          }}
        >
          Aether
        </span>

        {/* Swarm thread above message text */}
        {swarmThread && <SwarmThread thread={swarmThread} />}

        {/* Message text */}
        <div
          style={{
            fontSize: "14px",
            color: "var(--text-primary)",
            lineHeight: "1.7",
            whiteSpace: "pre-wrap",
          }}
        >
          {message.content}
        </div>

        {/* Hover actions */}
        <div
          className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transitionDuration: "150ms" }}
        >
          <button
            onClick={handleCopy}
            className="flex items-center justify-center rounded-md transition-colors"
            style={{
              width: "28px",
              height: "28px",
              color: copied
                ? "var(--green-primary)"
                : "var(--text-tertiary)",
            }}
            onMouseEnter={(e) => {
              if (!copied)
                e.currentTarget.style.color = "var(--text-secondary)";
            }}
            onMouseLeave={(e) => {
              if (!copied)
                e.currentTarget.style.color = "var(--text-tertiary)";
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            className="flex items-center justify-center rounded-md transition-colors"
            style={{
              width: "28px",
              height: "28px",
              color: "var(--text-tertiary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-tertiary)";
            }}
          >
            <ThumbsUp size={14} />
          </button>
          <button
            className="flex items-center justify-center rounded-md transition-colors"
            style={{
              width: "28px",
              height: "28px",
              color: "var(--text-tertiary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-tertiary)";
            }}
          >
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
