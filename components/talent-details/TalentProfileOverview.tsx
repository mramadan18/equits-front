import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { User, UserType } from "@/types/api";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { PiCertificateBold } from "react-icons/pi";

export const TalentProfileOverview = ({ talent }: { talent: User }) => {
  const t = useTranslations("TalentDetails");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 flex flex-col">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative">
        {talent?.cover && (
          <Image
            src={`${talent.cover}`}
            alt={`${talent.firstName} ${talent.lastName}`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative px-6 md:px-8 pb-8 flex flex-col pt-0">
        {/* Avatar */}
        <div className="absolute -top-16 md:-top-20 left-6 md:left-8 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md z-10 flex-shrink-0">
          <Avatar
            src={`${talent.avatar}`}
            alt={`${talent?.firstName} ${talent?.lastName}`}
            classNames={{ base: "object-cover w-full h-full" }}
            showFallback
          />
        </div>
        {/* Action Tags Top Right */}
        <div className="flex flex-col gap-2 absolute top-4 right-6 md:right-8 items-end">
          {talent?.userType && (
            <span className="px-4 py-1 bg-primary-100 text-primary font-semibold text-sm rounded-full w-min whitespace-nowrap">
              {talent.userType === UserType.INVESTOR && "INVS"}
              {talent.userType === UserType.TALENT && "TLNT"}
            </span>
          )}
        </div>
        {/* Profile Info */}
        <div className="mt-20 md:mt-24 w-full">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl md:text-2xl font-medium text-dark">
              {talent.firstName} {talent.lastName}
            </h1>
            {talent.isTrusted && (
              <MdVerified className="text-primary text-xl md:text-2xl" />
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            {talent.experienceLevel && (
              <p className="text-gray2 font-medium">
                {talent.experienceLevel?.charAt(0).toUpperCase() +
                  talent.experienceLevel?.slice(1).toLowerCase()}
              </p>
            )}
            <p className="text-gray2 font-medium">{talent.jobTitle}</p>
            {talent.companyLink ? (
              <Link
                href={`${talent.companyLink}`}
                target="_blank"
                className="text-gray2 font-medium underline hover:text-primary"
              >
                @ {talent.company}
              </Link>
            ) : (
              <p className="text-gray2 font-medium">@ {talent.company}</p>
            )}
          </div>

          {/* Location and Education Info */}
          <div className="flex flex-col gap-2 mb-8 text-gray2 font-medium">
            {talent.educationCertificates &&
              talent.educationCertificates.length > 0 && (
                <>
                  {talent.educationCertificates.map((education, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray2"
                    >
                      <PiCertificateBold className="text-xl text-gray2" />
                      <span>
                        {education.degree.charAt(0).toUpperCase() +
                          education.degree.slice(1).toLowerCase()}{" "}
                        of {education.faculty}, {education.university}
                      </span>
                    </div>
                  ))}
                </>
              )}
            <div className="flex items-center gap-2">
              <GrLocation className="text-xl text-gray2" />
              <span>{talent.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row flex-wrap items-center gap-4 mb-8">
            <Button
              color="primary"
              variant="solid"
              className="font-bold px-8 shadow-md"
              radius="sm"
              size="md"
              startContent={<FaVideo className="text-lg" />}
            >
              {t("requestMeeting")}
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="font-bold px-8 border-2"
              radius="sm"
              size="md"
              startContent={<IoPersonOutline className="text-lg" />}
            >
              {t("contact")}
            </Button>
          </div>

          <Divider className="my-6" />

          {/* About Section */}
          <div>
            <h2 className="text-lg md:text-xl font-medium text-dark mb-4">
              {t("about")}
            </h2>
            <p className="text-gray2 leading-relaxed font-medium">
              {talent.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
