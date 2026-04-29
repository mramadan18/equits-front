import { SVGProps } from "react";

export enum AuthRoutes {
  REGISTER = "/register",
  LOGIN = "/login",
  VERIFY_EMAIL = "/verify-email",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  VERIFY_RESET_OTP = "/verify-reset-otp",
}

export enum MainRoutes {
  LANDING = "/",
  HOME = "/home",
  EXPLORE = "/explore",
  REPO = "/repo",
  TALENTS = "/talents",
  SERVICES = "/services",
  BOOST = "/boost",
  PROJECTS = "/projects",
  NEW_PROJECT = "/projects/new",
  DRAFT_PROJECTS = "/projects/draft",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
