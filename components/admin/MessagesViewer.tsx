"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Msg = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  createdAt: string;
  read: boolean;
};

export function MessagesViewer() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Msg[]>([]);

  async function refresh() {
    const res = await fetch("/api/admin/messages");
    const json = await res.json();
    setItems(json.messages || []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function setRead(id: string, read: boolean) {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    refresh();
  }

  return (
    <div className="glass neon-border rounded-3xl p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.30em] text-white/55">Messages</div>
      <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">Contact form inbox</h1>
      <p className="mt-3 text-white/70">Messages submitted from your website.</p>

      {loading && <div className="mt-6 text-white/70">Loading...</div>}

      {!loading && items.length === 0 && (
        <div className="mt-6 text-white/70">No messages yet.</div>
      )}

      <div className="mt-6 space-y-3">
        {items.map((m) => (
          <div
            key={m.id}
            className={cn(
              "rounded-2xl border p-4",
              m.read ? "border-white/10 bg-white/5" : "border-neon-blue/30 bg-neon-blue/5"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-sm font-bold">
                  {m.subject ? m.subject : "No subject"}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  From: {m.name} • {m.email} •{" "}
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setRead(m.id, !m.read)}>
                  Mark {m.read ? "Unread" : "Read"}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-sm text-white/80 whitespace-pre-wrap">
              {m.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
