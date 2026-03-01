import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";

export async function GET() {
  if (!getAdminPayload()) return unauthorized();
  const profile = await prisma.profile.findFirst();
  return NextResponse.json({ ok: true, profile });
}

const schema = z.object({
  displayName: z.string().min(2).max(80),
  headline: z.string().min(2).max(120),
  subheadline: z.string().min(2).max(240),
  about: z.string().min(10).max(5000),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().max(120).optional().nullable(),
  address: z.string().max(200).optional().nullable(),
  website: z.string().max(200).optional().nullable(),
  avatarUrl: z.string().max(500).optional().nullable(),
  heroBgUrl: z.string().max(500).optional().nullable(),
  cvUrl: z.string().max(500).optional().nullable(),
  socials: z.record(z.string(), z.string()).optional().nullable(),
});

export async function PUT(req: Request) {
  if (!getAdminPayload()) return unauthorized();

  try {
    const body = schema.parse(await req.json());
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      const created = await prisma.profile.create({ data: { ...body } as any });
      return NextResponse.json({ ok: true, profile: created });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        ...body,
      } as any,
    });

    return NextResponse.json({ ok: true, profile: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
