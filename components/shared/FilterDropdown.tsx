"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

interface FilterDropdownProps {
  label: string;
  items: { key: string; label: string }[];
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
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
  color = "default",
  disableInput = true,
}: FilterDropdownProps) => {
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
