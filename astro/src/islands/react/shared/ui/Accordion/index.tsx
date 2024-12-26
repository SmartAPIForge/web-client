import type { FC, ReactNode } from "react";

import styles from "./index.module.scss";

interface Props {
  isOpened: boolean;
  toggleIsOpened: () => void;
  children: {
    topMenu: ReactNode;
    body: ReactNode;
  };
}

const Accordion: FC<Props> = ({ isOpened, toggleIsOpened, children }) => {
  return (
    <div>
      <div className={styles.topContainer}>
        <img
          onClick={() => toggleIsOpened()}
          className={[styles.icon, isOpened && styles.iconSelected].join(" ")}
          width={28}
          height={28}
          src="/icons/right-arrow.svg"
          alt="arrow"
        />
        {children.topMenu}
      </div>
      {isOpened && (
        <div className={[styles.bottomContainer, styles.marginLeft].join(" ")}>
          {children.body}
        </div>
      )}
    </div>
  );
};

export default Accordion;
