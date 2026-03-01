import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, categories, messages] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="glass neon-border rounded-3xl p-6 md:p-8">
        <div className="text-xs uppercase tracking-[0.30em] text-white/55">Dashboard</div>
        <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">Welcome back 👋</h1>
        <p className="mt-3 text-white/70">
          Manage your profile, upload your work, and keep the website updated.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="glass neon-border rounded-3xl p-6">
          <div className="text-sm text-white/60">Projects</div>
          <div className="mt-2 text-3xl font-extrabold">{projects}</div>
        </div>
        <div className="glass neon-border rounded-3xl p-6">
          <div className="text-sm text-white/60">Categories</div>
          <div className="mt-2 text-3xl font-extrabold">{categories}</div>
        </div>
        <div className="glass neon-border rounded-3xl p-6">
          <div className="text-sm text-white/60">Unread Messages</div>
          <div className="mt-2 text-3xl font-extrabold">{messages}</div>
        </div>
      </div>
    </div>
  );
}
