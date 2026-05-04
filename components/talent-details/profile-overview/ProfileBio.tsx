"use client";

import { MdVerified } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import Link from "next/link";
import { User, UserType } from "@/types/api";
import { MainRoutes } from "@/types";
import { useTranslations } from "next-intl";
import { IoLocationOutline } from "react-icons/io5";

export const ProfileBio = ({
  talent,
  isOwnProfile,
}: {
  talent: User;
  isOwnProfile: boolean;
}) => {
  const t = useTranslations("TalentDetails");
  const ts = useTranslations("Settings");

  return (
    <div className="mt-20 md:mt-24 w-full">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-xl md:text-2xl font-medium text-dark">
          {talent?.firstName} {talent?.lastName}
        </h1>
        {talent?.isTrusted ? (
          <MdVerified className="text-primary text-xl md:text-2xl" />
        ) : (
          <MdVerified className="text-gray-400 text-xl md:text-2xl" />
        )}

        {talent?.userType && (
          <span className="px-4 py-1 bg-primary-100 text-primary font-semibold text-sm rounded-full w-min whitespace-nowrap">
            {talent?.userType === UserType.INVESTOR && "INVS"}
            {talent?.userType === UserType.TALENT && "TLNT"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-2">
        {talent?.experienceLevel && (
          <p className="text-gray2 font-medium">
            {ts(`jobTitleForm.levels.${talent.experienceLevel}`)}
          </p>
        )}
        <div className="flex items-center gap-2">
          {talent?.jobTitle && (
            <p className="text-gray2 font-medium">{talent?.jobTitle}</p>
          )}
          <div className="flex items-center gap-2">
            {talent?.companyLink ? (
              <Link
                href={`${talent?.companyLink}`}
                target="_blank"
                className="text-gray2 font-medium underline hover:text-primary"
              >
                {`@ ${talent?.company}`}
              </Link>
            ) : talent?.company ? (
              <p className="text-gray2 font-medium">{`@ ${talent?.company}`}</p>
            ) : isOwnProfile ? (
              <>
                <BsBuildings className="text-lg text-gray2" />
                <Link
                  href={MainRoutes.SETTINGS_JOB_TITLE}
                  className="text-gray2 font-medium underline hover:text-primary text-sm"
                >
                  {t("addCompany")}
                </Link>
              </>
            ) : (
              <>
                <BsBuildings className="text-lg text-gray2" />
                <p className="text-gray2 font-medium">{t("noCompany")}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Location and Education Info */}
      <div className="flex flex-col gap-2 mb-4 text-gray2 font-medium">
        {talent?.educationCertificates &&
          talent?.educationCertificates.length > 0 && (
            <>
              {talent?.educationCertificates.map((education, index) => (
                <div key={index} className="flex items-center gap-2 text-gray2">
                  <PiCertificateBold className="text-xl text-gray2" />
                  <span>
                    {t("educationInfo", {
                      degree:
                        education?.degree?.charAt(0).toUpperCase() +
                        education?.degree?.slice(1).toLowerCase(),
                      faculty: education?.faculty,
                      university: education?.university,
                    })}
                  </span>
                </div>
              ))}
            </>
          )}
        {talent?.country && talent?.city ? (
          <div className="flex items-center gap-2">
            <IoLocationOutline className="w-5 h-5 text-gray2" />
            <span>{talent?.country?.name},</span>
            <span>{talent?.city?.name}</span>
          </div>
        ) : isOwnProfile ? (
          <div className="flex items-center gap-2">
            <Link
              href={MainRoutes.SETTINGS_CONTACT_INFO}
              className="text-gray2 font-medium underline hover:text-primary"
            >
              {t("addLocation")}
            </Link>
          </div>
        ) : (
          <p className="text-gray2 font-medium">{t("noLocation")}</p>
        )}
      </div>
    </div>
  );
};
