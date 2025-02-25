import { useCallback } from "react";
import * as fabric from "fabric";
import { createModel } from "@/react/entities/Object/lib/createModel.ts";
import { darkenColor, getRandomSoftColor } from "@/react/shared/colorUtils.ts";
import {setName} from "@/react/entities/Object/lib/setName.ts";

let canvasInstance: fabric.Canvas;

export const useSpawnObject = (canvas?: fabric.Canvas | null) => {
  const spawnModel = useCallback(() => {
    if (!canvasInstance) return;

    const initialModelSize = 200;
    const fillColor = getRandomSoftColor();
    const strokeColor = darkenColor(fillColor, 10);

    const rect = new fabric.Rect({
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      rx: 10,
      ry: 10,
      width: initialModelSize,
      height: initialModelSize,
      noScaleCache: false,
    });

    // Center the text within the rectangle
    const text = new fabric.IText("", {
      fontFamily: "arial black",
      textAlign: "center",
      pathAlign: "center",
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      lockSkewingX: true,
      lockSkewingY: true,
      lockMovementX: true,
      lockMovementY: true,
    });

    const group = new fabric.Group([rect, text], {
      left: (canvasInstance.getWidth() - initialModelSize) / 2,
      top: (canvasInstance.getHeight() - initialModelSize) / 2,
      subTargetCheck: true,
      interactive: true,
      lockScalingX: true,
      lockScalingY: true,
      lockSkewingX: true,
      lockSkewingY: true,
      lockRotation: true,
    });

    const model = createModel(group);

    setName(model, model.apiConfiguration.name)

    rect.on("scaling", () => {
      rect.set({
        rx: rect.rx * (rect.scaleX === 1 ? rect.scaleY : rect.scaleX),
        ry: rect.ry * (rect.scaleY === 1 ? rect.scaleX : rect.scaleY),
        width: rect.width * rect.scaleX,
        height: rect.height * rect.scaleY,
        scaleX: 1,
        scaleY: 1,
      });
      text.set({
        left: rect.left + rect.width / 2 - text.width / 2,
        top: rect.top + rect.height / 2 - text.height / 2,
      })
    });

    rect.on("moving", () => {
      text.set({
        left: rect.left + rect.width / 2 - text.width / 2,
        top: rect.top + rect.height / 2 - text.height / 2,
      })
    })

    text.on("changed", (...args) => {
      setName(model, text.text)
    })

    text.on("editing:exited", () => {
      setName(model, text.text.replace(/\n/g, ""))
    })

    canvasInstance.add(group);
  }, []);

  if (canvas) {
    canvasInstance = canvas;
  }

  return { spawnModel };
};
