import type { Model } from "@/islands/react/entities/Object/model/types";
import { useState, type FC } from "react";

import styles from "./index.module.scss";
import { toggleIsOpened } from "@/islands/react/entities/Object/lib/toggleIsOpened";
import Input from "@/islands/react/shared/ui/Input";
import { setName } from "@/islands/react/entities/Object/lib/setName";
import { Objects } from "@/islands/react/entities/Object/model/objects";

interface Props {
  object: Model;
}

const ConfiguringObject: FC<Props> = ({ object }) => {
  const [immediateObject, setImmediateObject] = useState(object);

  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.leftIconsGroup}>
          <img
            onClick={() => toggleIsOpened(object)}
            className={[
              styles.icon,
              object.isOpened && styles.iconSelected,
            ].join(" ")}
            src="/icons/right-arrow.svg"
            alt="arrow"
          />
        </div>
        <Input
          value={immediateObject.name}
          onChange={(name) => {
            setImmediateObject((prevState) => ({ ...prevState, name }));
            setName(object, name);
          }}
        />
        <div className={styles.rightIconsGroup}>
          <img
            onClick={() => Objects.remove(object)}
            className={[styles.icon, styles.hide].join(" ")}
            src="/icons/cancel.svg"
            alt="delete"
          />
        </div>
      </div>
    </div>
  );
};

export { ConfiguringObject };
