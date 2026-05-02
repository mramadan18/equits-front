import { TalentExperienceCard } from "./TalentExperienceCard";

interface TalentExperiencesListProps {
  talent: any;
}

export const TalentExperiencesList = ({
  talent,
}: TalentExperiencesListProps) => {
  if (!talent?.experiences || talent.experiences.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      {talent.experiences.map((exp: any) => (
        <TalentExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
};
