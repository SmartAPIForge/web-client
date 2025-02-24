import { useEffect, useState } from "react";
import * as fabric from "fabric";
import { useCanvasInteraction } from "src/islands/react/widgets/Canvas/model/CanvasInteraction";
import { useObjectManagement } from "src/islands/react/widgets/Canvas/model/ObjectManagement";
import { useCanvasBackground } from "src/islands/react/widgets/Canvas/model/CanvasBackground";
import { CONSTS } from "@/consts";

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useCanvasInteraction(canvas);
  useCanvasBackground(canvas);
  useObjectManagement(canvas);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const canvas = new fabric.Canvas(canvasRef.current);
    setCanvas(canvas);

    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    canvas.setZoom(CONSTS.ZOOM.DEFAULT);

    return () => {
      void canvas.dispose();
    };
  }, [canvasRef]);
};
