import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { getDefaultRouteForRole } from "@/module/auth/utils/routeGuards";
import { APP_ROUTES } from "@/constants/routes";

/**
 * Wraps public-only routes (login, signup).
 * If the user is already authenticated, redirect to their role's default page.
 */
export function PublicRoute() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  }

  if (token && user) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  if (token) {
    return <Navigate to={APP_ROUTES.INVOICES} replace />;
  }

  return <Outlet />;
}
