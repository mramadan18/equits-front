"use client";

// import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { Project } from "@/types/api";
import RatingStars from "../shared/RatingStars";

import { useTranslations } from "next-intl";
import { useLikeProject } from "@/hooks/api/useProject";
import { addToast } from "@heroui/toast";
import { useState, useEffect } from "react";
import { Modal, useDisclosure } from "@heroui/modal";
import { VideoCommentsModal } from "./VideoCommentsModal";

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

  const [isLiked, setIsLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likesCount || 0);

  useEffect(() => {
    setIsLiked(project.isLiked);
    setLikesCount(project.likesCount || 0);
  }, [project.isLiked, project.likesCount]);

  const { mutate: toggleLike, isPending } = useLikeProject();

  const handleLikeToggle = () => {
    // Optimistic update
    const previousIsLiked = isLiked;
    const previousCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount(previousCount + (previousIsLiked ? -1 : 1));

    toggleLike(project.id, {
      onError: (err) => {
        // Rollback on error
        setIsLiked(previousIsLiked);
        setLikesCount(previousCount);

        addToast({
          title: err.response?.data?.message || "Failed to update like",
          color: "danger",
        });
      },
    });
  };

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
          {likesCount} {t("likes")} . {project.commentsCount} {t("comments")}
        </span>
      </div>

      <Divider className="my-1 bg-gray-200" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2.5 font-semibold transition-colors ${
              isLiked ? "text-primary" : "text-dark hover:text-primary"
            } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <FiHeart
              className={`w-6 h-6 stroke-[2.5] ${isLiked ? "fill-primary" : ""}`}
            />
            <span className="text-lg">{t("like")}</span>
          </button>
          <button
            onClick={onCommentsOpen}
            className="flex items-center gap-2.5 text-dark font-semibold hover:text-[#8ac760] transition-colors"
          >
            <FiMessageSquare className="w-6 h-6 text-[#8ac760] stroke-[2.5]" />
            <span className="text-lg">{t("comments")}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-dark">
            {project?.rating || "0.0"}
          </span>
          <div className="flex flex-col gap-0.5 mt-1">
            <RatingStars rating={Number(project?.rating || 0)} />
            <span className="text-xs font-semibold text-gray">
              {project?.reviewsCount || 0} {t("reviews")}
            </span>
          </div>
        </div>
      </div>

      <Divider className="my-1 bg-gray-200" />

      <Modal
        isOpen={isCommentsOpen}
        onOpenChange={onCommentsOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <VideoCommentsModal project={project} />
      </Modal>
    </div>
  );
}
