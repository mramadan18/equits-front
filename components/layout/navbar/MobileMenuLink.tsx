import Link from "next/link";

interface MobileMenuLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const MobileMenuLink = ({
  href,
  icon,
  label,
  onClick,
}: MobileMenuLinkProps) => {
  return (
    <Link
      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
      href={href}
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <span className="font-bold text-gray-700">{label}</span>
    </Link>
  );
};
