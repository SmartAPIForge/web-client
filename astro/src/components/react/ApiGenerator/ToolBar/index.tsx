import type { FC } from "react";
import styles from "./index.module.scss";

interface Props {
  spawnModel: () => void;
}

const ToolBar: FC<Props> = ({ spawnModel }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.iconBox} onClick={spawnModel}>
        <img className={styles.icon} src="/icons/square.svg" alt="Model" />
      </div>
    </div>
  );
};

export { ToolBar };
