import { useCallback } from "react";
import * as fabric from "fabric";

interface Point {
  x: number;
  y: number;
}

interface DraggableCircle extends fabric.Circle {
  pointIndex?: number;
}

/**
 * Computes the next parameter value in the Catmull–Rom chain.
 * Using centripetal parameterization with alpha = 0.5 to avoid cusps.
 */
function getT(t: number, p0: Point, p1: Point, alpha: number = 0.5): number {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return t + Math.pow(Math.sqrt(dx * dx + dy * dy), alpha);
}

/**
 * Given an array of points, returns an SVG path string that uses cubic Bézier curves.
 * The conversion here is based on the centripetal Catmull–Rom spline and ensures
 * that both the direction and chord length update dynamically as you move the points.
 * @param points Array of points {x, y}
 * @returns An SVG path string.
 */
function getSmoothPath(points: Point[]): string {
  if (!points || points.length === 0) return "";

  // Start the path at the first point.
  let d = `M ${points[0].x} ${points[0].y} `;

  // Loop over the points creating a cubic Bezier segment between each p₁ and p₂.
  // For endpoint cases, reuse the first or last point.
  for (let i = 0; i < points.length - 1; i++) {
    const p0: Point = i === 0 ? points[i] : points[i - 1];
    const p1: Point = points[i];
    const p2: Point = points[i + 1];
    const p3: Point = i + 2 < points.length ? points[i + 2] : p2;

    // Compute parameter values for centripetal Catmull–Rom.
    const t0 = 0;
    const t1 = getT(t0, p0, p1);
    const t2 = getT(t1, p1, p2);
    const t3 = getT(t2, p2, p3);

    // Avoid division by zero (if any two points are identical).
    const t2t0 = t2 - t0 || 1;
    const t3t1 = t3 - t1 || 1;
    const t21 = t2 - t1;

    // Calculate control points.
    const cp1x = p1.x + ((p2.x - p0.x) * t21) / t2t0 / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * t21) / t2t0 / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * t21) / t3t1 / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * t21) / t3t1 / 3;

    // Append the cubic Bezier command.
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }

  return d;
}

let canvasInstance: fabric.Canvas;

export const useDrawCurvedLine = (canvas?: fabric.Canvas | null) => {
  const drawCurvedLine = useCallback(() => {
    if (!canvasInstance) return;

    const points: Point[] = [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 200, y: 100 },
      { x: 850, y: 550 },
      { x: 900, y: 400 },
    ];

    let pathString = getSmoothPath(points);
    const curvedPath = new fabric.Path(pathString, {
      stroke: "red",
      fill: "",
      strokeWidth: 2,
      selectable: false,
      objectCaching: false,
    });
    canvasInstance.add(curvedPath);

    points.forEach((pt, index) => {
      const circle: DraggableCircle = new fabric.Circle({
        left: pt.x,
        top: pt.y,
        radius: 5,
        fill: "blue",
        hasControls: false,
        originX: "center",
        originY: "center",
        hasBorders: false,
      });
      circle.pointIndex = index;
      canvasInstance.add(circle);

      circle.on("moving", () => {
        if (circle.pointIndex !== undefined) {
          points[circle.pointIndex].x = circle.left!;
          points[circle.pointIndex].y = circle.top!;
        }

        const newPathStr = getSmoothPath(points);
        curvedPath.set({ path: fabric.util.parsePath(newPathStr) });

        // Manually update the bounding box
        curvedPath.setCoords();
        curvedPath.calcACoords();

        canvasInstance.requestRenderAll();
      });
    });

    // Optionally, let the user drag the entire curve
    curvedPath.on("moving", (evt) => {
      const movementX = evt.pointer.x;
      const movementY = evt.pointer.y;

      // Move each circle by the same delta
      canvasInstance.getObjects("circle").forEach((obj) => {
        const c = obj as DraggableCircle;
        c.left! += movementX;
        c.top! += movementY;
        c.setCoords();
        if (c.pointIndex !== undefined) {
          points[c.pointIndex].x = c.left!;
          points[c.pointIndex].y = c.top!;
        }
      });

      curvedPath.setCoords();
      canvasInstance.requestRenderAll();
    });
  }, []);

  if (canvas) {
    canvasInstance = canvas;
  }

  return { drawCurvedLine };
};
