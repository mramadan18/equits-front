"use client";
import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { MainRoutes } from "@/types";
import { FaArrowRight } from "react-icons/fa6";
import { useAuthStore } from "@/stores/useAuthStore";

const SeeMoreButton = () => {
  const t = useTranslations("CreativeIdeas");
  const { isAuthenticated } = useAuthStore();
  return (
    <Button
      as={Link}
      href={isAuthenticated ? MainRoutes.HOME : MainRoutes.EXPLORE}
      color="primary"
      className="font-semibold flex items-center gap-2 min-w-60 md:min-w-96"
      radius="full"
      endContent={<FaArrowRight className="text-sm rtl:rotate-180" />}
    >
      {t("seeMore")}
    </Button>
  );
};

export default SeeMoreButton;
