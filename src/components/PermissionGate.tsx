import type { ReactNode } from "react";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import type { Permission } from "@/constants/permissions";
import type { UserRole } from "@/constants/roles";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasRole,
} from "@/module/auth/utils/permissions";

interface PermissionGateProps {
  children: ReactNode;
  /** Render when access is denied (optional) */
  fallback?: ReactNode;
  /** Single permission check */
  permission?: Permission;
  /** ALL of these permissions required */
  permissions?: Permission[];
  /** At least ONE of these permissions required */
  anyPermissions?: Permission[];
  /** Exact role required */
  role?: UserRole;
}

/**
 * Declarative component for permission-based UI rendering.
 *
 * ```tsx
 * <PermissionGate permission="invoices:create">
 *   <button>Create Invoice</button>
 * </PermissionGate>
 * ```
 */
export function PermissionGate({
  children,
  fallback = null,
  permission,
  permissions,
  anyPermissions,
  role,
}: PermissionGateProps) {
  const user = useAuthStore((s) => s.user);

  if (role && !hasRole(user, role)) return <>{fallback}</>;
  if (permission && !hasPermission(user, permission)) return <>{fallback}</>;
  if (permissions && !hasAllPermissions(user, permissions))
    return <>{fallback}</>;
  if (anyPermissions && !hasAnyPermission(user, anyPermissions))
    return <>{fallback}</>;

  return <>{children}</>;
}
