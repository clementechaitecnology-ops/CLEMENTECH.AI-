import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl px-8 py-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl font-medium mb-4 text-black dark:text-white">Tienes un proyecto en mente?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            Conversemos sobre como la inteligencia artificial puede impulsar tu proximo proyecto.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-cyan-500 dark:bg-cyan-400 text-white dark:text-black font-medium px-6 py-3 rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-colors"
          >
            Hablemos
          </Link>
        </div>
      </div>
    </section>
  );
}