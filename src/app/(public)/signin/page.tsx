import React from "react";
import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In | Setup App",
  description: "Sign in or create a new account to access your dashboard.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-zinc-50 via-blue-50/30 to-zinc-100 dark:from-zinc-950 dark:via-blue-950/20 dark:to-zinc-900">
      {/* Logo / brand mark */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Setup App</span>
      </div>

      <AuthForm />

      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-500">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">Privacy Policy</a>.
      </p>
    </main>
  );
}
