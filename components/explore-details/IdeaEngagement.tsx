"use client";

import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";

export function IdeaEngagement() {
  const t = useTranslations("ExploreDetails");

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center gap-4">
        <AvatarGroup max={3} size="sm" isBordered className="justify-start">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </AvatarGroup>
        <span className="text-sm font-medium text-gray">
          68 Likes . 27 Comments
        </span>
      </div>

      <Divider className="my-1 bg-gray-200" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6 sm:gap-8">
          <button className="flex items-center gap-2.5 text-dark font-semibold hover:text-primary transition-colors">
            <FiHeart className="w-6 h-6 stroke-[2.5]" />
            <span className="text-lg">Like</span>
          </button>
          <button className="flex items-center gap-2.5 text-dark font-semibold hover:text-[#8ac760] transition-colors">
            <FiMessageSquare className="w-6 h-6 text-[#8ac760] stroke-[2.5]" />
            <span className="text-lg">Comment</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-dark">4.8</span>
          <div className="flex flex-col gap-0.5 mt-1">
            <div className="flex items-center gap-1 text-secondary">
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-xs font-semibold text-gray">28 reviews</span>
          </div>
        </div>
      </div>

      <Divider className="my-1 bg-gray-200" />
    </div>
  );
}
