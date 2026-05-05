import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "@/services/wishlist.service";
import { ApiResponse, Project } from "@/types/api";
import { ApiError } from "@/types/error";

export const useWishlist = () => {
  return useQuery<ApiResponse<Project[]>, ApiError>({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, number | string>({
    mutationFn: (projectId) => wishlistService.toggleWishlist(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
