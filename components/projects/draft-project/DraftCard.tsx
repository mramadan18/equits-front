"use client";

import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { useDeleteProject } from "@/hooks/api/useProject";
import { useDisclosure } from "@heroui/modal";
import { HiOutlineTrash } from "react-icons/hi";
import { ConfirmModal } from "@/components/shared/ConfirmModal";

interface DraftCardProps {
  draft: {
    id: number;
    title: string | null | undefined;
    currentStep: number;
  };
  onContinue: (id: number) => void;
}

export const DraftCard = ({ draft, onContinue }: DraftCardProps) => {
  const t = useTranslations("Drafts");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const handleDelete = () => {
    deleteProject(draft.id, {
      onSuccess: () => {
        onOpenChange();
      },
    });
  };

  return (
    <>
      <Card
        className="w-full max-w-sm border border-default-200 shadow-sm"
        shadow="sm"
      >
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
          <div className="flex w-full items-center justify-between gap-2">
            <h4 className="line-clamp-1 text-xl font-bold">
              {draft.title || t("card.defaultTitle", { id: draft.id })}
            </h4>
            <div className="flex items-center gap-2">
              <Chip color="warning" variant="flat" size="sm">
                {t("card.badge")}
              </Chip>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={onOpen}
              >
                <HiOutlineTrash size={18} />
              </Button>
            </div>
          </div>
          <p className="mt-1 text-small text-default-500">
            {t("card.description")}
          </p>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-default-100 p-3">
              <span className="text-sm font-medium">{t("card.progress")}</span>
              <span className="text-sm font-bold text-primary">
                {t("card.stepInfo", { current: draft.currentStep, total: 4 })}
              </span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex gap-3 px-6 pb-6 pt-2">
          <Button
            color="primary"
            className="w-full font-semibold"
            radius="full"
            onPress={() => onContinue(draft.id)}
          >
            {t("card.continue")}
          </Button>
        </CardFooter>
      </Card>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t("deleteModal.title")}
        description={t("deleteModal.description")}
        confirmLabel={t("deleteModal.confirm")}
        cancelLabel={t("deleteModal.cancel")}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
