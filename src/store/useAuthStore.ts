"use client";

import { create } from "zustand";
import { User } from "@/types/auth";
import { authService, ApiError } from "@/services/authService";
import { clearStoredToken, getStoredToken, setStoredToken } from "@/utils/token";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  fetchSelf: () => Promise<User | null>;
  initializeAuth: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signin(email, password);
      const { token, user } = response.data;

      setStoredToken(token);

      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "An unexpected error occurred during signin.";
      set({ error: message, isLoading: false, isAuthenticated: false });
      return false;
    }
  },

  fetchSelf: async () => {
    const currentToken = get().token || getStoredToken();
    if (!currentToken) {
      get().logout();
      return null;
    }

    try {
      const response = await authService.getSelf(currentToken);
      const user = response.data;
      set({
        user,
        token: currentToken,
        isAuthenticated: true,
        error: null,
      });
      return user;
    } catch (err) {
      console.warn("fetchSelf failed, session expired or invalid token:", err);
      get().logout();
      return null;
    }
  },

  initializeAuth: async () => {
    const token = getStoredToken();
    if (!token) {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitializing: false,
      });
      return;
    }

    set({ token, isInitializing: true });
    await get().fetchSelf();
    set({ isInitializing: false });
  },

  logout: () => {
    clearStoredToken();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
