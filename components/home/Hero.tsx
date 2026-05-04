import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { BiRightArrowAlt } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { FadeIn } from "@/components/shared/animations";
import Link from "next/link";
import { MainRoutes } from "@/types";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <div
      className="relative w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-dark"
      style={{
        backgroundImage: "url(/images/hero_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for better text readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 82, 155, 0.3) -9.71%, #011C33 83.09%)",
        }}
      />

      <div className="container z-10 flex flex-col items-center justify-center text-center px-8 pt-20 pb-24">
        <FadeIn useInView={false} duration={0.8} y={30}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.5] mb-12">
            {t.rich("title", {
              yellow: (chunks) => (
                <span className="text-secondary">{chunks}</span>
              ),
              br: () => <br className="hidden md:block" />,
            })}
          </h1>
        </FadeIn>

        <FadeIn useInView={false} duration={0.8} delay={0.2} y={20}>
          <p className="text-white/90 text-xs md:text-sm mb-40 leading-[1.7]">
            {t.rich("subtitle", {
              br: () => <br className="hidden md:block" />,
            })}
          </p>
        </FadeIn>

        <FadeIn
          useInView={false}
          duration={0.8}
          delay={0.4}
          y={20}
          className="flex flex-col w-full md:flex-row items-center gap-4 px-2"
        >
          <Button
            as={Link}
            href={MainRoutes.EXPLORE}
            variant="bordered"
            size="lg"
            radius="sm"
            className="text-white border-white font-bold w-full md:w-[220px]"
            endContent={<IoTelescopeOutline size={24} />}
          >
            {t("exploreProjects")}
          </Button>
          <Button
            as={Link}
            href={MainRoutes.NEW_PROJECT}
            color="primary"
            size="lg"
            radius="sm"
            className="bg-secondary text-primary font-bold w-full md:w-[220px]"
            endContent={
              <BiRightArrowAlt className="rtl:rotate-180" size={24} />
            }
          >
            {t("uploadYours")}{" "}
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
