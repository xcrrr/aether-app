interface TrustBadgeProps {
  score: number;
  status: "approved" | "rejected" | "warning";
}

const statusColors = {
  approved: {
    bg: "var(--green-tint)",
    text: "var(--green-primary)",
  },
  rejected: {
    bg: "var(--red-tint)",
    text: "var(--red-primary)",
  },
  warning: {
    bg: "var(--amber-tint)",
    text: "var(--amber-primary)",
  },
};

export function TrustBadge({ score, status }: TrustBadgeProps) {
  const colors = statusColors[status];

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: "10px",
        fontWeight: 500,
      }}
    >
      {score}
    </span>
  );
}
