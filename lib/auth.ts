import jwt from "jsonwebtoken";

export const AUTH_COOKIE_NAME = "kasun_session";

export type AuthPayload = {
  sub: string;
  email: string;
  role: string;
};

export function signAuthToken(payload: AuthPayload): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    return jwt.verify(token, secret) as AuthPayload;
  } catch {
    return null;
  }
}
