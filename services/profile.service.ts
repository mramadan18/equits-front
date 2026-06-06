import {
  ApiResponse,
  ProfileStatus,
  UpdateJobTitleRequest,
  UpdateOverviewRequest,
  UpdateEducationRequest,
  UpdateContactRequest,
  UpdatePicturesRequest,
  User,
  Project,
} from "../types/api";
import apiClient, { unwrap } from "./api-client";

export const profileService = {
  getProfiles: (params?: Record<string, any>): Promise<ApiResponse<User[]>> =>
    unwrap(apiClient.get("/profile", { params })),

  getProfileById: (id: number): Promise<ApiResponse<User>> =>
    unwrap(apiClient.get(`/profile/${id}`)),

  getStatus: (): Promise<ApiResponse<ProfileStatus>> =>
    unwrap(apiClient.get("/profile/status")),

  dismissStatusModal: (): Promise<ApiResponse<null>> =>
    unwrap(apiClient.post("/profile/status/dismiss")),

  updateJobTitle: (data: UpdateJobTitleRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/profile/job-title", data)),

  updateOverview: (data: UpdateOverviewRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/profile/overview", data)),

  updateEducation: (data: UpdateEducationRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/profile/education", data)),

  updateContact: (data: UpdateContactRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/profile/contact", data)),

  updatePictures: (data: UpdatePicturesRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/profile/pictures", data)),

  updateInterests: (industryIds: number[]): Promise<ApiResponse<any>> =>
    unwrap(apiClient.patch("/profile/interests", { industryIds })),

  getProfileProjects: (id: string): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get(`/profile/${id}/projects`)),

  getRelatedProfiles: (
    id: string,
    limit: number = 3,
  ): Promise<ApiResponse<User[]>> =>
    unwrap(apiClient.get(`/profile/${id}/related`, { params: { limit } })),

  searchTalents: (
    search: string,
    limit: number = 10,
  ): Promise<ApiResponse<User[]>> =>
    unwrap(
      apiClient.get("/profile/search-talents", { params: { search, limit } }),
    ),

  requestMeeting: (id: number | string, data: any): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/profile/${id}/request-meeting`, data)),
};
