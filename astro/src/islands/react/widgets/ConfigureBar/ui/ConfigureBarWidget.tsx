import { useStore } from "@nanostores/react";

import styles from "./ConfigureBarWidget.module.scss";
import { configuringObjects } from "@/react/entities/Object/model/configuringObjects";

const ConfigureBarWidget = () => {
  const $configuringObjects = useStore(configuringObjects);

  return (
    <div className={styles.rightBarContainer}>
      <h4>Configure Bar</h4>
      <p>Selected</p>
      {$configuringObjects.map(object => <div key={object.id}>
        <h5>Name: {object.name}</h5>
        <h5>Unique id: {object.id}</h5>
      </div>)}
    </div>
  );
};

export { ConfigureBarWidget };
