import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { AUTH_COOKIE_NAME, signAuthToken } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const match = await bcrypt.compare(body.password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const token = signAuthToken({ sub: user.id, email: user.email, role: user.role });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
