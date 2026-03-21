export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
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

      <div className="flex flex-col gap-1">
        <span
          style={{
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--violet-light)",
          }}
        >
          Aether
        </span>
        <div className="flex items-center gap-1 py-2">
          <span
            className="typing-dot rounded-full"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "var(--text-tertiary)",
            }}
          />
          <span
            className="typing-dot rounded-full"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "var(--text-tertiary)",
            }}
          />
          <span
            className="typing-dot rounded-full"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "var(--text-tertiary)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
