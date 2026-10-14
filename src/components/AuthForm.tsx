"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type AuthMode = "signin" | "signup";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");

  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormValues) => {
    clearError();
    if (mode === "signin") {
      const success = await login(data.email, data.password);
      if (success) {
        router.push("/dashboard");
      }
    } else {
      // Mock signup flow or notify user
      alert("Registration endpoint is not requested. Please sign in with test credentials.");
    }
  };

  const switchMode = (next: AuthMode) => {
    if (next === mode) return;
    clearError();
    setMode(next);
    reset();
  };

  const handleFillDemo = () => {
    setValue("email", "skm@gmail.cm", { shouldValidate: true });
    setValue("password", "12345", { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/60 dark:shadow-zinc-950/80">
        {/* ── Toggle tabs ── */}
        <div className="flex rounded-t-2xl overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <button
            id="auth-tab-signin"
            type="button"
            onClick={() => switchMode("signin")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none cursor-pointer ${
              mode === "signin"
                ? "bg-blue-600 text-white"
                : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none cursor-pointer ${
              mode === "signup"
                ? "bg-blue-600 text-white"
                : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* ── Form body ── */}
        <div className="px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              {mode === "signin"
                ? "Sign in to continue to your dashboard."
                : "Fill in the details below to get started."}
            </p>
          </div>

          {/* Quick Demo Credentials Fill Button */}
          {mode === "signin" && (
            <div className="mb-5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-300">
                Demo: <strong className="text-blue-600 dark:text-blue-400">skm@gmail.cm</strong>
              </span>
              <button
                type="button"
                id="fill-demo-credentials-btn"
                onClick={handleFillDemo}
                className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              id="auth-error-alert"
              className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5 animate-fadeIn"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="font-medium text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {mode === "signup" && (
              <Field
                id="auth-name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                error={errors.name?.message}
                registration={register("name", {
                  required: "Full name is required.",
                })}
              />
            )}

            <Field
              id="auth-email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              registration={register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />

            <Field
              id="auth-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              error={errors.password?.message}
              registration={register("password", {
                required: "Password is required.",
                ...(mode === "signup"
                  ? {
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters.",
                      },
                    }
                  : {}),
              })}
            />

            {mode === "signup" && (
              <Field
                id="auth-confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                registration={register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match.",
                })}
              />
            )}

            {mode === "signin" && (
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  id="auth-forgot-password"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              id="auth-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  {mode === "signin" ? "Signing in…" : "Creating account…"}
                </>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* ── Bottom switch link ── */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  id="auth-switch-to-signup"
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  id="auth-switch-to-signin"
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Field ──────────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<FormValues>>["register"]>;
  autoComplete?: string;
}

function Field({
  id,
  label,
  type,
  placeholder,
  error,
  registration,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 tracking-wide uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registration}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400 ${
          error
            ? "border-red-400 dark:border-red-500 bg-red-50/40 dark:bg-red-950/20"
            : "border-zinc-200 dark:border-zinc-700"
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Spinner ────────────────────────────────────────────────────── */

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
