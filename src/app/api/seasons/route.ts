import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/seasons — Create a new season
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, startDate, endDate, isCurrent, gameId } = body;

    if (!name || !startDate || !endDate || !gameId) {
      return NextResponse.json(
        { error: "name, startDate, endDate, and gameId are required" },
        { status: 400 }
      );
    }

    const season = await prisma.season.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent: isCurrent || false,
        gameId,
      },
    });

    return NextResponse.json(season, { status: 201 });
  } catch (error) {
    console.error("Failed to create season:", error);
    return NextResponse.json({ error: "Failed to create season" }, { status: 500 });
  }
}

// GET /api/seasons — Get all seasons (optionally filter by gameId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");

    const seasons = await prisma.season.findMany({
      where: gameId ? { gameId: parseInt(gameId) } : undefined,
      include: { game: true },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(seasons);
  } catch (error) {
    console.error("Failed to fetch seasons:", error);
    return NextResponse.json({ error: "Failed to fetch seasons" }, { status: 500 });
  }
}
