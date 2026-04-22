/* Auth module — public API */

// Store / hooks
export { useAuthStore } from "./hooks/useAuth";

// API
export {
  authApi,
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} from "./api/authApi";

// Components
export { LoginForm } from "./components/LoginForm";
export { SignupForm } from "./components/SignupForm";
export { UnauthorizedPage } from "./components/UnauthorizedPage";

// Utils
export {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasRole,
  hasMinimumRole,
} from "./utils/permissions";
export { getToken, setToken, clearToken } from "./utils/token";
export { getDefaultRouteForRole } from "./utils/routeGuards";
export { loginSchema, signupSchema } from "./utils/validationSchemas";
