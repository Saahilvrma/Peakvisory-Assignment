import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { useLazyGetMeQuery } from "@/module/auth/api/authApi";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Hydrates the auth state on mount.
 *
 * If a persisted token exists it fires GET /api/auth/me to validate
 * the session and refresh the user object.  On failure (e.g. expired
 * token that can't be refreshed) it clears state and redirects to login.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const setHydrated = useAuthStore((s) => s.setHydrated);
  const logout = useAuthStore((s) => s.logout);

  const [triggerGetMe] = useLazyGetMeQuery();

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setHydrated(true);
        return;
      }

      try {
        const user = await triggerGetMe().unwrap();
        setUser(user);
      } catch {
        // Token invalid & refresh failed → clean slate
        logout();
      } finally {
        setHydrated(true);
      }
    };

    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
