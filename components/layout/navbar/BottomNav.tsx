"use client";

import Link from "next/link";
import { cn } from "@heroui/theme";
import { FiPlus } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";

interface BottomNavProps {
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
  pathname: string;
  isAuthPage: boolean;
  onPitchPress: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  t: (key: string) => string;
}

export const BottomNav = ({
  items,
  pathname,
  isAuthPage,
  onPitchPress,
  isMenuOpen,
  setIsMenuOpen,
  t,
}: BottomNavProps) => {
  if (isAuthPage) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex items-center justify-around h-[70px] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {items.slice(0, 2).map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-gray-400 hover:text-primary",
            )}
          >
            <div className={isActive ? "text-primary" : "text-gray-400"}>
              {item.icon}
            </div>
            <span className="text-xxs font-medium">{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={onPitchPress}
        className="flex flex-col items-center justify-center w-full h-full -mt-5"
      >
        <div className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center">
          <FiPlus size={24} />
        </div>
        <span className="text-xxs font-medium text-gray-500 mt-1">
          {t("pitch")}
        </span>
      </button>

      {items.slice(2).map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-gray-400 hover:text-primary",
            )}
          >
            <div className={isActive ? "text-primary" : "text-gray-400"}>
              {item.icon}
            </div>
            <span className="text-xxs font-medium">{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
          isMenuOpen ? "text-primary" : "text-gray-400 hover:text-primary",
        )}
      >
        <div className={isMenuOpen ? "text-primary" : "text-gray-400"}>
          <LuMenu size={24} />
        </div>
        <span className="text-xxs font-medium">{t("openMenu")}</span>
      </button>
    </div>
  );
};
