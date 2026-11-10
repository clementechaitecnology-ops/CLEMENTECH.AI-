"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArrowUpRight, Bookmark, Search, Sparkles } from "lucide-react";
import { fuentesIA, type CategoriaFuente } from "@/data/ai-directory";

const STORAGE_KEY = "clementech-ai-directory-favorites";
const FAVORITES_CHANGE_EVENT = "clementech-ai-directory-favorites-change";
const STORAGE_UNAVAILABLE = "__storage_unavailable__";
const PAGE_SIZE = 24;
const TOTAL_PRIORITARIAS = fuentesIA.filter(
  (fuente) => fuente.prioridad !== null,
).length;
const CATEGORIAS: { value: CategoriaFuente | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "directorios", label: "Directorios" },
  { value: "lanzamientos", label: "Lanzamientos" },
  { value: "laboratorios", label: "Laboratorios" },
  { value: "buscadores", label: "Buscadores" },
  { value: "papers", label: "Papers e investigación" },
  { value: "modelos", label: "Modelos y open source" },
  { value: "benchmarks", label: "Benchmarks" },
  { value: "noticias", label: "Noticias" },
  { value: "tendencias", label: "Tendencias y startups" },
  { value: "apis", label: "APIs y proveedores" },
  { value: "rss", label: "RSS y monitoreo" },
];

function subscribeToFavorites(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FAVORITES_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FAVORITES_CHANGE_EVENT, onChange);
  };
}

function getFavoritesSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return STORAGE_UNAVAILABLE;
  }
}

function getServerFavoritesSnapshot() {
  return "[]";
}

function parseFavorites(snapshot: string): string[] | null {
  try {
    const parseado: unknown = JSON.parse(snapshot);
    return Array.isArray(parseado) &&
      parseado.every((id): id is string => typeof id === "string")
      ? parseado
      : null;
  } catch {
    return null;
  }
}

