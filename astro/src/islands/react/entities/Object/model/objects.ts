import { map } from "nanostores";
import type { Model } from "./types";

const objectsStore = map<Model[]>([]);

function set(newObjects: Model[]) {
  objectsStore.set(newObjects);
}

function add(model: Model) {
  objectsStore.set([...objectsStore.get(), model]);
}

function remove(model: Model) {
  objectsStore.set(objectsStore.get().filter(m => m !== model));
}

function get(): Model[] {
  return objectsStore.get();
}

export const Objects = {
  set,
  get,
  add,
  remove,
};
