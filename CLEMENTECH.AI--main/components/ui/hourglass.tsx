"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Frase = {
  id: string | number;
  texto: string;
  autor: string;
};

type Versiculo = {
  id: string | number;
  texto: string;
  referencia: string;
};

const FRASES_RESPALDO: Frase[] = [
  {
    id: "f1",
    texto: "El futuro depende de lo que hagas hoy.",
    autor: "Mahatma Gandhi",
  },
  {
    id: "f2",
    texto: "La mejor manera de predecir el futuro es crearlo.",
    autor: "Peter Drucker",
  },
  {
    id: "f3",
    texto: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    autor: "Robert Collier",
  },
  {
    id: "f4",
    texto: "No importa lo lento que vayas, siempre que no te detengas.",
    autor: "Confucio",
  },
  {
    id: "f5",
    texto: "La disciplina es el puente entre las metas y los logros.",
    autor: "Jim Rohn",
  },
  {
    id: "f6",
    texto: "Empieza donde estás. Usa lo que tienes. Haz lo que puedas.",
    autor: "Arthur Ashe",
  },
  {
    id: "f7",
    texto: "La acción es la clave fundamental de todo éxito.",
    autor: "Pablo Picasso",
  },
  {
    id: "f8",
    texto: "La excelencia no es un acto, sino un hábito.",
    autor: "Aristóteles",
  },
  {
    id: "f9",
    texto: "No tienes que ser grande para comenzar, pero tienes que comenzar para ser grande.",
    autor: "Zig Ziglar",
  },
  {
    id: "f10",
    texto: "Cree que puedes y ya estás a medio camino.",
    autor: "Theodore Roosevelt",
  },
  {
    id: "f11",
    texto: "Haz cada día una cosa que te acerque a tus sueños.",
    autor: "Robert Collier",
  },
  {
    id: "f12",
    texto: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.",
    autor: "Walter Elliott",
  },
];

const VERSICULOS_RESPALDO: Versiculo[] = [
  {
    id: "v1",
    texto: "Todo lo puedo en Cristo que me fortalece.",
    referencia: "Filipenses 4:13",
  },
  {
    id: "v2",
    texto: "Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia.",
    referencia: "Proverbios 3:5",
  },
  {
    id: "v3",
    texto: "Todo lo que hagan, háganlo de corazón, como para el Señor.",
    referencia: "Colosenses 3:23",
  },
  {
    id: "v4",
    texto: "Esfuérzate y sé valiente. No temas ni desmayes.",
    referencia: "Josué 1:9",
  },
  {
    id: "v5",
    texto: "El Señor es mi pastor; nada me faltará.",
    referencia: "Salmos 23:1",
  },
  {
    id: "v6",
    texto: "Encomienda al Señor tus obras, y tus pensamientos serán afirmados.",
    referencia: "Proverbios 16:3",
  },
  {
    id: "v7",
    texto: "Con Dios están la sabiduría y el poder; suyo es el consejo y la inteligencia.",
    referencia: "Job 12:13",
  },
  {
    id: "v8",
    texto: "Los que esperan en el Señor tendrán nuevas fuerzas.",
    referencia: "Isaías 40:31",
  },
  {
    id: "v9",
    texto: "Este es el día que hizo el Señor; nos gozaremos y alegraremos en él.",
    referencia: "Salmos 118:24",
  },
  {
    id: "v10",
    texto: "Pon en manos del Señor todas tus obras, y tus proyectos se cumplirán.",
    referencia: "Proverbios 16:3",
  },
  {
    id: "v11",
    texto: "No nos cansemos de hacer el bien, porque a su debido tiempo cosecharemos.",
    referencia: "Gálatas 6:9",
  },
  {
    id: "v12",
    texto: "El Señor dará fuerza a su pueblo; el Señor bendecirá a su pueblo con paz.",
    referencia: "Salmos 29:11",
  },
];

function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function obtenerLista(data: unknown, clave: string): unknown[] {
  if (Array.isArray(data)) return data;
  const lista = asRecord(data)?.[clave];
  return Array.isArray(lista) ? lista : [];
}

