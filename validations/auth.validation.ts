import { z } from "zod";

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(8, t("passwordMin")),
  });

export const getRegisterSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(2, t("firstNameMin")).max(16, t("firstNameMax")),
    lastName: z.string().min(2, t("lastNameMin")).max(16, t("lastNameMax")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(8, t("passwordMin")),
  });

export const getForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
  });

export const getVerifyEmailSchema = (t: (key: string) => string) =>
  z.object({
    otp: z.string().length(6, t("otpLength")),
  });

export const getResetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

export const getChangePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      oldPassword: z.string().min(1, t("oldPasswordRequired")),
      newPassword: z.string().min(8, t("passwordMin")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

export type LoginInput = z.infer<ReturnType<typeof getLoginSchema>>;
export type RegisterInput = z.infer<ReturnType<typeof getRegisterSchema>>;
export type ForgotPasswordInput = z.infer<
  ReturnType<typeof getForgotPasswordSchema>
>;
export type VerifyEmailInput = z.infer<ReturnType<typeof getVerifyEmailSchema>>;
export type ResetPasswordInput = z.infer<
  ReturnType<typeof getResetPasswordSchema>
>;
export type ChangePasswordInput = z.infer<
  ReturnType<typeof getChangePasswordSchema>
>;
