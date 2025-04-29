import styles from "./PagesWidget.module.scss";
import * as m from "@/paraglide/messages";
import Input from "@/react/shared/ui/Input";
import { Project } from "@/react/entities/Object/project/name.ts";
import { useStore } from "@nanostores/react";

const PagesWidget = () => {
  const $projectName = useStore(Project.name.store);

  return (
    <div className={styles.bottomRightBarContainer}>
      <div className="block">
        <a href="/">
          <p>{m.metaTitle()}</p>
        </a>
      </div>
      <div className="block">
        <Input
          id="project-name"
          value={$projectName}
          onChange={Project.name.set}
          placeholder={m.metaTitle()}
          className={styles.largeInput}
        />
      </div>
    </div>
  );
};

export { PagesWidget };
