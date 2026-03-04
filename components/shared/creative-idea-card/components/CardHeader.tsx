interface CardHeaderProps {
  title: string;
  description: string;
}

export const CardHeader = ({ title, description }: CardHeaderProps) => (
  <>
    <h3 className="text-base font-semibold text-dark2 mb-3">{title}</h3>
    <p className="text-gray2 text-sm leading-relaxed mb-6 line-clamp-4">
      {description}
    </p>
  </>
);
