import { Objects } from "../model/objects";
import type { Model } from "../model/types";
import { Group, IText, type Rect } from "fabric";
import {CONSTS} from "@/consts.ts";

export const setName = (objectIdentifier: Model, name: string) => {
  const updatedObjects = Objects.get().map((obj) => {
    if (obj.id === objectIdentifier.id) {
      name = name.replace(/\n/g, "").slice(0, CONSTS.NAMES.MAX_CHARACTERS).trim();

      // TODO: Move logic to another layer.
      const group = obj.generatorConfiguration.instance as Group;
      const objects = group.getObjects();
      if (objects.length < 2) return obj;

      const rect = objects[0] as Rect;
      const text = objects[1] as IText;
      text.set({ text: name });
      text.set({
        left: rect.left + rect.width / 2 - text.width / 2,
        top: rect.top + rect.height / 2 - text.height / 2,
      });
      group.triggerLayout();
      obj.generatorConfiguration.instance.canvas?.requestRenderAll();

      obj.apiConfiguration.name = name;
      return obj;
    }
    return obj;
  });
  Objects.set(updatedObjects);
};
