import { useEffect } from "react";
import * as fabric from "fabric";
import { Objects } from "@/islands/react/entities/Object/model/objects";

type OnSelect = (value: { selected: fabric.FabricObject[] }) => void;

export const useCanvasInteraction = (canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (!canvas) return;

    let isPanning = false;
    let lastPos = { x: 0, y: 0 };

    const onMouseDown = ({
      e: event,
      viewportPoint,
    }: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!event.altKey) return;
      isPanning = true;
      lastPos = viewportPoint;
      event.stopPropagation();
    };

    const onMouseMove = ({
      viewportPoint,
    }: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!isPanning) return;
      const vpt = canvas.viewportTransform;
      vpt[4] += viewportPoint.x - lastPos.x;
      vpt[5] += viewportPoint.y - lastPos.y;
      canvas.requestRenderAll();
      lastPos = viewportPoint;
    };

    const onMouseUp = () => {
      isPanning = false;
    };

    const onMouseWheel = ({ e }: fabric.TPointerEventInfo<WheelEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;

      zoom = Math.min(Math.max(zoom, 0.01), 20);
      canvas.zoomToPoint(
        new fabric.Point({ x: e.offsetX, y: e.offsetY }),
        zoom,
      );
    };

    const onSelection: OnSelect = ({ selected }) => {
      if (selected.length === 0) return;
      const updatedSelection = Objects.get().map((object) => {
        return {
          ...object,
          isSelected: selected.includes(object.instance),
        };
      })
      Objects.set(updatedSelection);
    };

    canvas.on("mouse:down", onMouseDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", onMouseUp);
    canvas.on("mouse:wheel", onMouseWheel);

    canvas.on("selection:created", onSelection);
    canvas.on("selection:updated", onSelection);

    return () => {
      canvas.off("mouse:down", onMouseDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", onMouseUp);
      canvas.off("mouse:wheel", onMouseWheel);

      canvas.off("selection:created", onSelection);
      canvas.off("selection:updated", onSelection);
    };
  }, [canvas]);
};