function normalizarFrases(data: unknown): Frase[] {
  return obtenerLista(data, "frases").flatMap((item, index) => {
    const registro = asRecord(item);
    const texto =
      typeof registro?.texto === "string"
        ? registro.texto
        : typeof registro?.frase === "string"
          ? registro.frase
          : "";

    if (!texto.trim()) return [];

    const autor =
      typeof registro?.autor === "string"
        ? registro.autor
        : typeof registro?.autor_nombre === "string"
          ? registro.autor_nombre
          : "Autor desconocido";

    return [{
      id:
        typeof registro?.id === "string" || typeof registro?.id === "number"
          ? registro.id
          : `api-frase-${index}`,
      texto,
      autor,
    }];
  });
}

function normalizarVersiculos(data: unknown): Versiculo[] {
  return obtenerLista(data, "versiculos").flatMap((item, index) => {
    const registro = asRecord(item);
    const texto =
      typeof registro?.texto === "string"
        ? registro.texto
        : typeof registro?.versiculo === "string"
          ? registro.versiculo
          : "";

    if (!texto.trim()) return [];

    const referencia =
      typeof registro?.referencia === "string"
        ? registro.referencia
        : typeof registro?.cita === "string"
          ? registro.cita
          : typeof registro?.referencia_biblica === "string"
            ? registro.referencia_biblica
            : "Referencia bíblica";

    return [{
      id:
        typeof registro?.id === "string" || typeof registro?.id === "number"
          ? registro.id
          : `api-versiculo-${index}`,
      texto,
      referencia,
    }];
  });
}

