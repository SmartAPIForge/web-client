import { Objects } from "../model/objects";
import type { Endpoint } from "../model/types";
import lodash from "lodash";

export const toggleResponseField = lodash.debounce(
  (endpointIdentifier: Endpoint, name: string) => {
    const updatedObjects = Objects.get().map((obj) => {
      obj.apiConfiguration.endpoints.forEach((endpoint) => {
        if (endpoint.id === endpointIdentifier.id) {
          const newObject = { ...obj };
          newObject.apiConfiguration.endpoints =
            newObject.apiConfiguration.endpoints.map((endpoint) => {
              if (endpoint.id === endpointIdentifier.id) {
                return {
                  ...endpoint,
                  responseDTO: endpoint.responseDTO.includes(name)
                    ? endpoint.responseDTO.filter((cur) => cur !== name)
                    : [...endpoint.responseDTO, name],
                };
              }
              return endpoint;
            });
          return newObject;
        }
      });
      return obj;
    });
    Objects.set(updatedObjects);
  },
  300,
);
