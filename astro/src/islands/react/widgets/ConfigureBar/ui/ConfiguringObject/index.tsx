import type { Model } from "@/islands/react/entities/Object/model/types";
import { useState, type FC } from "react";

import styles from "./index.module.scss";
import { toggleIsOpened } from "@/islands/react/entities/Object/lib/toggleIsOpened";
import Input from "@/islands/react/shared/ui/Input";
import { setName } from "@/islands/react/entities/Object/lib/setName";
import { Objects } from "@/islands/react/entities/Object/model/objects";
import Accordion from "@/islands/react/shared/ui/Accordion";
import { toggleIsFieldsOpened } from "@/islands/react/entities/Object/lib/toggleIsFieldsOpened";
import { ModelField } from "../Field";
import Placeholder from "@/islands/react/shared/ui/Placeholder";
import { createField } from "@/islands/react/entities/Object/lib/createField";
import { toggleIsEndpointsOpened } from "@/islands/react/entities/Object/lib/toggleIsEndpointsOpened";
import { ModelEndpoint } from "../Endpoint";
import { createEndpoint } from "@/islands/react/entities/Object/lib/createEndpoint";

interface Props {
  object: Model;
}

const ConfiguringObjectFields: FC<Props> = ({ object }) => {
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

const ConfiguringObjectEndpoints: FC<Props> = ({ object }) => {
  return (
    <Accordion
      isOpened={object.generatorConfiguration.isEndpointsOpened}
      toggleIsOpened={() => toggleIsEndpointsOpened(object)}
      children={{
        topMenu: (
          <div className={styles.menuContainer}>
            <p>Endpoints</p>
            <img
              onClick={() => createEndpoint(object)}
              className={[styles.icon, styles.hide].join(" ")}
              src="/icons/plus.svg"
              alt="add"
            />
          </div>
        ),
        body: (
          <Placeholder text="Press plus icon to add endpoints">
            {object.apiConfiguration.endpoints.map((endpoint) => (
              <ModelEndpoint key={endpoint.id} endpoint={endpoint} />
            ))}
          </Placeholder>
        ),
      }}
    />
  );
};

const ConfiguringObject: FC<Props> = ({ object }) => {
  const [immediateObject, setImmediateObject] = useState(object);

  return (
    <div className={styles.hideContainer}>
      <Accordion
        isOpened={object.generatorConfiguration.isOpened}
        toggleIsOpened={() => toggleIsOpened(object)}
        children={{
          topMenu: (
            <div className={styles.menuContainer}>
              <Input
                id={`${object.id}-model-name`}
                value={immediateObject.apiConfiguration.name}
                onChange={(name) => {
                  setImmediateObject((prevState) => ({
                    ...prevState,
                    apiConfiguration: { ...prevState.apiConfiguration, name },
                  }));
                  setName(object, name);
                }}
              />
              <div
                className={[styles.rightIconsGroup, styles.marginLeft].join(
                  " ",
                )}
              >
                <img
                  onClick={() => Objects.remove(object)}
                  className={[styles.icon, styles.hide].join(" ")}
                  src="/icons/cancel.svg"
                  alt="delete"
                />
              </div>
            </div>
          ),
          body: (
            <>
              <ConfiguringObjectFields object={object} />
              <ConfiguringObjectEndpoints object={object} />
            </>
          ),
        }}
      />
    </div>
  );
};

export { ConfiguringObject };
