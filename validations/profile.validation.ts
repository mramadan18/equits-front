import { z } from "zod";
import { UserType, ExperienceLevel, EducationDegree } from "@/types/api";

export const getUpdateOverviewSchema = (t: any) =>
  z.object({
    firstName: z.string().min(2, t("firstNameMin")).max(16, t("firstNameMax")),
    lastName: z.string().min(2, t("lastNameMin")).max(16, t("lastNameMax")),
    userType: z.nativeEnum(UserType, {
      message: t("userTypeRequired"),
    }),
    overview: z.string().min(10, t("overviewMin")).max(500, t("overviewMax")),
    videoLink: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
  });

export type UpdateOverviewFormData = z.infer<
  ReturnType<typeof getUpdateOverviewSchema>
>;

export const getUpdateJobTitleSchema = (t: any) =>
  z.object({
    jobTitle: z.string().min(2, t("jobTitleMin")).max(50, t("jobTitleMax")),
    experienceLevel: z.nativeEnum(ExperienceLevel, {
      message: t("experienceLevelRequired"),
    }),
    company: z.string().optional().or(z.literal("")),
    companyLink: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
  });

export type UpdateJobTitleFormData = z.infer<
  ReturnType<typeof getUpdateJobTitleSchema>
>;

export const getEducationCertificateSchema = (t: any) =>
  z.object({
    university: z.string().min(1, t("universityRequired")),
    degree: z.nativeEnum(EducationDegree, {
      message: t("degreeRequired"),
    }),
    faculty: z.string().min(1, t("facultyRequired")),
    programLink: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
    startDate: z.string().min(1, t("startDateRequired")),
    endDate: z.string().optional().nullable(),
    present: z.boolean(),
  });

export const getUpdateEducationSchema = (t: any) =>
  z.object({
    certificates: z.array(getEducationCertificateSchema(t)),
  });

export type UpdateEducationFormData = z.infer<
  ReturnType<typeof getUpdateEducationSchema>
>;

export const getUpdateContactSchema = (t: any) =>
  z.object({
    contactEmail: z
      .string()
      .email(t("emailInvalid"))
      .optional()
      .or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    facebookUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
    linkedinUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
    instagramUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
    youtubeUrl: z.string().url(t("invalidUrl")).optional().or(z.literal("")),
  });

export type UpdateContactFormData = z.infer<
  ReturnType<typeof getUpdateContactSchema>
>;
