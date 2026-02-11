// ---------------------------------------------------------------------------
// Rank definitions per game (slug-based)
// ---------------------------------------------------------------------------

export interface RankTier {
  id: string;
  label: string;
  color: string;       // accent colour for the badge
  divisions?: number;   // e.g. 4 divisions (IV → I) — 0 or undefined = no divisions
}

export interface RankDef {
  tiers: RankTier[];
}

// LoL rank tiers (2025-2026 system)
const LOL_RANKS: RankDef = {
  tiers: [
    { id: "iron",        label: "Iron",        color: "#6B6B6B", divisions: 4 },
    { id: "bronze",      label: "Bronze",      color: "#8C5A3C", divisions: 4 },
    { id: "silver",      label: "Silver",      color: "#8C9AA0", divisions: 4 },
    { id: "gold",        label: "Gold",        color: "#CBB765", divisions: 4 },
    { id: "platinum",    label: "Platinum",    color: "#4E9E8E", divisions: 4 },
    { id: "emerald",     label: "Emerald",     color: "#30A050", divisions: 4 },
    { id: "diamond",     label: "Diamond",     color: "#6891D6", divisions: 4 },
    { id: "master",      label: "Master",      color: "#9D48E0", divisions: 0 },
    { id: "grandmaster", label: "Grandmaster", color: "#E04848", divisions: 0 },
    { id: "challenger",  label: "Challenger",  color: "#F0C050", divisions: 0 },
  ],
};

// Registry — only LoL for now, easy to extend later
const RANK_REGISTRY: Record<string, RankDef> = {
  "league-of-legends": LOL_RANKS,
};

export function getRankDef(slug: string): RankDef | undefined {
  return RANK_REGISTRY[slug];
}

// ---------------------------------------------------------------------------
// Stored rank value
// ---------------------------------------------------------------------------

export interface StoredRank {
  tierId: string;
  division?: number; // 1 = I, 2 = II, 3 = III, 4 = IV
}

export function rankToLabel(rankDef: RankDef, stored: StoredRank): string {
  const tier = rankDef.tiers.find((t) => t.id === stored.tierId);
  if (!tier) return "";
  if (tier.divisions && stored.division) {
    const roman = ["I", "II", "III", "IV"][stored.division - 1] ?? "";
    return `${tier.label} ${roman}`;
  }
  return tier.label;
}
