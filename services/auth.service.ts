import {
  ApiResponse,
  AuthResponse,
  SuccessResponse,
  User,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateMeRequest,
  ChangePasswordRequest,
} from "../types/api";
import apiClient from "./api-client";

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },
  register: async (
    data: RegisterRequest,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
  getMe: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data.data;
  },
  googleLogin: async (code: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post("/auth/google-login", {
      idToken: code,
    });
    return response.data;
  },
  verifyEmail: async (otp: string): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.post("/auth/verify-email", { otp });
    return response.data;
  },
  resendVerifyEmail: async (): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.post("/auth/verify-email/resend");
    return response.data;
  },
  forgotPassword: async (
    email: string,
  ): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },
  verifyForgotPasswordOtp: async (
    otp: string,
  ): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.post("/auth/forgot-password/verify", {
      otp,
    });
    return response.data;
  },
  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.patch("/auth/forgot-password/reset", data);
    return response.data;
  },
  updateMe: async (data: UpdateMeRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch("/auth/update-me", data);
    return response.data;
  },
  changePassword: async (
    data: ChangePasswordRequest,
  ): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.patch("/auth/change-password", data);
    return response.data;
  },
  logout: async (): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },
  deleteMe: async (): Promise<ApiResponse<SuccessResponse>> => {
    const response = await apiClient.delete("/auth/delete-me");
    return response.data;
  },
};
