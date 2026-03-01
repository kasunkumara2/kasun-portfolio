"use client";

import { motion } from "framer-motion";
import { Camera, Megaphone, PenTool, Video } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Graphic Design",
    points: ["Social Media Posts", "Flyers / Menus", "Thumbnails & Branding"],
  },
  {
    icon: Video,
    title: "Short‑form Video Editing",
    points: ["Reels / TikToks", "Fast‑paced & cinematic", "Hook-first storytelling"],
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    points: ["Content planning", "Posting & consistency", "Growth strategy"],
  },
  {
    icon: Camera,
    title: "Photography",
    points: ["Portrait sessions", "Events & functions", "Color grading & retouching"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="glass rounded-3xl neon-border p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                  <Icon size={20} className="text-neon-blue" />
                </div>
                <div className="text-lg font-bold">{s.title}</div>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-pink" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
