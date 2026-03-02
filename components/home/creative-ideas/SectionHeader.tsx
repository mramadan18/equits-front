import { useTranslations } from "next-intl";
import Image from "next/image";

export const SectionHeader = () => {
  const t = useTranslations("CreativeIdeas");

  return (
    <div className="flex flex-col items-center text-center mb-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-dark2 mb-4 relative inline-block">
        {t.rich("title", {
          underline: (chunks) => <span className="inline-block">{chunks}</span>,
        })}

        <Image
          src="/images/line2.png"
          alt="underline"
          width={250}
          height={5}
          className="absolute -bottom-5 left-0 w-[calc(100%-100px)] h-auto object-fill"
        />
      </h2>
    </div>
  );
};
