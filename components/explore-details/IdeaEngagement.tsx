"use client";

// import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Project } from "@/types/api";

interface IdeaEngagementProps {
  project: Project;
}

export function IdeaEngagement({ project }: IdeaEngagementProps) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center gap-4">
        {/* {likesCount > 0 && (
          <AvatarGroup max={3} size="sm" isBordered className="justify-start">
            {project.likes
              ?.slice(0, 3)
              .map((like, index) => (
                <Avatar
                  key={index}
                  src={`${like.avatar}`}
                />
              ))}
          </AvatarGroup>
        )} */}
        <span className="text-sm font-medium text-gray">
          {project.likesCount} Likes . {project.commentsCount} Comments
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
          <span className="text-4xl font-extrabold text-dark">
            {project?.rating || "0.0"}
          </span>
          <div className="flex flex-col gap-0.5 mt-1">
            <div className="flex items-center gap-1 text-secondary">
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4" />
              <FaStar className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-xs font-semibold text-gray">
              {project?.reviewsCount || 0} reviews
            </span>
          </div>
        </div>
      </div>

      <Divider className="my-1 bg-gray-200" />
    </div>
  );
}
