import { NextResponse } from "next/server";
import { getAdminPayload, unauthorized } from "@/lib/apiAuth";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";

function sha1(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function uploadToCloudinary(file: File, folder?: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return null;

  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string | number> = { timestamp };
  if (folder) params.folder = folder;

  // Build signature string: key=value&key=value... + api_secret
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = sha1(toSign + apiSecret);

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  if (folder) fd.append("folder", folder);
  fd.append("signature", signature);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const json = await res.json();
  return json.secure_url as string;
}

async function uploadLocal(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${safeName(file.name)}`;
  const filepath = path.join(uploadsDir, filename);

  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(req: Request) {
  if (!getAdminPayload()) return unauthorized();

  const form = await req.formData();
  const file = form.get("file");
  const folder = (form.get("folder") as string | null) || undefined;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }

  try {
    const cloudUrl = await uploadToCloudinary(file, folder);
    const url = cloudUrl || (await uploadLocal(file));
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 400 });
  }
}
