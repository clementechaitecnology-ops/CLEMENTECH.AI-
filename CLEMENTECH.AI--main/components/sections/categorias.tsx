import Link from "next/link";
import { Brain, BookOpen, Newspaper, Video, GraduationCap, Briefcase } from "lucide-react";

const categorias = [
  { href: "/ia", label: "IA", desc: "Herramientas y novedades", icon: Brain, color: "text-violet-600 dark:text-violet-400" },
  { href: "/tutoriales", label: "Tutoriales", desc: "Aprende paso a paso", icon: BookOpen, color: "text-cyan-600 dark:text-cyan-400" },
  { href: "/blog", label: "Blog", desc: "Articulos y analisis", icon: Newspaper, color: "text-cyan-600 dark:text-cyan-400" },
  { href: "/videos", label: "Videos", desc: "Contenido audiovisual", icon: Video, color: "text-cyan-600 dark:text-cyan-400" },
  { href: "/cursos", label: "Cursos", desc: "Rutas de aprendizaje", icon: GraduationCap, color: "text-cyan-600 dark:text-cyan-400" },
  { href: "/servicios", label: "Servicios", desc: "Soluciones a medida", icon: Briefcase, color: "text-cyan-600 dark:text-cyan-400" },
];

export default function Categorias() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-2">Explora</p>
        <h2 className="text-3xl font-medium text-black dark:text-white">Todo lo que necesitas en un solo lugar</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all"
            >
              <Icon size={24} className={`${cat.color} mb-4`} />
              <h3 className="text-black dark:text-white font-medium mb-1">{cat.label}</h3>
              <p className="text-sm text-neutral-500">{cat.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}