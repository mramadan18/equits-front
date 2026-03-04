import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoChevronDown } from "react-icons/io5";

interface FilterDropdownProps {
  label: string;
}

export const FilterDropdown = ({ label }: FilterDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          radius="full"
          className="font-medium px-5 border-gray-300 text-gray-700 bg-white h-11"
          endContent={<IoChevronDown className="text-gray-500 text-base" />}
        >
          {label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={`${label} Filter`}>
        <DropdownItem key="option1">Option 1</DropdownItem>
        <DropdownItem key="option2">Option 2</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
