"use client";

import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Application Overview
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile Avatar / Logout */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
            U
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}
