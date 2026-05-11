"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Button,
  addToast,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCommentSchema,
  CommentInput,
} from "@/validations/engagement.validation";
import { useCommentOnProject } from "@/hooks/api/useProject";

interface CommentModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  projectId: number | string;
}

export function CommentModal({
  isOpen,
  onOpenChange,
  projectId,
}: CommentModalProps) {
  const t = useTranslations("Engagement");
  const { mutate: postComment, isPending } = useCommentOnProject();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentInput>({
    resolver: zodResolver(getCommentSchema(t)),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: CommentInput) => {
    postComment(
      { id: projectId, content: data.content },
      {
        onSuccess: (response) => {
          addToast({
            title: response.message || t("commentModal.success"),
            color: "success",
          });
          reset();
          onOpenChange();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>{t("commentModal.title")}</ModalHeader>
            <ModalBody>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label={t("commentModal.contentLabel")}
                    placeholder={t("commentModal.contentPlaceholder")}
                    variant="bordered"
                    minRows={4}
                    isInvalid={!!errors.content}
                    errorMessage={errors.content?.message}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                className="font-semibold"
                isLoading={isPending}
              >
                {t("commentModal.submit")}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
