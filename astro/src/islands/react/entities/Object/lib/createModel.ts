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
        {
          id: uuidV4(),
          type: "GET",
          private: false,
        },
        {
          id: uuidV4(),
          type: "DELETE",
          private: true,
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
