export interface GameWithSeasons {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  seasons: SeasonData[];
}

export interface SeasonData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gameId: number;
}

export type SeasonStatus = "active" | "upcoming" | "ended";

export function getSeasonStatus(startDate: string, endDate: string): SeasonStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "active";
}

export function getProgressPercent(startDate: string, endDate: string): number {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const total = end - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}
