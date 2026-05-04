"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";

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
        className="min-w-[12rem]!"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          const keysArray = Array.from(keys) as string[];
          onSelectionChange?.(
            keysArray.length > 0 ? keysArray.join(",") : "all",
          );
        }}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-1">
              {items.map((item) => (
                <Chip
                  key={item.key}
                  size="sm"
                  variant="flat"
                  className="bg-primary/10 text-primary text-[10px] h-5"
                >
                  {item.textValue}
                </Chip>
              ))}
            </div>
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
      className="w-48!"
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
