"use client";

import { useState, useEffect } from "react";
import { Search, BookmarkPlus, Trash2, BookOpen } from "lucide-react";

export default function BibliotecaPage() {
  const [busqueda, setBusqueda] = useState("crecimiento personal finanzas");
  const [resultados, setResultados] = useState<any[]>([]);
  const [guardados, setGuardados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const [vista, setVista] = useState<"buscar" | "guardados">("buscar");

  async function buscar(e?: React.FormEvent) {
    e?.preventDefault();
    setCargando(true);
    const res = await fetch(`/api/libros/buscar?q=${encodeURIComponent(busqueda)}`);
    const data = await res.json();
    setResultados(data.libros || []);
    setCargando(false);
  }

  async function cargarGuardados() {
    const res = await fetch("/api/libros/guardados");
    const data = await res.json();
    setGuardados(data.libros || []);
  }

  useEffect(() => {
    buscar();
    cargarGuardados();
  }, []);

  async function guardarLibro(libro: any) {
    await fetch("/api/libros/guardados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: libro.titulo,
        autor: libro.autor,
        portada_url: libro.portada_url,
        key: libro.key,
      }),
    });
    cargarGuardados();
  }

  async function borrarGuardado(id: string) {
    await fetch(`/api/libros/guardados?id=${id}`, { method: "DELETE" });
    cargarGuardados();
  }

  async function cambiarEstado(id: string, estado: string) {
    await fetch("/api/libros/guardados", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado }),
    });
    cargarGuardados();
  }

  return (
    <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Biblioteca</span>
      <h1 className="text-3xl font-medium mt-2 mb-2 text-black dark:text-white">
        Libros de crecimiento personal y finanzas
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Busca libros reales, guarda los que te interesen y lleva tu progreso de lectura.
      </p>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setVista("buscar")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${vista === "buscar" ? "bg-cyan-500 text-white" : "border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"}`}
        >
          Buscar
        </button>
        <button
          onClick={() => setVista("guardados")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${vista === "guardados" ? "bg-cyan-500 text-white" : "border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"}`}
        >
          Mis libros ({guardados.length})
        </button>
      </div>

      {vista === "buscar" && (
        <>
          <form onSubmit={buscar} className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3 text-neutral-400" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar libros (ej: habitos atomicos)"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
              />
            </div>
            <button type="submit" className="bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
              Buscar
            </button>
          </form>

          {cargando && <p className="text-sm text-neutral-500">Buscando...</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {resultados.map((libro) => (
              <div key={libro.key} className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3">
                <div className="aspect-[2/3] bg-neutral-100 dark:bg-neutral-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {libro.portada_url ? (
                    <img src={libro.portada_url} alt={libro.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen size={32} className="text-neutral-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-black dark:text-white line-clamp-2">{libro.titulo}</p>
                <p className="text-xs text-neutral-500 mb-2">{libro.autor}</p>
                <button
                  onClick={() => guardarLibro(libro)}
                  className="w-full flex items-center justify-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 rounded-lg py-1.5"
                >
                  <BookmarkPlus size={14} /> Guardar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {vista === "guardados" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {guardados.map((libro) => (
            <div key={libro.id} className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3">
              <div className="aspect-[2/3] bg-neutral-100 dark:bg-neutral-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {libro.portada_url ? (
                  <img src={libro.portada_url} alt={libro.titulo} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen size={32} className="text-neutral-400" />
                )}
              </div>
              <p className="text-sm font-medium text-black dark:text-white line-clamp-2">{libro.titulo}</p>
              <p className="text-xs text-neutral-500 mb-2">{libro.autor}</p>
              <select
                value={libro.estado}
                onChange={(e) => cambiarEstado(libro.id, e.target.value)}
                className="w-full text-xs mb-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent py-1"
              >
                <option>Por leer</option>
                <option>Leyendo</option>
                <option>Terminado</option>
              </select>
              <button
                onClick={() => borrarGuardado(libro.id)}
                className="w-full flex items-center justify-center gap-1 text-xs font-medium text-red-500 border border-red-500/30 rounded-lg py-1.5"
              >
                <Trash2 size={14} /> Quitar
              </button>
            </div>
          ))}
          {guardados.length === 0 && (
            <p className="col-span-full text-sm text-neutral-500 text-center py-10">
              Aun no has guardado libros. Ve a "Buscar" para agregar algunos.
            </p>
          )}
        </div>
      )}
    </main>
  );
}