"use client";

import { useState, useRef, useCallback } from "react";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      const ta = e.target;
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      style={{
        padding: "12px 0 18px",
      }}
    >
      <div
        className="border-half flex items-end gap-2 transition-colors"
        style={{
          borderRadius: "14px",
          borderColor: "var(--border-default)",
          background: "rgba(255, 255, 255, 0.04)",
          padding: "10px 12px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--violet-border)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-default)";
        }}
      >
        {/* Left icons */}
        <button
          className="flex items-center justify-center flex-shrink-0 rounded-md transition-colors"
          style={{
            width: "30px",
            height: "30px",
            color: "var(--text-tertiary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-tertiary)";
          }}
        >
          <Paperclip size={16} />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 rounded-md transition-colors"
          style={{
            width: "30px",
            height: "30px",
            color: "var(--text-tertiary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-tertiary)";
          }}
        >
          <Mic size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Message Aether..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent outline-none"
          style={{
            fontSize: "13px",
            color: "var(--text-primary)",
            lineHeight: "1.5",
            maxHeight: "160px",
            overflowY: "auto",
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className="flex items-center justify-center flex-shrink-0 rounded-full transition-colors"
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: canSend
              ? "var(--violet-primary)"
              : "var(--bg-hover)",
            color: canSend ? "#fff" : "var(--text-tertiary)",
            cursor: canSend ? "pointer" : "default",
          }}
          onMouseEnter={(e) => {
            if (canSend)
              e.currentTarget.style.backgroundColor = "var(--violet-dark)";
          }}
          onMouseLeave={(e) => {
            if (canSend)
              e.currentTarget.style.backgroundColor = "var(--violet-primary)";
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>

      {/* Disclaimer */}
      <p
        className="text-center mt-2"
        style={{
          fontSize: "11px",
          color: "var(--text-tertiary)",
        }}
      >
        Aether can make mistakes.
      </p>
    </div>
  );
}
