import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";
import { slugify } from "@/lib/slug";

const schema = z.object({
  name: z.string().min(2).max(40),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!getAdminPayload()) return unauthorized();
  try {
    const body = schema.parse(await req.json());
    const updated = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: slugify(body.name),
      },
    });
    return NextResponse.json({ ok: true, category: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!getAdminPayload()) return unauthorized();
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 400 });
  }
}
