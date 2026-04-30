import {
  ApiResponse,
  Project,
  ProjectDraft,
  ProjectFilters,
  ProjectComment,
  ProjectRating,
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

  getProjectsFeed: async (
    filters?: ProjectFilters,
  ): Promise<ApiResponse<Project[]>> => {
    const response = await apiClient.get("/projects/feed", { params: filters });
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

  likeProject: async (id: number | string): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(`/projects/${id}/like`, {});
    return response.data;
  },

  getProjectComments: async (
    id: number | string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<ProjectComment[]>> => {
    const response = await apiClient.get(`/projects/${id}/comments`, {
      params: { page, limit },
    });
    return response.data;
  },

  commentOnProject: async (
    id: number | string,
    content: string,
  ): Promise<ApiResponse<ProjectComment>> => {
    const response = await apiClient.post(`/projects/${id}/comments`, {
      content,
    });
    return response.data;
  },

  rateProject: async (
    id: number | string,
    rating: { score: number; feedback?: string },
  ): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(`/projects/${id}/rating`, rating);
    return response.data;
  },

  getProjectRating: async (
    id: number | string,
  ): Promise<ApiResponse<ProjectRating>> => {
    const response = await apiClient.get(`/projects/${id}/rating`);
    return response.data;
  },
};
