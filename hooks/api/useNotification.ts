import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notificationService,
  Notification,
} from "@/services/notification.service";
import { queryKeys } from "@/constants/queryKeys";
import { ApiResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export const useNotifications = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<Notification[]>, ApiError>({
    queryKey: queryKeys.notifications.all,
    queryFn: () => notificationService.getNotifications(),
    staleTime: 0,
    gcTime: 0,
    ...options,
  });
};

export const useUnreadCount = (options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<{ count: number }>, ApiError>({
    queryKey: queryKeys.notifications.unreadCount,
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 5 * 60 * 1000,
    ...options,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number>({
    mutationFn: (id: number) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount,
      });
    },
  });
};

export const useMarkAllRead = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, void>({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount,
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number>({
    mutationFn: (id: number) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount,
      });
    },
  });
};
