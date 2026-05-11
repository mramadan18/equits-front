import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { meetingService } from "@/services/meeting.service";
import { queryKeys } from "@/constants/queryKeys";
import { ApiResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export const useCheckMeetingEligibility = (params: {
  projectId?: number;
  receiverId?: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: queryKeys.meetings.eligibility(
      params.projectId,
      params.receiverId,
    ),
    queryFn: () =>
      meetingService.checkEligibility({
        projectId: params.projectId,
        receiverId: params.receiverId,
      }),
    enabled: params.enabled !== false,
    staleTime: 0,
  });
};

export const useUpdateMeetingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<any>,
    ApiError,
    { id: number; status: string; rejectionReason?: string }
  >({
    mutationFn: ({ id, status, rejectionReason }) =>
      meetingService.updateStatus(id, status, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({ queryKey: ["meeting-eligibility"] });
    },
  });
};

export const useCancelMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number>({
    mutationFn: (id: number) => meetingService.cancelMeeting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      queryClient.invalidateQueries({ queryKey: ["meeting-eligibility"] });
    },
  });
};
