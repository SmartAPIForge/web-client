import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  style = {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : () => {}}
      disabled={disabled}
      className={className}
      style={{
        padding: "10px 20px",
        backgroundColor: disabled
          ? "rgba(128, 128, 128, 0.2)"
          : "rgba(255, 255, 255, 0.2)",
        color: "black",
        border: "1px solid rgba(128, 128, 128, 0.2)",
        borderRadius: 25,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
