"use client";

const RADIUS_TOKENS: { label: string; variable: string; value: string }[] = [
  { label: "sm", variable: "--radius-sm", value: "6px" },
  { label: "md", variable: "--radius-md", value: "8px" },
  { label: "lg", variable: "--radius-lg", value: "12px" },
  { label: "xl", variable: "--radius-xl", value: "16px" },
];

const SWATCHES: { label: string; variable: string; hex: string }[] = [
  { label: "Background Base", variable: "--bg-base", hex: "#2b2b2b" },
  { label: "Background Sidebar", variable: "--bg-sidebar", hex: "#272727" },
  { label: "Background Surface", variable: "--bg-surface", hex: "#323232" },
  { label: "Violet Primary", variable: "--violet-primary", hex: "#7F77DD" },
  { label: "Violet Dark", variable: "--violet-dark", hex: "#534AB7" },
  { label: "Violet Light", variable: "--violet-light", hex: "#AFA9EC" },
  { label: "Agent Blue", variable: "--agent-alpha1", hex: "#378ADD" },
  { label: "Green (success)", variable: "--green-primary", hex: "#27C36A" },
  { label: "Red (error)", variable: "--red-primary", hex: "#E24B4A" },
  { label: "Amber (warning)", variable: "--amber-primary", hex: "#EF9F27" },
];

export function AppInfoCard() {
  const red = "var(--red-primary)";

  return (
    <div
      style={{
        border: "1px solid var(--red-primary)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        maxWidth: "640px",
        width: "100%",
        background: "var(--red-tint)",
        color: red,
        fontFamily: "inherit",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "12px",
          color: red,
          letterSpacing: "0.01em",
        }}
      >
        ◈ Aether — Sovereign AI Chat
      </h2>

      {/* What is it */}
      <section style={{ marginBottom: "16px" }}>
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px",
            color: red,
            opacity: 0.75,
          }}
        >
          What is it?
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.6", color: red }}>
          Aether is a Next.js 14 application that provides a sovereign,
          privacy-focused AI chat experience. It supports multi-agent{" "}
          <em>swarm intelligence</em> — multiple AI agents collaborate
          step-by-step on a single response, exposing their reasoning chain. An{" "}
          <em>Arena view</em> visualises the live data-flow between agents as an
          SVG node graph. Trust badges rate each agent action as approved,
          rejected, or flagged.
        </p>
      </section>

      {/* Tech stack */}
      <section style={{ marginBottom: "16px" }}>
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px",
            color: red,
            opacity: 0.75,
          }}
        >
          Technology Stack
        </h3>
        <ul
          style={{
            fontSize: "13px",
            lineHeight: "1.8",
            color: red,
            paddingLeft: "16px",
            listStyleType: "disc",
          }}
        >
          <li>
            <strong>Next.js 14</strong> — App Router, server &amp; client
            components
          </li>
          <li>
            <strong>React 18</strong> — UI library
          </li>
          <li>
            <strong>TypeScript 5</strong> — end-to-end type safety
          </li>
          <li>
            <strong>Tailwind CSS 3</strong> — utility-first styling with custom
            CSS variables
          </li>
          <li>
            <strong>Lucide React</strong> — icon set
          </li>
        </ul>
      </section>

      {/* Colour palette */}
      <section>
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
            color: red,
            opacity: 0.75,
          }}
        >
          Colour Palette
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "8px",
          }}
        >
          {SWATCHES.map(({ label, variable, hex }) => (
            <div
              key={variable}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px",
                  background: hex,
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
              <div>
                <div
                  style={{ fontSize: "11px", fontWeight: 600, color: red }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: red,
                    opacity: 0.6,
                    fontFamily: "monospace",
                  }}
                >
                  {hex}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border-radius tokens */}
      <section style={{ marginTop: "16px" }}>
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
            color: red,
            opacity: 0.75,
          }}
        >
          Border-Radius Tokens
        </h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {RADIUS_TOKENS.map(({ label, variable, value }) => (
            <div key={variable} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1.5px solid var(--red-primary)",
                  borderRadius: value,
                  marginBottom: "4px",
                }}
              />
              <div style={{ fontSize: "11px", fontWeight: 600, color: red }}>
                {label}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: red,
                  opacity: 0.6,
                  fontFamily: "monospace",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
