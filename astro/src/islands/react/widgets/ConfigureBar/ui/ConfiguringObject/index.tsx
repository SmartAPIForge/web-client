import { useState, type FC } from "react";

import styles from "./index.module.scss";
import { toggleIsOpened } from "@/islands/react/entities/Object/lib/toggleIsOpened";
import Input from "@/islands/react/shared/ui/Input";
import { setName } from "@/islands/react/entities/Object/lib/setName";
import { Objects } from "@/islands/react/entities/Object/model/objects";
import Accordion from "@/islands/react/shared/ui/Accordion";
import type { Props } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/types.ts";
import { ConfiguringObjectEndpoints } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/Endpoints";
import { ConfiguringObjectFields } from "@/react/widgets/ConfigureBar/ui/ConfiguringObject/Fields";

const ConfiguringObject: FC<Props> = ({ object }) => {
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
                value={object.apiConfiguration.name}
                onChange={(name) => {
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
