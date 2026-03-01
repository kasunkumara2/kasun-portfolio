"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { PublicProfile } from "@/lib/data";

export function Hero({ profile }: { profile: PublicProfile }) {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-16">
      <div className="relative w-full">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[240px_1fr_1fr] gap-6 items-center">
            {/* Left: vertical menu (desktop) */}
            <motion.aside
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block glass rounded-3xl neon-border p-6"
            >
              <div className="flex items-center justify-between text-xs tracking-[0.28em] text-white/50">
                <span className="rotate-180 [writing-mode:vertical-rl]">SLIDE</span>
                <span className="text-white/70">1 / 4</span>
              </div>

              <div className="mt-10 space-y-3">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={l.href === "#home" ? "text-white" : "text-white/60 hover:text-white"}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-xs text-white/50">
                <div className="mb-2">Quick contact</div>
                <div className="text-white/80">{profile.email}</div>
                <div className="text-white/80">{profile.phone}</div>
              </div>
            </motion.aside>

            {/* Middle: portrait card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="relative"
            >
              <div className="glass rounded-3xl neon-border overflow-hidden shadow-glow">
                <div className="p-6 flex items-center justify-between">
                  <div className="font-extrabold tracking-tight">
                    <span className="text-white">KASUN</span>
                    <span className="text-neon-pink">.</span>
                    <span className="text-white/70">STUDIO</span>
                  </div>
                  <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
                    <div className="h-2 w-2 rounded-full bg-neon-pink shadow-neon" />
                  </div>
                </div>

                <div className="relative px-10 pb-10 pt-6">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  <div className="relative mx-auto w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden neon-border shadow-neon">
                    <Image
                      src={profile.avatarUrl || "/assets/kasun.jpg"}
                      alt={profile.displayName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-white/70 text-sm">Freelancer</div>
                    <div className="text-xl font-bold">{profile.displayName}</div>
                    <div className="mt-2 text-sm text-white/70">{profile.headline}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: main headline */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="glass rounded-3xl neon-border p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.30em] text-white/60">
                  Portfolio Website
                </div>

                <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.02]">
                  beyond
                  <span className="text-neon-pink">.</span>
                  <span className="gradient-text">imagination</span>
                </h1>

                <p className="mt-5 text-white/70 leading-relaxed">
                  {profile.subheadline}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href="#work">
                    <Button>Explore Work</Button>
                  </Link>
                  <Link href="#contact">
                    <Button variant="ghost">Hire Me</Button>
                  </Link>
                  {profile.cvUrl && (
                    <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary">Download CV</Button>
                    </a>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between text-xs text-white/55">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-1 w-10 bg-white/25 rounded-full" />
                    <span>Scroll for more</span>
                  </div>
                  <div className="hidden md:block">
                    {profile.address}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA pill */}
        <div className="mt-10 flex justify-center">
          <Link href="#work" className="glass neon-border rounded-full px-8 py-3 text-sm text-white/85 hover:text-white">
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
