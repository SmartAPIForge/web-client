import { map } from "nanostores";
import type { Model } from "./types";

export const selectedObjects = map<Model[]>([]);
const cachedObjects = map({});

export const setSelectedObjects = (objects: Model[]) => {
  selectedObjects.set(objects);
};

export const addSelectedObject = (object: Model) => {
  selectedObjects.set([...selectedObjects.get(), object]);
};
