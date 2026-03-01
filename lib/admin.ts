import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, verifyAuthToken, type AuthPayload } from "./auth";

export function getAuthPayload(): AuthPayload | null {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

export function requireAdmin(): AuthPayload {
  const payload = getAuthPayload();
  if (!payload) redirect("/admin/login");
  if (payload.role !== "ADMIN") redirect("/admin/login");
  return payload;
}
