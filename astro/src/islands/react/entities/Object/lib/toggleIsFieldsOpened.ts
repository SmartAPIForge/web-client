import { Objects } from "../model/objects";
import type { Model } from "../model/types";

export const toggleIsFieldsOpened = (toggleObject: Model) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === toggleObject.id) {
      const newObject = { ...obj };
      newObject.generatorConfiguration.isFieldsOpened =
        !newObject.generatorConfiguration.isFieldsOpened;
      return newObject;
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
