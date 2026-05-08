import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { ApiResponse, ProfileFilters, ProfileStatus, User } from "@/types/api";
import { ApiError } from "@/types/error";
import { queryKeys } from "@/constants/queryKeys";

// Helper for profile mutations that invalidate common profile queries
const useProfileMutation = <TRequest, TResponse = User>(
  mutationFn: (data: TRequest) => Promise<ApiResponse<TResponse>>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TResponse>, ApiError, TRequest>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.status });
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

export const useGetAllProfiles = () => {
  return useQuery<ApiResponse<User[]>, ApiError>({
    queryKey: queryKeys.profiles.all,
    queryFn: () => profileService.getAllProfiles(),
  });
};

export const useProfile = (id: number) => {
  return useQuery<ApiResponse<User>, ApiError>({
    queryKey: queryKeys.profiles.detail(id),
    queryFn: () => profileService.getProfileById(id),
  });
};

export const useProfileStatus = (enabled: boolean = true) => {
  return useQuery<ApiResponse<ProfileStatus>, ApiError>({
    queryKey: queryKeys.profiles.status,
    queryFn: () => profileService.getStatus(),
    enabled,
  });
};

export const useRelatedProfiles = (
  params: ProfileFilters,
  enabled: boolean = true,
) => {
  return useQuery<ApiResponse<User[]>, ApiError>({
    queryKey: queryKeys.profiles.related(params.id, params.limit),
    queryFn: () => profileService.getRelatedProfiles(params.id, params.limit),
    enabled: enabled && !!params.id,
  });
};

export const useUpdateJobTitle = () =>
  useProfileMutation(profileService.updateJobTitle);

export const useUpdateOverview = () =>
  useProfileMutation(profileService.updateOverview);

export const useUpdateEducation = () =>
  useProfileMutation(profileService.updateEducation);

export const useUpdateContact = () =>
  useProfileMutation(profileService.updateContact);

export const useUpdatePictures = () =>
  useProfileMutation(profileService.updatePictures);
