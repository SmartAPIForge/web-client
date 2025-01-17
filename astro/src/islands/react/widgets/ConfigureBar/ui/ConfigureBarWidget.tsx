import { useStore } from "@nanostores/react";

import styles from "./ConfigureBarWidget.module.scss";
import Placeholder from "@/islands/react/shared/ui/Placeholder";
import { ConfiguringObject } from "./ConfiguringObject";
import { Objects } from "@/islands/react/entities/Object/model/objects";

const ConfigureBarWidget = () => {
  const $configuringObjects = useStore(Objects.store);

  return (
    <div className={styles.rightBarContainer}>
      <div className={styles.headerBox}>
        <h4>Configure Bar</h4>
      </div>
      <Placeholder
        text={
          <h5>
            Nothing to show <br />
            Select object(s) to configure
          </h5>
        }
      >
        {$configuringObjects.length > 0 && (
          <div className={styles.configuringObjectsBox}>
            {$configuringObjects.map((object) => (
              <ConfiguringObject key={object.id} object={object} />
            ))}
          </div>
        )}
      </Placeholder>
    </div>
  );
};

export { ConfigureBarWidget };
