import { useCallback, useEffect } from "react";
import * as fabric from "fabric";
import { Objects } from "@/react/entities/Object/model/objects.ts";

export const useDeleteObject = (canvas: fabric.Canvas | null) => {
  const deleteModel = useCallback(() => {
    if (!canvas) return;

    const storedObjects = Objects.get();

    canvas.getActiveObjects().forEach((obj) => {
      const object = storedObjects.find(
        (object) => object.generatorConfiguration.instance === obj,
      );
      if (object) {
        Objects.remove(object);
      }
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, [canvas]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!canvas) return;

    if (event.key === "Backspace" || event.key === "Delete") {
      deleteModel();
    }
  };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [canvas]);

  return { deleteModel };
};
