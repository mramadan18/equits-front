import {
  ApiResponse,
  Project,
  ProjectComment,
  ProjectMember,
  ProjectRating,
} from "../types/api";
import { ProjectFilters } from "../types/filters";
import apiClient, { unwrap } from "./api-client";

export const projectService = {
  getMyProjects: (): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get("/projects/my-projects")),

  getProjects: (filters?: ProjectFilters): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get("/projects", { params: filters })),

  getProjectsFeed: (
    filters?: ProjectFilters,
  ): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get("/projects/feed", { params: filters })),

  getProjectById: (id: number | string): Promise<ApiResponse<Project>> =>
    unwrap(apiClient.get(`/projects/${id}`)),

  createProject: (): Promise<ApiResponse<Project>> =>
    unwrap(apiClient.post("/projects", {})),

  updateProjectStep: (
    id: number | string,
    step: number,
    data: any,
  ): Promise<ApiResponse<Project>> =>
    unwrap(apiClient.patch(`/projects/${id}`, data, { params: { step } })),

  submitProject: (id: number | string): Promise<ApiResponse<Project>> =>
    unwrap(apiClient.post(`/projects/${id}/submit`)),

  deleteProject: (id: number | string): Promise<ApiResponse<any>> =>
    unwrap(apiClient.delete(`/projects/${id}`)),

  likeProject: (id: number | string): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/projects/${id}/like`, {})),

  getProjectComments: (
    id: number | string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<ProjectComment[]>> =>
    unwrap(
      apiClient.get(`/projects/${id}/comments`, { params: { page, limit } }),
    ),

  commentOnProject: (
    id: number | string,
    content: string,
  ): Promise<ApiResponse<ProjectComment>> =>
    unwrap(apiClient.post(`/projects/${id}/comments`, { content })),

  rateProject: (
    id: number | string,
    rating: { score: number; feedback?: string },
  ): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/projects/${id}/rating`, rating)),

  getProjectRating: (
    id: number | string,
  ): Promise<ApiResponse<ProjectRating>> =>
    unwrap(apiClient.get(`/projects/${id}/rating`)),

  addMember: (
    projectId: number | string,
    memberData: { userId: number; role: string },
  ): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/projects/${projectId}/members`, memberData)),

  removeMember: (
    projectId: number | string,
    memberId: number,
  ): Promise<ApiResponse<any>> =>
    unwrap(apiClient.delete(`/projects/${projectId}/members/${memberId}`)),

  getProjectMembers: (
    id: number | string,
  ): Promise<ApiResponse<ProjectMember[]>> =>
    unwrap(apiClient.get(`/projects/${id}/members`)),

  requestMeeting: (
    id: number | string,
    data: {
      preferredDate: string;
      preferredTime: string;
      contactMethod: string;
      message?: string;
    },
  ): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/projects/${id}/request-meeting`, data)),
};
