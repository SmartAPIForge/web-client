import { useState, type FC } from "react";
import {
  FieldTypeOptions,
  type Field,
  type FieldType,
} from "@/islands/react/entities/Object/model/types";
import Input from "@/islands/react/shared/ui/Input";
import Select from "@/islands/react/shared/ui/Select";

import styles from "./index.module.scss";
import { setFieldName } from "@/islands/react/entities/Object/lib/setFieldName";
import { setFieldType } from "@/islands/react/entities/Object/lib/setFieldType";
import { removeField } from "@/islands/react/entities/Object/lib/removeField";

interface Props {
  field: Field;
}

const ModelField: FC<Props> = ({ field }) => {
  const [name, setName] = useState(field.name);
  const [selectedOption, setSelectedOption] = useState(field.type);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FieldType;
    setSelectedOption(value);
    setFieldType(field, value);
  };

  const handleInputChange = (value: string) => {
    setName(value);
    setFieldName(field, value);
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <Input
          id={field.id}
          name={"Name"}
          value={name}
          onChange={handleInputChange}
        />
        <Select
          id={field.id}
          options={FieldTypeOptions}
          value={selectedOption}
          onChange={handleSelectChange}
          name={"Type"}
        />
      </div>
      <img
        onClick={() => removeField(field)}
        className={[styles.icon, styles.hide].join(" ")}
        src="/icons/cancel.svg"
        alt="delete"
      />
    </div>
  );
};

export { ModelField };
