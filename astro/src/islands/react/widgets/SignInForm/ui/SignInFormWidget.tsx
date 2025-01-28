import { type FC, useState } from "react";
import Button from "@/react/shared/ui/Button";
import styles from "./SignInFormWidget.module.scss";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AuthError, authService} from "@/services/auth.ts";

// Define the form input interface
interface IFormInput {
  email: string;
  password: string;
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

export const SignInFormWidget: FC = () => {
  const [error, setError] = useState<string | null>(null);

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
      await authService.login(credentials);
      window.location.href = "/profile";
    } catch (e) {
      if (e instanceof AuthError) {
        setError(e.message);
      }
      console.error(e);
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
