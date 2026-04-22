import { Routes, Route, Navigate } from "react-router-dom";
import { APP_ROUTES } from "@/constants/routes";
import { PublicRoute } from "@/routes/PublicRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { RoleBasedRoute } from "@/routes/RoleBasedRoute";

/* Layout */
import { AppLayout } from "@/components/Layout/AppLayout";

/* Auth module components */
import { LoginForm } from "@/module/auth/components/LoginForm";
import { SignupForm } from "@/module/auth/components/SignupForm";
import { UnauthorizedPage } from "@/module/auth/components/UnauthorizedPage";

/* Invoice module components */
import { InvoiceList } from "@/module/invoice/components/InvoiceList";
import { InvoiceDetail } from "@/module/invoice/components/InvoiceDetail";
import { InvoiceForm } from "@/module/invoice/components/InvoiceForm";

/* Constants */
import { UserRoles } from "@/constants/roles";
import { Permissions } from "@/constants/permissions";

/* Utils */
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { getDefaultRouteForRole } from "@/module/auth/utils/routeGuards";

/**
 * Redirect to the user's default route based on their role.
 */
function RoleRedirect() {
  const user = useAuthStore((s) => s.user);
  const defaultRoute = user
    ? getDefaultRouteForRole(user.role)
    : APP_ROUTES.LOGIN;
  return <Navigate to={defaultRoute} replace />;
}

/**
 * Top-level route configuration.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* ── Public (unauthenticated only) ──────────────────────── */}
      <Route element={<PublicRoute />}>
        <Route path={APP_ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={APP_ROUTES.SIGNUP} element={<SignupForm />} />
      </Route>

      {/* ── Protected (with sidebar layout) ────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Root → redirect based on role */}
          <Route index element={<RoleRedirect />} />

          {/* Unauthorized */}
          <Route
            path={APP_ROUTES.UNAUTHORIZED}
            element={<UnauthorizedPage />}
          />

          {/* ── Invoice routes (permission-gated) ──────────────── */}
          <Route
            element={
              <RoleBasedRoute
                anyPermissions={[
                  Permissions.INVOICES_READ,
                  Permissions.INVOICES_CREATE,
                ]}
              />
            }
          >
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
          </Route>

          {/* Create invoice — needs invoices:create */}
          <Route
            element={
              <RoleBasedRoute permissions={[Permissions.INVOICES_CREATE]} />
            }
          >
            <Route
              path="invoices/create"
              element={<InvoiceForm mode="create" />}
            />
          </Route>

          {/* Edit invoice — needs invoices:update */}
          <Route
            element={
              <RoleBasedRoute permissions={[Permissions.INVOICES_UPDATE]} />
            }
          >
            <Route
              path="invoices/:id/edit"
              element={<InvoiceForm mode="edit" />}
            />
          </Route>

          {/* ── Admin-only: User Management ────────────────────── */}
          <Route element={<RoleBasedRoute role={UserRoles.ADMIN} />}>
            <Route
              path="users"
              element={
                <div>
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "0.5rem",
                    }}
                  >
                    User Management
                  </h1>
                  <p style={{ color: "#64748b" }}>
                    Admin-only area. User management module coming soon.
                  </p>
                </div>
              }
            />
          </Route>

          {/* ── Reports (permission-gated) ─────────────────────── */}
          <Route
            element={
              <RoleBasedRoute
                anyPermissions={[
                  Permissions.REPORTS_READ,
                  Permissions.REPORTS_EXPORT,
                ]}
              />
            }
          >
            <Route
              path="reports"
              element={
                <div>
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Reports
                  </h1>
                  <p style={{ color: "#64748b" }}>
                    Reports module coming soon.
                  </p>
                </div>
              }
            />
          </Route>
        </Route>
      </Route>

      {/* ── Catch-all → role-based redirect ────────────────────── */}
      <Route path="*" element={<RoleRedirect />} />
    </Routes>
  );
}
