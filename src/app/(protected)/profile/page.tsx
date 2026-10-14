"use client";

import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          User Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Detailed profile information retrieved from the backend API.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-500">Email</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {user?.email || "N/A"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-500">User ID</span>
            <span className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
              {user?._id || "N/A"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-500">Member Since</span>
            <span className="text-sm text-zinc-800 dark:text-zinc-200">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
