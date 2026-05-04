"use client";

import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface NavItemsProps {
  items: NavItem[];
  pathname: string;
}

export const NavItems = ({ items, pathname }: NavItemsProps) => {
  return (
    <>
      {items.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <NavbarItem
            key={`${item.label}-${index}`}
            isActive={isActive}
            className="h-full text-base"
          >
            <Link
              href={item.href}
              className={`flex items-center gap-2 h-full font-bold transition-colors ${
                isActive
                  ? "text-primary font-bold"
                  : "text-gray hover:text-primary font-medium"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </NavbarItem>
        );
      })}
    </>
  );
};
