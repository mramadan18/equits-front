import { ApiResponse, Project } from "../types/api";
import apiClient, { unwrap } from "./api-client";

export const wishlistService = {
  getWishlist: (): Promise<ApiResponse<Project[]>> =>
    unwrap(apiClient.get("/wishlist")),

  toggleWishlist: (projectId: number | string): Promise<ApiResponse<any>> =>
    unwrap(apiClient.post(`/wishlist/toggle/${projectId}`)),
};
