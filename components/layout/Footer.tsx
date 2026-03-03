import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-gray3 py-6 flex justify-center items-center">
      <p className="text-gray2 text-sm font-medium">{t("copyright")}</p>
    </footer>
  );
}
