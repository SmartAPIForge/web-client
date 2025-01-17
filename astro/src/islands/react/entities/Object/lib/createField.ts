import { Objects } from "../model/objects";
import { v4 as uuidV4 } from "uuid";
import type { Model } from "../model/types";

export const createField = (objectIdentifier: Model) => {
  Objects.set(
    Objects.get().map((object) => {
      if (object.id === objectIdentifier.id) {
        const newObject = { ...object };
        newObject.generatorConfiguration.isFieldsOpened = true;
        newObject.apiConfiguration.fields.push({
          id: uuidV4(),
          name: "Field",
          type: "string",
          isUnique: false,
        });
        return newObject;
      }
      return object;
    }),
  );
};
