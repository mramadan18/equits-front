"use client";

import { Divider } from "@heroui/divider";
import { User } from "@/types/api";

interface ProfileAboutProps {
  talent: User;
  t: (key: string) => string;
}

export const ProfileAbout = ({ talent, t }: ProfileAboutProps) => {
  return (
    <>
      <Divider className="mb-6" />
      <div>
        <h2 className="text-lg md:text-xl font-medium text-dark mb-4">
          {t("about")}
        </h2>
        <p className="text-gray2 leading-relaxed font-medium">
          {talent.overview}
        </p>
      </div>
    </>
  );
};
