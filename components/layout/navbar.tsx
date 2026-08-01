"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const mainLinks = [
  { href: "/ia", label: "IA" },
  { href: "/tutoriales", label: "Tutoriales" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/cursos", label: "Cursos" },
  { href: "/servicios", label: "ServicSios" },
  { href: "/portafolio", label: "Portafolio" },
];

const moreLinks = [
  { href: "/comunidad", label: "Comunidad" },
  { href: "/recursos", label: "Recursos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/academia", label: "Academia" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-medium text-black dark:text-white">
          Clementech<span className="text-cyan-500 dark:text-cyan-400">.ai</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Mas <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-2 shadow-xl">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/chat-ia"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-violet-400 text-violet-500 dark:text-violet-400 hover:bg-violet-400/10 transition-colors"
          >
            Chat IA
          </Link>

          <ThemeToggle />
        </nav>

        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="text-black dark:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-4 flex flex-col gap-3">
          {[...mainLinks, ...moreLinks].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="/chat-ia" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-violet-500 dark:text-violet-400">
            Chat IA
          </Link>
        </div>
      )}
    </header>
  );
}