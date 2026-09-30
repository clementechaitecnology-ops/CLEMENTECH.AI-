import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 rounded-full px-4 py-1.5 mb-8">
          <Sparkles size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">Plataforma de IA en constante crecimiento</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-medium mb-6 leading-tight tracking-tight text-black dark:text-white">
          Aprende IA.
          <br />
          <span className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-violet-500 dark:from-cyan-400 dark:via-cyan-300 dark:to-violet-400 bg-clip-text text-transparent">
            Crea el futuro.
          </span>
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
          Tutoriales, automatizacion y soluciones digitales impulsadas por inteligencia artificial.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/tutoriales"
            className="group inline-flex items-center gap-2 bg-cyan-500 dark:bg-cyan-400 text-white dark:text-black font-medium px-6 py-3 rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-colors"
          >
            Explorar contenido
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/chat-ia"
            className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white font-medium px-6 py-3 rounded-lg hover:border-violet-500 dark:hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Probar Chat IA
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto border-t border-neutral-300 dark:border-neutral-800 pt-8">
          <div>
            <p className="text-2xl font-medium text-black dark:text-white">14+</p>
            <p className="text-xs text-neutral-500 mt-1">Secciones</p>
          </div>
          <div>
            <p className="text-2xl font-medium text-black dark:text-white">100%</p>
            <p className="text-xs text-neutral-500 mt-1">En espanol</p>
          </div>
          <div>
            <p className="text-2xl font-medium text-black dark:text-white">IA</p>
            <p className="text-xs text-neutral-500 mt-1">Impulsado</p>
          </div>
        </div>
      </div>
    </section>
  );
}