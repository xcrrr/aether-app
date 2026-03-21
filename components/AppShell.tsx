"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "@/lib/types";
import {
  mockConversation,
  chatHistory,
  cannedResponse,
} from "@/lib/mock-data";
import { Sidebar } from "./ui/Sidebar";
import { Topbar } from "./ui/Topbar";
import { ChatMessage } from "./ui/ChatMessage";
import { ChatInput } from "./ui/ChatInput";
import { EmptyState } from "./ui/EmptyState";
import { TypingIndicator } from "./ui/TypingIndicator";

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >("conv-1");
  const [messages, setMessages] = useState<Message[]>(
    mockConversation.messages
  );
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Responsive: auto-collapse on narrow viewports
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setSidebarCollapsed(true);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleSend = useCallback(
    (content: string) => {
      if (isTyping) return;

      const userMessage: Message = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMessage]);

      // If we were in empty state, activate a conversation
      if (!activeConversationId) {
        setActiveConversationId("conv-new");
      }

      // Show typing indicator, then add canned response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            ...cannedResponse,
            id: `msg-aether-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
          },
        ]);
      }, 600);
    },
    [isTyping, activeConversationId]
  );

  const handleNewChat = useCallback(() => {
    setActiveConversationId(null);
    setMessages([]);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    if (id === "conv-1") {
      setMessages(mockConversation.messages);
    } else {
      setMessages([]);
    }
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      handleSend(suggestion);
    },
    [handleSend]
  );

  const showEmptyState =
    !activeConversationId ||
    (messages.length === 0 && !isTyping);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        chatHistory={chatHistory}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />

        {/* Chat area */}
        {showEmptyState ? (
          <div className="flex-1 overflow-hidden">
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          </div>
        ) : (
          <div
            ref={messageAreaRef}
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className="mx-auto"
              style={{
                maxWidth: "720px",
                padding: "24px 20px",
              }}
            >
              <div className="flex flex-col gap-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    swarmThread={
                      message.role === "aether"
                        ? mockConversation.swarmThreads[message.id]
                        : undefined
                    }
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* Input area */}
        <div
          className="flex-shrink-0 mx-auto w-full"
          style={{
            maxWidth: "720px",
            padding: "0 20px",
          }}
        >
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
