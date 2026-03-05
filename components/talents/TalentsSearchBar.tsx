import { useTranslations } from "next-intl";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IoSearchOutline, IoAddOutline } from "react-icons/io5";

export const TalentsSearchBar = () => {
  const t = useTranslations("TalentsExplore");

  return (
    <div className="flex flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8 w-full">
      <Input
        placeholder={t("searchPlaceholder")}
        radius="full"
        variant="bordered"
        className="flex-1"
        classNames={{
          inputWrapper:
            "h-12 md:h-14 bg-white border-2 border-gray-200 hover:border-primary focus-within:border-primary shadow-sm transition-colors",
          input: "text-base px-2",
        }}
        endContent={
          <div className="flex items-center h-full px-3 md:px-4 border-s-1 border-gray-300">
            <IoSearchOutline className="text-gray-500 text-xl md:text-2xl cursor-pointer hover:text-primary transition-colors" />
          </div>
        }
      />

      {/* Mobile Add Button: Icon Only */}
      <Button
        color="primary"
        variant="flat"
        radius="full"
        isIconOnly
        className="md:hidden h-12 w-12 flex-shrink-0 bg-primary-100 text-primary border-1 border-primary/20 shadow-sm"
      >
        <IoAddOutline className="text-2xl" />
      </Button>

      {/* Desktop Add Button: Text + Icon */}
      <Button
        color="primary"
        variant="flat"
        radius="full"
        className="hidden md:flex h-14 px-8 font-bold text-primary bg-primary-100 min-w-max border-1 border-primary/20 hover:border-primary shadow-sm transition-all"
        endContent={<IoAddOutline className="text-xl" />}
      >
        {t("addYours")}
      </Button>
    </div>
  );
};
