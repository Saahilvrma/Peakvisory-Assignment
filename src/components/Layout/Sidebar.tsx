import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import { APP_ROUTES } from "@/constants/routes";
import { Permissions } from "@/constants/permissions";
import { UserRoles } from "@/constants/roles";
import { hasAnyPermission, hasRole } from "@/module/auth/utils/permissions";
import "./layout.css";

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                 */
/* ------------------------------------------------------------------ */

const InvoiceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BrandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Sidebar component                                                  */
/* ------------------------------------------------------------------ */

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(APP_ROUTES.LOGIN, { replace: true });
  };

  const initials = user?.email?.split("@")[0].slice(0, 2).toUpperCase();

  /**
   * Build nav items based on permissions/role.
   */
  const navItems: {
    to: string;
    label: string;
    icon: React.ReactNode;
    visible: boolean;
  }[] = [
    {
      to: APP_ROUTES.INVOICES,
      label: "Invoices",
      icon: <InvoiceIcon />,
      visible: hasAnyPermission(user, [
        Permissions.INVOICES_READ,
        Permissions.INVOICES_CREATE,
      ]),
    },
    {
      to: APP_ROUTES.USERS,
      label: "User Management",
      icon: <UsersIcon />,
      visible: hasRole(user, UserRoles.ADMIN),
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <BrandIcon />
          </div>
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">Peakvisory</span>
            <span className="sidebar-brand-sub">Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Main</span>
          {navItems
            .filter((item) => item.visible)
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === APP_ROUTES.INVOICES}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
        </nav>

        {/* Footer — User info + logout */}
        <div className="sidebar-footer">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-email">{user?.email}</div>
            <div className="sidebar-user-role">{user?.role}</div>
          </div>
          <button
            id="sidebar-logout-btn"
            className="sidebar-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </aside>
    </>
  );
}
