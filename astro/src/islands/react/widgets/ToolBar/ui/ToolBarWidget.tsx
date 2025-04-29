import { useSpawnObject } from "src/islands/react/widgets/Canvas/model/ObjectManagement";
import styles from "./ToolBarWidget.module.scss";

const ToolBarWidget = () => {
  const { spawnModel } = useSpawnObject();

  return (
    <div className={styles.toolbar}>
      <div className={styles.iconBox} onClick={spawnModel}>
        <img className={styles.icon} src="/icons/square.svg" alt="Model" />
      </div>
    </div>
  );
};

export { ToolBarWidget };
