import * as fabric from "fabric";
import { useSpawnObject } from "./useSpawnObject.ts";
import { useDeleteObject } from "./useDeleteObject.ts";

export const useObjectManagement = (canvas: fabric.Canvas | null) => {
  useSpawnObject(canvas);
  useDeleteObject(canvas);
};
