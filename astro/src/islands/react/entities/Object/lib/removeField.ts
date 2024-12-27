import { Objects } from "../model/objects";
import type { Field } from "../model/types";

export const removeField = (fieldIdentifier: Field) => {
  Objects.set(
    Objects.get().map((object) => {
      object.apiConfiguration.fields.forEach((field) => {
        if (field.id === fieldIdentifier.id) {
          const newObject = { ...object };
          newObject.apiConfiguration.fields =
            newObject.apiConfiguration.fields.filter(
              (f) => f.id !== fieldIdentifier.id,
            );
          return newObject;
        }
      });
      return object;
    }),
  );
};
