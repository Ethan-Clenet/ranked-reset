import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/games — List all games with their seasons
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        seasons: {
          orderBy: { startDate: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

// POST /api/games — Create a new game
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, icon, color } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: { name, slug, icon: icon || "", color: color || "#6366f1" },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("Failed to create game:", error);
    return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
  }
}
