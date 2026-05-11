import { ApiResponse } from "../types/api";
import apiClient, { unwrap } from "./api-client";

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  getNotifications: (): Promise<ApiResponse<Notification[]>> =>
    unwrap(apiClient.get("/notifications")),

  getUnreadCount: (): Promise<ApiResponse<{ count: number }>> =>
    unwrap(apiClient.get("/notifications/unread-count")),

  markAsRead: (id: number): Promise<ApiResponse<any>> =>
    unwrap(apiClient.patch(`/notifications/${id}/mark-read`)),

  markAllRead: (): Promise<ApiResponse<any>> =>
    unwrap(apiClient.patch("/notifications/mark-all-read")),

  deleteNotification: (id: number): Promise<ApiResponse<any>> =>
    unwrap(apiClient.delete(`/notifications/${id}`)),
};
