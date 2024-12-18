import { useSpawnModel } from "@/react/features/ModelManagement";
import styles from "./ToolBarWidget.module.scss";

const ToolBarWidget = () => {
  const { spawnModel } = useSpawnModel();

  return (
    <div className={styles.toolbar}>
      <div className={styles.iconBox} onClick={spawnModel}>
        <img className={styles.icon} src="/icons/square.svg" alt="Model" />
      </div>
    </div>
  );
}

export { ToolBarWidget };
