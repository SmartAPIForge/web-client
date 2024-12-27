import { Objects } from "../model/objects";
import type { Field } from "../model/types";
import lodash from "lodash";

export const setFieldName = lodash.debounce(
  (fieldIdentifier: Field, name: string) => {
    const updatedObjects = Objects.get().map((obj) => {
      obj.apiConfiguration.fields.forEach((field) => {
        if (field.id === fieldIdentifier.id) {
          const newObject = { ...obj };
          newObject.apiConfiguration.fields =
            newObject.apiConfiguration.fields.map((field) => {
              if (field.id === fieldIdentifier.id) {
                return { ...field, name };
              }
              return field;
            });
          return newObject;
        }
      });
      return obj;
    });
    Objects.set(updatedObjects);
  },
  300,
);