import { useState, type FC } from "react";
import { type Endpoint } from "@/islands/react/entities/Object/model/types";

import styles from "./index.module.scss";

interface Props {
  endpoint: Endpoint;
}

const ModelEndpoint: FC<Props> = ({ endpoint }) => {
  return <div className={styles.container}></div>;
};

export { ModelEndpoint };
