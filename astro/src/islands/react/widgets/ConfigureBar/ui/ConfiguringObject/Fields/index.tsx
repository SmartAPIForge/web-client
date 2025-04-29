import type { FC } from "react";
import type { Props } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/types.ts";
import Accordion from "@/react/shared/ui/Accordion";
import { toggleIsFieldsOpened } from "@/react/entities/Object/lib/toggleIsFieldsOpened.ts";
import styles from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/index.module.scss";
import { createField } from "@/react/entities/Object/lib/createField.ts";
import Placeholder from "@/react/shared/ui/Placeholder";
import { ModelField } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/Fields/Field";

export const ConfiguringObjectFields: FC<Props> = ({ object }) => {
  return (
    <Accordion
      isOpened={object.generatorConfiguration.isFieldsOpened}
      toggleIsOpened={() => toggleIsFieldsOpened(object)}
      children={{
        topMenu: (
          <div className={styles.menuContainer}>
            <p>Fields</p>
            <img
              onClick={() => createField(object)}
              className={[styles.icon, styles.hide].join(" ")}
              src="/icons/plus.svg"
              alt="add"
            />
          </div>
        ),
        body: (
          <Placeholder text="Press plus icon to add field">
            {object.apiConfiguration.fields.map((field) => (
              <ModelField key={field.id} field={field} />
            ))}
          </Placeholder>
        ),
      }}
    />
  );
};
