"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

type Mensaje = { rol: "user" | "assistant"; texto: string };

const sugerencias = [
  "¿Cómo puedo automatizar el seguimiento de un pedido?",
  "Dame una estrategia para vender por WhatsApp",
  "¿Qué debo revisar antes de conectar Dropi?",
];

export default function ChatIAPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "assistant", texto: "Hola. Soy tu asistente de Clementech.ai. Pregúntame sobre IA, automatización, ventas online o Dropshipping." },
  ]);
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);

  async function enviarPregunta(event?: FormEvent) {
    event?.preventDefault();
    const texto = pregunta.trim();
    if (!texto || cargando) return;
    const conversacion = [...mensajes, { rol: "user" as const, texto }];
    setPregunta("");
    setMensajes(conversacion);
    setCargando(true);
    try {
      const respuesta = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversacion }) });
      const datos = await respuesta.json();
      setMensajes((actuales) => [...actuales, { rol: "assistant", texto: datos.answer ?? "No pude generar una respuesta." }]);
    } catch {
      setMensajes((actuales) => [...actuales, { rol: "assistant", texto: "No pude conectarme en este momento. Revisa la configuración del asistente e inténtalo de nuevo." }]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-500"><Sparkles size={16} /> Asistente inteligente</div><h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Chat con IA</h1><p className="mt-3 text-slate-500 dark:text-slate-400">Haz preguntas y recibe ayuda para construir tu ecosistema digital.</p></header>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-label="Conversación con IA">
          <div className="flex min-h-[430px] flex-col gap-5 p-5 sm:p-8">{mensajes.map((mensaje, index) => <div key={`${mensaje.rol}-${index}`} className={`flex gap-3 ${mensaje.rol === "user" ? "justify-end" : "justify-start"}`}><div className={`flex max-w-[85%] gap-3 ${mensaje.rol === "user" ? "flex-row-reverse" : ""}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${mensaje.rol === "user" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300" : "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"}`}>{mensaje.rol === "user" ? <User size={17} /> : <Bot size={17} />}</div><div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${mensaje.rol === "user" ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>{mensaje.texto}</div></div></div>)}{cargando && <div className="flex items-center gap-2 text-sm text-slate-500"><Bot size={17} className="text-violet-500" /> Pensando...</div>}</div>
          <div className="border-t border-slate-200 p-5 dark:border-slate-800"><div className="mb-4 flex flex-wrap gap-2">{sugerencias.map((sugerencia) => <button key={sugerencia} onClick={() => setPregunta(sugerencia)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300">{sugerencia}</button>)}</div><form onSubmit={enviarPregunta} className="flex gap-3"><input value={pregunta} onChange={(event) => setPregunta(event.target.value)} placeholder="Escribe tu pregunta..." className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950" /><button type="submit" disabled={cargando || !pregunta.trim()} className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"><Send size={16} /> Enviar</button></form></div>
        </section>
      </div>
    </main>
  );
}
