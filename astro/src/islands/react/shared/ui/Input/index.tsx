import type { FC, InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
}

const Input: FC<Props> = ({ className, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={[styles.input, className].join(" ")}
    />
  );
};

export default Input;
