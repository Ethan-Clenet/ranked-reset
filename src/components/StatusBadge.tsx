"use client";

import { SeasonStatus } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const statusStyles: Record<SeasonStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  upcoming: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ended: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

const statusKeys: Record<SeasonStatus, string> = {
  active: "status.active",
  upcoming: "status.upcoming",
  ended: "status.ended",
};

export default function StatusBadge({ status }: { status: SeasonStatus }) {
  const { t } = useI18n();
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles[status]}`}>
      {t(statusKeys[status])}
    </span>
  );
}
