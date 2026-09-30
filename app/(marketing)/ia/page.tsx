"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, Brain, Bookmark, CalendarDays, FileText, Image, Newspaper, Plus, RefreshCw, Search, Sparkles, WandSparkles } from "lucide-react";
import NeuralNetwork from "@/components/ui/neural-network";
import Link from "next/link";

const herramientas = [
  {
    nombre: "ChatGPT",
    descripcion: "Asistente para conversar, escribir y trabajar con ideas.",
    href: "https://chatgpt.com/",
    icon: Bot,
    color: "text-emerald-500",
  },
  {
    nombre: "Claude",
    descripcion: "IA para análisis, escritura y resolución de problemas complejos.",
    href: "https://claude.ai/",
    icon: Brain,
    color: "text-orange-500",
  },
  {
    nombre: "Gemini",
    descripcion: "Asistente de Google para crear, investigar y aprender.",
    href: "https://gemini.google.com/",
    icon: Sparkles,
    color: "text-blue-500",
  },
  {
    nombre: "Perplexity",
    descripcion: "Buscador con IA para investigar con respuestas y fuentes.",
    href: "https://www.perplexity.ai/",
    icon: Search,
    color: "text-cyan-500",
  },
  {
    nombre: "Midjourney",
    descripcion: "Generación de imágenes para explorar ideas visuales.",
    href: "https://www.midjourney.com/",
    icon: Image,
    color: "text-fuchsia-500",
  },
];

const fuentesInvestigacion = [
  ["Hugging Face", "★★★★★", "Modelos y open source", "Explorar modelos, datasets, demos, Spaces y proyectos abiertos de IA.", "https://huggingface.co/"],
  ["Product Hunt", "★★★★★", "Nuevos productos y startups", "Detectar herramientas y aplicaciones recién lanzadas.", "https://www.producthunt.com/"],
  ["GitHub Trending", "★★★★★", "Desarrollo y código", "Identificar repositorios, agentes, frameworks y modelos open source en crecimiento.", "https://github.com/trending"],
  ["Ben's Bites", "★★★★★", "Newsletter y análisis", "Recibir noticias seleccionadas, herramientas nuevas y análisis prácticos.", "https://www.bensbites.com/"],
  ["OpenAI News", "★★★★★", "Fuente oficial", "Seguir lanzamientos, productos, actualizaciones e investigaciones de OpenAI.", "https://openai.com/news/"],
  ["Anthropic Newsroom", "★★★★★", "Fuente oficial", "Seguir Claude, agentes, seguridad e investigación de Anthropic.", "https://www.anthropic.com/news"],
  ["Google AI Blog", "★★★★★", "Fuente oficial", "Conocer novedades de Gemini, investigación aplicada y modelos multimodales.", "https://blog.google/technology/ai/"],
  ["Meta AI Blog", "★★★★★", "Fuente oficial y open source", "Seguir Llama, investigación, modelos multimedia y proyectos abiertos.", "https://ai.meta.com/blog/"],
  ["There's An AI For That", "★★★★☆", "Directorio de herramientas", "Buscar herramientas por tarea: escribir, investigar, programar, diseñar o automatizar.", "https://theresanaiforthat.com/"],
  ["Futurepedia", "★★★★☆", "Directorio y educación", "Comparar herramientas por categorías, funciones y casos de uso.", "https://www.futurepedia.io/"],
  ["The Rundown AI", "★★★★☆", "Newsletter y noticias", "Obtener resúmenes frecuentes de noticias, lanzamientos y herramientas.", "https://www.rundown.ai/"],
  ["X / Twitter", "★★★★☆", "Detección temprana", "Encontrar anuncios, demos y comentarios de investigadores y fundadores.", "https://x.com/"],
  ["Reddit", "★★★★☆", "Comunidad y experiencias reales", "Conocer pruebas, problemas y comparativas independientes de usuarios.", "https://www.reddit.com/r/artificial/"],
  ["arXiv", "★★★★☆", "Investigación académica", "Leer investigaciones sobre lenguaje, visión, agentes, robótica y machine learning.", "https://arxiv.org/list/cs.AI/recent"],
  ["TLDR AI", "★★★★☆", "Resumen diario", "Revisar una selección breve de artículos, papers y noticias de IA.", "https://tldr.tech/ai"],
  ["The Neuron", "★★★☆☆", "Newsletter y aprendizaje", "Seguir tendencias, herramientas, tutoriales y casos prácticos accesibles.", "https://www.theneurondaily.com/"],
  ["Superhuman AI", "★★★☆☆", "Herramientas y productividad", "Encontrar noticias y usos prácticos de IA para el trabajo.", "https://www.superhuman.ai/"],
  ["FutureTools", "★★★☆☆", "Directorio y noticias", "Consultar herramientas y recursos organizados por tipo de uso.", "https://www.futuretools.io/"],
  ["Google Trends", "★★★★☆", "Medición de interés", "Comprobar si una herramienta o término está creciendo en búsquedas.", "https://trends.google.com/"],
  ["YouTube", "★★★☆☆", "Demostraciones y tutoriales", "Ver pruebas reales, tutoriales y comparativas de herramientas.", "https://www.youtube.com/results?search_query= herramientas IA"],
] as const;

