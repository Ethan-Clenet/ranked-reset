"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { GameWithSeasons, getSeasonStatus, getProgressPercent } from "@/lib/types";
import Countdown from "./Countdown";
import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";

interface GameCardProps {
  game: GameWithSeasons;
  index: number;
}

export default function GameCard({ game, index }: GameCardProps) {
  const currentSeason = game.seasons.find((s) => {
    const status = getSeasonStatus(s.startDate, s.endDate);
    return status === "active";
  });

  const nextSeason = game.seasons.find((s) => {
    const status = getSeasonStatus(s.startDate, s.endDate);
    return status === "upcoming";
  });

  const displaySeason = currentSeason || nextSeason;

  if (!displaySeason) return null;

  const status = getSeasonStatus(displaySeason.startDate, displaySeason.endDate);
  const progress = status === "active" ? getProgressPercent(displaySeason.startDate, displaySeason.endDate) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 hover:border-zinc-700 transition-all duration-300"
      style={{
        boxShadow: `0 0 0 0 ${game.color}00`,
      }}
      whileHover={{
        boxShadow: `0 0 30px -10px ${game.color}40`,
        borderColor: `${game.color}40`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${game.color}20` }}
          >
            {game.icon || "🎮"}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{game.name}</h3>
            <p className="text-sm text-zinc-400">{displaySeason.name}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Progress */}
      {status === "active" && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span>{format(new Date(displaySeason.startDate), "d MMM", { locale: fr })}</span>
            <span>{progress}%</span>
            <span>{format(new Date(displaySeason.endDate), "d MMM", { locale: fr })}</span>
          </div>
          <ProgressBar percent={progress} color={game.color} />
        </div>
      )}

      {/* Countdown */}
      <div className="mt-2">
        {status === "active" && (
          <Countdown
            targetDate={displaySeason.endDate}
            label="Reset dans"
            color={game.color}
          />
        )}
        {status === "upcoming" && (
          <Countdown
            targetDate={displaySeason.startDate}
            label="Début dans"
            color={game.color}
          />
        )}
      </div>

      {/* Next season hint */}
      {currentSeason && nextSeason && (
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            Prochaine saison : <span className="text-zinc-400">{nextSeason.name}</span>
            {" — "}
            {format(new Date(nextSeason.startDate), "d MMMM yyyy", { locale: fr })}
          </p>
        </div>
      )}
    </motion.div>
  );
}
