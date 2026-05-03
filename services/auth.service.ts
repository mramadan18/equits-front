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
import apiClient, { unwrap } from "./api-client";

export const authService = {
  login: (data: LoginRequest): Promise<ApiResponse<AuthResponse>> =>
    unwrap(apiClient.post("/auth/login", data)),

  register: (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> =>
    unwrap(apiClient.post("/auth/register", data)),

  getMe: (): Promise<User> =>
    unwrap<ApiResponse<User>>(apiClient.get("/auth/me")).then(
      (res) => res.data,
    ),

  googleLogin: (code: string): Promise<ApiResponse<AuthResponse>> =>
    unwrap(apiClient.post("/auth/google-login", { idToken: code })),

  verifyEmail: (otp: string): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.post("/auth/verify-email", { otp })),

  resendVerifyEmail: (): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.post("/auth/verify-email/resend")),

  forgotPassword: (email: string): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.post("/auth/forgot-password", { email })),

  verifyForgotPasswordOtp: (
    otp: string,
  ): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.post("/auth/forgot-password/verify", { otp })),

  resetPassword: (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<AuthResponse>> =>
    unwrap(apiClient.patch("/auth/forgot-password/reset", data)),

  updateMe: (data: UpdateMeRequest): Promise<ApiResponse<User>> =>
    unwrap(apiClient.patch("/auth/update-me", data)),

  changePassword: (
    data: ChangePasswordRequest,
  ): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.patch("/auth/change-password", data)),

  logout: (): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.post("/auth/logout")),

  deleteMe: (): Promise<ApiResponse<SuccessResponse>> =>
    unwrap(apiClient.delete("/auth/delete-me")),
};
