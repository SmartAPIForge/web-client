import type { FabricObject } from "fabric";

export type HttpMethod = "GET" | "POST" | "DELETE";

export interface Field {
  name: string;
  type: string;
  isUnique: boolean;
}

export interface Endpoint {
  type: HttpMethod;
  private: boolean;
  // TODO: Add more props
}

export interface Model {
  id: string;
  name: string;
  fields: Field[];
  endpoints: Endpoint[];
  instance: FabricObject;
}
