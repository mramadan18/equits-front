import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
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
import { useAuthStore } from "@/stores/useAuthStore";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation<ApiResponse<AuthResponse>, ApiError, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.data.user);
      queryClient.setQueryData(queryKeys.me, response.data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.status });
    },
  });
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation<ApiResponse<AuthResponse>, ApiError, string>({
    mutationFn: (code: string) => authService.googleLogin(code),
    onSuccess: (response) => {
      setUser(response.data.user);
      queryClient.setQueryData(queryKeys.me, response.data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.status });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation<ApiResponse<AuthResponse>, ApiError, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      setUser(response.data.user);
      queryClient.setQueryData(queryKeys.me, response.data.user);
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.status });
    },
  });
};

export const useMe = (options?: { enabled?: boolean }) => {
  return useQuery<User, ApiError>({
    queryKey: queryKeys.me,
    queryFn: () => authService.getMe(),
    retry: false,
    ...options,
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<SuccessResponse>, ApiError, string>({
    mutationFn: (otp: string) => authService.verifyEmail(otp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.status });
    },
  });
};

export const useResendVerifyEmail = () => {
  return useMutation<ApiResponse<SuccessResponse>, ApiError, void>({
    mutationFn: () => authService.resendVerifyEmail(),
  });
};

export const useForgotPassword = () => {
  return useMutation<ApiResponse<SuccessResponse>, ApiError, string>({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation<ApiResponse<SuccessResponse>, ApiError, string>({
    mutationFn: (otp: string) => authService.verifyForgotPasswordOtp(otp),
  });
};

export const useResetPassword = () => {
  return useMutation<ApiResponse<AuthResponse>, ApiError, ResetPasswordRequest>(
    {
      mutationFn: (data: ResetPasswordRequest) =>
        authService.resetPassword(data),
    },
  );
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateMeRequest>({
    mutationFn: (data: UpdateMeRequest) => authService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
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
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation<ApiResponse<SuccessResponse>, ApiError, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logoutStore();
    },
  });
};

export const useDeleteMe = () => {
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation<ApiResponse<SuccessResponse>, ApiError, void>({
    mutationFn: () => authService.deleteMe(),
    onSuccess: () => {
      logoutStore();
    },
  });
};

