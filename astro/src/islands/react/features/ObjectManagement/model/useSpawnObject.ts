import { useCallback } from "react";
import * as fabric from "fabric";
import { createModel } from "@/islands/react/entities/Object/lib/createModel";

let canvasInstance: fabric.Canvas;

export const useSpawnObject = (canvas?: fabric.Canvas | null) => {
  const spawnModel = useCallback(() => {
    if (!canvasInstance) return;
    const initialModelSize = 200;

    const model = createModel({
      left: (canvasInstance.getWidth() - initialModelSize) / 2,
      top: (canvasInstance.getHeight() - initialModelSize) / 2,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "black",
      strokeWidth: 2,
      width: initialModelSize,
      height: initialModelSize,
    });

    canvasInstance.add(model);
  }, []);

  if (canvas) {
    canvasInstance = canvas;
  }

  return { spawnModel };
};
