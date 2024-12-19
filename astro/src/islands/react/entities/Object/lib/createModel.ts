import { Rect, type RectProps } from "fabric";
import type { Model } from "../model/types";
import { v4 as uuidV4 } from "uuid";
import { Objects } from "../model/objects";

export const createModel = (props: Partial<RectProps>) => {
  const objectId = uuidV4();

  const rect = new Rect(props);

  const model: Model = {
    id: objectId,
    name: "Model",
    fields: [
      {
        name: "id",
        type: "int",
        isUnique: true,
      },
    ],
    endpoints: [
      {
        type: "GET",
        private: false,
      },
      {
        type: "DELETE",
        private: true,
      },
    ],
    instance: rect,
  };

  Objects.add(model);

  return rect;
};
