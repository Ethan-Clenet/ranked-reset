"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RankDef, StoredRank, rankToLabel } from "@/lib/ranks";
import { useI18n } from "@/lib/i18n";

interface RankSelectorProps {
  rankDef: RankDef;
  value: StoredRank | null;
  onChange: (rank: StoredRank | null) => void;
  color: string;
}

export default function RankSelector({ rankDef, value, onChange, color }: RankSelectorProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSelectedTier(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const currentLabel = value ? rankToLabel(rankDef, value) : null;
  const currentTier = value ? rankDef.tiers.find((t) => t.id === value.tierId) : null;

  function handleTierClick(tierId: string) {
    const tier = rankDef.tiers.find((t) => t.id === tierId);
    if (!tier) return;

    if (tier.divisions && tier.divisions > 0) {
      // Show division sub-menu
      setSelectedTier(tierId);
    } else {
      // No divisions — select directly
      onChange({ tierId });
      setOpen(false);
      setSelectedTier(null);
    }
  }

  function handleDivisionClick(tierId: string, division: number) {
    onChange({ tierId, division });
    setOpen(false);
    setSelectedTier(null);
  }

  function handleClear() {
    onChange(null);
    setOpen(false);
    setSelectedTier(null);
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => {
          setOpen(!open);
          setSelectedTier(null);
        }}
        className="flex items-center gap-1.5 text-xs rounded-lg px-2.5 py-1 border transition-all hover:brightness-110"
        style={{
          backgroundColor: currentTier ? `${currentTier.color}20` : `${color}10`,
          borderColor: currentTier ? `${currentTier.color}50` : `${color}30`,
          color: currentTier ? currentTier.color : "#a1a1aa",
        }}
      >
        {currentLabel ? (
          <>
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentTier?.color }}
            />
            <span className="font-semibold">{currentLabel}</span>
          </>
        ) : (
          <span>{t("rank.setRank")}</span>
        )}
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown — opens upward to avoid being clipped by cards below */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full mb-1 right-0 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Clear button if rank is set */}
            {value && (
              <button
                onClick={handleClear}
                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-zinc-800 transition-colors border-b border-zinc-800"
              >
                {t("rank.clear")}
              </button>
            )}

            {/* Tier list or division sub-list */}
            <div className="max-h-64 overflow-y-auto">
              {selectedTier ? (
                <>
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedTier(null)}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800 transition-colors flex items-center gap-1 border-b border-zinc-800"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    {t("rank.back")}
                  </button>
                  {/* Divisions IV → I */}
                  {(() => {
                    const tier = rankDef.tiers.find((t) => t.id === selectedTier);
                    if (!tier || !tier.divisions) return null;
                    const divs = Array.from({ length: tier.divisions }, (_, i) => i + 1).reverse();
                    const romans = ["I", "II", "III", "IV"];
                    return divs.map((div) => {
                      const isSelected = value?.tierId === tier.id && value?.division === div;
                      return (
                        <button
                          key={div}
                          onClick={() => handleDivisionClick(tier.id, div)}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                            isSelected ? "bg-zinc-800" : "hover:bg-zinc-800/60"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: tier.color }}
                          />
                          <span className="text-white font-medium">
                            {tier.label} {romans[div - 1]}
                          </span>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 ml-auto text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </button>
                      );
                    });
                  })()}
                </>
              ) : (
                rankDef.tiers.map((tier) => {
                  const isSelected = value?.tierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => handleTierClick(tier.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                        isSelected ? "bg-zinc-800" : "hover:bg-zinc-800/60"
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: tier.color }}
                      />
                      <span className="text-white font-medium">{tier.label}</span>
                      {tier.divisions ? (
                        <svg className="w-3 h-3 ml-auto text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      ) : isSelected ? (
                        <svg className="w-3.5 h-3.5 ml-auto text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : null}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
