"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { GameWithSeasons, getSeasonStatus, getProgressPercent } from "@/lib/types";
import { getRankDef } from "@/lib/ranks";
import { useRank } from "@/lib/useRank";
import Countdown from "./Countdown";
import ProgressBar from "./ProgressBar";
import RankSelector from "./RankSelector";

interface GameCardProps {
  game: GameWithSeasons;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function GameCard({ game, index, isFavorite, onToggleFavorite }: GameCardProps) {
  const { t, dateFnsLocale } = useI18n();
  const { data: session } = useSession();
  const rankDef = getRankDef(game.slug);
  const { rank, setRank, loaded } = useRank({
    gameSlug: game.slug,
    gameId: game.id,
    userId: session?.user?.id,
  });

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
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl overflow-hidden"
            style={{ backgroundColor: `${game.color}20` }}
          >
            {game.icon?.startsWith("/") ? (
              <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
            ) : (
              game.icon || "🎮"
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{game.name}</h3>
            <p className="text-sm text-zinc-400">{displaySeason.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            title={isFavorite ? t("card.removeFromFavorites") : t("card.addToFavorites")}
          >
            {isFavorite ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
          </button>
          {rankDef && loaded && (
            <RankSelector
              rankDef={rankDef}
              value={rank}
              onChange={setRank}
              color={game.color}
            />
          )}
        </div>
      </div>

      {/* Progress */}
      {status === "active" && (
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs text-zinc-500">
              {format(new Date(displaySeason.startDate), "d MMM", { locale: dateFnsLocale })}
            </span>
            <span
              className="text-lg font-bold tabular-nums"
              style={{ color: game.color }}
            >
              {progress}%
            </span>
            <span className="text-xs text-zinc-500">
              {format(new Date(displaySeason.endDate), "d MMM", { locale: dateFnsLocale })}
            </span>
          </div>
          <ProgressBar percent={progress} color={game.color} />
        </div>
      )}

      {/* Countdown */}
      <div className="mt-2">
        {status === "active" && (
          <Countdown
            targetDate={displaySeason.endDate}
            label={t("card.resetIn")}
            color={game.color}
          />
        )}
        {status === "upcoming" && (
          <Countdown
            targetDate={displaySeason.startDate}
            label={t("card.startsIn")}
            color={game.color}
          />
        )}
      </div>

      {/* Next season hint */}
      {currentSeason && nextSeason && (
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            {t("card.nextSeason")} : <span className="text-zinc-400">{nextSeason.name}</span>
            {" — "}
            {format(new Date(nextSeason.startDate), "d MMMM yyyy", { locale: dateFnsLocale })}
          </p>
        </div>
      )}
    </motion.div>
  );
}
