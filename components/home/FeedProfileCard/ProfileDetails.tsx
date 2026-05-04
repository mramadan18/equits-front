import { IoLocationOutline } from "react-icons/io5";
import { PiCertificateBold } from "react-icons/pi";
import { User } from "@/types/api";

export const ProfileDetails = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col gap-3.5 mb-4 text-sm text-gray2">
      {user?.educationCertificates &&
        user?.educationCertificates?.length > 0 && (
          <div className="flex items-center gap-3">
            <PiCertificateBold className="text-gray2 shrink-0" size={24} />
            <div>
              <span>
                {user?.educationCertificates[0].degree.charAt(0).toUpperCase() +
                  user?.educationCertificates[0].degree.slice(1).toLowerCase()}
              </span>
              <span> of </span>
              <span>{user?.educationCertificates[0].faculty}</span>
              {", "}
              <span>{user?.educationCertificates[0].university}</span>
            </div>
          </div>
        )}
      {user?.country && user?.city && (
        <div className="flex items-center gap-2">
          <IoLocationOutline className="w-5 h-5 text-gray2" />
          <span>{user?.country?.name},</span>
          <span>{user?.city?.name}</span>
        </div>
      )}
    </div>
  );
};
