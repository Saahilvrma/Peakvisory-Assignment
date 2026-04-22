/**
 * Application user roles.
 * Used for role-based access control throughout the app.
 */
export const UserRoles = {
  VIEWER: "Viewer",
  ADMIN: "Admin",
  ACCOUNTANT: "Accountant",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

/**
 * Role hierarchy — higher index = more privileges.
 * Useful for "at least this role" checks.
 */
export const ROLE_HIERARCHY: readonly UserRole[] = [
  UserRoles.VIEWER,
  UserRoles.ACCOUNTANT,
  UserRoles.ADMIN,
] as const;
