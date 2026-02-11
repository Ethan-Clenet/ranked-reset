import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter }) as unknown as PrismaClient;

interface ValorantSeason {
  uuid: string;
  displayName: string;
  title: string | null;
  type: string | null;
  startTime: string;
  endTime: string;
  parentUuid: string | null;
}

async function syncValorant() {
  console.log("Fetching Valorant seasons from valorant-api.com...");

  const res = await fetch("https://valorant-api.com/v1/seasons");
  const json = await res.json();
  const seasons: ValorantSeason[] = json.data;

  // Filter only Acts (type = "EAresSeasonType::Act") — skip Episodes/parent seasons
  const acts = seasons.filter((s) => s.type === "EAresSeasonType::Act");

  // Find parent season names for naming (V25, V26, EPISODE X, etc.)
  const parents = new Map<string, string>();
  for (const s of seasons) {
    if (!s.type && !s.parentUuid) {
      parents.set(s.uuid, s.displayName);
    }
  }

  // Find or create the Valorant game entry
  let game = await prisma.game.findUnique({ where: { slug: "valorant" } });
  if (!game) {
    game = await prisma.game.create({
      data: {
        name: "Valorant",
        slug: "valorant",
        icon: "/icons/valorant.png",
        color: "#FF4655",
      },
    });
    console.log("Created Valorant game entry.");
  }

  // Delete existing Valorant seasons
  await prisma.season.deleteMany({ where: { gameId: game.id } });

  const now = new Date();

  // Build season entries
  const seasonData = acts.map((act) => {
    const parentName = act.parentUuid ? parents.get(act.parentUuid) ?? "" : "";
    const name = parentName
      ? `${parentName} ${act.displayName}`
      : act.displayName;

    const startDate = new Date(act.startTime);
    const endDate = new Date(act.endTime);
    const isCurrent = startDate <= now && endDate > now;

    return {
      name,
      startDate,
      endDate,
      isCurrent,
      gameId: game!.id,
    };
  });

  await prisma.season.createMany({ data: seasonData });

  const currentSeason = seasonData.find((s) => s.isCurrent);
  console.log(`Synced ${seasonData.length} Valorant acts.`);
  if (currentSeason) {
    console.log(
      `Current act: ${currentSeason.name} (ends ${currentSeason.endDate.toISOString().split("T")[0]})`
    );
  }
}

syncValorant()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
