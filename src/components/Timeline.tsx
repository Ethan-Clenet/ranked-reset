"use client";

import { motion } from "framer-motion";
import { format, eachMonthOfInterval, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { GameWithSeasons, getSeasonStatus } from "@/lib/types";

interface TimelineProps {
  games: GameWithSeasons[];
}

export default function Timeline({ games }: TimelineProps) {
  // Calculate timeline range: 2 months before now to 6 months after
  const now = new Date();
  const timelineStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const timelineEnd = new Date(now.getFullYear(), now.getMonth() + 7, 0);
  const months = eachMonthOfInterval({ start: timelineStart, end: timelineEnd });

  const totalMs = timelineEnd.getTime() - timelineStart.getTime();

  function getLeftPercent(date: Date): number {
    const diff = date.getTime() - timelineStart.getTime();
    return Math.max(0, Math.min(100, (diff / totalMs) * 100));
  }

  function getWidthPercent(start: Date, end: Date): number {
    const clampedStart = start < timelineStart ? timelineStart : start;
    const clampedEnd = end > timelineEnd ? timelineEnd : end;
    const diff = clampedEnd.getTime() - clampedStart.getTime();
    return Math.max(0.5, (diff / totalMs) * 100);
  }

  const todayLeft = getLeftPercent(now);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* 
          Use a consistent layout: every row (months + game rows) is a flex 
          with a fixed w-36 label area + the timeline area.
          This ensures month headers and season bars are perfectly aligned.
        */}

        {/* "Aujourd'hui" label row */}
        <div className="flex gap-4 mb-1">
          <div className="w-36 shrink-0" />
          <div className="relative flex-1 h-4">
            <div
              className="absolute z-20"
              style={{ left: `${todayLeft}%`, transform: "translateX(-50%)" }}
            >
              <span className="text-[10px] font-medium text-red-400 whitespace-nowrap">Aujourd&apos;hui</span>
            </div>
          </div>
        </div>

        {/* Month headers row */}
        <div className="flex items-end gap-4 mb-2 border-b border-zinc-800 pb-2">
          {/* Spacer matching game label width */}
          <div className="w-36 shrink-0" />

          {/* Month labels */}
          <div className="relative flex-1 h-6">
            {months.map((month, i) => {
              const monthStart = startOfMonth(month);
              const left = getLeftPercent(monthStart);
              const isCurrent = isWithinInterval(now, { start: monthStart, end: endOfMonth(month) });

              return (
                <div
                  key={i}
                  className="absolute top-0 text-xs uppercase tracking-wider"
                  style={{ left: `${left}%` }}
                >
                  <span className={isCurrent ? "text-white font-semibold" : "text-zinc-500"}>
                    {format(month, "MMM yyyy", { locale: fr })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game rows — wrapped in relative for the today vertical line */}
        <div className="relative">
          {/* Today vertical line spanning all rows */}
          <div
            className="absolute top-0 bottom-0 w-px bg-red-500/40 z-10 pointer-events-none"
            style={{
              /* Offset for the label column: w-36 (144px) + gap-4 (16px) = 160px */
              left: `calc(160px + (100% - 160px) * ${todayLeft / 100})`,
            }}
          />

          <div className="space-y-3">
            {games.map((game, gameIdx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: gameIdx * 0.05 }}
                className="flex items-center gap-4"
              >
                {/* Game name */}
                <div className="w-36 shrink-0 flex items-center gap-2">
                  {game.icon?.startsWith("/") ? (
                    <img src={game.icon} alt={game.name} className="w-5 h-5 rounded object-cover" />
                  ) : (
                    <span className="text-base">{game.icon || "🎮"}</span>
                  )}
                  <span className="text-sm font-medium text-zinc-300 truncate">{game.name}</span>
                </div>

                {/* Timeline bar */}
                <div className="relative flex-1 h-8 bg-zinc-900 rounded-lg overflow-hidden">
                  {game.seasons.map((season) => {
                    const start = new Date(season.startDate);
                    const end = new Date(season.endDate);
                    const status = getSeasonStatus(season.startDate, season.endDate);

                    // Skip seasons entirely outside the timeline range
                    if (end < timelineStart || start > timelineEnd) return null;

                    const left = getLeftPercent(start < timelineStart ? timelineStart : start);
                    const width = getWidthPercent(start, end);

                    return (
                      <motion.div
                        key={season.id}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: gameIdx * 0.05 + 0.2 }}
                        className="absolute top-1 bottom-1 rounded-md flex items-center justify-center text-[10px] font-medium text-white/90 overflow-hidden cursor-default"
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          backgroundColor: status === "ended" ? `${game.color}30` : `${game.color}90`,
                          transformOrigin: "left",
                          border: status === "active" ? `1px solid ${game.color}` : "none",
                        }}
                        title={`${season.name}: ${format(start, "d MMM yyyy", { locale: fr })} → ${format(end, "d MMM yyyy", { locale: fr })}`}
                      >
                        <span className="truncate px-1">{season.name}</span>
                      </motion.div>
                    );
                  })}

                  {/* Today line within this row */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-red-500/60 z-10"
                    style={{ left: `${todayLeft}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
