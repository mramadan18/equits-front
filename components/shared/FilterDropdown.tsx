"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";

interface FilterDropdownProps {
  label: string;
  items: { key: string; label: string }[];
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  selectionMode?: "single" | "multiple";
  disableInput?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
}

export const FilterDropdown = ({
  label,
  items,
  selectedKey = "all",
  onSelectionChange,
  selectionMode = "single",
  color = "default",
  disableInput = true,
}: FilterDropdownProps) => {
  if (selectionMode === "multiple") {
    const selectedKeys =
      selectedKey === "all" || !selectedKey
        ? new Set([])
        : new Set(selectedKey.split(","));

    return (
      <Select
        aria-label={label}
        placeholder={label}
        variant={"bordered"}
        color={color}
        radius="full"
        className="min-w-32 md:min-w-40"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          const keysArray = Array.from(keys) as string[];
          onSelectionChange?.(
            keysArray.length > 0 ? keysArray.join(",") : "all",
          );
        }}
      >
        {items
          .filter((item) => item.key !== "all")
          .map((item) => (
            <SelectItem key={item.key} textValue={item.label}>
              {item.label}
            </SelectItem>
          ))}
      </Select>
    );
  }

  return (
    <Autocomplete
      aria-label={label}
      placeholder={label}
      variant={"bordered"}
      color={color}
      radius="full"
      className="min-w-32 md:min-w-40"
      isClearable={false}
      inputProps={{
        readOnly: disableInput,
      }}
      selectedKey={selectedKey}
      onSelectionChange={(key) => {
        onSelectionChange?.((key as string) || "all");
      }}
    >
      {items.map((item) => (
        <AutocompleteItem key={item.key} textValue={item.label}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
