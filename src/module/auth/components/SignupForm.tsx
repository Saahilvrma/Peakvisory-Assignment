import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/module/auth/api/authApi";
import { useAuthStore } from "@/module/auth/hooks/useAuth";
import {
  signupSchema,
  type SignupFormValues,
} from "@/module/auth/utils/validationSchemas";
import { APP_ROUTES } from "@/constants/routes";
import { getDefaultRouteForRole } from "@/module/auth/utils/routeGuards";
import "@/module/auth/styles/auth.css";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

const MailIcon = () => (
  <svg
    className="auth-input-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    className="auth-input-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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
/*  Password strength meter                                            */
/* ------------------------------------------------------------------ */

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)) score++;

  if (score <= 2) return { level: "weak", label: "Weak", filled: 1 };
  if (score === 3) return { level: "fair", label: "Fair", filled: 2 };
  if (score === 4) return { level: "good", label: "Good", filled: 3 };
  return { level: "strong", label: "Strong", filled: 4 };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setAuth = useAuthStore((s) => s.setAuth);
  const [signup, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const passwordValue = watch("password", "");
  const strength = useMemo(
    () => getPasswordStrength(passwordValue),
    [passwordValue],
  );

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null);
    try {
      const data = await signup(values).unwrap();
      setAuth(data.token, data.user);
      navigate(getDefaultRouteForRole(data.user.role), { replace: true });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setApiError(error?.data?.message ?? "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <BrandIcon />
          </div>
          <h1>Create account</h1>
          <p>Start your Peakvisory journey</p>
        </div>

        {/* API error */}
        {apiError && (
          <div className="auth-api-error" role="alert">
            <AlertIcon />
            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email */}
          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <div className="auth-input-wrapper">
              <MailIcon />
              <input
                id="signup-email"
                type="email"
                className={`auth-input ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="auth-error">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <div className="auth-input-wrapper">
              <LockIcon />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                className={`auth-input ${errors.password ? "input-error" : ""}`}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("password")}
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="auth-error">{errors.password.message}</p>
            )}

            {/* Strength meter */}
            {passwordValue.length > 0 && (
              <>
                <div className="password-strength">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`password-strength-bar ${
                        i <= strength.filled ? `filled ${strength.level}` : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="password-strength-label">
                  {strength.label}
                </span>
              </>
            )}
          </div>

          {/* Confirm password */}
          <div className="auth-field">
            <label htmlFor="signup-confirm">Confirm Password</label>
            <div className="auth-input-wrapper">
              <LockIcon />
              <input
                id="signup-confirm"
                type={showConfirm ? "text" : "password"}
                className={`auth-input ${errors.confirmPassword ? "input-error" : ""}`}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            id="signup-submit"
            type="submit"
            className="auth-submit"
            disabled={isLoading}
          >
            {isLoading && <span className="auth-spinner" />}
            {isLoading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account? <Link to={APP_ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
