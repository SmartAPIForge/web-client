import { selectedObjects } from "@/islands/react/entities/Object/model/selectedObjects";
import { useStore } from "@nanostores/react";

import styles from "./ConfigureBarWidget.module.scss";

const ConfigureBarWidget = () => {
  const $selectedObject = useStore(selectedObjects);

  console.log($selectedObject);

  return (
    <div className={styles.rightBarContainer}>
      <h4>Configure Bar</h4>
    </div>
  );
};

export { ConfigureBarWidget };
