import { useMutation } from "@tanstack/react-query";
import { uploadService } from "@/services/upload.service";
import { ApiResponse, UploadResponse } from "@/types/api";
import { ApiError } from "@/types/error";

export const useUploadSingle = () => {
  return useMutation<
    ApiResponse<UploadResponse>,
    ApiError,
    { file: File; folder?: string }
  >({
    mutationFn: ({ file, folder }) => uploadService.uploadSingle(file, folder),
  });
};