const promptsIniciales = [
  { titulo: "Estrategia de producto", texto: "Actúa como estratega de producto. Analiza esta idea, identifica su cliente ideal y propón un plan de validación en 7 días." },
  { titulo: "Contenido para redes", texto: "Crea 5 ideas de contenido para Instagram y TikTok sobre [tema], con gancho, formato, CTA y tono cercano." },
  { titulo: "Automatización de ventas", texto: "Diseña un flujo de automatización para captar, calificar y hacer seguimiento a clientes por WhatsApp." },
];

const noticias = [
  { tipo: "Hoy", titulo: "Los agentes de IA avanzan hacia flujos de trabajo más autónomos", fuente: "Laboratorio IA", tiempo: "Actualizado hoy" },
  { tipo: "Hoy", titulo: "Nuevas herramientas para crear contenido multimodal", fuente: "Radar de herramientas", tiempo: "Actualizado hoy" },
  { tipo: "Semana", titulo: "El open source gana terreno con nuevos modelos y demos", fuente: "Open source", tiempo: "Esta semana" },
  { tipo: "Semana", titulo: "La automatización con IA llega a más equipos pequeños", fuente: "Tendencias", tiempo: "Esta semana" },
];

const actualizaciones = [
  { nombre: "ChatGPT", detalle: "Nuevas funciones de análisis y productividad", fecha: "20 ago 2026", color: "bg-emerald-400" },
  { nombre: "Claude", detalle: "Mejoras en contexto largo y proyectos", fecha: "19 ago 2026", color: "bg-orange-400" },
  { nombre: "Gemini", detalle: "Actualización de capacidades multimodales", fecha: "18 ago 2026", color: "bg-blue-400" },
];

const paginasOcultas = [
  ["Replicate", "Ejecuta modelos de IA especializados sin montar infraestructura.", "https://replicate.com/"],
  ["Krea", "Crea y edita imágenes y vídeo con herramientas visuales poco conocidas.", "https://www.krea.ai/"],
  ["Pinokio", "Instala aplicaciones de IA locales con un solo clic.", "https://pinokio.computer/"],
  ["Hugging Face Spaces", "Prueba demos de modelos creadas por la comunidad.", "https://huggingface.co/spaces"],
  ["Gamma", "Convierte ideas en presentaciones y documentos visuales.", "https://gamma.app/"],
  ["Luma Dream Machine", "Explora generación de vídeo a partir de texto e imágenes.", "https://lumalabs.ai/dream-machine"],
];

