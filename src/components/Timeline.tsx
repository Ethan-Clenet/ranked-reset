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

  const totalDays = Math.ceil((timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));

  function getLeftPercent(date: Date): number {
    const diff = Math.ceil((date.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (diff / totalDays) * 100));
  }

  function getWidthPercent(start: Date, end: Date): number {
    const clampedStart = start < timelineStart ? timelineStart : start;
    const clampedEnd = end > timelineEnd ? timelineEnd : end;
    const diff = Math.ceil((clampedEnd.getTime() - clampedStart.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0.5, (diff / totalDays) * 100);
  }

  const todayLeft = getLeftPercent(now);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Month headers */}
        <div className="relative h-8 mb-2 border-b border-zinc-800">
          {months.map((month, i) => {
            const monthStart = startOfMonth(month);
            const monthEnd = endOfMonth(month);
            const left = getLeftPercent(monthStart);
            const width = getWidthPercent(monthStart, monthEnd);
            const isCurrent = isWithinInterval(now, { start: monthStart, end: monthEnd });

            return (
              <div
                key={i}
                className="absolute top-0 text-xs uppercase tracking-wider"
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                <span className={isCurrent ? "text-white font-semibold" : "text-zinc-500"}>
                  {format(month, "MMM yyyy", { locale: fr })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Today marker */}
        <div
          className="absolute top-0 bottom-0 w-px bg-red-500/50 z-10"
          style={{ left: `${todayLeft}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-red-400 whitespace-nowrap">
            Aujourd&apos;hui
          </div>
        </div>

        {/* Game rows */}
        <div className="relative space-y-3 pt-2">
          {games.map((game, gameIdx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: gameIdx * 0.05 }}
              className="flex items-center gap-4"
            >
              {/* Game name */}
              <div className="w-32 shrink-0 flex items-center gap-2">
                <span className="text-base">{game.icon || "🎮"}</span>
                <span className="text-sm font-medium text-zinc-300 truncate">{game.name}</span>
              </div>

              {/* Timeline bar */}
              <div className="relative flex-1 h-8 bg-zinc-900 rounded-lg overflow-hidden">
                {game.seasons.map((season) => {
                  const start = new Date(season.startDate);
                  const end = new Date(season.endDate);
                  const status = getSeasonStatus(season.startDate, season.endDate);

                  if (end < timelineStart || start > timelineEnd) return null;

                  const left = getLeftPercent(start < timelineStart ? timelineStart : start);
                  const width = getWidthPercent(start, end);

                  return (
                    <motion.div
                      key={season.id}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: gameIdx * 0.05 + 0.2 }}
                      className="absolute top-1 bottom-1 rounded-md flex items-center justify-center text-[10px] font-medium text-white/80 overflow-hidden cursor-default"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: status === "ended" ? `${game.color}30` : `${game.color}80`,
                        transformOrigin: "left",
                        border: status === "active" ? `1px solid ${game.color}` : "none",
                      }}
                      title={`${season.name}: ${format(start, "d MMM", { locale: fr })} - ${format(end, "d MMM", { locale: fr })}`}
                    >
                      <span className="truncate px-1">{season.name}</span>
                    </motion.div>
                  );
                })}

                {/* Today line within row */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-red-500/60"
                  style={{ left: `${todayLeft}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
