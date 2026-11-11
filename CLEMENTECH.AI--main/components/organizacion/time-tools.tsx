"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlarmClock,
  ArrowDown,
  ArrowUp,
  Check,
  CirclePause,
  CirclePlay,
  Clock3,
  Flame,
  Goal,
  Plus,
  RotateCcw,
  Trash2,
  Trophy,
  Volume2,
} from "lucide-react";
import { usePersistentState } from "@/lib/use-persistent-state";

type FocusTask = {
  id: string;
  titulo: string;
  estado: string;
};

type TimerMode = "focus" | "short-break" | "long-break";
type GoalUnit = "sesiones" | "minutos" | "tareas";

type Goal = {
  id: string;
  title: string;
  target: number;
  progress: number;
  unit: GoalUnit;
};

type FocusSession = {
  id: string;
  taskTitle: string;
  durationMinutes: number;
  completedAt: number;
};

type TimerSettings = {
  title: string;
  seconds: number;
  strokeClass: string;
};

type TimerState = {
  mode: TimerMode;
  durationSeconds: number;
  remainingSeconds: number;
  endsAt: number | null;
};

type ToolState = {
  timer: TimerState;
  sessions: FocusSession[];
  goals: Goal[];
};

const INITIAL_STATE: ToolState = {
  timer: {
    mode: "focus",
    durationSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    endsAt: null,
  },
  sessions: [],
  goals: [],
};

const MODE_SETTINGS: Record<
  TimerMode,
  TimerSettings
> = {
  focus: { title: "Enfoque", seconds: 25 * 60, strokeClass: "text-cyan-500" },
  "short-break": {
    title: "Pausa corta",
    seconds: 5 * 60,
    strokeClass: "text-emerald-500",
  },
  "long-break": {
    title: "Pausa larga",
    seconds: 15 * 60,
    strokeClass: "text-violet-500",
  },
};

const GOAL_UNIT_LABEL: Record<GoalUnit, string> = {
  sesiones: "sesiones",
  minutos: "min enfocados",
  tareas: "tareas",
};

const STORAGE_KEY = "clementech-centro-accion-herramientas-v1";

function formatoTiempo(totalSegundos: number) {
  const minutos = Math.floor(totalSegundos / 60)
    .toString()
    .padStart(2, "0");
  const segundos = (totalSegundos % 60).toString().padStart(2, "0");
  return `${minutos}:${segundos}`;
}

export function reproducirAlarma() {
  try {
    const contexto = new window.AudioContext();
    const oscilador = contexto.createOscillator();
    const volumen = contexto.createGain();
    oscilador.type = "sine";
    oscilador.frequency.value = 880;
    volumen.gain.value = 0.12;
    oscilador.connect(volumen);
    volumen.connect(contexto.destination);
    oscilador.start();
    oscilador.stop(contexto.currentTime + 0.65);
    oscilador.onended = () => void contexto.close();
  } catch (error) {
    console.error("No se pudo reproducir la alarma:", error);
  }
}

