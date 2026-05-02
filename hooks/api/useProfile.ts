import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import {
  ApiResponse,
  ProfileStatus,
  UpdateJobTitleRequest,
  UpdateOverviewRequest,
  UpdateEducationRequest,
  UpdateContactRequest,
  UpdatePicturesRequest,
  User,
} from "@/types/api";
import { ApiError } from "@/types/error";

export const useProfileStatus = () => {
  return useQuery<ApiResponse<ProfileStatus>, ApiError>({
    queryKey: ["profile-status"],
    queryFn: () => profileService.getStatus(),
  });
};

export const useUpdateJobTitle = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateJobTitleRequest>({
    mutationFn: (data) => profileService.updateJobTitle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-status"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUpdateOverview = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateOverviewRequest>({
    mutationFn: (data) => profileService.updateOverview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-status"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateEducationRequest>({
    mutationFn: (data) => profileService.updateEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-status"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateContactRequest>({
    mutationFn: (data) => profileService.updateContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-status"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useUpdatePictures = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdatePicturesRequest>({
    mutationFn: (data) => profileService.updatePictures(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-status"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
