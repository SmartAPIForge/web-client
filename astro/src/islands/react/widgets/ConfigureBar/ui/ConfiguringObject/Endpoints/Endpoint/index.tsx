import { useState, type FC } from "react";
import {
  HttpMethodOptions,
  type Endpoint,
  type Field,
  type HttpMethod,
} from "@/react/entities/Object/model/types.ts";

import styles from "./index.module.scss";
import Select from "@/react/shared/ui/Select";
import { setEndpointHttpMethodType } from "@/react/entities/Object/lib/setEndpointHttpMethod.ts";
import Input from "@/react/shared/ui/Input";
import { toggleEndpointPrivate } from "@/react/entities/Object/lib/toggleEndpointPrivate.ts";
import { toggleResponseField } from "@/react/entities/Object/lib/toggleResponseField.ts";
import { toggleRequestField } from "@/react/entities/Object/lib/toggleRequesField.ts";

interface Props {
  fields: Field[];
  endpoint: Endpoint;
}

const ModelEndpoint: FC<Props> = ({ fields, endpoint }) => {
  const [selectedHttpMethid, setSelectedHttpMethid] = useState(endpoint.type);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as HttpMethod;
    setSelectedHttpMethid(value);
    setEndpointHttpMethodType(endpoint, value);
  };

  console.log(endpoint);

  // TODO: Add change method, accesebility, req/res dto.
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Input
          name="Private"
          type="checkbox"
          checked={endpoint.private}
          onChange={() => toggleEndpointPrivate(endpoint)}
        />
        <Select
          id={endpoint.id}
          options={Object.keys(HttpMethodOptions).map((type) => ({
            value: type,
            label: HttpMethodOptions[type as HttpMethod],
          }))}
          value={selectedHttpMethid}
          onChange={handleSelectChange}
          name={"Http Method"}
        />
      </div>
      <div className={styles.responseDtoContainer}>
        <p>Response DTO</p>
        <div className={styles.cols}>
          {fields.map((field) => (
            <div key={`field-endpoint-res-${field.id}`} className={styles.row}>
              <p>{field.name}</p>
              <Input
                type="checkbox"
                checked={endpoint.responseDTO.includes(field.name)}
                onChange={() => toggleResponseField(endpoint, field.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.requestDtoContainer}>
        <p>Request DTO</p>
        <div className={styles.cols}>
          {fields.map((field) => (
            <div key={`field-endpoint-req-${field.id}`} className={styles.row}>
              <p>{field.name}</p>
              <Input
                type="checkbox"
                checked={endpoint.query.includes(field.name)}
                onChange={() => toggleRequestField(endpoint, field.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ModelEndpoint };
