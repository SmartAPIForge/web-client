import { type FC } from "react";
import Button from "@/react/shared/ui/Button";
import styles from "./SignUpFormWidget.module.scss";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";

// Define the form input interface
interface IFormInput {
  email: string;
  password: string;
  confirmedPassword: string;
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
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password")
      .min(8, "Confirming password must be at least 8 characters")
      .max(200, "Confirming password must be at most 200 characters"),
  })
  .required();

export const SignUpFormWidget: FC = () => {
  const { signUp, error } = useAuth();

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
      await signUp(credentials.email, credentials.password);
      window.location.href = "/sign-in";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h4>Sign Up</h4>

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

      {/* Confirm Password Field */}
      <div className={styles.block}>
        <label htmlFor="confirmedPassword">Confirm Password</label>
        <input
          id="confirmedPassword"
          type="password"
          {...register("confirmedPassword")}
          className={errors.confirmedPassword ? styles.errorInput : ""}
        />
        {errors.confirmedPassword && (
          <p className={styles.errorMessage}>
            {errors.confirmedPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit">Sign Up</Button>
    </form>
  );
};
