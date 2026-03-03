import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function Wisdom() {
  const t = useTranslations("Wisdom");

  return (
    <section className="w-full bg-primary py-16 px-4 md:py-20 lg:py-24 flex items-center justify-center">
      <div className="container flex flex-col items-center text-center">
        <SectionHeader
          title={t("title")}
          titleClassName="text-white lg:text-4xl font-semibold"
          showUnderline={false}
          className="mb-0"
        />
        <p className="text-white text-sm lg:text-lg mb-10">{t("subtitle")}</p>
        <Button
          className="bg-white text-primary font-bold min-w-60"
          radius="full"
        >
          {t("startNow")}
        </Button>
      </div>
    </section>
  );
}
