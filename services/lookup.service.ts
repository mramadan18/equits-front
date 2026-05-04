import {
  ApiResponse,
  City,
  Country,
  Faculty,
  Industry,
  University,
} from "../types/api";
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
  getCountries: async (): Promise<ApiResponse<Country[]>> => {
    const response = await apiClient.get("/countries");
    return response.data;
  },
  getCities: async (countryId?: number): Promise<ApiResponse<City[]>> => {
    const response = await apiClient.get("/cities", {
      params: { countryId },
    });
    return response.data;
  },
};