export default function TimeTools({
  tasks,
  selectedTaskId,
  onSelectTask,
  completedTaskSignal,
}: {
  tasks: FocusTask[];
  selectedTaskId: string;
  onSelectTask: (id: string) => void;
  completedTaskSignal: number;
}) {
  const [data, setData] = usePersistentState(STORAGE_KEY, INITIAL_STATE);
  const [now, setNow] = useState(0);
  const [customMinutes, setCustomMinutes] = useState("25");
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("5");
  const [goalUnit, setGoalUnit] = useState<GoalUnit>("sesiones");
  const [goalFormOpen, setGoalFormOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const finishedTimer = useRef(false);
  const previousTaskCompletionSignal = useRef(completedTaskSignal);

  const timer = data.timer;
  const mode = timer.mode;
  const settings = MODE_SETTINGS[mode];
  const secondsLeft = timer.endsAt
    ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000))
    : timer.remainingSeconds;
  const progress = timer.durationSeconds
    ? 1 - secondsLeft / timer.durationSeconds
    : 0;
  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.estado !== "Hecho"),
    [tasks],
  );

  const todaySessions = useMemo(() => {
    const today = new Date(now).toDateString();
    return data.sessions.filter(
      (session) => new Date(session.completedAt).toDateString() === today,
    );
  }, [data.sessions, now]);

  const weekMinutes = useMemo(() => {
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    return data.sessions
      .filter((session) => session.completedAt >= weekAgo)
      .reduce((total, session) => total + session.durationMinutes, 0);
  }, [data.sessions, now]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setNotificationPermission(
        "Notification" in window ? Notification.permission : "unsupported",
      );
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setNow(Date.now()), 0);
    const interval = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const completedTasks = completedTaskSignal - previousTaskCompletionSignal.current;
    previousTaskCompletionSignal.current = completedTaskSignal;
    if (completedTasks < 1) return;

    setData((current) => ({
      ...current,
      goals: current.goals.map((goal) =>
        goal.unit === "tareas"
          ? {
              ...goal,
              progress: Math.min(goal.target, goal.progress + completedTasks),
            }
          : goal,
      ),
    }));
  }, [completedTaskSignal, setData]);

  const finishTimer = useCallback(() => {
    if (finishedTimer.current) return;
    finishedTimer.current = true;
    const finishedMode = timer.mode;
    setData((current) => {
      if (!current.timer.endsAt) return current;
      if (current.timer.mode !== "focus") {
        return {
          ...current,
          timer: {
            ...current.timer,
            endsAt: null,
            remainingSeconds: 0,
          },
        };
      }

      const durationMinutes = Math.max(
        1,
        Math.round(current.timer.durationSeconds / 60),
      );
      const completedAt = Date.now();
      const taskTitle =
        tasks.find((task) => task.id === selectedTaskId)?.titulo ?? "Enfoque libre";
      const session = {
        id: crypto.randomUUID(),
        taskTitle,
        durationMinutes,
        completedAt,
      };

      return {
        ...current,
        sessions: [...current.sessions, session].slice(-200),
        goals: current.goals.map((goal) =>
          goal.unit === "sesiones"
            ? { ...goal, progress: Math.min(goal.target, goal.progress + 1) }
            : goal.unit === "minutos"
              ? {
                  ...goal,
                  progress: Math.min(goal.target, goal.progress + durationMinutes),
                }
              : goal,
        ),
        timer: { ...current.timer, endsAt: null, remainingSeconds: 0 },
      };
    });

    setNow(Date.now());
    reproducirAlarma();
    setNotice(
      finishedMode === "focus"
        ? "¡Sesión completada! Tómate una pausa y celebra tu avance."
        : "Pausa terminada. Cuando estés listo, vuelve a enfocarte.",
    );
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(
        finishedMode === "focus" ? "¡Enfoque completado!" : "Pausa terminada",
        {
          body:
            finishedMode === "focus"
              ? "Buen trabajo. Tu progreso y tiempo quedaron registrados."
              : "Ya puedes comenzar tu siguiente sesión.",
        },
      );
    }
    window.setTimeout(() => setNotice(""), 6000);
    window.setTimeout(() => {
      finishedTimer.current = false;
    }, 1000);
  }, [selectedTaskId, setData, tasks, timer.mode]);

  useEffect(() => {
    if (!timer.endsAt) {
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((timer.endsAt! - Date.now()) / 1000));
      setNow(Date.now());
      if (remaining === 0) finishTimer();
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [finishTimer, timer.endsAt]);

  function selectMode(nextMode: TimerMode) {
    if (timer.endsAt) return;
    const seconds = MODE_SETTINGS[nextMode].seconds;
    setData((current) => ({
      ...current,
      timer: {
        ...current.timer,
        mode: nextMode,
        durationSeconds: seconds,
        remainingSeconds: seconds,
        endsAt: null,
      },
    }));
    setCustomMinutes(String(seconds / 60));
    finishedTimer.current = false;
  }

  function setCustomDuration() {
    const minutes = Number(customMinutes);
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 180) {
      setNotice("Elige una duración entre 1 y 180 minutos.");
      return;
    }

    const seconds = minutes * 60;
    setData((current) => ({
      ...current,
      timer: {
        ...current.timer,
        mode: "focus",
        durationSeconds: seconds,
        remainingSeconds: seconds,
        endsAt: null,
      },
    }));
    finishedTimer.current = false;
    setNotice("");
  }

  function toggleTimer() {
    if (timer.endsAt) {
      setData((current) => ({
        ...current,
        timer: {
          ...current.timer,
          endsAt: null,
          remainingSeconds: Math.max(
            0,
            Math.ceil((current.timer.endsAt! - Date.now()) / 1000),
          ),
        },
      }));
      return;
    }

    finishedTimer.current = false;
    setData((current) => ({
      ...current,
      timer: {
        ...current.timer,
        endsAt:
          Date.now() +
          (current.timer.remainingSeconds || current.timer.durationSeconds) * 1000,
      },
    }));
  }

  function resetTimer() {
    finishedTimer.current = false;
    setData((current) => ({
      ...current,
      timer: {
        ...current.timer,
        endsAt: null,
        remainingSeconds: current.timer.durationSeconds,
      },
    }));
  }

  function createGoal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = Number(goalTarget);
    if (!goalTitle.trim() || !Number.isInteger(target) || target < 1) return;

    setData((current) => ({
      ...current,
      goals: [
        ...current.goals,
        {
          id: crypto.randomUUID(),
          title: goalTitle.trim(),
          target,
          progress: 0,
          unit: goalUnit,
        },
      ],
    }));
    setGoalTitle("");
    setGoalFormOpen(false);
  }

  function updateGoalProgress(id: string, amount: number) {
    setData((current) => ({
      ...current,
      goals: current.goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.max(0, Math.min(goal.target, goal.progress + amount)),
            }
          : goal,
      ),
    }));
  }

  function deleteGoal(id: string) {
    setData((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id),
    }));
  }

  async function enableNotifications() {
    if (!("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }
    setNotificationPermission(await Notification.requestPermission());
  }

  return (
    <section id="temporizador-enfoque" className="mb-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50 to-sky-100 p-5 shadow-sm dark:border-cyan-900/60 dark:from-neutral-950 dark:via-slate-950 dark:to-cyan-950/40 sm:p-7">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Tiempo con intención
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
              Temporizador de enfoque
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Un paso a la vez. Tu tiempo queda guardado en este dispositivo.
            </p>
          </div>
          <div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-cyan-800 shadow-sm dark:bg-white/10 dark:text-cyan-200">
            <Clock3 className="mr-1.5 inline" size={14} />
            {todaySessions.length} hoy · {weekMinutes} min esta semana
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {(Object.keys(MODE_SETTINGS) as TimerMode[]).map((timerMode) => (
            <button
              key={timerMode}
              type="button"
              onClick={() => selectMode(timerMode)}
              disabled={Boolean(timer.endsAt)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                mode === timerMode
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                  : "bg-white/80 text-slate-600 hover:bg-white dark:bg-white/10 dark:text-slate-300"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {MODE_SETTINGS[timerMode].title}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-5 md:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col items-center">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 220 220" aria-hidden="true">
                <circle cx="110" cy="110" r="99" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-white/10" />
                <circle
                  cx="110"
                  cy="110"
                  r="99"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 99}
                  strokeDashoffset={2 * Math.PI * 99 * (1 - progress)}
                  className={`${settings.strokeClass} transition-[stroke-dashoffset] duration-500`}
                />
              </svg>
              <div className="text-center">
                <p className="text-5xl font-semibold tabular-nums tracking-tight text-slate-950 dark:text-white">
                  {formatoTiempo(secondsLeft)}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {timer.endsAt ? "En marcha" : settings.title}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTimer}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-700"
              >
                {timer.endsAt ? <CirclePause size={18} /> : <CirclePlay size={18} />}
                {timer.endsAt ? "Pausar" : secondsLeft === 0 ? "Reanudar" : "Iniciar"}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                aria-label="Reiniciar temporizador"
                className="rounded-full border border-slate-300 bg-white/80 p-3 text-slate-600 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
              >
                <RotateCcw size={17} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              ¿En qué te vas a enfocar?
              <select
                value={selectedTaskId}
                onChange={(event) => onSelectTask(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm font-normal text-slate-800 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Enfoque libre</option>
                {pendingTasks.map((task) => (
                  <option key={task.id} value={task.id}>{task.titulo}</option>
                ))}
              </select>
            </label>

            <div className="rounded-2xl border border-white/80 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
              <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Duración personalizada (minutos)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={customMinutes}
                  disabled={Boolean(timer.endsAt)}
                  onChange={(event) => setCustomMinutes(event.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={setCustomDuration}
                  disabled={Boolean(timer.endsAt)}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-950"
                >
                  Aplicar
                </button>
              </div>
            </div>

            {notificationPermission !== "granted" && (
              <button
                type="button"
                onClick={enableNotifications}
                disabled={notificationPermission === "unsupported"}
                className="inline-flex items-center gap-2 text-xs font-medium text-cyan-800 underline decoration-cyan-500/40 underline-offset-4 disabled:cursor-not-allowed disabled:text-slate-500 dark:text-cyan-300"
              >
                <AlarmClock size={14} />
                {notificationPermission === "unsupported"
                  ? "Tu navegador no admite notificaciones"
                  : notificationPermission === "denied"
                    ? "Permite notificaciones desde la configuración del navegador"
                    : "Activar avisos del navegador"}
              </button>
            )}
          </div>
        </div>

        {notice && (
          <div role="status" className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            <Volume2 size={17} />
            {notice}
          </div>
        )}

        <div className="mt-5 border-t border-cyan-900/10 pt-4 dark:border-white/10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Últimos enfoques
          </p>
          {todaySessions.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tus sesiones completadas aparecerán aquí. Empieza con una sesión corta y sostenible.
            </p>
          ) : (
            <ul className="space-y-2">
              {todaySessions.slice(-3).reverse().map((session) => (
                <li key={session.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-slate-700 dark:text-slate-200">{session.taskTitle}</span>
                  <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">{session.durationMinutes} min</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 p-5 shadow-sm dark:border-violet-900/60 dark:from-neutral-950 dark:via-violet-950/30 dark:to-fuchsia-950/20 sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Crecer con propósito
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
              Metas que sí avanzan
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Convierte lo que te importa en pasos pequeños y medibles.
            </p>
          </div>
          <div className="rounded-full bg-white/80 p-3 text-violet-600 dark:bg-white/10 dark:text-violet-300">
            <Goal size={21} />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/80 p-3 dark:bg-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400">Sesiones hoy</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{todaySessions.length}</p>
          </div>
          <div className="rounded-2xl bg-white/80 p-3 dark:bg-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400">Tiempo enfocado esta semana</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{weekMinutes}<span className="ml-1 text-xs font-medium text-slate-500">min</span></p>
          </div>
        </div>

        {data.goals.length > 0 ? (
          <div className="space-y-3">
            {data.goals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.progress / goal.target) * 100));
              const achieved = goal.progress >= goal.target;
              return (
                <article key={goal.id} className="rounded-2xl border border-white/90 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-lg p-2 ${achieved ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300"}`}>
                      {achieved ? <Trophy size={17} /> : <Flame size={17} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{goal.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {goal.progress} de {goal.target} {GOAL_UNIT_LABEL[goal.unit]} · {achieved ? "¡Meta alcanzada!" : `${percent}%`}
                      </p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div className={`h-full rounded-full transition-all ${achieved ? "bg-emerald-500" : "bg-violet-500"}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <button type="button" onClick={() => deleteGoal(goal.id)} aria-label={`Eliminar meta ${goal.title}`} className="text-slate-400 transition hover:text-rose-500">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {!achieved && (
                    <div className="mt-3 flex justify-end gap-2">
                      <button type="button" onClick={() => updateGoalProgress(goal.id, -1)} aria-label="Restar avance" className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10">
                        <ArrowDown size={15} />
                      </button>
                      <button type="button" onClick={() => updateGoalProgress(goal.id, 1)} className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">
                        <ArrowUp size={14} /> Registrar avance
                      </button>
                    </div>
                  )}
                  {achieved && (
                    <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <Check size={14} /> Reconoce tu progreso y define el siguiente paso.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-violet-300 bg-white/50 px-4 py-6 text-center dark:border-violet-800 dark:bg-white/[0.03]">
            <Trophy className="mx-auto mb-2 text-violet-500" size={25} />
            <p className="text-sm font-medium text-slate-800 dark:text-white">Empieza por una meta alcanzable</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Por ejemplo: 5 sesiones de enfoque esta semana.</p>
          </div>
        )}

        {goalFormOpen ? (
          <form onSubmit={createGoal} className="mt-4 space-y-3 rounded-2xl border border-violet-200 bg-white/80 p-4 dark:border-violet-900 dark:bg-white/5">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Nombre de la meta
              <input required maxLength={70} value={goalTitle} onChange={(event) => setGoalTitle(event.target.value)} placeholder="Ej. Leer cada día" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
            </label>
            <div className="grid grid-cols-[0.7fr_1.3fr] gap-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Objetivo
                <input required type="number" min={1} max={10000} value={goalTarget} onChange={(event) => setGoalTarget(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
              </label>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Medir en
                <select value={goalUnit} onChange={(event) => setGoalUnit(event.target.value as GoalUnit)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-white">
                  <option value="sesiones">Sesiones de enfoque</option>
                  <option value="minutos">Minutos enfocados</option>
                  <option value="tareas">Tareas completadas</option>
                </select>
              </label>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setGoalFormOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">Cancelar</button>
              <button type="submit" className="flex-1 rounded-lg bg-violet-600 py-2 text-xs font-semibold text-white hover:bg-violet-700">Crear meta</button>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setGoalFormOpen(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 py-3 text-sm font-semibold text-violet-700 transition hover:bg-white/70 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-white/5">
            <Plus size={17} /> Crear una meta
          </button>
        )}

        {data.goals.some((goal) => goal.unit === "tareas") && (
          <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
            Al completar tareas, registra el avance con el botón de cada meta.
          </p>
        )}
      </div>
    </section>
  );
}
