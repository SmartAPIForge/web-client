import { map } from "nanostores";
import type { Field, Model } from "./types";

const objectsStore = map<Model[]>([]);

function set(newObjects: Model[]) {
  objectsStore.set(newObjects);
}

function add(model: Model) {
  objectsStore.set([...objectsStore.get(), model]);
}

function remove(model: Model) {
  const instance = model.generatorConfiguration.instance;
  if (instance) instance.canvas?.remove(instance);
  objectsStore.set(objectsStore.get().filter((m) => m !== model));
}

function get(): Model[] {
  return objectsStore.get();
}

function clear() {
  objectsStore.set([]);
}

export const Objects = {
  store: objectsStore,
  set,
  get,
  add,
  remove,
  clear,
};