const lanzamientos = [
  ["NotebookLM", "Investigación y síntesis de documentos con IA", "https://notebooklm.google/"],
  ["Suno", "Creación de música a partir de una idea", "https://suno.com/"],
  ["Lovable", "Construcción de aplicaciones describiendo lo que necesitas", "https://lovable.dev/"],
  ["Bolt", "Prototipos web generados desde lenguaje natural", "https://bolt.new/"],
];

type NoticiaViva = {
  titulo: string;
  resumen: string;
  fecha: string;
  enlace: string;
  fuente: string;
  tipo: string;
};

async function consultarNoticias() {
  const response = await fetch("/api/ia-feed", { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudieron consultar las fuentes");
  return response.json() as Promise<{ consultadoEn: string; noticias: NoticiaViva[]; fuentesActivas: number; fuentesTotales: number }>;
}

export default function IAPage() {
  const [promptActivo, setPromptActivo] = useState("");
  const [prompts, setPrompts] = useState(promptsIniciales);
  const [documentos, setDocumentos] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("clementech-documentos") ?? "[]"));
  const [herramientasGuardadas, setHerramientasGuardadas] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("clementech-herramientas") ?? "[]"));
  const [filtroNoticias, setFiltroNoticias] = useState("Todas");
  const [ultimaActualizacion, setUltimaActualizacion] = useState("Ahora");
  const [noticiasVivas, setNoticiasVivas] = useState<NoticiaViva[]>([]);
  const [fuentesActivas, setFuentesActivas] = useState(0);
  const [fuentesTotales, setFuentesTotales] = useState(5);
  const [cargandoNoticias, setCargandoNoticias] = useState(true);
  const [errorNoticias, setErrorNoticias] = useState("");
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<NoticiaViva | null>(null);
  const [ahora, setAhora] = useState(0);
  const [seccionActiva, setSeccionActiva] = useState("laboratorio-heading");
  const [mostrarTodasNoticias, setMostrarTodasNoticias] = useState(false);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await consultarNoticias();
        setNoticiasVivas(datos.noticias);
        setFuentesActivas(datos.fuentesActivas);
        setFuentesTotales(datos.fuentesTotales);
        setErrorNoticias("");
        setAhora(Date.now());
        setUltimaActualizacion(new Date(datos.consultadoEn).toLocaleString("es-CO"));
      } catch {
        setErrorNoticias("No se pudo consultar una fuente ahora. Puedes intentarlo de nuevo.");
      } finally {
        setCargandoNoticias(false);
      }
    }
    cargar();
    const reloj = window.setInterval(cargar, 10 * 60 * 1000);
    return () => window.clearInterval(reloj);
  }, []);

  async function revisarAhora() {
    setCargandoNoticias(true);
    try {
      const datos = await consultarNoticias();
      setNoticiasVivas(datos.noticias);
      setFuentesActivas(datos.fuentesActivas);
      setFuentesTotales(datos.fuentesTotales);
      setErrorNoticias("");
      setAhora(Date.now());
      setUltimaActualizacion(new Date(datos.consultadoEn).toLocaleString("es-CO"));
    } catch {
      setErrorNoticias("No se pudo consultar una fuente ahora. Puedes intentarlo de nuevo.");
    } finally {
      setCargandoNoticias(false);
    }
  }

  function guardarDocumento(event: React.ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    const nuevos = [...documentos, archivo.name];
    setDocumentos(nuevos);
    localStorage.setItem("clementech-documentos", JSON.stringify(nuevos));
    event.target.value = "";
  }

  function guardarHerramienta(nombre: string) {
    const nuevas = herramientasGuardadas.includes(nombre) ? herramientasGuardadas.filter((item) => item !== nombre) : [...herramientasGuardadas, nombre];
    setHerramientasGuardadas(nuevas);
    localStorage.setItem("clementech-herramientas", JSON.stringify(nuevas));
  }

  function guardarPrompt() {
    if (!promptActivo.trim()) return;
    const nuevo = { titulo: "Prompt guardado", texto: promptActivo };
    setPrompts((actuales) => [nuevo, ...actuales]);
    setPromptActivo("");
  }

  const noticiasParaMostrar: NoticiaViva[] = noticiasVivas.length > 0 ? noticiasVivas : noticias.map((noticia) => ({ titulo: noticia.titulo, resumen: noticia.titulo, fecha: "2026-08-20T00:00:00.000Z", enlace: "#", fuente: noticia.fuente, tipo: "Laboratorio" }));
  const noticiasFiltradas = filtroNoticias === "Todas" || ahora === 0 ? noticiasParaMostrar : noticiasParaMostrar.filter((noticia) => {
    const antiguedad = ahora - new Date(noticia.fecha).getTime();
    const limite = filtroNoticias === "Hoy" ? 24 * 60 * 60 * 1000 : filtroNoticias === "Semana" ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
    return antiguedad >= 0 && antiguedad < limite;
  });
  const noticiasVisibles = mostrarTodasNoticias ? noticiasFiltradas : noticiasFiltradas.slice(0, 5);
  const actualizacionesVivas = noticiasVivas.filter((noticia) => noticia.tipo === "Actualización oficial" || noticia.tipo === "Investigación").slice(0, 5);
  const actualizacionesParaMostrar: NoticiaViva[] = actualizacionesVivas.length > 0 ? actualizacionesVivas : actualizaciones.map((actualizacion) => ({ titulo: actualizacion.nombre, resumen: actualizacion.detalle, fecha: actualizacion.fecha, enlace: "#", fuente: "Laboratorio IA", tipo: "Actualización" }));

  return (
    <main className="min-h-screen px-6 pb-24 max-w-5xl mx-auto">
      <section className="relative -mx-6 min-h-[500px] overflow-hidden px-6 pt-[365px] sm:pt-[380px]">
        <NeuralNetwork />
        <header className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-sm font-medium text-violet-400">IA</span>
          <h1 className="text-3xl md:text-4xl font-medium mt-2 mb-4 text-black dark:text-white">
            Inteligencia Artificial
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Explora herramientas, novedades y recursos para incorporar la IA a tu trabajo y aprendizaje.
          </p>
        </header>
      </section>

      <section className="mb-20 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-400/20 dark:bg-violet-950/20 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-violet-600 dark:text-violet-400">ASISTENTE IA</p>
          <h2 className="text-2xl font-medium text-slate-950 dark:text-white">Pregunta. Crea. Automatiza.</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Habla con la IA sobre tus ideas, campañas, ventas online y procesos de Dropshipping.</p>
        </div>
        <Link href="/chat-ia" className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-600 sm:mt-0"><Bot size={17} /> Abrir Chat IA <ArrowUpRight size={16} /></Link>
      </section>

      <nav aria-label="Secciones del Laboratorio IA" className="sticky top-16 z-20 mb-12 -mx-2 overflow-x-auto border-y border-neutral-200 bg-white/95 px-2 py-2 backdrop-blur dark:border-neutral-800 dark:bg-black/95">
        <div className="mx-auto flex min-w-max gap-1">
          {[ ["Laboratorio", "laboratorio-heading"], ["Noticias", "noticias-ia"], ["Descubrimientos", "descubrimientos-heading"], ["Lanzamientos", "lanzamientos-heading"], ["Fuentes", "fuentes-heading"] ].map(([label, id]) => <a key={id} href={`#${id}`} aria-current={seccionActiva === id ? "location" : undefined} onClick={() => setSeccionActiva(id)} className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${seccionActiva === id ? "border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "border-transparent text-neutral-500 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-900 dark:hover:text-white"}`}>{label}</a>)}
        </div>
      </nav>

      <section id="laboratorio-heading" className="mb-20 scroll-mt-36" aria-labelledby="laboratorio-heading-title">
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-xs font-semibold tracking-[0.18em] text-cyan-500">ESPACIO DE TRABAJO</p><h2 id="laboratorio-heading-title" className="text-3xl font-medium text-black dark:text-white">Laboratorio IA</h2><p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Un lugar para guardar, probar y descubrir recursos de inteligencia artificial.</p></div>
          <span className="inline-flex items-center gap-2 text-xs text-neutral-500"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Fuentes conectadas {fuentesActivas}/{fuentesTotales} · {ultimaActualizacion}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-5 flex items-start justify-between gap-3"><div><h3 className="flex items-center gap-2 font-medium text-black dark:text-white"><WandSparkles size={18} className="text-violet-500" /> Biblioteca de prompts</h3><p className="mt-1 text-sm text-neutral-500">Guarda, copia y reutiliza instrucciones.</p></div><span className="text-xs text-neutral-400">{prompts.length} guardados</span></div>
            <textarea value={promptActivo} onChange={(event) => setPromptActivo(event.target.value)} placeholder="Escribe un prompt para guardarlo..." className="mb-3 min-h-20 w-full resize-y rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm outline-none focus:border-violet-500 dark:border-neutral-800 dark:bg-neutral-900" />
            <button onClick={guardarPrompt} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600"><Plus size={15} /> Guardar prompt</button>
            <div className="space-y-2">{prompts.map((prompt, index) => <div key={`${prompt.titulo}-${index}`} className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800"><div className="flex items-center justify-between gap-3"><h4 className="text-sm font-medium text-black dark:text-white">{prompt.titulo}</h4><button onClick={() => navigator.clipboard.writeText(prompt.texto)} className="text-xs text-violet-600 dark:text-violet-400">Copiar</button></div><p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{prompt.texto}</p></div>)}</div>
          </article>

          <article className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-5"><h3 className="flex items-center gap-2 font-medium text-black dark:text-white"><FileText size={18} className="text-cyan-500" /> Archivos y herramientas</h3><p className="mt-1 text-sm text-neutral-500">Tu biblioteca privada, como un espacio de documentos.</p></div>
            <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 px-4 py-4 text-sm text-neutral-500 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-neutral-700 dark:hover:border-cyan-400"><Plus size={16} /> Guardar archivo<input type="file" accept=".pdf,.doc,.docx,.txt,.md" onChange={guardarDocumento} className="sr-only" /></label>
            <div className="mb-5 space-y-2">{documentos.length === 0 ? <p className="text-xs text-neutral-400">Todavía no has guardado documentos.</p> : documentos.map((documento) => <div key={documento} className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2.5 text-sm dark:bg-neutral-900"><FileText size={15} className="text-cyan-500" /> <span className="truncate">{documento}</span></div>)}</div>
            <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">Herramientas guardadas · {herramientasGuardadas.length}</p><div className="flex flex-wrap gap-2">{herramientas.map((herramienta) => <button key={herramienta.nombre} onClick={() => guardarHerramienta(herramienta.nombre)} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${herramientasGuardadas.includes(herramienta.nombre) ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300" : "border-neutral-200 text-neutral-500 dark:border-neutral-800"}`}><Bookmark size={13} fill={herramientasGuardadas.includes(herramienta.nombre) ? "currentColor" : "none"} /> {herramienta.nombre}</button>)}</div></div>
          </article>
        </div>
      </section>

      <section id="noticias-ia" className="mb-20 scroll-mt-36 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" aria-label="Noticias y actualizaciones de IA">
        <article className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"><div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h3 className="flex items-center gap-2 font-medium text-black dark:text-white"><Newspaper size={18} className="text-cyan-500" /> Noticias de IA</h3><p className="mt-1 text-sm text-neutral-500">Resumen breve del día, semana y mes desde fuentes conectadas.</p></div><div className="flex flex-wrap gap-1 rounded-lg bg-neutral-100 p-1 text-xs dark:bg-neutral-900">{["Todas", "Hoy", "Semana", "Mes"].map((filtro) => <button key={filtro} onClick={() => { setFiltroNoticias(filtro); setMostrarTodasNoticias(false); }} className={`rounded-md px-2 py-1 ${filtroNoticias === filtro ? "bg-white text-black shadow-sm dark:bg-neutral-700 dark:text-white" : "text-neutral-500"}`}>{filtro}</button>)}</div></div>{errorNoticias && <p className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">{errorNoticias}</p>}<div className="mb-4 flex items-center gap-2 text-xs text-neutral-400"><CalendarDays size={14} /> {noticiasFiltradas.length} noticias disponibles · mostrando {Math.min(noticiasVisibles.length, 5)}</div><div className="grid gap-3">{cargandoNoticias ? <p className="text-sm text-neutral-500">Consultando fuentes...</p> : noticiasVisibles.map((noticia) => <button key={`${noticia.fuente}-${noticia.titulo}`} onClick={() => setNoticiaSeleccionada(noticia)} className="rounded-lg border border-neutral-200 p-3 text-left transition hover:border-cyan-400 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"><div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400"><span>{new Date(noticia.fecha).toLocaleString("es-CO")}</span><span>·</span><span>{noticia.fuente}</span></div><h4 className="mt-1 text-sm font-medium text-black dark:text-white">{noticia.titulo}</h4><p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500 dark:text-neutral-400">{noticia.resumen}</p><span className="mt-2 inline-block text-xs font-medium text-cyan-600 dark:text-cyan-400">Leer noticia completa</span></button>)}</div>{noticiasFiltradas.length > 5 && <button onClick={() => setMostrarTodasNoticias((actual) => !actual)} className="mt-4 text-sm font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400">{mostrarTodasNoticias ? "Mostrar menos" : `Ver las ${noticiasFiltradas.length} noticias`}</button>}</article>
        <article className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"><div className="mb-5"><h3 className="flex items-center gap-2 font-medium text-black dark:text-white"><RefreshCw size={18} className="text-violet-500" /> Actualizaciones de IA</h3><p className="mt-1 text-sm text-neutral-500">Últimos cambios publicados por las fuentes oficiales.</p></div><div className="space-y-3">{actualizacionesParaMostrar.map((actualizacion) => <a key={`${actualizacion.fuente}-${actualizacion.titulo}`} href={actualizacion.enlace} target={actualizacion.enlace === "#" ? undefined : "_blank"} rel="noreferrer" className="flex gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-400" /><div><h4 className="text-sm font-medium text-black dark:text-white">{actualizacion.titulo}</h4><p className="text-xs text-neutral-500">{actualizacion.resumen}</p><span className="text-[11px] text-neutral-400">{new Date(actualizacion.fecha).toLocaleString("es-CO")} · {actualizacion.fuente}</span></div></a>)}</div><button onClick={revisarAhora} disabled={cargandoNoticias} className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-violet-600 disabled:opacity-50 dark:text-violet-400"><RefreshCw size={13} className={cargandoNoticias ? "animate-spin" : ""} /> {cargandoNoticias ? "Consultando..." : "Revisar ahora"}</button></article>
      </section>

      {noticiaSeleccionada && <div role="dialog" aria-modal="true" aria-label="Noticia completa" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-5" onClick={() => setNoticiaSeleccionada(null)}><article className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-950" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">{noticiaSeleccionada.fuente} · {new Date(noticiaSeleccionada.fecha).toLocaleString("es-CO")}</p><h2 className="mt-2 text-2xl font-medium text-black dark:text-white">{noticiaSeleccionada.titulo}</h2></div><button onClick={() => setNoticiaSeleccionada(null)} className="text-sm text-neutral-500 hover:text-black dark:hover:text-white">Cerrar</button></div><p className="mt-5 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{noticiaSeleccionada.resumen}</p><a href={noticiaSeleccionada.enlace} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-cyan-600">Leer fuente original <ArrowUpRight size={15} /></a></article></div>}

      <section id="descubrimientos-heading" className="mb-20 scroll-mt-36" aria-labelledby="descubrimientos-title"><div className="mb-7"><p className="mb-2 text-xs font-semibold tracking-[0.18em] text-amber-500">RADAR DE DESCUBRIMIENTO</p><h2 id="descubrimientos-title" className="text-2xl font-medium text-black dark:text-white">Páginas y herramientas que pocos conocen</h2><p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Recursos para crear, investigar y trabajar con IA.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{paginasOcultas.map(([nombre, descripcion, href]) => <a key={nombre} href={href} target="_blank" rel="noreferrer" className="group rounded-xl border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-amber-400 dark:border-neutral-800 dark:bg-neutral-950"><div className="flex items-start justify-between gap-3"><h3 className="font-medium text-black dark:text-white">{nombre}</h3><ArrowUpRight size={16} className="text-neutral-400 group-hover:text-amber-500" /></div><p className="mt-2 text-sm leading-5 text-neutral-500 dark:text-neutral-400">{descripcion}</p></a>)}</div></section>

      <section id="lanzamientos-heading" className="mb-20 scroll-mt-36" aria-labelledby="lanzamientos-title"><div className="mb-7"><p className="mb-2 text-xs font-semibold tracking-[0.18em] text-emerald-500">LANZAMIENTOS</p><h2 id="lanzamientos-title" className="text-2xl font-medium text-black dark:text-white">Últimas IAs y herramientas nuevas</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{lanzamientos.map(([nombre, descripcion, href]) => <a key={nombre} href={href} target="_blank" rel="noreferrer" className="group rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"><span className="mb-4 inline-flex rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">Nuevo</span><h3 className="font-medium text-black dark:text-white">{nombre}</h3><p className="mt-2 text-sm leading-5 text-neutral-500 dark:text-neutral-400">{descripcion}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">Explorar <ArrowUpRight size={14} /></span></a>)}</div></section>

      <section aria-labelledby="novedades-heading">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-violet-500 mb-2">DIRECTORIO IA</p>
            <h2 id="novedades-heading" className="text-2xl font-medium text-black dark:text-white">
              NOVEDADES Y ACTUALIZACIONES
            </h2>
          </div>
          <span className="hidden sm:block text-sm text-neutral-500">Enlaces directos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {herramientas.map((herramienta) => {
            const Icon = herramienta.icon;

            return (
              <a
                key={herramienta.nombre}
                href={herramienta.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-44 flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon size={25} className={herramienta.color} aria-hidden="true" />
                  <ArrowUpRight size={18} className="text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white">{herramienta.nombre}</h3>
                  <p className="mt-1 text-sm leading-5 text-neutral-500 dark:text-neutral-400">{herramienta.descripcion}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="fuentes-heading" className="mt-20">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-500 mb-2">PANEL DE INVESTIGACIÓN</p>
          <h2 id="fuentes-heading" className="text-2xl md:text-3xl font-medium text-black dark:text-white">
            Las 20 mejores fuentes para investigar IA
          </h2>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Ordenadas de mayor a menor valor estratégico para detectar novedades, validar información y medir tendencias.
          </p>
        </div>

        <ol className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {fuentesInvestigacion.map(([nombre, estrellas, categoria, descripcion, href], index) => (
            <li key={nombre} className="group flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <h3 className="font-medium text-black dark:text-white">{nombre}</h3>
                  <span className="text-amber-500 tracking-wide" aria-label={`${estrellas} de cinco estrellas`}>{estrellas}</span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cyan-600 dark:text-cyan-400">{categoria}</p>
                <p className="mt-2 text-sm leading-5 text-neutral-500 dark:text-neutral-400">{descripcion}</p>
                <a href={href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400">
                  Enlace directo <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
