import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { GameWithSeasons } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let games: GameWithSeasons[] = [];

  try {
    const data = await prisma.game.findMany({
      include: {
        seasons: {
          orderBy: { startDate: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    games = data.map((game) => ({
      ...game,
      seasons: game.seasons.map((s) => ({
        ...s,
        startDate: s.startDate.toISOString(),
        endDate: s.endDate.toISOString(),
      })),
    }));
  } catch {
    // DB not available yet — show empty state
    games = [];
  }

  return <HomeClient games={games} />;
}
