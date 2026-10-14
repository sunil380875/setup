"use client";

import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <header className="h-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Application Overview
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Light / Dark Mode Toggle */}
        <ThemeToggle />

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-200 dark:border-zinc-800">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm shadow-sm">
            {initial}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">
              {user?.email || "User"}
            </span>
            <span className="text-[10px] text-zinc-400">Authenticated</span>
          </div>
        </div>

        {/* Quick Header Logout Button */}
        <button
          onClick={handleLogout}
          id="header-logout-btn"
          title="Sign out of your account"
          className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
