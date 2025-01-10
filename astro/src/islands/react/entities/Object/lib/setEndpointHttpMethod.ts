import { Objects } from "../model/objects";
import type { Endpoint, HttpMethod } from "../model/types";
import lodash from "lodash";

export const setEndpointHttpMethodType = lodash.debounce(
  (endpointIdentifier: Endpoint, type: HttpMethod) => {
    const updatedObjects = Objects.get().map((obj) => {
      obj.apiConfiguration.endpoints.forEach((endpoint) => {
        if (endpoint.id === endpointIdentifier.id) {
          const newObject = { ...obj };
          newObject.apiConfiguration.endpoints =
            newObject.apiConfiguration.endpoints.map((endpoint) => {
              if (endpoint.id === endpointIdentifier.id) {
                return { ...endpoint, type };
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
