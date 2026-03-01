import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";
import { slugify } from "@/lib/slug";
import { ProjectType } from "@prisma/client";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!getAdminPayload()) return unauthorized();
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  return NextResponse.json({ ok: true, project });
}

const schema = z.object({
  title: z.string().min(2).max(120),
  type: z.nativeEnum(ProjectType),
  categoryId: z.string().optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  year: z.string().max(10).optional().nullable(),
  client: z.string().max(80).optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  featured: z.boolean().optional(),
  thumbnailUrl: z.string().max(500).optional().nullable(),
  mediaUrl: z.string().max(500).optional().nullable(),
});

async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = base;
  let i = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const exists = await prisma.project.findUnique({ where: { slug } });
    if (!exists || exists.id === ignoreId) return slug;
    slug = `${base}-${i++}`;
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!getAdminPayload()) return unauthorized();

  try {
    const body = schema.parse(await req.json());
    const base = slugify(body.title);
    const slug = await uniqueSlug(base, params.id);

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...body,
        slug,
        tags: body.tags ?? [],
        categoryId: body.categoryId || null,
        featured: body.featured ?? false,
      } as any,
    });

    return NextResponse.json({ ok: true, project: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!getAdminPayload()) return unauthorized();

  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 400 });
  }
}
