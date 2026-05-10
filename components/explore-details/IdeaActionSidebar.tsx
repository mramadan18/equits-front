"use client";

import { Button, addToast } from "@heroui/react";
import { useMultipleDisclosures } from "@/hooks/ui/useMultipleDisclosures";
import { useTranslations } from "next-intl";
import {
  FiMessageSquare,
  FiBookmark,
  FiExternalLink,
  FiVideo,
  FiShare2,
} from "react-icons/fi";
import { FaBookmark, FaStar, FaEdit } from "react-icons/fa";
import { RatingModal } from "./RatingModal";
import { CommentModal } from "./CommentModal";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { Project } from "@/types/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToggleWishlist } from "@/hooks/api/useWishlist";
import { RequestMeetingModal } from "../talent-details/RequestMeetingModal";
import { AuthRequiredModal } from "../layout/AuthRequiredModal";
import { useRouter } from "next/navigation";
import { MainRoutes } from "@/types";

export function IdeaActionSidebar({ project }: { project: Project }) {
  const { user } = useAuthStore();
  const t = useTranslations("Engagement");
  const ts = useTranslations("ProjectDetails.sidebar");
  const router = useRouter();

  const isOwner = user?.id === project?.ownerId;

  const { rating, comment, meeting, auth } = useMultipleDisclosures([
    "rating",
    "comment",
    "meeting",
    "auth",
  ] as const);

  const { mutate: toggleWishlist, isPending: isToggling } = useToggleWishlist();
  const isSaved = user?.wishlistIds?.includes(project.id);

  const handleToggleWishlist = () => {
    if (!user) {
      auth.onOpen();
      return;
    }
    toggleWishlist(project.id, {
      onSuccess: (response: any) => {
        addToast({
          title: response.message || "Updated wishlist",
          color: "success",
        });
      },
      onError: (error: any) => {
        addToast({
          title: error.message || "Failed to update wishlist",
          color: "danger",
        });
      },
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: project.title,
      text: project.tagline,
      url: window.location.href,
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast({
          title: ts("linkCopied") || "Link copied to clipboard",
          color: "success",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 mt-8 lg:mt-0">
      <div className="lg:sticky lg:top-28 flex flex-col gap-5">
        {isOwner && (
          <>
            <h3 className="text-sm font-semibold text-gray px-1">
              {ts("ownerActions") || "Owner Actions"}:
            </h3>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card flex flex-col gap-3.5">
              <Button
                variant="bordered"
                className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                startContent={
                  <FiShare2 className="w-5 h-5 text-primary mr-2" />
                }
                onPress={handleShare}
              >
                {ts("shareProject") || "Share Project"}
              </Button>
              <Button
                variant="bordered"
                className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                startContent={
                  <FaEdit className="w-5 h-5 text-secondary mr-2" />
                }
                onPress={() =>
                  router.push(`${MainRoutes.NEW_PROJECT}?id=${project.id}`)
                }
              >
                {ts("editProject") || "Edit Project"}
              </Button>
            </div>
          </>
        )}

        {!isOwner && (
          <>
            <h3 className="text-sm font-semibold text-gray px-1">
              {ts("actions")}:
            </h3>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-card flex flex-col gap-3.5">
              <Button
                variant="bordered"
                className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                startContent={
                  <FiShare2 className="w-5 h-5 text-primary mr-2" />
                }
                onPress={handleShare}
              >
                {ts("shareProject") || "Share Project"}
              </Button>

              <Button
                variant="bordered"
                className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                startContent={
                  <FaStar className="w-5 h-5 text-secondary mr-2" />
                }
                onPress={() => (user ? rating.onOpen() : auth.onOpen())}
              >
                {t("ratingTitle")}
              </Button>

              <Button
                variant="bordered"
                className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                startContent={
                  <FiMessageSquare className="w-5 h-5 text-[#8ac760] mr-2" />
                }
                onPress={() => (user ? comment.onOpen() : auth.onOpen())}
              >
                {t("commentTitle")}
              </Button>

              {project.projectUrl && (
                <Button
                  variant="bordered"
                  as="a"
                  href={project.projectUrl}
                  target="_blank"
                  className="w-full justify-start py-6 border-gray-200 text-dark2 font-semibold hover:bg-gray-50 transition-colors text-base"
                  startContent={
                    <FiExternalLink className="w-5 h-5 text-gray-400 mr-2" />
                  }
                >
                  {ts("demoLink")}
                </Button>
              )}

              <Button
                variant="bordered"
                className={`w-full justify-start py-6 border-gray-200 font-semibold hover:bg-gray-50 transition-all text-base ${
                  isSaved
                    ? "text-primary border-primary bg-primary/5"
                    : "text-dark2"
                }`}
                startContent={
                  isSaved ? (
                    <FaBookmark className="w-5 h-5 text-primary mr-2" />
                  ) : (
                    <FiBookmark className="w-5 h-5 text-gray-400 mr-2" />
                  )
                }
                isDisabled={isToggling}
                isLoading={isToggling}
                onClick={handleToggleWishlist}
              >
                {isSaved ? ts("saved") || "Saved" : ts("saveForLater")}
              </Button>

              <Button
                color="primary"
                className="w-full justify-start py-6 mt-1 font-semibold text-base shadow-md"
                startContent={<FiVideo className="w-5 h-5 mr-2" />}
                onPress={() => (user ? meeting.onOpen() : auth.onOpen())}
              >
                {ts("requestMeeting")}
              </Button>
            </div>
          </>
        )}

        <div className="flex items-center gap-3.5 px-1 mt-2">
          {project.facebookUrl && (
            <a
              href={project.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
          )}
          {project.instagramUrl && (
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          )}
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center hover:bg-blue-800 transition-colors shadow-sm"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-[#FF0000] text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={rating.isOpen}
        onOpenChange={rating.onOpenChange}
        projectId={project.id}
      />

      <CommentModal
        isOpen={comment.isOpen}
        onOpenChange={comment.onOpenChange}
        projectId={project.id}
      />

      {project.owner && (
        <RequestMeetingModal
          isOpen={meeting.isOpen}
          onOpenChange={meeting.onOpenChange}
          talent={project.owner}
          projectId={project.id}
        />
      )}

      <AuthRequiredModal
        isOpen={auth.isOpen}
        onOpenChange={auth.onOpenChange}
      />
    </div>
  );
}
