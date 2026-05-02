import { IoLocationOutline } from "react-icons/io5";
import { PiCertificateBold } from "react-icons/pi";
import { User } from "@/types/api";

export const ProfileDetails = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col gap-3.5 mb-8 text-sm text-gray2">
      {user?.university && (
        <div className="flex items-center gap-3">
          <PiCertificateBold className="w-5 h-5 text-gray2" />
          <span>{user?.university?.name}</span>
        </div>
      )}
      {user?.address && (
        <div className="flex items-center gap-3">
          <IoLocationOutline className="w-5 h-5 text-gray2" />
          <span>{user?.address}</span>
        </div>
      )}
    </div>
  );
};
