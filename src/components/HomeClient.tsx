"use client";

import { useState } from "react";
import { GameWithSeasons } from "@/lib/types";
import GameCard from "./GameCard";
import Timeline from "./Timeline";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "grid" | "timeline";

export default function HomeClient({ games }: { games: GameWithSeasons[] }) {
  const [view, setView] = useState<ViewMode>("grid");

  const activeGames = games.filter((g) => g.seasons.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero */}
      <div className="mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Calendrier des resets ranked
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-xl"
        >
          Retrouvez en un coup d&apos;oeil les dates de fin et de début de saison
          de tous vos jeux compétitifs préférés.
        </motion.p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">
            <span className="text-white font-semibold">{activeGames.length}</span> jeux suivis
          </span>
          <span className="text-sm text-zinc-500">
            <span className="text-white font-semibold">
              {games.reduce((acc, g) => acc + g.seasons.length, 0)}
            </span>{" "}
            saisons
          </span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              view === "grid"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Grille
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              view === "timeline"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 relative"
          >
            <Timeline games={activeGames} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {activeGames.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-white mb-2">Aucun jeu pour le moment</h3>
          <p className="text-zinc-400">Les données de saisons seront bientôt disponibles.</p>
        </div>
      )}
    </div>
  );
}
