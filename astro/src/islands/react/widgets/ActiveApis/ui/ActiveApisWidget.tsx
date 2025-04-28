import { useEffect, useRef, useState } from "react";
import styles from "./ActiveApisWidget.module.scss";
import { useStore } from "@nanostores/react";
import {
  $projects,
  loadProjects,
  loadMoreProjects,
  startProject,
  stopProject,
  downloadProject,
  ApiStatus,
  statusLabels,
  type ProjectResponse,
} from "@/entities/Project";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";
import { sseService } from "@/services/sse";
import { copyToClipboard } from "@/services/native.ts";

const ActiveApisWidget = () => {
  const { user } = useAuth();
  const projects = useStore($projects);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);

  console.log(projects);

  useEffect(() => {
    void loadProjects(true);

    // Set up SSE connection
    if (user?.username) {
      sseService.connect((data: unknown) => {
        console.log("Received project update:", data);
        // TODO: Update projects store with new data
      });
    }

    // Clean up function
    return () => {
      // Disconnect the observer when component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      // Close SSE connection
      sseService.disconnect();
    };
  }, [user?.username]);

  // Set up intersection observer for infinite loading
  useEffect(() => {
    if (!projects.hasMore || projects.loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          projects.hasMore &&
          !projects.loading
        ) {
          void loadMoreProjects();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observer && loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [projects.hasMore, projects.loading]);

  // Handle project operations
  const handleStartProject = (projectId: string) => {
    void startProject(projectId);
  };

  const handleStopProject = (projectId: string) => {
    void stopProject(projectId);
  };

  const handleDownloadProject = (projectData: ProjectResponse) => {
    void downloadProject(projectData);
  };

  const handleCopyUrl = (projectId: string, url: string | undefined) => {
    if (!url) return;
    copyToClipboard(url);
    setCopiedProjectId(projectId);
    setTimeout(() => setCopiedProjectId(null), 2000); // Reset after 2 seconds
  };

  // Handle loading state
  if (projects.loading && projects.items.length === 0) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  // Handle error state
  if (projects.error && projects.items.length === 0) {
    return <div className={styles.error}>{projects.error}</div>;
  }

  return (
    <div className={styles.apisContainer}>
      {/* Operation error message, if any */}
      {projects.operationError && (
        <div className={styles.operationError}>{projects.operationError}</div>
      )}

      {projects.items.length === 0 ? (
        <div className={styles.noProjects}>No projects found</div>
      ) : (
        <>
          {projects.items
            .sort((a, b) => b.info.updatedAt.low - a.info.updatedAt.low)
            .map((projectData, index) => {
              if (!projectData) return null;

              return (
                <div
                  key={`${projectData.composeId.owner}_${projectData.composeId.name}-${index}`}
                  className={styles.apiCard}
                >
                  <div className={styles.apiInfo}>
                    <h4>{projectData.composeId.name}</h4>
                    <p>
                      Last update:{" "}
                      {new Date(
                        projectData.info.updatedAt.low * 1000,
                      ).toLocaleString()}
                    </p>
                    <div
                      className={styles.statusBadge}
                      data-status={projectData.info.status}
                    >
                      {statusLabels[projectData.info.status] || "Unknown"}
                    </div>
                  </div>
                  <div className={styles.apiActions}>
                    {/* Start button - available for DEPLOY_SUCCESS and STOPPED */}
                    {[ApiStatus.DEPLOY_SUCCESS, ApiStatus.STOPPED].includes(
                      projectData.info.status,
                    ) && (
                      <button
                        className={`${styles.actionButton} ${styles.startButton}`}
                        // onClick={() => handleStartProject(projectData.id)}
                        disabled={projects.operationInProgress}
                      >
                        Start
                      </button>
                    )}

                    {/* Stop button - available for RUNNING */}
                    {projectData.info.status === ApiStatus.RUNNING && (
                      <button
                        className={`${styles.actionButton} ${styles.stopButton}`}
                        // onClick={() => handleStopProject(projectData.id)}
                        disabled={projects.operationInProgress}
                      >
                        Stop
                      </button>
                    )}

                    {projectData.info.urlDeploy && (
                      <button
                        className={`${styles.actionButton} ${styles.copyButton}`}
                        onClick={() =>
                          handleCopyUrl(
                            projectData.composeId.name,
                            projectData.info.urlDeploy,
                          )
                        }
                        disabled={!projectData.info.urlDeploy}
                      >
                        {copiedProjectId === projectData.composeId.name
                          ? "Copied!"
                          : "Copy"}
                      </button>
                    )}

                    {/* Download button - available for all except NEW, GENERATE_PENDING, GENERATE_FAIL */}
                    {![
                      ApiStatus.NEW,
                      ApiStatus.GENERATE_PENDING,
                      ApiStatus.GENERATE_FAIL,
                    ].includes(projectData.info.status) && (
                      <button
                        className={`${styles.actionButton} ${styles.downloadButton}`}
                        onClick={() => handleDownloadProject(projectData)}
                        disabled={
                          projects.operationInProgress ||
                          !projectData.info.urlZip
                        }
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Loading indicator */}
          {projects.loading && (
            <div className={styles.loadingMore}>Loading more projects...</div>
          )}

          {/* Invisible element for intersection observer */}
          <div ref={loadingRef} className={styles.loadingTrigger} />
        </>
      )}
    </div>
  );
};

export { ActiveApisWidget };
