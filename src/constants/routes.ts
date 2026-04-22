/**
 * Centralised route path constants.
 * Single source of truth for every navigable path in the app.
 */
export const APP_ROUTES = {
  // Public
  LOGIN: "/login",
  SIGNUP: "/signup",

  // Protected — shared
  UNAUTHORIZED: "/unauthorized",

  // Protected — role/permission gated
  INVOICES: "/invoices",
  INVOICE_DETAIL: "/invoices/:id",
  INVOICE_CREATE: "/invoices/create",
  INVOICE_EDIT: "/invoices/:id/edit",
  USERS: "/users",
} as const;
