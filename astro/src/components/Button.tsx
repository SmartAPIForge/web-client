import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        backgroundColor: disabled ? "rgba(128, 128, 128, 0.2)" : "rgba(255, 255, 255, 0.2)",
        color: "black",
        border: "none",
        borderRadius: 25,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
