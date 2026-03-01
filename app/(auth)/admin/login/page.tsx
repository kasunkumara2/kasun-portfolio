"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      router.push("/admin");
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient grid place-items-center px-5">
      <div className="w-full max-w-md glass neon-border rounded-3xl p-7">
        <div className="font-extrabold text-xl">
          <span className="gradient-text">Admin</span> Login
        </div>
        <p className="mt-2 text-sm text-white/70">
          Only you can access this panel. Use your admin email/password from the seed.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <div className="text-xs text-white/60 mb-2">Email</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <div className="text-xs text-white/60 mb-2">Password</div>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>

          {error && <div className="text-sm text-neon-pink">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-5 text-sm text-white/70">
          <Link href="/" className="hover:text-white">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
