"use client";

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
import { useTalentsFiltersController } from "@/hooks/ui/useTalentsFiltersController";

interface TalentsFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalentsFiltersDrawer = ({
  isOpen,
  onClose,
}: TalentsFiltersDrawerProps) => {
  const {
    t,
    userType,
    experienceLevel,
    cityId,
    universityId,
    facultyId,
    userTypeItems,
    experienceLevelItems,
    cityItems,
    universityItems,
    facultyItems,
    bulkUpdateParams,
    clearFilters,
  } = useTalentsFiltersController();

  const [localFilters, setLocalFilters] = useState({
    userType,
    experienceLevel,
    cityId,
    universityId,
    facultyId,
  });

  // Sync local filters with URL when drawer opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        userType,
        experienceLevel,
        cityId,
        universityId,
        facultyId,
      });
    }
  }, [isOpen, userType, experienceLevel, cityId, universityId, facultyId]);

  const handleLocalChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectionChange = (key: string, values: string[]) => {
    const value = values.length > 0 ? values.join(",") : "all";
    handleLocalChange(key, value);
  };

  const handleApply = () => {
    bulkUpdateParams(localFilters);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1 border-b">
          <div className="flex items-center justify-between me-4">
            <h2 className="text-xl font-bold">{t("allFilters")}</h2>
            <Button
              variant="light"
              color="primary"
              className="w-fit font-medium text-sm"
              onPress={() => {
                clearFilters();
                onClose();
              }}
            >
              {t("clearAllFilters") || "Clear All"}
            </Button>
          </div>
        </DrawerHeader>
        <DrawerBody className="py-6 gap-8 overflow-y-auto">
          {/* User Type */}
          <RadioGroup
            label={t("userType") || "User Type"}
            value={localFilters.userType}
            onValueChange={(val) => handleLocalChange("userType", val)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {userTypeItems.map((item) => (
              <Radio key={item.key} value={item.key}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>

          {/* Experience Level */}
          <CheckboxGroup
            label={t("experienceLevel")}
            value={
              localFilters.experienceLevel === "all"
                ? []
                : localFilters.experienceLevel.split(",")
            }
            onValueChange={(vals) =>
              handleSelectionChange("experienceLevel", vals)
            }
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {experienceLevelItems
              .filter((i) => i.key !== "all")
              .map((item) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Location */}
          <CheckboxGroup
            label={t("location")}
            value={
              localFilters.cityId === "all"
                ? []
                : localFilters.cityId.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("cityId", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {cityItems
              .filter((i) => i.key !== "all")
              .map((item) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* University */}
          <CheckboxGroup
            label={t("university") || "University"}
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
              .filter((i) => i.key !== "all")
              .map((item) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>

          {/* Faculty */}
          <CheckboxGroup
            label={t("faculty") || "Faculty"}
            value={
              localFilters.facultyId === "all"
                ? []
                : localFilters.facultyId.split(",")
            }
            onValueChange={(vals) => handleSelectionChange("facultyId", vals)}
            classNames={{ label: "font-bold text-black mb-2" }}
          >
            {facultyItems
              .filter((i) => i.key !== "all")
              .map((item) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.label}
                </Checkbox>
              ))}
          </CheckboxGroup>
        </DrawerBody>
        <DrawerFooter className="border-t">
          <Button
            color="primary"
            className="w-full font-bold"
            onPress={handleApply}
          >
            {t("apply") || "Apply"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
