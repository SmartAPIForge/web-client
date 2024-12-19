import { useEffect } from "react";
import * as fabric from "fabric";
import { Objects } from "@/islands/react/entities/Object/model/objects";

export const useDeleteObject = (canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        const storedObjects = Objects.get();

        canvas.getActiveObjects().forEach((obj) => {
          const object = storedObjects.find(
            (object) => object.instance === obj,
          );
          if (object) {
            Objects.remove(object);
          }
          canvas.remove(obj);
        });
        canvas.requestRenderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);
};
