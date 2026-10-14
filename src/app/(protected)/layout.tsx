"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isInitializing, token } = useAuthStore();

  useEffect(() => {
    if (!isInitializing && (!token || !isAuthenticated)) {
      router.replace("/signin");
    }
  }, [isInitializing, isAuthenticated, token, router]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Verifying authentication session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !token) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Component */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}
