"use client";

import { Input, Button } from "@heroui/react";
import { IoSearchOutline, IoAddOutline } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/ui/useDebounce";
import Link from "next/link";
import { MainRoutes } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

interface BaseSearchBarProps {
  placeholder: string;
  addLabel: string;
  searchParamKey?: string;
  onAddPress?: () => void;
  showAddButton?: boolean;
  buttonBgClass?: string;
}

export const BaseSearchBar = ({
  placeholder,
  addLabel,
  searchParamKey = "search",
  onAddPress,
  showAddButton = true,
  buttonBgClass = "bg-primary-50",
}: BaseSearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user } = useAuthStore();
  const [value, setValue] = useState(searchParams.get(searchParamKey) || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const currentSearch = searchParams.get(searchParamKey) || "";
    if (debouncedValue === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set(searchParamKey, debouncedValue);
    } else {
      params.delete(searchParamKey);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedValue, pathname, router, searchParams, searchParamKey]);

  return (
    <div className="flex flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8 w-full">
      <Input
        value={value}
        onValueChange={setValue}
        placeholder={placeholder}
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

      {showAddButton && !user && (
        <>
          {/* Mobile Add Button */}
          <Button
            color="primary"
            variant="flat"
            radius="full"
            isIconOnly
            onPress={onAddPress}
            className={`md:hidden h-12 w-12 flex-shrink-0 ${buttonBgClass} text-primary border-1 border-primary/20 shadow-sm`}
          >
            <IoAddOutline className="text-2xl" />
          </Button>

          {/* Desktop Add Button */}
          <Button
            as={Link}
            href={MainRoutes.NEW_PROJECT}
            color="primary"
            variant="flat"
            radius="full"
            onPress={onAddPress}
            className={`hidden md:flex h-14 px-8 font-bold text-primary ${buttonBgClass} min-w-max border-1 border-primary/20 hover:border-primary shadow-sm transition-all`}
            endContent={<IoAddOutline className="text-xl" />}
          >
            {addLabel}
          </Button>
        </>
      )}
    </div>
  );
};
