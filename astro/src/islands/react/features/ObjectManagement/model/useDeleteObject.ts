import { useEffect } from "react";
import * as fabric from "fabric";

export const useDeleteObject = (canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        canvas.getActiveObjects().forEach((obj) => {
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
