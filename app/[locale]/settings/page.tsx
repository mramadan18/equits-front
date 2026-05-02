import { MainRoutes } from "@/types";
import { redirect } from "next/navigation";

export default function SettingsRootPage() {
  redirect(MainRoutes.SETTINGS_OVERVIEW);
}
