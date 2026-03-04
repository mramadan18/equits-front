interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black dark:text-white leading-tight">
        {title}
      </h1>
      <p className="text-gray2 mt-1">{subtitle}</p>
    </div>
  );
};
