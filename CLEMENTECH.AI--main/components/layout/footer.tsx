import Link from "next/link";

const sections = [
  { href: "/", label: "Inicio" },
  { href: "/ia", label: "IA" },
  { href: "/tutoriales", label: "Tutoriales" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/cursos", label: "Cursos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/recursos", label: "Recursos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/academia", label: "Academia" },
  { href: "/chat-ia", label: "Chat IA" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              {s.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <p className="text-xs text-neutral-500">2026 Clementech.ai. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
