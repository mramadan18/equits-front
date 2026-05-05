"use client";

import {
  useCommentOnProject,
  useProjectCommentsInfinite,
} from "@/hooks/api/useProject";
import { Project } from "@/types/api";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
  Spinner,
  Textarea,
  Button,
  addToast,
} from "@heroui/react";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { IdeaVideoHero } from "./IdeaVideoHero";

export function VideoCommentsModal({ project }: { project: Project }) {
  const t = useTranslations("ProjectDetails.engagement");
  const tEngage = useTranslations("Engagement");
  const {
    data: commentsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectCommentsInfinite(project.id);

  const comments = commentsResponse?.pages.flatMap((page) => page.data) || [];
  const totalComments =
    (commentsResponse?.pages[0] as any)?.total || comments.length;

  const { mutate: postComment, isPending } = useCommentOnProject();
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    postComment(
      { id: project.id, content: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          addToast({
            title: tEngage("commentModal.success"),
            color: "success",
          });
        },
        onError: (error) => {
          addToast({
            title:
              error.response?.data?.message || tEngage("commentModal.error"),
            color: "danger",
          });
        },
      },
    );
  };

  return (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">{project.title}</ModalHeader>
      <ModalBody className="p-0">
        <div className="p-4 pt-0">
          <IdeaVideoHero project={project} />
        </div>

        <div className="px-4 pb-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">
            {t("comments")} ({totalComments})
          </h3>

          <div className="flex gap-3">
            <Textarea
              placeholder={tEngage("commentModal.contentPlaceholder")}
              value={newComment}
              onValueChange={setNewComment}
              minRows={2}
              variant="bordered"
            />
            <Button
              color="primary"
              className="self-end"
              isLoading={isPending}
              onPress={handlePostComment}
              isDisabled={!newComment.trim()}
              isIconOnly
            >
              <LuSendHorizontal size={20} className="rtl:rotate-180" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <Spinner size="lg" />
            </div>
          ) : comments.length > 0 ? (
            <div className="flex flex-col gap-4 mt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar
                    src={comment.user.avatar || undefined}
                    name={comment.user.firstName}
                  />
                  <div className="flex flex-col bg-gray-50 p-3 rounded-xl flex-1 border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">
                        {comment.user.firstName} {comment.user.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              {tEngage("commentModal.contentPlaceholder")}
            </p>
          )}

          {hasNextPage && (
            <div className="flex justify-center mt-2">
              <Button
                variant="flat"
                onPress={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                {t("showMore")}
              </Button>
            </div>
          )}
        </div>
      </ModalBody>
    </ModalContent>
  );
}
