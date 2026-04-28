import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiCertificateBold } from "react-icons/pi";

export const FeedProfileCard = ({ talent }: { talent: any }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray2 overflow-hidden shadow-sm">
      {/* Cover */}
      <div className="h-28 w-full relative bg-gray2">
        <Image
          src={talent.coverImage || "/images/idea-2.png"}
          alt="Cover"
          fill
          className="object-cover opacity-80"
        />
      </div>

      <div className="px-5 py-2 pb-4 relative">
        {/* Avatar & Header */}
        <div className="flex items-end gap-4 mb-5">
          {/* Avatar */}
          <div className="-mt-12 relative z-10 w-24 h-24 flex-shrink-0 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm">
            <Image
              src={talent.avatar || "/images/idea-1.png"}
              alt={talent.name}
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col flex-1 pb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xl font-medium text-dark">{talent.name}</h3>
              <MdVerified className="text-gray-400 text-xl" />
              <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full relative -top-2 ml-1">
                Soon
              </span>
            </div>
            <p className="text-sm text-gray2 mt-1">
              {talent.role} <span className="text-gray-400 font-normal">@</span>{" "}
              {talent.organization}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3.5 mb-8 text-sm text-gray2">
          <div className="flex items-center gap-3">
            <PiCertificateBold className="w-5 h-5 text-gray2" />
            <span>
              {talent.university || "Computer Science, Beni Suif University"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationOutline className="w-5 h-5 text-gray2" />
            <span>{talent.location}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-3">
          <Link href="#" className="text-sm text-primary underline w-fit">
            Complete Your Profile
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-2.5 flex-grow bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/5 rounded-full" />
            </div>
            <span className="text-sm font-medium text-primary">60 %</span>
          </div>
        </div>
      </div>
    </div>
  );
};
