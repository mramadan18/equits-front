interface AuthDividerProps {
  text: string;
}

export const AuthDivider = ({ text }: AuthDividerProps) => {
  return (
    <div className="flex items-center gap-4 text-default-400 text-sm py-2">
      <div className="flex-1 h-px bg-gray2" />
      <span className="select-none">{text}</span>
      <div className="flex-1 h-px bg-gray2" />
    </div>
  );
};
