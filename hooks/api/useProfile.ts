import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { ApiResponse, ProfileStatus, User } from "@/types/api";
import { ProfileFilters } from "@/types/filters";
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
    queryKey: queryKeys.profiles.related(params.id!, params.limit),
    queryFn: () => profileService.getRelatedProfiles(params.id!, params.limit),
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

/** Infinite scroll version of profile listing (for Talents page) */
export const useInfiniteProfiles = (
  filters?: Omit<Record<string, any>, "page">,
) => {
  return useInfiniteQuery({
    queryKey: ["profiles-infinite", filters],
    queryFn: ({ pageParam = 1 }) =>
      profileService.getProfiles({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<User[]>) => {
      const totalPages = lastPage.pagination?.totalPages || 1;
      const currentPage = lastPage.pagination?.page || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useSearchTalents = (search: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<User[]>, ApiError>({
    queryKey: ["talents-search", search],
    queryFn: () => profileService.searchTalents(search),
    enabled: enabled && search.length >= 2,
  });
};
