import type { UserRole } from "@/constants/roles";
import type { Permission } from "@/constants/permissions";

/** Shape returned by POST /api/auth/login */
export interface AuthResponse {
  token: string;
  user: User;
}

/** Core user object */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: number;
}

/** POST /api/auth/login body */
export interface LoginPayload {
  email: string;
  password: string;
}

/** POST /api/auth/signup body */
export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

/** Generic API error shape */
export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}
