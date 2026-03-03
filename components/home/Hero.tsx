import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { BiRightArrowAlt } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <div
      className="relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center overflow-hidden bg-dark"
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
      ></div>

      <div className="container z-10 flex flex-col items-center justify-center text-center pt-20 pb-24">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.5] mb-12">
          {t.rich("title", {
            yellow: (chunks) => (
              <span className="text-secondary">{chunks}</span>
            ),
            br: () => <br className="hidden md:block" />,
          })}
        </h1>

        <p className="text-white/90 text-xs md:text-base mb-12 leading-[1.7]">
          {t.rich("subtitle", {
            br: () => <br className="hidden md:block" />,
          })}
        </p>

        <div
          className={`flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto items-center justify-center`}
        >
          <Button
            variant="bordered"
            className="text-base md:text-lg h-12 md:h-14 text-white border-white px-10 font-bold hover:bg-white/10 w-full md:w-auto flex items-center gap-3"
            endContent={<IoTelescopeOutline size={24} />}
          >
            {t("exploreProjects")}
          </Button>
          <Button
            color="primary"
            className="text-base md:text-lg h-12 md:h-14 bg-secondary text-primary px-10 font-bold w-full md:w-auto"
            endContent={
              <BiRightArrowAlt className="rtl:rotate-180" size={24} />
            }
          >
            {t("uploadYours")}{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
