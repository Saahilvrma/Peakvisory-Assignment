/**
 * Fine-grained permissions for RBAC.
 * Format: "resource:action"
 */
export const Permissions = {
  // Invoice permissions
  INVOICES_READ: "invoices:read",
  INVOICES_CREATE: "invoices:create",
  INVOICES_UPDATE: "invoices:update",
  INVOICES_DELETE: "invoices:delete",

  // Customer permissions
  CUSTOMERS_READ: "customers:read",
  CUSTOMERS_CREATE: "customers:create",
  CUSTOMERS_UPDATE: "customers:update",
  CUSTOMERS_DELETE: "customers:delete",

  // Product permissions
  PRODUCTS_READ: "products:read",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_UPDATE: "products:update",
  PRODUCTS_DELETE: "products:delete",

  // User / admin permissions
  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",

  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",

  // Reports
  REPORTS_READ: "reports:read",
  REPORTS_EXPORT: "reports:export",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