export default function Hourglass() {
  const [now, setNow] = useState(new Date());

  const [frases, setFrases] = useState<Frase[]>(FRASES_RESPALDO);
  const [versiculos, setVersiculos] =
    useState<Versiculo[]>(VERSICULOS_RESPALDO);

  const [fraseActual, setFraseActual] = useState<Frase>(
    FRASES_RESPALDO[0]
  );

  const [versiculoActual, setVersiculoActual] = useState<Versiculo>(
    VERSICULOS_RESPALDO[0]
  );

  const [fraseIndex, setFraseIndex] = useState(0);
  const [versiculoIndex, setVersiculoIndex] = useState(0);

  const [fase, setFase] = useState(0);

  const fraseOrden = useRef<Frase[]>(mezclar(FRASES_RESPALDO));
  const versiculoOrden = useRef<Versiculo[]>(
    mezclar(VERSICULOS_RESPALDO)
  );

  const [fraseAnim, setFraseAnim] = useState(false);
  const [versiculoAnim, setVersiculoAnim] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function cargarContenido() {
      try {
        const [frasesResponse, versiculosResponse] = await Promise.all([
          fetch("/api/centro-accion/frases", {
            cache: "no-store",
          }).catch(() => null),

          fetch("/api/centro-accion/versiculos", {
            cache: "no-store",
          }).catch(() => null),
        ]);

        let frasesFinal = FRASES_RESPALDO;
        let versiculosFinal = VERSICULOS_RESPALDO;

        if (frasesResponse?.ok) {
          const data = await frasesResponse.json();
          const normalizadas = normalizarFrases(data);

          if (normalizadas.length > 0) {
            frasesFinal = normalizadas;
          }
        }

        if (versiculosResponse?.ok) {
          const data = await versiculosResponse.json();
          const normalizados = normalizarVersiculos(data);

          if (normalizados.length > 0) {
            versiculosFinal = normalizados;
          }
        }

        setFrases(frasesFinal);
        setVersiculos(versiculosFinal);

        fraseOrden.current = mezclar(frasesFinal);
        versiculoOrden.current = mezclar(versiculosFinal);

        setFraseIndex(0);
        setVersiculoIndex(0);

        setFraseActual(fraseOrden.current[0]);
        setVersiculoActual(versiculoOrden.current[0]);
      } catch (error) {
        console.error("No se pudieron cargar frases y versículos:", error);
      }
    }

    cargarContenido();
  }, []);

  /*
   * CAMBIO AUTOMÁTICO
   *
   * Cada 12 segundos cambia:
   * - frase motivadora
   * - versículo bíblico
   *
   * Cada lista se mezcla y se recorre completa antes
   * de volver a mostrar un elemento.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setFraseAnim(true);
      setVersiculoAnim(true);

      setTimeout(() => {
        // FRASES
        let siguienteFraseIndex = fraseIndex + 1;
        let nuevaOrdenFrases = fraseOrden.current;

        if (siguienteFraseIndex >= nuevaOrdenFrases.length) {
          nuevaOrdenFrases = mezclar(frases);
          fraseOrden.current = nuevaOrdenFrases;
          siguienteFraseIndex = 0;
        }

        const nuevaFrase = nuevaOrdenFrases[siguienteFraseIndex];

        if (nuevaFrase) {
          setFraseIndex(siguienteFraseIndex);
          setFraseActual(nuevaFrase);
        }

        // VERSÍCULOS
        let siguienteVersiculoIndex = versiculoIndex + 1;
        let nuevoOrdenVersiculos = versiculoOrden.current;

        if (siguienteVersiculoIndex >= nuevoOrdenVersiculos.length) {
          nuevoOrdenVersiculos = mezclar(versiculos);
          versiculoOrden.current = nuevoOrdenVersiculos;
          siguienteVersiculoIndex = 0;
        }

        const nuevoVersiculo =
          nuevoOrdenVersiculos[siguienteVersiculoIndex];

        if (nuevoVersiculo) {
          setVersiculoIndex(siguienteVersiculoIndex);
          setVersiculoActual(nuevoVersiculo);
        }

        setFraseAnim(false);
        setVersiculoAnim(false);
      }, 450);

      setFase((actual) => (actual + 1) % 4);
    }, 12000);

    return () => clearInterval(timer);
  }, [fraseIndex, versiculoIndex, frases, versiculos]);

  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());

  const inicio = new Date(now);
  inicio.setHours(0, 0, 0, 0);

  const final = new Date(now);
  final.setHours(23, 59, 59, 999);

  const progreso =
    ((now.getTime() - inicio.getTime()) /
      (final.getTime() - inicio.getTime())) *
    100;

  const fecha = now.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const numeros = useMemo(
    () => [
      "10",
      "23",
      "45",
      "08",
      "91",
      "37",
      "64",
      "12",
      "58",
      "30",
      "76",
      "04",
      "42",
      "17",
      "83",
      "29",
    ],
    []
  );

  const nodes = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        left: `${(i * 29) % 100}%`,
        top: `${10 + ((i * 37) % 80)}%`,
        delay: `-${(i % 8) * 0.45}s`,
      })),
    []
  );

  return (
    <div className="smart-clock-wrapper">
      <div className={`smart-clock phase-${fase}`}>
        <div className="digital-world" />

        <div className="world-ring world-ring-1" />
        <div className="world-ring world-ring-2" />
        <div className="world-ring world-ring-3" />

        <div className="neural-network neural-left">
          {nodes.slice(0, 16).map((node, i) => (
            <span
              key={`left-${i}`}
              className="neural-node"
              style={{
                left: node.left,
                top: node.top,
                animationDelay: node.delay,
              }}
            />
          ))}
          <div className="neural-lines" />
        </div>

        <div className="neural-network neural-right">
          {nodes.slice(16).map((node, i) => (
            <span
              key={`right-${i}`}
              className="neural-node"
              style={{
                left: node.left,
                top: node.top,
                animationDelay: node.delay,
              }}
            />
          ))}
          <div className="neural-lines" />
        </div>

        <div className="orb orb1" />
        <div className="orb orb2" />

        <div className="topbar">
          <span>
            <i />
            AI TIME SYSTEM
          </span>

          <b>◉ SMART CLOCK</b>

          <span>ONLINE · ∞</span>
        </div>

        <div className="content-grid">
          {/* FRASE MOTIVADORA - IZQUIERDA */}
          <section className="side-panel motivational-panel">
            <div className="panel-icon">
              <span>✦</span>
            </div>

            <div className="panel-label">
              <span className="status-dot" />
              FRASE MOTIVADORA
            </div>

            <div
              className={`message-content ${
                fraseAnim ? "message-changing" : ""
              }`}
            >
              <p className="quote-mark">“</p>

              <p className="motivational-text">
                {fraseActual?.texto}
              </p>

              <div className="separator" />

              <p className="author">
                — {fraseActual?.autor}
              </p>
            </div>

            <div className="panel-footer">
              INSPIRACIÓN · CRECIMIENTO · ACCIÓN
            </div>
          </section>

          {/* RELOJ CENTRAL */}
          <section className="clock-center">
            <div className="machine">
              <div className="cap cap-top">
                <span>◉</span>
                <span>NEURAL</span>
                <span>AI</span>
                <span>∞</span>
              </div>

              <div className="column left" />
              <div className="column right" />

              <div className="glass">
                <div className="bulb top">
                  {numeros.slice(0, 8).map((n, i) => (
                    <em
                      key={i}
                      style={{
                        left: `${12 + ((i * 17) % 75)}%`,
                        top: `${15 + ((i * 13) % 55)}%`,
                        animationDelay: `-${i * 0.4}s`,
                      }}
                    >
                      {n}
                    </em>
                  ))}

                  <div className="sand sand-top" />
                </div>

                <div className="waist">
                  <div className="stream">
                    {Array.from({ length: 15 }, (_, i) => (
                      <i
                        key={i}
                        style={{
                          animationDelay: `-${i * 0.09}s`,
                          left: `${45 + (i % 5) * 2}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bulb bottom">
                  {numeros.slice(8).map((n, i) => (
                    <em
                      key={i}
                      style={{
                        left: `${8 + ((i * 21) % 80)}%`,
                        top: `${30 + ((i * 11) % 50)}%`,
                        animationDelay: `-${i * 0.35}s`,
                      }}
                    >
                      {n}
                    </em>
                  ))}

                  <div className="sand sand-bottom" />
                </div>

                {numeros.map((n, i) => (
                  <span
                    className="float-num"
                    key={i}
                    style={{
                      left: `${5 + ((i * 31) % 88)}%`,
                      top: `${8 + ((i * 29) % 84)}%`,
                      animationDelay: `-${i * 0.5}s`,
                    }}
                  >
                    {i % 10}
                  </span>
                ))}
              </div>

              <div className="cap cap-bottom">
                <span>01</span>
                <span>AI</span>
                <span>◉</span>
                <span>TIME</span>
              </div>
            </div>

            <div className="clock-time">
              {h}:{m}:{s}
            </div>

            <div className="clock-date">{fecha}</div>

            <div className="day-progress">
              <div>
                <span>PROGRESO DEL DÍA</span>
                <b>{progreso.toFixed(0)}%</b>
              </div>

              <section>
                <i style={{ width: `${progreso}%` }} />
              </section>
            </div>

            <div className="phase-dots">
              {[0, 1, 2, 3].map((i) => (
                <i key={i} className={i === fase ? "on" : ""} />
              ))}
            </div>
          </section>

          {/* VERSÍCULO - DERECHA */}
          <section className="side-panel bible-panel">
            <div className="panel-icon bible-icon">
              <span>✝</span>
            </div>

            <div className="panel-label">
              <span className="status-dot bible-dot" />
              VERSÍCULO BÍBLICO
            </div>

            <div
              className={`message-content ${
                versiculoAnim ? "message-changing" : ""
              }`}
            >
              <p className="quote-mark">“</p>

              <p className="bible-text">
                {versiculoActual?.texto}
              </p>

              <div className="separator" />

              <p className="reference">
                {versiculoActual?.referencia}
              </p>
            </div>

            <div className="panel-footer">
              FE · ESPERANZA · PROPÓSITO
            </div>
          </section>
        </div>

        <div className="bottom-status">
          <span>● SISTEMA ACTIVO</span>
          <span>NEURAL WORLD ONLINE</span>
          <span>CONTENT AUTO-SYNC</span>
        </div>
      </div>

      <style jsx>{`
        .smart-clock-wrapper {
          width: 100%;
          min-height: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
        }

        .smart-clock {
          position: relative;
          width: 100%;
          min-height: 700px;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(91, 225, 255, 0.28);
          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(18, 154, 198, 0.18),
              transparent 24%
            ),
            radial-gradient(
              circle at 10% 50%,
              rgba(35, 150, 255, 0.09),
              transparent 24%
            ),
            radial-gradient(
              circle at 90% 50%,
              rgba(100, 60, 255, 0.08),
              transparent 24%
            ),
            linear-gradient(
              145deg,
              #061721,
              #02080c 58%,
              #071923
            );
          color: #dffaff;
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.35),
            inset 0 0 80px rgba(0, 200, 255, 0.035);
        }

        .smart-clock::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(60, 220, 255, 0.06) 50%,
              transparent 100%
            );
          animation: scan 5s linear infinite;
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .digital-world {
          position: absolute;
          left: 50%;
          top: 53%;
          width: 600px;
          height: 600px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          opacity: 0.35;
          background:
            linear-gradient(
              90deg,
              transparent 49.5%,
              rgba(83, 224, 255, 0.24) 50%,
              transparent 50.5%
            ),
            linear-gradient(
              0deg,
              transparent 49.5%,
              rgba(83, 224, 255, 0.2) 50%,
              transparent 50.5%
            ),
            radial-gradient(
              circle,
              rgba(15, 200, 255, 0.09),
              transparent 65%
            );
          box-shadow:
            inset 0 0 80px rgba(0, 211, 255, 0.15),
            0 0 70px rgba(0, 200, 255, 0.08);
          animation: worldSpin 22s linear infinite;
        }

        .digital-world::before,
        .digital-world::after {
          content: "";
          position: absolute;
          inset: 8%;
          border: 1px solid rgba(90, 224, 255, 0.18);
          border-radius: 50%;
        }

        .digital-world::after {
          inset: 20%;
          border-color: rgba(90, 224, 255, 0.11);
        }

        @keyframes worldSpin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .world-ring {
          position: absolute;
          left: 50%;
          top: 53%;
          border-radius: 50%;
          border: 1px solid rgba(83, 224, 255, 0.13);
          pointer-events: none;
        }

        .world-ring-1 {
          width: 760px;
          height: 280px;
          transform: translate(-50%, -50%) rotate(14deg);
          animation: ring1 12s linear infinite;
        }

        .world-ring-2 {
          width: 700px;
          height: 220px;
          transform: translate(-50%, -50%) rotate(-24deg);
          animation: ring2 15s linear infinite;
        }

        .world-ring-3 {
          width: 580px;
          height: 170px;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: ring3 10s linear infinite;
        }

        @keyframes ring1 {
          to {
            transform: translate(-50%, -50%) rotate(374deg);
          }
        }

        @keyframes ring2 {
          to {
            transform: translate(-50%, -50%) rotate(-384deg);
          }
        }

        @keyframes ring3 {
          to {
            transform: translate(-50%, -50%) rotate(405deg);
          }
        }

        .grid {
          position: absolute;
          inset: 0;
          opacity: 0.09;
          background-image:
            linear-gradient(
              rgba(100, 220, 255, 0.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(100, 220, 255, 0.15) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          mask-image: radial-gradient(circle, #000, transparent 72%);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: orb 4s ease-in-out infinite;
          pointer-events: none;
        }

        .orb1 {
          width: 250px;
          height: 250px;
          left: 50%;
          top: 45%;
          background: rgba(0, 205, 255, 0.12);
          transform: translate(-50%, -50%);
        }

        .orb2 {
          width: 200px;
          height: 200px;
          left: 50%;
          top: 72%;
          background: rgba(255, 150, 45, 0.07);
          transform: translate(-50%, -50%);
          animation-delay: 1s;
        }

        @keyframes orb {
          50% {
            opacity: 1;
            scale: 1.15;
          }
        }

        .topbar {
          position: relative;
          z-index: 30;
          height: 50px;
          margin: 14px;
          border: 1px solid rgba(105, 225, 255, 0.22);
          border-radius: 14px;
          background: rgba(3, 20, 28, 0.82);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          font: 9px monospace;
          letter-spacing: 1.5px;
          color: #8edff3;
        }

        .topbar i {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #70f6d2;
          box-shadow: 0 0 10px #70f6d2;
          margin-right: 7px;
          animation: blink 1.2s infinite;
        }

        .topbar b {
          color: #d9fbff;
        }

        @keyframes blink {
          50% {
            opacity: 0.2;
          }
        }

        .content-grid {
          position: relative;
          z-index: 20;
          display: grid;
          grid-template-columns: minmax(250px, 1fr) minmax(340px, 470px) minmax(
              250px,
              1fr
            );
          align-items: center;
          gap: 20px;
          width: 100%;
          min-height: 570px;
          padding: 10px 28px 0;
        }

        .side-panel {
          position: relative;
          min-height: 300px;
          padding: 28px 24px;
          border: 1px solid rgba(100, 220, 255, 0.2);
          border-radius: 24px;
          background: rgba(3, 18, 26, 0.62);
          backdrop-filter: blur(15px);
          box-shadow:
            inset 0 0 30px rgba(50, 210, 255, 0.035),
            0 15px 40px rgba(0, 0, 0, 0.18);
          overflow: hidden;
        }

        .side-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(91, 225, 255, 0.8),
            transparent
          );
        }

        .motivational-panel {
          border-color: rgba(45, 220, 255, 0.22);
        }

        .bible-panel {
          border-color: rgba(150, 110, 255, 0.24);
        }

        .panel-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin-bottom: 18px;
          color: #7ce9ff;
          background: rgba(30, 210, 255, 0.08);
          border: 1px solid rgba(100, 225, 255, 0.2);
          box-shadow: 0 0 25px rgba(0, 210, 255, 0.08);
          font-size: 19px;
        }

        .bible-icon {
          color: #c2a4ff;
          background: rgba(150, 100, 255, 0.08);
          border-color: rgba(160, 120, 255, 0.2);
        }

        .panel-label {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 22px;
          color: #78e4f9;
          font: 700 9px monospace;
          letter-spacing: 2px;
        }

        .bible-panel .panel-label {
          color: #b99bff;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #55e5ff;
          box-shadow: 0 0 10px #55e5ff;
          animation: blink 1.5s infinite;
        }

        .bible-dot {
          background: #b796ff;
          box-shadow: 0 0 10px #b796ff;
        }

        .message-content {
          min-height: 175px;
          transition:
            opacity 0.45s ease,
            transform 0.45s ease;
        }

        .message-changing {
          opacity: 0;
          transform: translateY(8px);
        }

        .quote-mark {
          margin: 0;
          height: 28px;
          font-family: Georgia, serif;
          font-size: 48px;
          line-height: 35px;
          color: rgba(90, 225, 255, 0.35);
        }

        .bible-panel .quote-mark {
          color: rgba(177, 140, 255, 0.35);
        }

        .motivational-text,
        .bible-text {
          margin: 4px 0 18px;
          color: #e5fbff;
          font-family: Georgia, serif;
          font-size: clamp(16px, 1.4vw, 21px);
          line-height: 1.55;
          font-style: italic;
        }

        .bible-text {
          color: #eee8ff;
        }

        .separator {
          width: 42px;
          height: 1px;
          background: linear-gradient(
            90deg,
            #5ee5ff,
            transparent
          );
          margin-bottom: 12px;
        }

        .bible-panel .separator {
          background: linear-gradient(
            90deg,
            #b898ff,
            transparent
          );
        }

        .author,
        .reference {
          margin: 0;
          color: #76dff1;
          font: 600 10px monospace;
          letter-spacing: 1px;
        }

        .reference {
          color: #b79cff;
        }

        .panel-footer {
          position: absolute;
          bottom: 18px;
          left: 24px;
          color: rgba(130, 220, 235, 0.4);
          font: 7px monospace;
          letter-spacing: 1.5px;
        }

        .clock-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .machine {
          position: relative;
          width: min(340px, 90%);
          height: 400px;
          margin: 0 auto;
        }

        .cap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(140, 235, 255, 0.5);
          background: linear-gradient(#355d69, #0b2b37);
          z-index: 8;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 40px;
          font: 8px monospace;
          color: #8fe5f8;
          letter-spacing: 1.5px;
          box-shadow:
            0 0 20px rgba(0, 205, 255, 0.08),
            inset 0 0 15px rgba(150, 240, 255, 0.08);
        }

        .cap-top {
          top: 0;
        }

        .cap-bottom {
          bottom: 0;
        }

        .column {
          position: absolute;
          top: 20px;
          bottom: 20px;
          width: 10px;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            #34535d,
            #d0faff,
            #456670
          );
          z-index: 7;
          box-shadow: 0 0 10px rgba(100, 225, 255, 0.25);
        }

        .column.left {
          left: 14px;
        }

        .column.right {
          right: 14px;
        }

        .glass {
          position: absolute;
          left: 50%;
          top: 28px;
          transform: translateX(-50%);
          width: 240px;
          height: 344px;
          border-left: 1px solid rgba(160, 243, 255, 0.45);
          border-right: 1px solid rgba(160, 243, 255, 0.3);
          overflow: hidden;
          background: linear-gradient(
            90deg,
            rgba(80, 220, 255, 0.02),
            rgba(180, 248, 255, 0.07),
            rgba(80, 220, 255, 0.02)
          );
          box-shadow:
            inset 0 0 30px rgba(80, 220, 255, 0.04),
            0 0 30px rgba(40, 210, 255, 0.05);
        }

        .bulb {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 184px;
          height: 156px;
          border: 1px solid rgba(140, 235, 255, 0.45);
          overflow: hidden;
          background: radial-gradient(
            circle,
            rgba(70, 215, 255, 0.12),
            transparent 65%
          );
        }

        .bulb.top {
          top: 0;
          border-radius: 50% 50% 40% 40%;
        }

        .bulb.bottom {
          bottom: 0;
          border-radius: 40% 40% 50% 50%;
        }

        .bulb em {
          position: absolute;
          color: #82eaff;
          font: 11px monospace;
          font-style: normal;
          text-shadow: 0 0 8px #35d9ff;
          animation: digit 3s ease-in-out infinite;
        }

        .bulb em:nth-child(3n) {
          color: #ffc06c;
          text-shadow: 0 0 8px #ff9f37;
        }

        @keyframes digit {
          50% {
            transform: translate(6px, -7px) scale(1.15);
            opacity: 1;
          }

          0%,
          100% {
            opacity: 0.3;
          }
        }

        .sand {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 116px;
          background: radial-gradient(
            circle,
            #ffdb83,
            #ff9e36 55%,
            rgba(255, 110, 20, 0.15)
          );
          filter: drop-shadow(
            0 0 11px rgba(255, 166, 60, 0.8)
          );
        }

        .sand-top {
          top: 50px;
          height: 70px;
          clip-path: polygon(
            3% 0,
            97% 0,
            82% 30%,
            65% 65%,
            53% 100%,
            47% 100%,
            35% 65%,
            18% 30%
          );
          animation: topSand 5s linear infinite;
        }

        .sand-bottom {
          bottom: 10px;
          height: 70px;
          clip-path: polygon(
            50% 0,
            58% 20%,
            72% 45%,
            100% 100%,
            0 100%,
            28% 45%,
            42% 20%
          );
          animation: bottomSand 5s linear infinite;
        }

        @keyframes topSand {
          0% {
            height: 82px;
          }

          50% {
            height: 50px;
          }

          100% {
            height: 22px;
          }
        }

        @keyframes bottomSand {
          0% {
            height: 22px;
          }

          50% {
            height: 50px;
          }

          100% {
            height: 82px;
          }
        }

        .waist {
          position: absolute;
          left: 50%;
          top: 130px;
          transform: translateX(-50%);
          width: 66px;
          height: 90px;
          z-index: 10;
        }

        .waist:before,
        .waist:after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
        }

        .waist:before {
          border-top: 38px solid rgba(120, 230, 255, 0.1);
        }

        .waist:after {
          bottom: 0;
          border-bottom: 38px solid rgba(120, 230, 255, 0.1);
        }

        .stream {
          position: absolute;
          left: 50%;
          top: 4px;
          transform: translateX(-50%);
          height: 85px;
          width: 8px;
        }

        .stream i {
          position: absolute;
          top: 0;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ffd46e;
          box-shadow: 0 0 8px #ffac39;
          animation: fall 0.85s linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-8px) scale(0.4);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          100% {
            transform: translateY(85px);
            opacity: 0;
          }
        }

        .float-num {
          position: absolute;
          color: rgba(90, 220, 255, 0.3);
          font: 9px monospace;
          z-index: 15;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          30% {
            opacity: 0.8;
          }

          100% {
            opacity: 0;
            transform: translateY(-30px) rotate(180deg);
          }
        }

        .clock-time {
          position: relative;
          text-align: center;
          font: 600 clamp(30px, 4vw, 46px) monospace;
          letter-spacing: 4px;
          text-shadow:
            0 0 12px #5ee4ff,
            0 0 30px rgba(50, 190, 255, 0.35);
        }

        .clock-date {
          text-align: center;
          text-transform: capitalize;
          color: rgba(180, 230, 240, 0.7);
          font-size: 11px;
          margin-top: 4px;
        }

        .day-progress {
          width: min(340px, 80%);
          margin: 14px auto 0;
        }

        .day-progress > div {
          display: flex;
          justify-content: space-between;
          color: #8edce9;
          font: 8px monospace;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .day-progress b {
          color: #d1faff;
        }

        .day-progress section {
          height: 4px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(70, 130, 145, 0.25);
        }

        .day-progress section i {
          display: block;
          height: 100%;
          background: linear-gradient(
            90deg,
            #20c9ff,
            #a3f7ff
          );
          box-shadow: 0 0 14px #4ee1ff;
          transition: width 1s linear;
        }

        .phase-dots {
          display: flex;
          gap: 5px;
          justify-content: center;
          margin-top: 10px;
        }

        .phase-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #315461;
        }

        .phase-dots .on {
          width: 16px;
          background: #6be7ff;
          box-shadow: 0 0 10px #6be7ff;
        }

        .neural-network {
          position: absolute;
          top: 105px;
          bottom: 75px;
          width: 23%;
          opacity: 0.75;
          overflow: hidden;
          pointer-events: none;
        }

        .neural-left {
          left: 0;
        }

        .neural-right {
          right: 0;
        }

        .neural-lines {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              28deg,
              transparent 42%,
              rgba(70, 220, 255, 0.17) 43%,
              transparent 44%
            ),
            linear-gradient(
              153deg,
              transparent 48%,
              rgba(70, 220, 255, 0.13) 49%,
              transparent 50%
            ),
            linear-gradient(
              72deg,
              transparent 50%,
              rgba(90, 190, 255, 0.12) 51%,
              transparent 52%
            );
          animation: neuralMove 7s linear infinite;
        }

        .neural-node {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #5fe7ff;
          box-shadow:
            0 0 7px #5fe7ff,
            0 0 15px rgba(95, 231, 255, 0.55);
          animation: nodePulse 2.5s ease-in-out infinite;
        }

        .neural-right .neural-node {
          background: #a889ff;
          box-shadow:
            0 0 7px #a889ff,
            0 0 15px rgba(168, 137, 255, 0.45);
        }

        @keyframes neuralMove {
          50% {
            transform: translateX(15px) translateY(-5px);
            opacity: 0.5;
          }
        }

        @keyframes nodePulse {
          50% {
            transform: scale(1.8);
            opacity: 0.35;
          }
        }

        .bottom-status {
          position: absolute;
          z-index: 30;
          bottom: 14px;
          left: 28px;
          right: 28px;
          display: flex;
          justify-content: space-between;
          color: rgba(110, 210, 230, 0.38);
          font: 7px monospace;
          letter-spacing: 1.5px;
        }

        .bottom-status span:first-child {
          color: rgba(80, 235, 190, 0.65);
        }

        @media (max-width: 1050px) {
          .content-grid {
            grid-template-columns: minmax(210px, 1fr) minmax(
                300px,
                380px
              ) minmax(210px, 1fr);
            gap: 10px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .side-panel {
            padding: 22px 18px;
          }

          .motivational-text,
          .bible-text {
            font-size: 15px;
          }
        }

        @media (max-width: 800px) {
          .smart-clock-wrapper {
            min-height: auto;
          }

          .smart-clock {
            min-height: auto;
            padding-bottom: 45px;
          }

          .content-grid {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 20px;
          }

          .clock-center {
            order: 1;
          }

          .motivational-panel {
            order: 2;
          }

          .bible-panel {
            order: 3;
          }

          .side-panel {
            min-height: 250px;
          }

          .neural-network {
            opacity: 0.25;
          }

          .digital-world {
            width: 500px;
            height: 500px;
          }

          .world-ring {
            display: none;
          }

          .topbar span:last-child {
            display: none;
          }

          .bottom-status {
            left: 20px;
            right: 20px;
          }

          .bottom-status span:nth-child(2) {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .smart-clock {
            border-radius: 18px;
          }

          .topbar {
            margin: 10px;
            padding: 0 10px;
          }

          .machine {
            transform: scale(0.86);
            transform-origin: top center;
            margin-bottom: -50px;
          }

          .clock-time {
            font-size: 28px;
          }

          .bottom-status {
            font-size: 6px;
          }
        }
      `}</style>
    </div>
  );
}