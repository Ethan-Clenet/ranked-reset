import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
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
      icon: "🏆",
      color: "#C89B3C",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "S15 Split 1", startDate: new Date("2025-01-09"), endDate: new Date("2025-05-12"), isCurrent: false, gameId: lol.id },
      { name: "S15 Split 2", startDate: new Date("2025-05-14"), endDate: new Date("2025-09-08"), isCurrent: false, gameId: lol.id },
      { name: "S15 Split 3", startDate: new Date("2025-09-10"), endDate: new Date("2026-01-12"), isCurrent: false, gameId: lol.id },
      { name: "S16 Split 1", startDate: new Date("2026-01-14"), endDate: new Date("2026-05-11"), isCurrent: true, gameId: lol.id },
      { name: "S16 Split 2", startDate: new Date("2026-05-13"), endDate: new Date("2026-09-07"), isCurrent: false, gameId: lol.id },
    ],
  });

  // --- Valorant ---
  const valorant = await prisma.game.create({
    data: {
      name: "Valorant",
      slug: "valorant",
      icon: "🔫",
      color: "#FF4655",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Episode 10 Act 1", startDate: new Date("2025-01-08"), endDate: new Date("2025-03-04"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 10 Act 2", startDate: new Date("2025-03-05"), endDate: new Date("2025-05-06"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 10 Act 3", startDate: new Date("2025-05-07"), endDate: new Date("2025-06-24"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 11 Act 1", startDate: new Date("2025-06-25"), endDate: new Date("2025-09-02"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 11 Act 2", startDate: new Date("2025-09-03"), endDate: new Date("2025-11-04"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 11 Act 3", startDate: new Date("2025-11-05"), endDate: new Date("2026-01-06"), isCurrent: false, gameId: valorant.id },
      { name: "Episode 12 Act 1", startDate: new Date("2026-01-07"), endDate: new Date("2026-03-10"), isCurrent: true, gameId: valorant.id },
      { name: "Episode 12 Act 2", startDate: new Date("2026-03-11"), endDate: new Date("2026-05-12"), isCurrent: false, gameId: valorant.id },
    ],
  });

  // --- Apex Legends ---
  const apex = await prisma.game.create({
    data: {
      name: "Apex Legends",
      slug: "apex-legends",
      icon: "🦅",
      color: "#DA292A",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 23", startDate: new Date("2025-08-05"), endDate: new Date("2025-11-04"), isCurrent: false, gameId: apex.id },
      { name: "Saison 24", startDate: new Date("2025-11-05"), endDate: new Date("2026-02-03"), isCurrent: false, gameId: apex.id },
      { name: "Saison 25", startDate: new Date("2026-02-04"), endDate: new Date("2026-05-05"), isCurrent: true, gameId: apex.id },
    ],
  });

  // --- Overwatch 2 ---
  const ow2 = await prisma.game.create({
    data: {
      name: "Overwatch 2",
      slug: "overwatch-2",
      icon: "🛡️",
      color: "#F99E1A",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 14", startDate: new Date("2025-06-17"), endDate: new Date("2025-09-23"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 15", startDate: new Date("2025-09-24"), endDate: new Date("2025-12-16"), isCurrent: false, gameId: ow2.id },
      { name: "Saison 16", startDate: new Date("2025-12-17"), endDate: new Date("2026-03-17"), isCurrent: true, gameId: ow2.id },
      { name: "Saison 17", startDate: new Date("2026-03-18"), endDate: new Date("2026-06-16"), isCurrent: false, gameId: ow2.id },
    ],
  });

  // --- Rocket League ---
  const rl = await prisma.game.create({
    data: {
      name: "Rocket League",
      slug: "rocket-league",
      icon: "🚗",
      color: "#0078F2",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Saison 17", startDate: new Date("2025-09-03"), endDate: new Date("2025-12-02"), isCurrent: false, gameId: rl.id },
      { name: "Saison 18", startDate: new Date("2025-12-03"), endDate: new Date("2026-03-03"), isCurrent: true, gameId: rl.id },
      { name: "Saison 19", startDate: new Date("2026-03-04"), endDate: new Date("2026-06-02"), isCurrent: false, gameId: rl.id },
    ],
  });

  // --- Rainbow Six Siege ---
  const r6 = await prisma.game.create({
    data: {
      name: "Rainbow Six Siege",
      slug: "rainbow-six-siege",
      icon: "🔰",
      color: "#FFD700",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Y9S4 - Saison Hiver", startDate: new Date("2025-03-04"), endDate: new Date("2025-06-03"), isCurrent: false, gameId: r6.id },
      { name: "Y10S1", startDate: new Date("2025-06-04"), endDate: new Date("2025-09-02"), isCurrent: false, gameId: r6.id },
      { name: "Y10S2", startDate: new Date("2025-09-03"), endDate: new Date("2025-12-02"), isCurrent: false, gameId: r6.id },
      { name: "Y10S3", startDate: new Date("2025-12-03"), endDate: new Date("2026-03-03"), isCurrent: true, gameId: r6.id },
      { name: "Y10S4", startDate: new Date("2026-03-04"), endDate: new Date("2026-06-02"), isCurrent: false, gameId: r6.id },
    ],
  });

  // --- Fortnite Ranked ---
  const fortnite = await prisma.game.create({
    data: {
      name: "Fortnite",
      slug: "fortnite",
      icon: "🏗️",
      color: "#9D4DBB",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Chapitre 6 S1", startDate: new Date("2025-12-01"), endDate: new Date("2026-02-21"), isCurrent: true, gameId: fortnite.id },
      { name: "Chapitre 6 S2", startDate: new Date("2026-02-22"), endDate: new Date("2026-05-15"), isCurrent: false, gameId: fortnite.id },
    ],
  });

  // --- TFT ---
  const tft = await prisma.game.create({
    data: {
      name: "Teamfight Tactics",
      slug: "tft",
      icon: "♟️",
      color: "#1FBEAB",
    },
  });

  await prisma.season.createMany({
    data: [
      { name: "Set 14", startDate: new Date("2025-11-19"), endDate: new Date("2026-03-18"), isCurrent: true, gameId: tft.id },
      { name: "Set 14.5", startDate: new Date("2026-03-19"), endDate: new Date("2026-06-17"), isCurrent: false, gameId: tft.id },
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
