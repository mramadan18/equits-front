"use client";

import { MdVerified } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";
import { User, UserType } from "@/types/api";

interface ProfileBioProps {
  talent: User;
}

export const ProfileBio = ({ talent }: ProfileBioProps) => {
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
            {talent?.experienceLevel?.charAt(0).toUpperCase() +
              talent?.experienceLevel?.slice(1).toLowerCase()}
          </p>
        )}
        <p className="text-gray2 font-medium">{talent?.jobTitle}</p>
        {talent?.companyLink ? (
          <Link
            href={`${talent?.companyLink}`}
            target="_blank"
            className="text-gray2 font-medium underline hover:text-primary"
          >
            @ {talent?.company}
          </Link>
        ) : (
          <p className="text-gray2 font-medium">@ {talent?.company}</p>
        )}
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
                    {education?.degree?.charAt(0).toUpperCase() +
                      education?.degree?.slice(1).toLowerCase()}{" "}
                    of {education?.faculty}, {education?.university}
                  </span>
                </div>
              ))}
            </>
          )}
        <div className="flex items-center gap-2">
          <GrLocation className="text-xl text-gray2" />
          <span>{talent?.address}</span>
        </div>
      </div>
    </div>
  );
};
