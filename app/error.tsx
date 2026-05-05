"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("Common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-default-900">
          {t("errorTitle") || "Something went wrong!"}
        </h2>
        <p className="text-default-500 max-w-md mx-auto">
          {t("errorDescription") ||
            "An unexpected error occurred. Please try again later."}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          color="primary"
          variant="solid"
          onPress={() => reset()}
          size="lg"
        >
          {t("tryAgain") || "Try again"}
        </Button>
        <Button
          variant="bordered"
          onPress={() => (window.location.href = "/")}
          size="lg"
        >
          {t("goHome") || "Go Home"}
        </Button>
      </div>
    </div>
  );
}
