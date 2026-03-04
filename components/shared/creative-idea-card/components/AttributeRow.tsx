import { Chip } from "@heroui/chip";

interface AttributeRowProps {
  label: string;
  items: string[];
}

export const AttributeRow = ({ label, items }: AttributeRowProps) => (
  <div className="flex items-start gap-1">
    <span className="text-xs text-gray2">{label}</span>
    <div className="flex flex-wrap gap-1">
      {items.map((text, idx) => (
        <Chip
          key={idx}
          size="sm"
          className="bg-gray3 text-dark2 font-medium text-xs"
        >
          {text}
        </Chip>
      ))}
    </div>
  </div>
);
