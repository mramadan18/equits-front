import { MOCK_DATA } from "@/constants/mockData";
import { CreativeIdeaCard } from "@/components/shared/creative-idea-card";

export const ExploreGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_DATA.map((item) => (
        <CreativeIdeaCard key={item.id} item={item} />
      ))}
    </div>
  );
};
