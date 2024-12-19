import { Rect } from "fabric";
import { type RectProps } from "fabric/";

export interface ModelProps extends RectProps {
  // Additional props if needed
}

export const createModel = (props: ModelProps) => {
  return new Rect(props);
};
