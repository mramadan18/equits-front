import {
  ApiResponse,
  Project,
  ProjectDraft,
  ProjectFilters,
} from "../types/api";
import apiClient from "./api-client";

export const projectService = {
  getActiveDraft: async (): Promise<ApiResponse<ProjectDraft[]>> => {
    const response = await apiClient.get("/projects/active-draft");
    return response.data;
  },

  getMyProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await apiClient.get("/projects/my-projects");
    return response.data;
  },

  getProjects: async (
    filters?: ProjectFilters,
  ): Promise<ApiResponse<Project[]>> => {
    const response = await apiClient.get("/projects", { params: filters });
    return response.data;
  },

  getProjectById: async (
    id: number | string,
  ): Promise<ApiResponse<Project>> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (): Promise<ApiResponse<Project>> => {
    const response = await apiClient.post("/projects", {});
    return response.data;
  },

  updateProjectStep: async (
    id: number | string,
    step: number,
    data: any,
  ): Promise<ApiResponse<Project>> => {
    const response = await apiClient.patch(`/projects/${id}`, data, {
      params: { step },
    });
    return response.data;
  },

  submitProject: async (id: number | string): Promise<ApiResponse<Project>> => {
    const response = await apiClient.post(`/projects/${id}/submit`);
    return response.data;
  },

  deleteProject: async (id: number | string): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },
};
