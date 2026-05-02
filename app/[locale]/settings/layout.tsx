"use client";

import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@heroui/tabs";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("Settings");
  const pathname = usePathname();
  const router = useRouter();

  // Extract the active tab from the pathname
  // Pathname will be something like "/settings/jobtitle" or just "/settings"
  const activeTab = pathname.split("/").pop() || "jobtitle";

  const handleTabChange = (key: string) => {
    router.push(`/settings/${key}`);
  };

  const tabClassNames = {
    base: "w-full",
    tabWrapper: "w-full",
    tabList: "w-full rounded-none p-0 gap-0",
    cursor: "shadow-none rounded-none hidden",
    tab: "justify-start shadow-none py-4.5! relative before:absolute before:start-0 before:top-0 before:h-full before:w-0.5 before:z-10 before:bg-gray-300 data-selected:before:bg-primary before:rounded-none",
  };

  return (
    <div className="container px-6 py-16 flex flex-col md:flex-row gap-20 min-h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="w-full md:w-72 flex flex-col gap-10">
        <h1 className="text-2xl font-semibold text-dark">{t("title")}</h1>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-dark">
              {t("editProfile.title")}
            </h3>
            <Tabs
              aria-label="Edit Profile"
              isVertical
              selectedKey={activeTab}
              onSelectionChange={(key) => handleTabChange(key as string)}
              variant="light"
              classNames={tabClassNames}
            >
              <Tab key="overview" title={t("editProfile.overview")} />
              <Tab
                key="jobtitle"
                title={t("editProfile.jobTitle")}
                className="w-full"
              />
              <Tab key="education" title={t("editProfile.education")} />
              <Tab key="contactinfo" title={t("editProfile.contactInfo")} />
            </Tabs>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-dark">
              {t("account.title")}
            </h3>
            <Tabs
              aria-label="Account"
              isVertical
              selectedKey={activeTab}
              onSelectionChange={(key) => handleTabChange(key as string)}
              variant="light"
              classNames={tabClassNames}
            >
              <Tab key="security" title={t("account.security")} />
              <Tab key="language" title={t("account.language")} />
              <Tab key="appearance" title={t("account.appearance")} />
            </Tabs>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow max-w-4xl pt-4">{children}</div>
    </div>
  );
}
