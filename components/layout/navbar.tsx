"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const mainLinks = [
  { href: "/", label: "Inicio" },
  { href: "/ia", label: "IA" },
  { href: "/dropshipping", label: "Dropshipping" },
  { href: "/organizacion", label: "Centro de Acción" },
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
{ href: "/biblioteca", label: "Biblioteca" },];

export default function Navbar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-medium text-black dark:text-white">
          Clementech<span className="text-cyan-500 dark:text-cyan-400">.ai</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm transition-colors ${isActive(link.href) ? "border border-cyan-400 bg-cyan-50 font-medium text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"}`}>
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors ${moreLinks.some((link) => isActive(link.href)) ? "border border-cyan-400 bg-cyan-50 font-medium text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"}`}
            >
              Mas <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full z-[70] mt-2 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Más secciones</p>
                {moreLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMoreOpen(false)} aria-current={isActive(link.href) ? "page" : undefined} className={`block rounded-lg px-3 py-2 text-sm ${isActive(link.href) ? "border border-cyan-400 bg-cyan-50 font-medium text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/chat-ia"
            aria-current={isActive("/chat-ia") ? "page" : undefined}
            className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${isActive("/chat-ia") ? "border-violet-500 bg-violet-500 text-white dark:border-violet-400 dark:bg-violet-400 dark:text-black" : "border-violet-400 text-violet-500 hover:bg-violet-400/10 dark:text-violet-400"}`}
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
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} aria-current={isActive(link.href) ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm ${isActive(link.href) ? "border border-cyan-400 bg-cyan-50 font-medium text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/chat-ia" onClick={() => setMobileOpen(false)} aria-current={isActive("/chat-ia") ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm font-medium ${isActive("/chat-ia") ? "border border-violet-500 bg-violet-500 text-white dark:border-violet-400 dark:bg-violet-400 dark:text-black" : "border border-transparent text-violet-500 dark:text-violet-400"}`}>
            Chat IA
          </Link>
        </div>
      )}
    </header>
  );
}