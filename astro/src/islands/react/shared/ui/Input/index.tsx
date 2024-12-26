import type { FC, InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

const Input: FC<Props> = ({ className, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      onChange={(e) => onChange(e.target.value)}
      className={[styles.input, className].join(" ")}
    />
  );
};

export default Input;
