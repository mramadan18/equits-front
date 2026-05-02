import {
  ApiResponse,
  ProfileStatus,
  UpdateJobTitleRequest,
  UpdateOverviewRequest,
  UpdateEducationRequest,
  UpdateContactRequest,
  UpdatePicturesRequest,
  User,
} from "../types/api";
import apiClient from "./api-client";

export const profileService = {
  getStatus: async (): Promise<ApiResponse<ProfileStatus>> => {
    const response = await apiClient.get("/profile/status");
    return response.data;
  },

  updateJobTitle: async (
    data: UpdateJobTitleRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/profile/job-title", data);
    return response.data;
  },

  updateOverview: async (
    data: UpdateOverviewRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/profile/overview", data);
    return response.data;
  },

  updateEducation: async (
    data: UpdateEducationRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/profile/education", data);
    return response.data;
  },

  updateContact: async (
    data: UpdateContactRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/profile/contact", data);
    return response.data;
  },

  updatePictures: async (
    data: UpdatePicturesRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/profile/pictures", data);
    return response.data;
  },
};
