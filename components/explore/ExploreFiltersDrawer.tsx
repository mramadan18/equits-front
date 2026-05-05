import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { useExploreFiltersController } from "@/hooks/ui/useExploreFiltersController";
import { IoStar } from "react-icons/io5";

interface FilterItem {
  key: string;
  label: string;
}

interface ExploreFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExploreFiltersDrawer = ({
  isOpen,
  onClose,
}: ExploreFiltersDrawerProps) => {
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
    stageItems,
    industryItems,
    fundingAskItems,
    projectTypeItems,
    revenueModelItems,
    marketFocusItems,
    tractionItems,
    fundingStageItems,
    serviceAreaItems,
    ratingItems,
    equityStakeItems,
    academicItems,
    universityItems,
    facultyItems,
    universityId,
    facultyId,
    bulkUpdateParams,
    clearFilters,
  } = useExploreFiltersController();

  const [localFilters, setLocalFilters] = useState({
    isAcademic: isAcademic,
    rating: currentRating,
    industryId: currentIndustry,
    stage: currentStage,
    projectType: currentProjectType,
    revenueModel: currentRevenueModel,
    marketFocus: currentMarketFocus,
    currentTraction: currentTraction,
    fundingStage: currentFundingStage,
    serviceArea: currentServiceArea,
    fundingAsk: currentFundingAsk,
    equityStake: currentEquityStake,
    universityId: universityId,
    facultyId: facultyId,
  });

  // Sync local filters with URL when drawer opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        isAcademic: isAcademic,
        rating: currentRating,
        industryId: currentIndustry,
        stage: currentStage,
        projectType: currentProjectType,
        revenueModel: currentRevenueModel,
        marketFocus: currentMarketFocus,
        currentTraction: currentTraction,
        fundingStage: currentFundingStage,
        serviceArea: currentServiceArea,
        fundingAsk: currentFundingAsk,
        equityStake: currentEquityStake,
        universityId: universityId,
        facultyId: facultyId,
      });
    }
  }, [
    isOpen,
    isAcademic,
    currentRating,
    currentIndustry,
    currentStage,
    currentProjectType,
    currentRevenueModel,
    currentMarketFocus,
    currentTraction,
    currentFundingStage,
    currentServiceArea,
    currentFundingAsk,
    currentEquityStake,
    universityId,
    facultyId,
  ]);

  const handleLocalChange = (key: string, value: string | boolean) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectionChange = (key: string, values: string[]) => {
    const value = values.length > 0 ? values.join(",") : "all";
    handleLocalChange(key, value);
  };

  const handleApply = () => {
    const paramsToUpdate: Record<string, string> = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      paramsToUpdate[key] = value.toString();
    });

    // Clear academic-specific filters if nature is set to non-academic
    if (localFilters.isAcademic === "false") {
      paramsToUpdate.universityId = "all";
      paramsToUpdate.facultyId = "all";
    }

    bulkUpdateParams(paramsToUpdate);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1 border-b">
          <div className="flex items-center justify-between me-4">
            <h2 className="text-xl font-bold">{t("filters")}</h2>
            <Button
              variant="light"
              color="primary"
              className="w-fit font-medium text-sm"
              onPress={() => {
                clearFilters();
                onClose();
              }}
            >
              {t("clearAllFilters")}
            </Button>
          </div>
        </DrawerHeader>
        <DrawerBody className="py-6 gap-8 overflow-y-auto">
          <RadioGroup
            label={t("projectNature")}
            value={localFilters.isAcademic.toString()}
            onValueChange={(val) => handleLocalChange("isAcademic", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {academicItems.map((item: FilterItem) => (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>

          {localFilters.isAcademic === "true" && (
            <>
              {/* University */}
              <CheckboxGroup
                label={t("university")}
                value={
                  localFilters.universityId === "all"
                    ? []
                    : localFilters.universityId.split(",")
                }
                onValueChange={(vals) =>
                  handleSelectionChange("universityId", vals)
                }
                classNames={{ label: "font-bold text-black mb-2" }}
              >
                {universityItems
                  .filter((i: FilterItem) => i.key !== "all")
                  .map((item: FilterItem) => (
                    <Checkbox key={item.key} value={item.key}>
                      {item.label}
                    </Checkbox>
                  ))}
              </CheckboxGroup>

              {/* Faculty */}
              <CheckboxGroup
                label={t("faculty")}
                value={
                  localFilters.facultyId === "all"
                    ? []
                    : localFilters.facultyId.split(",")
                }
                onValueChange={(vals) =>
                  handleSelectionChange("facultyId", vals)
                }
                classNames={{ label: "font-bold text-black mb-2" }}
              >
                {facultyItems
                  .filter((i: FilterItem) => i.key !== "all")
                  .map((item: FilterItem) => (
                    <Checkbox key={item.key} value={item.key}>
                      {item.label}
                    </Checkbox>
                  ))}
              </CheckboxGroup>
            </>
          )}

          {/* Rating */}
          <RadioGroup
            label={t("rating")}
            value={localFilters.rating}
            onValueChange={(val) => handleLocalChange("rating", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {ratingItems.map((item: FilterItem) => (
              <Radio key={item.key} value={item.key}>
                <div className="flex items-center gap-1">
                  {item.key !== "all" && (
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <IoStar
                          key={i}
                          size={14}
                          className={
                            i < parseInt(item.key)
                              ? "fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  )}
                  <span>{item.label}</span>
                </div>
              </Radio>
            ))}
          </RadioGroup>

          {/* Industry */}
          <CheckboxGroup
            label={t("industry")}
            value={
              localFilters.industryId === "all"
                ? []
                : localFilters.industryId.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("industryId", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {industryItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Stage */}
          <CheckboxGroup
            label={t("stage")}
            value={
              localFilters.stage === "all" ? [] : localFilters.stage.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("stage", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {stageItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Project Type */}
          <CheckboxGroup
            label={t("projectType")}
            value={
              localFilters.projectType === "all"
                ? []
                : localFilters.projectType.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("projectType", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {projectTypeItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Revenue Model */}
          <CheckboxGroup
            label={t("revenueModel")}
            value={
              localFilters.revenueModel === "all"
                ? []
                : localFilters.revenueModel.split(",")
            }
            onValueChange={(vals) =>
              handleSelectionChange("revenueModel", vals)
            }
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {revenueModelItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Market Focus */}
          <CheckboxGroup
            label={t("marketFocus")}
            value={
              localFilters.marketFocus === "all"
                ? []
                : localFilters.marketFocus.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("marketFocus", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {marketFocusItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Traction */}
          <RadioGroup
            label={t("currentTraction")}
            value={localFilters.currentTraction}
            onValueChange={(val) => handleLocalChange("currentTraction", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {tractionItems.map((item: FilterItem) => (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>

          {/* Funding Stage */}
          <CheckboxGroup
            label={t("fundingStage")}
            value={
              localFilters.fundingStage === "all"
                ? []
                : localFilters.fundingStage.split(",")
            }
            onValueChange={(vals) =>
              handleSelectionChange("fundingStage", vals)
            }
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {fundingStageItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Service Area */}
          <CheckboxGroup
            label={t("serviceArea")}
            value={
              localFilters.serviceArea === "all"
                ? []
                : localFilters.serviceArea.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("serviceArea", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {serviceAreaItems
              .filter((i: FilterItem) => i.key !== "all")
              .map((item: FilterItem) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Funding Ask */}
          <RadioGroup
            label={t("fundingAsk")}
            value={localFilters.fundingAsk}
            onValueChange={(val) => handleLocalChange("fundingAsk", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {fundingAskItems.map((item: FilterItem) => (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>

          {/* Equity Stake */}
          <RadioGroup
            label={t("equityStake")}
            value={localFilters.equityStake}
            onValueChange={(val) => handleLocalChange("equityStake", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {equityStakeItems.map((item: FilterItem) => (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        </DrawerBody>
        <DrawerFooter className="border-t">
          <Button
            color="primary"
            className="w-full font-bold"
            onPress={handleApply}
          >
            {t("apply")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
