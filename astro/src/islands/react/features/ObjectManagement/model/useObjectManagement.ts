import * as fabric from "fabric";
import { useSpawnObject } from "./useSpawnObject";
import { useDeleteObject } from "./useDeleteObject";

export const useObjectManagement = (canvas: fabric.Canvas | null) => {
  useSpawnObject(canvas);
  useDeleteObject(canvas);
};
