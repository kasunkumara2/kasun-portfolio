import Link from "next/link";
import type { PublicProfile } from "@/lib/data";

export function Footer({ profile }: { profile: PublicProfile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-extrabold">
            <span className="gradient-text">{profile.displayName}</span>
          </div>
          <div className="mt-1 text-sm text-white/60">
            © {year} • All rights reserved.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          <Link href="#services" className="hover:text-white">Services</Link>
          <Link href="#work" className="hover:text-white">Work</Link>
          <Link href="#about" className="hover:text-white">About</Link>
          <Link href="#contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
