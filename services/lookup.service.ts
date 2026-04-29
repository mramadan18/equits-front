import { ApiResponse, Faculty, Industry, University } from "../types/api";
import apiClient from "./api-client";

export const lookupService = {
  getUniversities: async (): Promise<ApiResponse<University[]>> => {
    const response = await apiClient.get("/universities");
    return response.data;
  },

  getFaculties: async (): Promise<ApiResponse<Faculty[]>> => {
    const response = await apiClient.get("/faculties");
    return response.data;
  },

  getIndustries: async (): Promise<ApiResponse<Industry[]>> => {
    const response = await apiClient.get("/industries");
    return response.data;
  },
};
