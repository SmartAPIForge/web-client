import * as fabric from "fabric";
import { useSpawnModel } from "./useSpawnModel";
import { useDeleteModel } from "./useDeleteModel";

export const useModelManagement = (canvas: fabric.Canvas | null) => {
  useSpawnModel(canvas);
  useDeleteModel(canvas);
};
