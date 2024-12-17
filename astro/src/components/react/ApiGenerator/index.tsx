import { useEffect, useRef, type FC } from "react";
import * as fabric from "fabric";

import styles from "./index.module.scss";

const ApiGenerator: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current || undefined);

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });

    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: "blue",
      radius: 20,
    });

    const triangle = new fabric.Triangle({
      left: 200,
      top: 200,
      fill: "green",
      width: 20,
      height: 30,
    });

    const text = new fabric.FabricText(
      `
        Use alt(option) + mouse to pan
        Use mouse wheel to zoom
      `,
      {
        left: 500,
        top: 300,
        fill: "black",
      },
    );

    const objects = [rect, circle, triangle, text];

    for (const object of objects) {
      canvas.add(object);
    }

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

  return (
    <div className={styles.canvasContainer}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default ApiGenerator;
