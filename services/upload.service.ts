import { ApiResponse, UploadResponse } from "../types/api";
import apiClient from "./api-client";

export const uploadService = {
  uploadSingle: async (
    file: File,
    folder: string = "projects",
  ): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await apiClient.post("/upload/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
