import { Objects } from "../model/objects";
import type { Model } from "../model/types";

export const toggleIsOpened = (toggledObject: Model) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === toggledObject.id) {
      const newObject = { ...obj };
      newObject.generatorConfiguration.isOpened =
        !newObject.generatorConfiguration.isOpened;
      return newObject;
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
