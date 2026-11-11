"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Bell,
  BellOff,
  Trash2,
  BookOpen,
  Clock,
  Check,
  Sparkles,
  Flame,
  Lightbulb,
  Calendar,
  Send,
} from "lucide-react";

import Hourglass from "@/components/ui/hourglass";

type Tarea = {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha_hora: string | null;
  prioridad: string;
  con_alarma: boolean;
  estado: string;
};

type LibroSugerido = {
  key: string;
  titulo: string;
  portada_url: string | null;
};

const prioridadColor: Record<string, string> = {
  Alta: "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-400/10",
  Media:
    "text-amber-600 bg-amber-100 dark:text-amber-300 dark:bg-amber-400/10",
  Baja:
    "text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-400/10",
};

function inicioSemana() {
  const hoy = new Date();
  const dia = hoy.getDay();
  const diff = hoy.getDate() - dia + (dia === 0 ? -6 : 1);

  const lunes = new Date(hoy.setDate(diff));

  lunes.setHours(0, 0, 0, 0);

  return lunes;
}

export default function OrganizacionPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [librosSugeridos, setLibrosSugeridos] = useState<LibroSugerido[]>([]);
  const [racha, setRacha] = useState(0);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [permisoNotif, setPermisoNotif] =
    useState<string>("default");

  const [vista, setVista] = useState<"dia" | "semana" | "mes">(
    "dia"
  );

  const [pregunta, setPregunta] = useState("");
  const [respuestaIA, setRespuestaIA] = useState("");
  const [cargandoIA, setCargandoIA] = useState(false);

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    fecha_hora: "",
    prioridad: "Media",
    con_alarma: false,
  });

  const cargarTodo = useCallback(async () => {
    try {
      const [
        rTareas,
        rLibrosS,
        rRacha,
      ] = await Promise.all([
        fetch("/api/centro-accion/tareas", {
          cache: "no-store",
        })
          .then((r) => r.json())
          .catch(() => ({ tareas: [] })),

        fetch("/api/libros/buscar", {
          cache: "no-store",
        })
          .then((r) => r.json())
          .catch(() => ({ libros: [] })),

        fetch("/api/centro-accion/racha", {
          cache: "no-store",
        })
          .then((r) => r.json())
          .catch(() => ({ racha: 0 })),
      ]);

      setTareas(rTareas.tareas || []);

      setLibrosSugeridos(
        (rLibrosS.libros || []).slice(0, 6)
      );

      setRacha(rRacha.racha || 0);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }, []);

  useEffect(() => {
    let activo = true;
    async function cargarInicial() {
      await Promise.resolve();
      if (!activo) return;
      await cargarTodo();
      if ("Notification" in window) {
        setPermisoNotif(Notification.permission);
      }
    }
    void cargarInicial();
    return () => {
      activo = false;
    };
  }, [cargarTodo]);

  useEffect(() => {
    const chequeo = setInterval(() => {
      const ahora = new Date();

      tareas.forEach((t) => {
        if (
          t.con_alarma &&
          t.fecha_hora &&
          t.estado !== "Hecho"
        ) {
          const diferencia =
            new Date(t.fecha_hora).getTime() -
            ahora.getTime();

          if (
            diferencia > 0 &&
            diferencia < 60000 &&
            permisoNotif === "granted"
          ) {
            new Notification(
              "Recordatorio: " + t.titulo,
              {
                body:
                  t.descripcion ||
                  "Es hora de tu tarea.",
              }
            );
          }
        }
      });
    }, 30000);

    return () => clearInterval(chequeo);
  }, [tareas, permisoNotif]);

  function pedirPermisoNotificaciones() {
    if ("Notification" in window) {
      Notification.requestPermission().then(
        setPermisoNotif
      );
    }
  }

  async function crearTarea(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/centro-accion/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea),
    });

    setNuevaTarea({
      titulo: "",
      descripcion: "",
      fecha_hora: "",
      prioridad: "Media",
      con_alarma: false,
    });

    setModalAbierto(false);

    cargarTodo();
  }

  async function marcarHecha(
    id: string,
    estadoActual: string
  ) {
    await fetch("/api/centro-accion/tareas", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        estado:
          estadoActual === "Hecho"
            ? "Pendiente"
            : "Hecho",
      }),
    });

    cargarTodo();
  }

  async function borrarTarea(id: string) {
    await fetch(
      `/api/centro-accion/tareas?id=${id}`,
      {
        method: "DELETE",
      }
    );

    cargarTodo();
  }

  async function preguntarIA(e: React.FormEvent) {
    e.preventDefault();

    if (!pregunta.trim()) return;

    setCargandoIA(true);
    setRespuestaIA("");

    try {
      const res = await fetch(
        "/api/centro-accion/asistente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregunta,
          }),
        }
      );

      const data = await res.json();

      setRespuestaIA(
        data.respuesta || "Sin respuesta."
      );
    } catch {
      setRespuestaIA(
        "No se pudo conectar con el asistente."
      );
    }

    setCargandoIA(false);
  }

  const ahora = new Date();

  const finDia = new Date(ahora);
  finDia.setHours(23, 59, 59, 999);

  const lunes = inicioSemana();

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  const finMes = new Date(
    ahora.getFullYear(),
    ahora.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  const inicioHoy = new Date();
  inicioHoy.setHours(0, 0, 0, 0);

  function filtrarPorRango(
    inicio: Date,
    fin: Date
  ) {
    return tareas.filter((t) => {
      if (!t.fecha_hora) {
        return vista === "dia";
      }

      const fecha = new Date(t.fecha_hora);

      return (
        fecha >= inicio &&
        fecha <= fin
      );
    });
  }

  const tareasVista =
    vista === "dia"
      ? filtrarPorRango(
          inicioHoy,
          finDia
        )
      : vista === "semana"
        ? filtrarPorRango(
            lunes,
            domingo
          )
        : filtrarPorRango(
            new Date(
              ahora.getFullYear(),
              ahora.getMonth(),
              1
            ),
            finMes
          );

  const tareasPendientes =
    tareasVista.filter(
      (t) => t.estado !== "Hecho"
    );

  const tareasHechas =
    tareasVista.filter(
      (t) => t.estado === "Hecho"
    );

  const altaPrioridadPendiente =
    tareasPendientes.filter(
      (t) => t.prioridad === "Alta"
    ).length;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-24 w-full">
      <div className="w-full max-w-[1800px] mx-auto">
        <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
          Centro de Accion
        </span>

        <h1 className="text-3xl font-medium mt-2 mb-2 text-black dark:text-white">
          Organiza tu tiempo, tu mente y tus metas
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Tareas, recordatorios, frases e inspiracion
          en un solo lugar.
        </p>

        {/* =====================================================
            RELOJ INTELIGENTE
            ===================================================== */}

        <div className="w-full mb-8">
          <Hourglass />
        </div>

        {/* =====================================================
            NOTIFICACIONES
            ===================================================== */}

        {permisoNotif !== "granted" && (
          <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
              <BellOff size={16} />

              Activa las notificaciones para recibir
              tus recordatorios.
            </div>

            <button
              onClick={
                pedirPermisoNotificaciones
              }
              className="text-xs font-medium bg-amber-500 text-white px-3 py-1.5 rounded-lg shrink-0"
            >
              Activar
            </button>
          </div>
        )}

        {/* =====================================================
            CONTENIDO PRINCIPAL
            ===================================================== */}

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1">
                {(
                  ["dia", "semana", "mes"] as const
                ).map((v) => (
                  <button
                    key={v}
                    onClick={() =>
                      setVista(v)
                    }
                    className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                      vista === v
                        ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm"
                        : "text-neutral-500"
                    }`}
                  >
                    {v === "dia"
                      ? "Hoy"
                      : v === "semana"
                        ? "Semana"
                        : "Mes"}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setModalAbierto(true)
                }
                className="flex items-center gap-1 text-sm font-medium bg-cyan-500 text-white px-3 py-2 rounded-lg"
              >
                <Plus size={16} />
                Nueva tarea
              </button>
            </div>

            {/* TAREAS PENDIENTES */}

            <div className="space-y-2 mb-6">
              {tareasPendientes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4"
                >
                  <button
                    onClick={() =>
                      marcarHecha(
                        t.id,
                        t.estado
                      )
                    }
                    className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-700 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {t.titulo}
                    </p>

                    {t.descripcion && (
                      <p className="text-xs text-neutral-500">
                        {t.descripcion}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                      {t.fecha_hora && (
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <Clock size={12} />

                          {new Date(
                            t.fecha_hora
                          ).toLocaleString(
                            "es-CO",
                            {
                              dateStyle:
                                "short",
                              timeStyle:
                                "short",
                            }
                          )}
                        </span>
                      )}

                      {t.con_alarma && (
                        <Bell
                          size={12}
                          className="text-cyan-500"
                        />
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      prioridadColor[
                        t.prioridad
                      ]
                    }`}
                  >
                    {t.prioridad}
                  </span>

                  <button
                    onClick={() =>
                      borrarTarea(t.id)
                    }
                    className="text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {tareasPendientes.length === 0 && (
                <p className="text-sm text-neutral-500 text-center py-8 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
                  No tienes tareas pendientes
                  en este periodo.
                </p>
              )}
            </div>

            {/* TAREAS COMPLETADAS */}

            {tareasHechas.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-neutral-500 mb-2">
                  Completadas (
                  {tareasHechas.length})
                </h3>

                <div className="space-y-2">
                  {tareasHechas.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 opacity-60"
                    >
                      <button
                        onClick={() =>
                          marcarHecha(
                            t.id,
                            t.estado
                          )
                        }
                        className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                      >
                        <Check
                          size={12}
                          className="text-white"
                        />
                      </button>

                      <p className="text-sm text-black dark:text-white line-through flex-1">
                        {t.titulo}
                      </p>

                      <button
                        onClick={() =>
                          borrarTarea(t.id)
                        }
                        className="text-neutral-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PLANIFICADOR IA */}

            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles
                  size={18}
                  className="text-cyan-500"
                />

                <h2 className="font-medium text-black dark:text-white text-sm">
                  Planificador con IA
                </h2>
              </div>

              <form
                onSubmit={preguntarIA}
                className="flex gap-2 mb-3"
              >
                <input
                  value={pregunta}
                  onChange={(e) =>
                    setPregunta(
                      e.target.value
                    )
                  }
                  placeholder="¿Cómo puedo aprovechar mejor mi tiempo hoy?"
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
                />

                <button
                  type="submit"
                  disabled={cargandoIA}
                  className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
                >
                  <Send size={16} />
                </button>
              </form>

              {cargandoIA && (
                <p className="text-xs text-neutral-500">
                  Pensando...
                </p>
              )}

              {respuestaIA && (
                <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900 rounded-lg p-3 text-sm text-black dark:text-white whitespace-pre-wrap">
                  {respuestaIA}
                </div>
              )}
            </div>

            {/* LIBROS */}

            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen
                  size={18}
                  className="text-violet-500"
                />

                <h2 className="font-medium text-black dark:text-white text-sm">
                  Libros recomendados
                </h2>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {librosSugeridos.map(
                  (libro) => (
                    <div
                      key={libro.key}
                      className="text-left"
                    >
                      <div className="aspect-[2/3] bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden mb-1">
                        {libro.portada_url ? (
                          <Image
                            src={
                              libro.portada_url
                            }
                            alt={
                              libro.titulo
                            }
                            width={400}
                            height={600}
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen
                              size={20}
                              className="text-neutral-400"
                            />
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {libro.titulo}
                      </p>
                    </div>
                  )
                )}
              </div>

              <a
                href="/biblioteca"
                className="block text-center text-xs font-medium text-cyan-600 dark:text-cyan-400 mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-3"
              >
                Ver biblioteca completa →
              </a>
            </div>
          </div>

          {/* =====================================================
              SIDEBAR
              ===================================================== */}

          <aside className="space-y-4">
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 text-center">
              <Flame
                size={28}
                className="text-orange-500 mx-auto mb-2"
              />

              <p className="text-2xl font-medium text-black dark:text-white">
                {racha} dias
              </p>

              <p className="text-xs text-neutral-500">
                Racha de constancia
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar
                  size={16}
                  className="text-cyan-500"
                />

                <h3 className="text-sm font-medium text-black dark:text-white">
                  Resumen
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Pendientes
                  </span>

                  <span className="text-black dark:text-white font-medium">
                    {tareasPendientes.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Completadas
                  </span>

                  <span className="text-black dark:text-white font-medium">
                    {tareasHechas.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb
                  size={16}
                  className="text-amber-500"
                />

                <h3 className="text-sm font-medium text-black dark:text-white">
                  Sugerencias
                </h3>
              </div>

              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                {altaPrioridadPendiente >
                  0 && (
                  <p>
                    Tienes{" "}
                    {
                      altaPrioridadPendiente
                    }{" "}
                    tarea(s) de alta
                    prioridad sin
                    terminar.
                  </p>
                )}

                {racha === 0 && (
                  <p>
                    Completa una tarea
                    hoy para iniciar tu
                    racha.
                  </p>
                )}

                {tareasPendientes.length ===
                  0 && (
                  <p>
                    Vas al día. Buen
                    momento para planear
                    la semana.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================================
            MODAL NUEVA TAREA
            ===================================================== */}

        {modalAbierto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <form
              onSubmit={crearTarea}
              className="bg-white dark:bg-neutral-950 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="font-medium text-black dark:text-white mb-4">
                Nueva tarea
              </h3>

              <input
                required
                placeholder="Título"
                value={nuevaTarea.titulo}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    titulo: e.target.value,
                  })
                }
                className="w-full mb-3 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
              />

              <textarea
                placeholder="Descripción (opcional)"
                value={
                  nuevaTarea.descripcion
                }
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    descripcion:
                      e.target.value,
                  })
                }
                className="w-full mb-3 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
              />

              <input
                type="datetime-local"
                value={
                  nuevaTarea.fecha_hora
                }
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    fecha_hora:
                      e.target.value,
                  })
                }
                className="w-full mb-3 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
              />

              <select
                value={
                  nuevaTarea.prioridad
                }
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    prioridad:
                      e.target.value,
                  })
                }
                className="w-full mb-3 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-black dark:text-white"
              >
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>

              <label className="flex items-center gap-2 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                <input
                  type="checkbox"
                  checked={
                    nuevaTarea.con_alarma
                  }
                  onChange={(e) =>
                    setNuevaTarea({
                      ...nuevaTarea,
                      con_alarma:
                        e.target.checked,
                    })
                  }
                />

                Recordarme con alarma
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setModalAbierto(false)
                  }
                  className="flex-1 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white py-2 rounded-lg text-sm"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}