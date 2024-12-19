import type { FabricObject } from "fabric";
import { map } from "nanostores";

export const selectedObjects = map<FabricObject[]>([]);

export const setSelectedObjects = (objects: FabricObject[]) => {
  selectedObjects.set(objects);
};
