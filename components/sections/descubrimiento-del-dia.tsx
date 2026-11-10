"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

type Herramienta = {
  nombre: string;
  descripcion: string;
  categoria: string;
  href: string;
  color: string;
  badge?: string;
};

// Pool amplio de herramientas — se rota diariamente
const POOL: Herramienta[] = [
  { nombre: "ChatGPT", descripcion: "El asistente IA más usado del mundo para escribir, analizar y crear.", categoria: "Asistente", href: "https://chatgpt.com/", color: "from-emerald-500 to-teal-500", badge: "Popular" },
  { nombre: "Claude", descripcion: "IA de Anthropic para análisis profundo y escritura de largo aliento.", categoria: "Asistente", href: "https://claude.ai/", color: "from-orange-400 to-amber-500" },
  { nombre: "Gemini", descripcion: "El asistente multimodal de Google integrado con el ecosistema de búsqueda.", categoria: "Asistente", href: "https://gemini.google.com/", color: "from-blue-500 to-indigo-500" },
  { nombre: "Perplexity", descripcion: "Buscador con IA que responde con fuentes verificadas en tiempo real.", categoria: "Investigación", href: "https://www.perplexity.ai/", color: "from-cyan-500 to-blue-500", badge: "Tendencia" },
  { nombre: "Midjourney", descripcion: "Genera imágenes artísticas de alta calidad desde texto.", categoria: "Imagen", href: "https://www.midjourney.com/", color: "from-fuchsia-500 to-purple-500" },
  { nombre: "DALL-E 3", descripcion: "Generación de imágenes fotorrealistas directamente desde ChatGPT.", categoria: "Imagen", href: "https://openai.com/dall-e-3", color: "from-rose-500 to-pink-500" },
  { nombre: "Suno", descripcion: "Crea canciones completas con voz, instrumentos y letra desde una idea.", categoria: "Música", href: "https://suno.com/", color: "from-violet-500 to-purple-600", badge: "Nuevo" },
  { nombre: "Runway", descripcion: "Generación y edición de video con IA de nivel profesional.", categoria: "Video", href: "https://runwayml.com/", color: "from-slate-600 to-gray-700" },
  { nombre: "Kling", descripcion: "Genera videos ultra-realistas de hasta 2 minutos desde texto o imagen.", categoria: "Video", href: "https://klingai.com/", color: "from-zinc-700 to-neutral-800", badge: "Nuevo" },
  { nombre: "Lovable", descripcion: "Construye aplicaciones web completas describiendo lo que necesitas.", categoria: "Desarrollo", href: "https://lovable.dev/", color: "from-pink-500 to-rose-500", badge: "Tendencia" },
  { nombre: "Bolt", descripcion: "Prototipa webs y apps desde lenguaje natural en segundos.", categoria: "Desarrollo", href: "https://bolt.new/", color: "from-yellow-500 to-orange-500" },
  { nombre: "Cursor", descripcion: "Editor de código con IA que escribe y refactoriza contigo.", categoria: "Desarrollo", href: "https://cursor.com/", color: "from-neutral-700 to-stone-800" },
  { nombre: "Gamma", descripcion: "Crea presentaciones, documentos y webs con IA en minutos.", categoria: "Productividad", href: "https://gamma.app/", color: "from-violet-400 to-indigo-500" },
  { nombre: "NotebookLM", descripcion: "Analiza documentos y genera podcasts y resúmenes con IA de Google.", categoria: "Investigación", href: "https://notebooklm.google/", color: "from-teal-500 to-cyan-600", badge: "Gratis" },
  { nombre: "ElevenLabs", descripcion: "Clona voces y genera audio hiperrealista en múltiples idiomas.", categoria: "Audio", href: "https://elevenlabs.io/", color: "from-amber-400 to-yellow-500" },
  { nombre: "HeyGen", descripcion: "Crea videos con avatares IA y traduce contenido en tu propia voz.", categoria: "Video", href: "https://www.heygen.com/", color: "from-sky-500 to-blue-600" },
  { nombre: "Descript", descripcion: "Edita audio y video como si editaras texto; transcripción automática.", categoria: "Video", href: "https://www.descript.com/", color: "from-green-500 to-emerald-600" },
  { nombre: "Krea", descripcion: "Herramientas visuales creativas poco conocidas para imagen y video en tiempo real.", categoria: "Imagen", href: "https://www.krea.ai/", color: "from-fuchsia-400 to-pink-500" },
  { nombre: "Replicate", descripcion: "Ejecuta miles de modelos de IA especializados sin configurar infraestructura.", categoria: "Desarrollo", href: "https://replicate.com/", color: "from-indigo-500 to-blue-700" },
  { nombre: "Luma Dream Machine", descripcion: "Genera y anima videos cinematográficos desde texto o imagen.", categoria: "Video", href: "https://lumalabs.ai/dream-machine", color: "from-neutral-800 to-zinc-900", badge: "Nuevo" },
  { nombre: "Make (Integromat)", descripcion: "Automatiza flujos de trabajo conectando apps con lógica visual.", categoria: "Automatización", href: "https://www.make.com/", color: "from-violet-600 to-purple-700" },
  { nombre: "n8n", descripcion: "Automatización open source con nodos de IA y cientos de integraciones.", categoria: "Automatización", href: "https://n8n.io/", color: "from-orange-500 to-red-500" },
  { nombre: "Pinokio", descripcion: "Instala apps de IA localmente con un solo clic en tu computadora.", categoria: "Local/Open source", href: "https://pinokio.computer/", color: "from-lime-500 to-green-600" },
  { nombre: "Hugging Face Spaces", descripcion: "Prueba demos gratuitas de modelos creados por la comunidad global.", categoria: "Open source", href: "https://huggingface.co/spaces", color: "from-yellow-400 to-amber-500" },
];

// Semilla diaria para que cada día salgan distintas herramientas
function semillaDiaria(): number {
  const hoy = new Date();
  return hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
}

function seleccionarDelDia(cantidad = 6): Herramienta[] {
  const semilla = semillaDiaria();
  const indices = new Set<number>();
  let s = semilla;
  while (indices.size < cantidad) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    indices.add(Math.abs(s) % POOL.length);
  }
  return Array.from(indices).map((i) => POOL[i]);
}

export default function DescubrimientoDelDia() {
  const [herramientas, setHerramientas] = useState<Herramienta[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHerramientas(seleccionarDelDia());
      setVisible(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const hoy = new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="mb-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-amber-500 uppercase">
              <Zap size={13} className="animate-pulse" />
              Descubrimientos del día
            </p>
            <h2 className="text-2xl font-medium text-black dark:text-white">
              IAs y herramientas de hoy
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Selección rotativa · {hoy}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            <Sparkles size={12} />
            Cambia cada día
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {herramientas.map((h, i) => (
            <a
              key={h.nombre}
              href={h.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Gradiente decorativo sutil */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${h.color} opacity-70`}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  {h.badge && (
                    <span className="w-fit rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
                      {h.badge}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    {h.categoria}
                  </span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-neutral-300 transition group-hover:text-amber-500"
                />
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-black dark:text-white">{h.nombre}</h3>
                <p className="mt-1.5 text-sm leading-5 text-neutral-500 dark:text-neutral-400">
                  {h.descripcion}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
