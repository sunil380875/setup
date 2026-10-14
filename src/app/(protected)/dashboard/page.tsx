"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout, fetchSelf } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };

  const handleRefreshSelf = async () => {
    setIsRefreshing(true);
    setRefreshMessage(null);
    try {
      const refreshedUser = await fetchSelf();
      if (refreshedUser) {
        setRefreshMessage("User profile successfully re-verified from /users/self API!");
      }
    } catch {
      setRefreshMessage("Failed to refresh user profile.");
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setRefreshMessage(null), 4000);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "N/A";
    try {
      return new Date(isoString).toLocaleString();
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner with Logout Button */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Authenticated Session Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {user?.email || "User"}
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            You are logged in with Zustand global state management. Your session is protected and automatically hydrated via the self API on page refresh.
          </p>
        </div>

        {/* Primary Dashboard Logout Button */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="dashboard-refresh-btn"
            onClick={handleRefreshSelf}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {isRefreshing ? "Fetching Self..." : "Refresh Self API"}
          </button>

          <button
            id="dashboard-logout-btn"
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold shadow-lg shadow-red-500/30 transition flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {refreshMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2 animate-fadeIn">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {refreshMessage}
        </div>
      )}

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-2">
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">🛡️</span>
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
              Auth Guard
            </span>
          </div>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Protected Route</p>
          <p className="text-xs text-zinc-500 mt-1">
            Access strictly restricted to authenticated users.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">⚡</span>
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
              State Persistence
            </span>
          </div>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Self API Hydrated</p>
          <p className="text-xs text-zinc-500 mt-1">
            On refresh, Zustand calls /users/self with bearer token.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mb-2">
            <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50">📦</span>
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
              Global Store
            </span>
          </div>
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Zustand Store</p>
          <p className="text-xs text-zinc-500 mt-1">
            Reactive store managing token, user data, and status.
          </p>
        </div>
      </div>

      {/* User Details from Self API */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              User Profile Data (from /users/self)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Live user attributes maintained in global Zustand store
            </p>
          </div>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            Verified
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              User ID (_id)
            </label>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-sm text-zinc-800 dark:text-zinc-200">
              {user?._id || "Not available"}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-sm text-zinc-800 dark:text-zinc-200">
              {user?.email || "Not available"}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Created At
            </label>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-200">
              {formatDate(user?.createdAt)}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Updated At
            </label>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-200">
              {formatDate(user?.updatedAt)}
            </div>
          </div>
        </div>

        {/* Token Preview */}
        <div className="mt-6 space-y-1">
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>Bearer Token</span>
            <span className="text-[10px] text-zinc-400 lowercase">used for self API authentication</span>
          </label>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-xs text-zinc-600 dark:text-zinc-400 break-all select-all">
            {token || "No token found"}
          </div>
        </div>
      </div>
    </div>
  );
}
