"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : "light";
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700">
      <div className={`absolute inset-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`} />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          mixBlendMode: isDark ? "screen" : "normal",
        }}
      />

      <div
        className="absolute top-[-12%] left-[8%] w-[520px] h-[520px] rounded-full blur-[100px] animate-float-slow"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(56,189,248,0.16), transparent 68%)"
            : "radial-gradient(circle, rgba(251,191,36,0.18), transparent 68%)",
        }}
      />

      <div
        className="absolute top-[24%] right-[6%] w-[410px] h-[410px] rounded-full blur-[100px] animate-float-slower"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.16), transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[-10%] left-[28%] w-[460px] h-[460px] rounded-full blur-[100px] animate-float-slow"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(56,189,248,0.1), transparent 72%)"
            : "radial-gradient(circle, rgba(16,185,129,0.08), transparent 72%)",
        }}
      />

      {isDark ? (
        <div className="absolute top-[12%] right-[18%] w-36 h-36 rounded-full bg-slate-200/10 border border-slate-100/10 shadow-[0_0_80px_rgba(148,163,184,0.35)] animate-float-slower" />
      ) : (
        <div className="absolute top-[10%] left-[12%] w-44 h-44 rounded-full bg-amber-300/20 shadow-[0_0_100px_rgba(251,191,36,0.35)] animate-float-slower" />
      )}
    </div>
  );
}
