"use client";

import { useRef, useEffect, useCallback } from "react";
import type { ArenaAgent, Particle } from "@/lib/types";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

interface ArenaCanvasProps {
  agentsRef: React.RefObject<ArenaAgent[]>;
  particlesRef: React.RefObject<Particle[]>;
  connectionsRef: React.RefObject<[string, string][]>;
}

export function ArenaCanvas({
  agentsRef,
  particlesRef,
  connectionsRef,
}: ArenaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const phaseOffsetsRef = useRef<Record<string, number>>({});
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // Initialize phase offsets once
  const getPhaseOffset = useCallback((agentId: string) => {
    if (!phaseOffsetsRef.current[agentId]) {
      phaseOffsetsRef.current[agentId] = Math.random() * Math.PI * 2;
    }
    return phaseOffsetsRef.current[agentId];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Resize handler
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        sizeRef.current = { w: width, h: height };
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });
    ro.observe(container);

    function draw() {
      const agents = agentsRef.current;
      const particles = particlesRef.current;
      const connections = connectionsRef.current;
      if (!agents || !particles || !connections || !ctx) return;

      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const time = (performance.now() - startTimeRef.current) / 1000;

      // 1. Background grid
      ctx.strokeStyle = "rgba(127, 119, 221, 0.035)";
      ctx.lineWidth = 0.5;
      const spacing = 40;
      for (let x = 0; x <= w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Build agent position map
      const agentMap: Record<string, ArenaAgent> = {};
      for (const a of agents) {
        agentMap[a.id] = a;
      }

      // 2. Connection lines
      for (const [fromId, toId] of connections) {
        const from = agentMap[fromId];
        const to = agentMap[toId];
        if (!from || !to) continue;

        const fx = from.position.rx * w;
        const fy = from.position.ry * h;
        const tx = to.position.rx * w;
        const ty = to.position.ry * h;

        const [r, g, b] = hexToRgb(from.color);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }

      // 3. Particles
      for (const p of particles) {
        const from = agentMap[p.fromAgent];
        const to = agentMap[p.toAgent];
        if (!from || !to) continue;

        const fx = from.position.rx * w;
        const fy = from.position.ry * h;
        const tx = to.position.rx * w;
        const ty = to.position.ry * h;

        const px = fx + (tx - fx) * p.progress;
        const py = fy + (ty - fy) * p.progress;

        const trailProgress = Math.max(0, p.progress - 0.08);
        const trailX = fx + (tx - fx) * trailProgress;
        const trailY = fy + (ty - fy) * trailProgress;

        const [r, g, b] = hexToRgb(p.color);

        // Trail
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
        ctx.lineWidth = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Dot
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Advance particle
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      }

      // 4. Agent node circles
      for (const agent of agents) {
        const cx = agent.position.rx * w;
        const cy = agent.position.ry * h;
        const [r, g, b] = hexToRgb(agent.color);
        const phaseOffset = getPhaseOffset(agent.id);
        const pulseScale =
          1 + Math.sin(time * 1.5 + phaseOffset) * 0.055;

        // Outer glow ring
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.07)`;
        ctx.beginPath();
        ctx.arc(cx, cy, agent.radius * 1.9 * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Mid ring
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.11)`;
        ctx.beginPath();
        ctx.arc(cx, cy, agent.radius * 1.4 * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Node fill
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.16)`;
        ctx.beginPath();
        ctx.arc(cx, cy, agent.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.65)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, agent.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Label text
        const fontSize = agent.id === "core" ? 11 : 9;
        ctx.font = `500 ${fontSize}px Inter, -apple-system, sans-serif`;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(agent.shortLabel, cx, cy);
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [agentsRef, particlesRef, connectionsRef, getPhaseOffset]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
