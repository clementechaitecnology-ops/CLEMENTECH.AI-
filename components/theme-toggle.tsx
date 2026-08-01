"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : "light";
  const isDark = currentTheme === "dark";

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 bg-white/10 text-neutral-900 shadow-sm shadow-black/10 transition duration-300 hover:bg-white/20 dark:border-neutral-700 dark:bg-neutral-950/40 dark:text-neutral-100 dark:hover:bg-neutral-900/60"
      aria-label="Cambiar tema"
      title={`Cambiar a ${isDark ? "modo claro" : "modo oscuro"}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
