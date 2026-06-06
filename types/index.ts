export * from "./project";
export * from "./api";
export * from "./error";
export * from "./filters";
export * from "./engagement";
export * from "./profile";

// Explicitly re-export ServiceArea from api to resolve conflict
export { ServiceArea } from "./api";

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
  INTERESTS = "/interests",
  SERVICES = "/services",
  BOOST = "/boost",
  PROJECTS = "/projects",
  NEW_PROJECT = "/projects/new",
  SETTINGS = "/settings",
  SETTINGS_ACCOUNT = "/settings/account",
  SETTINGS_JOB_TITLE = "/settings/jobtitle",
  SETTINGS_OVERVIEW = "/settings/overview",
  SETTINGS_EDUCATION = "/settings/education",
  SETTINGS_CONTACT_INFO = "/settings/contactinfo",
  SAVED = "/saved",
  NOTIFICATIONS = "/notifications",
  HELP = "/help-center",
  BLOG = "/blog",
  GUIDES = "/guides",
  ABOUT = "/about",
  CONTACT = "/contact",
  TERMS = "/terms",
  PRIVACY = "/privacy",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
