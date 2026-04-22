import * as yup from "yup";

/* ------------------------------------------------------------------ */
/*  Shared field rules                                                 */
/* ------------------------------------------------------------------ */

const emailField = yup
  .string()
  .required("Email is required")
  .email("Enter a valid email address");

const passwordField = yup
  .string()
  .required("Password is required")
  .min(8, "Minimum 8 characters")
  .max(32, "Maximum 32 characters")
  .matches(/[A-Z]/, "Must include an uppercase letter")
  .matches(/[a-z]/, "Must include a lowercase letter")
  .matches(/\d/, "Must include a number")
  .matches(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "Must include a special character",
  )
  .matches(/^\S+$/, "Spaces are not allowed");

/* ------------------------------------------------------------------ */
/*  Login schema                                                       */
/* ------------------------------------------------------------------ */

export const loginSchema = yup.object({
  email: emailField,
  password: yup.string().required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

/* ------------------------------------------------------------------ */
/*  Signup schema                                                      */
/* ------------------------------------------------------------------ */

export const signupSchema = yup.object({
  email: emailField,
  password: passwordField,
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type SignupFormValues = yup.InferType<typeof signupSchema>;
