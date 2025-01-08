import { Objects } from "../model/objects";
import type { Model } from "../model/types";

export const toggleIsEndpointsOpened = (toggleObject: Model) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === toggleObject.id) {
      const newObject = { ...obj };
      newObject.generatorConfiguration.isEndpointsOpened =
        !newObject.generatorConfiguration.isEndpointsOpened;
      return newObject;
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
