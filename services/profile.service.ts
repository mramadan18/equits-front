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
  getAllProfiles: (): Promise<ApiResponse<User[]>> =>
    unwrap(apiClient.get("/profile")),

  getProfileById: (id: number): Promise<ApiResponse<User>> =>
    unwrap(apiClient.get(`/profile/${id}`)),

  getStatus: (): Promise<ApiResponse<ProfileStatus>> =>
    unwrap(apiClient.get("/profile/status")),

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

  getProfileProjects: (id: string): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get(`/profile/${id}/projects`)),

  getRelatedProfiles: (
    id: string,
    limit: number = 3,
  ): Promise<ApiResponse<User[]>> =>
    unwrap(apiClient.get(`/profile/${id}/related`, { params: { limit } })),
};
