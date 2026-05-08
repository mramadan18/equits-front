import { useState, useEffect } from "react";

export const useFiltersDrawer = <T extends Record<string, any>>(
  isOpen: boolean,
  currentFilters: T,
) => {
  const [localFilters, setLocalFilters] = useState<T>(currentFilters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
    }
  }, [isOpen, JSON.stringify(currentFilters)]);

  const handleLocalChange = (key: keyof T, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectionChange = (key: keyof T) => (e: any) => {
    // Handles both direct value and raw event from string[]
    const values = e?.target?.value !== undefined ? e.target.value : e;
    if (Array.isArray(values)) {
      const value = values.length > 0 ? values.join(",") : "all";
      handleLocalChange(key, value);
    } else if (typeof values === "string") {
      const value = values.split(",").length > 0 ? values : "all";
      handleLocalChange(key, value);
    } else {
      handleLocalChange(key, values);
    }
  };

  const handleArraySelectionChange = (key: keyof T, values: string[]) => {
    const value = values.length > 0 ? values.join(",") : "all";
    handleLocalChange(key, value);
  };

  return {
    localFilters,
    setLocalFilters,
    handleLocalChange,
    handleSelectionChange,
    handleArraySelectionChange,
  };
};
