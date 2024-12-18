import { Rect } from "fabric";
import { type ModelProps } from "../types";

export const createModel = (props: ModelProps) => {
  return new Rect(props);
};
