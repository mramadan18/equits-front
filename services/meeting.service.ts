import { ApiResponse } from "../types/api";
import apiClient, { unwrap } from "./api-client";

export const meetingService = {
  updateStatus: (
    id: number,
    status: string,
    rejectionReason?: string,
  ): Promise<ApiResponse<any>> =>
    unwrap(
      apiClient.patch(`/meetings/${id}/status`, { status, rejectionReason }),
    ),

  cancelMeeting: (id: number): Promise<ApiResponse<any>> =>
    unwrap(apiClient.patch(`/meetings/${id}/cancel`)),

  checkEligibility: (params: {
    projectId?: number;
    receiverId?: number;
  }): Promise<
    ApiResponse<{
      eligible: boolean;
      message: string;
      reason?: string;
      meetingRequestId?: number;
    }>
  > => unwrap(apiClient.get(`/meetings/check-eligibility`, { params })),
};
