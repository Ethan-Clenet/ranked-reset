"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const STORAGE_KEY = "ranked_reset_favorites";

export function useFavorites() {
  const { data: session } = useSession();
  const [favoriteGameIds, setFavoriteGameIds] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/favorites")
        .then((r) => r.json())
        .then((data) => {
          setFavoriteGameIds(new Set(data.gameIds ?? []));
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const arr = raw ? (JSON.parse(raw) as number[]) : [];
        setFavoriteGameIds(new Set(Array.isArray(arr) ? arr : []));
      } catch {
        setFavoriteGameIds(new Set());
      }
      setLoaded(true);
    }
  }, [session?.user?.id]);

  const toggle = useCallback(
    (gameId: number) => {
      setFavoriteGameIds((prev) => {
        const next = new Set(prev);
        if (next.has(gameId)) {
          next.delete(gameId);
        } else {
          next.add(gameId);
        }
        if (!session?.user?.id) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
          } catch {
            // ignore
          }
        }
        return next;
      });

      if (session?.user?.id) {
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId }),
        }).catch(() => {});
      }
    },
    [session?.user?.id],
  );

  const isFavorite = useCallback(
    (gameId: number) => favoriteGameIds.has(gameId),
    [favoriteGameIds],
  );

  return { favoriteGameIds, isFavorite, toggle, loaded };
}
