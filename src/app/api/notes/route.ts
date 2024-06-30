export const dynamic = "force-dynamic";

import { getNotes } from "@/services/notes";
import { NotesQuery } from "@/utils/types/prisma";
import { NextAuthOptions, getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const processQueryParams = (url: string): NotesQuery => {
  const { searchParams } = new URL(url);

  const date = searchParams.get("date") as string;
  const categoryId = searchParams.get("categoryId");

  return {
    date,
    categoryId: categoryId ? parseInt(categoryId) : undefined,
  };
};

export async function GET(req: NextRequest & NextAuthOptions) {
  try {
    const session = await getServerSession(req);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const query = processQueryParams(req.url);
    const notes = await getNotes(query);

    return Response.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return Response.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}
