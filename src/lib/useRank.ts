"use client";

import { useState, useEffect, useCallback } from "react";
import { StoredRank } from "./ranks";

const STORAGE_PREFIX = "ranked_reset_rank_";

export function useRank(gameSlug: string) {
  const key = `${STORAGE_PREFIX}${gameSlug}`;
  const [rank, setRankState] = useState<StoredRank | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setRankState(JSON.parse(raw) as StoredRank);
      }
    } catch {
      // ignore corrupted data
    }
    setLoaded(true);
  }, [key]);

  const setRank = useCallback(
    (value: StoredRank | null) => {
      setRankState(value);
      try {
        if (value) {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.removeItem(key);
        }
      } catch {
        // storage full or blocked
      }
    },
    [key],
  );

  return { rank, setRank, loaded };
}
