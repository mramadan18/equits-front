import { SVGProps } from "react";

export enum AuthRoutes {
  REGISTER = "/register",
  LOGIN = "/login",
  VERIFY_EMAIL = "/verify-email",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  CHANGE_PASSWORD = "/change-password",
}

export enum MainRoutes {
  HOME = "/",
  EXPLORE = "/explore",
  TALENTS = "/talents",
  SERVICES = "/services",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
