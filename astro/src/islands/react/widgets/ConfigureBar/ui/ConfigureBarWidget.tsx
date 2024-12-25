import { useStore } from "@nanostores/react";

import styles from "./ConfigureBarWidget.module.scss";
import { configuringObjects } from "@/react/entities/Object/model/configuringObjects";

const ConfigureBarWidget = () => {
  const $configuringObjects = useStore(configuringObjects);

  return (
    <div className={styles.rightBarContainer}>
      <div className={styles.headerBox}>
        <h4>Configure Bar</h4>
      </div>
      {$configuringObjects.length === 0 && <div className={styles.selectedPlaceholder}>
        <h5>
          Nothing to show <br/>
          Select object(s) to configure
        </h5>
      </div>}
      <div className={styles.configuringObjectsBox}>
        {$configuringObjects.map((object) => (
          <details key={object.id} className={styles.configuringObjectBox}>
            <summary>{object.name}</summary>
            <div>
              <h5>Unique id: {object.id}</h5>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export { ConfigureBarWidget };
