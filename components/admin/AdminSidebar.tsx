"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User2, Images, Tags, Mail, LogOut, ArrowLeft } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User2 },
  { href: "/admin/projects", label: "Projects", icon: Images },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="glass neon-border rounded-3xl p-4 md:p-5">
      <div className="font-extrabold tracking-tight">
        <span className="gradient-text">Kasun</span>
        <span className="text-white/70"> Admin</span>
      </div>

      <nav className="mt-6 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border transition",
                active
                  ? "bg-white text-bg-900 border-white"
                  : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
              )}
            >
              <Icon size={16} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to site
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
