import type { FC, InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
}

const Input: FC<Props> = ({ className, onChange, ...rest }) => {
  const configuringId = `${rest.id}-${rest.name}`;

  return (
    <div>
      {rest.name && <label htmlFor={configuringId}>{rest.name}</label>}
      <input
        {...rest}
        id={configuringId}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={[styles.input, className].join(" ")}
      />
    </div>
  );
};

export default Input;
