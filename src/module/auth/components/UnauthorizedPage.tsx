import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/constants/routes";
import "@/module/auth/styles/auth.css";

const ShieldIcon = () => (
  <svg
    className="unauthorized-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m14.5 9.5-5 5" />
    <path d="m9.5 9.5 5 5" />
  </svg>
);

/**
 * Shown when a user tries to access a resource they don't have
 * the role or permission for.
 */
export function UnauthorizedPage() {
  return (
    <div className="unauthorized-page">
      <ShieldIcon />
      <h1>Access Denied</h1>
      <p>
        You don&apos;t have permission to view this page. Contact your
        administrator if you believe this is a mistake.
      </p>
      <Link to={APP_ROUTES.INVOICES} className="unauthorized-back">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
