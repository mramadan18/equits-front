"use client";

import { Avatar, Divider, Modal, useDisclosure } from "@heroui/react";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { Project } from "@/types/api";
import { RatingStars } from "../shared/RatingStars";

import { useTranslations } from "next-intl";
import { useLikeProject } from "@/hooks/api/useProject";
import { useState, useEffect } from "react";
import { VideoCommentsModal } from "./VideoCommentsModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthRequiredModal } from "../layout/AuthRequiredModal";

interface IdeaEngagementProps {
  project: Project;
}

export function IdeaEngagement({ project }: IdeaEngagementProps) {
  const t = useTranslations("ProjectDetails.engagement");
  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onOpenChange: onCommentsOpenChange,
  } = useDisclosure();

  const {
    isOpen: isAuthOpen,
    onOpen: onAuthOpen,
    onOpenChange: onAuthOpenChange,
  } = useDisclosure();

  const { user } = useAuthStore();

  const [isLiked, setIsLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likesCount || 0);

  useEffect(() => {
    setIsLiked(project.isLiked);
    setLikesCount(project.likesCount || 0);
  }, [project.isLiked, project.likesCount]);

  const { mutate: toggleLike, isPending } = useLikeProject();

  const handleLikeToggle = () => {
    if (!user) {
      onAuthOpen();
      return;
    }
    // Optimistic update
    const previousIsLiked = isLiked;
    const previousCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount(previousCount + (previousIsLiked ? -1 : 1));

    toggleLike(project.id, {
      onError: () => {
        setIsLiked(previousIsLiked);
        setLikesCount(previousCount);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4 sm:mt-2">
      <div className="flex items-center gap-2 sm:gap-4 sm:mt-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {project?.likes && project.likes.length > 0 && (
            <div className="flex items-center -space-x-2">
              {project.likes.slice(0, 3).map((like, index) => (
                <div
                  key={index}
                  className="relative"
                  title={`${like.user?.firstName} ${like.user?.lastName}`}
                >
                  <Avatar
                    src={like.user?.avatar || undefined}
                    name={`${like.user?.firstName} ${like.user?.lastName}`}
                    size="sm"
                    className="ring-2 ring-white w-5 h-5 sm:w-8 sm:h-8"
                  />
                </div>
              ))}
              {project.likesCount > 3 && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] sm:text-xs font-semibold text-gray border border-white ml-1">
                  +{project.likesCount - 3}
                </div>
              )}
            </div>
          )}
        </div>
        <span className="text-xs sm:text-base font-semibold text-gray2">
          {likesCount} {t("likes")} . {project.commentsCount} {t("comments")}
        </span>
      </div>

      <Divider className="m-0 bg-gray-200" />

      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-6 sm:gap-12">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 font-semibold transition-colors ${
              isLiked ? "text-primary" : "text-gray-600 hover:text-primary"
            } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <FiHeart
              className={`w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5] ${isLiked ? "fill-primary" : ""}`}
            />
            <span className="text-sm sm:text-lg">{t("like")}</span>
          </button>
          <button
            onClick={onCommentsOpen}
            className="flex items-center gap-2 text-gray-600 font-semibold hover:text-[#8ac760] transition-colors"
          >
            <FiMessageSquare className="w-5 h-5 sm:w-7 sm:h-7 text-[#8ac760] stroke-[2.5]" />
            <span className="text-sm sm:text-lg">{t("comments")}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-5xl font-black text-black">
            {project?.rating || "0.0"}
          </span>
          <div className="flex flex-col gap-0">
            <RatingStars rating={Number(project?.rating || 0)} />
            <span className="text-[10px] sm:text-sm font-bold text-gray-400">
              {project?.reviewsCount || 0} {t("reviews")}
            </span>
          </div>
        </div>
      </div>

      <Divider className="mb-4 bg-gray-200" />

      <Modal
        isOpen={isCommentsOpen}
        onOpenChange={onCommentsOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <VideoCommentsModal project={project} />
      </Modal>

      <AuthRequiredModal isOpen={isAuthOpen} onOpenChange={onAuthOpenChange} />
    </div>
  );
}
