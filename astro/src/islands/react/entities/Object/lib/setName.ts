import { Objects } from "../model/objects";
import type { Model } from "../model/types";
import lodash from "lodash";

export const setName = (objectIdentifier: Model, name: string) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === objectIdentifier.id) {
      return { ...obj, name };
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
