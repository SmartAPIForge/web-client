import { type FC, useState } from "react";
import Button from "@/react/shared/ui/Button";
import styles from "./SignInFormWidget.module.scss";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CONSTS } from "@/consts.ts";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";

// Define the form input interface
interface IFormInput {
  email: string;
  password: string;
}

interface SignInFormWidgetProps {
  redirectUrl?: string;
}

// Create a Yup validation schema
const validationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .min(4, "Email must be at least 4 characters")
      .max(80, "Email must be at most 80 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(200, "Password must be at most 200 characters"),
  })
  .required();

export const SignInFormWidget: FC<SignInFormWidgetProps> = ({
  redirectUrl = CONSTS.DEFAULT_REDIRECT,
}) => {
  const { signIn, error } = useAuth();

  // Initialize the form with yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (credentials) => {
    try {
      console.log("Starting sign-in process");

      // Check if localStorage is available
      try {
        const testKey = "_test_localStorage_";
        localStorage.setItem(testKey, "test");
        if (localStorage.getItem(testKey) !== "test") {
          console.error(
            "localStorage test failed - storage not working properly",
          );
        } else {
          localStorage.removeItem(testKey);
          console.log("localStorage is available and working");
        }
      } catch (storageError) {
        console.error("localStorage is not available:", storageError);
      }

      try {
        const result = await signIn(credentials.email, credentials.password);
        console.log("Sign-in successful, received data:", result);
        console.log("Tokens in localStorage:", {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        });

        // Add slight delay before redirect to ensure localStorage operations complete
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      } catch (signInError) {
        console.error(
          "Normal sign-in failed, trying direct API call:",
          signInError,
        );

        // Fallback - try direct API call for debugging
        try {
          const response = await fetch(`${CONSTS.API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          console.log("Direct API call successful:", data);

          // Store tokens manually
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          console.log("Tokens stored manually, redirecting...");
          window.location.href = redirectUrl;
        } catch (directApiError) {
          console.error("Direct API call failed:", directApiError);
          throw directApiError;
        }
      }
    } catch (e) {
      console.error("Sign-in failed with error:", e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h4>Sign In</h4>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Email Field */}
      <div className={styles.block}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className={styles.block}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={errors.password ? styles.errorInput : ""}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit">Sign In</Button>
      <p>
        Don't have an account? <a href="/sign-up">Sign up</a>
      </p>
    </form>
  );
};
