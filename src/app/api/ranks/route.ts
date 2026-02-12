import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/ranks — get all ranks for the logged-in user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ranks: {} });
  }

  const ranks = await prisma.userRank.findMany({
    where: { userId: session.user.id },
  });

  // Return as { [gameId]: { tierId, division } }
  const map: Record<number, { tierId: string; division?: number }> = {};
  for (const r of ranks) {
    map[r.gameId] = { tierId: r.tierId, division: r.division ?? undefined };
  }

  return NextResponse.json({ ranks: map });
}

// POST /api/ranks — set or clear a rank
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { gameId, tierId, division } = body as {
    gameId: number;
    tierId: string | null;
    division?: number;
  };

  if (!gameId) {
    return NextResponse.json({ error: "gameId required" }, { status: 400 });
  }

  // Clear rank
  if (!tierId) {
    await prisma.userRank.deleteMany({
      where: { userId: session.user.id, gameId },
    });
    return NextResponse.json({ ok: true });
  }

  // Upsert rank
  await prisma.userRank.upsert({
    where: {
      userId_gameId: { userId: session.user.id, gameId },
    },
    update: { tierId, division: division ?? null },
    create: {
      userId: session.user.id,
      gameId,
      tierId,
      division: division ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
