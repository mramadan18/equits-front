import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { projectService } from "@/services/project.service";
import {
  ApiResponse,
  Project,
  ProjectComment,
  ProjectRating,
} from "@/types/api";
import { ProjectFilters } from "@/types/filters";
import { ApiError } from "@/types/error";

export const useProject = (id: number | string) => {
  return useQuery<ApiResponse<Project>, ApiError>({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Project>, ApiError>({
    mutationFn: () => projectService.createProject(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.myProjects,
      });
    },
  });
};

export const useUpdateProjectStep = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Project>,
    ApiError,
    { id: number | string; step: number; data: any }
  >({
    mutationFn: ({ id, step, data }) =>
      projectService.updateProjectStep(id, step, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all() });
    },
  });
};

/** Infinite scroll version of useProjectsFeed */
export const useInfiniteProjectsFeed = (
  filters?: Omit<ProjectFilters, "page">,
) => {
  return useInfiniteQuery({
    queryKey: ["projects-feed-infinite", filters],
    queryFn: ({ pageParam = 1 }) =>
      projectService.getProjectsFeed({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Project[]>) => {
      const totalPages = lastPage.pagination?.totalPages || 1;
      const currentPage = lastPage.pagination?.page || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

/** Infinite scroll version of useProjects (for Explore page) */
export const useInfiniteProjects = (
  filters?: Omit<ProjectFilters, "page">,
  initialData?: ApiResponse<Project[]>,
) => {
  return useInfiniteQuery({
    queryKey: ["projects-infinite", filters],
    queryFn: ({ pageParam = 1 }) =>
      projectService.getProjects({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Project[]>) => {
      const totalPages = lastPage.pagination?.totalPages || 1;
      const currentPage = lastPage.pagination?.page || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });
};

export const useSubmitProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Project>, ApiError, number | string>({
    mutationFn: (id) => projectService.submitProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number | string>({
    mutationFn: (id) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
    },
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number | string>({
    mutationFn: (id) => projectService.likeProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(id),
      });
    },
  });
};

export const useProjectCommentsInfinite = (
  id: number | string,
  limit: number = 10,
) => {
  return useInfiniteQuery({
    queryKey: ["project-comments", id],
    queryFn: ({ pageParam = 1 }) =>
      projectService.getProjectComments(id, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      const totalPages = lastPage.pagination.totalPages || 1;
      const currentPage = lastPage.pagination.page || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!id,
  });
};

export const useCommentOnProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ProjectComment>,
    ApiError,
    { id: number | string; content: string }
  >({
    mutationFn: ({ id, content }) =>
      projectService.commentOnProject(id, content),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project-comments", id] });
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(id),
      });
    },
  });
};

export const useRateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<any>,
    ApiError,
    { id: number | string; score: number; feedback?: string }
  >({
    mutationFn: ({ id, score, feedback }) =>
      projectService.rateProject(id, { score, feedback }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project-rating", id] });
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(id),
      });
    },
  });
};

export const useProjectRating = (id: number | string) => {
  return useQuery<ApiResponse<ProjectRating>, ApiError>({
    queryKey: ["project-rating", id],
    queryFn: () => projectService.getProjectRating(id),
    enabled: !!id,
  });
};