export default function AiDirectory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<CategoriaFuente | "todas">("todas");
  const [soloPrioridad, setSoloPrioridad] = useState(false);
  const [soloGuardadas, setSoloGuardadas] = useState(false);
  const [movimientoReducido, setMovimientoReducido] = useState(false);
  const [errorVideo, setErrorVideo] = useState(false);
  const [paginacion, setPaginacion] = useState({ filtro: "", limite: PAGE_SIZE });
  const [errorGuardado, setErrorGuardado] = useState("");
  const favoritesSnapshot = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    getServerFavoritesSnapshot,
  );
  const guardadas = useMemo(
    () => parseFavorites(favoritesSnapshot) ?? [],
    [favoritesSnapshot],
  );
  const favoritosInvalidos =
    favoritesSnapshot !== STORAGE_UNAVAILABLE &&
    parseFavorites(favoritesSnapshot) === null;

  useEffect(() => {
    const preferenciaMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const actualizarReproduccion = () => {
      setMovimientoReducido(preferenciaMovimiento.matches);
      if (preferenciaMovimiento.matches) {
        videoRef.current?.pause();
      } else if (videoRef.current) {
        void videoRef.current.play().catch(() => setErrorVideo(true));
      }
    };

    actualizarReproduccion();
    preferenciaMovimiento.addEventListener("change", actualizarReproduccion);
    return () =>
      preferenciaMovimiento.removeEventListener("change", actualizarReproduccion);
  }, []);

  const filtroActual = JSON.stringify([
    categoria,
    query,
    soloGuardadas,
    soloPrioridad,
  ]);
  const limiteVisible =
    paginacion.filtro === filtroActual ? paginacion.limite : PAGE_SIZE;

  const resultados = useMemo(() => {
    const termino = query.trim().toLocaleLowerCase("es");
    const filtrados = fuentesIA.filter((fuente) => {
      const coincideTexto =
        !termino ||
        fuente.nombre.toLocaleLowerCase("es").includes(termino) ||
        fuente.descripcion.toLocaleLowerCase("es").includes(termino) ||
        fuente.categoriaLabel.toLocaleLowerCase("es").includes(termino) ||
        new URL(fuente.url).hostname.toLocaleLowerCase("es").includes(termino);
      const coincideCategoria =
        categoria === "todas" || fuente.categoria === categoria;
      const coincidePrioridad = !soloPrioridad || fuente.prioridad !== null;
      const coincideGuardado = !soloGuardadas || guardadas.includes(fuente.id);

      return (
        coincideTexto &&
        coincideCategoria &&
        coincidePrioridad &&
        coincideGuardado
      );
    });

    if (soloPrioridad) {
      filtrados.sort((a, b) => (a.prioridad ?? 0) - (b.prioridad ?? 0));
    }

    return filtrados;
  }, [categoria, guardadas, query, soloGuardadas, soloPrioridad]);

  function alternarGuardado(id: string) {
    const nuevasGuardadas = guardadas.includes(id)
      ? guardadas.filter((guardado) => guardado !== id)
      : [...guardadas, id];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasGuardadas));
      setErrorGuardado("");
      window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT));
    } catch {
      setErrorGuardado("No se pudieron guardar los cambios en este navegador.");
    }
  }

  return (
    <section
      id="ai-directory"
      aria-labelledby="ai-directory-title"
      className="mb-20 scroll-mt-36"
    >
      <header className="mb-8 border-b border-neutral-200 pb-7 text-center dark:border-neutral-800">
        <div className="relative mx-auto mb-7 max-w-6xl overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950 shadow-[0_0_48px_rgba(6,182,212,0.16)]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="auto"
            aria-label="Globo terráqueo giratorio con todos los continentes, códigos animados y conexiones tecnológicas de CLEMENTECH.AI"
            className="aspect-video w-full object-cover"
            onError={() => setErrorVideo(true)}
            onLoadedData={() => setErrorVideo(false)}
          >
            <source
              src="/videos/clementech-ai-research-globe.mp4"
              type="video/mp4"
            />
            Tu navegador no puede reproducir este video.
          </video>
          {movimientoReducido && (
            <p className="absolute bottom-3 left-3 rounded-md bg-black/75 px-3 py-1.5 text-xs text-white">
              Video pausado según tu preferencia de movimiento reducido.
            </p>
          )}
          {errorVideo && (
            <p
              role="status"
              className="absolute inset-x-3 bottom-3 rounded-md bg-black/80 px-3 py-2 text-sm text-white"
            >
              Este navegador no pudo reproducir el video.{" "}
              <a
                href="/videos/clementech-ai-research-globe.mp4"
                className="underline underline-offset-2"
              >
                Abrir el video directamente
              </a>
              .
            </p>
          )}
        </div>
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-cyan-700 dark:text-cyan-200 sm:text-xs sm:tracking-[0.2em]">
            <Sparkles size={14} aria-hidden="true" />
            CLEMENTECH AI DISCOVERY
            <span className="text-cyan-500/50 dark:text-cyan-100/40">·</span>
            GLOBAL AI RESEARCH INTELLIGENCE
          </p>
          <h2
            id="ai-directory-title"
            className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl"
          >
            Centro de investigación CLEMENTECH.AI
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400 sm:text-base">
            Explora el panorama global de inteligencia artificial: laboratorios,
            modelos, publicaciones y herramientas en un solo centro de
            investigación.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
          <span className="rounded-full border border-cyan-200/20 bg-cyan-50 px-3 py-1.5 text-xs text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-200">
            {fuentesIA.length} fuentes globales
          </span>
          <span className="rounded-full border border-violet-200/30 bg-violet-50 px-3 py-1.5 text-xs text-violet-800 dark:bg-violet-400/10 dark:text-violet-200">
            {TOTAL_PRIORITARIAS} fuentes prioritarias
          </span>
        </div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="relative block">
          <Search
            size={17}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPaginacion({ filtro: "", limite: PAGE_SIZE });
            }}
            placeholder="Buscar por nombre, función o dominio..."
            aria-label="Buscar fuentes de inteligencia artificial"
            className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
          />
        </label>
        <button
          type="button"
          aria-pressed={soloPrioridad}
          onClick={() => {
            setSoloPrioridad((actual) => !actual);
            setPaginacion({ filtro: "", limite: PAGE_SIZE });
          }}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
            soloPrioridad
              ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-amber-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
          }`}
        >
          Top 30
        </button>
        <button
          type="button"
          aria-pressed={soloGuardadas}
          onClick={() => {
            setSoloGuardadas((actual) => !actual);
            setPaginacion({ filtro: "", limite: PAGE_SIZE });
          }}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
            soloGuardadas
              ? "border-cyan-400 bg-cyan-50 text-cyan-800 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-300"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-cyan-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
          }`}
        >
          <Bookmark size={15} aria-hidden="true" />
          Guardadas ({guardadas.length})
        </button>
      </div>

      <div
        role="group"
        aria-label="Filtrar fuentes por categoría"
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
      >
        {CATEGORIAS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={categoria === item.value}
            onClick={() => {
              setCategoria(item.value);
              setPaginacion({ filtro: "", limite: PAGE_SIZE });
            }}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition ${
              categoria === item.value
                ? "border-cyan-500 bg-cyan-500 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-cyan-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {(errorGuardado || favoritosInvalidos || favoritesSnapshot === STORAGE_UNAVAILABLE) && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300"
        >
          {errorGuardado ||
            (favoritesSnapshot === STORAGE_UNAVAILABLE
              ? "El navegador no permitió acceder a los favoritos."
              : "No se pudieron restaurar los favoritos guardados.")}
        </p>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <p aria-live="polite">
          {resultados.length} {resultados.length === 1 ? "fuente" : "fuentes"}
          {categoria !== "todas" &&
            ` · ${CATEGORIAS.find((item) => item.value === categoria)?.label}`}
        </p>
        <p>Enlaces directos · 11 áreas de investigación</p>
      </div>

      {resultados.length > 0 ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {resultados.slice(0, limiteVisible).map((fuente) => (
              <article
                key={fuente.id}
                className="flex min-h-52 flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-cyan-400/40"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                    {fuente.categoriaLabel}
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    {fuente.prioridad !== null && (
                      <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                        Top {fuente.prioridad}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label={
                        guardadas.includes(fuente.id)
                          ? `Quitar ${fuente.nombre} de guardadas`
                          : `Guardar ${fuente.nombre}`
                      }
                      aria-pressed={guardadas.includes(fuente.id)}
                      onClick={() => alternarGuardado(fuente.id)}
                      className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-amber-500 dark:hover:bg-neutral-900"
                    >
                      <Bookmark
                        size={16}
                        fill={
                          guardadas.includes(fuente.id)
                            ? "currentColor"
                            : "none"
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium leading-6 text-black dark:text-white">
                  {fuente.nombre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                  {fuente.descripcion}
                </p>
                <a
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-400"
                >
                  Abrir fuente original
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          {limiteVisible < resultados.length && (
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() =>
                  setPaginacion({
                    filtro: filtroActual,
                    limite: limiteVisible + PAGE_SIZE,
                  })
                }
                className="rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-cyan-400"
              >
                Mostrar más fuentes (
                {Math.min(PAGE_SIZE, resultados.length - limiteVisible)})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-5 py-14 text-center dark:border-neutral-700">
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            No encontramos fuentes con esos filtros.
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Cambia la búsqueda o selecciona otra categoría.
          </p>
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-neutral-400 dark:text-neutral-500">
        Catálogo curado a partir de las fuentes compartidas. Los enlaces llevan
        directamente a cada sitio; su disponibilidad, contenido y condiciones
        pueden cambiar y deben verificarse antes de automatizar consultas.
      </p>
    </section>
  );
}
