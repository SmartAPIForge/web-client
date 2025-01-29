import { computed } from "nanostores";
import { Objects } from "./objects";

export const configuringObjects = computed(Objects.store, (objects) => {
  return objects.filter((object) => object.generatorConfiguration.isSelected);
});
