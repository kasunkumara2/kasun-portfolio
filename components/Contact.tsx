"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export function Contact({ email, phone }: { email?: string | null; phone?: string | null }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | "ok" | "error">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDone(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setDone("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="glass rounded-3xl neon-border p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.30em] text-white/55">
            Contact
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold">
            Let’s build something that stands out.
          </h3>
          <p className="mt-4 text-white/70 leading-relaxed">
            Send a message with your idea (design / video / social media). I’ll reply with a plan and pricing.
          </p>

          <div className="mt-6 space-y-2 text-sm text-white/80">
            {email && (
              <div>
                <span className="text-white/50">Email:</span> {email}
              </div>
            )}
            {phone && (
              <div>
                <span className="text-white/50">Phone:</span> {phone}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl neon-border p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-2">Name</div>
              <Input name="name" placeholder="Your name" required />
            </div>
            <div>
              <div className="text-xs text-white/60 mb-2">Email</div>
              <Input name="email" type="email" placeholder="you@email.com" required />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-white/60 mb-2">Subject (optional)</div>
            <Input name="subject" placeholder="Design / video / social media…" />
          </div>

          <div className="mt-4">
            <div className="text-xs text-white/60 mb-2">Message</div>
            <Textarea name="message" placeholder="Tell me what you need…" required />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {done === "ok" && (
              <span className="text-sm text-neon-blue">✅ Message sent!</span>
            )}
            {done === "error" && (
              <span className="text-sm text-neon-pink">❌ Something went wrong.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
