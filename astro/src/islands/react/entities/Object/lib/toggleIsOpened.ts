import { Objects } from "../model/objects";
import type { Model } from "../model/types";

export const toggleIsOpened = (toggleoObject: Model) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === toggleoObject.id) {
      return { ...obj, isOpened: !obj.isOpened };
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
