import type { FC, HTMLAttributes } from "react";
import styles from "./index.module.scss";
import type React from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: React.ReactNode;
}

const Placeholder: FC<Props> = ({
  text,
  children,
  ...rest
}) => {
  if (children) return children;
  
  return (
    <div
      {...rest}
      className={[rest.className, styles.placeholderBox].join(" ")}
    >
      {text}
    </div>
  );
};

export default Placeholder;
