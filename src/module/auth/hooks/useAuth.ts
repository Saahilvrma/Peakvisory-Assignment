import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/auth.types";

/* ------------------------------------------------------------------ */
/*  State shape                                                        */
/* ------------------------------------------------------------------ */

interface AuthState {
  /** JWT access token (kept in memory + localStorage for persistence) */
  token: string | null;
  /** Authenticated user object */
  user: User | null;
  /** Whether the initial /me hydration has completed */
  isHydrated: boolean;
}

interface AuthActions {
  /** Populate store after login / signup / me response */
  setAuth: (token: string, user: User) => void;
  /** Update only the user object (e.g. after /me fetch) */
  setUser: (user: User) => void;
  /** Mark hydration as complete */
  setHydrated: (value: boolean) => void;
  /** Full state reset on logout */
  logout: () => void;
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

const initialState: AuthState = {
  token: null,
  user: null,
  isHydrated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setAuth: (token, user) => set({ token, user, isHydrated: true }),

      setUser: (user) => set({ user }),

      setHydrated: (value) => set({ isHydrated: value }),

      logout: () => {
        set({ ...initialState, isHydrated: true });
      },
    }),
    {
      name: "peakvisory-auth",
      storage: createJSONStorage(() => localStorage),
      /** Only persist token + user; isHydrated is runtime-only */
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
