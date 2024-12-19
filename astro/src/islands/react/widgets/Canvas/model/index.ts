import { useEffect, useState } from "react";
import * as fabric from "fabric";
import { useCanvasInteraction } from "@/react/features/CanvasInteraction";
import { useObjectManagement } from "@/react/features/ObjectManagement";

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useCanvasInteraction(canvas);
  useObjectManagement(canvas);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    setCanvas(canvas);

    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);
};
