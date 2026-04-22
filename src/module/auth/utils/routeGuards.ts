/**
 * Returns the default landing route for a given role after login.
 */
import type { UserRole } from "@/constants/roles";
import { UserRoles } from "@/constants/roles";
import { APP_ROUTES } from "@/constants/routes";

export const getDefaultRouteForRole = (role: UserRole): string => {
  switch (role) {
    case UserRoles.ADMIN:
      return APP_ROUTES.USERS;
    case UserRoles.ACCOUNTANT:
    case UserRoles.VIEWER:
    default:
      return APP_ROUTES.INVOICES;
  }
};
