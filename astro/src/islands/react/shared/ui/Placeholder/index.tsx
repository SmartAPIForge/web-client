import type { FC, HTMLAttributes } from "react";
import styles from "./index.module.scss";

const Placeholder: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={[rest.className, styles.placeholderBox].join(" ")}
    >
      {children}
    </div>
  );
};

export default Placeholder;
