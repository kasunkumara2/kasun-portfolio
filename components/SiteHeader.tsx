"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition",
        scrolled ? "bg-bg-900/70 backdrop-blur border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="#home" className="font-extrabold tracking-tight text-lg">
          <span className="gradient-text">Kasun</span>
          <span className="text-white/70">.studio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-white/80">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition">
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/10"
            title="Admin"
          >
            Admin
          </Link>
        </nav>

        <button
          className="md:hidden rounded-xl border border-white/15 bg-white/5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg-900/85 backdrop-blur">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-white/85 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="mt-1 inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
