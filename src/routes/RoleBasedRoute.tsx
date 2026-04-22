import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { APP_ROUTES } from "@/constants/routes";
import type { UserRole } from "@/constants/roles";
import type { Permission } from "@/constants/permissions";
import {
  hasRole,
  hasMinimumRole,
  hasAllPermissions,
  hasAnyPermission,
} from "@/module/auth/utils/permissions";

interface RoleBasedRouteProps {
  /** Exact role required (use ONE of role / minimumRole) */
  role?: UserRole;
  /** Minimum role in the hierarchy */
  minimumRole?: UserRole;
  /** ALL of these permissions must be present */
  permissions?: Permission[];
  /** AT LEAST ONE of these permissions must be present */
  anyPermissions?: Permission[];
  /** Where to redirect on access denied (defaults to /unauthorized) */
  redirectTo?: string;
}

export function RoleBasedRoute({
  role,
  minimumRole,
  permissions,
  anyPermissions,
  redirectTo = APP_ROUTES.UNAUTHORIZED,
}: RoleBasedRouteProps) {
  const user = useAuthStore((s) => s.user);

  // Role checks
  if (role && !hasRole(user, role)) {
    return <Navigate to={redirectTo} replace />;
  }

  if (minimumRole && !hasMinimumRole(user, minimumRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Permission checks
  if (permissions && !hasAllPermissions(user, permissions)) {
    return <Navigate to={redirectTo} replace />;
  }

  if (anyPermissions && !hasAnyPermission(user, anyPermissions)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
