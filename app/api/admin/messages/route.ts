import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";

export async function GET() {
  if (!getAdminPayload()) return unauthorized();
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, messages });
}

const schema = z.object({
  id: z.string(),
  read: z.boolean(),
});

export async function PATCH(req: Request) {
  if (!getAdminPayload()) return unauthorized();

  try {
    const body = schema.parse(await req.json());
    const updated = await prisma.message.update({
      where: { id: body.id },
      data: { read: body.read },
    });
    return NextResponse.json({ ok: true, message: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
