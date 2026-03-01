"use client";

import { motion } from "framer-motion";
import type { PublicProfile } from "@/lib/data";

const skills = [
  "Video Editing (Reels/TikTok)",
  "Graphic Design (Posts/Flyers/Menus)",
  "Content Creation",
  "AI & Prompting (ChatGPT, Gemini)",
  "Photography (Lightroom)",
  "Social Media Management",
];

export function About({ profile }: { profile: PublicProfile }) {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl neon-border p-6 md:p-8"
        >
          <div className="text-xs uppercase tracking-[0.30em] text-white/55">
            About
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-extrabold">
            {profile.displayName}
          </h3>

          <p className="mt-4 text-white/70 leading-relaxed">
            {profile.about}
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-bold">Experience</div>
              <div className="mt-1 text-sm text-white/70">Freelance (2024 – Present)</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-bold">Tools</div>
              <div className="mt-1 text-sm text-white/70">CapCut • Lightroom • AI tools</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="glass rounded-3xl neon-border p-6 md:p-8"
        >
          <div className="text-xs uppercase tracking-[0.30em] text-white/55">
            Skills
          </div>

          <ul className="mt-5 space-y-2 text-sm text-white/75">
            {skills.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-blue" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-bold">Certifications</div>
            <div className="mt-1 text-sm text-white/70">
              Certified Graphic Designer • Certified Photography
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
