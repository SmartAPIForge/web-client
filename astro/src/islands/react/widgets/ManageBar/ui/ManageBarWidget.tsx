import styles from "./ManageBarWidget.module.scss";
import Button from "@/react/shared/ui/Button";
import { Objects } from "@/react/entities/Object/model/objects";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { Project } from "@/react/entities/Object/project/name.ts";
import api from "@/services/api.ts";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";
import { initAuth } from "@/entities/User";

const ManageWidget = () => {
  const { user } = useAuth();
  const $projectName = useStore(Project.name.store);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      void initAuth();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleGenerate = async () => {
    try {
      setIsLoading(true);

      const models = Objects.get();

      let response = await api.post("/projects/init", {
        name: $projectName,
      });

      if (response.status !== 201) {
        throw new Error("Failed to init project");
      }

      setTimeout(async () => {
        response = await api.put("/projects/update", {
          name: $projectName,
          data: JSON.stringify({
            general: {
              name: $projectName,
              owner: user.username,
              autoAuth: false,
            },
            models: models.map((model) => ({
              name: model.apiConfiguration.name,
              fields: model.apiConfiguration.fields,
              endpoints: model.apiConfiguration.endpoints,
            })),
          }),
        });

        if (response.status !== 200) {
          throw new Error("Failed to update project");
        }

        // Redirect to profile page after successful generation
        window.location.href = "/profile";
      }, 1000);
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.bottomRightBarContainer}>
      <Button
        type="submit"
        onClick={handleGenerate}
        disabled={isLoading}
        className={styles.generateButton}
      >
        {isLoading ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
};

export { ManageWidget };
