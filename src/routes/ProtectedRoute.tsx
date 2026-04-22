import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { APP_ROUTES } from "@/constants/routes";

/**
 * Wraps routes that require authentication.
 * Renders a loading spinner while the auth state is hydrating,
 * redirects to login if no valid session exists.
 */
export function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
