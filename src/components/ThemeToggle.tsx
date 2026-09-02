"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium opacity-50">
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors flex items-center gap-2 border border-zinc-200 dark:border-zinc-700"
      aria-label="Toggle Theme"
    >
      <span>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}
