"use client";
import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Switch,
} from "@heroui/react";
import { IoFilterOutline } from "react-icons/io5";
import { FilterDropdown } from "@/components/ui";
import { useExploreFiltersController } from "@/hooks/ui/useExploreFiltersController";
import { ExploreFiltersDrawer } from "./ExploreFiltersDrawer";
import { FaSortDown } from "react-icons/fa";

const ExploreFilters = ({ loading }: { loading: boolean }) => {
  const {
    t,
    currentStage,
    currentIndustry,
    currentFundingAsk,
    isAcademic,
    currentRating,
    currentProjectType,
    currentRevenueModel,
    currentMarketFocus,
    currentTraction,
    currentFundingStage,
    currentServiceArea,
    currentEquityStake,
    currentSortBy,
    currentSortOrder,
    stageItems,
    industryItems,
    fundingAskItems,
    sortByItems,
    updateParam,
    bulkUpdateParams,
  } = useExploreFiltersController();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFiltersCount = [
    isAcademic !== "all" ? 1 : 0,
    currentFundingAsk !== "all" ? 1 : 0,
    currentIndustry !== "all"
      ? currentIndustry.split(",").filter(Boolean).length
      : 0,
    currentStage !== "all" ? currentStage.split(",").filter(Boolean).length : 0,
    currentRating !== "all" ? 1 : 0,
    currentProjectType !== "all"
      ? currentProjectType.split(",").filter(Boolean).length
      : 0,
    currentRevenueModel !== "all"
      ? currentRevenueModel.split(",").filter(Boolean).length
      : 0,
    currentMarketFocus !== "all"
      ? currentMarketFocus.split(",").filter(Boolean).length
      : 0,
    currentTraction !== "all" ? 1 : 0,
    currentFundingStage !== "all"
      ? currentFundingStage.split(",").filter(Boolean).length
      : 0,
    currentServiceArea !== "all"
      ? currentServiceArea.split(",").filter(Boolean).length
      : 0,
    currentEquityStake !== "all" ? 1 : 0,
  ].reduce((acc, val) => acc + val, 0);

  if (loading) {
    return (
      <div className="flex items-center w-full gap-2 md:gap-4 mb-6 md:mb-10">
        <div className="flex-shrink-0 pe-2 md:pe-4 border-e-2 border-gray-200">
          <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
        </div>
        <div className="flex flex-1 items-center gap-2 md:gap-3">
          <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
          <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
          <Skeleton className="h-10 md:h-11 w-24 md:w-32 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      id="explore-filters"
      className="flex flex-col w-full mb-8 md:mb-10 gap-4"
    >
      {/* Mobile Actions Row */}
      <div className="flex items-center justify-between w-full">
        <Badge
          content={activeFiltersCount}
          color="primary"
          isInvisible={activeFiltersCount === 0}
          shape="circle"
          size="sm"
          classNames={{
            badge: "min-w-5 h-5",
          }}
        >
          <Button
            variant="bordered"
            radius="full"
            className="font-semibold text-black gap-2 h-10 px-4 border-gray-300"
            startContent={<IoFilterOutline className="text-xl" />}
            onPress={() => setIsDrawerOpen(true)}
          >
            {t("allFilters")}
          </Button>
        </Badge>

        {/* Sort Placeholder - To match Udemy's layout */}
        <Dropdown
          classNames={{
            content: "min-w-20 w-48",
          }}
        >
          <DropdownTrigger>
            <Button
              variant="light"
              radius="full"
              className="font-semibold text-gray-600"
              endContent={<FaSortDown size={18} />}
            >
              {sortByItems.find(
                (item) => item.key === `${currentSortBy}-${currentSortOrder}`,
              )?.label || sortByItems[0]?.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sort Projects"
            selectedKeys={new Set([`${currentSortBy}-${currentSortOrder}`])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys)[0] as string;
              if (selectedValue) {
                const [newSortBy, newSortOrder] = selectedValue.split("-");
                bulkUpdateParams({
                  sortBy: newSortBy,
                  sortOrder: newSortOrder,
                });
              }
            }}
            items={sortByItems}
          >
            {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex items-center w-full gap-4 overflow-hidden">
        {/* Only Academic Toggle */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="text-xs font-bold text-gray2">
            {t("onlyAcademic")}
          </span>
          <Switch
            isSelected={isAcademic === "true"}
            size="lg"
            classNames={{
              wrapper:
                "h-7 w-14! bg-gray2 group-data-[selected=true]:bg-primary",
              thumb: "w-5 h-5 bg-white",
              startContent: "text-[10px] font-bold text-white",
              endContent: "text-[10px] font-bold text-white",
            }}
            onValueChange={(val) =>
              updateParam("isAcademic", val ? "true" : "all")
            }
            startContent={<span>{t("yes")}</span>}
            endContent={<span>{t("no")}</span>}
          />
        </div>

        {/* Vertical Separator */}
        <div className="h-10 w-[1px] bg-gray-300 shrink-0 mx-1" />

        {/* Filters Scrollable Area */}
        <div className="flex flex-1 items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <FilterDropdown
            label={t("fundingAsk")}
            items={fundingAskItems}
            selectedKey={currentFundingAsk}
            onSelectionChange={(key) => updateParam("fundingAsk", key)}
          />

          <FilterDropdown
            label={t("industry")}
            items={industryItems}
            selectedKey={currentIndustry}
            selectionMode="multiple"
            onSelectionChange={(key) => updateParam("industryId", key)}
            disableInput={false}
          />

          <FilterDropdown
            label={t("stage")}
            items={stageItems}
            selectedKey={currentStage}
            selectionMode="multiple"
            onSelectionChange={(key) => updateParam("stage", key)}
            disableInput={false}
          />
        </div>

        {/* Desktop actions: Sort and All Filters */}
      </div>

      <ExploreFiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default ExploreFilters;
