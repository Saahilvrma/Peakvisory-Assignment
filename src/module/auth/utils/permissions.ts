import type { Permission } from "@/constants/permissions";
import type { UserRole } from "@/constants/roles";
import { ROLE_HIERARCHY } from "@/constants/roles";
import type { User } from "@/types/auth.types";

/* ------------------------------------------------------------------ */
/*  Permission helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Check whether the user holds a specific permission.
 */
export const hasPermission = (
  user: User | null,
  permission: Permission,
): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

/**
 * Check whether the user holds ALL of the listed permissions.
 */
export const hasAllPermissions = (
  user: User | null,
  permissions: Permission[],
): boolean => {
  if (!user) return false;
  return permissions.every((p) => user.permissions.includes(p));
};

/**
 * Check whether the user holds AT LEAST ONE of the listed permissions.
 */
export const hasAnyPermission = (
  user: User | null,
  permissions: Permission[],
): boolean => {
  if (!user) return false;
  return permissions.some((p) => user.permissions.includes(p));
};

/* ------------------------------------------------------------------ */
/*  Role helpers                                                       */
/* ------------------------------------------------------------------ */

/**
 * Exact role match.
 */
export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.role === role;
};

/**
 * Check if the user's role is at or above the given role in the hierarchy.
 */
export const hasMinimumRole = (
  user: User | null,
  minimumRole: UserRole,
): boolean => {
  if (!user) return false;
  const userIdx = ROLE_HIERARCHY.indexOf(user.role);
  const requiredIdx = ROLE_HIERARCHY.indexOf(minimumRole);
  return userIdx >= requiredIdx;
};
