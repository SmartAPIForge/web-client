import type { Model } from "@/islands/react/entities/Object/model/types";
import { useState, type FC } from "react";

import styles from "./index.module.scss";
import { toggleIsOpened } from "@/islands/react/entities/Object/lib/toggleIsOpened";
import Input from "@/islands/react/shared/ui/Input";
import { setName } from "@/islands/react/entities/Object/lib/setName";
import { Objects } from "@/islands/react/entities/Object/model/objects";
import Accordion from "@/islands/react/shared/ui/Accordion";
import { toggleIsFieldsOpened } from "@/islands/react/entities/Object/lib/toggleIsFieldsOpened";

interface Props {
  object: Model;
}

const ConfiguringObjectFields: FC<Props> = ({ object }) => {
  return (
    <Accordion
      isOpened={object.generatorConfiguration.isFieldsOpened}
      toggleIsOpened={() => toggleIsFieldsOpened(object)}
      children={{
        topMenu: <p>Fields</p>,
        body: (
          <>
            {object.apiConfiguration.fields.map(field => (
              <div key={field.id}>
                <p>Field</p>
              </div>
            ))}
          </>
        ),
      }}
    />
  );
};

const ConfiguringObject: FC<Props> = ({ object }) => {
  const [immediateObject, setImmediateObject] = useState(object);

  return (
    <Accordion
      isOpened={object.generatorConfiguration.isOpened}
      toggleIsOpened={() => toggleIsOpened(object)}
      children={{
        topMenu: (
          <>
            <Input
              value={immediateObject.apiConfiguration.name}
              onChange={(name) => {
                setImmediateObject((prevState) => ({ ...prevState, name }));
                setName(object, name);
              }}
            />
            <div
              className={[styles.rightIconsGroup, styles.marginLeft].join(" ")}
            >
              <img
                onClick={() => Objects.remove(object)}
                className={[styles.icon, styles.hide].join(" ")}
                src="/icons/cancel.svg"
                alt="delete"
              />
            </div>
          </>
        ),
        body: <ConfiguringObjectFields object={object} />,
      }}
    />
  );
};

export { ConfiguringObject };
