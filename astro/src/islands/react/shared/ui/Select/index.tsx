import type { FC } from "react";

import styles from "./index.module.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
}

const Select: FC<SelectProps> = ({ id, options, value, onChange, name }) => {
  const configuringId = `${id}-${name}`;

  return (
    <div className={styles.selectContainer}>
      {name && <label htmlFor={configuringId}>{name}</label>}
      <select id={configuringId} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
