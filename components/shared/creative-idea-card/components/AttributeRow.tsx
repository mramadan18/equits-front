import { Chip } from "@heroui/chip";

interface AttributeRowProps {
  label: string;
  items?: any[];
}

export const AttributeRow = ({ label, items }: AttributeRowProps) => (
  <div className="flex items-center gap-1">
    <span className="text-xs text-gray2">{label}</span>
    <div className="flex flex-wrap gap-1">
      {items?.map((item, idx) => (
        <Chip
          key={idx}
          size="sm"
          className="bg-gray3 text-dark2 font-medium text-xs"
        >
          {item?.name}
        </Chip>
      ))}
    </div>
  </div>
);
