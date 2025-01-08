import { Objects } from "../model/objects";
import { v4 as uuidV4 } from "uuid";
import type { Model } from "../model/types";

export const createEndpoint = (objectIdentifier: Model) => {
  Objects.set(
    Objects.get().map((object) => {
      if (object.id === objectIdentifier.id) {
        const newObject = { ...object };
        newObject.generatorConfiguration.isEndpointsOpened = true;
        newObject.apiConfiguration.endpoints.push({
          id: uuidV4(),
          type: "GET",
          private: false,
        });
        return newObject;
      }
      return object;
    }),
  );
};
