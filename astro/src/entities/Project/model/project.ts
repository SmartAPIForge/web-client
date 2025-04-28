import { map } from "nanostores";
import api from "@/services/api";

// API Status enum
export enum ApiStatus {
  NEW = "NEW",
  GENERATE_PENDING = "GENERATE_PENDING",
  GENERATE_SUCCESS = "GENERATE_SUCCESS",
  GENERATE_FAIL = "GENERATE_FAIL",
  DEPLOY_PENDING = "DEPLOY_PENDING",
  DEPLOY_SUCCESS = "DEPLOY_SUCCESS",
  DEPLOY_FAIL = "DEPLOY_FAIL",
  RUNNING = "RUNNING",
  STOPPED = "STOPPED",
  FAILED = "FAILED",
}

// Human-readable status labels
export const statusLabels = {
  [ApiStatus.NEW]: "New",
  [ApiStatus.GENERATE_PENDING]: "Generating...",
  [ApiStatus.GENERATE_SUCCESS]: "Generated",
  [ApiStatus.GENERATE_FAIL]: "Generation Failed",
  [ApiStatus.DEPLOY_PENDING]: "Deploying...",
  [ApiStatus.DEPLOY_SUCCESS]: "Deployed",
  [ApiStatus.DEPLOY_FAIL]: "Deployment Failed",
  [ApiStatus.RUNNING]: "Running",
  [ApiStatus.STOPPED]: "Stopped",
  [ApiStatus.FAILED]: "Failed",
};

export interface Project {
  id: string;
  name: string;
  status: ApiStatus;
  lastUpdate: string;
}

export interface ProjectResponse {
  composeId: {
    owner: string;
    name: string;
  };
  info: {
    createdAt: {
      low: number;
    },
    data: string;
    status: ApiStatus;
    updatedAt: {
      low: number;
    };
  }
}

export interface ProjectsState {
  items: ProjectResponse[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  operationInProgress: boolean;
  operationError: string | null;
}

// Store for projects
export const $projects = map<ProjectsState>({
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  operationInProgress: false,
  operationError: null,
});

// Load projects from API
export const loadProjects = async (reset: boolean = false) => {
  try {
    const currentState = $projects.get();

    // Set loading state
    $projects.setKey("loading", true);

    // Reset state if needed
    if (reset) {
      $projects.set({
        items: [],
        loading: true,
        error: null,
        hasMore: true,
        currentPage: 1,
        operationInProgress: false,
        operationError: null,
      });
    }

    // Get current page
    const page = reset ? 1 : currentState.currentPage;

    // Make API request
    const response = await api.get("/projects", {
      params: {
        page,
        limit: 10,
      },
    });

    // Extract data
    const { projects = [] } = response.data;

    console.log(projects);

    // Update store
    $projects.set({
      items: reset ? projects : [...currentState.items, ...projects],
      loading: false,
      error: null,
      hasMore: projects.length > 0,
      currentPage: projects.length > 0 ? page + 1 : page,
      operationInProgress: false,
      operationError: null,
    });
  } catch (error) {
    console.error("Failed to load projects:", error);
    $projects.setKey("loading", false);
    $projects.setKey(
      "error",
      "Failed to load projects. Please try again later.",
    );
  }
};

// Load next page of projects
export const loadMoreProjects = async () => {
  const currentState = $projects.get();

  // Don't load more if we're already loading or there are no more items
  if (currentState.loading || !currentState.hasMore) {
    return;
  }

  await loadProjects(false);
};

// Clear projects store
export const clearProjects = () => {
  $projects.set({
    items: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    operationInProgress: false,
    operationError: null,
  });
};

// Helper to update a single project in the store
const updateProjectInStore = (
  projectId: string,
  updatedProject: Partial<Project>,
) => {
  // const currentState = $projects.get();
  //
  // const updatedItems = currentState.items.map((project) => {
  //   if (project.data?.id === projectId) {
  //     return {
  //       ...project,
  //       data: {
  //         ...project.data,
  //         ...updatedProject,
  //         // Update lastUpdate time
  //         lastUpdate: new Date().toISOString().split("T")[0],
  //       },
  //     };
  //   }
  //   return project;
  // });
  //
  // $projects.setKey("items", updatedItems);
};

// Start a project
export const startProject = async (projectId: string) => {
  try {
    $projects.setKey("operationInProgress", true);
    $projects.setKey("operationError", null);

    // Optimistically update UI
    updateProjectInStore(projectId, { status: ApiStatus.RUNNING });

    // Make API request to start the project
    await api.post(`/project/${projectId}/start`);

    $projects.setKey("operationInProgress", false);
  } catch (error) {
    console.error("Failed to start project:", error);

    // Revert optimistic update
    updateProjectInStore(projectId, { status: ApiStatus.STOPPED });

    $projects.setKey("operationInProgress", false);
    $projects.setKey(
      "operationError",
      "Failed to start project. Please try again.",
    );
  }
};

// Stop a project
export const stopProject = async (projectId: string) => {
  try {
    $projects.setKey("operationInProgress", true);
    $projects.setKey("operationError", null);

    // Optimistically update UI
    updateProjectInStore(projectId, { status: ApiStatus.STOPPED });

    // Make API request to stop the project
    await api.post(`/project/${projectId}/stop`);

    $projects.setKey("operationInProgress", false);
  } catch (error) {
    console.error("Failed to stop project:", error);

    // Revert optimistic update
    updateProjectInStore(projectId, { status: ApiStatus.RUNNING });

    $projects.setKey("operationInProgress", false);
    $projects.setKey(
      "operationError",
      "Failed to stop project. Please try again.",
    );
  }
};

// Download a project
export const downloadProject = async (projectId: string) => {
  try {
    $projects.setKey("operationInProgress", true);
    $projects.setKey("operationError", null);

    // Make API request to get download URL
    const response = await api.get(`/project/${projectId}/download`);

    // Get the download URL from the response
    const { downloadUrl } = response.data;

    // Create an invisible anchor element to trigger the download
    if (downloadUrl && typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `project-${projectId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    $projects.setKey("operationInProgress", false);
  } catch (error) {
    console.error("Failed to download project:", error);
    $projects.setKey("operationInProgress", false);
    $projects.setKey(
      "operationError",
      "Failed to download project. Please try again.",
    );
  }
};
