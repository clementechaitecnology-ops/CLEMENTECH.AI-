"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  MessageCircle,
  Package,
  Plus,
  RotateCcw,
  RefreshCw,
  Search,
  Send,
  ShoppingBag,
  Truck,
  Users,
  Webhook,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Pedido = {
  id: string;
  cliente_nombre: string;
  producto_nombre: string;
  transportadora: string;
  estado: string;
  precio_unitario: number;
  total: number;
};

type Devolucion = {
  id: string;
  cliente_nombre: string;
  pedido_codigo: string;
  motivo: string;
  estado: string;
};

type Automatizacion = {
  id: string;
  titulo: string;
  descripcion: string;
  canal: string;
  activa: boolean;
};

type Conexion = {
  id: string;
  nombre: string;
  estado: string;
};

const iconosConexion: Record<string, LucideIcon> = {
  "WhatsApp Business": MessageCircle,
  "Dropi": Package,
  "Meta Business Suite": Users,
  "Shopify": ShoppingBag,
  "Webhooks API": Webhook,
};

const coloresConexion: Record<string, string> = {
  "WhatsApp Business": "text-emerald-500",
  "Dropi": "text-orange-500",
  "Meta Business Suite": "text-blue-500",
  "Shopify": "text-green-500",
  "Webhooks API": "text-violet-500",
};

const colorEstado: Record<string, string> = {
  "En reparto": "text-amber-600 bg-amber-100 dark:text-amber-300 dark:bg-amber-400/10",
  "Entregado": "text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-400/10",
  "En transito": "text-cyan-600 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-400/10",
  "En transportadora": "text-violet-600 bg-violet-100 dark:text-violet-300 dark:bg-violet-400/10",
  "Pendiente": "text-neutral-600 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800",
};

