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
  /** How to display divisions: "roman" (I–IV) for LoL/TFT, "numeric" for Valorant/OW */
  divisionFormat?: "roman" | "numeric";
  /** Order in dropdown: "desc" = worst first (LoL IV→I, Valorant 3→1), "asc" = best first (OW 1→5) */
  divisionOrder?: "asc" | "desc";
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

// TFT uses the same tiers as LoL
const TFT_RANKS: RankDef = LOL_RANKS;

// Valorant: 9 tiers, 3 divisions each (1–3), Radiant has no division
const VALORANT_RANKS: RankDef = {
  divisionFormat: "numeric",
  tiers: [
    { id: "iron",      label: "Iron",      color: "#6B6B6B", divisions: 3 },
    { id: "bronze",    label: "Bronze",    color: "#8C5A3C", divisions: 3 },
    { id: "silver",    label: "Silver",     color: "#8C9AA0", divisions: 3 },
    { id: "gold",      label: "Gold",      color: "#CBB765", divisions: 3 },
    { id: "platinum",  label: "Platinum",   color: "#4E9E8E", divisions: 3 },
    { id: "diamond",   label: "Diamond",    color: "#6891D6", divisions: 3 },
    { id: "ascendant", label: "Ascendant", color: "#1FBEAB", divisions: 3 },
    { id: "immortal",  label: "Immortal",   color: "#B5452A", divisions: 3 },
    { id: "radiant",   label: "Radiant",    color: "#FFD700", divisions: 0 },
  ],
};

// Overwatch 2 — couleurs type in-game / guides (ex. fireteam.fr)
// Bronze → Silver → Gold → Platinum → Diamond → Master → Grandmaster → Champion (5→1) + Top 500
const OVERWATCH_RANKS: RankDef = {
  divisionFormat: "numeric",
  divisionOrder: "asc",
  tiers: [
    { id: "bronze",      label: "Bronze",      color: "#CD7F32", divisions: 5 },
    { id: "silver",      label: "Silver",      color: "#C0C0C0", divisions: 5 },
    { id: "gold",        label: "Gold",        color: "#FFD700", divisions: 5 },
    { id: "platinum",    label: "Platinum",    color: "#00CED1", divisions: 5 },
    { id: "diamond",     label: "Diamond",     color: "#4EE2EC", divisions: 5 },
    { id: "master",      label: "Master",      color: "#9D4EDD", divisions: 5 },
    { id: "grandmaster", label: "Grandmaster", color: "#E04040", divisions: 5 },
    { id: "champion",    label: "Champion",    color: "#FF8C00", divisions: 5 },
    { id: "top500",      label: "Top 500",     color: "#FFD700", divisions: 0 },
  ],
};

// Marvel Rivals — 9 rangs : Bronze → Silver → Gold → Platinum → Diamond → Grandmaster → Celestial (III→I) + Eternity + One Above All
const MARVEL_RIVALS_RANKS: RankDef = {
  divisionFormat: "roman",
  divisionOrder: "desc", // III, II, I (3 = moins bon, 1 = meilleur)
  tiers: [
    { id: "bronze",      label: "Bronze",      color: "#CD7F32", divisions: 3 },
    { id: "silver",      label: "Silver",      color: "#C0C0C0", divisions: 3 },
    { id: "gold",        label: "Gold",        color: "#FFD700", divisions: 3 },
    { id: "platinum",    label: "Platinum",    color: "#00CED1", divisions: 3 },
    { id: "diamond",     label: "Diamond",     color: "#4EE2EC", divisions: 3 },
    { id: "grandmaster", label: "Grandmaster", color: "#E04040", divisions: 3 },
    { id: "celestial",   label: "Celestial",   color: "#9D4EDD", divisions: 3 },
    { id: "eternity",    label: "Eternity",    color: "#FFD700", divisions: 0 },
    { id: "oneaboveall", label: "One Above All", color: "#FFFFFF", divisions: 0 },
  ],
};

// Rocket League — 8 paliers, 4 divisions (I–IV, IV = meilleur) sauf Supersonic Legend
const ROCKET_LEAGUE_RANKS: RankDef = {
  divisionFormat: "roman",
  tiers: [
    { id: "bronze",        label: "Bronze",          color: "#CD7F32", divisions: 4 },
    { id: "silver",        label: "Silver",          color: "#C0C0C0", divisions: 4 },
    { id: "gold",          label: "Gold",            color: "#FFD700", divisions: 4 },
    { id: "platinum",      label: "Platinum",        color: "#00CED1", divisions: 4 },
    { id: "diamond",       label: "Diamond",         color: "#4EE2EC", divisions: 4 },
    { id: "champion",      label: "Champion",        color: "#9D4EDD", divisions: 4 },
    { id: "grandchampion", label: "Grand Champion",  color: "#FF8C00", divisions: 4 },
    { id: "ssl",           label: "Supersonic Legend", color: "#FFD700", divisions: 0 },
  ],
};

