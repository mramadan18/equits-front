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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { useInView } from "react-intersection-observer";
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

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
                        {dayjs(comment.createdAt).fromNow()}
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
            <div ref={ref} className="flex justify-center mt-4 min-h-[40px]">
              {isFetchingNextPage && <Spinner size="sm" />}
            </div>
          )}
        </div>
      </ModalBody>
    </ModalContent>
  );
}
