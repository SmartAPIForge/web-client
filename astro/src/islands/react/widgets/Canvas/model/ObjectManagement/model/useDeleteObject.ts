import { useEffect } from "react";
import * as fabric from "fabric";
import { Objects } from "@/react/entities/Object/model/objects.ts";

export const useDeleteObject = (canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        const storedObjects = Objects.get();

        canvas.getActiveObjects().forEach((obj) => {
          const object = storedObjects.find(
            (object) => object.generatorConfiguration.instance === obj,
          );
          if (object) {
            Objects.remove(object);
          }
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);
};
