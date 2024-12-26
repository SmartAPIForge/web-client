import { Objects } from "../model/objects";
import type { Model } from "../model/types";
import lodash from "lodash";

export const setName = lodash.debounce(
  (objectIdentifier: Model, name: string) => {
    const updatedObjects = Objects.get().map((obj) => {
      if (obj.id === objectIdentifier.id) {
        return { ...obj, name };
      }
      return obj;
    });
    Objects.set(updatedObjects);
  },
  300,
);
