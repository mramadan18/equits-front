import { Project } from "@/types/api";
import { formatCurrency } from "@/utils";
import { Button } from "@heroui/button";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import moment from "moment";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import Link from "next/link";
import { MainRoutes } from "@/types";

export const FeedIdeaCard = ({ idea }: { idea: Project }) => {
  return (
    <div className="bg-white rounded-xl border border-gray2 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray2">
          Updated {moment(idea.updatedAt).fromNow()}
        </span>
        <Button
          isIconOnly
          radius="full"
          variant="light"
          className="text-gray2 transition-colors"
        >
          <FaRegBookmark size={24} />
        </Button>
      </div>

      {/* Main Body */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <Link
          href={`${MainRoutes.PROJECTS}/${idea.id}`}
          className="relative w-full md:w-56 h-48 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border"
        >
          <Image
            src={`${idea?.cover}`}
            alt={`${idea?.title}`}
            fill
            className="object-cover"
          />
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Title & Stage */}
          <Link
            href={`${MainRoutes.PROJECTS}/${idea.id}`}
            className="flex items-center gap-3 mb-3"
          >
            <h3 className="text-xl font-semibold text-dark leading-tight">
              {idea.title}
            </h3>
            <span className="px-3 py-1 bg-gray3 text-dark text-xs font-medium rounded-full">
              {idea.stage}
            </span>
          </Link>

          {/* Description */}
          <p className="text-sm font-medium text-gray2 leading-relaxed text-wrap break-all mb-6">
            {idea.elevatorPitch}
          </p>

          {/* Bottom Bar (Stats & Ask) */}
          <div className="flex justify-between items-end mt-auto pt-2 border-t border-transparent">
            {/* Social Stats */}
            <div className="flex items-center gap-2">
              <AvatarGroup isBordered max={3}>
                {idea?.likes?.map((like) => (
                  <Avatar
                    key={like.user.id}
                    src={`${like.user?.avatar}`}
                    name={`${like.user?.firstName} ${like.user?.lastName}`}
                    alt={`${like.user?.firstName} ${like.user?.lastName}`}
                    fallback={`${like.user?.firstName} ${like.user?.lastName}`}
                  />
                ))}
              </AvatarGroup>
              <div className="text-xs text-gray2 font-medium ml-2">
                {idea?.likesCount} Likes{" "}
                <span className="mx-1.5 font-bold">·</span>{" "}
                {idea?.commentsCount} Comments
              </div>
            </div>

            {/* Funding Ask */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-dark">
                {formatCurrency(idea?.fundingAsk || 0)}
              </span>
              <span className="text-sm text-gray2 font-medium mb-1">
                Funding Ask
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
