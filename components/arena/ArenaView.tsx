"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ArenaAgent, Particle } from "@/lib/types";
import {
  ARENA_AGENTS,
  ARENA_CONNECTIONS,
  ARENA_STEPS,
} from "@/lib/mock-data";
import { ArenaCanvas } from "./ArenaCanvas";
import { AgentNode } from "./AgentNode";
import { ArenaFeed } from "./ArenaFeed";

interface ArenaViewProps {
  conversationId: string;
  onClose: () => void;
}

function deepCloneAgents(agents: readonly ArenaAgent[]): ArenaAgent[] {
  return agents.map((a) => ({
    ...a,
    position: { ...a.position },
  }));
}

function initParticles(): Particle[] {
  const particles: Particle[] = [];
  let id = 0;
  for (const [fromId, toId] of ARENA_CONNECTIONS) {
    const fromAgent = ARENA_AGENTS.find((a) => a.id === fromId);
    const color = fromAgent?.color || "#7F77DD";
    // Two particles per connection, staggered
    for (let s = 0; s < 2; s++) {
      particles.push({
        id: `p-${id++}`,
        fromAgent: fromId,
        toAgent: toId,
        color,
        progress: s * 0.5,
        speed: 0.002 + Math.random() * 0.002,
        size: 2 + Math.random(),
      });
    }
  }
  return particles;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ArenaView({ conversationId, onClose }: ArenaViewProps) {
  const [agents, setAgents] = useState<ArenaAgent[]>(() =>
    deepCloneAgents(ARENA_AGENTS)
  );
  const [activeStep, setActiveStep] = useState(-1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const agentsRef = useRef<ArenaAgent[]>(deepCloneAgents(ARENA_AGENTS));
  const particlesRef = useRef<Particle[]>(initParticles());
  const connectionsRef = useRef<[string, string][]>([...ARENA_CONNECTIONS]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateAgent = useCallback(
    (stepIndex: number) => {
      const step = ARENA_STEPS[stepIndex];
      if (!step) return;

      // Update ref (for canvas)
      const refAgents = agentsRef.current;
      const refAgent = refAgents.find((a) => a.id === step.agentId);
      if (refAgent) {
        refAgent.currentStatus = step.statusText;
        refAgent.currentBadge = step.badgeText;
        refAgent.badgeStatus = step.badgeStatus;
      }

      // Update React state (for AgentNode cards)
      setAgents((prev) =>
        prev.map((a) =>
          a.id === step.agentId
            ? {
                ...a,
                currentStatus: step.statusText,
                currentBadge: step.badgeText,
                badgeStatus: step.badgeStatus,
              }
            : a
        )
      );
      setActiveStep(stepIndex);

      // Step sequence complete
    },
    []
  );

  // Mount: schedule step sequence + elapsed timer
  useEffect(() => {
    for (let i = 0; i < ARENA_STEPS.length; i++) {
      const t = setTimeout(() => updateAgent(i), ARENA_STEPS[i].delay);
      timeoutsRef.current.push(t);
    }

    return () => {
      for (const t of timeoutsRef.current) clearTimeout(t);
      timeoutsRef.current = [];
    };
  }, [updateAgent]);

  // ResizeObserver for canvas container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setCanvasSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSend = useCallback((message: string) => {
    // Mock: no-op for now, could add to a feed
    console.log("Arena message:", message);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Canvas area */}
      <div
        ref={containerRef}
        className="flex-1 relative arena-canvas-bg overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <ArenaCanvas
          agentsRef={agentsRef}
          particlesRef={particlesRef}
          connectionsRef={connectionsRef}
        />
        {agents.map((agent) => (
          <AgentNode
            key={agent.id}
            agent={agent}
            canvasWidth={canvasSize.width}
            canvasHeight={canvasSize.height}
          />
        ))}
      </div>

      {/* Feed area */}
      <ArenaFeed
        steps={ARENA_STEPS}
        activeStep={activeStep}
        agents={agents}
        onSend={handleSend}
      />
    </div>
  );
}
