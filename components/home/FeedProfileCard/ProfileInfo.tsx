import { MdVerified, MdAddCircleOutline } from "react-icons/md";
import { useTranslations } from "next-intl";
import { User } from "@/types/api";
import Link from "next/link";
import { MainRoutes } from "@/types";

export const ProfileInfo = ({ user }: { user: User | null }) => {
  const t = useTranslations("FeedProfileCard");

  return (
    <div className="flex flex-col flex-1 pb-1">
      <div className="flex items-center gap-1.5 flex-wrap">
        <h3 className="text-lg font-semibold text-dark">{`${user?.firstName} ${user?.lastName}`}</h3>
        <MdVerified className="text-gray-400 text-xl" />
        <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full relative -top-2 ml-1">
          {t("soon")}
        </span>
      </div>
      <div className="text-sm text-gray2 mt-1">
        {user?.jobTitle ? (
          <>
            {user?.jobTitle}{" "}
            {user?.company && (
              <>
                <span className="text-gray-400 font-normal">@</span>{" "}
                {user?.company}
              </>
            )}
          </>
        ) : (
          <Link
            href={MainRoutes.SETTINGS_JOB_TITLE}
            className="text-primary text-xs hover:underline font-medium flex items-center gap-1"
          >
            <MdAddCircleOutline className="text-lg shrink-0" />
            {t("addJobTitle")}
          </Link>
        )}
      </div>
    </div>
  );
};
