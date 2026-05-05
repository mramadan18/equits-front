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
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRatingSchema,
  RatingInput,
} from "@/validations/engagement.validation";
import { useRateProject } from "@/hooks/api/useProject";

interface RatingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  projectId: number | string;
}

export function RatingModal({
  isOpen,
  onOpenChange,
  projectId,
}: RatingModalProps) {
  const t = useTranslations("Engagement");
  const { mutate: rateProject, isPending } = useRateProject();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RatingInput>({
    resolver: zodResolver(getRatingSchema(t)),
    defaultValues: {
      score: 0,
      feedback: "",
    },
  });

  const onSubmit = (data: RatingInput) => {
    rateProject(
      { id: projectId, ...data },
      {
        onSuccess: (response) => {
          addToast({
            title: response.message || t("ratingModal.success"),
            color: "success",
          });
          reset();
          onOpenChange();
        },
        onError: (error) => {
          addToast({
            title: error.response?.data?.message || t("ratingModal.error"),
            color: "danger",
          });
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 pb-4 pt-6 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t("ratingModal.title")}
              </h2>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6 py-6">
              <div className="flex flex-col items-center gap-4">
                <label className="text-base font-medium text-default-700">
                  {t("ratingModal.scoreLabel")}
                </label>
                <Controller
                  name="score"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col items-center gap-2">
                      <Rating
                        value={field.value}
                        onChange={field.onChange}
                        style={{ maxWidth: 200 }}
                        itemStyles={{
                          itemShapes: RoundedStar,
                          activeFillColor: "#facc15",
                          inactiveFillColor: "#e4e4e7",
                        }}
                        className="transition-transform hover:scale-105"
                      />
                      {errors.score && (
                        <span className="text-xs text-danger font-medium mt-1">
                          {errors.score.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="feedback"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label={t("ratingModal.feedbackLabel")}
                    placeholder={t("ratingModal.feedbackPlaceholder")}
                    variant="faded"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-sm font-medium text-default-700",
                      input: "min-h-[120px] resize-y",
                    }}
                    isInvalid={!!errors.feedback}
                    errorMessage={errors.feedback?.message}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter className="flex justify-end gap-3 pb-6 pt-4">
              <Button
                variant="flat"
                color="default"
                onPress={onClose}
                className="font-medium px-6"
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                type="submit"
                className="text-white font-semibold shadow-md shadow-secondary/20 px-8"
                isLoading={isPending}
              >
                {t("ratingModal.submit")}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
