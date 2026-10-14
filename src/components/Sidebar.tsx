"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Profile", href: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };

  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen flex flex-col border-r border-zinc-800">
      {/* Brand / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <span className="text-xl font-bold tracking-tight text-blue-500">
          MyApp
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section & Logout */}
      <div className="p-4 border-t border-zinc-800 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400">Logged in as</span>
          <span className="text-xs font-semibold text-zinc-200 truncate" title={user?.email}>
            {user?.email || "Authenticated User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          id="sidebar-logout-btn"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-red-400 hover:text-white bg-red-950/20 hover:bg-red-600/80 border border-red-900/40 rounded-lg transition cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
