"use client";

import { useState, useEffect, useCallback } from "react";
import { StoredRank } from "./ranks";

const STORAGE_PREFIX = "ranked_reset_rank_";

interface UseRankOptions {
  gameSlug: string;
  gameId: number;
  userId?: string | null; // from session — if set, use API
}

export function useRank({ gameSlug, gameId, userId }: UseRankOptions) {
  const localKey = `${STORAGE_PREFIX}${gameSlug}`;
  const [rank, setRankState] = useState<StoredRank | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load rank on mount
  useEffect(() => {
    if (userId) {
      // Fetch from API
      fetch("/api/ranks")
        .then((r) => r.json())
        .then((data) => {
          const r = data.ranks?.[gameId];
          if (r) setRankState(r);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      // Fallback to localStorage
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) setRankState(JSON.parse(raw) as StoredRank);
      } catch {
        // ignore
      }
      setLoaded(true);
    }
  }, [userId, gameId, localKey]);

  const setRank = useCallback(
    (value: StoredRank | null) => {
      setRankState(value);

      if (userId) {
        // Save to API
        fetch("/api/ranks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId,
            tierId: value?.tierId ?? null,
            division: value?.division,
          }),
        }).catch(() => {
          // silent fail
        });
      } else {
        // Fallback to localStorage
        try {
          if (value) {
            localStorage.setItem(localKey, JSON.stringify(value));
          } else {
            localStorage.removeItem(localKey);
          }
        } catch {
          // storage full
        }
      }
    },
    [userId, gameId, localKey],
  );

  return { rank, setRank, loaded };
}
