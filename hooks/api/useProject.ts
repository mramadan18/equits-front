import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { ApiResponse, Project, ProjectDraft } from "@/types/api";
import { ApiError } from "@/types/error";

export const useActiveDraft = () => {
  return useQuery<ApiResponse<ProjectDraft[]>, ApiError>({
    queryKey: ["active-draft"],
    queryFn: () => projectService.getActiveDraft(),
  });
};

export const useProject = (id: number | string) => {
  return useQuery<ApiResponse<Project>, ApiError>({
    queryKey: ["project", id],
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Project>, ApiError>({
    mutationFn: () => projectService.createProject(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["active-draft"] });
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
      queryClient.invalidateQueries({ queryKey: ["active-draft"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useSubmitProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Project>, ApiError, number | string>({
    mutationFn: (id) => projectService.submitProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["active-draft"] });
    },
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number | string>({
    mutationFn: (id) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-draft"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
