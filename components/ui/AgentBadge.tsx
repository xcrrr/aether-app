interface AgentBadgeProps {
  name: string;
  color: string;
}

export function AgentBadge({ name, color }: AgentBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full"
      style={{
        backgroundColor: `${color}1f`,
        color: color,
        fontSize: "10px",
        fontWeight: 500,
      }}
    >
      <span
        className="rounded-full"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: color,
        }}
      />
      {name}
    </span>
  );
}
