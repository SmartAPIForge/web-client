import { CONSTS } from "@/consts";
import {
  offsetStore,
  zoomStore,
  type Zoom,
} from "@/islands/react/entities/Canvas/model";
import { useStore } from "@nanostores/react";
import { Line, type Canvas } from "fabric";
import { useEffect } from "react";

const { STROKE, STROKE_WIDTH } = CONSTS.CANVAS.GRID.LINE;

const lineStyles = {
  stroke: STROKE,
  selectable: false,
  evented: false,
  strokeWidth: STROKE_WIDTH,
};

const configureLineStyles = (zoom: Zoom) => ({
  ...lineStyles,
  strokeWidth: lineStyles.strokeWidth / zoom,
});

const clearGrid = (canvas: Canvas, lines: Line[]) => {
  lines.forEach((line) => canvas.remove(line));
};

const drawGrid = (canvas: Canvas, zoom: Zoom): Line[] => {
  const gridSize = CONSTS.CANVAS.GRID.GAP / 2 ** Math.ceil(Math.log2(zoom));
  const lines = [];

  const boundaries = canvas.calcViewportBoundaries();

  // Calculate the starting points based on the offset.
  const startX = Math.floor(boundaries.tl.x / gridSize) * gridSize;
  const startY = Math.floor(boundaries.tl.y / gridSize) * gridSize;

  // Vertical lines.
  for (let i = startX; i <= boundaries.br.x; i += gridSize) {
    const line = new Line(
      [i, boundaries.tl.y, i, boundaries.br.y],
      configureLineStyles(zoom),
    );
    lines.push(line);
  }

  // Horizontal lines.
  for (let i = startY; i <= boundaries.br.y; i += gridSize) {
    const line = new Line(
      [boundaries.tl.x, i, boundaries.br.x, i],
      configureLineStyles(zoom),
    );
    lines.push(line);
  }

  canvas.insertAt(0, ...lines);

  return lines;
};

export const useCanvasBackground = (canvas: Canvas | null) => {
  const $zoomStore = useStore(zoomStore);
  const $offsetStore = useStore(offsetStore);

  useEffect(() => {
    if (!canvas) return;

    const lines = drawGrid(canvas, $zoomStore);
    return () => clearGrid(canvas, lines);
  }, [canvas, $zoomStore, $offsetStore]);
};
