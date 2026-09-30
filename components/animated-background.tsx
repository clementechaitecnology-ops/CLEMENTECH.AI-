"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const leftCode = [
  "01 10 01 10",
  "11 00 10 10",
  "10 01 11 00",
  "CODE 1010 011",
  "01 01 10 11",
];

const rightCode = [
  "10 01 10 01",
  "11 00 01 10",
  "CODE 0011",
  "1010 1110 0101",
  "00 10 01 11",
];

export default function AnimatedBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : "light";
  const isDark = currentTheme === "dark";

  const neuronDots = [
    { left: "10%", top: "15%", size: 12 },
    { left: "25%", top: "8%", size: 14 },
    { left: "78%", top: "18%", size: 10 },
    { left: "60%", top: "10%", size: 16 },
    { left: "15%", top: "72%", size: 10 },
    { left: "32%", top: "55%", size: 14 },
    { left: "88%", top: "70%", size: 12 },
    { left: "72%", top: "46%", size: 10 },
    { left: "42%", top: "28%", size: 18 },
    { left: "50%", top: "72%", size: 12 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700">
      <div className={`absolute inset-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`} />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 15%, rgba(56,189,248,0.16), transparent 18%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.14), transparent 18%), radial-gradient(circle at 25% 80%, rgba(16,185,129,0.14), transparent 16%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.05),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.04),transparent_32%)] mix-blend-screen" />

      <div className="absolute left-8 top-16 w-[440px] h-[440px] rounded-full blur-[110px] animate-float-slow" style={{ background: isDark ? "rgba(56,189,248,0.12)" : "rgba(56,189,248,0.08)" }} />
      <div className="absolute right-10 top-24 w-[360px] h-[360px] rounded-full blur-[100px] animate-float-slower" style={{ background: isDark ? "rgba(168,85,247,0.12)" : "rgba(59,130,246,0.08)" }} />
      <div className="absolute left-[18%] bottom-8 w-[420px] h-[420px] rounded-full blur-[120px] animate-float-slow" style={{ background: isDark ? "rgba(16,185,129,0.1)" : "rgba(251,191,36,0.08)" }} />

      {neuronDots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-cyan-400/70 shadow-[0_0_24px_rgba(56,189,248,0.35)] animate-neuron-pulse"
          style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size }}
        />
      ))}

      <div className="absolute left-6 top-24 flex flex-col gap-2 text-[11px] font-mono uppercase tracking-[0.35em] text-cyan-200/80 animate-code-scroll">
        {leftCode.map((line, index) => (
          <div key={index} className="inline-flex items-center justify-start rounded-full bg-slate-900/20 px-2 py-1 text-cyan-100/90 shadow-[0_0_22px_rgba(56,189,248,0.12)]">
            {line}
          </div>
        ))}
      </div>

      <div className="absolute right-6 top-28 flex flex-col gap-2 text-[11px] font-mono uppercase tracking-[0.35em] text-violet-200/80 animate-code-scroll reverse-scroll">
        {rightCode.map((line, index) => (
          <div key={index} className="inline-flex items-center justify-end rounded-full bg-slate-900/20 px-2 py-1 text-violet-100/90 shadow-[0_0_22px_rgba(168,85,247,0.12)]">
            {line}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center px-6">
        <div className="relative w-[340px] h-[250px]">
          <div className="absolute inset-0 rounded-[42%_42%_48%_48%] bg-slate-950/85 border border-cyan-400/15 shadow-[0_0_140px_rgba(56,189,248,0.14)] animate-brain-pulse" />
          <div className="absolute left-8 top-8 w-32 h-24 rounded-[50%_45%_50%_45%] bg-slate-900/75 border border-cyan-300/20" />
          <div className="absolute right-8 top-8 w-32 h-24 rounded-[45%_50%_45%_50%] bg-slate-900/75 border border-cyan-300/20" />
          <div className="absolute left-[calc(50%-100px)] top-[calc(50%-70px)] w-40 h-36 rounded-[45%_45%_55%_55%] bg-slate-950/85 border border-cyan-300/20" />

          <div className="absolute inset-x-[calc(50%-70px)] top-[calc(50%-48px)] h-24 rounded-3xl border border-cyan-400/40 bg-slate-900/95 shadow-[0_0_50px_rgba(56,189,248,0.28)] backdrop-blur-sm">
            <div className="absolute inset-x-4 top-3 h-1 rounded-full bg-cyan-400/30" />
            <div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-cyan-400/30" />
            <div className="flex h-full items-center justify-center text-[26px] font-semibold tracking-[0.35em] text-cyan-200">IA</div>
          </div>

          <div className="absolute left-14 top-28 w-8 h-8 rounded-full bg-cyan-400/30 shadow-[0_0_30px_rgba(56,189,248,0.18)]" />
          <div className="absolute right-14 top-28 w-8 h-8 rounded-full bg-cyan-400/30 shadow-[0_0_30px_rgba(56,189,248,0.18)]" />
          <div className="absolute left-24 bottom-12 w-10 h-10 rounded-full bg-violet-400/20 shadow-[0_0_30px_rgba(168,85,247,0.18)]" />
          <div className="absolute right-24 bottom-12 w-10 h-10 rounded-full bg-violet-400/20 shadow-[0_0_30px_rgba(168,85,247,0.18)]" />
        </div>
      </div>
    </div>
  );
}
