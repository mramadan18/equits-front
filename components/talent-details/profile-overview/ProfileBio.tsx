"use client";

import { MdVerified } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import Link from "next/link";
import { User, UserType } from "@/types/api";
import { MainRoutes } from "@/types";
import { useTranslations } from "next-intl";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export const ProfileBio = ({
  talent,
  isOwnProfile,
}: {
  talent: User;
  isOwnProfile: boolean;
}) => {
  const t = useTranslations("TalentDetails");
  const ts = useTranslations("Settings");

  const socialLinks = [
    {
      url: talent?.linkedinUrl,
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
      hoverColor: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      url: talent?.youtubeUrl,
      icon: <FaYoutube />,
      label: "YouTube",
      hoverColor: "hover:bg-[#FF0000] hover:text-white",
    },
    {
      url: talent?.instagramUrl,
      icon: <FaInstagram />,
      label: "Instagram",
      hoverColor: "hover:bg-[#E4405F] hover:text-white",
    },
    {
      url: talent?.facebookUrl,
      icon: <FaFacebookF />,
      label: "Facebook",
      hoverColor: "hover:bg-[#1877F2] hover:text-white",
    },
  ].filter((link) => link.url);

  return (
    <div className="mt-20 md:mt-24 w-full">
      {/* Name, Verified, & Type Badge */}
      <div className="flex items-center gap-3 mb-1.5">
        <h1 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
          {talent?.firstName} {talent?.lastName}
        </h1>
        {talent?.isTrusted ? (
          <MdVerified className="text-primary text-2xl md:text-3xl flex-shrink-0" />
        ) : (
          <MdVerified className="text-gray4 text-2xl md:text-3xl flex-shrink-0" />
        )}
        {talent?.userType && (
          <span className="px-3 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold text-xs rounded-full border border-primary/20 tracking-wide uppercase">
            {talent?.userType === UserType.INVESTOR && "INVS"}
            {talent?.userType === UserType.TALENT && "TLNT"}
          </span>
        )}
      </div>

      {/* Job Title & Company */}
      <div className="flex items-center gap-1.5 flex-wrap mb-4 text-gray2">
        {talent?.experienceLevel && (
          <span className="font-medium">
            {ts(`jobTitleForm.levels.${talent.experienceLevel}`)}
          </span>
        )}
        {talent?.experienceLevel && talent?.jobTitle && (
          <span className="text-gray4">·</span>
        )}
        {talent?.jobTitle && (
          <span className="font-medium">{talent?.jobTitle}</span>
        )}
        {(talent?.company || talent?.companyLink) && (
          <>
            {talent?.jobTitle && <span className="text-gray4">@</span>}
            {talent?.companyLink ? (
              <Link
                href={`${talent?.companyLink}`}
                target="_blank"
                className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {talent?.company}
              </Link>
            ) : (
              <span className="font-medium">{talent?.company}</span>
            )}
          </>
        )}
        {!talent?.company && !talent?.jobTitle && isOwnProfile && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <BsBuildings className="text-lg text-primary" />
            </div>
            <Link
              href={MainRoutes.SETTINGS_JOB_TITLE}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-2"
            >
              Add your job title
            </Link>
          </div>
        )}
        {!talent?.company && !talent?.jobTitle && !isOwnProfile && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <BsBuildings className="text-lg text-primary" />
            </div>
            <span className="font-medium">{t("noCompany")}</span>
          </div>
        )}
      </div>

      {/* Info pills: Education & Location */}
      <div className="flex flex-col gap-2.5 mb-5">
        {talent?.educationCertificates &&
          talent?.educationCertificates.length > 0 &&
          talent?.educationCertificates.map((education, index) => (
            <div key={index} className="flex items-center gap-2.5 text-gray2">
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                <PiCertificateBold className="text-lg text-primary" />
              </div>
              <span className="text-sm font-medium leading-snug">
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

        {talent?.country && talent?.city ? (
          <div className="flex items-center gap-2.5 text-gray2">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <IoLocationOutline className="text-lg text-primary" />
            </div>
            <span className="text-sm font-medium">
              {talent?.country?.name}, {talent?.city?.name}
            </span>
          </div>
        ) : isOwnProfile ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <IoLocationOutline className="text-lg text-primary" />
            </div>
            <Link
              href={MainRoutes.SETTINGS_CONTACT_INFO}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-2"
            >
              {t("addLocation")}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-gray2">
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <IoLocationOutline className="text-lg text-primary" />
            </div>
            <span className="text-sm font-medium">{t("noLocation")}</span>
          </div>
        )}
      </div>

      {/* Social Media Links */}
      {socialLinks.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url!}
              target="_blank"
              aria-label={social.label}
              className={`w-9 h-9 rounded-full bg-gray3 flex items-center justify-center text-gray2 transition-all duration-300 hover:scale-110 hover:shadow-md ${social.hoverColor}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
