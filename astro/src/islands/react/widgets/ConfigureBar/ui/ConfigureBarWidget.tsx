import { useStore } from "@nanostores/react";

import styles from "./ConfigureBarWidget.module.scss";
import { configuringObjects } from "@/react/entities/Object/model/configuringObjects";
import Placeholder from "@/islands/react/shared/ui/Placeholder";
import { ConfiguringObject } from "./ConfiguringObject";

const ConfigureBarWidget = () => {
  const $configuringObjects = useStore(configuringObjects);

  return (
    <div className={styles.rightBarContainer}>
      <div className={styles.headerBox}>
        <h4>Configure Bar</h4>
      </div>
      {$configuringObjects.length === 0 && (
        <Placeholder>
          <h5>
            Nothing to show <br />
            Select object(s) to configure
          </h5>
        </Placeholder>
      )}
      <div className={styles.configuringObjectsBox}>
        {$configuringObjects.map((object) => (
          <ConfiguringObject key={object.id} object={object} />
        ))}
      </div>
    </div>
  );
};

export { ConfigureBarWidget };
