import type { FC } from "react";
import Accordion from "@/react/shared/ui/Accordion";
import { toggleIsEndpointsOpened } from "@/react/entities/Object/lib/toggleIsEndpointsOpened.ts";
import styles from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/index.module.scss";
import { createEndpoint } from "@/react/entities/Object/lib/createEndpoint.ts";
import Placeholder from "@/react/shared/ui/Placeholder";
import { ModelEndpoint } from "src/islands/react/widgets/ConfigureBar/ui/ConfiguringObject/Endpoints/Endpoint";
import type { Props } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/types.ts";

export const ConfiguringObjectEndpoints: FC<Props> = ({ object }) => {
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
              <ModelEndpoint
                key={endpoint.id}
                fields={object.apiConfiguration.fields}
                endpoint={endpoint}
              />
            ))}
          </Placeholder>
        ),
      }}
    />
  );
};
