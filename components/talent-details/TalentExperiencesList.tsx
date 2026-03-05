import { TalentExperience } from "./types";
import { TalentExperienceCard } from "./TalentExperienceCard";

interface TalentExperiencesListProps {
  experiences: TalentExperience[];
}

export const TalentExperiencesList = ({
  experiences,
}: TalentExperiencesListProps) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      {experiences.map((exp) => (
        <TalentExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
};
