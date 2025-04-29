import { useState, type FC } from "react";
import {
  FieldTypeOptions,
  type Field,
  type FieldType,
} from "@/react/entities/Object/model/types.ts";
import Input from "@/react/shared/ui/Input";
import Select from "@/react/shared/ui/Select";

import styles from "./index.module.scss";
import { setFieldName } from "@/react/entities/Object/lib/setFieldName.ts";
import { setFieldType } from "@/react/entities/Object/lib/setFieldType.ts";
import { removeField } from "@/react/entities/Object/lib/removeField.ts";

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
          options={Object.keys(FieldTypeOptions).map((type) => ({
            value: type,
            label: FieldTypeOptions[type as FieldType],
          }))}
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
