import { IoLocationOutline } from "react-icons/io5";
import { PiCertificateBold } from "react-icons/pi";
import { User } from "@/types/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { MdAddCircleOutline } from "react-icons/md";
import { formatEnum } from "@/utils/formatters";

export const ProfileDetails = ({ user }: { user: User | null }) => {
  const t = useTranslations("FeedProfileCard");

  return (
    <div className="flex flex-col gap-3.5 mb-4 text-sm text-gray2">
      {user?.educationCertificates &&
      user?.educationCertificates?.length > 0 ? (
        <div className="flex items-center gap-3">
          <PiCertificateBold className="text-gray2 shrink-0" size={24} />
          <div>
            <span>{formatEnum(user?.educationCertificates[0].degree)}</span>
            <span> of </span>
            <span>{user?.educationCertificates[0].faculty}</span>
            {", "}
            <span>{user?.educationCertificates[0].university}</span>
          </div>
        </div>
      ) : (
        <Link
          href={MainRoutes.SETTINGS_EDUCATION}
          className="text-primary text-xs hover:underline font-medium flex items-center gap-1"
        >
          <MdAddCircleOutline className="text-lg shrink-0" />
          {t("addEducation")}
        </Link>
      )}

      {user?.country && user?.city ? (
        <div className="flex items-center gap-2">
          <IoLocationOutline className="w-5 h-5 text-gray2" />
          <span>{user?.country?.name},</span>
          <span>{user?.city?.name}</span>
        </div>
      ) : (
        <Link
          href={MainRoutes.SETTINGS_CONTACT_INFO}
          className="text-primary text-xs hover:underline font-medium flex items-center gap-1"
        >
          <MdAddCircleOutline className="text-lg shrink-0" />
          {t("addContactInfo")}
        </Link>
      )}
    </div>
  );
};
