import { ReactNode } from "react";

interface SettingsPageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const SettingsPageHeader = ({
  title,
  description,
  children,
}: SettingsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-dark">{title}</h2>
      <div className="flex flex-col gap-2">
        <p className="text-gray2">{description}</p>
        {children}
      </div>
    </div>
  );
};
