import {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "../validations/auth.validation";

export type MessageKey =
  | "welcome"
  | "registerSuccess"
  | "loginSuccess"
  | "userNotFound"
  | "invalidCredentials"
  | "unauthorized"
  | "internalServerError"
  | "validationError"
  | "googleLoginSuccess"
  | "emailVerified"
  | "operationSuccess"
  | "passwordResetSuccess"
  | "verificationEmailSent"
  | "forgotPasswordOtpSent"
  | "profileRetrieved"
  | "profileUpdated"
  | "passwordUpdated"
  | "logoutSuccess"
  | "invalidGoogleToken"
  | "userAlreadyExists"
  | "invalidOtp"
  | "emptyCredentials"
  | "incorrectCredentials"
  | "noUserWithEmail"
  | "emailError"
  | "emailAlreadyVerified"
  | "passwordUpdateRouteError"
  | "currentPasswordIncorrect"
  | "recordNotFound"
  | "invalidReference"
  | "databaseError"
  | "somethingWentWrong";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  googleId?: string | null;
  isEmailVerified: boolean;
  isTrusted: boolean;
  avatar?: string | null;
  cover?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  isTalent: boolean;
  isInvestor: boolean;
  about?: string | null;
  address?: string | null;
  universityId?: number | null;
  createdAt: string;
  updatedAt: string;
  role: "USER" | "ADMIN";
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string | MessageKey;
  data: T;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SuccessResponse {
  message: string | MessageKey;
}

export type LoginRequest = LoginInput;
export type RegisterRequest = RegisterInput;
export type ResetPasswordRequest = {
  otp: string;
  password: string;
  confirmPassword: string;
};
export type ChangePasswordRequest = ChangePasswordInput;
export type UpdateMeRequest = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt" | "role" | "email">
>;
