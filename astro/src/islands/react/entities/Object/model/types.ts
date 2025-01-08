import type { FabricObject } from "fabric";

export type HttpMethod = "GET" | "POST" | "DELETE";

export type FieldType = "int" | "string" | "bool";

export const HttpMethodOptions: Record<HttpMethod, string> = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

export const FieldTypeOptions: Record<FieldType, string> = {
  int: "Integer",
  string: "String",
  bool: "Boolean",
};

export interface Field {
  id: string;
  name: string;
  type: FieldType;
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
    isEndpointsOpened: boolean;
    isSelected: boolean;
    instance: FabricObject;
  };
}
