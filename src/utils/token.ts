export const AUTH_TOKEN_KEY = "auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  // Set cookie for 7 days so middleware / SSR can detect auth status
  document.cookie = `${AUTH_TOKEN_KEY}=${encodeURIComponent(
    token
  )}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}
