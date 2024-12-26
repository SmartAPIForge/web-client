import type { FabricObject } from "fabric";

export type HttpMethod = "GET" | "POST" | "DELETE";

export interface Field {
  id: string;
  name: string;
  type: string;
  isUnique: boolean;
}

export interface Endpoint {
  id: string;
  type: HttpMethod;
  private: boolean;
  // TODO: Add more props
}

export interface Model {
  id: string;
  apiConfiguration: {
    name: string;
    fields: Field[];
    endpoints: Endpoint[];
  };
  generatorConfiguration: {
    isOpened: boolean;
    isFieldsOpened: boolean;
    isSelected: boolean;
    instance: FabricObject;
  };
}