// Rainbow Six Siege — Copper → Champion, 5 divisions (V→I), Champion sans divisions
const R6_RANKS: RankDef = {
  divisionFormat: "roman",
  divisionOrder: "desc",
  tiers: [
    { id: "copper",    label: "Copper",    color: "#A97142", divisions: 5 },
    { id: "bronze",    label: "Bronze",    color: "#CD7F32", divisions: 5 },
    { id: "silver",    label: "Silver",    color: "#C0C0C0", divisions: 5 },
    { id: "gold",      label: "Gold",      color: "#FFD700", divisions: 5 },
    { id: "platinum",  label: "Platinum",  color: "#00CED1", divisions: 5 },
    { id: "emerald",   label: "Emerald",   color: "#50C878", divisions: 5 },
    { id: "diamond",   label: "Diamond",   color: "#4EE2EC", divisions: 5 },
    { id: "champion",  label: "Champion",  color: "#E04040", divisions: 0 },
  ],
};

// Fortnite — Bronze → Unreal, 3 divisions (I–III) puis paliers sans divisions
const FORTNITE_RANKS: RankDef = {
  divisionFormat: "roman",
  divisionOrder: "desc",
  tiers: [
    { id: "bronze",   label: "Bronze",   color: "#CD7F32", divisions: 3 },
    { id: "silver",   label: "Silver",   color: "#C0C0C0", divisions: 3 },
    { id: "gold",     label: "Gold",     color: "#FFD700", divisions: 3 },
    { id: "platinum", label: "Platinum", color: "#00CED1", divisions: 3 },
    { id: "diamond",  label: "Diamond",  color: "#4EE2EC", divisions: 3 },
    { id: "elite",    label: "Elite",    color: "#9D4EDD", divisions: 0 },
    { id: "champion", label: "Champion", color: "#FF8C00", divisions: 0 },
    { id: "unreal",   label: "Unreal",   color: "#FFD700", divisions: 0 },
  ],
};

// Apex Legends — Rookie → Apex Predator, 4 divisions (IV–I) sauf Master / Predator
const APEX_RANKS: RankDef = {
  divisionFormat: "roman",
  divisionOrder: "desc",
  tiers: [
    { id: "rookie",   label: "Rookie",   color: "#808080", divisions: 4 },
    { id: "bronze",   label: "Bronze",   color: "#CD7F32", divisions: 4 },
    { id: "silver",   label: "Silver",   color: "#C0C0C0", divisions: 4 },
    { id: "gold",     label: "Gold",     color: "#FFD700", divisions: 4 },
    { id: "platinum", label: "Platinum", color: "#00CED1", divisions: 4 },
    { id: "diamond",  label: "Diamond",  color: "#4EE2EC", divisions: 4 },
    { id: "master",   label: "Master",   color: "#9D4EDD", divisions: 0 },
    { id: "predator", label: "Apex Predator", color: "#FF0000", divisions: 0 },
  ],
};

// Hearthstone — Bronze → Diamond (10 rangs), Legend sans divisions
const HEARTHSTONE_RANKS: RankDef = {
  divisionFormat: "numeric",
  divisionOrder: "desc",
  tiers: [
    { id: "bronze",   label: "Bronze",   color: "#CD7F32", divisions: 10 },
    { id: "silver",   label: "Silver",   color: "#C0C0C0", divisions: 10 },
    { id: "gold",     label: "Gold",     color: "#FFD700", divisions: 10 },
    { id: "platinum", label: "Platinum", color: "#00CED1", divisions: 10 },
    { id: "diamond",  label: "Diamond",  color: "#4EE2EC", divisions: 10 },
    { id: "legend",   label: "Legend",   color: "#FF8C00", divisions: 0 },
  ],
};

// Registry
const RANK_REGISTRY: Record<string, RankDef> = {
  "league-of-legends": LOL_RANKS,
  tft: TFT_RANKS,
  valorant: VALORANT_RANKS,
  "overwatch-2": OVERWATCH_RANKS,
  "marvel-rivals": MARVEL_RIVALS_RANKS,
  "rocket-league": ROCKET_LEAGUE_RANKS,
  "rainbow-six-siege": R6_RANKS,
  fortnite: FORTNITE_RANKS,
  "apex-legends": APEX_RANKS,
  hearthstone: HEARTHSTONE_RANKS,
};

export function getRankDef(slug: string): RankDef | undefined {
  return RANK_REGISTRY[slug];
}

// ---------------------------------------------------------------------------
// Stored rank value
// ---------------------------------------------------------------------------

export interface StoredRank {
  tierId: string;
  division?: number; // 1 = I, 2 = II, 3 = III, 4 = IV, 5 = V, ...
}

export function rankToLabel(rankDef: RankDef, stored: StoredRank): string {
  const tier = rankDef.tiers.find((t) => t.id === stored.tierId);
  if (!tier) return "";
  if (tier.divisions && stored.division) {
    const format = rankDef.divisionFormat ?? "roman";
    const divLabel =
      format === "numeric"
        ? String(stored.division)
        : (["I", "II", "III", "IV", "V"][stored.division - 1] ?? "");
    return `${tier.label} ${divLabel}`;
  }
  return tier.label;
}
