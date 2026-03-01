import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";
import { slugify } from "@/lib/slug";

export async function GET() {
  if (!getAdminPayload()) return unauthorized();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ ok: true, categories });
}

const schema = z.object({
  name: z.string().min(2).max(40),
});

export async function POST(req: Request) {
  if (!getAdminPayload()) return unauthorized();

  try {
    const body = schema.parse(await req.json());
    const slug = slugify(body.name);

    const created = await prisma.category.create({
      data: {
        name: body.name,
        slug,
      },
    });

    return NextResponse.json({ ok: true, category: created });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
