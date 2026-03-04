import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/animations";

export default function Wisdom() {
  const t = useTranslations("Wisdom");

  return (
    <section className="w-full bg-primary py-16 px-4 md:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
      <div className="container flex flex-col items-center text-center">
        <FadeIn y={30} duration={0.6} className="flex flex-col items-center">
          <SectionHeader
            title={t("title")}
            titleClassName="text-white font-semibold"
            showUnderline={false}
            className="mb-0"
          />
        </FadeIn>

        <FadeIn y={20} duration={0.6} delay={0.2}>
          <p className="text-white text-sm lg:text-base mb-10">
            {t("subtitle")}
          </p>
        </FadeIn>

        <FadeIn y={20} duration={0.6} delay={0.4}>
          <Button
            className="bg-white text-primary font-bold min-w-60"
            radius="full"
          >
            {t("startNow")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
