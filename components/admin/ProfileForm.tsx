"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

type ProfilePayload = {
  displayName: string;
  headline: string;
  subheadline: string;
  about: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  website?: string | null;
  avatarUrl?: string | null;
  heroBgUrl?: string | null;
  cvUrl?: string | null;
  socials?: Record<string, string> | null;
};

async function uploadFile(file: File, folder: string) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json.url as string;
}

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [data, setData] = useState<ProfilePayload>({
    displayName: "",
    headline: "",
    subheadline: "",
    about: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    avatarUrl: "",
    heroBgUrl: "",
    cvUrl: "",
    socials: { facebook: "", instagram: "", behance: "", youtube: "", tiktok: "" },
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/profile");
      const json = await res.json();
      if (json.profile) {
        setData({
          ...json.profile,
          socials: json.profile.socials || { facebook: "", instagram: "", behance: "", youtube: "", tiktok: "" },
        });
      }
      setLoading(false);
    })();
  }, []);

  function setField<K extends keyof ProfilePayload>(key: K, value: ProfilePayload[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("✅ Saved!");
    } catch (e: any) {
      setStatus("❌ " + (e?.message || "Save failed"));
    } finally {
      setSaving(false);
    }
  }

  async function onUpload(key: "avatarUrl" | "heroBgUrl" | "cvUrl", file: File) {
    setStatus("Uploading...");
    try {
      const url = await uploadFile(file, "kasun-portfolio");
      setField(key, url);
      setStatus("✅ Uploaded");
    } catch (e: any) {
      setStatus("❌ Upload failed");
    }
  }

  if (loading) {
    return <div className="text-white/70">Loading...</div>;
  }

  return (
    <div className="glass neon-border rounded-3xl p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.30em] text-white/55">Profile</div>
      <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">Edit website content</h1>
      <p className="mt-3 text-white/70">Update your hero text, about section, contacts, and images.</p>

      <div className="mt-7 grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/60 mb-2">Display Name</div>
          <Input value={data.displayName} onChange={(e) => setField("displayName", e.target.value)} />
        </div>
        <div>
          <div className="text-xs text-white/60 mb-2">Headline</div>
          <Input value={data.headline} onChange={(e) => setField("headline", e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60 mb-2">Subheadline</div>
        <Input value={data.subheadline} onChange={(e) => setField("subheadline", e.target.value)} />
      </div>

      <div className="mt-4">
        <div className="text-xs text-white/60 mb-2">About</div>
        <Textarea value={data.about} onChange={(e) => setField("about", e.target.value)} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-white/60 mb-2">Phone</div>
          <Input value={data.phone || ""} onChange={(e) => setField("phone", e.target.value)} />
        </div>
        <div>
          <div className="text-xs text-white/60 mb-2">Email</div>
          <Input value={data.email || ""} onChange={(e) => setField("email", e.target.value)} />
        </div>
        <div>
          <div className="text-xs text-white/60 mb-2">Address</div>
          <Input value={data.address || ""} onChange={(e) => setField("address", e.target.value)} />
        </div>
        <div>
          <div className="text-xs text-white/60 mb-2">Website</div>
          <Input value={data.website || ""} onChange={(e) => setField("website", e.target.value)} />
        </div>
      </div>

      <div className="mt-7 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-bold">Avatar (your photo)</div>
          <div className="mt-2 text-xs text-white/60 break-all">{data.avatarUrl}</div>
          <input
            type="file"
            accept="image/*"
            className="mt-3 text-xs"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload("avatarUrl", f);
            }}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-bold">Hero Background</div>
          <div className="mt-2 text-xs text-white/60 break-all">{data.heroBgUrl}</div>
          <input
            type="file"
            accept="image/*"
            className="mt-3 text-xs"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload("heroBgUrl", f);
            }}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-bold">CV (PDF)</div>
          <div className="mt-2 text-xs text-white/60 break-all">{data.cvUrl}</div>
          <input
            type="file"
            accept="application/pdf"
            className="mt-3 text-xs"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload("cvUrl", f);
            }}
          />
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-bold">Social links</div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {["facebook", "instagram", "behance", "youtube", "tiktok"].map((k) => (
            <div key={k}>
              <div className="text-xs text-white/60 mb-2">{k}</div>
              <Input
                value={(data.socials?.[k] as string) || ""}
                onChange={(e) =>
                  setField("socials", { ...(data.socials || {}), [k]: e.target.value })
                }
                placeholder="Paste link"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
        {status && <span className="text-sm text-white/70">{status}</span>}
      </div>
    </div>
  );
}
