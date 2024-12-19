import { useRef } from "react";
import { useCanvas } from "../model";
import styles from "./CanvasWidget.module.scss";

const CanvasWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export { CanvasWidget };
