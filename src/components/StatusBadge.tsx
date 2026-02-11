import { SeasonStatus } from "@/lib/types";

const statusConfig: Record<SeasonStatus, { label: string; className: string }> = {
  active: {
    label: "En cours",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  upcoming: {
    label: "A venir",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  ended: {
    label: "Terminé",
    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  },
};

export default function StatusBadge({ status }: { status: SeasonStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${config.className}`}>
      {config.label}
    </span>
  );
}
