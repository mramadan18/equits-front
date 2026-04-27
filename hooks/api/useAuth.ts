import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateMeRequest,
  ApiResponse,
  AuthResponse,
  SuccessResponse,
  User,
} from "@/types/api";
import { ApiError } from "@/types/error";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, ApiError, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, ApiError, string>({
    mutationFn: (code: string) => authService.googleLogin(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, ApiError, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useMe = () => {
  return useQuery<User, ApiError>({
    queryKey: ["me"],
    queryFn: () => authService.getMe(),
    retry: false,
  });
};

export const useVerifyEmail = () => {
  return useMutation<ApiResponse<SuccessResponse>, ApiError, string>({
    mutationFn: (otp: string) => authService.verifyEmail(otp),
  });
};

export const useForgotPassword = () => {
  return useMutation<ApiResponse<SuccessResponse>, ApiError, string>({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
};

export const useResetPassword = () => {
  return useMutation<
    ApiResponse<AuthResponse>,
    ApiError,
    ResetPasswordRequest & { token: string }
  >({
    mutationFn: (data: ResetPasswordRequest & { token: string }) =>
      authService.resetPassword(data),
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateMeRequest>({
    mutationFn: (data: UpdateMeRequest) => authService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation<
    ApiResponse<SuccessResponse>,
    ApiError,
    ChangePasswordRequest
  >({
    mutationFn: (data: ChangePasswordRequest) =>
      authService.changePassword(data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SuccessResponse>, ApiError, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
  });
};
