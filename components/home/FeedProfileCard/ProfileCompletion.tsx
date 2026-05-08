import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export const ProfileCompletion = ({
  progress,
  onOpen,
}: {
  progress: number;
  onOpen: () => void;
}) => {
  const t = useTranslations("FeedProfileCard");

  if (progress === 100) return null;

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="light"
        color="primary"
        size="sm"
        onPress={onOpen}
        className="text-sm w-fit underline bg-transparent hover:bg-transparent! px-0"
      >
        {t("completeProfile")}
      </Button>
      <div className="flex items-center gap-4">
        <div className="h-2.5 flex-grow bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-primary">
          {t("completePct", { pct: progress })}
        </span>
      </div>
    </div>
  );
};