export default function DropshippingPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [devoluciones, setDevoluciones] = useState<Devolucion[]>([]);
  const [automatizaciones, setAutomatizaciones] = useState<Automatizacion[]>([]);
  const [conexiones, setConexiones] = useState<Conexion[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [moduloActivo, setModuloActivo] = useState("resumen");

  const [modalPedido, setModalPedido] = useState(false);
  const [modalDevolucion, setModalDevolucion] = useState(false);

  const [nuevoPedido, setNuevoPedido] = useState({ cliente_nombre: "", producto_nombre: "", transportadora: "", precio_unitario: "" });
  const [nuevaDevolucion, setNuevaDevolucion] = useState({ pedido_codigo: "", cliente_nombre: "", motivo: "" });

  const cargarTodo = useCallback(async () => {
    setLoading(true);
    const [rPedidos, rDevoluciones, rAuto, rConexiones] = await Promise.all([
      fetch("/api/dropshipping").then((r) => r.json()),
      fetch("/api/dropshipping/devoluciones").then((r) => r.json()),
      fetch("/api/dropshipping/automatizaciones").then((r) => r.json()),
      fetch("/api/dropshipping/conexiones").then((r) => r.json()),
    ]);
    setPedidos(rPedidos.pedidos || []);
    setDevoluciones(rDevoluciones.devoluciones || []);
    setAutomatizaciones(rAuto.automatizaciones || []);
    setConexiones(rConexiones.conexiones || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let activo = true;
    async function cargarInicial() {
      await Promise.resolve();
      if (activo) await cargarTodo();
    }
    void cargarInicial();
    return () => {
      activo = false;
    };
  }, [cargarTodo]);

  function mostrarMensaje(texto: string) {
    setMensaje(texto);
    window.setTimeout(() => setMensaje(""), 3000);
  }

  async function crearPedido(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/dropshipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...nuevoPedido,
        precio_unitario: Number(nuevoPedido.precio_unitario) || 0,
      }),
    });
    setNuevoPedido({ cliente_nombre: "", producto_nombre: "", transportadora: "", precio_unitario: "" });
    setModalPedido(false);
    mostrarMensaje("Pedido creado correctamente");
    cargarTodo();
  }

  async function cambiarEstado(id: string, estado: string) {
    await fetch("/api/dropshipping", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado }),
    });
    mostrarMensaje("Estado actualizado");
    cargarTodo();
  }

  async function crearDevolucion(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/dropshipping/devoluciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaDevolucion),
    });
    setNuevaDevolucion({ pedido_codigo: "", cliente_nombre: "", motivo: "" });
    setModalDevolucion(false);
    mostrarMensaje("Devolucion registrada");
    cargarTodo();
  }

  async function toggleAutomatizacion(id: string, activa: boolean) {
    await fetch("/api/dropshipping/automatizaciones", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, activa: !activa }),
    });
    cargarTodo();
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideEstado = filtro === "Todos" || pedido.estado === filtro;
    const texto = `${pedido.id} ${pedido.cliente_nombre} ${pedido.producto_nombre}`.toLowerCase();
    return coincideEstado && texto.includes(busqueda.toLowerCase());
  });

  const totalPedidos = pedidos.length;
  const enReparto = pedidos.filter((p) => p.estado === "En reparto").length;
  const entregados = pedidos.filter((p) => p.estado === "Entregado").length;
  const porcentajeEntregado = totalPedidos > 0 ? ((entregados / totalPedidos) * 100).toFixed(1) : "0.0";
  const clientesUnicos = new Set(pedidos.map((p) => p.cliente_nombre)).size;

  const metricas = [
    { titulo: "Pedidos activos", valor: String(totalPedidos), icon: Package, color: "text-cyan-500" },
    { titulo: "En reparto", valor: String(enReparto), icon: Truck, color: "text-amber-500" },
    { titulo: "Clientes", valor: String(clientesUnicos), icon: Users, color: "text-violet-500" },
    { titulo: "Entregados", valor: `${porcentajeEntregado}%`, icon: Check, color: "text-emerald-500" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
              <Activity size={16} /> Centro de operaciones
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Dropshipping</h1>
            <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
              Controla pedidos, clientes, mensajes y entregas desde un solo ecosistema.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600">
              <MessageCircle size={17} /> Abrir WhatsApp
            </a>
            <button onClick={() => cargarTodo()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium transition hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900">
              <RefreshCw size={17} /> Sincronizar
            </button>
          </div>
        </header>

        <nav aria-label="Modulos de Dropshipping" className="sticky top-16 z-20 mb-8 -mx-2 overflow-x-auto border-y border-slate-200 bg-slate-50/95 px-2 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex min-w-max gap-1">
            {[["Resumen", "resumen"], ["Pedidos", "pedidos"], ["Devoluciones", "devoluciones"], ["Automatizaciones", "automatizaciones"], ["Conexiones", "conexiones"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={moduloActivo === id ? "location" : undefined} onClick={() => setModuloActivo(id)} className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${moduloActivo === id ? "border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-300" : "border-transparent text-slate-500 hover:bg-white hover:text-slate-950 dark:hover:bg-slate-900 dark:hover:text-white"}`}>{label}</a>
            ))}
          </div>
        </nav>

        {mensaje && <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">{mensaje}</div>}
        {loading && <div className="mb-6 text-sm text-slate-500">Cargando datos...</div>}

        <section id="resumen" className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Resumen de operaciones">
          {metricas.map(({ titulo, valor, icon: MetricIcon, color }) => (
            <div key={titulo} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">{titulo}</span>
                <MetricIcon size={18} className={color} />
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <strong className="text-2xl">{valor}</strong>
              </div>
            </div>
          ))}
        </section>

        <section id="pedidos" className="mb-8 grid gap-8 scroll-mt-36 xl:grid-cols-[1fr_350px]">
          <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center">
              <div><h2 className="font-semibold">Seguimiento de pedidos</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Estado actualizado de tus envios</p></div>
              <button onClick={() => setModalPedido(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"><Plus size={16} /> Nuevo pedido</button>
            </div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row">
              <div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar pedido o cliente" className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950" /></div>
              <div className="relative"><select value={filtro} onChange={(event) => setFiltro(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm outline-none dark:border-slate-700 dark:bg-slate-950"><option>Todos</option><option>En reparto</option><option>Entregado</option><option>En transito</option><option>En transportadora</option><option>Pendiente</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3 text-slate-400" /></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  <tr><th className="px-5 py-3">Pedido</th><th className="px-5 py-3">Cliente / producto</th><th className="px-5 py-3">Transportadora</th><th className="px-5 py-3">Estado</th><th className="px-5 py-3"></th></tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                      <td className="px-5 py-4 font-medium">{pedido.id.slice(0, 8)}</td>
                      <td className="px-5 py-4"><div>{pedido.cliente_nombre}</div><div className="mt-1 text-xs text-slate-500">{pedido.producto_nombre}</div></td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{pedido.transportadora}</td>
                      <td className="px-5 py-4">
                        <select
                          value={pedido.estado}
                          onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                          className={`rounded-full px-2.5 py-1 text-xs font-medium border-0 ${colorEstado[pedido.estado] || colorEstado["Pendiente"]}`}
                        >
                          <option>Pendiente</option>
                          <option>En transportadora</option>
                          <option>En transito</option>
                          <option>En reparto</option>
                          <option>Entregado</option>
                        </select>
                      </td>
                      <td className="px-5 py-4"><ArrowUpRight size={17} className="text-cyan-600 dark:text-cyan-400" /></td>
                    </tr>
                  ))}
                  {pedidosFiltrados.length === 0 && !loading && (
                    <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500 text-sm">Aun no hay pedidos. Crea el primero.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold">Salud de envios</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Resumen general</p></div><Truck size={20} className="text-cyan-500" /></div>
            <div className="mt-7 flex items-center gap-5">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-emerald-400/80">
                <div className="text-center"><strong className="block text-2xl">{porcentajeEntregado}%</strong><span className="text-[10px] text-slate-500">entregado</span></div>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />Entregados <strong className="ml-2">{entregados}</strong></div>
                <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />En reparto <strong className="ml-2">{enReparto}</strong></div>
                <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-300" />Total <strong className="ml-2">{totalPedidos}</strong></div>
              </div>
            </div>
          </aside>
        </section>

        <section id="devoluciones" className="mb-8 scroll-mt-36 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center">
            <div><h2 className="flex items-center gap-2 font-semibold"><RotateCcw size={18} className="text-rose-500" /> Productos devueltos</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Gestiona solicitudes, reembolsos y productos que regresan.</p></div>
            <button onClick={() => setModalDevolucion(true)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:border-rose-400 dark:border-slate-700"><Plus size={16} /> Registrar devolucion</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950">
                <tr><th className="px-5 py-3">Cliente / pedido</th><th className="px-5 py-3">Motivo</th><th className="px-5 py-3">Estado</th></tr>
              </thead>
              <tbody>
                {devoluciones.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                    <td className="px-5 py-4"><div>{d.cliente_nombre}</div><div className="mt-1 text-xs text-slate-500">Pedido {d.pedido_codigo}</div></td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{d.motivo}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700 dark:bg-rose-400/10 dark:text-rose-300">{d.estado}</span></td>
                  </tr>
                ))}
                {devoluciones.length === 0 && (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-slate-500 text-sm">Sin devoluciones registradas.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div id="automatizaciones" className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Automatizaciones</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Mensajes y seguimientos que trabajan por ti</p></div><Bot size={21} className="text-violet-500" /></div>
            <div className="space-y-3">
              {automatizaciones.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <div className={`rounded-lg p-2 ${a.activa ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}><Send size={16} /></div>
                  <div className="min-w-0 flex-1"><h3 className="text-sm font-medium">{a.titulo}</h3><p className="truncate text-xs text-slate-500 dark:text-slate-400">{a.descripcion} · {a.canal}</p></div>
                  <button onClick={() => toggleAutomatizacion(a.id, a.activa)} className={`h-5 w-9 rounded-full p-0.5 transition ${a.activa ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`} aria-label={`Activar o desactivar ${a.titulo}`}>
                    <span className={`block h-4 w-4 rounded-full bg-white transition ${a.activa ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div id="conexiones" className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Conexiones</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Amplia tu operacion con tus APIs</p></div><ExternalLink size={19} className="text-cyan-500" /></div>
            <div className="space-y-3">
              {conexiones.map((c) => {
                const Icon = iconosConexion[c.nombre] || Webhook;
                const color = coloresConexion[c.nombre] || "text-slate-500";
                return (
                  <div key={c.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <Icon size={21} className={color} />
                    <div className="min-w-0 flex-1"><h3 className="text-sm font-medium">{c.nombre}</h3></div>
                    <button onClick={() => mostrarMensaje(`${c.nombre}: conecta tus credenciales para activarlo`)} className="text-xs font-medium text-cyan-600 dark:text-cyan-400">{c.estado}</button>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-cyan-50 p-3 text-xs leading-5 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200">
              <Clock3 size={16} className="mt-0.5 shrink-0" /> Cada conexion necesita tus propias credenciales de API para activarse.
            </div>
          </div>
        </section>
      </div>

      {modalPedido && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <form onSubmit={crearPedido} className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Nuevo pedido</h3>
              <button type="button" onClick={() => setModalPedido(false)}><X size={18} /></button>
            </div>
            <input required placeholder="Nombre del cliente" value={nuevoPedido.cliente_nombre} onChange={(e) => setNuevoPedido({ ...nuevoPedido, cliente_nombre: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <input required placeholder="Producto" value={nuevoPedido.producto_nombre} onChange={(e) => setNuevoPedido({ ...nuevoPedido, producto_nombre: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <input placeholder="Transportadora" value={nuevoPedido.transportadora} onChange={(e) => setNuevoPedido({ ...nuevoPedido, transportadora: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <input type="number" placeholder="Precio" value={nuevoPedido.precio_unitario} onChange={(e) => setNuevoPedido({ ...nuevoPedido, precio_unitario: e.target.value })} className="w-full mb-4 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <button type="submit" className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-medium py-2 rounded-lg text-sm">Crear pedido</button>
          </form>
        </div>
      )}

      {modalDevolucion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <form onSubmit={crearDevolucion} className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Registrar devolucion</h3>
              <button type="button" onClick={() => setModalDevolucion(false)}><X size={18} /></button>
            </div>
            <input required placeholder="Codigo de pedido" value={nuevaDevolucion.pedido_codigo} onChange={(e) => setNuevaDevolucion({ ...nuevaDevolucion, pedido_codigo: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <input required placeholder="Nombre del cliente" value={nuevaDevolucion.cliente_nombre} onChange={(e) => setNuevaDevolucion({ ...nuevaDevolucion, cliente_nombre: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <textarea required placeholder="Motivo" value={nuevaDevolucion.motivo} onChange={(e) => setNuevaDevolucion({ ...nuevaDevolucion, motivo: e.target.value })} className="w-full mb-4 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm" />
            <button type="submit" className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-medium py-2 rounded-lg text-sm">Registrar</button>
          </form>
        </div>
      )}
    </main>
  );
}