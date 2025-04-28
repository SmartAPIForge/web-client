import { useEffect, useRef } from "react";
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
} from "@/entities/Project";
import { useAuth } from "@/react/shared/hooks/useAuth.ts";

const ActiveApisWidget = () => {
  const { user } = useAuth();
  const projects = useStore($projects);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  console.log(projects);

  useEffect(() => {
    void loadProjects(true);

    // Clean up function
    return () => {
      // Disconnect the observer when component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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

  const handleDownloadProject = (projectId: string) => {
    void downloadProject(projectId);
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
          {projects.items.map((projectData, index) => {
            if (!projectData) return null;

            return (
              <div
                key={`${projectData.composeId.owner}_${projectData.composeId.name}-${index}`}
                className={styles.apiCard}
              >
                <div className={styles.apiInfo}>
                  <h4>{projectData.composeId.name}</h4>
                  <p>Last update: {new Date(projectData.info.updatedAt.low * 1000).toLocaleString()}</p>
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

                  {/* Download button - available for all except NEW, GENERATE_PENDING, GENERATE_FAIL */}
                  {![
                    ApiStatus.NEW,
                    ApiStatus.GENERATE_PENDING,
                    ApiStatus.GENERATE_FAIL,
                  ].includes(projectData.info.status) && (
                    <button
                      className={`${styles.actionButton} ${styles.downloadButton}`}
                      // onClick={() => handleDownloadProject(projectData.id)}
                      disabled={projects.operationInProgress}
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
