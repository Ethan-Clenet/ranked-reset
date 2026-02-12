import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter }) as unknown as PrismaClient;

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.season.deleteMany();
  await prisma.game.deleteMany();

  // --- League of Legends ---
  const lol = await prisma.game.create({
    data: {
      name: "League of Legends",
      slug: "league-of-legends",
      icon: "/icons/league-of-legends.png",
      color: "#C89B3C",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "S15 Saison 1 — Welcome to Noxus", startDate: new Date("2025-01-09"), endDate: new Date("2025-04-28"), isCurrent: false, gameId: lol.id },
      { name: "S15 Saison 2 — Spirit Blossom Beyond", startDate: new Date("2025-04-30"), endDate: new Date("2025-08-26"), isCurrent: false, gameId: lol.id },
      { name: "S15 Saison 3 — Trials of Twilight", startDate: new Date("2025-08-27"), endDate: new Date("2026-01-07"), isCurrent: false, gameId: lol.id },
      { name: "S16 Saison 1 — For Demacia", startDate: new Date("2026-01-08"), endDate: new Date("2026-04-28"), isCurrent: true, gameId: lol.id },
      { name: "S16 Saison 2", startDate: new Date("2026-04-29"), endDate: new Date("2026-08-25"), isCurrent: false, gameId: lol.id },
      { name: "S16 Saison 3", startDate: new Date("2026-08-26"), endDate: new Date("2027-01-06"), isCurrent: false, gameId: lol.id },
    ],
  });

  // --- Valorant --- (dates from valorant-api.com/v1/seasons)
  const valorant = await prisma.game.create({
    data: {
      name: "Valorant",
      slug: "valorant",
      icon: "/icons/valorant.png",
      color: "#FF4655",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "V25 Act I", startDate: new Date("2025-01-08"), endDate: new Date("2025-03-05"), isCurrent: false, gameId: valorant.id },
      { name: "V25 Act II", startDate: new Date("2025-03-05"), endDate: new Date("2025-04-30"), isCurrent: false, gameId: valorant.id },
      { name: "V25 Act III", startDate: new Date("2025-04-30"), endDate: new Date("2025-06-25"), isCurrent: false, gameId: valorant.id },
      { name: "V25 Act IV", startDate: new Date("2025-06-25"), endDate: new Date("2025-08-20"), isCurrent: false, gameId: valorant.id },
      { name: "V25 Act V", startDate: new Date("2025-08-20"), endDate: new Date("2025-10-15"), isCurrent: false, gameId: valorant.id },
      { name: "V25 Act VI", startDate: new Date("2025-10-15"), endDate: new Date("2026-01-07"), isCurrent: false, gameId: valorant.id },
      { name: "V26 Act I", startDate: new Date("2026-01-07"), endDate: new Date("2026-03-18"), isCurrent: true, gameId: valorant.id },
      { name: "V26 Act II", startDate: new Date("2026-03-18"), endDate: new Date("2026-04-29"), isCurrent: false, gameId: valorant.id },
      { name: "V26 Act III", startDate: new Date("2026-04-29"), endDate: new Date("2026-06-24"), isCurrent: false, gameId: valorant.id },
      { name: "V26 Act IV", startDate: new Date("2026-06-24"), endDate: new Date("2026-08-19"), isCurrent: false, gameId: valorant.id },
      { name: "V26 Act V", startDate: new Date("2026-08-19"), endDate: new Date("2026-10-14"), isCurrent: false, gameId: valorant.id },
      { name: "V26 Act VI", startDate: new Date("2026-10-14"), endDate: new Date("2027-01-06"), isCurrent: false, gameId: valorant.id },
    ],
  });

  // --- Apex Legends ---
  const apex = await prisma.game.create({
    data: {
      name: "Apex Legends",
      slug: "apex-legends",
      icon: "/icons/apex-legends.png",
      color: "#DA292A",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 24 — Takeover", startDate: new Date("2025-02-11"), endDate: new Date("2025-05-06"), isCurrent: false, gameId: apex.id },
      { name: "Saison 25 — Prodigy", startDate: new Date("2025-05-06"), endDate: new Date("2025-08-05"), isCurrent: false, gameId: apex.id },
      { name: "Saison 26 — Showdown", startDate: new Date("2025-08-05"), endDate: new Date("2025-11-04"), isCurrent: false, gameId: apex.id },
      { name: "Saison 27 — Amped", startDate: new Date("2025-11-04"), endDate: new Date("2026-02-10"), isCurrent: false, gameId: apex.id },
      { name: "Saison 28", startDate: new Date("2026-02-10"), endDate: new Date("2026-05-12"), isCurrent: true, gameId: apex.id },
    ],
  });

  // --- Overwatch 2 ---
  const ow2 = await prisma.game.create({
    data: {
      name: "Overwatch",
      slug: "overwatch-2",
      icon: "/icons/overwatch-2.png",
      color: "#F99E1A",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 16 — Stadium", startDate: new Date("2025-04-22"), endDate: new Date("2025-06-24"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 17 — Powered Up!", startDate: new Date("2025-06-24"), endDate: new Date("2025-08-26"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 18", startDate: new Date("2025-08-26"), endDate: new Date("2025-10-14"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 19", startDate: new Date("2025-10-14"), endDate: new Date("2025-12-09"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 20 — Vendetta", startDate: new Date("2025-12-09"), endDate: new Date("2026-02-10"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 1", startDate: new Date("2026-02-10"), endDate: new Date("2026-04-14"), isCurrent: true, gameId: ow2.id },
    ],
  });

  // --- Rocket League ---
  const rl = await prisma.game.create({
    data: {
      name: "Rocket League",
      slug: "rocket-league",
      icon: "/icons/rocket-league.png",
      color: "#0078F2",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 18", startDate: new Date("2025-03-14"), endDate: new Date("2025-06-18"), isCurrent: false, gameId: rl.id },
      { name: "Saison 19", startDate: new Date("2025-06-18"), endDate: new Date("2025-09-10"), isCurrent: false, gameId: rl.id },
      { name: "Saison 20", startDate: new Date("2025-09-10"), endDate: new Date("2025-12-10"), isCurrent: false, gameId: rl.id },
      { name: "Saison 21 — Pursuit in Paris", startDate: new Date("2025-12-10"), endDate: new Date("2026-03-11"), isCurrent: true, gameId: rl.id },
      { name: "Saison 22", startDate: new Date("2026-03-11"), endDate: new Date("2026-06-10"), isCurrent: false, gameId: rl.id },
    ],
  });

  // --- Rainbow Six Siege ---
  const r6 = await prisma.game.create({
    data: {
      name: "Rainbow Six Siege",
      slug: "rainbow-six-siege",
      icon: "/icons/rainbow-six-siege.png",
      color: "#FFD700",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Y10S1 — Prep Phase", startDate: new Date("2025-03-04"), endDate: new Date("2025-06-10"), isCurrent: false, gameId: r6.id },
      { name: "Y10S2 — Daybreak", startDate: new Date("2025-06-10"), endDate: new Date("2025-09-02"), isCurrent: false, gameId: r6.id },
      { name: "Y10S3", startDate: new Date("2025-09-02"), endDate: new Date("2025-12-02"), isCurrent: false, gameId: r6.id },
      { name: "Y10S4 — Tenfold Pursuit", startDate: new Date("2025-12-02"), endDate: new Date("2026-03-03"), isCurrent: true, gameId: r6.id },
      { name: "Y11S1", startDate: new Date("2026-03-03"), endDate: new Date("2026-06-02"), isCurrent: false, gameId: r6.id },
    ],
  });

  // --- Fortnite Ranked ---
  const fortnite = await prisma.game.create({
    data: {
      name: "Fortnite",
      slug: "fortnite",
      icon: "/icons/fortnite.svg",
      color: "#9D4DBB",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Chapitre 6 S2", startDate: new Date("2025-02-21"), endDate: new Date("2025-05-02"), isCurrent: false, gameId: fortnite.id },
      { name: "Chapitre 7 S1 — Pacific Break", startDate: new Date("2025-11-29"), endDate: new Date("2026-03-04"), isCurrent: true, gameId: fortnite.id },
      { name: "Chapitre 7 S2", startDate: new Date("2026-03-04"), endDate: new Date("2026-06-10"), isCurrent: false, gameId: fortnite.id },
    ],
  });

  // --- TFT ---
  const tft = await prisma.game.create({
    data: {
      name: "Teamfight Tactics",
      slug: "tft",
      icon: "/icons/tft.png",
      color: "#1FBEAB",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Set 15", startDate: new Date("2025-07-30"), endDate: new Date("2025-12-02"), isCurrent: false, gameId: tft.id },
      { name: "Set 16 — Lore & Legends", startDate: new Date("2025-12-03"), endDate: new Date("2026-04-01"), isCurrent: true, gameId: tft.id },
      { name: "Set 17 — Cosmos", startDate: new Date("2026-04-15"), endDate: new Date("2026-07-15"), isCurrent: false, gameId: tft.id },
      { name: "Set 18", startDate: new Date("2026-07-29"), endDate: new Date("2026-11-04"), isCurrent: false, gameId: tft.id },
    ],
  });

  // --- Hearthstone ---
  const hs = await prisma.game.create({
    data: {
      name: "Hearthstone",
      slug: "hearthstone",
      icon: "/icons/hearthstone.png",
      color: "#4FC3F7",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Into the Emerald Dream", startDate: new Date("2025-03-25"), endDate: new Date("2025-07-22"), isCurrent: false, gameId: hs.id },
      { name: "The Shrouded City", startDate: new Date("2025-07-22"), endDate: new Date("2025-11-04"), isCurrent: false, gameId: hs.id },
      { name: "The Heroes of Time", startDate: new Date("2025-11-04"), endDate: new Date("2026-03-24"), isCurrent: true, gameId: hs.id },
      { name: "Year of the Scarab — Ext. 1", startDate: new Date("2026-03-24"), endDate: new Date("2026-07-21"), isCurrent: false, gameId: hs.id },
      { name: "Year of the Scarab — Ext. 2", startDate: new Date("2026-07-21"), endDate: new Date("2026-11-03"), isCurrent: false, gameId: hs.id },
    ],
  });

  // --- Marvel Rivals ---
  const mr = await prisma.game.create({
    data: {
      name: "Marvel Rivals",
      slug: "marvel-rivals",
      icon: "/icons/marvel-rivals.png",
      color: "#ED1D24",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "S0 — Doom's Rise", startDate: new Date("2024-12-06"), endDate: new Date("2025-01-10"), isCurrent: false, gameId: mr.id },
      { name: "S1 — Eternal Night Falls", startDate: new Date("2025-01-11"), endDate: new Date("2025-04-11"), isCurrent: false, gameId: mr.id },
      { name: "S2 — Hellfire Gala", startDate: new Date("2025-04-11"), endDate: new Date("2025-07-11"), isCurrent: false, gameId: mr.id },
      { name: "S3 — The Abyss Awakens", startDate: new Date("2025-07-11"), endDate: new Date("2025-08-08"), isCurrent: false, gameId: mr.id },
      { name: "S3.5 — The Abyss Awakens", startDate: new Date("2025-08-08"), endDate: new Date("2025-09-12"), isCurrent: false, gameId: mr.id },
      { name: "S4 — Heart of the Dragon", startDate: new Date("2025-09-12"), endDate: new Date("2025-10-10"), isCurrent: false, gameId: mr.id },
      { name: "S4.5 — Heart of the Dragon", startDate: new Date("2025-10-10"), endDate: new Date("2025-11-14"), isCurrent: false, gameId: mr.id },
      { name: "S5 — Love is a Battlefield", startDate: new Date("2025-11-14"), endDate: new Date("2025-12-12"), isCurrent: false, gameId: mr.id },
      { name: "S5.5 — Love is a Battlefield", startDate: new Date("2025-12-12"), endDate: new Date("2026-01-16"), isCurrent: false, gameId: mr.id },
      { name: "S6 — Night at the Museum", startDate: new Date("2026-01-16"), endDate: new Date("2026-02-13"), isCurrent: true, gameId: mr.id },
      { name: "S6.5 — Night at the Museum", startDate: new Date("2026-02-13"), endDate: new Date("2026-03-20"), isCurrent: false, gameId: mr.id },
    ],
  });

  console.log("Seed completed successfully!");
  console.log(`Created ${await prisma.game.count()} games`);
  console.log(`Created ${await prisma.season.count()} seasons`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
