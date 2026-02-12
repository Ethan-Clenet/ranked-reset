import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET — return list of favorited game IDs (for current user or from body for guest)
export async function GET() {
  const session = await auth();
  if (session?.user?.id) {
    const rows = await prisma.userFavorite.findMany({
      where: { userId: session.user.id },
      select: { gameId: true },
    });
    return NextResponse.json({ gameIds: rows.map((r) => r.gameId) });
  }
  return NextResponse.json({ gameIds: [] });
}

// POST — toggle favorite: { gameId: number }
export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();
  const gameId = Number(body.gameId);
  if (!Number.isFinite(gameId)) {
    return NextResponse.json({ error: "gameId required" }, { status: 400 });
  }

  if (session?.user?.id) {
    const existing = await prisma.userFavorite.findUnique({
      where: { userId_gameId: { userId: session.user.id, gameId } },
    });
    if (existing) {
      await prisma.userFavorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ favorited: false });
    }
    await prisma.userFavorite.create({
      data: { userId: session.user.id, gameId },
    });
    return NextResponse.json({ favorited: true });
  }

  // Guest: we can't persist on server, client uses localStorage
  return NextResponse.json({ favorited: false });
}
