import React from "react";
import styles from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={[
        rest.className,
        styles.button,
        rest.disabled && styles.disabled,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
