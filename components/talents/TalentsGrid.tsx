import { MOCK_TALENTS } from "@/constants/mockTalents";
import { TalentCard } from "./TalentCard";

export const TalentsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {MOCK_TALENTS.map((item) => (
        <TalentCard key={item.id} talent={item} />
      ))}
    </div>
  );
};
