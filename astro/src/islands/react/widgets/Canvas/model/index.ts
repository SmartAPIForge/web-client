import React, { useCallback, useEffect, useState } from "react";
import * as fabric from "fabric";
import { useCanvasInteraction } from "src/islands/react/widgets/Canvas/model/CanvasInteraction";
import { useObjectManagement } from "src/islands/react/widgets/Canvas/model/ObjectManagement";
import { useCanvasBackground } from "src/islands/react/widgets/Canvas/model/CanvasBackground";
import { CONSTS } from "@/consts";
import { setSize } from "@/react/entities/Canvas/model/size.ts";
import { useDrawCurvedLine } from "@/react/widgets/Canvas/model/ObjectManagement/model/useDrawCurvedLine.ts";

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useCanvasInteraction(canvas);
  useCanvasBackground(canvas);
  useObjectManagement(canvas);

  const { drawCurvedLine } = useDrawCurvedLine(canvas);

  // drawCurvedLine();

  useEffect(() => {
    if (canvasRef.current === null) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });
    setCanvas(canvas);

    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    canvas.setZoom(CONSTS.ZOOM.DEFAULT);

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setSize(canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      void canvas.dispose();
    };
  }, [canvasRef]);
};
