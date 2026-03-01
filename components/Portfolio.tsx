"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string };

export type ProjectWithCategory = {
  id: string;
  title: string;
  slug: string;
  type: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  mediaUrl?: string | null;
  featured?: boolean;
  category?: Category | null;
};

export function Portfolio({
  categories,
  projects,
}: {
  categories: Category[];
  projects: ProjectWithCategory[];
}) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category?.slug === active);
  }, [projects, active]);

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold border transition",
            active === "all"
              ? "bg-white text-bg-900 border-white"
              : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.slug)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold border transition",
              active === c.slug
                ? "bg-white text-bg-900 border-white"
                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: idx * 0.02 }}
            className="group"
          >
            <Link href={`/project/${p.slug}`} className="block">
              <div className="glass rounded-3xl neon-border overflow-hidden">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={p.thumbnailUrl || "/assets/placeholder-design.jpg"}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-900/65 via-bg-900/0 to-transparent" />
                  <div className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.24em] bg-white/10 border border-white/15 rounded-full px-3 py-1">
                    {p.type}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-sm text-white/60">{p.category?.name || "Uncategorized"}</div>
                  <div className="mt-1 text-lg font-bold leading-snug">{p.title}</div>
                  {p.description && (
                    <p className="mt-2 text-sm text-white/70">
                      {p.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
