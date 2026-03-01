"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Category = { id: string; name: string; slug: string };

export function CategoriesManager() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/categories");
    const json = await res.json();
    setItems(json.categories || []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function add() {
    setStatus(null);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      setName("");
      setStatus("✅ Added");
      refresh();
    } catch {
      setStatus("❌ Failed");
    }
  }

  async function rename(id: string, newName: string) {
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error();
      setStatus("✅ Updated");
      refresh();
    } catch {
      setStatus("❌ Failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this category? (Projects will become Uncategorized)")) return;
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setStatus("✅ Deleted");
      refresh();
    } catch {
      setStatus("❌ Failed");
    }
  }

  return (
    <div className="glass neon-border rounded-3xl p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.30em] text-white/55">Categories</div>
      <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">Manage categories</h1>
      <p className="mt-3 text-white/70">
        Use categories to filter your portfolio (Design / Photography / Videography).
      </p>

      <div className="mt-6 flex gap-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" />
        <Button onClick={add} disabled={!name.trim()}>Add</Button>
      </div>

      {status && <div className="mt-3 text-sm text-white/70">{status}</div>}

      <div className="mt-7 space-y-3">
        {loading && <div className="text-white/70">Loading...</div>}

        {!loading && items.length === 0 && (
          <div className="text-white/70">No categories yet.</div>
        )}

        {items.map((c) => (
          <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="grid md:grid-cols-[1fr_160px] gap-3 items-center">
              <div>
                <div className="text-xs text-white/50">Slug: {c.slug}</div>
                <Input
                  defaultValue={c.name}
                  onBlur={(e) => {
                    const v = e.target.value.trim();
                    if (v && v !== c.name) rename(c.id, v);
                  }}
                />
                <div className="mt-1 text-xs text-white/50">Edit name and click outside to save.</div>
              </div>

              <Button variant="ghost" onClick={() => remove(c.id)} className="w-full">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
