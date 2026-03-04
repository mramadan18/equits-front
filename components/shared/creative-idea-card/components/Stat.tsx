interface StatProps {
  icon: React.ReactNode;
  value: number;
}

export const Stat = ({ icon, value }: StatProps) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-gray2">{value}</span>
  </div>
);
