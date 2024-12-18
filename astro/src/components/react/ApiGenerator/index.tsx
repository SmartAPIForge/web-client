import { useEffect, useRef, useState, type FC } from "react";
import * as fabric from "fabric";

import { ToolBar } from "./ToolBar";

import styles from "./index.module.scss";

const ApiGenerator: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current || undefined);
    setCanvas(canvas);

    let isPanning = false;
    let lastPos = { x: 0, y: 0 };

    canvas.on("mouse:down", ({ viewportPoint, e: event }) => {
      if (!event.altKey) return;

      isPanning = true;
      lastPos = viewportPoint;
      event.stopPropagation();
    });

    canvas.on("mouse:move", ({ viewportPoint }) => {
      if (!isPanning) return;
      const vpt = canvas.viewportTransform;
      vpt[4] += viewportPoint.x - lastPos.x;
      vpt[5] += viewportPoint.y - lastPos.y;
      canvas.requestRenderAll();
      lastPos = viewportPoint;
    });

    canvas.on("mouse:up", () => {
      isPanning = false;
    });

    canvas.on("mouse:wheel", ({ e: event }) => {
      const delta = event.deltaY;
      let zoom = canvas.getZoom();

      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint(new fabric.Point(event.offsetX, event.offsetY), zoom);

      event.preventDefault();
      event.stopPropagation();
    });

    const resizeCanvas = () =>
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const spawnModel = () => {
    if (canvas) {
      const initialModelSize = 200;

      const model = new fabric.Rect({
        left: (window.innerWidth - initialModelSize) / 2,
        top: (window.innerHeight - initialModelSize) / 2,
        fill: "black",
        width: initialModelSize,
        height: initialModelSize,
      });

      canvas.add(model);
    }
  };

  return (
    <div className={styles.canvasContainer}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <ToolBar spawnModel={spawnModel} />
    </div>
  );
};

export default ApiGenerator;
