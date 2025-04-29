import { useCallback, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { setOffset, debouncedSetZoom } from "@/react/entities/Canvas/model";
import { CONSTS } from "@/consts.ts";

export const useCanvasInteraction = (canvas: fabric.Canvas | null) => {
  const isPanningRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    ({ e, viewportPoint }: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!e.altKey) return;
      isPanningRef.current = true;
      lastPosRef.current = viewportPoint;
      e.stopPropagation();
    },
    [],
  );

  const onMouseMove = useCallback(
    ({ viewportPoint }: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!isPanningRef.current || !canvas) return;
      const vpt = canvas.viewportTransform;
      const dx = viewportPoint.x - lastPosRef.current.x;
      const dy = viewportPoint.y - lastPosRef.current.y;
      vpt[4] += dx;
      vpt[5] += dy;
      lastPosRef.current = viewportPoint;
      setOffset(vpt[4], vpt[5]);
    },
    [canvas],
  );

  const onMouseUp = useCallback(() => {
    isPanningRef.current = false;
  }, []);

  const onMouseWheel = useCallback(
    ({ e }: fabric.TPointerEventInfo<WheelEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      let zoom = canvas!.getZoom();
      zoom *= CONSTS.ZOOM.COEFFICIENT ** delta;
      zoom = Math.min(Math.max(zoom, CONSTS.ZOOM.MIN), CONSTS.ZOOM.MAX);
      canvas!.zoomToPoint(
        new fabric.Point({ x: e.offsetX, y: e.offsetY }),
        zoom,
      );
      debouncedSetZoom(zoom);
    },
    [canvas],
  );

  useEffect(() => {
    if (!canvas) return;

    canvas.on("mouse:down", onMouseDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", onMouseUp);
    canvas.on("mouse:wheel", onMouseWheel);

    return () => {
      canvas.off("mouse:down", onMouseDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", onMouseUp);
      canvas.off("mouse:wheel", onMouseWheel);
    };
  }, [canvas, onMouseDown, onMouseMove, onMouseUp, onMouseWheel]);
};
