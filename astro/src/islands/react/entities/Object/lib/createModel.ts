import { Rect, type RectProps } from "fabric";
import type { Model } from "../model/types";
import { v4 as uuidV4 } from "uuid";
import { Objects } from "../model/objects";

export const createModel = (props: Partial<RectProps>) => {
  const objectId = uuidV4();

  const rect = new Rect(props);

  const model: Model = {
    id: objectId,
    apiConfiguration: {
      name: "Model",
      fields: [
        {
          id: uuidV4(),
          name: "id",
          type: "int",
          isUnique: true,
        },
      ],
      endpoints: [
        // Example endpoint:
        // With only id field, so we can provide it in DTOs.
        {
          id: uuidV4(),
          type: "GET",
          private: false,
          query: ["id"],
          responseDTO: ["id"],
        },
      ],
    },
    generatorConfiguration: {
      isOpened: false,
      isFieldsOpened: false,
      isEndpointsOpened: false,
      isSelected: true,
      instance: rect,
    },
  };

  Objects.add(model);

  return rect;
};
