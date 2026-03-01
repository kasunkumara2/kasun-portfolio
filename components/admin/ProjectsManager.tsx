"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

type Category = { id: string; name: string; slug: string };
type Project = {
  id: string;
  title: string;
  slug: string;
  type: "DESIGN" | "PHOTO" | "VIDEO";
  description?: string | null;
  year?: string | null;
  client?: string | null;
  tags?: any;
  featured: boolean;
  thumbnailUrl?: string | null;
  mediaUrl?: string | null;
  categoryId?: string | null;
  category?: Category | null;
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

function tagsToString(tags: any): string {
  if (!tags) return "";
  if (Array.isArray(tags)) return tags.join(", ");
  return "";
}

function stringToTags(s: string): string[] {
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function ProjectsManager() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const empty = {
    title: "",
    type: "DESIGN" as Project["type"],
    categoryId: "",
    description: "",
    year: "",
    client: "",
    tags: "",
    featured: false,
    thumbnailUrl: "",
    mediaUrl: "",
  };

  const [form, setForm] = useState<any>(empty);

  const currentProject = useMemo(
    () => projects.find((p) => p.id === editingId) || null,
    [projects, editingId]
  );

  async function refresh() {
    const [cRes, pRes] = await Promise.all([
      fetch("/api/admin/categories"),
      fetch("/api/admin/projects"),
    ]);
    const cJson = await cRes.json();
    const pJson = await pRes.json();
    setCategories(cJson.categories || []);
    setProjects(pJson.projects || []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm(empty);
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      type: p.type,
      categoryId: p.categoryId || "",
      description: p.description || "",
      year: p.year || "",
      client: p.client || "",
      tags: tagsToString(p.tags),
      featured: p.featured,
      thumbnailUrl: p.thumbnailUrl || "",
      mediaUrl: p.mediaUrl || "",
    });
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    setStatus(null);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        categoryId: form.categoryId || null,
        description: form.description || null,
        year: form.year || null,
        client: form.client || null,
        tags: stringToTags(form.tags),
        featured: !!form.featured,
        thumbnailUrl: form.thumbnailUrl || null,
        mediaUrl: form.mediaUrl || null,
      };

      const res = await fetch(
        editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      setStatus("✅ Saved");
      await refresh();
      if (!editingId) resetForm();
    } catch (e: any) {
      setStatus("❌ " + (e?.message || "Failed"));
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setStatus("✅ Deleted");
      await refresh();
      if (editingId === id) resetForm();
    } catch {
      setStatus("❌ Failed");
    }
  }

  async function onUpload(field: "thumbnailUrl" | "mediaUrl", file: File) {
    setStatus("Uploading...");
    try {
      const url = await uploadFile(file, "kasun-portfolio/projects");
      setForm((f: any) => ({ ...f, [field]: url }));
      setStatus("✅ Uploaded");
    } catch {
      setStatus("❌ Upload failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass neon-border rounded-3xl p-6 md:p-8">
        <div className="text-xs uppercase tracking-[0.30em] text-white/55">Projects</div>
        <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">
          {editingId ? "Edit project" : "Add new project"}
        </h1>
        <p className="mt-3 text-white/70">
          Upload your designs / photos / videos. Changes will show instantly on the website.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-white/60 mb-2">Title</div>
            <Input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-white/60 mb-2">Type</div>
              <select
                value={form.type}
                onChange={(e) => setForm((f: any) => ({ ...f, type: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm"
              >
                <option value="DESIGN">DESIGN</option>
                <option value="PHOTO">PHOTO</option>
                <option value="VIDEO">VIDEO</option>
              </select>
            </div>

            <div>
              <div className="text-xs text-white/60 mb-2">Category</div>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((f: any) => ({ ...f, categoryId: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm"
              >
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60 mb-2">Description</div>
          <Textarea value={form.description} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))} />
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-white/60 mb-2">Year</div>
            <Input value={form.year} onChange={(e) => setForm((f: any) => ({ ...f, year: e.target.value }))} placeholder="2024" />
          </div>
          <div>
            <div className="text-xs text-white/60 mb-2">Client</div>
            <Input value={form.client} onChange={(e) => setForm((f: any) => ({ ...f, client: e.target.value }))} placeholder="Brand / Personal" />
          </div>
          <div className="flex items-end gap-3">
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => setForm((f: any) => ({ ...f, featured: e.target.checked }))}
              />
              Featured
            </label>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60 mb-2">Tags (comma separated)</div>
          <Input value={form.tags} onChange={(e) => setForm((f: any) => ({ ...f, tags: e.target.value }))} placeholder="Reels, Poster, Branding..." />
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-bold">Thumbnail</div>
            <div className="mt-2 text-xs text-white/60 break-all">{form.thumbnailUrl}</div>
            <input
              type="file"
              accept="image/*"
              className="mt-3 text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload("thumbnailUrl", f);
              }}
            />
            <div className="mt-3">
              <Input
                value={form.thumbnailUrl}
                onChange={(e) => setForm((f: any) => ({ ...f, thumbnailUrl: e.target.value }))}
                placeholder="Or paste image URL"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-bold">Media (image / video / YouTube link)</div>
            <div className="mt-2 text-xs text-white/60 break-all">{form.mediaUrl}</div>
            <input
              type="file"
              accept="image/*,video/*"
              className="mt-3 text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload("mediaUrl", f);
              }}
            />
            <div className="mt-3">
              <Input
                value={form.mediaUrl}
                onChange={(e) => setForm((f: any) => ({ ...f, mediaUrl: e.target.value }))}
                placeholder="Or paste media URL / YouTube link"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={save} disabled={!form.title.trim()}>
            {editingId ? "Update project" : "Create project"}
          </Button>
          {editingId && (
            <Button variant="ghost" onClick={resetForm}>
              Cancel edit
            </Button>
          )}
          {status && <span className="text-sm text-white/70">{status}</span>}
        </div>
      </div>

      <div className="glass neon-border rounded-3xl p-6 md:p-8">
        <div className="text-xs uppercase tracking-[0.30em] text-white/55">All projects</div>

        {loading && <div className="mt-4 text-white/70">Loading...</div>}

        {!loading && projects.length === 0 && (
          <div className="mt-4 text-white/70">No projects yet. Create your first one above.</div>
        )}

        <div className="mt-6 space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-xs text-white/50">
                    {p.type} • {p.category?.name || "Uncategorized"} • slug: {p.slug}
                  </div>
                  <div className="text-lg font-bold">{p.title}</div>
                  {p.featured && <div className="text-xs text-neon-blue mt-1">★ Featured</div>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => startEdit(p)}>Edit</Button>
                  <Button variant="ghost" onClick={() => remove(p.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-white/50">
          Tip: Upload your real work images/videos in the form above — the public portfolio will update automatically.
        </div>
      </div>
    </div>
  );
}
