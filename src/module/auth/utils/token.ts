import { useAuthStore } from "@/module/auth/hooks/useAuth";

const TOKEN_KEY = "peakvisory-auth"; // matches Zustand persist key

/* ------------------------------------------------------------------ */
/*  Token access                                                       */
/* ------------------------------------------------------------------ */

/**
 * Read the current access token from Zustand (preferred, in-memory).
 */
export const getToken = (): string | null => {
  return useAuthStore.getState().token;
};

/**
 * Persist token + user after login.
 * (Handled by Zustand persist, but this wrapper keeps the API explicit.)
 */
export const setToken = (token: string): void => {
  // Zustand's persist middleware auto-syncs to localStorage,
  // so we only need to update the store.  The caller should use
  // `useAuthStore.getState().setAuth(token, user)` directly.
  // This utility is here as a fallback for non-React contexts.
  const { user, setAuth } = useAuthStore.getState();
  if (user) {
    setAuth(token, user);
  }
};

/**
 * Remove all auth data — mirrors the Zustand logout action.
 */
export const clearToken = (): void => {
  useAuthStore.getState().logout();
  localStorage.removeItem(TOKEN_KEY);
};
